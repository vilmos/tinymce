define(
  'ephox.robin.anteater.Placid',

  [
    'ephox.perhaps.Option',
    'ephox.phoenix.api.general.Gather',
    'ephox.phoenix.api.general.Split',
    'ephox.robin.anteater.Anteater',
    'ephox.robin.anteater.EntryPoints'
  ],

  function (Option, Gather, Split, Anteater, EntryPoints) {

    var lake = function (universe, isRoot, element, soffset, foffset) {
      var middle = Split.splitByPair(universe, element, soffset, foffset);
      return Option.some([ middle ]);
    };


    // TODO: Handle backwards selections !
    var placid = function (universe, isRoot, start, soffset, finish, foffset) {
      if (universe.property().isText(start) && universe.eq(start, finish)) return lake(universe, isRoot, start, soffset, foffset);
      var leftSide = EntryPoints.toLeft(universe, isRoot, start, soffset);
      var rightSide = EntryPoints.toRight(universe, isRoot, finish, foffset);
      return Anteater.fossil(universe, isRoot, leftSide, rightSide);
      // If we are starting on a text node, we need to split the text node first, and break from the split text node.
      // If we are starting on an element at the left edge, start from the first element if left or none if right.
    };

    return {
      placid: placid
    };
  }
);