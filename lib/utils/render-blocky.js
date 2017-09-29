'use strict';

// Paint a single cell in the maze a solid color padded with a single px of
// blank space.
module.exports = function (maze, canvas, opts, x, y) {

    var cellSize = opts.cellSize;

    var colors = {
        '-2': 'red',       // Solution.
        '-1': 'red',       // Solution.
        '0':  'black',     // Wall.
        '1':  'white',     // Path.
        '2':  'chartreuse' // Path that is part of a character.
    };

    var color = colors[maze[y][x]];

    switch (true) {
    case opts.showSolution && opts.showText:
        // Render the text on top of the solution.
        if (maze[y][x] === -2) color = colors[ Math.abs(maze[y][x]) ];
        break;

    case opts.showSolution:
        // Don't render the text.
        if (maze[y][x] === 2) color = colors['1'];
        break;

    case opts.showText:
        // Don't render the solution.
        if (maze[y][x] < 0) color = colors[ Math.abs(maze[y][x]) ];
        break;

    default:
        // Do not render the text or solution.
        if (maze[y][x] !== 0) color = colors['1'];
    }

    canvas.paint(
        color,
        x * cellSize + 1,
        y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
    );
};
