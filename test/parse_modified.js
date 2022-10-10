const parse = require('../')
const { test } = require('tap')

test('parse with modifier functions', function (t) {
  t.plan(1)

  const argv = parse(['-b', '123'], { boolean: 'b' })
  t.same(argv, { b: true, _: [123] })
})
