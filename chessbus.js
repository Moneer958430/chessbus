"use strict";

let WIDTH;
let HEIGHT;
let ROWS;
let COLUMNS;

let boardtop = {
    tiles: {
        tilesList: {}
    },
    pieces: {
        piecesList: {}
    }
}

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
                        this.setMap({
                            oldPos: crdToPos(orgCrd),
                            newPos: crdToPos(destination),
                            bag: new FuncsBag(
                                this,
                                {
                                    capture: this.capture,
                                    getTeam: this.getTeam,
                                    getReach: this.getReach
                                }
                            )
                        });
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
    capture: function () {
        this.getElem().remove();
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
    setMap: function ({ oldPos, newPos, bag }) {
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
        if (oldPos) {
            this.setStrip({frank: new Frank({
                group: "files", pos: oldPos, bi: "0"
            })});
            this.setStrip({frank: new Frank({
                group: "ranks", pos: oldPos, bi: "0"
            })});
            this.setStrip({diag: new Diag({
                sign: "+", pos: oldPos, bi: "0"
            })});
            this.setStrip({diag: new Diag({
                sign: "-", pos: oldPos, bi: "0"
            })});
        }
        this.setStrip({frank: new Frank({
            group: "files", pos: newPos, bi: "1"
        })});
        this.setStrip({frank: new Frank({
            group: "ranks", pos: newPos, bi: "1"
        })});
        this.setStrip({diag: new Diag({
            sign: "+", pos: newPos, bi: "1"
        })});
        this.setStrip({diag: new Diag({
            sign: "-", pos: newPos, bi: "1"
        })});

        context._map[newPos.row][newPos.column] = bag;
    },
    getStrip: function ({ group, num } = {}) {
        let context = ComPiece;
        if (group !== undefined) {
            return context.strips[group][num];
        }
        return context.strips;
    },
    setStrip: function ({ frank, diag }) {
        let str, context = ComPiece;
        if (!context.strips) {
            context.strips = {
                ranks: {},
                files: {},
                pDiags: {},
                nDiags: {}
            };
        }
        if (frank !== undefined) {
            if (str = context.strips[frank.group][frank.num]) {
                context.strips[frank.group][frank.num] = replaceChar(str, frank.i, frank.bi);
            } else {
                str = zeros(frank.mag);
                context.strips[frank.group][frank.num] = replaceChar(str, frank.i, frank.bi);
            }
        }
        if (diag !== undefined) { 
            if (str = context.strips[diag.group][diag.num]) {
                context.strips[diag.group][diag.num] = replaceChar(str, diag.i, diag.bi);
            } else {
                str = zeros(diag.mag);
                context.strips[diag.group][diag.num] = replaceChar(str, diag.i, diag.bi);
            }
        }
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
    this.column = column;
    this.row = row;
}

function Crd(x, y) {
    this.x = x;
    this.y = y;
}

function FuncsBag(obj, ...funcs) {
    funcs = funcs[0];
    for (let func in funcs) {
        this[func] = funcs[func].bind(obj);
    }
}

function Frank({group, pos, bi}) {
    this.group = group;
    this.bi = bi;
    this.mag = COLUMNS + 1;
    if (group === "files") {
        this.num = pos.row;
        this.i = pos.column;
    } else if (group === "ranks") {
        this.num = pos.column;
        this.i = pos.row;
    }
}

function Diag({sign, pos, bi}) {
    this.num = Diag.diagNum(pos, sign); 
    this.mag = Diag.diagMag(pos, sign);
    this.bi = bi;
    if (sign === "+") {
        this.group = "pDiags";
        this.i = pos.column;
    } else if (sign === "-") {
        this.group = "nDiags";
        this.i = COLUMNS - pos.column;
    }
}

Diag.diagNum = function (pos, sign) {
    if (sign === "+") { // x + y = z
        return pos.column + pos.row;
    } else if (sign === "-") { // -x + y + C = z
        return (pos.column * -1) + pos.row + COLUMNS;
    }
}; 

Diag.diagMag = function(pos, sign) {
    if (sign === "+") { // -| x + y - C | + C + 1 = z
        return (Math.abs(pos.column + pos.row - COLUMNS) * -1) + ROWS + 1;
    } else if (sign === "-") { // - | x - y | + C + 1 = z
        return (Math.abs(pos.column - pos.row) * -1) + ROWS + 1;
    }
};

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

// unpure
function placeTiles({ diagram, svg }) {

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

        if ((i + 1) % (COLUMNS + 1) !== 0) {
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
    emptyField, enemyField, specialFields, svg, rows, offset, bias,
    topReach, piecePos, transform }) {

    let g, piece, realPos,
        getId = setupIding(),
        checkMove = arbiter({
            emptyField: emptyField,
            enemyField: enemyField,
            piecePos: piecePos,
            topReach: topReach
        });

    InitialPos.forEach(
        (pos) => {
            g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.innerHTML = drawing;

            piece = boardtop.pieces.piecesList[name + " " + getId()]
                = Object.create(ComPiece);
            piece.setElem(g);
            piece.setTeam(team);
            realPos = new Pos(
                mirrorRow(pos.row, ROWS), pos.column
            );
            piece.setPos(realPos);
            piece.setMap({
                newPos: realPos,
                bag: new FuncsBag(
                    piece,
                    {
                        capture: piece.capture,
                        getTeam: piece.getTeam,
                        getReach: piece.getReach
                    }
                )
            });
            piece.setOffset(offset.x, offset.y);
            piece.setBias(bias.x, bias.y);
            // dynamically added property:
            piece.checkEmptyMove = checkMove;
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

// pure
function arbiter({ emptyField, enemyField, specialFields, piecePos, topReach }) {
    return function (from, to) {
        let emptyFieldEle,
            enemyFieldEle,
            sign,
            fromPos = crdToPos(from),
            toPos = crdToPos(to),
            reach = this.getReach(),
            des = this.getMap(toPos),
            move = posDiff(
                fromPos,
                toPos
            );
        
        let walk = () => {
            let strip;
            if (move.column === 0) {
                strip = this.getStrip({ group: "ranks", num: fromPos.column });
                if (move.row > 0
                    && parseInt(strip.substr(toPos.row + 1, move.row - 1))
                    > 0) {
                    return false;
                } else if (move.row < 0
                    && parseInt(strip.substr(fromPos.row + 1, Math.abs(move.row) - 1))
                    > 0) {
                    return false;
                }
            } else if (move.row === 0) {
                strip = this.getStrip({ group: "files", num: fromPos.row });
                if (move.column < 0
                    && parseInt(strip.substr(toPos.column + 1, Math.abs(move.column) - 1))
                    > 0) {
                    return false;
                } else if (move.column > 0 
                    && parseInt(strip.substr(fromPos.column + 1, move.column - 1))
                    > 0) {
                    return false;
                }
            } else if ((sign = (sign = move.column / move.row) > 0 ? "+" : false) ) {
                strip = this.getStrip({ 
                    group: "pDiags",
                    num: Diag.diagNum(fromPos, sign) 
                });
                // if (move.column > 0 
                //     && parseInt(strip.substr(fromPos.column + 1, move.column - 1)) 
                //     > 0) {
                //     return false;
                // } else if (move.column < 0 
                //     && parseInt(strip.substr(toPos.column + 1, Math.abs(move.column) - 1)) 
                //     > 0) {
                //     return false;
                // }
            } else if ((sign = (sign = move.column / move.row) < 0 ? "-" : false)) {
                strip = this.getStrip({ 
                    group: "nDiags",
                    num: Diag.diagNum(fromPos, sign) 
                });
                if (move.column > 0) {
    
                    //return false;
                } else if (move.column < 0 
                    ) {
                    //return false;
                }
            }
            return true;
        }
        if (((emptyFieldEle = emptyField[piecePos.row -
            move.row] === undefined ? false : emptyField[piecePos.row -
            move.row][piecePos.column + move.column])
            && ((Array.isArray(emptyFieldEle)
                && emptyFieldEle.includes(reach))
                || emptyFieldEle === reach)
            && des === undefined)) {
            if (!Array.isArray(emptyFieldEle)
                || (Array.isArray(emptyFieldEle)
                    && !emptyFieldEle.includes("j"))) {
                if (walk() === false) {
                    return false;
                }
            }
            
            if (reach !== topReach) {
                this.setReach(reach + 1);
            }
            return true;
            
        } else if ((enemyFieldEle = enemyField[piecePos.row -
            move.row] === undefined ? false : enemyField[piecePos.row -
            move.row][piecePos.column + move.column])
            && ((Array.isArray(enemyFieldEle)
                && enemyFieldEle.includes(reach))
                || enemyFieldEle === reach)
            && des !== undefined
            && des.getTeam() !== this.getTeam()) {

            if (!Array.isArray(enemyFieldEle)
            || (Array.isArray(enemyFieldEle)
                && !enemyFieldEle.includes("j"))) {
                if (walk() === false) {
                    return false;
                }
            }

            des.capture();

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

// pure
function centerPieceViaPos(pos, offset) {
    return new Crd(
        offset.x + pos.column * WIDTH,
        offset.y + pos.row * HEIGHT
    );
}

// pure
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

// pure
function slope(from, to) { 
    return (to.x - from.x) === 0 ? undefined : 
        ((to.y * -1) - (from.y * -1)) / (to.x - from.x);
}

// pure
function clone(ob) {
    return JSON.parse(
        JSON.stringify(ob)
    );
}

// pure
function zeros(num) {
    let str = "";
    while (num > 0) {
        str += "0"
        num -= 1;
    }
    return str;
}

// pure
function replaceChar(str, i, value) {
    return str.substr(0, i) + value + str.substr(i + value.length);
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
        ROWS = this.config["tiles"]["number of rows"];
        COLUMNS = this.config["tiles"]["number of columns"];

        let chessbus = document.querySelector("chess-bus");
        chessbus.addEventListener("mousedown", maestro.mouseDown);
        chessbus.addEventListener("mousemove", maestro.mouseMove);
        chessbus.addEventListener("mouseup", maestro.mouseUp);
        chessbus.addEventListener("mouseleave", maestro.mouseLeave);

        // placing the tiles
        placeTiles({
            diagram: this.config["tiles"]["tiles configuration"],
            svg: this.querySelector("svg")
        });

        // placing pieces
        for (let piece in this.config["pieces"]) {
            placePiece({
                name: piece,
                team: this.config["pieces"][piece]["team"],
                drawing: this.config["pieces"][piece]["drawing"],
                InitialPos: this.config["pieces"][piece]["initial positions"],
                svg: this.querySelector("svg"),
                offset: this.config["pieces"][piece]["offset"],
                bias: this.config["pieces"][piece]["bias"],
                emptyField: this.config["pieces"][piece]["movement"]["empty field"],
                enemyField: this.config["pieces"][piece]["movement"]["enemy field"],
                specialFields: this.config["pieces"][piece]["movement"]["special fields"],
                topReach: this.config["pieces"][piece]["movement"]["top reach"],
                piecePos: this.config["pieces"][piece]["movement"]["piece position"],
                transform: this.config["pieces"][piece]["transform"]
            });
        }
    }

}

customElements.define("chess-bus", chessBus);
