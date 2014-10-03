RangeSet
========

A little library for keeping track of a set of large numbers using ranges.

    var RangeSet = require('rangeSet');

    var set = new RangeSet();

    // .add() takes an int or an array of ints
    set.add(1);
    set.add([2, 3, 6, 7, 8]);

    // .remove() takes an int or an array of ints
    set.remove(8);
    set.remove([2, 7]);

    // .contains() takes an int and returns a boolean
    set.contains(2); // false
    set.contains(3); // true

    // .max() returns the largest int in the set
    set.max(); // 6

    // .min() returns the smallest int in the set
    set.min(); // 1
