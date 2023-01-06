# hast-util-menu-state

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to get the [*state*][spec] of a `<menu>` element.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`menuState(nodes)`](#menustatenodes)
    *   [`MenuState`](#menustate)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a small utility that get the menu state according to HTML.

## When should I use this?

This utility is super niche, if you’re here you probably know what you’re
looking for!

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install hast-util-menu-state
```

In Deno with [`esm.sh`][esmsh]:

```js
import {menuState} from 'https://esm.sh/hast-util-menu-state@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {menuState} from 'https://esm.sh/hast-util-menu-state@2?bundle'
</script>
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

This package exports the identifier [`menuState`][menustate].
There is no default export.

### `menuState(nodes)`

Get the [*state*][spec] of a `<menu>` element.

The state is calculated from the lowest `<menu>` with a valid `type` property.
If no `<menu>` has a `type`, it defaults to `'toolbar'`.

The algorithm stops looking for higher `<menu>`s if a `template` element, or
non-element, is found.

###### Parameters

*   `nodes` ([`Array<Node>`][node], optional)
    — nodes to check, where the last node should be a `<menu>` element,
    the first node must be its root, and all nodes are therefore inclusive
    ancestors

###### Returns

The state the `menu` is in ([`MenuState`][menustate-type]), or `null` if the
last node is not a `menu` element.

### `MenuState`

The state a `menu` is in (TypeScript type).

###### Type

```ts
type MenuState = 'context' | 'toolbar'
```

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`MenuState`][menustate-type].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

`hast-util-menu-state` does not change the syntax tree so there are no openings
for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`unist-util-visit-parents`](https://github.com/syntax-tree/unist-util-visit-parents)
    — recursively walk over unist nodes, with ancestral information

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[spec]: https://html.spec.whatwg.org/multipage/obsolete.html#attr-menu-type

[node]: https://github.com/syntax-tree/unist#node

[hast]: https://github.com/syntax-tree/hast

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[menustate]: #menustatenodes

[menustate-type]: #menustate
