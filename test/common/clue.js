import Tracker from '@ali/tracker'

const tracker = new Tracker({
  pid: 'mrchportalweb',
})

// 监听 JS 异常（window.onerror）并自动打点
tracker.onGlobalError()
