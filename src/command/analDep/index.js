const path = require('path')
const {
  getClientParams,
  getFileMessage,
  getFileDependencies,
} = require('./common')

const {
  assign,
} = Object
const {
  resolve,
  dirname,
} = path

const npmModule = (dep) => {
  return dep.indexOf('./') === -1
}

const traverseProject = (projectPath) => {
  const moduleCache = {}
  const defaultMod = { loading: true }
  const cycleMod = { message: '循环引用' }

  const requireCompute = (depCallPath, depRelativePath, isDir) => {
    if (npmModule(depRelativePath)) {
      return {}
    }
    const depCallPrefix = isDir ? depCallPath : dirname(depCallPath)
    const depAbsoluteEntry = resolve(depCallPrefix, depRelativePath)
  
    let mod = moduleCache[depAbsoluteEntry]
    if (mod) {
      return { 
        [depRelativePath]: mod.loading ? cycleMod : mod.module 
      }
    } else {
      mod = moduleCache[depAbsoluteEntry] = Object.create(defaultMod)
      const deps = traverseEntry(depAbsoluteEntry)
      const currentModule = {
        entry: depAbsoluteEntry.replace(`${dirname(projectPath)}/`, ''),
        deps,
      }
      mod.deps = deps
      mod.loading = false
      return { [depRelativePath]: currentModule }
    }
  }
  
  const traverseEntry = (entryPath) => {
    const { extName, isDir, code } = getFileMessage(entryPath)
    const dependencies = extName ? [] : getFileDependencies(code.toString())
    return dependencies.reduce((last, dep) => assign(last, requireCompute(entryPath, dep, isDir), {}), {})
  }
  return {
    traverseEntry,
  }
}

const projectMods = () => {
  const {
    entryPath,
    projectPath,
    // output,
  } = getClientParams()
  const { traverseEntry } = traverseProject(projectPath)
  console.log(JSON.stringify(traverseEntry(entryPath), null, 2))
}

module.exports = projectMods