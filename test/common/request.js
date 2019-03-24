import ajax from '@alipay/ajax'
import { message } from 'antd'

const DEFAULT_SUCCESS_MARK = 'success'

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      method: 'GET',
      type: 'json',
      cache: false,
      timeout: 60 * 1000,
    }
    const finalOptions = { ...defaultOptions, ...options }
    ajax({
      ...finalOptions,
      success: (response) => {
        if (response.stat === 'deny' && response.target) {
          window.location.href = response.target
        } else if (options.successMark && response[options.successMark]) {
          resolve(response)
        } else if (response[DEFAULT_SUCCESS_MARK]) {
          resolve(response)
        } else {
          const errorMessage = response.message || response.errorMessage || response.errorMsg || '服务异常，请稍后再试'
          reject(errorMessage)
        }
      },
      error: () => {
        const errorMessage = '网络异常，请稍后再试'
        reject(errorMessage)
      },
    })
  })
}

export function resolveHandler(response) {
  return response
}

export function rejectHandler(errorMessage) {
  message.error(errorMessage)
  console.error(errorMessage)
  return {
    success: false,
    errorMessage,
  }
}
