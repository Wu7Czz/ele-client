// import Cookies from 'js-cookie'
import { httpGetGradeData, httpGetClassData } from '@/api/index'
const app = {
  state: {
    colors: {
      breakfast: '#FF6666',
      lunch: '#0099CC',
      supper: '#99CC66',
      none: '#777'
    },
    gradeData: [],
    classData: [],
    studentData: {
      'fadsf': [
        {
          'name': '小四2',
          'id': 'adfdsf',
          'classId': 'fadsf',
          'className': '01班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        },
        {
          'name': '小san',
          'id': 'adfdsf',
          'classId': 'fadsf',
          'className': '01班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        },
        {
          'name': '王五',
          'id': 'adfdsf',
          'classId': 'fadsf',
          'className': '01班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }
      ],
      'fad121sf': [
        {
          'name': '赵八',
          'id': 'adfd3gr4g4sf',
          'classId': 'fad121sf',
          'className': '02班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        },
        {
          'name': '谢久',
          'id': 'adfdgwhfhsehsf',
          'classId': 'fad121sf',
          'className': '02班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        },
        {
          'name': '伞八',
          'id': '34r34r4',
          'classId': 'fad121sf',
          'className': '02班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        },
        {
          'name': '周武王',
          'id': 'fads',
          'classId': 'fad121sf',
          'className': '02班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }
      ],
      'afdsf': [
        {
          'name': '1小四2',
          'id': '1adfdsf',
          'classId': 'afdsf',
          'className': '01班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        },
        {
          'name': '1小san',
          'id': '1adfdsf',
          'classId': 'afdsf',
          'className': '01班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        },
        {
          'name': '1王五',
          'id': '1adfdsf',
          'classId': 'afdsf',
          'className': '01班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }
      ],
      '23434': [
        {
          'name': '1赵八',
          'id': '1adfd3gr4g4sf',
          'classId': '23434',
          'className': '02班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        },
        {
          'name': '1谢久',
          'id': '1adfdgwhfhsehsf',
          'classId': '23434',
          'className': '02班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        },
        {
          'name': '1伞八',
          'id': '134r34r4',
          'classId': '23434',
          'className': '02班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        },
        {
          'name': '1周武王',
          'id': '1fads',
          'classId': '23434',
          'className': '02班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }
      ]
    },
    holidays: {
      'all': [
        {
          title: '天气不好，放三天假',
          start: '2019-4-23',
          end: '2019-4-25',
          span: 3
        }
      ],
      'g2020': [
        {
          title: '高三考试，放两天假',
          start: '2019-4-29',
          end: '2019-4-30',
          span: 2
        }
      ]
    },
    workdays: {
      'all': [
        {
          title: '五一放假，调班一天',
          start: '2019-4-28',
          end: '2019-4-28',
          span: 3
        }
      ],
      'g2020': [
        {
          title: '高二考试',
          start: '2019-4-30',
          end: '2019-4-30',
          span: 2
        },
        {
          title: '高二考试',
          start: '2019-4-27',
          end: '2019-4-27',
          span: 2
        }
      ]
    }
  },
  mutations: {
    SET_GRADEDATA: (state, gradeData) => {
      state.gradeData = gradeData
    },
    SET_CLASSDATA: (state, classData) => {
      state.classData = classData
    },
    SET_STUDENTDATA: (state, studentData) => {
      state.studentData = studentData
    }
  },
  actions: {
    // 获取年级信息
    GetGradeData({ commit }) {
      return new Promise((resolve, reject) => {
        httpGetGradeData().then(response => {
          const data = response.data || []
          commit('SET_GRADEDATA', data)
          resolve()
        }).catch(error => {
          commit('SET_GRADEDATA', [])
          reject(error)
        })
      })
    },
    // 获取班级信息
    GetClassData({ commit }) {
      return new Promise((resolve, reject) => {
        httpGetClassData().then(response => {
          const data = response.data || []
          commit('SET_CLASSDATA', data)
          resolve()
        }).catch(error => {
          commit('SET_CLASSDATA', [])
          reject(error)
        })
      })
    },
    // 获取学生信息
    GetStudentData({ commit }) {
      // return new Promise((resolve, reject) => {
      //   httpGetStudentData().then(response => {
      //     const data = response.data
      //     commit('SET_STUDENTDATA', data)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    }
  }
}

export default app
