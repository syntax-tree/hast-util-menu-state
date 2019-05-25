'use strict'

var is = require('hast-util-is-element')

module.exports = menuState

function menuState(nodes) {
  var index
  var node
  var type

  if (!nodes || typeof nodes !== 'object' || nodes.length === 0) {
    return null
  }

  index = nodes.length - 1
  node = nodes[index]

  if (!is(node, 'menu')) {
    return null
  }

  while (node) {
    // Stop at `template` elements and non-elements.
    if (!is(node) || is(node, 'template')) {
      break
    }

    if (is(node, 'menu')) {
      type = node.properties && node.properties.type

      if (type === 'context' || type === 'toolbar') {
        return type
      }
    }

    node = nodes[--index]
  }

  return 'toolbar'
}
