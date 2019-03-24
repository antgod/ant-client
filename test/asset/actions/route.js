import { queryRoute } from '../service/route'

export default {
  namespace: 'route',
  state: {
    route: {},
  },
  subscriptions: {},
  effects: {
    * queryRoute(_, { call }) {
      return yield call(queryRoute)
    },
  },
  reducers: {
  },
}
