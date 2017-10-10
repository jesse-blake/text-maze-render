# Text Maze Render

Rendering functions for mazes created with the [text-maze](https://github.com/jesse-blake/text-maze) package. Rendering is via the HTML <canvas> API.

See it in use: [https://littlesystem.com/maze](https://littlesystem.com/maze)

## Install

```sh
npm install --save text-maze-render
```

## Usage

Render a text maze with either the `blocky`, `bordered` or `walled` rendering function.

```js
var tm  = require('text-maze');
var tmr = require('text-maze-render');

var maze = tm("I don't know half of you half as well as I should like.");

tmr.blocky(maze.maze, {
    cellSize: maze.cellSize,
    endpoints: maze.endpoints,
    showText: true,
    showSolution: true
});
```

Put a canvas tag in your HTML with an `id` of `text-maze`.

```html
<canvas id="text-maze">
```

Bundle your code with something like [browserify](https://github.com/browserify/browserify).
```sh
browserify code.js -o bundle.js
```

Load the bundle in your HTML.
```html
<script src="path/to/bundle.js"></script>
```
