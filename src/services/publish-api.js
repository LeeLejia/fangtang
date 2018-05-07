import AxiosService from './axios-service'

const publish = async data => AxiosService.postKV('/api/publish', data)

export default { publish }
