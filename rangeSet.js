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

    add: function(nums) {
        if (!_isArray(nums)) {
            nums = [nums];
        }

        var low, high, num;
        for (var j = 0, leng = nums.length; j < leng; j++) {
            num = nums[j];

            if (!this._ranges.length) {
                this._ranges.push([num, num]);
                continue;
            }

            for (var i = 0, len = this._ranges.length; i < len; i++) {
                low = this._ranges[i][0];
                high = this._ranges[i][1];

                if (_contains(this._ranges[i], num)) {
                    break;
                }
                if (low - 1 === num) {
                    this._ranges[i][0] = num;
                    break;
                }
                if (high + 1 === num) {
                    this._ranges[i][1] = num;

                    // if this closes a gap, merge the two ranges
                    nextRange = this._ranges[i + 1];
                    if (nextRange && nextRange[0] - 1 === num) {
                        this._ranges.splice(i, 2, [low, nextRange[1]]);
                    }
                    break;
                }
                if (num < low) {
                    this._ranges.splice(i, 0, [num, num]);
                    break;
                }
                // if none of the previous ranges or gaps contain the num
                if (len - 1 === i) {
                    this._ranges.push([num, num]);
                }
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

module.exports = RangeSet;
