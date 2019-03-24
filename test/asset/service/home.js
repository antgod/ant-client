/**
 * Created by chainn on 18/4/20.
 */
import { fetch, resolveHandler, rejectHandler } from '../../common/request'

const args = {
  // __scene: 'default',
}

export function checkMaterialSign() {
  const url = '/mart/seller/route.json?appName=mrchstm'
  return fetch({
    url,
    data: {
      ...args,
    },
  }).then(resolveHandler, rejectHandler)
}
