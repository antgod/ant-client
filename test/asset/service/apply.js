import { fetch, resolveHandler, rejectHandler } from '../../common/request'

const defaultArgs = {
  // __scene: 'default',
}

export function sellerApply() {
  return fetch({
    url: '/mart/seller/sellerApply.json?appName=mrchstm',
    data: {
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}

export function postSellerApply(args) {
  return fetch({
    url: '/mart/seller/sellerApply.json?appName=mrchstm',
    method: 'post',
    data: {
      data: encodeURIComponent(JSON.stringify(args)),
      ...defaultArgs,
    },
  }).then(resolveHandler, rejectHandler)
}
