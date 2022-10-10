const { test } = require('tap')
const parse = require('../')

test('long opts', function (t) {
  t.same(
    parse(['--bool']),
    { bool: true, _: [] },
    'long boolean'
  )
  t.same(
    parse(['--pow', 'xixxle']),
    { pow: 'xixxle', _: [] },
    'long capture sp'
  )
  t.same(
    parse(['--pow=xixxle']),
    { pow: 'xixxle', _: [] },
    'long capture eq'
  )
  t.same(
    parse(['--host', 'localhost', '--port', '555']),
    { host: 'localhost', port: 555, _: [] },
    'long captures sp'
  )
  t.same(
    parse(['--host=localhost', '--port=555']),
    { host: 'localhost', port: 555, _: [] },
    'long captures eq'
  )
  t.end()
})
