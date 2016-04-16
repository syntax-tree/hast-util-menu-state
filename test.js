/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:util:menu-state
 * @fileoverview Test suite for `menu-state`.
 */

'use strict';

/* eslint-env node */

/*
 * Module dependencies.
 */

var test = require('tape');
var menuState = require('./index.js');

/*
 * Tests.
 */

test('menuState', function (t) {
    t.equal(menuState(), null, 'should return `null` without nodes');
    t.equal(menuState(null), null, 'should return `null` with `null`');
    t.equal(menuState([]), null, 'should return `null` with empty `nodes`');

    t.equal(menuState([
        'foo'
    ]), null, 'should return `null` without `node` as last `node`');

    t.equal(menuState([
        {
            'type': 'text',
            'value': 'alpha'
        }
    ]), null, 'should return `null` without `element` as last `node`');

    t.equal(menuState([
        {
            'type': 'element',
            'tagName': 'div'
        }
    ]), null, 'should return `null` without `menu` as last `node`');

    t.equal(menuState([
        {
            'type': 'element',
            'tagName': 'menu'
        }
    ]), 'toolbar', 'should return `toolbar` without `type` on last `menu`');

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu',
                'properties': {
                    'type': 'toolbar'
                }
            }
        ]),
        'toolbar',
        'should return `toolbar` with `type` set to `toolbar` on last `menu`'
    );

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu',
                'properties': {
                    'type': 'context'
                }
            }
        ]),
        'context',
        'should return `context` with `type` set to `context` on last `menu`'
    );

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu',
                'properties': {
                    'type': 'context'
                }
            },
            {
                'type': 'element',
                'tagName': 'menu'
            }
        ]),
        'context',
        'should return the `type` of a parent `menu`, if available'
    );

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu'
            },
            {
                'type': 'element',
                'tagName': 'menu'
            }
        ]),
        'toolbar',
        'should return the `toolbar` of no parent `menu` is available'
    );

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu',
                'properties': {
                    'type': 'context'
                }
            },
            {
                'type': 'element',
                'tagName': 'template'
            },
            {
                'type': 'element',
                'tagName': 'menu'
            }
        ]),
        'toolbar',
        'should not walk higher than `template` elements'
    );

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu',
                'properties': {
                    'type': 'context'
                }
            },
            null,
            {
                'type': 'element',
                'tagName': 'menu'
            }
        ]),
        'toolbar',
        'should not walk higher than non-elements'
    );

    t.equal(
        menuState([
            {
                'type': 'element',
                'tagName': 'menu',
                'properties': {
                    'type': 'context'
                }
            },
            {
                'type': 'element',
                'tagName': 'li'
            },
            {
                'type': 'element',
                'tagName': 'menu'
            }
        ]),
        'context',
        'should not walk higher than other elements'
    );

    t.end();
});
