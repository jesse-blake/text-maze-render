'use strict';

var utl = require('./index');

// Paint walls of maze in non-path cells.
module.exports = function paintCell(maze, canvas, opts, x, y) {

    var colors = {
        text:     'black',
        solution: 'orange',
        blank:    'white',

        fluctuateTextColor:     true,
        fluctuateSolutionColor: true
    };

    var cp = canvas.paint.bind(canvas);

    var clr, fluctuate;

    // True if the vertically/horizontally adjacent cells are paths.
    var onPathAbv, onPathRgt, onPathBlw, onPathLft;

    var cs = opts.cellSize;

    // Wall width.
    var ww = Math.floor(opts.cellSize / 2) - 1;

    // Border width.
    var bw = (cs - ww) / 2;

    // Paint the walls.
    if (! onPath(maze, x, y)) {

        onPathAbv = onPath(maze, x, y-1);
        onPathRgt = onPath(maze, x+1, y);
        onPathBlw = onPath(maze, x, y+1);
        onPathLft = onPath(maze, x-1, y);

        clr = 'black';

        cp(clr, x*cs+bw, y*cs+bw, ww, ww);

        if (validCell(maze, x, y-1) && ! onPathAbv) {
            cp(clr, x*cs+bw, y*cs, ww, bw);
        }
        if (validCell(maze, x+1, y) && ! onPathRgt) {
            cp(clr, x*cs+bw+ww, y*cs+bw, bw, ww);
        }
        if (validCell(maze, x, y+1) && ! onPathBlw) {
            cp(clr, x*cs+bw, y*cs+bw+ww, ww, bw);
        }
        if (validCell(maze, x-1, y) && ! onPathLft) {
            cp(clr, x*cs, y*cs+bw, bw, ww);
        }
    }

    // Paint the solution and text.
    if (onPath(maze, x, y)) {

        // Paint the solution.
        if (opts.showSolution && isSoluCell(maze, x, y)) {
            fluctuate = colors.fluctuateSolutionColor;

            clr = fluctuate ? utl.fluctuateColor(colors.solution, colors) : colors.solution;
            cp(clr, x*cs, y*cs, cs, cs);
        }

        // Paint the text.
        if (opts.showText && isCharCell(maze, x, y)) {
            fluctuate = colors.fluctuateTextColor;
            clr = fluctuate ? utl.fluctuateColor(colors.text, colors) : colors.text;
            cp(clr, x*cs, y*cs, cs, cs);
        }

        // Paint start and end openings.
        clr = colors.blank;
        cp(clr, opts.endpoints.start.x*cs-bw,  opts.endpoints.start.y*cs-bw, 2*bw, cs+2*bw);
        cp(clr, opts.endpoints.end.x*cs+cs-bw, opts.endpoints.end.y*cs-bw,   2*bw, cs+2*bw);
    }
};

function validCell(maze, x, y) {
    return y >= 0 && y < maze.length && x >= 0 && x < maze[y].length;
}

// Returns true if the given coordinates refer to cell that is a path.
function onPath(maze, x, y) {
    return validCell(maze, x, y) && maze[y][x] !== 0;
}

// Returns true if the coordinates are onPath() and refer to an
// object that doesn't have its 'connection' property set.
function isCharCell(maze, x, y) {
    return Math.abs(maze[y][x]) === 2;
}

// Returns true if the given coordinates refer to an object that
// has the 'key' property set (meaning it's part of the solution key).
function isSoluCell(maze, x, y) {
    return y >= 0             &&
           y < maze.length    &&
           x >= 0             &&
           x < maze[y].length &&
           maze[y][x] < 0;
}
