const parse = require('../')
const { test } = require('tap')

test('-', function (t) {
  t.plan(5)
  t.same(parse(['-n', '-']), { n: '-', _: [] })
  t.same(parse(['-']), { _: ['-'] })
  t.same(parse(['-f-']), { f: '-', _: [] })
  t.same(
    parse(['-b', '-'], { boolean: 'b' }),
    { b: true, _: ['-'] }
  )
  t.same(
    parse(['-s', '-'], { string: 's' }),
    { s: '-', _: [] }
  )
})

test('-a -- b', function (t) {
  t.plan(3)
  t.same(parse(['-a', '--', 'b']), { a: true, _: ['b'] })
  t.same(parse(['--a', '--', 'b']), { a: true, _: ['b'] })
  t.same(parse(['--a', '--', 'b']), { a: true, _: ['b'] })
})

test('move arguments after the -- into their own `--` array', function (t) {
  t.plan(1)
  t.same(
    parse(['--name', 'John', 'before', '--', 'after'], { '--': true }),
    { name: 'John', _: ['before'], '--': ['after'] })
})
