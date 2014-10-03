var lodash = require('lodash');
var RangeSet = require('./rangeSet');

var set = new RangeSet();

set.add([1, 2, 3]);
set.add([6, 7, 8]);

console.log('ranges:', set._ranges);

set.add([9, 14]);

console.log('adding 9, 14:', set._ranges);

set.add(15);

console.log('adding 15:', set._ranges);

set.remove([2, 17]);

console.log('removing 2, 17:', set._ranges);

set.remove(1);

console.log('removing 1:', set._ranges);

set.add([5, 4]);

console.log('adding 5, 4:', set._ranges);

console.log('------------------------');

var start = Date.now();
set.add(lodash.range(0, 99999));
set.remove(lodash.range(46, 860, 2));
set.remove(lodash.range(0, 401));
set.add(lodash.range(25422, 435231));
set.remove(lodash.range(66666, 435230, 25000));
set.remove(lodash.range(402, 979));
set.remove(lodash.range(980, 99998));

console.log('Performance:', Date.now() - start);
console.log('current set:', set._ranges);
console.log('max', set.max());
console.log('min', set.min());
