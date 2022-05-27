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

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install hast-util-menu-state
```

## Use

```js
import {menuState} from 'hast-util-menu-state'

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

This package exports the following identifiers: `menuState`.
There is no default export.

### `menuState(nodes)`

Get the [*state*][spec] of a `<menu>` [element][].
The state is calculated from the lowest `<menu>` with a valid `type` property.
If no `<menu>` has a `type`, it defaults to `'toolbar'`.

The algorithm stops looking for higher `<menu>`s if a `template` element,
or non-element, is found.

###### Parameters

*   `nodes` ([`Array<Node>`][node], optional) — Nodes to check, where the
    last `node` is a `<menu>` element.
    The first node is its [*root*][root].
    All nodes are therefore [*inclusive ancestors*][ancestor].

###### Returns

`string?` — either `'context'` or `'toolbar'` (the state the `menu` is in), or
`null`, if the last node is not a `menu` element.

## Security

`hast-util-menu-state` does not change the syntax tree so there are no openings
for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`unist-util-visit-parents`](https://github.com/syntax-tree/unist-util-visit-parents)
    — recursively walk over unist nodes, with ancestral information

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://github.com/syntax-tree/hast-util-menu-state/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-menu-state/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-menu-state.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-menu-state

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-menu-state.svg

[downloads]: https://www.npmjs.com/package/hast-util-menu-state

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-menu-state.svg

[size]: https://bundlephobia.com/result?p=hast-util-menu-state

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[spec]: https://html.spec.whatwg.org/#attr-menu-type

[node]: https://github.com/syntax-tree/unist#node

[root]: https://github.com/syntax-tree/unist#root

[ancestor]: https://github.com/syntax-tree/unist#ancestor

[hast]: https://github.com/syntax-tree/hast

[element]: https://github.com/syntax-tree/hast#element

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
