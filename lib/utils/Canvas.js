'use strict';

// HTML Canvas API Wrapper.
module.exports = {

    init: function(width, height) {
        var canvas = document.querySelector('.text-maze');

        if (! canvas) {
            throw Error('Cannot find a canvas tag with id of #text-maze');
        }

        if (! canvas.getContext) {
            throw Error('Canvas getContext property does not exist');
        }

        canvas.width  = width;
        canvas.height = height;

        this.context = canvas.getContext('2d');

        this.context.clearRect(0, 0, width, height);
    },

    paint: function(color, x, y, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }
};
