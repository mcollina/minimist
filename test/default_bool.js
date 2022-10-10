const { test } = require('tap')
const parse = require('../')

test('boolean default true', function (t) {
  const argv = parse([], {
    boolean: 'sometrue',
    default: { sometrue: true }
  })
  t.equal(argv.sometrue, true)
  t.end()
})

test('boolean default false', function (t) {
  const argv = parse([], {
    boolean: 'somefalse',
    default: { somefalse: false }
  })
  t.equal(argv.somefalse, false)
  t.end()
})

test('boolean default to null', function (t) {
  let argv = parse([], {
    boolean: 'maybe',
    default: { maybe: null }
  })
  t.equal(argv.maybe, null)
  argv = parse(['--maybe'], {
    boolean: 'maybe',
    default: { maybe: null }
  })
  t.equal(argv.maybe, true)
  t.end()
})
