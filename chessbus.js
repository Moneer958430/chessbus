"use strict";

let boardtop = {
    tiles: {},
    pieces: {}
}

let common_piece_behavior = {
    "get position": function () {
        return this._position;
    },
    "set position": function (value) {
        this._position = value;
    },
    "get coordinate": function () {
        return this._coordinate;
    },
    "set coordinates": function (value) {
        this._coordinate = value;
    },
    "get movement in an empty field": function () {
        return this._empty_diagram
    },
    "set movement in an empty field": function (value) {
        this._empty_diagram = value;
    },
    "get movement in an enemy field": function () {
        return this._enemy_diagram;
    },
    "get movement in an enemy field": function () {
        return this._enemy_diagram;
    },
    "set movement in an enemy field": function (value) {
        this._enemy_diagram = value;
    },
    "move": function () {

    },
    "capture": function () {

    }
}

let common_tile_behavior = {
    "get position": function () {
        return this._position;
    },
    "set position": function (value) {
        this._position = value;
    },
    "get coordinate": function () {
        return this._coordinate;
    },
    "set coordinates": function (value) {
        this._coordinate = value;
    },
    "get attribute": function() {
        return this._attribute;
    },
    "set attribute": function(value) {
        this._attribute = value;
    },
    "get associated element": function() {
        return this._associated_element;
    },
    "set associated element": function(value) {
        this._associated_element = value;
    }
}

/* chessbus specific functions */

// unpure
function place_tiles(diagram, rows, columns, tiles, svg) {
    let r = rows;
    let c = 0;
    for (let i = diagram.length - 1; i >= 0; i -= 1) {
        for (let j = 0; j < tiles.length; j += 1) {
            if (tiles[j]["get attribute"]() == diagram[i]) {
                // some issues here
                r = (i + 1) % rows !== 0 ? rows : r - 1; 
                c = (i + 1) % columns !== 0 ? c++ : 0; 
                tiles[j]["set position"]({ r, c });
                boardtop.tiles[tiles[j]["get attribute"]() + " " + i] = tiles[j];
            }
        }
    }
}

// pure
function create_tile(attribute, associate_element) {
    let tile = Object.create(common_tile_behavior);
    tile["set attribute"](attribute);
    tile["set associated element"](associate_element);
    return tile;
}

// unpure
function place_pieces(config) {
    var get_id = setup_iding();

    for (piece in config.pieces) {

        var temp = Object.create(common_piece_behavior);
        boardtop.pieces[piece + " group"] = {};

        for (var i = 0;
            i < config.pieces[piece]["initial positions"].length; i++) {

            // clone the movement diagrams, and reverse them for easier computation.
            temp["set movement in an empty field"](
                clone(config.pieces[piece]["movement"]["movement in an empty field"])
                    .reverse()
            );
            temp["set movement in an enemy field"](
                clone(config.pieces[piece]["movement"]["movement in an enemy field"])
                    .reverse()
            );
            var id = get_id();
            boardtop.pieces[piece + " group"][piece + " " + id] =
                Object.create(temp);
            boardtop.pieces[piece + " group"][piece + " " + id]["set position"](
                clone(config.pieces[piece]["initial positions"][i])
            );
        }
    }
}

// pure
function setup_iding() {
    let id_counter = 0;
    return function () {
        return id_counter++;
    }
}

// pure
function normalizing() {

}

// pure
function check_if_legal(from, to, diagram) {
    if (Array.isArray(from) && Array.isArray(to)
        && Array.isArray(diagram)) {

        for (var i = 0; i < diagram.length; i++) {
            for (var j = 0; j < diagram[i].length; j++) {
                if (diagram[i][j] === 1) {
                    piece_location = diagram[i][j];
                }
            }
        }

        possible_location = [
            to[0] - from[0] + piece_location[0],
            to[1] - from[1] + piece_location[1]
        ];

        if (isNaN(diagram[possible_location[0], piece_location[1]]) ||
            diagram[possible_location[0], piece_location[1]] === 0) {
            return false;
        } else {
            return true;
        }
    }
}


/* utility functions */

// pure
function clone(object) {
    return JSON.parse(
        JSON.stringify(object)
    );
}

/* chessbus object */

var configuration = {
    "tiles": {
        "number of rows": 7,
        "number of columns": 7,
        "tiles configuration": [
            "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1",
            "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0",
            "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1",
            "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0",
            "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1",
            "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0",
            "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1",
            "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0", "tile-1", "tile-0"
        ]
    },
    "pieces": {
        "pawn": {
            "image attribute": "pawn",
            "initial positions": [
                [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]
            ],
            "movement": {
                "movement in an empty field": [
                    [0, 0, 0],
                    [0, 3, 0],
                    [0, [2, 3], 0],
                    [0, 1, 0],
                    [0, 0, 0]
                ],
                "movement in an enemy field": [
                    [0, 0, 0, 0, 0],
                    [0, 2, 0, 2, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                "can jump": false
            }
        }
    }
}

class chessBus extends HTMLElement {

    get config() {
        return JSON.parse(this.getAttribute("config"));
    }

    set config(value) {
        this.setAttribute("config", JSON.stringify(value));
    }

    connectedCallback() {
        this.config = configuration;

        this.innerHTML = "<svg></svg>";

        // creating, placing the tiles
        let tiles = [];
        let it = this.tilesIterator();
        let result = it.next();
        while (!result.done) {
            tiles.push(create_tile(result.value.attribute, result.value.tile));
            result = it.next();
        }    
        place_tiles(
            this.config["tiles"]["tiles configuration"],
            this.config["tiles"]["number of rows"],
            this.config["tiles"]["number of columns"],
            tiles,
            this.querySelector("svg")
        );

    }

    tilesIterator() {
        let that = this;
        let tile_count = 0;
        let iteration_count = 0;
        const iterator = {
            next: function () {
                let result;
                if (that.hasAttribute("tile-" + tile_count)) {
                    result = {
                        value: { attribute: "tile-" + tile_count,
                            tile: that.getAttribute("tile-" + tile_count)},
                        done: false
                    }
                    tile_count += 1;
                    iteration_count += 1;
                    return result;
                }
                return { value: iteration_count, done: true }
            }
        };
        return iterator;
    }
}

customElements.define("chess-bus", chessBus);
