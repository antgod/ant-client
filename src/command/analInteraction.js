const { plugins } = require('ant-util')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs')
const babel = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('babel-types')
const {
  log,
  chalk
} = require('../common/log')
const {
  DEFAULT_PLUGINS,
  DEFAULT_SOURCE_TYPE
} = require('../common/constant')
const { set, get } = plugins.exist

const {
  assign,
  keys
} = Object
const {
  basename,
  resolve,
  dirname,
  extname,
  join
} = path
const REQUIRE = 'require'
const DEFAULT_ENTRY = './src/index'
const DEFAULT_ALIAS = ['.js', '.jsx', '.json']
const OUTPUT_TYPE = {
  CONSOLE: 'c',
  FILE: 'f'
}

const value = 's@value'

// 所有依赖模块列表
const mods = {}
const SEP = '_'
const GLOBAL = 'global'
const NODE_TYPES = {
  PROGRAM: 'Program',
  FUNCTION_DECLARATION: 'FunctionDeclaration',
  FUNCTION_EXPRESSION: 'FunctionExpression',
  EXPRESSION_STATEMENT: 'ExpressionStatement',
  ARROW_FUNCTION_EXPRESSION: 'ArrowFunctionExpression',
  CALL_EXPRESSION: 'CallExpression',
  CONDITIONAL_EXPRESSION: 'ConditionalExpression',
  TEMPLATE_LITERAL: 'TemplateLiteral',
  BINARY_EXPRESSION: 'BinaryExpression',
  VARIABLE_DECLARATOR: 'VariableDeclarator',
  ASSIGNMENT_EXPRESSION: 'AssignmentExpression',
  MEMBER_EXPRESSION: 'MemberExpression',
  SPREAD_ELEMENT: 'SpreadElement',
  ARRAY_EXPRESSION: 'ArrayExpression', // [a]
  OBJECT_PROPERTY: 'ObjectProperty', // { a }
  NEW_EXPRESSION: 'NewExpression', // new
  RETURN_STATEMENT: 'ReturnStatement', // return xxx
  // UNARY_EXPRESSION: 'UnaryExpression',     // typeof
  // ARRAY_PATTERN: 'ArrayPattern',           // var [a]
}

const traversePath = (path, hundles) => {
  debugger
  for (const key in path) {
    const item = path[key]
    if (typeof item === 'object' && item !== null) {
      traversePath(item, hundles)
      if (hundles[item.type]) {
        debugger
        hundles[item.type](item)
      }
     
    }
  }
}

const analysisExecPaths = (path) => {
  const paths = []
  if (!path) {
    return []
  } else
  if (path.type === NODE_TYPES.PROGRAM) {
    return [GLOBAL]
  } else if (path.type === NODE_TYPES.FUNCTION_DECLARATION) {
    paths.push(path.node.id.name)
  } else if (path.type === NODE_TYPES.ARROW_FUNCTION_EXPRESSION || path.type === NODE_TYPES.FUNCTION_EXPRESSION) {
    paths.push(path.parentPath.node.id.name)
  } else if (path.type === NODE_TYPES.FUNCTION_DECLARATION) {
    paths.push(path.node.id.name)
  }
  const res = analysisExecPaths(path.parentPath).concat(paths)
  return res
}


function parseOnClick(code, {
  sourceType = DEFAULT_SOURCE_TYPE,
  plugins = DEFAULT_PLUGINS
} = {}) {
  // console.log(code)
  const ast = babel.parse(code, {
    sourceType,
    plugins
  })

  const envs = {}
  // debugger
  traverse(ast, {
    FunctionDeclaration(path) {
      // const execEnv = analysisExecPaths(path).join(SEP)
      // console.log(execEnv)
    },
    BlockStatement(path) {
      // const execEnv = analysisExecPaths(path).join(SEP)
      // console.log(execEnv)
    },
    ArrowFunctionExpression(path) {
      set(envs, analysisExecPaths(path).concat(value), path)
    }
  })

  traverse(ast, {
    ArrowFunctionExpression(path) {

    },
    ExportDefaultDeclaration(path) {
      const entryDir = [GLOBAL, path.node.declaration.name]
      const entry = entryDir.concat(value)
      const entryPath = get(envs, entry)
      console.log(traverseFunction(entryPath, envs, [entryDir.join(SEP)]))
    },
    Identifier(path) {

    }
  })
  return
}

const getFnEnv = (envs, paths, callFunctionName) => {
  if (!paths || !paths.length) {
    return []
  }

  const functions = get(envs, paths)
  const parentPath = paths.splice(0, paths.length - 1)
  return functions[callFunctionName] ? paths : getFnEnv(envs, parentPath, callFunctionName)
}

function traverseFunction(path, envs, output) {
  const paths = analysisExecPaths(path)

  traversePath(path, {
    CallExpression(node) {
      // const callFunctionName = node.callee.name
      // const fnEnv = getFnEnv(envs, paths, callFunctionName)
      // const fnPath = fnEnv.concat(callFunctionName)
      // output.push(fnPath.join(SEP))
      // traverseFunction(`${GLOBAL}_${name}`, envs, output)
    }
  })
  return output.join('->')
}

const projectMods = (path) => {
  // const { e: entry, o, f } = computeArgs()
  const absoluteProject = process.cwd()
  const entryPath = resolve(absoluteProject, path)
  const code = fs.readFileSync(entryPath + '.js')
  parseOnClick(code.toString())
}

module.exports = projectMods

projectMods('./src/command/test')