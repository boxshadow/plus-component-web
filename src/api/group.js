import api from "./api";
import { limit } from "./index";

/**
 * 获取圈子总数
 * @author jsonleex <jsonlseex@163.com>
 * @returns {Promise<number>}
 */
export function getGroupTotalNumber() {
  return api
    .get("/plus-group/groups/count")
    .then(({ data: { count = 0 } }) => count)
    .catch(() => {
      return 0;
    });
}

/**
 * 获取推荐圈子
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} [params]
 * @param {number} [params.limit]
 * @param {number} [params.offset]
 * @param {string} [params.type]
 * @returns {Promise<GroupObject[]>}
 */
export function getRecommendGroups(params) {
  const url = "/plus-group/recommend/groups";
  return api.get(url, { params, validateStatus: s => s === 200 });
}

/**
 * 获取我加入的圈子
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} params
 * @param {number} params.limit
 * @param {number} params.offset
 * @param {string} params.type
 * @returns {Promise<GroupObject[]>}
 */
export function getMyGroups(params) {
  const url = "/plus-group/user-groups";
  return api.get(url, { params, validateStatus: s => s === 200 });
}

/**
 * 获取待审核的帖子置顶申请
 * @Author   Wayne
 * @DateTime 2018-05-04
 * @Email    qiaobin@zhiyicx.com
 * @param    {number}            after [description]
 * @returns
 */
export function getPostAudits({ after = 0, group = 0 }) {
  const params = { after, limit, group };
  return api.get("/plus-group/pinned/posts", { params });
}

export function getPostCommentAudits({ after = 0, post = 0 }) {
  const params = { after, limit, post };
  return api.get("/plus-group/pinned/comments", { params });
}
