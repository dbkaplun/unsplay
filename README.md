# unsplay
Compute a tree from an array of objects with IDs and parent IDs

## Installation
```shell
$ npm install unsplay
```

## Usage
```javascript
>> var unsplay = require('unsplay');
>> unsplay([{id: 0}, {id: 1, pid: 0}], 'id', 'pid');
[{
  item: {id: 0},
  children: [{
    item: {id: 1, pid: 0},
    children: []
  }]
}]
```
