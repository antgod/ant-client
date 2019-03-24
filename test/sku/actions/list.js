import { querySkuApplyHistory, skuApply, postSkuApply } from '../service/list'
import { spuCateGory } from '../../asset/service/list'
import '../index'

export default {
  namespace: 'list',
  state: {
    remindList: {},
  },
  subscriptions: {},
  effects: {
    * queryAssetApplyHistory({ payload }, { call, put }) {
      const result = yield call(querySkuApplyHistory, payload)
      return yield put({ type: 'setSkuApplyHistory', payload: result })
    },
    * skuApply({ payload }, { call, put }) {
      const result = yield call(skuApply, payload)
      return yield put({ type: 'setSpus', payload: result })
    },
    * postSkuApply({ payload }, { call }) {
      return yield call(postSkuApply, payload)
    },
    * spuCateGory({ payload }, { call }) {
      return yield call(spuCateGory, payload)
    },
  },
  reducers: {
    setSkuApplyHistory(state, action) {
      return { ...state, list: action.payload }
    },
    setSpus(state, action) {
      return { ...state, spus: action.payload }
    },
  },
}

