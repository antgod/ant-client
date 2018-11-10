const path = require('path')
const fs = require('fs')
const babel = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('babel-types')
const { log, chalk } = require('../common/log')
const { DEFAULT_PLUGINS, DEFAULT_SOURCE_TYPE } = require('../common/constant')

const { assign } = Object
const { basename, resolve, dirname, extname, join } = path
const REQUIRE = 'require'
const DEFAULT_ENTRY = './src/index'
const DEFAULT_FILE = '.js'
const NODE_MODULES = 'node_modules'

const analyseEntry = (absoluteProject, entry) => {
  if (entry) {
    return resolve(absoluteProject, entry)
  }
  return resolve(absoluteProject, DEFAULT_ENTRY)
}

const isRelative = (dep) => {
  return dep.indexOf('./') > -1
}

const traverseProject = (absoluteEntry, absoluteProject) => {
  const extName = extname(absoluteEntry)
  const fileName = extName ? absoluteEntry : `${absoluteEntry}${DEFAULT_FILE}`
  let code = ''
  try {
    code = fs.readFileSync(fileName)
  } catch(e) {
    log(chalk.red(`${fileName}文件不存在`))
  } 
  const deps = fileMods(code.toString())
  return deps.reduce((last, dep) => {
    const depAbsoluteEntry = resolve(dirname(absoluteEntry), dep)
    const projectNameIndex = absoluteProject.length - basename(absoluteProject).length
    return assign(last, { [dep]: isRelative(dep) ? {
      absosulte: depAbsoluteEntry.substr(projectNameIndex),
      nodeModule: false,
      deps: traverseProject(depAbsoluteEntry, absoluteProject),
    } : {
      absosulte: join(basename(absoluteProject), NODE_MODULES, dep),
      nodeModule: true,
    }})}, 
  {})
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

const projectMods = (dir, cmd) => {
  const entry = process.argv[3]
  const absoluteProject = process.cwd()
  const absoluteEntry = analyseEntry(absoluteProject, entry)
  const depTree = traverseProject(absoluteEntry, absoluteProject)
  log(chalk.green(JSON.stringify(depTree, null, 2)))
  return depTree
}

module.exports = projectMods
