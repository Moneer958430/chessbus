"use strict";

let WIDTH;
let HEIGHT;

let boardtop = {
    "tiles": {
        "tiles list": {}
    },
    "pieces": {
        "pieces list": {}
    }
}

let common_behavior = {
    "get element": function () {
        return this._element;
    },
    "set element": function (value) {
        this._element = value;
    },
    "get position": function () {
        let position = {
            "row": this["get element"]().getAttribute("row"),
            "column": this["get element"]().getAttribute("column")
        }
        return position;
    },
    "set position": function (value) {
        this["get element"]().setAttribute("row", value["row"]);
        this["get element"]().setAttribute("column", value["column"]);
    },
    "get coordinate": function () {
        let coordinate = {
            "x": this["get element"]().getAttribute("x"),
            "y": this["get element"]().getAttribute("y")
        }
        return coordinate;
    },
    "set coordinate": function (value) {
        this["get element"]().setAttribute("x", value["x"]);
        this["get element"]().setAttribute("y", value["y"]);
    },
    "get fill": function () {
        return this["get element"]().getAttribute("fill");
    },
    "set fill": function (value) {
        this["get element"]().setAttribute("fill", value);
    },
    "get map": function (row, column) {
        if (row && column) {
            return this._map[row][column];
        }
        return this._map;
    },
    "set map": function(row, column, value) {
        if (!this._map) {
            this._map = [];
        }
        if (row && column) {
            this._map[row][column] = value;
        } else {
            throwError("You can't set map without providing positions");
        }
    }
}

let common_piece_behavior = {
    "get transform": function () {
        let context = this;
        let transform = this["get element"]().getAttribute("transform");
        return {
            "toString": function () {
                return transform;
            },
            "get translate": function () {
                let translate = /translate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                return translate !== null ? translate[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set translate": function (value) {
                let translate = /translate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(translate, `translate(${value.toString()})`)
                );
            },
            "get matrix": function () {
                let matrix = /matrix\([\d|\s|\.|\-|,]*\)/.exec(transform);
                return matrix !== null ? matrix[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set matrix": function (value) {
                let matrix = /matrix\([\d|\s|\.|\-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(matrix, `matrix(${value.toString()})`)
                );
            },
            "get rotate": function () {
                let rotate = /rotate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                return rotate !== null ? rotate[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set rotate": function (value) {
                let rotate = /rotate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(rotate, `rotate(${value.toString()})`)
                );
            }
        }
    },
    "set transform": function (funcs) {
        let transform = "";
        for (let func in funcs) {
            transform += `${func}(${funcs[func].toString()}) `;
        }
        this["get element"]().setAttribute("transform", transform);
    },
    "get offset": function () {
        return this._offset
    },
    "set offset": function (x, y) {
        this._offset = {};
        this._offset["x"] = x;
        this._offset["y"] = y;
    },
    "get bias": function () {
        return this._bias
    },
    "set bias": function (x, y) {
        this._bias = {};
        this._bias["x"] = x;
        this._bias["y"] = y;
    },
    "get jump": function () {
        return _jump;
    },
    "set jump": function (value) {
        this._jump = value;
    },
    "get move count": function () {
        return this._move_count;
    },
    "get move count": function (value) {
        this._move_count = value;
    },
    "start moving": function (event) {
        let transform = this["get transform"]();
        let original_coordinate = {
            "x": transform["get translate"]()[0],
            "y": transform["get translate"]()[1]
        }
        let destination;

        return (mouse, event) => {
            switch (mouse) {
                case "mousemove":
                    transform = this["get transform"]();
                    transform["set translate"](
                        [
                            transform["get translate"]()[0] + event.movementX,
                            transform["get translate"]()[1] + event.movementY
                        ]
                    );
                    break;
                case "mouseup":
                    destination = center_piece_via_coordinate(
                        {
                            "x": transform["get translate"]()[0],
                            "y": transform["get translate"]()[1]
                        },
                        this["get offset"](), this["get bias"]()
                    );
                    if (this["check empty move"](
                        original_coordinate,
                        destination)) { 
                        transform["set translate"](
                            [destination["x"], destination["y"]]
                        );
                        break;
                    }
                case "mouseleave":
                default:
                    destination = center_piece_via_coordinate(
                        original_coordinate,
                        this["get offset"](), this["get bias"]()
                    );
                    transform["set translate"](
                        [destination["x"], destination["y"]]
                    );
            }
        }
    },
    "capture": function () {

    },
    "get reach": function () {
        return this._reach;
    },
    "set reach": function (value) {
        this._reach = value;
    },
    "mouse down": function (event) {
        if (event.which === 1) {
            maestro["piece to move"]["set"] = true;
            maestro["piece to move"]["move"] =
                this["start moving"]();
        }
    }
}

Object.setPrototypeOf(common_piece_behavior, common_behavior);

let common_tile_behavior = {
    "get width": function () {
        return this["get element"]().getAttribute("width");
    },
    "set width": function (value) {
        this["get element"]().setAttribute("width", value);
    },
    "get height": function () {
        return this["get element"]().getAttribute("height");
    },
    "set height": function (value) {
        this["get element"]().setAttribute("height", value);
    },
    "mouse down": function (event) {
        if (event.which === 3) {
            this._mousedown = true;
        }
    },
    "mouse up": function (event) {
        if (event.which === 3) {
            if (this._mousedown === true) {
                this["highlight"]();
                this._mousedown = false;
            }
        }
    },
    "highlight": function () {
        let original_fill = this["get fill"]();
        this["set fill"]("#ffff00");
        maestro["highlights list"].push(() => {
            this["set fill"](original_fill);
        });
    }
}

Object.setPrototypeOf(common_tile_behavior, common_behavior);

let maestro = {
    "highlights list": [],
    "clear highlights": function () {
        if (maestro["highlights list"].length !== 0) {
            for (let i = 0; i < maestro["highlights list"].length; i += 1) {
                maestro["highlights list"][i]();
            }
        }
    },
    "piece to move": { "set": false },
    "mouse down": function (event) {
        maestro["clear highlights"]()
    },
    "mouse move": function (event) {
        if (event.which === 1) {
            if (maestro["piece to move"]["set"] === true) {
                maestro["piece to move"]["move"]("mousemove", event);
            }
        }
    },
    "mouse up": function (event) {
        if (event.which === 1) {
            if (maestro["piece to move"]["set"] === true) {
                maestro["piece to move"]["set"] = false;
                maestro["piece to move"]["move"]("mouseup", event);
            }
        }
    },
    "mouse leave": function () {
        if (event.which === 1) {
            if (maestro["piece to move"]["set"] === true) {
                maestro["piece to move"]["set"] = false;
                maestro["piece to move"]["move"]("mouseleave", event);
            }
        }
    }
}

/* chessbus specific functions */

// unpure
function place_tiles({ diagram, columns, svg }) {

    let r = 0, c = 0, x = 0, y = 0, tile, rect, get_id 
        = setup_iding(false, diagram.length);

    for (let i = 0; i < diagram.length; i += 1) {
        rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svg.appendChild(rect);
        
        tile = boardtop["tiles"]["tiles list"]["tile" + " " + get_id()]
            = Object.create(common_tile_behavior);

        tile["set element"](rect);
        tile["set position"]({ "row": r, "column": c });
        tile["set coordinate"]({ "x": x, "y": y });
        tile["set width"](WIDTH);
        tile["set height"](HEIGHT);
        tile["set fill"](diagram[i]);
        tile["get element"]().addEventListener("mousedown",
            tile["mouse down"].bind(tile)
        );
        tile["get element"]().addEventListener("mouseup",
            tile["mouse up"].bind(tile)
        );

        if ((i + 1) % (columns + 1) !== 0) {
            c += 1;
            x += WIDTH;
        } else {
            c = 0;
            x = 0;
            r += 1;
            y += HEIGHT;
        }
    }
}

// unpure
function place_piece({ name, drawing, initial_position,
    empty_field, enemy_field, jump, svg, rows, offset, bias,
    top_reach, piece_position, transform }) {

    let g, piece, get_id = setup_iding(), check_empty_move = 
        arbiter(empty_field, piece_position, top_reach);

    initial_position.forEach(
        (position) => {
            g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.innerHTML = drawing;

            piece = boardtop["pieces"]["pieces list"][name + " " + get_id()] 
                = Object.create(common_piece_behavior);
            piece["set element"](g);
            piece["set position"]({ "row": mirror_row(position["row"], rows), "column": position["column"] });
            piece["set offset"](offset["x"], offset["y"]);
            piece["set bias"](bias["x"], bias["y"]);
            piece["set jump"] = jump;
            // dynamically added property:
            piece["check empty move"] = check_empty_move;
            piece["set reach"](2);
            piece["get element"]().addEventListener("mousedown",
                piece["mouse down"].bind(piece)
            );

            place_piece_on_tile(piece, svg, offset, transform);
        }
    );
}

// unpure
function place_piece_on_tile(piece, svg, offset, transform) {
    let tiles = boardtop["tiles"]["tiles list"];

    for (let tile in tiles) {
        
        if (tiles[tile]["get position"]()["row"] 
            == piece["get position"]()["row"] 
            && tiles[tile]["get position"]()["column"] 
            == piece["get position"]()["column"]) {

            piece["set coordinate"](tiles[tile]["get coordinate"]());
            let coordinate = center_piece_via_position(
                piece["get position"](), offset
            );
            
            let tran = {
                "translate": [coordinate["x"], coordinate["y"]]
            };

            for (let t in transform) {
                if (transform[t] !== undefined) {
                    tran[t] = transform[t];
                }
            }

            piece["set transform"](tran);

            svg.appendChild(piece["get element"]());
        }
    }
}

// pure
function setup_iding(assending = true, startat = 0) {
    if (assending) {
        return function () {
            return startat++;
        }
    } else {
        return function () {
            return startat--;
        }
    }
}

function arbiter(diagram, piece_position, top_reach) {
    return function (from, to, map) {
        let reach = this["get reach"]();
        let move = position_difference(
            coordinate_to_position(from),
            coordinate_to_position(to)
        );

        try {
            var position_content = diagram[piece_position["row"] -
            move["row"]][piece_position["column"] + move["column"]];
        } catch {
            return false;
        }

        if (reach !== top_reach ) {
            this["set reach"]( reach + 1);
        }

        if (Array.isArray(position_content)) {
            if (position_content.includes(reach)) {
                return true;
            }
        } else if (position_content === reach) {
            return true
        } else {
            return false;
        }
    }
}


// pure. (y1 - y2, x2 - x1)
function position_difference(origin, destination) {
    return {
        "row": origin["row"] - destination["row"],
        "column": destination["column"] - origin["column"]
    }
}

// pure
function mirror_row(row, total_rows) {
    return row * -1 + total_rows;
}

// pure
function position_to_coordinate(position) {
    return {
        "x": position["column"] * WIDTH,
        "y": position["row"] * HEIGHT
    };
}

// pure
function coordinate_to_position(coordinate) {
    return {
        "row": parseInt(coordinate["y"] / WIDTH),
        "column": parseInt(coordinate["x"] / HEIGHT)
    };
}

function center_piece_via_position(position, offset) {
    return {
        "x": offset["x"] + position["column"] * WIDTH,
        "y": offset["y"] + position["row"] * HEIGHT
    }
}

function center_piece_via_coordinate(coordinate, offset, bias) {
    let x_slip = coordinate["x"] % WIDTH;
    let y_slip = coordinate["y"] % HEIGHT;
    let new_coordinate = {};

    if (x_slip / WIDTH <= bias["x"]) {
        new_coordinate["x"] = coordinate["x"] - x_slip + offset["x"];
    } else {
        new_coordinate["x"] = coordinate["x"] - x_slip + WIDTH + offset["x"];
    }
    if (y_slip / HEIGHT <= bias["y"]) {
        new_coordinate["y"] = coordinate["y"] - y_slip + offset["y"];
    } else {
        new_coordinate["y"] = coordinate["y"] - y_slip + WIDTH + offset["y"];
    }

    return new_coordinate;
}

/* utility functions */

// pure
function clone(object) {
    return JSON.parse(
        JSON.stringify(object)
    );
}

function throwError(msg) {
    throw new Error(msg);
}

/* chessbus object */

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

        HEIGHT = this.config["tiles"]["height"];
        WIDTH = this.config["tiles"]["width"];

        let chessbus = document.querySelector("chess-bus");
        chessbus.addEventListener("mousemove", maestro["mouse move"]);
        chessbus.addEventListener("mouseup", maestro["mouse up"]);
        chessbus.addEventListener("mouseleave", maestro["mouse leave"]);

        // placing the tiles
        place_tiles({
            diagram: this.config["tiles"]["tiles configuration"],
            columns: this.config["tiles"]["number of columns"],
            svg: this.querySelector("svg")
        });

        // placing pieces
        for (let piece in this.config["pieces"]) {
            place_piece({
                name: piece,
                drawing: this.config["pieces"][piece]["drawing"],
                initial_position: this.config["pieces"][piece]["initial positions"],
                jump: this.config["pieces"][piece]["jump"],
                svg: this.querySelector("svg"),
                rows: this.config["tiles"]["number of rows"],
                offset: this.config["pieces"][piece]["offset"],
                bias: this.config["pieces"][piece]["bias"],
                empty_field: this.config["pieces"][piece]["movement"]["empty field"],
                top_reach: this.config["pieces"][piece]["movement"]["top reach"],
                piece_position: this.config["pieces"][piece]["movement"]["piece position"],
                transform: this.config["pieces"][piece]["transform"]
            });
        }
    }

}

customElements.define("chess-bus", chessBus);
