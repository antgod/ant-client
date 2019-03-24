import '@alipay/tracert/lib/starter'
import util from 'ant-util'

const { setDefault } = util

const Tracert = setDefault(window.Tracert, {})

export default Tracert

const SPM_PAGE = {
  A: 'a226',
  APPLY_B: 'b5734',
  APPLYED_B: 'b5745',
  ASSET_B: 'b5746',
  SKU_B: 'b5747',
  HOME_A: 'a226',
  HOME_B: 'b5734',
}

export {
  SPM_PAGE,
}
