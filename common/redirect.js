
import Router from 'next/router'

export default ({res}) => {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
    } else {
      Router.pushRoute('/')
    }
  }

export const login = ({res}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/login'
    })
    res.end()
  } else {
    Router.pushRoute('/login')
  }
}

export const studyDetail = ({res, studyId}) => {
  if (res) {
    res.writeHead(302, {
      Location: `/study/${studyId}`
    })
    res.end()
  } else {
    Router.pushRoute(`/study/${studyId}`);
  }
}

export const error = ({res}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/error'
    })
    res.end()
  } else {
    Router.pushRoute('/error')
  }
}