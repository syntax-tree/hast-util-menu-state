# hast-util-menu-state

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to get the [*state*][spec] of a `<menu>` [element][].

## Install

[npm][]:

```sh
npm install hast-util-menu-state
```

## Usage

```js
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

Get the [*state*][spec] of a `<menu>` [element][].
The state is calculated from the lowest `<menu>` with a valid `type` property.
If no `<menu>` has a `type`, it defaults to `'toolbar'`.

The algorithm stops looking for higher `<menu>`s if a `template` element,
or non-element, is found.

###### Parameters

*   `nodes` ([`Array.<Node>`][node], optional) — Nodes to check, where the
    last `node` is a `<menu>` element.
    The first node is its [*root*][root].
    All nodes are therefore [*inclusive ancestors*][ancestor].

###### Returns

`string?` — either `'context'` or `'toolbar'` (the state the `menu` is in), or
`null`, if the last node is not a `menu` element.

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-menu-state.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-menu-state

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-menu-state.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-menu-state

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-menu-state.svg

[downloads]: https://www.npmjs.com/package/hast-util-menu-state

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-menu-state.svg

[size]: https://bundlephobia.com/result?p=hast-util-menu-state

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[spec]: https://html.spec.whatwg.org/#attr-menu-type

[node]: https://github.com/syntax-tree/unist#node

[root]: https://github.com/syntax-tree/unist#root

[ancestor]: https://github.com/syntax-tree/unist#ancestor

[hast]: https://github.com/syntax-tree/hast

[element]: https://github.com/syntax-tree/hast#element
