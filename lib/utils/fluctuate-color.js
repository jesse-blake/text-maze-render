'use strict';

var utl = require('./index');

// Given a color, return a lighter/darker similar color.
module.exports = function (color, colors) {

    var h, hRange = 40, hDomain = 360;
    var s, sRange = 20, sDomain = 100;
    var l, lRange = 20, lDomain = 100;

    // Don't fluctuate color, sometimes.
    if (color === colors.blank) {
        return utl.colors.hsl(color);
    }

    h = randomInRangeInDomain(utl.colors.hue(color),        hRange, hDomain, true);
    s = randomInRangeInDomain(utl.colors.saturation(color), sRange, sDomain, false);
    l = randomInRangeInDomain(utl.colors.lightness(color),  lRange, lDomain, false);

    // Keep fluctuations away from too light to see.
    l = l > 90 ? randomInRange(70, 90) : l;

    // Keep fluctuations away from too dark to see.
    l = l < 10 ? randomInRange(10, 30) : l;

    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random number in a range centered on x. Range and domain are
// assumed to start at 0.
//
// @arg int  x      In domain [0, domain].
// @arg int  range  Divisible by 2 and < than domain.
// @arg int  domain Signifying the domain [0, domain].
// @arg bool wrap   If true, domain wraps either end on overflow.
function randomInRangeInDomain(x, range, domain, wrap) {
    var result, min, max, rangeIdx;

    min = x - range / 2;
    max = x + range / 2;

    if (min < 0 || max > domain) {

        // Wrap the domain and return the random number.
        if (wrap) {
            min = min < 0      ? domain + min + 1 : min;
            max = max > domain ? max - domain - 1 : max;

            result = min;
            rangeIdx = randomInRange(0, range);

            while (rangeIdx > 0) {
                result++;
                if (result > domain) {
                    result = max;
                }
                rangeIdx--;
            }

            return result;
        }

        // Just correct the overflow.
        min = min < 0      ? 0      : min;
        max = max > domain ? domain : max;
    }

    result = randomInRange(min, max);

    return result;
}
