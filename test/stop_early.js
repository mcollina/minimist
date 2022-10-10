const parse = require('../')
const { test } = require('tap')

test('stops parsing on the first non-option when stopEarly is set', function (t) {
  const argv = parse(['--aaa', 'bbb', 'ccc', '--ddd'], {
    stopEarly: true
  })

  t.same(argv, {
    aaa: 'bbb',
    _: ['ccc', '--ddd']
  })

  t.end()
})
