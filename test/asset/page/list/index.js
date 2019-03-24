import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'dva'
import util from 'ant-util'
import { Table, Form, Button, Modal, Input, Select } from 'antd'
import { PREFIX, PAGINATION, ASSET_STATUS, FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, LINKS, TITLES, LABELS, MATERIAL_LINKS, MENUS_CREATOR } from '../../../common/constant'
import Tracert, { SPM_PAGE } from '../../../common/spm'
import PageTitle from '../../../components/PageTitle'
import Waiting from '../../../components/Waiting'
import ListSideBar from '../../../components/ListSideBar'
import './index.less'

// 工具包获取
const { matchOne, guard } = util
const { get, gets } = util.plugins.exist
const prefix = `${PREFIX}-list`
const FormItem = Form.Item
const multiple = 100
const MATERIAL_APPLY_PAGE = '/list/material'

const columns = [{
  title: '素材种类',
  dataIndex: 'assetName',
  key: 'assetName',
  render: (assetName) => {
    return <div>{assetName || LABELS.RED_CODE}</div>
  },
}, {
  title: '申请数量',
  dataIndex: 'applyCount',
  key: 'applyCount',
  render: (applyCount) => {
    return <div>{applyCount || '/'}</div>
  },
}, {
  title: '申请日期',
  dataIndex: 'applyTime',
  key: 'applyTime',
  render: (applyTime) => {
    return <div>{moment(applyTime).format('YYYY-MM-DD')}</div>
  },
}, {
  title: '申请进度',
  dataIndex: 'status',
  key: 'status',
  render: (status, data) => {
    const ProcessingComponent = () => {
      return <div>
        <div>{ASSET_STATUS.PROCESSING.NAME}</div>
        <div>{LABELS.ESTIMATE_TIME}</div>
      </div>
    }

    const CompletedComponent = () => {
      return <div>
        <span>{ASSET_STATUS.COMPLETED.NAME}</span>
      </div>
    }
    return guard(status === ASSET_STATUS.PROCESSING.CODE, ProcessingComponent, CompletedComponent)(data)
  },
}, {
  title: '',
  render: (data) => {
    const { href, name } = MENUS_CREATOR[3]
    const onDownload = (materialType) => {
      Tracert.click(MATERIAL_LINKS[materialType].tracertId)
    }
    const newHref = data.assetBizId ? `${href}?assetBizId=${data.assetBizId}` : href
    return <div>
      {
        data.status === 'COMPLETED' ? (
          <div>
            <a href={data.fileUrl}
               className={`${prefix}-link`} download target="_blank" rel="noopener noreferrer"
               onClick={() => onDownload(data.materialType)}>{`下载${MATERIAL_LINKS[data.materialType].alias}`}</a>
            <a href={ newHref }
               onClick={() => Tracert.click('c12616.d24363')}
               className={`${prefix}-link`} rel="noopener noreferrer">{name}</a>
          </div>
        ) : ('')
      }
    </div>
  },
}]

const ListWrapper = (WrappedComponent) => {
  return class extends Component {
    state = {
      current: 1,
    }

    onSearchList = (current) => {
      const { dispatch } = this.props
      dispatch({
        type: 'list/queryAssetApplyHistory',
        payload: {
          pageNum: current,
          pageSize: PAGINATION.DEFAULT_PAGESIZE,
        },
      })
    }

    componentDidMount() {
      this.onSearchList(this.state.current)
      // 埋点
      Tracert.config({
        spmAPos: SPM_PAGE.A,
        spmBPos: SPM_PAGE.ASSET_B,
      })
      Tracert.logPv()
    }

    onChangePage = (current) => {
      this.onSearchList(current)
      this.setState({ current })
    }

    checkAssetApply = (spuCategoryId, callback) => {
      const { dispatch } = this.props
      dispatch({
        type: 'list/assetApplyCheck',
        payload: {
          spuCategoryId,
        },
      }).then(({ success }) => {
        callback(success)
      })
    }

    getSpuCateGory = (callback) => {
      const { dispatch } = this.props
      dispatch({
        type: 'list/spuCateGory',
      }).then(({ success, data }) => {
        if (success === true) {
          callback(data)
        }
      })
    }

    onSubmit = (payload, callback) => {
      const { dispatch } = this.props
      dispatch({
        type: 'list/assetApply',
        payload,
      }).then(({ success }) => {
        if (success === true) {
          this.onSearchList(this.state.current)
          callback()
        }
      })
    }

    render() {
      const listeners = {
        checkAssetApply: this.checkAssetApply,
        onChange: this.onChangePage,
        onSubmit: this.onSubmit,
        getSpuCateGory: this.getSpuCateGory,
      }
      return <WrappedComponent {...this.state} {...listeners} {...this.props} />
    }
  }
}

const MaterialPreview = (props) => {
  return props.showPreviewArea &&
    (<div className={`${prefix}-material-link`}>
      <p className={`${prefix}-material-link-text`}>
        { `下载${MATERIAL_LINKS[props.materialType].alias}` }
      </p>
      <div className={`${prefix}-material-link-img`} style={{ backgroundImage: `url(${props.logo || MATERIAL_LINKS[props.materialType].href})` }}></div>
    </div>)

}

@ListWrapper
@Form.create()
class List extends Component {
  state = {
    showApplyModal: false,
    spuCategoryList: [],
    showPreviewArea: false,
    materialType: '',
    logo: '',
    checkStatus: false,
  }

  renderLoading = () => {
    return <Waiting />
  }

  showApplyModal = () => {
    this.setState({
      showApplyModal: true,
    }, this.getSpuCateGory)
  }
  onAssetApplyClick = () => {
    this.showApplyModal()
    Tracert.click('c12616.d24365')
  }

  onGuideAssetApplyClick = () => {
    this.showApplyModal()
    Tracert.click('c12616.d23124')
  }

  onHideApplyModal = () => {
    this.setState({
      showApplyModal: false,
    }, this.goToPage('/list'))
    Tracert.click('c12616.d24364')
  }

  goToPage = (path) => () => location.hash = path

  checkAssetApply = (payload, callback) => {
    this.props.checkAssetApply(payload, callback)

  }

  getSpuCateGory = () => {
    this.props.getSpuCateGory(this.renderCategory)
  }

  renderCategory = (data) => {
    this.setState({
      spuCategoryList: data.spuCategoryList,
    })
  }

  onApplyCheck = (success, props) => {
    this.setState({
      showPreviewArea: props.materialType,
      materialType: props.materialType,
      logo: props.logo,
      checkStatus: success,
    }, () => {
      this.props.form.validateFields()
    })
  }

  onSelectChange = (spuCategoryId, { props }) => {
    this.checkAssetApply(spuCategoryId, success => {
      this.onApplyCheck(success, props)
    })
    Tracert.click('c12616.d24369')
  }

  onSubmit = () => {
    const { validateFields, getFieldValue } = this.props.form
    validateFields((error, values) => {
      if (values && !error) {
        const assetBizId = getFieldValue('assetBizId')
        const applyCount = Number(getFieldValue('applyCount') || 0) * 100
        this.props.onSubmit({
          assetBizId,
          applyCount,
        }, this.onHideApplyModal)
      }
    })
    Tracert.click('c12616.d23125')
  }

  renderList = (_, total, list) => {
    const { current, onChange } = this.props
    const pagination = {
      current,
      total,
      pageSize: PAGINATION.DEFAULT_PAGESIZE,
      onChange,
    }

    return <Table dataSource={list} columns={columns} pagination={pagination} rowKey="id" />
  }

  renderFailure = () => {
    return null
  }

  renderGuide = () => {
    return <div className={`${prefix}-apply`}>
      <div>
        <img className={`${prefix}-apply-img`} src="https://gw.alipayobjects.com/zos/rmsportal/MKzCreXPKbqLjxttXedK.png" />
      </div>
      <div className={`${prefix}-apply-text`}>{LABELS.CREATE_CODE}</div>
      <Button onClick={this.onGuideAssetApplyClick} type="primary" className={`${prefix}-button`}>{LINKS.APPLY_CODE}</Button>
    </div>
  }

  renderApplyModal = () => {
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const { showApplyModal, spuCategoryList, showPreviewArea, materialType, logo, checkStatus } = this.state
    const applyCount = Number(getFieldValue('applyCount') || 0)
    const Option = Select.Option

    const applyCountValidator = (rule, val = '', callback) => {
      if (!/^\d+$/.test(val)) {
        callback(['申请数量必须为数字'])
      } else if (!/^\d{1,2}$|^100$/.test(val)) {
        callback(['每天最多可申请10000个红包电子码'])
      } else {
        callback([])
      }
    }

    const hasErrors = (fieldsError) => {
      return Object.keys(fieldsError).some(field => {
        return materialType !== 'MATERIAL' ? fieldsError[field] : null
      })
    }
    const assetBizIdError = isFieldTouched('assetBizId') && getFieldError('assetBizId')
    const applyCountError = isFieldTouched('applyCount') && getFieldError('applyCount')
    return <Modal
      title={LINKS.APPLY_CODE}
      visible={showApplyModal}
      footer={null}
      onCancel={this.onHideApplyModal}
    >
      <Form>
        <FormItem {...FORM_ITEM_LAYOUT} label="素材种类" validateStatus={assetBizIdError ? 'error' : ''}>
          {
            getFieldDecorator('assetBizId', {})(
              <Select onSelect={this.onSelectChange}>
                {
                  spuCategoryList.map((category) => {
                    return <Option value={category.id} key={category.id} materialType={category.materialType} logo={category.logo}>{category.name}</Option>
                  })
                }
              </Select>
            )
          }
          <MaterialPreview
            showPreviewArea={showPreviewArea}
            materialType={materialType}
            logo={logo}
          />
        </FormItem>
        {
          materialType !== 'MATERIAL' && (
            <FormItem {...FORM_ITEM_LAYOUT} label="申请数量" validateStatus={applyCountError ? 'error' : ''}>
              <div>
                {
                  getFieldDecorator('applyCount', {
                    rules: [
                      { required: true, message: '申请数量不能为空' },
                      { validator: applyCountValidator },
                    ],
                  })(<Input className={`${prefix}-input`}
                            placeholder='最多100'
                            disabled={!checkStatus}/>)
                }
                <span className={`${prefix}-unit`}> × {multiple}</span>
              </div>
              {applyCount > 0 && <div>{LABELS.CURRENT_ALL}{applyCount * multiple}</div>}
            </FormItem>)
        }
        <FormItem {...TAIL_FORM_ITEM_LAYOUT} className={`${prefix}-footer`}>
          <Button
            className={(hasErrors(getFieldsError()) || !checkStatus) ? `${prefix}-button-forbid` : ''}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError()) || !checkStatus}
            onClick={this.onSubmit}
          >
            {LINKS.APPLY_RIGHT_NOW}
          </Button>
          <Button
            className={`${prefix}-button-right`}
            type="cancel"
            onClick={this.onHideApplyModal}
          >
            取消
          </Button>
        </FormItem>
      </Form>
    </Modal>
  }

  componentDidMount() {
    if (get(this.props, 'location.pathname') === MATERIAL_APPLY_PAGE) {
      this.showApplyModal()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (get(nextProps, 'location.pathname') === MATERIAL_APPLY_PAGE && get(this.props, 'location.pathname') !== MATERIAL_APPLY_PAGE) {
      this.showApplyModal()
    }
  }
  render() {
    const { success, errorMsg, total, list, location } = this.props
    const links = (<div className={`${prefix}-links`}>
      <Button onClick={this.onAssetApplyClick} type="primary" className={`${prefix}-button`}>{LINKS.APPLY_CODE}</Button>
    </div>)
    const hashKey = {
      '/list/material': 'apply',
      '/list': 'asset',
    }
    const selectedKey = hashKey[location.pathname]

    return <ListSideBar defaultSelectedKeys={['asset']} selectedKeys={[selectedKey || 'asset']}><div className={`${prefix} item-inner`}>
      {this.renderApplyModal()}
      <PageTitle title={TITLES.ROUTE} link={total !== 0 && links} />
      {matchOne([{
        condition: success === undefined, action: this.renderLoading,
      }, {
        condition: success === true && total === 0, action: this.renderGuide,
      }, {
        condition: success === true && total !== 0, action: this.renderList,
      }, {
        condition: success === false, action: this.renderFailure,
      }])(errorMsg, total, list)}
    </div>
    </ListSideBar>
  }
}

const mapStateToProps = (state) => {
  return gets(state, {
    list: [],
    total: 0,
  })({
    success: 'list.list.success',
    errorMsg: 'list.list.errorMsg',
    total: 'list.list.data.totalItems',
    list: 'list.list.data.contents',
  })
}

export default connect(mapStateToProps)(List)
