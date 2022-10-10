const parse = require('../')
const { test } = require('tap')

test('numeric short args', function (t) {
  t.plan(2)
  t.same(parse(['-n123']), { n: 123, _: [] })
  t.same(
    parse(['-123', '456']),
    { 1: true, 2: true, 3: 456, _: [] }
  )
})

test('short', function (t) {
  t.same(
    parse(['-b']),
    { b: true, _: [] },
    'short boolean'
  )
  t.same(
    parse(['foo', 'bar', 'baz']),
    { _: ['foo', 'bar', 'baz'] },
    'bare'
  )
  t.same(
    parse(['-cats']),
    { c: true, a: true, t: true, s: true, _: [] },
    'group'
  )
  t.same(
    parse(['-cats', 'meow']),
    { c: true, a: true, t: true, s: 'meow', _: [] },
    'short group next'
  )
  t.same(
    parse(['-h', 'localhost']),
    { h: 'localhost', _: [] },
    'short capture'
  )
  t.same(
    parse(['-h', 'localhost', '-p', '555']),
    { h: 'localhost', p: 555, _: [] },
    'short captures'
  )
  t.end()
})

test('mixed short bool and capture', function (t) {
  t.same(
    parse(['-h', 'localhost', '-fp', '555', 'script.js']),
    {
      f: true,
      p: 555,
      h: 'localhost',
      _: ['script.js']
    }
  )
  t.end()
})

test('short and long', function (t) {
  t.same(
    parse(['-h', 'localhost', '-fp', '555', 'script.js']),
    {
      f: true,
      p: 555,
      h: 'localhost',
      _: ['script.js']
    }
  )
  t.end()
})
