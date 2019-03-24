import React, { Component } from 'react'
import { Icon } from 'antd'
import { PREFIX } from '../../../common/constant'
import Title from '../../../components/PageTitle'
import './index.less'

const prefix = `${PREFIX}-forbid`

class Forbid extends Component {
  showMenu = (display) => {
    const sidebar = document.getElementsByClassName('common-sidebar')[0]
    if (sidebar) {
      sidebar.style.display = display
    }
  }

  componentDidMount() {
    this.showMenu('none')
  }

  componentWillUnmount() {
    this.showMenu('block')
  }

  render() {
    return (<div className={`${prefix} item-inner`}>
      <Title title='分销商报名' />
      <div className={`${prefix}-icon`}><Icon type="exclamation-circle" /></div>
      <div>本活动仅支持淘宝卖家报名参加</div>
    </div>)
  }
}

export default Forbid
