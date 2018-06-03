import Utils from 'Utils/utils'
import AxiosService from './axios-service'

const aliPay = async (goodType) => {
  const url = await AxiosService.postKV('/api/pay', { goodType })
  console.log(url)
  window.open(url.data.url, '支付宝支付')
}

export default { aliPay }
