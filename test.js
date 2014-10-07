var lodash = require('lodash');
var RangeSet = require('./rangeSet');

var set = new RangeSet();

var rangesToAdd = [
    [20, 50],
    [40, 70],
    [71, 80],
    [90, 90],
    [91, 91],
    [4, 7],
    [82, 85],
    [84, 110],
    [1, 120]
];


for (var i = 0, len = rangesToAdd.length; i < len; i++) {
    set._addRange(rangesToAdd[i]);
    console.log('adding', rangesToAdd[i], ':', set._ranges);
}







// set.remove([2, 17]);
// console.log('removing 2, 17:', set._ranges);

// set.remove(1);
// console.log('removing 1:', set._ranges);

console.log('------------------------');


// var start = Date.now();
// set.add(lodash.range(0, 99999));
// set.remove(lodash.range(46, 860, 2));
// set.remove(lodash.range(0, 401));
// set.add(lodash.range(25422, 435231));
// set.remove(lodash.range(66666, 435230, 25000));
// set.remove(lodash.range(402, 979));
// set.remove(lodash.range(980, 99998));

// console.log('Performance (ms):', Date.now() - start);
// console.log('current set:', set._ranges);
// console.log('max', set.max());
// console.log('min', set.min());
