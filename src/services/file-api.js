import AxiosService from './axios-service'

const queryFiles = async (type, query, start, offset) => AxiosService.postKV('/api/listFiles', {
  type, query, start, offset, osType: 'web',
})

const deleteFile = async id => AxiosService.get('/api/deleteFile', { id })
// todo fix upload api
const uploadFile = async () => AxiosService.get('/api/upload')

export default { queryFiles, deleteFile, uploadFile }
