const path = require('path')
const fs = require('fs')
const babel = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('babel-types')
const { log, chalk } = require('../common/log')
const { DEFAULT_PLUGINS, DEFAULT_SOURCE_TYPE } = require('../common/constant')

const { assign, keys } = Object
const { basename, resolve, dirname, extname, join } = path
const REQUIRE = 'require'
const DEFAULT_ENTRY = './src/index'
const DEFAULT_ALIAS = ['.js', '.jsx', '.json']
const NODE_MODULES = 'node_modules'

const mods = {}
const analyseEntry = (absoluteProject, entry) => {
  if (entry) {
    return resolve(absoluteProject, entry)
  }
  return resolve(absoluteProject, DEFAULT_ENTRY)
}

const npmModule = (dep) => {
  return dep.indexOf('./') === -1
}

const requireCompute = (dep, isDir, absoluteEntry, absoluteProject) => {
  const absolutePrefix = isDir ? absoluteEntry : dirname(absoluteEntry)
  const depAbsoluteEntry = resolve(absolutePrefix, dep)
  const projectNameIndex = absoluteProject.length - basename(absoluteProject).length
  // 是否是npm模块
  const isNpmModule = npmModule(dep)

  const absosultePath = isNpmModule ?
    join(basename(absoluteProject), NODE_MODULES, dep) :
    depAbsoluteEntry.substr(projectNameIndex)

  let mod = mods[absosultePath]
  if (mod) {
    return mod.load ? { tip: '循环引用' } : mod.module
  }
  mod = mods[absosultePath] = { load: true }

  let currentModule
  
  if (isNpmModule) {
    currentModule = {
      absosultePath,
    }
  } else {
    const deps = traverseProject(depAbsoluteEntry, absoluteProject)
    const depLen = keys(deps).length
    if (depLen > 3) {
      log(chalk.yellow(`${absosultePath}模块过多依赖`))
    }
    currentModule = {
      absosultePath,
      deps,
      depLen,
    }
  }
  
  mod.module = currentModule
  mod.load = false
  return { [dep]: currentModule}
}

const traverseProject = (absoluteEntry, absoluteProject) => {
  const extName = extname(absoluteEntry)
  let code = ''
  let isDir = false
  try {
    if (extName) {
      code = fs.readFileSync(absoluteEntry)
    } else {
      const isExist = fs.existsSync(absoluteEntry)
      const isDirectory = isExist ? fs.lstatSync(absoluteEntry).isDirectory() : false
      if (isDirectory) {
        isDir = true
        ext = DEFAULT_ALIAS.find(ext => fs.existsSync(`${absoluteEntry}/index${ext}`))
        code = fs.readFileSync(`${absoluteEntry}/index${ext}`)
      } else {
        ext = DEFAULT_ALIAS.find(ext => fs.existsSync(`${absoluteEntry}${ext}`))
        code = fs.readFileSync(`${absoluteEntry}${ext}`)
      }
    }
  } catch(e) {
    log(chalk.red(`${absoluteEntry}文件不存在`))
  }
  const deps = extName ? [] : fileMods(code.toString())
  return deps.reduce((last, dep) => assign(last, requireCompute(dep, isDir, absoluteEntry, absoluteProject), {}), {})
}

function fileMods (code, { sourceType = DEFAULT_SOURCE_TYPE, plugins = DEFAULT_PLUGINS } = {}) {
  const ast = babel.parse(code, {
    sourceType,
  plugins})
  const dependencies = []
  traverse(ast, {
    Literal(path) {
      const parentNode = path.parent
      if (types.isImportDeclaration(parentNode)) {
        dependencies.push(path.node.value)
      }

      if (types.isCallExpression(parentNode) && parentNode.callee.name === REQUIRE) {
        dependencies.push(path.node.value)
      }
    }
  })
  return dependencies
}

const projectMods = () => {
  const entry = process.argv[3]
  const absoluteProject = process.cwd()
  const absoluteEntry = analyseEntry(absoluteProject, entry)
  const depTree = traverseProject(absoluteEntry, absoluteProject)

  const list = keys(mods)
  log(chalk.red.bold('模块列表'))
  log(chalk.cyan(list))
  log(chalk.red.bold('模块数量'))
  log(chalk.yellow(list.length))
  log(chalk.red.bold('模块依赖树'))
  log(chalk.green(JSON.stringify(depTree, null, 2)))
  return {list, depTree }
}

module.exports = projectMods
