import { fetch, resolveHandler, rejectHandler } from '../../common/request'

const defaultArgs = {
  // __scene: 'default',
}

export function queryAssetApplyHistory(args) {
  const url = '/mart/seller/assetApplyHistory.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

export function assetApplyCheck(args) {
  const url = '/mart/seller/assetApplyCheck.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

export function assetApply(args) {
  const url = '/mart/seller/assetApply.json?appName=mrchstm'
  return fetch({
    url,
    method: 'post',
    data: {
      data: encodeURIComponent(JSON.stringify(args)),
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

export function spuCateGory(args) {
  const url = '/mart/seller/spuCategory.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}
