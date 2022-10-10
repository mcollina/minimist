const parse = require('../')
const { test } = require('tap')

test('flag boolean true (default all --args to boolean)', function (t) {
  const argv = parse(['moo', '--honk', 'cow'], {
    boolean: true
  })

  t.same(argv, {
    honk: true,
    _: ['moo', 'cow']
  })

  t.same(typeof argv.honk, 'boolean')
  t.end()
})

test('flag boolean true only affects double hyphen arguments without equals signs', function (t) {
  const argv = parse(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {
    boolean: true
  })

  t.same(argv, {
    honk: true,
    tacos: 'good',
    p: 55,
    _: ['moo', 'cow']
  })

  t.same(typeof argv.honk, 'boolean')
  t.end()
})
