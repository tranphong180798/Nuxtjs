import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { RefreshScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login",
    "logout": "/",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": false,
  "defaultStrategy": "local"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new RefreshScheme($auth, {
  "endpoints": {
    "login": {
      "url": "login",
      "method": "post",
      "propertyName": "token"
    },
    "user": {
      "url": "user",
      "method": "get",
      "propertyName": null
    },
    "refresh": {
      "url": "refreshJWT",
      "method": "post",
      "propertyName": "token"
    },
    "logout": false
  },
  "user": {
    "property": false
  },
  "token": {
    "property": "token",
    "maxAge": 60
  },
  "tokenRequired": true,
  "name": "local"
}))

  // laravelJWT
  $auth.registerStrategy('laravelJWT', new RefreshScheme($auth, {
  "url": "http://127.0.0.1:8000/api/",
  "endpoints": {
    "login": {
      "url": "http://127.0.0.1:8000/api/login",
      "method": "post",
      "propertyName": "token"
    },
    "refresh": {
      "url": "http://127.0.0.1:8000/api/refreshJWT",
      "method": "post",
      "propertyName": "token"
    },
    "logout": {
      "url": "http://127.0.0.1:8000/api/logout",
      "method": "post"
    },
    "user": {
      "url": "http://127.0.0.1:8000/api/user",
      "method": "get"
    }
  },
  "token": {
    "property": "token",
    "maxAge": 60
  },
  "tokenRequired": true,
  "name": "laravelJWT",
  "refreshToken": {
    "property": false,
    "data": false,
    "maxAge": 1209600,
    "required": false,
    "tokenRequired": true
  },
  "user": {
    "property": false
  },
  "clientId": false,
  "grantType": false
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
