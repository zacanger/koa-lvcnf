# koa-lvcnf

Koa middleware for [lvcnf](https://npmjs.com/package/lvcnf).

WIP, does nothing yet

--------

## Installation

`npm i koa-lvcnf`

## Usage

```javascript
const Koa = require('koa')
const app = new Koa()
const Config = require('lvcnf')
const koaConfig = require('koa-lvcnf')

// config instance to pass into the middleware
const config = new Config(initialConfig)

// other middlewares
app.use(koaConfig({ prefix: '/config', config })) // route prefix

app.listen(8888, () => {
  console.log('i am an app!')
})
```

```
GET /config => all config values
GET /config/foo => config for foo
GET /config/foo.bar.baz => the baz value in { foo: { bar: { baz } } }
DELETE /config/foo.bar.baz => deletes foo.bar.baz
POST /config/foo.bar.baz => creates foo.bar.baz
PATCH /config/foo.bar.baz => updates foo.bar.baz
```

## Securing The Endpoint

There's no built in security, but you can easily wrap this in your own
middleware. Example:

```javascript
const jwt = require('jwt')

app.use(async (ctx, next) => {
  const authCookie = ctx.cookies.get('some-auth-cookie')
  const permissions = authCookie && jwt.decode(authCookie).permissions
  const canEditConfig = permissions.split(',').includes('configManager')
  if (canEditConfig) {
    koaConfig({ prefix, config })(ctx, next)
  }
  await next()
})
```

## License

[MIT](./LICENSE.md)
