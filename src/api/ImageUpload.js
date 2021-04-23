import request from '../utils/request'

/**
 * 图片上传
 * @param params
 * @returns {AxiosPromise}
 */
export function uploadFileRequest (params) {

  return request({

    url:'/image/upload',
    method:'post',
    data:params,
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })

}
