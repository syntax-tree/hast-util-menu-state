import test from 'tape'
import {menuState} from './index.js'

test('menuState', (t) => {
  // @ts-expect-error runtime.
  t.equal(menuState(), null, 'should return `null` without nodes')
  // @ts-expect-error runtime.
  t.equal(menuState(null), null, 'should return `null` with `null`')
  t.equal(menuState([]), null, 'should return `null` with empty `nodes`')
  t.equal(
    // @ts-expect-error runtime.
    menuState(['foo']),
    null,
    'should return `null` without `node` as last `node`'
  )

  t.equal(
    menuState([{type: 'text', value: 'alpha'}]),
    null,
    'should return `null` without `element` as last `node`'
  )

  t.equal(
    menuState([{type: 'element', tagName: 'div', children: []}]),
    null,
    'should return `null` without `menu` as last `node`'
  )

  t.equal(
    menuState([{type: 'element', tagName: 'menu', children: []}]),
    'toolbar',
    'should return `toolbar` without `type` on last `menu`'
  )

  t.equal(
    menuState([
      {
        type: 'element',
        tagName: 'menu',
        properties: {type: 'toolbar'},
        children: []
      }
    ]),
    'toolbar',
    'should return `toolbar` with `type` set to `toolbar` on last `menu`'
  )

  t.equal(
    menuState([
      {
        type: 'element',
        tagName: 'menu',
        properties: {type: 'context'},
        children: []
      }
    ]),
    'context',
    'should return `context` with `type` set to `context` on last `menu`'
  )

  t.equal(
    menuState([
      {
        type: 'element',
        tagName: 'menu',
        properties: {type: 'context'},
        children: []
      },
      {type: 'element', tagName: 'menu', children: []}
    ]),
    'context',
    'should return the `type` of a parent `menu`, if available'
  )

  t.equal(
    menuState([
      {type: 'element', tagName: 'menu', children: []},
      {type: 'element', tagName: 'menu', children: []}
    ]),
    'toolbar',
    'should return the `toolbar` of no parent `menu` is available'
  )

  t.equal(
    menuState([
      {
        type: 'element',
        tagName: 'menu',
        properties: {type: 'context'},
        children: []
      },
      {type: 'element', tagName: 'template', children: []},
      {type: 'element', tagName: 'menu', children: []}
    ]),
    'toolbar',
    'should not walk higher than `template` elements'
  )

  t.equal(
    menuState([
      {
        type: 'element',
        tagName: 'menu',
        properties: {type: 'context'},
        children: []
      },
      // @ts-expect-error runtime.
      null,
      {type: 'element', tagName: 'menu', children: []}
    ]),
    'toolbar',
    'should not walk higher than non-elements'
  )

  t.equal(
    menuState([
      {
        type: 'element',
        tagName: 'menu',
        properties: {type: 'context'},
        children: []
      },
      {type: 'element', tagName: 'li', children: []},
      {type: 'element', tagName: 'menu', children: []}
    ]),
    'context',
    'should not walk higher than other elements'
  )

  t.end()
})
