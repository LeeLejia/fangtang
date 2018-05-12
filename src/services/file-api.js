import { convertToSHA256 } from 'Utils/sha256'
import AxiosService from './axios-service'

const queryFiles = async (type, name, start, count) => AxiosService.postKV('/api/listFiles', {
  type, name, start, count, osType: 'web',
})

const deleteFile = async (id, hash) => AxiosService.get('/api/deleteFile', { id, hash })

const checkHash = async hash => AxiosService.get('/api/checkSha256', { hash })

const uploadFile = async (file, processCallback = null) => {
  let keyData = null
  // 最大切割10M部分校验,文件信息加盐
  if (file.size > 10 * 1024 * 1024) {
    keyData = (file.slice && file.slice(0, 10 * 1024 * 1024))
        || (file.mozSlice && file.mozSlice(0, 10 * 1024 * 1024))
        || (file.webkitSlice && file.webkitSlice(0, 10 * 1024 * 1024))
  } else {
    keyData = file
  }
  const hash = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsBinaryString(keyData)
    reader.onloadend = () => {
      const key = convertToSHA256(reader.result)
      resolve(key)
    }
  })
  const hashCheck = await checkHash(hash)
  if (hashCheck.code !== 200) {
    return hashCheck
  }
  // 文件已经存在
  if (hashCheck.data.exist) {
    return { code: hashCheck.code, data: hashCheck.data, status: true }
  }
  // 文件不存在
  const formData = new FormData()
  formData.append('hash', hash)
  formData.append('file', file)
  return AxiosService.post('/api/uploadFile', formData, { onUploadProgress: processCallback || (() => {}) })
}

export default { queryFiles, deleteFile, uploadFile }
