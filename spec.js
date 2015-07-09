#!/usr/bin/env node

var test = require('tape');
var getTree = require('./.');

function testTree (tree, key, parentKey) {
  // tree is an array of root nodes, i.e. nodes without parents
  return tree.every(function (rootNode) {
    return testNode(rootNode, key, parentKey);
  });
}

function testNode (node, key, parentKey) {
  return node.children.every(function (child) {
    return child.item[parentKey] === node.item[key] && testNode(child, key, parentKey);
  });
}

test('getTree', function (t) {
  var list = [
    {id: -1}, // has no children
    {id: 0},
      {id: 1, pid: 0},
        {id: 2, pid: 1},
        {id: 3, pid: 1},
      {id: 4, pid: 0}
  ];
  var tree = getTree(list, 'id', 'pid');

  t.ok(tree.length === 2); // number of root nodes
  t.ok(testTree(tree));
  t.end();
});
