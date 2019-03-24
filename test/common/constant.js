const PREFIX = 'asset'

const FORM_ITEM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const FORM_ITEM_LAYOUT_HALF = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

const TAIL_FORM_ITEM_LAYOUT = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
}

const PAGINATION = {
  DEFAULT_PAGESIZE: 10,
}

const TITLES = {
  ROUTE: '素材下载',
  SKU: '商品报名',
  SELLER: '物料分销招商',
  GUIDE: '物料分销流程',
}

const LABELS = {
  FORBID: '仅限特邀用户申请，请耐心等待公开版本发布',
  CREATE_CODE: '申请流程： 申请商品素材 > 素材下载 > 商家生产 > 淘宝上架销售 > 支付宝商品报名 > 审核通过 > 销售商品',
  CREATE_SKU: '报名流程： 提交商品 > 审核商品 > 审核成功 > 支付宝APP-商家服务-物料商城销售',
  CURRENT_ALL: '当前申请总数',
  ESTIMATE_TIME: '（预计30分钟）',
  RED_CODE: '红包码',
}

const LINKS = {
  TEMPLATE_DOWNLOAD: '下载视觉模板',
  APPLY_CODE: '申请素材',
  APPLY_RIGHT_NOW: '立即申请',
  APPLY_SKU: '提交商品',
  SIGNUP_SKU: '商品报名',
  APPLY_IMMEDIATELY: '立即申请',
  CODE_DOWNLOAD: '下载电子码',

}

const ASSET_TYPE = {
  RED_PACKET_QRCODE: '红包码',
}

const ASSET_STATUS = {
  PROCESSING: {
    CODE: 'PROCESSING',
    NAME: '申请中',
  },
  COMPLETED: {
    CODE: 'COMPLETED',
    NAME: '已完成',
  },
  AUDIT_REJECT: {
    NAME: '审核未通过',
  },
  WAIT_AUDIT: {
    NAME: '审核中',
  },
  AUDIT_PASS: {
    NAME: '审核已通过',
  },
}

const MENU_URLS = {
  GUIDE: '/mart/seller/guide.htm',
  MATERIAL_APPLY: '/mart/seller/asset.htm#/list/material',
  ASSET: '/mart/seller/asset.htm#/list',
  SKU: '/mart/seller/sku.htm#/list',
}

const MENUS_CREATOR = [
  { name: '分销指南', href: MENU_URLS.GUIDE, key: 'guide' },
  { name: '素材申请', href: MENU_URLS.MATERIAL_APPLY, key: 'apply' },
  { name: '素材下载', href: MENU_URLS.ASSET, key: 'asset' },
  { name: '商品报名', href: MENU_URLS.SKU, key: 'sku' },
]

const MATERIAL_LINKS = {
  QRCODE: {
    name: '电子码',
    alias: '二维码图片',
    href: 'https://gw.alipayobjects.com/zos/rmsportal/DBGcEToTqOqKAchzVTIx.png',
    tracertId: 'c12616.d23126',
  },
  MATERIAL: {
    name: '视觉模板',
    alias: '源文件设计稿',
    href: 'https://gw.alipayobjects.com/zos/rmsportal/KsQQpNIEwMRRqfFilEdn.png',
    tracertId: 'c12616.d23129',
  },
  MATERIAL_WITH_QRCODE: {
    name: '合成码',
    alias: '物料带码图片',
    href: 'https://gw.alipayobjects.com/zos/rmsportal/UpiEipZdICpDqSgasYzH.png',
    tracertId: 'c12616.d24362',
  },
}

const FORBID_APPLY_CONFIRM = {
  TITLE: '暂无法提交商品',
  CONTENT: '请先申请素材后再提交商品报名',
  OKTEXT: '申请素材',
}

const IMAGES = {
  GUIDE: 'https://gw.alipayobjects.com/zos/rmsportal/BQAiobXeEySsTTvIeBmq.png',
}

module.exports = {
  PREFIX,
  FORM_ITEM_LAYOUT,
  TAIL_FORM_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT_HALF,
  PAGINATION,
  TITLES,
  LABELS,
  ASSET_TYPE,
  ASSET_STATUS,
  LINKS,
  MENUS_CREATOR,
  MENU_URLS,
  MATERIAL_LINKS,
  FORBID_APPLY_CONFIRM,
  IMAGES,
}
