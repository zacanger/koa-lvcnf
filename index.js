module.exports = (prefix) =>
  async (ctx, next) => {
    // if ctx.path starts with prefix,
    // call handler
    // GET /prefix/foo.bar.baz => get('foo.bar.baz')
    // DELETE /prefix/foo.bar.baz => del('foo.bar.baz')
    // put, patch, post
    return next()
  }
