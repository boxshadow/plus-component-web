import api, { limit } from "./api.js";

/**
 * 获取当前用户投稿列表
 * @Author   Wayne
 * @DateTime 2018-04-28
 * @Email    qiaobin@zhiyicx.com
 * @param    {Number}   type [类型: 0: 已发布, 1: 待审核, 2: 已驳回]
 * @return   [Promise]
 */
export function getMyNews({ type = 0, limit = 15, after = 0 }) {
  return api.get("/user/news/contributes", {
    type,
    limit,
    after
  });
}

/**
 * 新增投稿
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Number} categoryId
 * @param {Object} params
 * @param {String} params.title 标题
 * @param {String} params.content 内容
 * @param {Number|Number[]} params.tags 标签id或其数组
 * @param {String=} params.subject 概要
 * @param {Number=} params.image 缩略图
 * @param {String=} params.from 资讯来源
 * @param {String=} params.author 作者
 * @param {String=} params.text_content 纯文本
 * @returns {Promise}
 */
export function postNews(categoryId, params) {
  return api.post(`/news/categories/${categoryId}/currency-news`, params, {
    validateStatus: s => s === 201
  });
}

/**
 * 搜索资讯
 * @author jsonleex <jsonlseex@163.com>
 * @param  {String} key
 * @param  {Number} limit
 * @param  {Number} after
 * @return {Promise -> Array}
 */
export function searchNewsByKey(key = "", limit = 15, after = 0) {
  return !key
    ? Promise.resolve([])
    : api.get(`/news?key=${key}&limit=${limit}&after=${after}`).then(
        ({ data = [] }) => {
          return data;
        },
        err => {
          console.log(err);
          return [];
        }
      );
}

export function getNewsCommentPinneds(after = 0) {
  return api.get("/news/comments/pinneds", {
    limit,
    after
  });
}

/**
 * 删除评论
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Number} newsId 资讯 id
 * @param {Number} commentId 评论 id
 * @returns {Promise}
 */
export function deleteNewsComment(newsId, commentId) {
  return api.delete(`/news/${newsId}/comments/${commentId}`, {
    validateStatus: s => s === 204
  });
}
