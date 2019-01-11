const conf = require('lvcnf')

const parseKV = (s = '') => s.split('=')

module.exports = (prefix) =>
  async (ctx, next) => {
    const pf = `${prefix}/`.replace(/\/\//, '/')
    if (ctx.request.path.startsWith(pf)) {
      const key = ctx.request.path.replace(pf, '')
      switch (ctx.request.method) {
        case 'GET':
          if (key.length) {
            ctx.body = conf.get(key)
            return
          } else {
            ctx.body = conf.getAll()
            return
          }
        case 'DELETE':
          // todo: no key handler, no length handler
          if (pf.length) {
            conf.delete(pf)
            ctx.status = 204
          }
          ctx.body = null
          return
        case 'POST':
          // todo: no key handler, no length handler
          if (pf.length) {
            const kv = parseKV(pv)
            conf.set(kv[0], kv[1])
            ctx.status = 201
            ctx.body = null
          }
          return
        case 'PATCH':
          // todo: no key handler, no length handler
          if (pf.length) {
            const kv = parseKV(pv)
            conf.set(kv[0], kv[1])
            ctx.status = 204
            ctx.body = null
          }
          return
      }
    }
    return next()
  }
