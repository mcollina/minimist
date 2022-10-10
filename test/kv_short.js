const parse = require('../')
const { test } = require('tap')

test('short -k=v', function (t) {
  t.plan(1)

  const argv = parse(['-b=123'])
  t.same(argv, { b: 123, _: [] })
})

test('multi short -k=v', function (t) {
  t.plan(1)

  const argv = parse(['-a=whatever', '-b=robots'])
  t.same(argv, { a: 'whatever', b: 'robots', _: [] })
})
