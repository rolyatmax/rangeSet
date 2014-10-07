function RangeSet() {
    this._ranges = [];
}

RangeSet.prototype = {
    remove: function(nums) {
        if (!_isArray(nums)) {
            nums = [nums];
        }

        var low, high, num;
        for (var j = 0, leng = nums.length; j < leng; j++) {
            num = nums[j];

            for (var i = 0, len = this._ranges.length; i < len; i++) {
                if (!_contains(this._ranges[i], num)) {
                    continue;
                }

                low = this._ranges[i][0];
                high = this._ranges[i][1];

                if (low === num && high === num) {
                    this._ranges.splice(i, 1);
                } else if (low === num) {
                    this._ranges[i][0] = low + 1;
                } else if (high === num) {
                    this._ranges[i][1] = high - 1;
                } else {
                    this._ranges.splice(i, 1, [low, num - 1], [num + 1, high]);
                }
                break;
            }
        }
    },

    // add: function(nums) {
    //     if (_isNumber(nums)) {
    //         return this._addArray([nums]);
    //     }

    //     if (_isArray(nums)) {
    //         return this._addArray(nums);
    //     }
    // },

    _removeRange: function(range) {
        // go through all the ranges


        // if range ends before curRange
        // then we're done

        // if range starts after curRange[1]
        // then continue

        // if range starts before curRange or on curRange[0]
        // ... and ends before curRange[1]
        //     then curRange[0] = range[1] + 1
        // ... and ends after or on curRange[1]
        //     then splice out curRange

        // if range starts after curRange[0]
        // ... and ends on or after curRange[1]
        //     then curRange[1] = range[0] - 1
        // ... and ends before curRange[1]
        //     then splice in two new ranges:
        //         [curRange[0], range[0] - 1] and [range[1] + 1, curRange[1]]



        var curRange;
        for (var i = 0, len = this._ranges.length; i < len; i++) {
            curRange = this._ranges[i];

            if (range[1] < curRange[0]) {
                return;
            }

            if (range[0] > curRange[1]) {
                continue;
            }

            if (range[0] <= curRange[0]) {
                if (range[1] < curRange[1]) {
                    curRange[0] = range[1] + 1;
                } else {
                    this._ranges.splice(i, 1);
//////////////// WAIT - CAN'T MAKE CHANGES TO this._ranges while looping over it
                }
            }

        }


    },

    _addRange: function(range) {
        if (!this._ranges.length) {
            this._ranges.push(range);
            return;
        }

        var curRange, nextRange, overlapStart, overlapStartIdx,
            overlappingRangeCount, isLastOverlap, low, high;
        for (var i = 0, len = this._ranges.length; i < len; i++) {
            curRange = this._ranges[i];

            // if the range comes before all the other ranges with no overlap
            if (range[1] < curRange[0] - 1) {
                this._ranges.splice(i, 0, range);
                return;
            }

            if (overlapStart === undefined && _hasOverlap(curRange, range)) {
                overlapStartIdx = i;
                overlapStart = curRange[0];
            }

            nextRange = this._ranges[i + 1];
            if (overlapStart === undefined && !nextRange) {
                // last loop and no overlapStart found
                // it must come after all the other ranges
                this._ranges.push(range);
                return;
            }

            isLastOverlap = !nextRange || !_hasOverlap(nextRange, range);
            if (overlapStart !== undefined && isLastOverlap) {
                // curRange is the last overlapping range
                low = Math.min(overlapStart, range[0]);
                high = Math.max(curRange[1], range[1]);
                overlappingRangeCount = i - overlapStartIdx + 1;
                this._ranges.splice(overlapStartIdx, overlappingRangeCount, [low, high]);
                return;
            }
        }
    },

    contains: function(num) {
        for (var i = 0, len = this._ranges.length; i < len; i++) {
            if (_contains(this._ranges[i], num)) {
                return true;
            }
        }
        return false;
    },

    max: function() {
        var lastRange = this._ranges[this._ranges.length - 1];
        return lastRange ? lastRange[1] : null;
    },

    min: function() {
        var firstRange = this._ranges[0];
        return firstRange ? firstRange[0] : null;
    }
};

///////// helpers

function _contains(range, num) {
    return num >= range[0] && num <= range[1];
}

function _isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function _isNumber(obj) {
    return typeof obj === 'number';
}

function _hasOverlap(rangeOne, rangeTwo) {
    var lowest = rangeOne[0] <= rangeTwo[0] ? rangeOne : rangeTwo;
    var highest = lowest === rangeOne ? rangeTwo : rangeOne;
    return lowest[1] >= highest[0] - 1;
}

module.exports = RangeSet;
