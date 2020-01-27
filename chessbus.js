"use strict";

let WIDTH;
let HEIGHT;

let boardtop = {
    tiles: {
        tilesList: {}
    },
    pieces: {
        piecesList: {}
    }
}

// start of objects used as models

let Com = {
    getElem: function () {
        return this._element;
    },
    setElem: function (value) {
        this._element = value;
    },
    getPos: function () {
        return new Pos(
            this.getElem().getAttribute("row"),
            this.getElem().getAttribute("column")
        );
    },
    setPos: function (value) {
        this.getElem().setAttribute("row", value.row);
        this.getElem().setAttribute("column", value.column);
    },
    getCrd: function () {
        return new Crd(
            this.getElem().getAttribute("x"),
            this.getElem().getAttribute("y")
        );
    },
    setCrd: function (value) {
        this.getElem().setAttribute("x", value.x);
        this.getElem().setAttribute("y", value.y);
    },
    getFill: function () {
        return this.getElem().getAttribute("fill");
    },
    setFill: function (value) {
        this.getElem().setAttribute("fill", value);
    }
}

let ComPiece = {
    getTransform: function () {
        let context = this;
        let transform = this.getElem().getAttribute("transform");
        return {
            toString: function () {
                return transform;
            },
            getTranslate: function () {
                let translate = /translate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                return translate !== null ? translate[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            setTranslate: function (value) {
                let translate = /translate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                context.getElem().setAttribute("transform",
                    transform.replace(translate, `translate(${value.toString()})`)
                );
            },
            getMatrix: function () {
                let matrix = /matrix\([\d|\s|\.|\-|,]*\)/.exec(transform);
                return matrix !== null ? matrix[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            setMatrix: function (value) {
                let matrix = /matrix\([\d|\s|\.|\-|,]*\)/.exec(transform);
                context.getElem().setAttribute("transform",
                    transform.replace(matrix, `matrix(${value.toString()})`)
                );
            },
            getRotate: function () {
                let rotate = /rotate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                return rotate !== null ? rotate[0].split(/[\(|\)]/)[1]
                    .split(/[\s|,]+/).map(function (e) { return parseFloat(e); })
                    : undefined;
            },
            setRotate: function (value) {
                let rotate = /rotate\([\d|\s|\.|\-|,]*\)/.exec(transform);
                context.getElem().setAttribute("transform",
                    transform.replace(rotate, `rotate(${value.toString()})`)
                );
            }
        }
    },
    setTransform: function (funcs) {
        let transform = "";
        for (let func in funcs) {
            transform += `${func}(${funcs[func].toString()}) `;
        }
        this.getElem().setAttribute("transform", transform);
    },
    getOffset: function () {
        return this._offset
    },
    setOffset: function (x, y) {
        this._offset = {};
        this._offset.x = x;
        this._offset.y = y;
    },
    getBias: function () {
        return this._bias
    },
    setBias: function (x, y) {
        this._bias = {};
        this._bias.x = x;
        this._bias.y = y;
    },
    getJump: function () {
        return _jump;
    },
    setJump: function (value) {
        this._jump = value;
    },
    startMoving: function (event) {
        let transform = this.getTransform();
        let orgCrd = new Crd(
            transform.getTranslate()[0],
            transform.getTranslate()[1]
        ); 
        
        let destination;

        return (mouse, event) => {
            switch (mouse) {
                case "mousemove":
                    transform = this.getTransform();
                    transform.setTranslate(
                        [
                            transform.getTranslate()[0] + event.movementX,
                            transform.getTranslate()[1] + event.movementY
                        ]
                    );
                    break;
                case "mouseup":
                    destination = centerPieceViaCrd(
                        new Crd(
                            transform.getTranslate()[0],
                            transform.getTranslate()[1]
                        ),
                        this.getOffset(), this.getBias()
                    );
                    if (this.checkEmptyMove(
                        orgCrd,
                        destination)) {
                        transform.setTranslate(
                            [destination.x, destination.y]
                        );
                        this.setMap(
                            crdToPos(orgCrd),
                            crdToPos(destination),
                            this.capture.bind(this)
                        );
                        break;
                    }
                case "mouseleave":
                default:
                    destination = centerPieceViaCrd(
                        orgCrd,
                        this.getOffset(), this.getBias()
                    );
                    transform.setTranslate(
                        [destination.x, destination.y]
                    );
            }
        }
    },
    capture: function (capturer) {
        if (capturer === this.getTeam()) {
            return false;
        }
        return true;
    },
    getReach: function () {
        return this._reach;
    },
    setReach: function (value) {
        this._reach = value;
    },
    mouseDown: function (event) {
        if (event.which === 1) {
            maestro.pieceToMove.set = true;
            maestro.pieceToMove.move =
                this.startMoving();
        }
    },
    getTeam: function () {
        return this._team;
    }, 
    setTeam: function (value) {
        this._team = value;
    },
    getMap: function (pos) {
        let context = ComPiece;
        if (pos) {
            if (context._map[pos.row] === undefined) {
                return undefined;
            }
            return context._map[pos.row][pos.column];
        }
        return context._map;
    },
    setMap: function (oldPos, newPos, value) {
        let context = ComPiece;
        if (!context._map) {
            context._map = {};
        }
        if (context._map[newPos.row] === undefined) {
            context._map[newPos.row] = {};
        }
        if (oldPos) {
            delete context._map[oldPos.row][oldPos.column];    
        }
        context._map[newPos.row][newPos.column] = value;
    }
}

Object.setPrototypeOf(ComPiece, Com);

let ComTile = {
    getWidth: function () {
        return this.getElem().getAttribute("width");
    },
    setWidth: function (value) {
        this.getElem().setAttribute("width", value);
    },
    getHeight: function () {
        return this.getElem().getAttribute("height");
    },
    setHeight: function (value) {
        this.getElem().setAttribute("height", value);
    },
    mouseDown: function (event) {
        if (event.which === 3) {
            this._mousedown = true;
        }
    },
    mouseUp: function (event) {
        if (event.which === 3) {
            if (this._mousedown === true) {
                this["highlight"]();
                this._mousedown = false;
            }
        }
    },
    highlight: function () {
        let orgFill = this.getFill();
        this.setFill("#ffff00");
        maestro.highlightsList.push(() => {
            this.setFill(orgFill);
        });
    }
}

Object.setPrototypeOf(ComTile, Com);

function Pos(row, column) {
    this.row = row;
    this.column = column;
}

function Crd(x, y) {
    this.x = x;
    this.y = y;
}

// end of objects used as models.

let maestro = {
    highlightsList: [],
    clearHighlights: function () {
        if (maestro.highlightsList.length !== 0) {
            for (let i = 0; i < maestro.highlightsList.length; i += 1) {
                maestro.highlightsList[i]();
            }
        }
    },
    pieceToMove: { set: false },
    mouseDown: function (event) {
        if (event.which === 1) {
            maestro.clearHighlights();
        }
    },
    mouseMove: function (event) {
        if (event.which === 1) {
            if (maestro.pieceToMove.set === true) {
                maestro.pieceToMove.move("mousemove", event);
            }
        }
    },
    mouseUp: function (event) {
        if (event.which === 1) {
            if (maestro.pieceToMove.set === true) {
                maestro.pieceToMove.set = false;
                maestro.pieceToMove.move("mouseup", event);
            }
        }
    },
    mouseLeave: function () {
        if (event.which === 1) {
            if (maestro.pieceToMove.set === true) {
                maestro.pieceToMove.set = false;
                maestro.pieceToMove.move("mouseleave", event);
            }
        }
    }
}



/* chessbus specific functions */

// unpure
function placeTiles({ diagram, columns, svg }) {

    let r = 0, c = 0, x = 0, y = 0, tile, rect, getId
        = setupIding(false, diagram.length);

    for (let i = 0; i < diagram.length; i += 1) {
        rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svg.appendChild(rect);

        tile = boardtop.tiles.tilesList["tile" + " " + getId()]
            = Object.create(ComTile);

        tile.setElem(rect);
        tile.setPos(new Pos(r, c));
        tile.setCrd(new Crd(x, y));
        tile.setWidth(WIDTH);
        tile.setHeight(HEIGHT);
        tile.setFill(diagram[i]);
        tile.getElem().addEventListener("mousedown",
            tile.mouseDown.bind(tile)
        );
        tile.getElem().addEventListener("mouseup",
            tile.mouseUp.bind(tile)
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
function placePiece({ name, team, drawing, InitialPos,
    emptyField, enemyField, jump, svg, rows, offset, bias,
    topReach, piecePos, transform }) {

    let g, piece, realPos, getId = setupIding(), checkEmptyMove =
        arbiter(emptyField, piecePos, topReach);

    InitialPos.forEach(
        (pos) => {
            g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.innerHTML = drawing;

            piece = boardtop.pieces.piecesList[name + " " + getId()]
                = Object.create(ComPiece);
            piece.setElem(g);
            piece.setTeam(team);
            realPos = new Pos(
                mirrorRow(pos.row, rows), pos.column
            ); 
            piece.setPos(realPos);
            piece.setMap(undefined, realPos, piece.capture.bind(piece));
            piece.setOffset(offset.x, offset.y);
            piece.setBias(bias.x, bias.y);
            piece.setJump = jump;
            // dynamically added property:
            piece.checkEmptyMove = checkEmptyMove;
            piece.setReach(2);
            piece.getElem().addEventListener("mousedown",
                piece.mouseDown.bind(piece)
            );

            placeOnTile(piece, svg, offset, transform);
        }
    );
}

// unpure
function placeOnTile(piece, svg, offset, transform) {
    let tiles = boardtop["tiles"].tilesList;

    for (let tile in tiles) {

        if (tiles[tile].getPos().row
            == piece.getPos().row
            && tiles[tile].getPos().column
            == piece.getPos().column) {

            piece.setCrd(tiles[tile].getCrd());
            let crd = centerPieceViaPos(
                piece.getPos(), offset
            );

            let tran = {
                translate: [crd.x, crd.y]
            };

            for (let t in transform) {
                if (transform[t] !== undefined) {
                    tran[t] = transform[t];
                }
            }

            piece.setTransform(tran);

            svg.appendChild(piece.getElem());
        }
    }
}

// pure
function setupIding(assending = true, startat = 0) {
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

function arbiter(diagram, piecePos, topReach) {
    return function (from, to) {
        let emptyFieldEle,
            capture,
            fromPos = crdToPos(from),
            toPos = crdToPos(to),
            reach = this.getReach(),
            move = posDiff(
                fromPos,
                toPos
            );
        if ((emptyFieldEle = diagram[piecePos.row -
            move.row] === undefined ? false : diagram[piecePos.row -
            move.row][piecePos.column + move.column])
            && ((Array.isArray(emptyFieldEle)
                && emptyFieldEle.includes(reach))
                || emptyFieldEle === reach)) {

            if ((capture = this.getMap(toPos)) !== undefined
                && !capture(this.getTeam())) {
                return false;
            }

            if (reach !== topReach) {
                this.setReach(reach + 1);
            }

            return true;
        } else {
            return false;
        }
    }
}

// pure. (y1 - y2, x2 - x1)
function posDiff(origin, destination) {
    return new Pos(
        origin.row - destination.row,
        destination.column - origin.column
    );
}

// pure
function mirrorRow(row, totalRows) {
    return row * -1 + totalRows;
}

// pure
function posToCrd(pos) {
    return new Crd(
        pos.column * WIDTH,
        pos.row * HEIGHT
    );
}

// pure
function crdToPos(crd) {
    return new Pos(
        parseInt(crd.y / WIDTH),
        parseInt(crd.x / HEIGHT)
    );
}

function centerPieceViaPos(pos, offset) {
    return new Crd(
        offset.x + pos.column * WIDTH,
        offset.y + pos.row * HEIGHT
    );
}

function centerPieceViaCrd(crd, offset, bias) {
    let xSlip = crd.x % WIDTH;
    let ySlip = crd.y % HEIGHT;
    let newCrd = {};

    if (xSlip / WIDTH <= bias.x) {
        newCrd.x = crd.x - xSlip + offset.x;
    } else {
        newCrd.x = crd.x - xSlip + WIDTH + offset.x;
    }
    if (ySlip / HEIGHT <= bias.y) {
        newCrd.y = crd.y - ySlip + offset.y;
    } else {
        newCrd.y = crd.y - ySlip + WIDTH + offset.y;
    }

    return newCrd;
}

/* utility functions */

// pure
function clone(object) {
    return JSON.parse(
        JSON.stringify(object)
    );
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
        chessbus.addEventListener("mousedown", maestro.mouseDown);
        chessbus.addEventListener("mousemove", maestro.mouseMove);
        chessbus.addEventListener("mouseup", maestro.mouseUp);
        chessbus.addEventListener("mouseleave", maestro.mouseLeave);

        // placing the tiles
        placeTiles({
            diagram: this.config["tiles"]["tiles configuration"],
            columns: this.config["tiles"]["number of columns"],
            svg: this.querySelector("svg")
        });

        // placing pieces
        for (let piece in this.config["pieces"]) {
            placePiece({
                name: piece,
                team: this.config["pieces"][piece]["team"],
                drawing: this.config["pieces"][piece]["drawing"],
                InitialPos: this.config["pieces"][piece]["initial positions"],
                jump: this.config["pieces"][piece]["jump"],
                svg: this.querySelector("svg"),
                rows: this.config["tiles"]["number of rows"],
                offset: this.config["pieces"][piece]["offset"],
                bias: this.config["pieces"][piece]["bias"],
                emptyField: this.config["pieces"][piece]["movement"]["empty field"],
                topReach: this.config["pieces"][piece]["movement"]["top reach"],
                piecePos: this.config["pieces"][piece]["movement"]["piece position"],
                transform: this.config["pieces"][piece]["transform"]
            });
        }
    }

}

customElements.define("chess-bus", chessBus);
