'use strict';

var utl = require('./utils/index');

// Paint the entire maze.
module.exports = {

    blocky: function(maze, opts) {
        render(maze, opts, utl.renderBlocky);
    },

    bordered: function(maze, opts) {
        render(maze, opts, utl.renderBordered);
    },

    walled: function(maze, opts) {
        render(maze, opts, utl.renderWalled);
    }
};

function render(maze, opts, renderFunc) {
    var width  = opts.cellSize * maze[0].length;
    var height = opts.cellSize * maze.length;

    var canvas = Object.create(utl.Canvas);

    canvas.init(width, height);

    for (var y = 0; y < maze.length; y++) {
        for (var x = 0; x < maze[y].length; x++) {
            renderFunc(maze, canvas, opts, x, y);
        }
    }
}
