const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  // 颜色配置
  colors: state => state.app.colors,
  gradeData: state => state.app.gradeData,
  classData: state => state.app.classData,
  studentData: state => state.app.studentData
}
export default getters
