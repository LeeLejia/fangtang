import AxiosService from './axios-service'


const login = async (account, password) => AxiosService.postKV('/api/login', { account, pwd: password, osType: 'web' })

const register = async data => AxiosService.postKV('/api/register', data)

const logout = async () => AxiosService.get('/api/logout')

const modifyUser = async (infos) => AxiosService.postKV('/api/userModify', { ...infos, osType: 'web' })

export default { login, register, logout, modifyUser }
