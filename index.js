import {isElement} from 'hast-util-is-element'

export function menuState(nodes) {
  var index
  var node
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
