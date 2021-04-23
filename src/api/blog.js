import request from '../utils/request'

/*
* 条件查询博客
* */
export function getBlogListByCondition(params) {

  return request({
    url: '/blog/list',
    method: 'post',
    data: params
  })
}

/**
 * 上传博客
 * @param params 博客信息
 */
export function uploadBlog(params) {

  return request({
    url: '/blog/save',
    method: 'post',
    data: params
  })
}

export function getBlogEditReturn(blogId) {

  return request({
    url: '/blog/blogEditReturn',
    method: 'get',
    params: {blogId}
  })
}

/**
 *
 * @param params
 */
export function editBlog(params) {

  return request({
    url: '/blog/blogEdit',
    method: 'post',
    data: params
  })
}

export function getBlogHtml(blogId) {

  return request({
    url: '/blog/blogHtml',
    method: 'get',
    params: {blogId}
  })
}

export function deleteBlogById(blogId) {

  return request({
    url: '/blog/deleteBlog',
    method: 'get',
    params: {blogId}
  })
}

export function deleteAllBlogs() {

  return request({
    url: '/blog/deleteAllBlogs',
    method: 'get'
  })
}

export function returnAllBlogs() {

  return request({
    url: '/blog/returnAllBlogs',
    method: 'get'
  })
}
