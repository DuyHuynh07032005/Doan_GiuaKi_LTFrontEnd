
const BOARD_ROWS = 20;
const BOARD_COLS = 10;
const MINI_GRID_SIZE = 4;

const TETROMINOES = {
    I: {
        name: 'I',
        colorClass: 'cell-i',
        shapes: [
            [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
            [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
        ]
    },
    J: {
        name: 'J',
        colorClass: 'cell-j',
        shapes: [
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
            [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
        ]
    },
    L: {
        name: 'L',
        colorClass: 'cell-l',
        shapes: [
            [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
            [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
            [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
        ]
    },
    O: {
        name: 'O',
        colorClass: 'cell-o',
        shapes: [[[1, 1], [1, 1]]]
    },
    S: {
        name: 'S',
        colorClass: 'cell-s',
        shapes: [
            [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
            [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
        ]
    },
    T: {
        name: 'T',
        colorClass: 'cell-t',
        shapes: [
            [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
            [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
        ]
    },
    Z: {
        name: 'Z',
        colorClass: 'cell-z',
        shapes: [
            [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
            [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
            [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
        ]
    },

    PLUS: {
        name: 'PLUS',
        colorClass: 'cell-plus',
        special: true,
        shapes: [
            [[0, 1, 0], [1, 1, 1], [0, 1, 0]]
        ]
    },

    U: {
        name: 'U',
        colorClass: 'cell-u',
        special: true,
        shapes: [
            [[1, 0, 1], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [1, 0, 1]],
            [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
        ]
    },

    X: {
        name: 'X',
        colorClass: 'cell-x',
        special: false,
        shapes: [
            [
                [1, 0, 1],
                [0, 1, 0],
                [1, 0, 1]
            ]
        ]
    },

    W: {
        name: 'W',
        colorClass: 'cell-w',
        special: false,
        shapes: [
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [1, 1, 0]
            ]
        ]
    },

    V: {
        name: 'V',
        colorClass: 'cell-v',
        special: false,
        shapes: [
            [
                [1, 0, 1],
                [1, 0, 1],
                [1, 1, 1]
            ]
        ]
    },
    BOMB: { name: 'BOMB', colorClass: 'cell-bomb', special: true,
        shapes: [[[1,1],[1,1]]] },
    LASER: { name: 'LASER', colorClass: 'cell-laser', special: true,
        shapes: [[[1,1,1]]] },
};

const LEVEL_CONFIG = {
    1: {
        name: 'Level 1',
        label: 'LEVEL 1',
        dropInterval: 800,
        targetLines: 1,
        themeClass: 'theme-level-1',
        piecePool: ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
    },
    2: {
        name: 'Level 2',
        label: 'LEVEL 2',
        dropInterval: 450,
        targetLines: 1,
        themeClass: 'theme-level-2',
        piecePool: ['I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z', 'PLUS', 'U']
    },

    3: {
        name: 'Level 3',
        label: 'LEVEL 3',
        dropInterval: 250,
        targetLines: 1,
        themeClass: 'theme-level-3',
        piecePool: [
            'I', 'J', 'L', 'O', 'S', 'T', 'Z',
            'I', 'J', 'L', 'O', 'S', 'T', 'Z',
            'PLUS', 'U',
            'X', 'W', 'V'
        ]
    },

    4: {
        name: 'Level 4',
        label: 'LEVEL 4',
        dropInterval: 280,
        targetLines: 1,
        themeClass: 'theme-level-4',
        piecePool: [
            'I', 'J', 'L', 'O', 'S', 'T', 'Z',
            'PLUS', 'U', 'X', 'W', 'V'
        ]
    },
    5: {
        name: 'Level 5',
        label: 'LEVEL 5',
        dropInterval: 180,
        targetLines: 1,
        themeClass: 'theme-level-5',
        piecePool: [
            'I', 'J', 'L', 'O', 'S', 'T', 'Z',
            'PLUS', 'U', 'X', 'W', 'V', 'BOMB', 'LASER', 'BOMB', 'LASER'
        ]
    },
};

const LINE_POINTS = {
    1: 100,
    2: 300,
    3: 500,
    4: 800
};

const COMBO_BONUS = {
    2: 50,
    3: 150,
    4: 300,
    5: 500,
};

const SPECIAL_PIECE_BONUS = 150;
