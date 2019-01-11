const Config = require('lvcnf')

const parseKV = (s = '') => s.split('=')

module.exports = ({ prefix, config: conf }) =>
  async (ctx, next) => {
    if (!(conf instanceof Config)) {
      throw new TypeError('Expected config to be instance of Config')
    }
    if (typeof prefix !== 'string') {
      throw new TypeError('Expected string prefix')
    }
    ctx.type = 'application/json'
    const pf = `${prefix}/`.replace(/\/\//, '/')
    if (ctx.request.path.startsWith(pf)) {
      const pv = ctx.request.path.replace(pf, '')
      switch (ctx.request.method) {
        case 'GET':
          ctx.body = conf.get(pv)
          return
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
        default:
          ctx.body = null
          return
      }
    }
    return next()
  }
