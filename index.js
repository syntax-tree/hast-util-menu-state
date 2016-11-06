'use strict';

/* Expose. */
module.exports = menuState;

/* Check the state of the menu `node`. */
function menuState(nodes) {
  var index;
  var node;
  var type;
  var name;

  if (!nodes || typeof nodes !== 'object' || nodes.length === 0) {
    return null;
  }

  index = nodes.length - 1;
  node = nodes[index];

  if (tagName(node) !== 'menu') {
    return null;
  }

  while (node) {
    name = tagName(node);

    /* Stop at `template` elements and non-elements. */
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

/* Get the `tagName` of an element. */
function tagName(value) {
  if (value && typeof value === 'object' && value.type === 'element') {
    return value.tagName;
  }

  return null;
}
