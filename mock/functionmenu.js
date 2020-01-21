
import { functions } from './role/functions'

export default [
  // mock get all routes form server
  {
    url: '/functionmenu/functions',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: functions
      }
    }
  },
  {
    url: '/functionmenu/addFunction',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
