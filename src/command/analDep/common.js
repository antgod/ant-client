const path = require('path')
const fs = require('fs')
const babel = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('babel-types')
const {
  DEFAULT_PLUGINS,
  DEFAULT_SOURCE_TYPE,
  REQUIRE,
  DEFAULT_ENTRY,
  DEFAULT_ALIAS,
} = require('../../common/constant')
const {
  computeArgs,
} = require('../../common/util')
const {
  log,
  chalk
} = require('../../common/log')

const {
  assign,
} = Object

const {
  resolve,
  extname,
} = path

const analyseEntry = (absoluteProject, entry) => {
  if (entry) {
    return resolve(absoluteProject, entry)
  }
  return resolve(absoluteProject, DEFAULT_ENTRY)
}

const getClientParams = () => {
  // 获取项目入口
  const {
    e: entry,
    o: output,
  } = computeArgs()
  const projectPath = process.cwd()
  const entryPath = analyseEntry(projectPath, entry)
  return {
    projectPath,
    entryPath,
    output,
  }
}

const getFileMessage = (absoluteEntry) => {
	const extName = extname(absoluteEntry)
  let code = ''
  let isDir = false
  try {
    if (!extName) {
      const isExist = fs.existsSync(absoluteEntry)
      let ext = DEFAULT_ALIAS.find(ext => fs.existsSync(`${absoluteEntry}${ext}`))
      const isDirectory = !ext && isExist ? fs.lstatSync(absoluteEntry).isDirectory() : false
      if (isDirectory) {
        isDir = true
        ext = DEFAULT_ALIAS.find(ext => fs.existsSync(`${absoluteEntry}/index${ext}`))
        code = fs.readFileSync(`${absoluteEntry}/index${ext}`)
      } else {
        code = fs.readFileSync(`${absoluteEntry}${ext}`)
      }
    }
  } catch (e) {
		log(chalk.red(`${absoluteEntry} file or direction not exist`))
  }
	return {
		extName,
		code,
		isDir,
	}
}

function getFileDependencies(code, {
  sourceType = DEFAULT_SOURCE_TYPE,
  plugins = DEFAULT_PLUGINS
} = {}, traverseKey) {
  const ast = babel.parse(code, {
    sourceType,
    plugins
  })
  const dependencies = []
  traverse(ast, assign({
    Literal(path) {
      const parentNode = path.parent
      if (types.isImportDeclaration(parentNode)) {
        dependencies.push(path.node.value)
      }

      if (types.isCallExpression(parentNode) && parentNode.callee.name === REQUIRE) {
        dependencies.push(path.node.value)
      }
    }
  }, traverseKey))
  return dependencies
}

module.exports = {
	getClientParams,
	getFileMessage,
	getFileDependencies,
}