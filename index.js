/**
 * @typedef {import('unist').Node} Node
 *
 * @typedef {'context'|'toolbar'} MenuState
 */

import {isElement} from 'hast-util-is-element'

/**
 * @param {Array.<Node>} nodes
 * @returns {MenuState|null}
 */
export function menuState(nodes) {
  /** @type {number} */
  var index
  /** @type {Node} */
  var node
  /** @type {unknown} */
  var type

  if (!nodes || typeof nodes !== 'object' || nodes.length === 0) {
    return null
  }

  index = nodes.length - 1
  node = nodes[index]

  if (!isElement(node, 'menu')) {
    return null
  }

  while (node) {
    // Stop at `template` elements and non-elements.
    if (!isElement(node) || isElement(node, 'template')) {
      break
    }

    if (isElement(node, 'menu')) {
      type = node.properties && node.properties.type

      if (type === 'context' || type === 'toolbar') {
        return type
      }
    }

    node = nodes[--index]
  }

  return 'toolbar'
}
