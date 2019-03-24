import { fetch, resolveHandler, rejectHandler } from '../../common/request'

const args = {
  // __scene: 'default',
}

export function queryRoute() {
  const url = '/mart/seller/route.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
    },
  }).then(resolveHandler, rejectHandler)
}
