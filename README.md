RangeSet
========

A little library for keeping track of sets of large numbers using ranges.

    var RangeSet = require('rangeSet');

    var set = new RangeSet();

    // .add() takes an int, an array of ints, or RangeSet instance
    set.add(1);
    set.add([2, 3, 6, 7, 8]);
    set.add(anotherRangeSet);

    // .remove() takes an int, an array of ints, or RangeSet instance
    set.remove(8);
    set.remove([2, 7]);
    set.remove(anotherRangeSet);

    // .addRange() takes a range in the form [1, 100], inclusive of both ints
    set.addRange([1, 100]);

    // .removeRange() takes a range in the form [1, 100], inclusive of both ints
    set.removeRange([50, 150]);

    // .contains() takes an int and returns a boolean
    set.contains(2); // false
    set.contains(3); // true

    // .max() returns the largest int in the set
    set.max(); // 6

    // .min() returns the smallest int in the set
    set.min(); // 1
