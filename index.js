/**
 * @typedef {import('hast').Root} Root
 * @typedef {Root['children'][number]|Root} Node
 *
 * @typedef {'context'|'toolbar'} MenuState
 */

import {isElement} from 'hast-util-is-element'

/**
 * @param {Array<Node>} nodes
 * @returns {MenuState|null}
 */
export function menuState(nodes) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return null
  }

  let index = nodes.length - 1
  let node = nodes[index]

  if (!isElement(node, 'menu')) {
    return null
  }

  while (node) {
    if (isElement(node, 'menu')) {
      const type = node.properties && node.properties.type

      if (type === 'context' || type === 'toolbar') {
        return type
      }
    }

    // Stop at `template` elements and non-elements.
    if (!isElement(node) || isElement(node, 'template')) {
      break
    }

    node = nodes[--index]
  }

  return 'toolbar'
}
