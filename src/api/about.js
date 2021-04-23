import request from '../utils/request'


/**
 * 保存一个about
 * @param param
 */
export function saveOneAbout(param) {

  return request({
    url: '/about/saveOneAbout',
    method: 'post',
    data: param
  })
}

/**
 * 由条件获取aboutList
 * @param param
 * @returns {AxiosPromise}
 */
export function getAboutListByCondition(param) {

  return request({
    url: '/about/list',
    method: 'post',
    data: param
  })
}

/**
 * 根据aboutId查询对应的About
 * @param aboutId
 * @returns {AxiosPromise}
 */
export function getAboutById(aboutId) {

  return request({
    url: '/about/getAboutById',
    method: 'get',
    params: {aboutId}
  })
}

export function getAboutHtml(aboutId) {
  return request({
    url: '/about/getAboutHtml',
    method: 'get',
    params: {aboutId}
  })
}

/**
 * 编辑一个About
 * @param param
 * @returns {AxiosPromise}
 */
export function editOneAbout(param) {
  return request({
    url: '/about/editOneAbout',
    method: 'post',
    data: param
  })
}

export function deleteOneAbout(aboutId) {
  return request({
    url: '/about/deleteOneAbout',
    method: 'get',
    params: {aboutId}
  })
}

export function clearAllAbout() {
  return request({
    url: '/about/clearAllAbout',
    method: 'get',
  })
}

export function returnAllAbout() {
  return request({
    url: '/about/returnAllAbout',
    method: 'get',
  })
}
