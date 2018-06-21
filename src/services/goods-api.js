import AxiosService from './axios-service'

const getGoods = async query => AxiosService.postKV('/api/getGoods', query)
const addGood = async good => AxiosService.postKV('/api/addGood', good)

export default { getGoods, addGood }
