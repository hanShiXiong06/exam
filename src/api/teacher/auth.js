import  request  from '@/utils/request'
export const  register = ()=>{
  return request.post('/api/user/query')
}

export const  login = (params)=>{
  return request.post('/admin/auth/login',params)
}
