import api, { get } from "./api.js";
import vuex from "@/stores/index.js";

/**
 * 获取圈子总数
 * @author jsonleex <jsonlseex@163.com>
 * @return {Promise -> Number}
 */
export function getGroupTotalNumber() {
  return get("/plus-group/groups/count").then(
    ({ data: { count = 0 } }) => {
      return count;
    },
    err => {
      console.log(err);
      return 0;
    }
  );
}

/**
 * 获取圈子全部分类
 * @author jsonleex <jsonlseex@163.com>
 * @return {Promise -> Array}
 */
export function getGroupCates() {
  return get(`/plus-group/categories`)
    .then(({ data = [] }) => {
      vuex.commit("SAVE_GROUP_CATES", data);
    })
    .catch(err => {
      console.log(err);
      vuex.commit("SAVE_GROUP_CATES", []);
    });
}

/**
 * 获取我加入的圈子
 * @author jsonleex <jsonlseex@163.com>
 * @return {Promise -> Array}
 */
export function getMyGroups() {
  return get("/plus-group/user-groups").then(
    ({ data = [] }) => data,
    err => (err, [])
  );
}

/**
 * 获取推荐圈子
 * @author jsonleex <jsonlseex@163.com>
 * @return {Promise -> Array}
 */
export function getRecGroups() {
  return get("/plus-group/recommend/groups?type=random").then(
    ({ data = [] }) => {
      return Array.isArray(data) ? data : [];
    },
    err => (err, [])
  );
}

/**
 * 加入圈子
 * @author jsonleex <jsonlseex@163.com>
 * @param  {Number} GID
 * @return {[type]}
 */
export function joinGroup(GID) {
  return api.put(`/plus-group/groups/${GID}`, {
    validateStatus: s => s === 201
  });
}

/**
 * 获取指定用户已加入的圈子列表
 * @author jsonleex <jsonlseex@163.com>
 * @param  {Number} UID
 * @return {Promise -> Array}
 */
export function getGroupsByUser(UID, limit = 15, offset = 0) {
  // plus-group/groups/users
  return get(
    `/plus-group/groups/users?user_id=${UID}&limit=${limit}&offset=${offset}`
  );
}

export function getGroupsByCate(cate = -1, limit = 15, offset = 0) {
  const url =
    cate > -1
      ? `/plus-group/groups?category_id=${cate}`
      : "/plus-group/recommend/groups";
  return get(url, { limit, offset })
    .then(({ data = [] }) => {
      return data;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
}
