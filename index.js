/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:lint:util:menu-state
 */

'use strict';

/* eslint-env commonjs */

/**
 * Get the `tagName` of an element.
 *
 * @param {*} value - Node?
 * @return {string?} - `tagName` of `value` if it is an
 *   element node, `null` otherwise.
 */
function tagName(value) {
    if (value && typeof value === 'object' && value.type === 'element') {
        return value.tagName;
    }

    return null;
}

/**
 * Check the state of the menu `node`.
 *
 * @param {Array.<Node>} nodes - Nodes to search.
 * @return {string?} - Menu state.
 */
function menuState(nodes) {
    var index;
    var node;
    var type;
    var name;

    if (!nodes || typeof nodes !== 'object' || !nodes.length) {
        return null;
    }

    index = nodes.length - 1;
    node = nodes[index];

    if (tagName(node) !== 'menu') {
        return null;
    }

    while (node) {
        name = tagName(node);

        /*
         * Stop at `template` elements and non-elements.
         */

        if (!name || name === 'template') {
            break;
        }

        if (name === 'menu') {
            type = node.properties && node.properties.type;

            if (type === 'context' || type === 'toolbar') {
                return type;
            }
        }

        node = nodes[--index];
    }

    return 'toolbar';
}

/*
 * Expose.
 */

module.exports = menuState;
