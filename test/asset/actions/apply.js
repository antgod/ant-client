import { sellerApply, postSellerApply } from '../service/apply'

export default {
  namespace: 'apply',
  state: {
    apply: {},
  },
  subscriptions: {},
  effects: {
    * sellerApply({ payload }, { call, put }) {
      const result = yield call(sellerApply, payload)
      return yield put({ type: 'setSellerApply', payload: result })
    },
    * postSellerApply({ payload }, { call }) {
      return yield call(postSellerApply, payload)
    },
  },
  reducers: {
    setSellerApply(state, action) {
      return { ...state, apply: action.payload }
    },
  },
}
