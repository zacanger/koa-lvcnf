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
const conf = require('koa-lvcnf')

// other middlewares
app.use(conf('/config')) // route prefix

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

## License

[MIT](./LICENSE.md)
