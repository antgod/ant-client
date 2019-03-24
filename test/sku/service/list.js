import { fetch, resolveHandler, rejectHandler } from '../../common/request'

const defaultArgs = {
  // __scene: 'default',
}

export function querySkuApplyHistory(args) {
  const url = '/mart/seller/skuApplyHistory.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

export function skuApply(args) {
  const url = '/mart/seller/skuApply.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

export function postSkuApply(args) {
  const url = '/mart/seller/skuApply.json?appName=mrchstm'
  return fetch({
    url,
    method: 'post',
    data: {
      data: encodeURIComponent(JSON.stringify(args)),
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

