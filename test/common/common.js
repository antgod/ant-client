// 批量触发 action
function batchDispatchAction(dispatch) {
  return (actions) => {
    actions.forEach((action) => {
      dispatch(action)
    })
  }
}
function getRequiredRule(message, type, initial = '', flag = false) {
  if (flag) return null
  const TYPE_MAP = {
    input: '输入',
    select: '选择',
  }
  const tempType = TYPE_MAP[type]
  const tempMessage = `请${tempType}${message}!`
  const config = {
    rules: [{ required: true, message: tempMessage }],
    initialValue: initial,
  }
  return config
}

function parseQueryString(url) {
  const obj = {}
  const paraArray = url.substring(url.indexOf('?') + 1, url.length).split('&')
  paraArray.map((item) => {
    const keyValue = item.split('=')
    const key = keyValue[0]
    const value = keyValue[1]
    obj[key] = value
    return null
  })
  return obj
}

function setFormData(dispatch) {
  return (actions) => {
    actions.forEach((action) => {
      dispatch(action)
    })
  }
}

function getAccountInfo(accountList = [], type, id = '') {
  const tempArray = accountList.filter((item) => item[type] === id)
  return tempArray && tempArray[0]
}

function changeToNormalFormat(item) {
  return `${item}:00`
}

function changeToShowFormat(item) {
  return item.slice(0, 5)
}

function getBankNumber(number) {
  if (number && number.length) {
    const start = number.length - 4
    const stop = number.length
    const newString = number.substring(start, stop)
    return `尾号${newString}`
  }
  return null
}

function getUrlQueryByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}


export { batchDispatchAction, getRequiredRule, setFormData, getAccountInfo, parseQueryString, changeToNormalFormat, getBankNumber, changeToShowFormat, getUrlQueryByName }
