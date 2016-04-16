# hast-util-menu-state [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

Check the [state][spec] of a `menu` [**HAST**][hast] [element][].

## Installation

[npm][]:

```bash
npm install hast-util-menu-state
```

**hast-util-menu-state** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var menuState = require('hast-util-menu-state');
```

If there’s no last element or that node is not a `menu`:

```javascript
var result = menuState([{
    'type': 'element',
    'tagName': 'a'
}]);
```

You’ll get:

```js
null
```

If the last node is a `menu` without `type`:

```javascript
result = menuState([{
    'type': 'element',
    'tagName': 'menu'
}]);
```

You’ll get:

```json
"toolbar"
```

If the last node is a `menu` with a `type`,

or that node has a parent `menu` with a type:

```javascript
result = menuState([
    {
        'type': 'element',
        'tagName': 'menu',
        'properties': {
            'type': 'context'
        }
    },
    {
        'type': 'element',
        'tagName': 'li'
    },
    {
        'type': 'element',
        'tagName': 'menu'
    }
]);
```

You’ll get:

```json
"context"
```

## API

### `menuState(nodes)`

Check the [state][spec] of a `menu` [**HAST**][hast] [element][].
The state is calculated from the lowest `menu` with a valid `type`
property.  If no `menu` has a `type`, it defaults to `'toolbar'`.

The algorithms stops looking for higher `menu`s if a `template` element,
or non-element, is found.

**Parameters**:

*   `nodes` ([`Array.<Node>`][node], optional) — Nodes to check,
    where the last `node` is a `menu` element.  The first node
    represents the highest ancestor of the last (deepest) node.

**Returns**: `string?`, either `'context'` or `'toolbar'`; the state
the `menu` is in, or `null`, if the last node is not a `menu` element.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/hast-util-menu-state.svg

[build-page]: https://travis-ci.org/wooorm/hast-util-menu-state

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/hast-util-menu-state.svg

[coverage-page]: https://codecov.io/github/wooorm/hast-util-menu-state?branch=master

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/hast-util-menu-state/releases

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/wooorm/hast

[node]: https://github.com/wooorm/hast#node

[element]: https://github.com/wooorm/hast#element

[spec]: https://html.spec.whatwg.org/#attr-menu-type
