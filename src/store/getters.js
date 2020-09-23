const getters = {
  token: state => state.user.token,
  sidebar: state => state.app.sidebar,
  name: state => state.user.userinfo.nickname,
  avatar: state => state.user.userinfo.avatar,
  device: state => state.app.device,
  userinfo: state => state.user.userinfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
