import  request  from '@/utils/request'
export const  fetchTeacherList = ()=>{
  return request.get('/admin/user')
}

