/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 */

/**
 * @typedef {Root | Content} Node
 * @typedef {'context' | 'toolbar'} MenuState
 *   The state a `menu` is in.
 */

import {isElement} from 'hast-util-is-element'

/**
 * Get the *state* of a `<menu>` element.
 *
 * The state is calculated from the lowest `<menu>` with a valid `type`
 * property.
 * If no `<menu>` has a `type`, it defaults to `'toolbar'`.
 *
 * The algorithm stops looking for higher `<menu>`s if a `template` element, or
 * non-element, is found.
 *
 * @param {Array<Node>} nodes
 *   Nodes to check, where the last node should be a `<menu>` element, the
 *   first node must be its root, and all nodes are therefore inclusive
 *   ancestors.
 * @returns {MenuState | null}
 *   The state the `menu` is in, or `null` if the last node is not a `menu`
 *   element.
 */
// To do next major: return `undefined`.
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
