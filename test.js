var lodash = require('lodash');
var RangeSet = require('./rangeSet');

var set = new RangeSet();

var rangesToAdd = [
    [20, 50],
    [60, 70],
    [52, 58],
    [90, 90],
    [91, 91],
    [4, 7],
    [82, 85],
    [100, 110],
    [92, 99],
    [1, 120]
];


for (var i = 0, len = rangesToAdd.length; i < len; i++) {
    set.addRange(rangesToAdd[i]);
    console.log('adding', rangesToAdd[i], ':', set._ranges);
}


// set.remove([2, 17]);
// console.log('removing 2, 17:', set._ranges);

// set.remove(1);
// console.log('removing 1:', set._ranges);

console.log('------------------------');


var start = Date.now();
set.addRange([0, 99999]);
console.log('add 0, 99999:', set._ranges);
set.removeRange([46, 860]);
console.log('remove 46, 860:', set._ranges);
set.removeRange([0, 401]);
console.log('remove 0, 401:', set._ranges);
set.addRange([25422, 435231]);
console.log('add 25422, 435231:', set._ranges);
set.removeRange([66666, 435230]);
console.log('remove 66666, 435230:', set._ranges);
set.removeRange([402, 979]);
console.log('remove 402, 979:', set._ranges);
set.removeRange([980, 99998]);
console.log('remove 980, 99998:', set._ranges);

console.log('Performance (ms):', Date.now() - start);
console.log('current set:', set._ranges);
console.log('max', set.max());
console.log('min', set.min());
