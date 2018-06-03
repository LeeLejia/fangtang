import Utils from 'Utils/utils'
import AxiosService from './axios-service'

const aliPay = async (goodType, count, returnUrl) => AxiosService.postKV('/api/pay', { goodType, count, returnUrl })

export default { aliPay }
