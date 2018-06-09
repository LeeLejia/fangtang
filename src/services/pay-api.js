import Utils from 'Utils/utils'
import AxiosService from './axios-service'

const aliPay = async (outTradeNo, name, money, returnUrl) => {
  window.open(Utils.GetAlipaylink(outTradeNo, name, money, returnUrl), '支付宝支付')
}

export default { aliPay }
