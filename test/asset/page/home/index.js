import { checkMaterialSign } from '../../service/home'
import { MENUS_CREATOR } from '../../../common/constant'
import '../../../common/patch'
import Tracert, { SPM_PAGE } from '../../../common/spm'

const martFengdieBlock = document.getElementById('mart-fengdie-block')
window.onload = () => {
  Tracert.config({
    spmAPos: SPM_PAGE.HOME_A,
    spmBPos: SPM_PAGE.HOME_B,
  })
  Tracert.logPv()
  checkMaterialSign().then((result) => {
    if (result.success === true && result.data.signed === true) {
      const assetApplyPage = MENUS_CREATOR[0].href
      window.location.href = assetApplyPage
    } else {
      martFengdieBlock.style.visibility = 'visible'
    }
  }).catch(() => {
  })
}
