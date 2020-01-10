var config = {
    "board": {
        "width number of squares": 8,
        "height number of squares": 8,
        "tiles config via attributes": [
            "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo",
            "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone",
            "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo",
            "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone",
            "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo",
            "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone",
            "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo",
            "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone", "tiletwo", "tileone"
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

var boardtop = {
    tiles: {},
    pieces: {}
}

var common_piece_behavior = {
    "get position": function() {
        return this._position;
    },
    "set position": function(value) {
        this._position = value;
    },
    "get movement in an empty field": function() {
        return this._empty_diagram
    },
    "set movement in an empty field": function(value) {
        this._empty_diagram = value;
    },
    "get movement in an enemy field": function() {
        return this._enemy_diagram;
    },
    "get movement in an enemy field": function() {
        return this._enemy_diagram;
    },
    "set movement in an enemy field": function(value) {
        this._enemy_diagram = value;
    },
    move: function () {

    },
    capture: function () {

    }
}

/* chessbus specific functions */

// unpure
function place_tiles() {

}

// unpure
function place_pieces() {
    var get_id = setup_iding();

    for (piece in config.pieces) {

        var temp = Object.create(common_piece_behavior);
        boardtop.pieces[piece + " group"] = {};

        for (var i = 0; i < config.pieces[piece]["initial positions"].length; i++) {
            temp["set movement in an empty field"](
                config.pieces[piece]["movement"]["movement in an empty field"]
            ); 
            temp["set movement in an enemy field"](
                config.pieces[piece]["movement"]["movement in an enemy field"]
            );
            var id = get_id();
            boardtop.pieces[piece + " group"][piece + " " + id] = Object.create(temp);
            boardtop.pieces[piece + " group"][piece + " " + id]["set position"](
                config.pieces[piece]["initial positions"][i]
            );
        }
    }
}


// pure
function setup_iding() {
    id_counter = 0;
    return function () {
        return id_counter++;
    }
}

// pure
function normalizing() {

}

/* utility functions */

// pure
function clone_object(object) {
    return JSON.parse(
        JSON.stringify(object)
    );
}


/* chessbus object */

class chessBuss extends HTMLElement {
    connectedCallback() {

    }
}

customElements.define("chess-bus", chessBuss);
