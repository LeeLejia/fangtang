import Utils from 'Utils/utils'
import AxiosService from './axios-service'
// return 后会带上参数:money=0.11&name=二手书一本&out_trade_no=123456&pid=7266&trade_no=2018060222421456619&trade_status=TRADE_SUCCESS&type=alipay&sign=ad76003fb5de12af6531e79090733715&sign_type=MD5
// 父子窗通信
const aliPay = async (goodType, count, returnUrl) => AxiosService.postKV('/api/pay', { goodType, count, returnUrl })

const getOrders = async query => AxiosService.postKV('/api/getOrders', query)

export default { aliPay, getOrders }
