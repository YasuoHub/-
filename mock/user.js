
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    buttons: [
      {
        label: '删除',
        code: 'main-remove',
        btnid: 'abc123'
      },
      {
        label: '查看',
        code: 'main-look',
        btnid: 'abc456'
      }
    ],
    topMenuArr: [
      {
        label: '经济运行',
        code: 'econoperation',
        functionid: 'abc123'
      },
      {
        label: '首页',
        code: 'mainpage',
        functionid: 'abc456'
      },
      {
        label: '系统管理',
        code: 'sysmanage',
        functionid: 'abc456'
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    buttons: [
      {
        label: '查看',
        code: 'main-look',
        btnid: 'abc456'
      }
    ],
    topMenuArr: [
      {
        label: '经济运行',
        code: 'econoperation',
        functionid: 'abc123'
      },
      {
        label: '首页',
        code: 'mainpage',
        functionid: 'abc456'
      }
    ]
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
