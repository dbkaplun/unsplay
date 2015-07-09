function unsplay (items, key, parentKey) {
  key = getter(key);
  parentKey = getter(parentKey);

  var nodes = items.reduce(function (nodes, item) {
    nodes[key(item)] = {item: item, children: []};
    return nodes;
  }, {});

  do {
    var reparented = false;
    nodes = Object.keys(nodes).reduce(function (newNodes, id) {
      var node = nodes[id];
      var parentId = parentKey(node.item);
      if (parentId in nodes) {
        nodes[parentId].children.push(node);
        reparented = true;
      }
      else newNodes[id] = node;
      return newNodes;
    }, {});
  } while (reparented);

  return Object.keys(nodes).map(function (id) { return nodes[id]; });
}

function getter (key) {
  if (typeof key === 'function') return key;
  return function (obj) { return obj[key]; };
}

module.exports = unsplay;
