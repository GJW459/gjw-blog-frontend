import request from "../utils/request"

/*
*  查找所有的type
* */
export function getTypeList() {

  return request({

      url: '/type/list',
      method: 'get'
    }
  )

}

export function getAllTypeInfo() {

  return request({
    url: '/type/listAllTypesReturn',
    method: 'get'
  })
}

export function getTypeByCondition(params) {

  return request({
    url: '/type/getTypeByCondition',
    method: 'post',
    data: params
  })
}

export function insertOneType(params) {

  return request({
    url: '/type/insertOneType',
    method: 'post',
    data: params
  })

}

export function getTypeById(typeId) {

  return request({
    url: '/type/getTypeById',
    method: 'get',
    params: {typeId}
  })
}

export function editOneType(params) {

  return request({
    url: '/type/editOneType',
    method: 'post',
    data: params
  })

}

export function deleteOneType(typeId) {

  return request({
    url: '/type/deleteOneType',
    method: 'get',
    params: {typeId}
  })
}

export function deleteAllTypes() {

  return request({
    url: '/type/deleteAllTypes',
    method: 'get',
  })
}

export function returnAllTypes() {

  return request({
    url: '/type/returnAllTypes',
    method: 'get',
  })
}

