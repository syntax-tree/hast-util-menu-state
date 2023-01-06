import assert from 'node:assert/strict'
import test from 'node:test'
import {menuState} from './index.js'
import * as mod from './index.js'

test('menuState', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['menuState'],
    'should expose the public api'
  )

  // @ts-expect-error runtime.
  assert.equal(menuState(), null, 'should return `null` without nodes')
  // @ts-expect-error runtime.
  assert.equal(menuState(null), null, 'should return `null` with `null`')
  assert.equal(menuState([]), null, 'should return `null` with empty `nodes`')
  assert.equal(
    // @ts-expect-error runtime.
    menuState(['foo']),
    null,
    'should return `null` without `node` as last `node`'
  )

  assert.equal(
    menuState([{type: 'text', value: 'alpha'}]),
    null,
    'should return `null` without `element` as last `node`'
  )

  assert.equal(
    menuState([{type: 'element', tagName: 'div', children: []}]),
    null,
    'should return `null` without `menu` as last `node`'
  )

  assert.equal(
    menuState([{type: 'element', tagName: 'menu', children: []}]),
    'toolbar',
    'should return `toolbar` without `type` on last `menu`'
  )

  assert.equal(
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

  assert.equal(
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

  assert.equal(
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

  assert.equal(
    menuState([
      {type: 'element', tagName: 'menu', children: []},
      {type: 'element', tagName: 'menu', children: []}
    ]),
    'toolbar',
    'should return the `toolbar` of no parent `menu` is available'
  )

  assert.equal(
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

  assert.equal(
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

  assert.equal(
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
})
