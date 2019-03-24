import { queryAssetApplyHistory, assetApplyCheck, assetApply, spuCateGory } from '../service/list'

export default {
  namespace: 'list',
  state: {
    remindList: {},
  },
  subscriptions: {},
  effects: {
    * queryAssetApplyHistory({ payload }, { call, put }) {
      const result = yield call(queryAssetApplyHistory, payload)
      return yield put({ type: 'setAssetApplyHistory', payload: result })
    },
    * assetApplyCheck({ payload }, { call }) {
      return yield call(assetApplyCheck, payload)
    },
    * assetApply({ payload }, { call }) {
      return yield call(assetApply, payload)
    },
    * spuCateGory(_, { call }) {
      return yield call(spuCateGory)
    },
  },
  reducers: {
    setAssetApplyHistory(state, action) {
      return { ...state, list: action.payload }
    },
  },
}

