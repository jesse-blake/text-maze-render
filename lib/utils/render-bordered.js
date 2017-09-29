'use strict';

var utl = require('./index');

// Paint a single cell in the maze, thinly bordered.
module.exports = function paintCell(maze, canvas, opts, x, y) {

    var colors = {
        text:     'black',
        solution: 'chartreuse',
        blank:    'white',

        fluctuateTextColor:     true,
        fluctuateSolutionColor: true
    };

    var cp = canvas.paint.bind(canvas);

    var clr, fluctuate;

    // True if the vertically/horizontally adjacent cells are paths.
    var onPathAbv, onPathRgt, onPathBlw, onPathLft;

    // True if the diagonally adjacent cells are paths.
    var onPathAbvRgt, onPathRgtBlw, onPathBlwLft, onPathLftAbv;

    var cs = opts.cellSize;

    // Border diameter.
    var bd = 1;

    // Text margin, i.e. the margin between the text and borders.
    var tm = cs < 10 ? 0 : Math.floor(cs / 5) - 1;

    if (onPath(maze, x, y)) {

        onPathAbv = onPath(maze, x, y-1);
        onPathRgt = onPath(maze, x+1, y);
        onPathBlw = onPath(maze, x, y+1);
        onPathLft = onPath(maze, x-1, y);

        onPathAbvRgt = onPath(maze, x+1, y-1);
        onPathRgtBlw = onPath(maze, x+1, y+1);
        onPathBlwLft = onPath(maze, x-1, y+1);
        onPathLftAbv = onPath(maze, x-1, y-1);

        clr = 'black';

        // Paint borders.
        if (! onPathAbv) {
            cp(clr, x*cs+bd, y*cs-2*bd, cs-2*bd, bd);
        }
        if (! onPathRgt) {
            cp(clr, x*cs+cs+bd, y*cs+bd, bd, cs-2*bd);
        }
        if (! onPathBlw) {
            cp(clr, x*cs+bd, y*cs+cs+bd, cs-2*bd, bd);
        }
        if (! onPathLft) {
            cp(clr, x*cs-2*bd, y*cs+bd, bd, cs-2*bd);
        }

        // Paint border corners.
        if (! onPathAbv && ! onPathRgt) {
            cp(clr, x*cs+cs-bd, y*cs-2*bd, 3*bd, bd);
            cp(clr, x*cs+cs+bd, y*cs-bd, bd, 2*bd);
        }
        else if (! onPathAbv && ! onPathAbvRgt) {
            cp(clr, x*cs+cs-bd, y*cs-2*bd, bd, bd);
        }
        else if (! onPathRgt && ! onPathAbvRgt) {
            cp(clr, x*cs+cs+bd, y*cs, bd, bd);
        }

        if (! onPathRgt && ! onPathBlw) {
            cp(clr, x*cs+cs+bd, y*cs+cs-bd, bd, 2*bd);
            cp(clr, x*cs+cs-bd, y*cs+cs+bd, 3*bd, bd);
        }
        else if (! onPathRgt && ! onPathRgtBlw) {
            cp(clr, x*cs+cs+bd, y*cs+cs-bd, bd, bd);
        }
        else if (! onPathBlw && ! onPathRgtBlw) {
            cp(clr, x*cs+cs-bd, y*cs+cs+bd, bd, bd);
        }

        if (! onPathBlw && ! onPathLft) {
            cp(clr, x*cs-2*bd, y*cs+cs-bd, bd, 2*bd);
            cp(clr, x*cs-2*bd, y*cs+cs+bd, 3*bd, bd);
        }
        else if (! onPathBlw && ! onPathBlwLft) {
            cp(clr, x*cs, y*cs+cs+bd, bd, bd);
        }
        else if (! onPathLft && ! onPathBlwLft) {
            cp(clr, x*cs-2*bd, y*cs+cs-bd, bd, bd);
        }

        if (! onPathLft && ! onPathAbv) {
            cp(clr, x*cs-2*bd, y*cs-2*bd, 3*bd, bd);
            cp(clr, x*cs-2*bd, y*cs-bd, bd, 2*bd);
        }
        else if (! onPathLft && ! onPathLftAbv) {
            cp(clr, x*cs-2*bd, y*cs, bd, bd);
        }
        else if (! onPathAbv && ! onPathLftAbv) {
            cp(clr, x*cs, y*cs-2*bd, bd, bd);
        }

        // Paint the solution.
        if (opts.showSolution && isSoluCell(maze, x, y)) {
            fluctuate = colors.fluctuateSolutionColor;

            if (isSoluCell(maze, x, y-1)) {
                clr = fluctuate ? utl.fluctuateColor(colors.solution, colors) : colors.solution;
                cp(clr, x*cs+bd+tm, y*cs, cs-2*bd-2*tm, bd+tm);
            }
            if (isSoluCell(maze, x+1, y)) {
                clr = fluctuate ? utl.fluctuateColor(colors.solution, colors) : colors.solution;
                cp(clr, x*cs+cs-bd-tm, y*cs+bd+tm, bd+tm, cs-2*bd-2*tm);
            }
            if (isSoluCell(maze, x, y+1)) {
                clr = fluctuate ? utl.fluctuateColor(colors.solution, colors) : colors.solution;
                cp(clr, x*cs+bd+tm, y*cs+cs-bd-tm, cs-2*bd-2*tm, bd+tm);
            }
            if (isSoluCell(maze, x-1, y)) {
                clr = fluctuate ? utl.fluctuateColor(colors.solution, colors) : colors.solution;
                cp(clr, x*cs, y*cs+bd+tm, bd+tm, cs-2*bd-2*tm);
            }
            clr = fluctuate ? utl.fluctuateColor(colors.solution, colors) : colors.solution;
            cp(clr, x*cs+bd+tm, y*cs+bd+tm, cs-2*bd-2*tm, cs-2*bd-2*tm);
        }

        // Paint the text.
        if (opts.showText && isCharCell(maze, x, y)) {
            fluctuate = colors.fluctuateTextColor;

            if (isCharCell(maze, x, y-1)) {
                clr = fluctuate ? utl.fluctuateColor(colors.text, colors) : colors.text;
                cp(clr, x*cs+bd+tm, y*cs, cs-2*bd-2*tm, bd+tm);
            }
            if (isCharCell(maze, x+1, y)) {
                clr = fluctuate ? utl.fluctuateColor(colors.text, colors) : colors.text;
                cp(clr, x*cs+cs-bd-tm, y*cs+bd+tm, bd+tm, cs-2*bd-2*tm);
            }
            if (isCharCell(maze, x, y+1)) {
                clr = fluctuate ? utl.fluctuateColor(colors.text, colors) : colors.text;
                cp(clr, x*cs+bd+tm, y*cs+cs-bd-tm, cs-2*bd-2*tm, bd+tm);
            }
            if (isCharCell(maze, x-1, y)) {
                clr = fluctuate ? utl.fluctuateColor(colors.text, colors) : colors.text;
                cp(clr, x*cs, y*cs+bd+tm, bd+tm, cs-2*bd-2*tm);
            }
            clr = fluctuate ? utl.fluctuateColor(colors.text, colors) : colors.text;
            cp(clr, x*cs+bd+tm, y*cs+bd+tm, cs-2*bd-2*tm, cs-2*bd-2*tm);
        }

        // Paint start and end openings.
        clr = colors.blank;
        cp(clr, opts.endpoints.start.x*cs-bd,  opts.endpoints.start.y*cs-bd, 2*bd, cs+2*bd);
        cp(clr, opts.endpoints.end.x*cs+cs-bd, opts.endpoints.end.y*cs-bd,   2*bd, cs+2*bd);
    }
};

// Returns true if the given coordinates refer to cell that is a path.
function onPath(maze, x, y) {
    return y >= 0 && y < maze.length && x >= 0 && x < maze[y].length && maze[y][x] !== 0;
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
