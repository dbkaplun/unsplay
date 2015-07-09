function unsplay (items, key, parentKey) {
  var nodes = items.reduce(function (nodes, item) {
    nodes[item[key]] = {item: item, children: []};
    return nodes;
  }, {});

  var lastCount, count;
  do {
    lastCount = count;
    count = 0;
    nodes = Object.keys(nodes).reduce(function (newNodes, id) {
      var node = nodes[id];
      var parentId = node.item[parentKey];
      if (parentId in nodes) nodes[parentId].children.push(node);
      else {
        newNodes[id] = node;
        count++;
      }
      return newNodes;
    }, {});
  } while (lastCount !== count);
  return Object.keys(nodes).map(function (id) { return nodes[id]; });
}

module.exports = unsplay;
