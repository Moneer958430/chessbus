"use strict";

let boardtop = {
    "tiles": {},
    "pieces": {}
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
    "get fill": function () {
        return this["get element"]().getAttribute("fill");
    },
    "set fill": function (value) {
        this["get element"]().setAttribute("fill", value);
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
                let translate = /translate\([\d|\s|\.|-|,]*\)/.exec(transform);
                return translate !== null ? translate[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set translate": function (value) {
                let translate = /translate\([\d|\s|\.|-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(translate, `translate(${value.toString()})`)
                );
            },
            "get matrix": function () {
                let matrix = /matrix\([\d|\s|\.|-|,]*\)/.exec(transform);
                return matrix !== null ? matrix[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set matrix": function (value) {
                let matrix = /matrix\([\d|\s|\.|-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(matrix, `matrix(${value.toString()})`)
                );
            },
            "get scale": function () {
                let scale = /scale\([\d|\s|\.|-|,]*\)/.exec(transform);
                return scale !== null ? scale[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set scale": function (value) {
                let scale = /scale\([\d|\s|\.|-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(scale, `scale(${value.toString()})`)
                );
            },
            "get rotate": function () {
                let rotate = /rotate\([\d|\s|\.|-|,]*\)/.exec(transform);
                return rotate !== null ? rotate[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set rotate": function (value) {
                let rotate = /rotate\([\d|\s|\.|-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(rotate, `rotate(${value.toString()})`)
                );
            },
            "get skewX": function () {
                let skewX = /skewX\([\d|\s|\.|-|,]*\)/.exec(transform);
                return skewX !== null ? skewX[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set skewX": function (value) {
                let skewX = /skewX\([\d|\s|\.|-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(skewX, `skewX(${value.toString()})`)
                );
            },
            "get skewY": function () {
                let skewY = /skewY\([\d|\s|\.|-|,]*\)/.exec(transform);
                return skewY !== null ? skewY[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            "set skewY": function (value) {
                let skewY = /skewY\([\d|\s|\.|-|,]*\)/.exec(transform);
                context["get element"]().setAttribute("transform",
                    transform.replace(skewY, `skewY(${value.toString()})`)
                );
            },
        }
    },
    "set transform": function (funcs) {
        let transform = "";
        for (let func in funcs) {
            transform += `${func}(${funcs[func].toString()}) `;
        }
        this["get element"]().setAttribute("transform", transform);
    },
    "get d": function () {
        return this["get element"]().getAttribute("d");
    },
    "set d": function (value) {
        this["get element"]().setAttribute("d", value);
    },
    "get stroke-linecap": function () {
        return this["get element"]().getAttribute("stroke-linecap");
    },
    "set stroke-linecap": function (value) {
        this["get element"]().setAttribute("stroke-linecap", value);
    },
    "get stroke-linejoin": function () {
        return this["get element"]().getAttribute("stroke-linejoin");
    },
    "set stroke-linejoin": function (value) {
        this["get element"]().setAttribute("stroke-linejoin", value);
    },
    "get stroke-width": function () {
        return this["get element"]().getAttribute("stroke-width");
    },
    "set stroke-width": function (value) {
        this["get element"]().setAttribute("stroke-width", value);
    },
    "get stroke": function () {
        return this["get element"]().getAttribute("stroke");
    },
    "set stroke": function (value) {
        this["get element"]().setAttribute("stroke", value);
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

    },
    "mouse down": function (event) {
        if (event.which === 1) {
            maestro["piece to move"]["get transform"] = this["get transform"].bind(this);
            maestro["piece to move"]["set"] = true;
        }
    }
}

Object.setPrototypeOf(common_piece_behavior, common_behavior);

let common_tile_behavior = {
    // object data properties:
    // bool _mousedown
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
                let transform = maestro["piece to move"]["get transform"]();
                transform["set translate"](
                    [
                        transform["get translate"]()[0] + event.movementX,
                        transform["get translate"]()[1] + event.movementY
                    ]
                );
            }
        }
    },
    "mouse up": function (event) {
        if (event.which === 1) {
            if (maestro["piece to move"]["set"] === true) {
                maestro["piece to move"]["set"] = false;
                let transform = maestro["piece to move"]["get transform"]();
                let coordinate = center_piece_via_coordinate({
                    "x": transform["get translate"]()[0],
                    "y": transform["get translate"]()[1]
                });
                transform["set translate"](
                    [coordinate["x"], coordinate["y"]]
                );
            }
        }
    }
}

/* chessbus specific functions */

// unpure
function place_tiles({ diagram, rows, columns, svg, width = 75, height = 75 }) {
    let r = 0;
    let c = 0;
    let x = 0;
    let y = 0;
    let temp_tile;
    let rect;
    let get_id = setup_iding(false, diagram.length);
    for (let i = 0; i < diagram.length; i += 1) {

        temp_tile = Object.create(common_tile_behavior);
        rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        temp_tile["set element"](rect);
        temp_tile["set position"]({ "row": r, "column": c });
        temp_tile["set coordinate"]({ "x": x, "y": y });
        temp_tile["set width"](width);
        temp_tile["set height"](height);
        temp_tile["set fill"](diagram[i]);

        temp_tile["get element"]().addEventListener("mousedown",
            temp_tile["mouse down"].bind(temp_tile)
        );
        temp_tile["get element"]().addEventListener("mouseup",
            temp_tile["mouse up"].bind(temp_tile)
        );

        svg.appendChild(temp_tile["get element"]());

        boardtop.tiles["tile" + " " + get_id()] = temp_tile;

        if ((i + 1) % (columns + 1) !== 0) {
            c += 1;
            x += 75;
        } else {
            c = 0;
            x = 0;
            r += 1;
            y += 75;
        }
    }
}

// unpure
function place_piece_on_tile(piece, svg, transform) {
    for (let tile in boardtop.tiles) {
        if (boardtop.tiles[tile]["get position"]()["row"] == piece["get position"]()["row"] &&
            boardtop.tiles[tile]["get position"]()["column"] == piece["get position"]()["column"]) {
            piece["set coordinate"](boardtop.tiles[tile]["get coordinate"]());
            let coordinate = center_piece_via_position(piece["get position"]());
            piece["set transform"]({
                "translate": [coordinate["x"], coordinate["y"]],
                "matrix": transform["matrix"]
            });

            svg.appendChild(piece["get element"]());
        }
    }
}

// unpure
function place_pieces({ name, properties, initial_position,
    empty_field, enemy_field, jump, svg, rows, width = 75, height = 75 }) {

    let get_id = setup_iding();
    let path;
    initial_position.forEach(
        (position) => {
            let temp_piece = Object.create(common_piece_behavior);
            path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            temp_piece["set element"](path);
            temp_piece["set d"](properties["d"]);
            temp_piece["set stroke-linecap"](properties["stroke-linecap"]);
            temp_piece["set stroke-linejoin"](properties["stroke-linejoin"]);
            temp_piece["set stroke-width"](properties["stroke-width"]);
            temp_piece["set fill"](properties["fill"]);
            temp_piece["set stroke"](properties["stroke"]);
            temp_piece["set width"](width);
            temp_piece["set height"](height);
            temp_piece["set position"]({ "row": mirror_row(position["row"], rows), "column": position["column"] });

            temp_piece["get element"]().addEventListener("mousedown",
                temp_piece["mouse down"].bind(temp_piece)
            );

            place_piece_on_tile(temp_piece, svg, properties["transform"]);

            boardtop.pieces[name + " " + get_id()] = temp_piece;
        }
    );
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

// pure
function mirror_row(row, total_rows) {
    return row * -1 + total_rows;
}

// pure
function position_to_coordinate(position, multiplier) {
    return {
        "x": position["column"] * multiplier,
        "y": position["row"] * multiplier
    };
}

// pure
function coordinate_to_position(coordinate, divisor) {
    return {
        "row": coordinate["y"] / divisor,
        "column": coordinate["x"] / divisor
    };
}

// pure.
function set_coordinate_to_origin(coordinate) {
    return {
        "x": set_to_origin(coordinate.x),
        "y": set_to_origin(coordinate.y)
    }
}

// pure. Has issues with hard coding. Don't forget to fix. Has been isolated
function set_to_origin(number) {
    return parseInt(number / 75) * 75;
}

// pure
function center_piece_via_coordinate(coordinate) {
    return center_piece_via_position(
        coordinate_to_position(
            set_coordinate_to_origin(coordinate),
            75
        )
    );
}

// pure. Has issues with hard coding. Don't forget to fix. Has been isolated.
function center_piece_via_position(position) {
    return {
        "x": 20 + position["column"] * 75,
        "y": 10 + position["row"] * 75
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
    "number of rows": 7,
    "number of columns": 7,
    "tiles": {
        "tiles configuration": [
            "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000",
            "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0",
            "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000",
            "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0",
            "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000",
            "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0",
            "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000",
            "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0", "#000000", "#f0f0f0"
        ]
    },
    "pieces": {
        "pawn": {
            "properties": {
                "transform": {
                    "matrix": [0.0946349, 0, 0, 0.0946349, 15.8365, 0.83333]
                },
                "d": `M -163.2096622851282 574.0452144019284 C -182.23511758800083 
                    576.940207322642 -209.56906999149857 558.868616650869 -185.48293754452283 
                    542.4452969616261 C -165.10000376732881 531.7650342200843 -184.65928202843486 
                    503.9535699083702 -163.10497335971888 490.444623269631 C -141.18787590623674 
                    460.523151855065 -117.85434453687483 429.9367427537123 -106.93213808155832 
                    394.0368273197118 C -108.45614077390965 376.83790396889844 -142.52131939716395 
                    348.368149173793 -108.00981819606599 342.78982332930957 C -79.55290500098047 
                    346.09799337224393 -89.96088597510393 303.4937484406725 -80.12545199425276 
                    285.03379445771844 C -74.21128842400128 257.0142020418731 -69.91226849292812 
                    228.52743982445634 -70.97344832870778 199.82881837511692 C -90.79124303139983 
                    199.2754160521141 -111.0146801516467 201.58282879476462 -130.4434776136785 
                    196.87097587461625 C -142.83658158326682 180.60376584767496 -102.44366379758173 
                    172.5042300156394 -95.77849302954968 157.8209380729619 C -81.79362836242731 
                    136.71702724302685 -116.25097387373742 113.39979691741382 -101.50090198850211 
                    88.45240788010274 C -92.07947829433019 50.68732702035819 -48.49398297816097 
                    26.203177421847922 -11.614392927125095 40.036931413418394 C 26.575312010006314 
                    49.94057620622311 54.805459574274494 95.05347932166015 36.654102461757134 
                    132.57898917510903 C 35.2049577847547 139.8185181634966 23.8632168001551 
                    149.2053111958376 27.651108448347486 154.97062812439117 C 44.18737625849906 
                    166.44658103585635 63.33385775507156 176.4476336211959 73.8107378074402 
                    194.16753833022273 C 58.97702345550243 204.92307566934264 34.156184854494995 
                    196.73205475733434 15.648251466106785 201.84123656272564 C -1.189730551565276 
                    216.77648830494795 15.442622855350407 247.3140667241374 16.305111080102336 
                    267.80496774776134 C 21.557832631837755 291.2170701479927 26.195081108428894 
                    314.8355980988971 32.214585645839634 338.0344285100809 C 44.86885044855535 
                    342.9704751185886 70.86035756252232 348.6861644250623 56.6025771985025 
                    369.19128358128944 C 36.2766789621586 385.69214190196425 46.226238361522576 
                    411.97494866772325 57.69349738298837 430.4916302829233 C 71.96589434956974 
                    459.0871566866866 96.46585596051636 480.9318050568405 111.47507821681683 
                    508.8668312801711 C 117.04887599359216 521.7638005120364 97.1233857285327 
                    544.605239595162 121.95679424549763 539.2639128145162 C 148.8789460593576 
                    544.9827536561147 132.7686969714469 582.312451749598 108.57635416831198 
                    573.4926633556547 C 19.438497709507374 576.6313025436011 -69.88243758286768 
                    577.9053740107408 -159.02241317735965 574.4336501621929 L -163.20969850966986 
                    574.0451781773868 L -163.20969850966986 574.0451781773868 L -163.2096622851282 
                    574.0452144019284 z`,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "3",
                "stroke": "#000000",
                "fill": "#007fff"
            },
            "initial positions": [
                { "row": 1, "column": 0 }, { "row": 1, "column": 1 }, { "row": 1, "column": 2 },
                { "row": 1, "column": 3 }, { "row": 1, "column": 4 }, { "row": 1, "column": 5 },
                { "row": 1, "column": 6 }, { "row": 1, "column": 7 },
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

    constructor() {
        super();
        let chessbus = document.querySelector("chess-bus");
        chessbus.addEventListener("mousemove",
            maestro["mouse move"]
        );

        chessbus.addEventListener("mouseup",
            maestro["mouse up"]
        );
    }

    connectedCallback() {
        this.config = configuration;

        this.innerHTML = "<svg></svg>";

        // placing the tiles
        place_tiles({
            diagram: this.config["tiles"]["tiles configuration"],
            rows: this.config["number of rows"],
            columns: this.config["number of columns"],
            svg: this.querySelector("svg")
        });

        // placing pieces
        for (let piece in this.config["pieces"]) {
            place_pieces({
                name: piece,
                properties: this.config["pieces"][piece]["properties"],
                initial_position: this.config["pieces"][piece]["initial positions"],
                empty_field: this.config["pieces"][piece]["movement"]["movement in an empty field"],
                enemy_field: this.config["pieces"][piece]["movement"]["movement in an enemy field"],
                jump: this.config["pieces"][piece]["can jump"],
                svg: this.querySelector("svg"),
                rows: this.config["number of rows"]
            });
        }
    }

}

customElements.define("chess-bus", chessBus);
