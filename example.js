// Dependencies:
var menuState = require('./index.js');

// If there’s no last element or that node is not a `menu`:
var result = menuState([{
    'type': 'element',
    'tagName': 'a'
}]);

// You’ll get:
console.log('js', String(result));

// If the last node is a `menu` without `type`:
result = menuState([{
    'type': 'element',
    'tagName': 'menu'
}]);

// You’ll get:
console.log('json', JSON.stringify(result));

// If the last node is a `menu` with a `type`,
// or that node has a parent `menu` with a type:
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

// You’ll get:
console.log('json', JSON.stringify(result));
