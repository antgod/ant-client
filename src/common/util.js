const { DEFAULT_PLUGINS, DEFAULT_SOURCE_TYPE, REQUIRE, DEFAULT_ENTRY, DEFAULT_ALIAS, NODE_MODULES, OUTPUT_TYPE, NPMS } = require('./constant')
const yargs = require('yargs')

const computeArgs = () => {
  const { e, o = OUTPUT_TYPE.CONSOLE } = yargs.argv
  if (e === true || o === true) {
    log(chalk.red('输入参数错误'))
    process.exit(0)
  }
  return { e, o }
}

module.exports = {
	computeArgs,
}