import { http } from '../utils/service'

// 登录模块
export const toLogin = (data) => {
  return http('/login/doLogin', data)
}
// 获取用户信息
export const toGetInfo = (data) => {
  return http('/user/getuserinfo', data)
}
// account log
export const accountLog = (data) => {
  return http('/user/getmoneylog', data)
}
// 退出
export const toLogout = (data) => {
  return http('/user/logout', data)
}
// 修改密码
export const editPassword = (data) => {
  return http('/user/password', data)
}
// 启用用户
export const setCleanStatus = (data) => {
  return http('/user/setStatus', data)
}
// 冻结和解冻用户
export const frozenUser = (data) => http('/user/setFreeze', data)
export const setpower = data => http('user/setPower', data)
// 获取权限列表
export const powewlist = (data) => {
  return http('/suser/getPowerList', data)
}
// 角色列表
export const AuthGroupList = (data) => {
  return http('/auth/groupList', data)
}
// 新增角色
export const AuthAddGroupPost = (data) => {
  return http('/auth/addGroupPost', data)
}
// 编辑角色
export const AuthEditGroup = (data) => {
  return http('/auth/editGroup', data)
}
// 确认编辑角色
export const AuthEditGroupPost = (data) => {
  return http('/auth/editGroupPost', data)
}
// 权限展示列表
export const AuthMenuList = (data) => {
  return http('/auth/menuList', data)
}
// 编辑菜单
export const AuthEditMenu = (data) => {
  return http('auth/editMenu', data)
}
// 确认新增菜单
export const addMenuPost = (data) => {
  return http('auth/addMenuPost', data)
}
// 确认编辑菜单
export const editMenuPost = (data) => {
  return http('auth/editMenuPost', data)
}
// 删除菜单
export const authMenuDelete = (data) => {
  return http('auth/menuDelete', data)
}
// 授权
export const authList = (data) => {
  return http('auth/auth', data)
}
// 确认授权
export const authPost = (data) => {
  return http('auth/authpost', data)
}
export const getSupplierList = (data) => {
  return http('user/adminList', data)
}

// 节点用户
export function getNodeInfo (obj) {
  return http('node_user/getInfo', obj)
}
// 修改系统配置
export function editsystem(obj) {
  return http('config/editPost', obj)
}
// 获取系统配置
export function getsystemlist(obj) {
  return http('config/list', obj)
}
// 奖励列表
export function awardsList (obj) {
  return http('config/awardsList', obj)
}
// 修改奖励配置
export function editAwardsPost (obj) {
  return http('config/editAwardsPost', obj)
}
// 获取财务明细
export function financeList (obj) {
  return http('finance/list', obj)
}
// 报名列表
export function signupList (obj) {
  return http('signup/signupList', obj)
}
// 开奖记录列表
export function drawLogList (obj) {
  return http('signup/drawLogList', obj)
}
// 删除动态
export function newsDelete (obj) {
  return http('news/delete', obj)
}
// 动态通知查看
export function newsDetail (obj) {
  return http('news/detail', obj)
}
// 动态通知添加/修改
export function newsPost (obj) {
  return http('news/post', obj)
}
// 动态通知记录
export function newsLists (obj) {
  return http('news/lists', obj)
}
// 用户列表
export function userList (obj) {
  return http('user/list', obj)
}
// 启用/禁用用户
export function setUserStatus (obj) {
  return http('user/setStatus', obj)
}
// 拼团列表
export function drawList (obj) {
  return http('draw_user/list', obj)
}
// 解锁
export function unlock (obj) {
  return http('user/unlock', obj)
}
// 锁住
export function lock (obj) {
  return http('user/lock', obj)
}
// 节点用户列表
export function nodelist (obj) {
  return http('node_user/list', obj)
}
// 添加编辑节点用户
export function addNodeUser (obj) {
  return http('node_user/add', obj)
}
// 节点用户详情
export function userDetail (obj) {
  return http('node_user/detail', obj)
}
// 节点用户删除
export function delNode (obj) {
  return http('node_user/del', obj)
}
// 查询
export function query (obj) {
  return http('user/query', obj)
}
// 设置/取消管理员
export const setAdmin = (data) => {
  return http('/user/setAdmin', data)
}
// 系统日志列表
export const adminlog = (data) => {
  return http('admin_log/list', data)
}
// 添加管理员
export const addAdmin = (data) => {
  return http('user/addAdmin', data)
}
// 查看子账号
export const childList = (data) => {
  return http('user/childList', data)
}
// 审核
export const audit = (data) => {
  return http('finance/audit', data)
}
// 审核列表
export const auditList = (data) => {
  return http('finance/auditList', data)
}
// 审核提交
export const auditPost = (data) => {
  return http('finance/auditPost', data)
}
// 添加充提记录
export const addAudit = (data) => {
  return http('finance/addAudit', data)
}
// 设置用户等级列表
export const settleList = (data) => {
  return http('user/settleList', data)
}
// 查看设置用户等级
export const settleDetail = (data) => {
  return http('user/settleDetail', data)
}
// 设置用户等级添加|修改
export const setSettle = (data) => {
  return http('user/setSettle', data)
}
// 删除设置用户等级
export const settleDel = (data) => {
  return http('user/settleDel', data)
}
// 查询明细
export const queryDetail = (data) => {
  return http('user/queryDetail', data)
}
// 开奖记录数据统计
export function drawTotal (obj) {
  return http('draw_user/total', obj)
}
// 获取当前用户的提现预警
export function getAmount (obj) {
  return http('user_alert/getAmount', obj)
}
// 新增或修改当前用户的提现预警
export function setAmount (obj) {
  return http('user_alert/setAmount', obj)
}
// 伞下用户-子账号列表
export function queryChildList (obj) {
  return http('user/queryChildList', obj)
}
// 添加线下社区用户
export function addcommunity (obj) {
  return http('offline_community/add', obj)
}
// 线下社区用户列表
export function communitylist (obj) {
  return http('offline_community/list', obj)
}
// 删除线下社区用户
export function delcommunity (obj) {
  return http('offline_community/del', obj)
}
// 线下社区用户详情
export function communitydetail (obj) {
  return http('offline_community/detail', obj)
}
// 用户列表统计
export function countList (obj) {
  return http('user/countList', obj)
}
// 统计提币待审核数量
export function pendingUsdt (obj) {
  return http('finance/pendingUsdt', obj)
}
// 资产列表
export function assetsList (obj) {
  return http('finance/assetsList', obj)
}
// 充燃油费
export function fuelCharge (obj) {
  return http('transfer/fuelCharge', obj)
}
// 更新链上资产
export function updateAssets (obj) {
  return http('finance/updateAssets', obj)
}
// 收回eth
export function collect (obj) {
  return http('usdt_collect/usdtgather', obj)
}
// 添加限制团队转币用户
export function limitAdd (obj) {
  return http('limit_transfer/add', obj)
}
// 限制团队转币用户列表
export function limitList (obj) {
  return http('limit_transfer/list', obj)
}
// 删除限制团队转币用户
export function limitDel (obj) {
  return http('limit_transfer/del', obj)
}
// baas列表
export function baaslist (obj) {
  return http('signup/baasList', obj)
}
// 用户baas详情
export function baasdetail (obj) {
  return http('signup/baasDetail', obj)
}
