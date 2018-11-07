# hast-util-menu-state [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

Check the [state][spec] of a `menu` [**HAST**][hast] [element][].

## Installation

[npm][]:

```bash
npm install hast-util-menu-state
```

## Usage

```javascript
var menuState = require('hast-util-menu-state')

// If there’s no last element or that node is not a `menu`:
menuState([{type: 'element', tagName: 'a'}]) // => null

// If the last node is a `menu` without `type`:
menuState([{type: 'element', tagName: 'menu'}]) // => 'toolbar'

// If the last node is a `menu` with a `type`, or that node has
// a parent `menu` with a type:
menuState([
  {type: 'element', tagName: 'menu', properties: {type: 'context'}},
  {type: 'element', tagName: 'li'},
  {type: 'element', tagName: 'menu'}
]) // => 'context'
```

## API

### `menuState(nodes)`

Check the [state][spec] of a `menu` [**HAST**][hast] [element][].
The state is calculated from the lowest `menu` with a valid `type`
property.  If no `menu` has a `type`, it defaults to `'toolbar'`.

The algorithm stops looking for higher `menu`s if a `template` element,
or non-element, is found.

###### Parameters

*   `nodes` ([`Array.<Node>`][node], optional) — Nodes to check, where the
    last `node` is a `menu` element.  The first node represents the highest
    ancestor of the last (deepest) node.

###### Returns

`string?` — either `'context'` or `'toolbar'`; the state the `menu` is in,
or `null`, if the last node is not a `menu` element.

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-menu-state.svg

[build-page]: https://travis-ci.org/syntax-tree/hast-util-menu-state

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-menu-state.svg

[coverage-page]: https://codecov.io/github/syntax-tree/hast-util-menu-state?branch=master

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/unist#node

[element]: https://github.com/syntax-tree/hast#element

[spec]: https://html.spec.whatwg.org/#attr-menu-type

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
