const parse = require('../')
const { test } = require('tap')

test('nums', function (t) {
  const argv = parse([
    '-x', '1234',
    '-y', '5.67',
    '-z', '1e7',
    '-w', '10f',
    '--hex', '0xdeadbeef',
    '789'
  ])
  t.same(argv, {
    x: 1234,
    y: 5.67,
    z: 1e7,
    w: '10f',
    hex: 0xdeadbeef,
    _: [789]
  })
  t.same(typeof argv.x, 'number')
  t.same(typeof argv.y, 'number')
  t.same(typeof argv.z, 'number')
  t.same(typeof argv.w, 'string')
  t.same(typeof argv.hex, 'number')
  t.same(typeof argv._[0], 'number')
  t.end()
})

test('already a number', function (t) {
  const argv = parse(['-x', 1234, 789])
  t.same(argv, { x: 1234, _: [789] })
  t.same(typeof argv.x, 'number')
  t.same(typeof argv._[0], 'number')
  t.end()
})
