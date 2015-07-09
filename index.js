var _ = require('lodash');

function getTree (items, key, parentKey) {
  var nodes = _(items)
    .indexBy(key)
    .mapValues(function (item) { return {item: item, children: []}; })
    .value();
  var lastCount, count;
  do {
    lastCount = count;
    nodes = _.pick(nodes, function (node, id) {
      var parentId = _.get(node.item, parentKey);
      if (!(parentId in nodes)) return true;
      _.get(nodes, parentId).children.push(node);
    });
    count = _.size(nodes);
  } while (lastCount !== count);
  return _.values(nodes);
}

module.exports = getTree;
