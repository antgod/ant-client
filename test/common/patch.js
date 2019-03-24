/* eslint-disable */
/* 浏览器兼容补丁 */
import 'babel-polyfill'
import 'es6-shim'
import 'es5-shim'
import './clue'

// 原生对象补丁
Array.prototype.includes = function(item) {
  return this.indexOf(item) > -1
}
