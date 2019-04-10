// import Cookies from 'js-cookie'
import { httpGetGradeData, httpGetClassData, httpGetStudentData } from '@/api/index'
const app = {
  state: {
    colors: {
      breakfast: '#FF6666',
      lunch: '#0099CC',
      supper: '#99CC66',
      none: '#777'
    },
    gradeData: [
      {
        'gradeId': 'g2021',
        'gradeName': '高2021级'
      },
      {
        'gradeId': 'g2020',
        'gradeName': '高2020级'
      },
      {
        'gradeId': 'g2019',
        'gradeName': '高2019级'
      }
    ],
    classData: {
      'g2020': [
        {
          'classId': 'afdsf',
          'className': '01班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': '23434',
          'className': '02班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 't34tg4',
          'className': '03班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 'vr4',
          'className': '03班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 'vtas',
          'className': '04班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 'sghfd',
          'className': '05班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 'jgsf',
          'className': '06班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 'sgfd',
          'className': '07班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 't3t43',
          'className': '08班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }, {
          'classId': 'tawete',
          'className': '09班',
          'gradeId': 'g2020',
          'gradeName': '高2020级'
        }
      ],
      'g2021': [
        {
          'classId': 'fadsf',
          'className': '01班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }, {
          'classId': 'fad121sf',
          'className': '02班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }, {
          'classId': '4324',
          'className': '03班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }, {
          'classId': '555',
          'className': '03班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }, {
          'classId': 'fad121sf',
          'className': '04班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }, {
          'classId': 'rterte',
          'className': '05班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }, {
          'classId': 'tre',
          'className': '06班',
          'gradeId': 'g2021',
          'gradeName': '高2021级'
        }

      ]
    },
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
          const data = response.data
          commit('SET_GRADEDATA', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取班级信息
    GetClassData({ commit }) {
      return new Promise((resolve, reject) => {
        httpGetClassData().then(response => {
          const data = response.data
          commit('SET_CLASSDATA', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取学生信息
    GetStudentData({ commit }) {
      return new Promise((resolve, reject) => {
        httpGetStudentData().then(response => {
          const data = response.data
          commit('SET_STUDENTDATA', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
