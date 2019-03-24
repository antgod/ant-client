import { Component } from 'react'
import { connect } from 'dva'
import util from 'ant-util'
import PageTitle from '../../../components/PageTitle'
import { PREFIX, TITLES, LABELS } from '../../../common/constant'
import './index.less'
import ListSideBar from '../../../components/ListSideBar'

const { matchOne, identity } = util
const { gets } = util.plugins.exist

const prefix = `${PREFIX}-route`

const FORBID = 'forbid'

class Route extends Component {
  state = {}
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'route/queryRoute',
    }).then((data) => {
      const { success = true, allow = true, signed = false } = gets(data, {
        success: true,
        allow: true,
        signed: false,
        errorMsg: '',
      })({
        success: 'success',
        errorMsg: 'errorMsg',
        allow: 'data.allow',
        signed: 'data.signed',
      })

      matchOne([
        { condition: success === false, action: identity },
        { condition: success === true && signed === true, action: () => location.hash = 'list' },
        { condition: success === true && signed === false && allow === true, action: () => location.hash = 'apply' },
        { condition: success === true && signed === false && allow === false, action: () => location.hash = 'forbid' },
      ])()
    })
  }


  renderGuide = () => {
    return <div className={`${prefix}-apply`}>
      <div>
        <img className={`${prefix}-apply-img`} src="https://gw.alipayobjects.com/zos/rmsportal/MKzCreXPKbqLjxttXedK.png"/>
      </div>
      <div className={`${prefix}-apply-text`}>{LABELS.FORBID}</div>
    </div>
  }

  render() {
    const { type } = this.state
    return <ListSideBar defaultSelectedKeys={['asset']}>
      <div className={`${prefix}`}>
        <PageTitle title={TITLES.ROUTE} />
        {type === FORBID && this.renderGuide()}
      </div>
    </ListSideBar>
  }
}

export default connect()(Route)
