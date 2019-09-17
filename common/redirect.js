
import Router from 'next/router'

export default ({res}) => {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
    } else {
      Router.push('/')
    }
  }

export const login = ({res}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/login'
    })
    res.end()
  } else {
    Router.push('/login')
  }
}

export const error = ({res}) => {
  if (res) {
    res.writeHead(302, {
      Location: '/error'
    })
    res.end()
  } else {
    Router.push('/error')
  }
}