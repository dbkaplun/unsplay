function unsplay (items, key, parentKey) {
  var nodes = items.reduce(function (nodes, item) {
    nodes[item[key]] = {item: item, children: []};
    return nodes;
  }, {});

  do {
    var reparented = false;
    nodes = Object.keys(nodes).reduce(function (newNodes, id) {
      var node = nodes[id];
      var parentId = node.item[parentKey];
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

module.exports = unsplay;
