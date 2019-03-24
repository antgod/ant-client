import React, { Component } from 'react'
import { Button, Table } from 'antd'
import util from 'ant-util'
import { LABEL, PRODUCT, PREFIX } from '../../../common/constant'
import Title from '../../../components/Title'

const { guard, allness, always } = util
const prefix = `${PREFIX}-result`

class ResultTable extends Component {
  render() {
    const columns = [{
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: '33%',
    }, {
      title: '开通时间',
      dataIndex: 'openTime',
      key: 'openTime',
      width: '33%',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status, item) => {
        const { productCode } = item

        const link = guard(allness(productCode === PRODUCT.AGREEMENT_DEPOSIT.CODE, !status), always(
          <a className={`${prefix}-table-link`}>{LABEL.SIGN.RESULT.WRITE_INFO}</a>
        ), always(null))()

        return <div>
          {status ? LABEL.SIGN.RESULT.ALL : <span className="error">
            {LABEL.SIGN.RESULT.NONE}
          </span>}
          {link}
        </div>
      },
    }]
    const { result } = this.props
    return <div>
      <Table columns={columns} dataSource={result}/>
    </div>
  }
}

const AddAssetAccount = ({ accountCount }) => {
  return <div>
    <Title title="添加账户集" />
    <div className={`${PREFIX}-result-add-asset-acount item-inner clearfix`}>
      <div className={`${PREFIX}-result-add-asset-acount-left`}>
        发现您名下有
        <span className="orange bold">{accountCount}个</span>
        支付宝账户可以添加到账户级，获得
        <span className="orange bold">查询、转账、资金</span>
        调拨的权限,实现一站式账户管理,后续也可以在"账户中心>账户集管理"中添加支付宝账户
      </div>
      <div className={`${PREFIX}-result-add-asset-acount-right`}>
        <Button>现在添加</Button>
      </div>
    </div>
  </div>
}

const AddAssetTransfer = () => {
  const columns = [{
    title: '计划说明',
    dataIndex: 'desc',
    key: 'desc',
    width: '25%',
  }, {
    title: '预计年化收益',
    dataIndex: 'returns',
    key: 'returns',
    width: '25%',
    render: (returns) => {
      return <span className="orange">{returns}</span>
    },
  }, {
    title: '服务提供方',
    dataIndex: 'provide',
    key: 'provide',
  }, {
    title: '产品备注',
    dataIndex: 'remark',
    key: 'remark',
    render: (remark) => {
      return <span className="orange">{remark}</span>
    },
  }]
  const result = [{
    desc: '盘活支付宝余额，实现收益最大化',
    returns: '1.437%',
    provide: '招商银行',
    remark: '保本保收益存款',
  }]
  return <div>
    <Title title="资金调拨任务推荐" />
    <Table columns={columns} dataSource={result}/>
  </div>
}

export {
  ResultTable,
  AddAssetAccount,
  AddAssetTransfer,
}
