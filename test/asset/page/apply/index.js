import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, message, Icon } from 'antd'
import util from 'ant-util'
import Tracert, { SPM_PAGE } from '../../../common/spm'
import { PREFIX, FORM_ITEM_LAYOUT_HALF } from '../../../common/constant'
import Waiting from '../../../components/Waiting'
import PageTitle from '../../../components/PageTitle'
import './index.less'

const { matchOne } = util
const { gets, get } = util.plugins.exist
const prefix = `${PREFIX}-apply`
const FormItem = Form.Item

const ApplyWrapper = (WrappedComponent) => {
  return class extends Component {
    state = {}

    componentDidMount() {
      const { dispatch } = this.props
      dispatch({
        type: 'apply/sellerApply',
      })
      // 埋点
      Tracert.config({
        spmAPos: SPM_PAGE.A,
        spmBPos: SPM_PAGE.APPLY_B,
      })
      Tracert.logPv()
    }

    onSubmit = (data, callback) => {
      const { dispatch } = this.props
      dispatch({
        type: 'apply/postSellerApply',
        payload: data,
      }).then((data) => {
        const resultMsg = get(data, 'data.rejectMsg')
        if (resultMsg) {
          message.warning(resultMsg)
        } else if (data.success === true) {
          callback()
        }
      })
    }

    render() {
      const listeners = {
        onSubmit: this.onSubmit,
      }
      return <WrappedComponent {...this.state} {...listeners} {...this.props} />
    }
  }
}

@ApplyWrapper
@Form.create()
class Apply extends Component {
  state = {
    checkSuccess: false,
  }

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

  renderLoading = () => {
    return <Waiting />
  }

  renderFailure = () => {
    return null
  }

  checkSuccess = () => {
    this.setState({
      checkSuccess: true,
    })
    this.showMenu('block')
    // 埋点
    Tracert.config({
      spmAPos: SPM_PAGE.A,
      spmBPos: SPM_PAGE.APPLYED_B,
    })
    Tracert.logPv()
  }

  onSubmit = () => {
    const { getFieldsValue, validateFields } = this.props.form
    validateFields((error, values) => {
      if (values && !error) {
        const data = getFieldsValue()
        this.props.onSubmit(data, this.checkSuccess)
      }
    })
    Tracert.click('c12595.d23089')
  }

  renderSuccess = (data) => {
    const { getFieldDecorator } = this.props.form
    const contactNameValidator = (rule, val = '', callback) => {
      const getLen = (s) => s.split('').reduce((m, i) => m + (/^[\u4e00-\u9fa5]$/.test(i) ? 2 : 1), 0)
      if (getLen(val) > 25) {
        callback(['联系人姓名长度为2~25个字，一个汉字2个字'])
      } else {
        callback([])
      }
    }
    return <Form>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} label="淘宝店铺名">
        {data.shopName}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} label="淘宝店铺地址">
        {data.shopUrl}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} label="支付宝账号">
        {data.logonId}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} label="联系人">
        {
          getFieldDecorator('contactName', {
            rules: [
              { required: true, message: '联系人不能为空' },
              { validator: contactNameValidator },
            ],
          })(<Input />)
        }
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} label="手机号">
        {
          getFieldDecorator('contactMobile', {
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '手机号不能为空' },
              { pattern: /^1\d{10}$/, message: '手机号应为1开头的11位数字' },
            ],
          })(<Input />)
        }
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} colon={false} label=" ">
        查看 <a href="https://render.alipay.com/p/f/fd-jd2jj9kt/index79sd84n76t.html" target="_blank" rel="noopener noreferrer">《合作协议》</a>
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_HALF} colon={false} label=" ">
        <Button onClick={this.onSubmit} type="primary">同意协议并提交</Button>
      </FormItem>
    </Form>
  }

  renderCheckSuccess = () => {
    return <div className={`${prefix}-apply`}>
      <Icon className={`${prefix}-apply-icon`} type="check-circle" />
      <div className={`${prefix}-apply-title`}>报名成功</div>
      <div>你可以：电子码申请 > 下载视觉模版 > 将电子二维码合成至视觉模版中央空白处 > 生产> 在你的店铺销售</div>
      <div>（也可通过商品报名申请到支付宝APP-商家服务-物料商城销售）</div>
    </div>
  }

  render() {
    const { checkSuccess } = this.state
    const { success, data } = this.props

    return (<div className={`${prefix} item-inner`}>
      <PageTitle title="物料分销招商" />
      {matchOne([{
        condition: checkSuccess === true, action: this.renderCheckSuccess,
      }, {
        condition: success === undefined, action: this.renderLoading,
      }, {
        condition: success === true, action: this.renderSuccess,
      }, {
        condition: success === false, action: this.renderFailure,
      }])(data)}
    </div>)
  }
}

const mapStateToProps = (state) => {
  return gets(state, {
    data: {},
  })({
    success: 'apply.apply.success',
    errorMsg: 'apply.apply.errorMsg',
    data: 'apply.apply.data',
  })
}

export default connect(mapStateToProps)(Apply)
