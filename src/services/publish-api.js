import AxiosService from './axios-service'

const publish = async data => AxiosService.postKV('/api/publish', data)

const getTask = async (start, count) => AxiosService.postKV('/api/getTask', { start, count, osType: 'web' }, {})

export default { publish, getTask }
