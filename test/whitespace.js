const parse = require('../')
const { test } = require('tap')

test('whitespace should be whitespace', function (t) {
  t.plan(1)
  const x = parse(['-x', '\t']).x
  t.equal(x, '\t')
})
