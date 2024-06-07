import  request  from '@/utils/request'
export const  fetchBook = ()=>{
  return request.get('/admin/books')
}

