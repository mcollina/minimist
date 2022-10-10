const parse = require('../')
const { test } = require('tap')

test('boolean and alias is not unknown', function (t) {
  const unknown = []
  function unknownFn (arg) {
    unknown.push(arg)
    return false
  }
  const aliased = ['-h', 'true', '--derp', 'true']
  const regular = ['--herp', 'true', '-d', 'true']
  const opts = {
    alias: { h: 'herp' },
    boolean: 'h',
    unknown: unknownFn
  }
  parse(aliased, opts)
  parse(regular, opts)

  t.same(unknown, ['--derp', '-d'])
  t.end()
})

test('flag boolean true any double hyphen argument is not unknown', function (t) {
  const unknown = []
  function unknownFn (arg) {
    unknown.push(arg)
    return false
  }
  const argv = parse(['--honk', '--tacos=good', 'cow', '-p', '55'], {
    boolean: true,
    unknown: unknownFn
  })
  t.same(unknown, ['--tacos=good', 'cow', '-p'])
  t.same(argv, {
    honk: true,
    _: []
  })
  t.end()
})

test('string and alias is not unknown', function (t) {
  const unknown = []
  function unknownFn (arg) {
    unknown.push(arg)
    return false
  }
  const aliased = ['-h', 'hello', '--derp', 'goodbye']
  const regular = ['--herp', 'hello', '-d', 'moon']
  const opts = {
    alias: { h: 'herp' },
    string: 'h',
    unknown: unknownFn
  }
  parse(aliased, opts)
  parse(regular, opts)

  t.same(unknown, ['--derp', '-d'])
  t.end()
})

test('default and alias is not unknown', function (t) {
  const unknown = []
  function unknownFn (arg) {
    unknown.push(arg)
    return false
  }
  const aliased = ['-h', 'hello']
  const regular = ['--herp', 'hello']
  const opts = {
    default: { h: 'bar' },
    alias: { h: 'herp' },
    unknown: unknownFn
  }
  parse(aliased, opts)
  parse(regular, opts)

  t.same(unknown, [])
  t.end()
  unknownFn() // exercise fn for 100% coverage
})

test('value following -- is not unknown', function (t) {
  const unknown = []
  function unknownFn (arg) {
    unknown.push(arg)
    return false
  }
  const aliased = ['--bad', '--', 'good', 'arg']
  const opts = {
    '--': true,
    unknown: unknownFn
  }
  const argv = parse(aliased, opts)

  t.same(unknown, ['--bad'])
  t.same(argv, {
    '--': ['good', 'arg'],
    _: []
  })
  t.end()
})
