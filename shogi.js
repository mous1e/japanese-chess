(function(global) {
    "use strict"
    //Class ----------------------------
    function Shogi() {}

    //Header ----------------------------?
    global.Shogi = Shogi;
    global.Shogi.initShogi = initShogi;

    //-----------------------------------
    var canv_hover_piece = 0;
    var hover_piece = 0;
    var mouse_x = 0;
    var mouse_y = 0;
    var hiCt = 1;
    var kaCt = 1;
    var kiCt = 1;
    var giCt = 1;
    var keCt = 1;
    var koCt = 1;
    var fuCt = 1;
    var eHiCt = 1;
    var eKaCt = 1;
    var eKiCt = 1;
    var eGiCt = 1;
    var eKeCt = 1;
    var eKoCt = 1;
    var eFuCt = 1;


    var COL = 11;
    var RECT_CANV = {
        x: 0,
        y: 0,
        w: 540,
        h: 540
    };
    var RECT_BOARD = {
        x: 0,
        y: 0,
        w: 540,
        h: 540
    };
    var CELL_SIZE = RECT_CANV.w / COL | 0;
    var COLOR_LINE = "#000000";
    var COLOR_KOMA = "#FACC2E";
    var COLOR_SELECT = "#FFFFFF";

    var COLOR_PANEL_4 = "#FFBF00";
    var COLOR_PANEL_5 = "#FFBF00";
    var COLOR_PANEL_6 = "#FFBF00";

    var state_cache = null;
    var prev_revision = -1;
    var canv_cache = {
        canv_board: null,
        canv_pieces: null,
        canv_effect: null,
        canv_hover_piece: null
    };
    var KOMAS = {
        '1': "王",
        '2': "飛",
        '3': "角",
        '4': "金",
        '5': "銀",
        '6': "桂",
        '7': "香",
        '8': "歩",
        '9': "",
        '10': "竜",
        '11': "馬",
        '12': "",
        '13': "全",
        '14': "圭",
        '15': "杏",
        '16': "と",
        '17': "飛",
        '18': "角",
        '19': "金",
        '20': "銀",
        '21': "桂",
        '22': "香",
        '23': "歩",
        '24': "玉",
        '25': "飛",
        '26': "角",
        '27': "金",
        '28': "銀",
        '29': "桂",
        '30': "香",
        '31': "歩",
        '32': "",
        '33': "竜",
        '34': "馬",
        '35': "",
        '36': "全",
        '37': "圭",
        '38': "杏",
        '39': "と",
        '40': "飛",
        '41': "角",
        '42': "金",
        '43': "銀",
        '44': "桂",
        '45': "香",
        '46': "歩"
    };

    var movable = [
        [0, 0, 0,
         0, 0, 0,
         0, 0, 0],
        [1, 1, 1,
         1, 0, 1,
         1, 1, 1],
        [0, 2, 0,
         3, 0, 4,
         0, 5, 0],
        [6, 0, 7,
         0, 0, 0,
         8, 0, 9],
        [1, 1, 1,
         1, 0, 1,
         0, 1, 0],
        [1, 1, 1,
         0, 0, 0,
         1, 0, 1],
        [10, 0, 10,
         0, 0, 0,
         0, 0, 0],
        [0, 2, 0,
         0, 0, 0,
         0, 0, 0],
        [0, 1, 0,
         0, 0, 0,
         0, 0, 0],
        [],
        [1, 2, 1,
         3, 0, 4,
         1, 5, 1],
        [6, 1, 7,
         1, 0, 1,
         8, 1, 9],
        [],
        [1, 1, 1,
         1, 0, 1,
         0, 1, 0],
        [1, 1, 1,
         1, 0, 1,
         0, 1, 0],
        [1, 1, 1,
         1, 0, 1,
         0, 1, 0],
        [1, 1, 1,
         1, 0, 1,
         0, 1, 0],
        [0, 0, 0,
         12, 0, 0,
         0, 0, 0],
        [0, 0, 0,
         12, 0, 0,
         0, 0, 0],
        [0, 0, 0,
         12, 0, 0,
         0, 0, 0],
        [0, 0, 0,
         12, 0, 0,
         0, 0, 0],
        [0, 0, 0,
         13, 0, 0,
         0, 0, 0],
        [0, 0, 0,
         14, 0, 0,
         0, 0, 0],
        [0, 0, 0,
         11, 0, 0,
         0, 0, 0],
        [1, 1, 1,
         1, 0, 1,
         1, 1, 1],
        [0, 2, 0,
         3, 0, 4,
         0, 5, 0],
        [6, 0, 7,
         0, 0, 0,
         8, 0, 9],
        [0, 1, 0,
         1, 0, 1,
         1, 1, 1],
        [1, 0, 1,
         0, 0, 0,
         1, 1, 1],
        [0, 0, 0,
         0, 0, 0,
         19, 0, 19],
        [0, 0, 0,
         0, 0, 0,
         0, 5, 0],
        [0, 0, 0,
         0, 0, 0,
         0, 1, 0],
        [],
        [1, 2, 1,
         3, 0, 4,
         1, 5, 1],
        [6, 1, 7,
         1, 0, 1,
         8, 1, 9],
        [],
        [0, 1, 0,
         1, 0, 1,
         1, 1, 1],
        [0, 1, 0,
         1, 0, 1,
         1, 1, 1],
        [0, 1, 0,
         1, 0, 1,
         1, 1, 1],
        [0, 1, 0,
         1, 0, 1,
         1, 1, 1],
        [0, 0, 0,
         0, 0, 16,
         0, 0, 0],
        [0, 0, 0,
         0, 0, 16,
         0, 0, 0],
        [0, 0, 0,
         0, 0, 16,
         0, 0, 0],
        [0, 0, 0,
         0, 0, 16,
         0, 0, 0],
        [0, 0, 0,
         0, 0, 17,
         0, 0, 0],
        [0, 0, 0,
         0, 0, 18,
         0, 0, 0],
        [0, 0, 0,
         0, 0, 15,
         0, 0, 0]
    ];

    var ctx;
    var evented = false;
    var state = {};
    var point = {
        x: 0,
        y: 0
    };
    var init_state = {

        map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            30, 0, 31, 0, 0, 0, 8, 0, 7, 0,
            29, 25, 31, 0, 0, 0, 8, 3, 6, 0,
            28, 0, 31, 0, 0, 0, 8, 0, 5, 0,
            27, 0, 31, 0, 0, 0, 8, 0, 4, 0,
            24, 0, 31, 0, 0, 0, 8, 0, 1, 0,
            27, 0, 31, 0, 0, 0, 8, 0, 4, 0,
            28, 0, 31, 0, 0, 0, 8, 0, 5, 0,
            29, 26, 31, 0, 0, 0, 8, 2, 6, 0,
            30, 0, 31, 0, 0, 0, 8, 0, 7, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ],
        mode: 0,
        turn: 1,

        revision: 0,

        selected: {
            name: "",
            value: 0
        }
    };

    function initShogi(_ctx) {
        ctx = _ctx;
        state = objCopy(init_state);
        if (!evented) {
            evented = true;
            setEvents();
        }
        render(ctx, state, point);
    }

    function setEvents() {
        var isTouch;
        if ('ontouchstart' in window) {
            isTouch = true;
        } else {
            isTouch = false;
        }
        if (isTouch) {
            ctx.canvas.addEventListener('touchstart', ev_mouseClick)
        } else {
            ctx.canvas.addEventListener('mousemove', ev_mouseMove)
            ctx.canvas.addEventListener('mouseup', ev_mouseClick)
        }
    }

    function ev_mouseMove(e) {
        getMousePosition(e);
        state.selected = hitTest(point.x, point.y);
        render(ctx, state, point);
    }

    function ev_mouseClick(e) {
        getMousePosition(e);
        var selected = hitTest(point.x, point.y);
        var number;
        if (selected.name === "RECT_BOARD") {
            number = Math.floor(point.x / CELL_SIZE) * 10 + Math.floor(point.y / CELL_SIZE);
            if (hover_piece === 0) {
                if (state.map[number] > 23 && state.turn % 2 !== 0) {
                    return;
                }
                if (state.map[number] && state.turn % 2 !== 0) {
                    hover_piece = number;
                }
                if (state.map[number] <= 23 && state.turn % 2 === 0) {
                    return;
                }
                if (state.map[number] && state.turn % 2 === 0) {
                    hover_piece = number;
                }
            } else {
                if (hover_piece === number) {
                    hover_piece = 0;
                    render(ctx, state, point);
                    return;
                }
                var canm = canMovePanel(hover_piece, state.map);
                if (canm.indexOf(number) === -1) {
                    hover_piece = 0;
                    return;
                }
                stockPiece(number);
                state.map[number] = state.map[hover_piece];
                state.map[hover_piece] = 0;
                if (state.map[number] === 17 && hiCt > 1) {
                    state.map[hover_piece] = 17;
                    hiCt -= 1;
                }
                if (state.map[number] === 18 && kaCt > 1) {
                    state.map[hover_piece] = 18;
                    kaCt -= 1;
                }
                if (state.map[number] === 19 && kiCt > 1) {
                    state.map[hover_piece] = 19;
                    kiCt -= 1;
                }
                if (state.map[number] === 20 && giCt > 1) {
                    state.map[hover_piece] = 20;
                    giCt -= 1;
                }
                if (state.map[number] === 21 && keCt > 1) {
                    state.map[hover_piece] = 21;
                    keCt -= 1;
                }
                if (state.map[number] === 22 && koCt > 1) {
                    state.map[hover_piece] = 22;
                    koCt -= 1;
                }
                if (state.map[number] === 23 && fuCt > 1) {
                    state.map[hover_piece] = 23;
                    fuCt -= 1;
                }
                if (state.map[number] === 40 && eHiCt > 1) {
                    state.map[hover_piece] = 40;
                    eHiCt -= 1;
                }
                if (state.map[number] === 41 && eKaCt > 1) {
                    state.map[hover_piece] = 41;
                    eKaCt -= 1;
                }
                if (state.map[number] === 42 && eKiCt > 1) {
                    state.map[hover_piece] = 42;
                    eKiCt -= 1;
                }
                if (state.map[number] === 43 && eGiCt > 1) {
                    state.map[hover_piece] = 43;
                    eGiCt -= 1;
                }
                if (state.map[number] === 44 && eKeCt > 1) {
                    state.map[hover_piece] = 44;
                    eKeCt -= 1;
                }
                if (state.map[number] === 45 && eKoCt > 1) {
                    state.map[hover_piece] = 45;
                    eKoCt -= 1;
                }
                if (state.map[number] === 46 && eFuCt > 1) {
                    state.map[hover_piece] = 46;
                    eFuCt -= 1;
                }
                hover_piece = 0;
                changePiece(number, state.map);
                state.turn += 1;
                console.log(state.turn);
                state.revision += 1;
            }
        }
        render(ctx, state, point);
    }

    function getMousePosition(e) {
        if (!e.clientX) { //SmartPhone
            if (e.touches) {
                e = e.originalEvent.touches[0];
            } else if (e.originalEvent.touches) {
                e = e.originalEvent.touches[0];
            } else {
                e = event.touches[0];
            }
        }
        var rect = e.target.getBoundingClientRect();
        point.x = e.clientX - rect.left;
        point.y = e.clientY - rect.top;
    }

    function hitTest(x, y) {
        var objects = [RECT_BOARD];
        var click_obj = null;
        var selected = {
            name: "",
            value: 0
        }
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].w >= x && objects[i].x <= x && objects[i].h >= y && objects[i].y <= y) {
                selected.name = "RECT_BOARD";
                break;
            }
        }
        switch (true) {
            case selected.name === "RECT_BOARD":
                selected.name = "RECT_BOARD";
                selected.value = Math.floor(y / CELL_SIZE) * COL + Math.floor(x / CELL_SIZE);
                break;
        }
        return selected;
    }

    function render(ctx, state, point) {
        if (prev_revision < 0) {
            canv_cache.canv_board = drawBoard(state);
            canv_cache.canv_pieces = drawPieceAll(state);
            canv_cache.canv_hover_piece = drawHoverPiece(state);
            canv_cache.canv_effect = drawEffect(state);
        } else {
            if (state.revision != prev_revision) {
                canv_cache.canv_pieces = drawPieceAll(state);
                canv_cache.canv_hover_piece = drawHoverPiece(state);
            }
            canv_cache.canv_effect = drawEffect(state);
            canv_cache.canv_hover_piece = drawHoverPiece(state);
        }


        ctx.clearRect(0, 0, RECT_CANV.w, RECT_CANV.h);
        ctx.drawImage(canv_cache.canv_board, 0, 0, RECT_CANV.w, RECT_CANV.h);
        ctx.drawImage(canv_cache.canv_pieces, 0, 0, RECT_CANV.w, RECT_CANV.h);
        ctx.drawImage(canv_cache.canv_effect, 0, 0, RECT_CANV.w, RECT_CANV.h);
        ctx.drawImage(canv_cache.canv_hover_piece, 0, 0, RECT_CANV.w, RECT_CANV.h);
        prev_revision = state.revision;
    }

    function drawBoard(state) {
        if (!canv_cache.canv_board) {
            canv_cache.canv_board = document.createElement("canvas");
            canv_cache.canv_board.width = RECT_CANV.w;
            canv_cache.canv_board.height = RECT_CANV.h;
        }
        var ctx = canv_cache.canv_board.getContext('2d');
        ctx.clearRect(0, 0, RECT_CANV.w, RECT_CANV.h);

        var grad = ctx.createLinearGradient(0, 0, RECT_CANV.w, RECT_CANV.h);
        grad.addColorStop(0, COLOR_PANEL_6);
        grad.addColorStop(0.3, COLOR_PANEL_5);
        grad.addColorStop(1, COLOR_PANEL_4);
        ctx.fillStyle = grad;

        for (var x = 0; x < COL; x++) {
            for (var y = 0; y < COL; y++) {
                if (y * CELL_SIZE > 392) {
                    continue;
                }
                ctx.strokeStyle = COLOR_LINE;
                ctx.beginPath();
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                if (x * CELL_SIZE < 9 || x * CELL_SIZE > 441) {
                    continue;
                }
                ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }

        }

        var canv_board2 = document.createElement("canvas");
        var ctx_board2 = canv_board2.getContext('2d');
        canv_board2.width = RECT_CANV.w;
        canv_board2.height = RECT_CANV.h;
        ctx_board2.clearRect(0, 0, RECT_CANV.w, RECT_CANV.h);
        ctx_board2.globalAlpha = 0.07;
        ctx_board2.fillStyle = COLOR_KOMA;
        ctx_board2.beginPath();
        ctx_board2.arc(CELL_SIZE * 1, -3 * CELL_SIZE, 7 * CELL_SIZE, 0, Math.PI * 2, false);
        ctx_board2.fill();
        ctx.drawImage(canv_board2, 0, 0, RECT_CANV.w, RECT_CANV.h);

        var r = 2;
        var x = CELL_SIZE / 7.5;
        var y = CELL_SIZE / 7.5;
        var w = CELL_SIZE - 2 * x
        var h = CELL_SIZE - 2 * y;
        var x2 = CELL_SIZE * 10;
        var y2 = CELL_SIZE * 8;
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.arc(x + r, y + h - r, r, Math.PI, Math.PI * 0.5, true);
        ctx.arc(x + w - r, y + h - r, r, Math.PI * 0.65, 0, 1);
        ctx.arc(x + w - r, y + r, r, 0, Math.PI * 1.5, 1);
        ctx.arc(x + r, y + r, r, Math.PI * 1.5, Math.PI, 1);
        ctx.closePath();
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(x + x2, y + y2 + r);
        ctx.arc(x + x2 + r, y + y2 + h - r, r, Math.PI, Math.PI * 0.5, true);
        ctx.arc(x + x2 + w - r, y + y2 + h - r, r, Math.PI * 0.65, 0, 1);
        ctx.arc(x + x2 + w - r, y + y2 + r, r, 0, Math.PI * 1.5, 1);
        ctx.arc(x + x2 + r, y + y2 + r, r, Math.PI * 1.5, Math.PI, 1);
        ctx.closePath();
        ctx.stroke();

        return canv_cache.canv_board;
    }

    function drawPieceAll(state) {
        if (!canv_cache.canv_pieces) {
            canv_cache.canv_pieces = document.createElement("canvas");
            canv_cache.canv_pieces.width = RECT_CANV.w;
            canv_cache.canv_pieces.height = RECT_CANV.h;
        }
        var ctx = canv_cache.canv_pieces.getContext('2d');
        ctx.clearRect(0, 0, RECT_CANV.w, RECT_CANV.h);

        for (var x = 0; x < COL; x++) {
            for (var y = 0; y < 9; y++) {
                if (state.map[x * 10 + y] !== 0) {
                    drawPiece(ctx, x * CELL_SIZE, y * CELL_SIZE, state.map[x * 10 + y]);
                }
                if (state.map[x * 10 + y] > 89) {
                    continue;
                }
            }
        }
        ctx.font = "normal normal 16px/20px monospace"
        for (var x = 10; x < 11; x++) {
            for (var y = 0; y < 8; y++) {
                if (state.map[x * 10 + y] === 17) {
                    ctx.fillText(hiCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 18) {
                    ctx.fillText(kaCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 19) {
                    ctx.fillText(kiCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 20) {
                    ctx.fillText(giCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 21) {
                    ctx.fillText(keCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 22) {
                    ctx.fillText(koCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 23) {
                    ctx.fillText(fuCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
            }
        }

        for (var x = 0; x < 1; x++) {
            for (var y = 1; y < 9; y++) {
                if (state.map[x * 10 + y] === 40) {
                    ctx.fillText(eHiCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 41) {
                    ctx.fillText(eKaCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 42) {
                    ctx.fillText(eKiCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 43) {
                    ctx.fillText(eGiCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 44) {
                    ctx.fillText(eKeCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 45) {
                    ctx.fillText(eKoCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
                if (state.map[x * 10 + y] === 46) {
                    ctx.fillText(eFuCt, x * CELL_SIZE + (CELL_SIZE / 5) * 4.5, y * CELL_SIZE + (CELL_SIZE / 5) * 4)
                }
            }
        }
        ctx.font = "normal normal 32px/40px monospace";
        ctx.fillText("持", CELL_SIZE * 10 + CELL_SIZE / 2, CELL_SIZE * 8 + CELL_SIZE / 2);
        ctx.save();
        ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        ctx.rotate(180 * Math.PI / 180);
        ctx.translate(-x - CELL_SIZE / 2, -y - CELL_SIZE / 2);
        ctx.fillText("持", CELL_SIZE / 2 + CELL_SIZE / 15, CELL_SIZE - CELL_SIZE / 8);
        ctx.restore();
        return canv_cache.canv_pieces;
    }

    function drawPiece(ctx, x, y, number) {
        ctx.font = "normal normal 26px/40px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.strokeStyle = "#424242";
        ctx.beginPath();
        //ここにコマの描画を入れる
        for (var i = 24; i <= 46; i++) {
            if (number === i) {
                ctx.save();
                ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
                ctx.rotate(180 * Math.PI / 180);
                ctx.translate(-x - CELL_SIZE / 2, -y - CELL_SIZE / 2);
                ctx.fillText(KOMAS[i], x + CELL_SIZE / 2, y + CELL_SIZE / 2);
                ctx.restore();
            }
        }
        for (var i = 1; i <= 23; i++) {
            if (number === i) {
                ctx.fillText(KOMAS[i], x + CELL_SIZE / 2, y + CELL_SIZE / 2);
            }
        }
        return ctx;
    }

    function drawHoverPiece(state) {
        if (!canv_cache.canv_hover_piece) {
            canv_cache.canv_hover_piece = document.createElement("canvas");
            canv_cache.canv_hover_piece.width = RECT_CANV.w;
            canv_cache.canv_hover_piece.height = RECT_CANV.h;
        }
        var ctx = canv_cache.canv_hover_piece.getContext('2d');
        var x = point.x - (CELL_SIZE / 2);
        var y = point.y - (CELL_SIZE / 2);

        ctx.clearRect(0, 0, RECT_CANV.w, RECT_CANV.h);
        if (hover_piece !== 0) {
            drawPiece(ctx, x, y, state.map[hover_piece]);
        }
        return canv_cache.canv_hover_piece;
    }

    function drawEffect(state) {
        if (!canv_cache.canv_effect) {
            canv_cache.canv_effect = document.createElement("canvas");
            canv_cache.canv_effect.width = RECT_CANV.w;
            canv_cache.canv_effect.height = RECT_CANV.h;
        }
        var ctx = canv_cache.canv_effect.getContext('2d')
        var x = (state.selected.value % COL | 0) * CELL_SIZE;
        var y = (state.selected.value / COL | 0) * CELL_SIZE;

        ctx.clearRect(0, 0, RECT_CANV.w, RECT_CANV.h);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = COLOR_SELECT;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

        //x = point.x - (point.x % CELL_SIZE);
        //y = point.y - (point.y % CELL_SIZE);
        var target = (x / CELL_SIZE) * 10 + (y / CELL_SIZE);
        var cnm = canMovePanel(target, state.map);
        for (var i = 0; i <= cnm.length - 1; i++) {

            if (state.turn % 2 === 0) {
                if (state.map[target] < 24) {
                    continue;
                }
            }
            if (state.turn % 2 !== 0) {
                if (state.map[target] > 23) {
                    continue;
                }
            }

            x = Math.floor(cnm[i] / 10);
            y = Math.floor(cnm[i] % 10);
            ctx.globalAlpha = 0.6;
            ctx.strokeStyle = COLOR_LINE;
            ctx.lineWidth = CELL_SIZE / 20;
            ctx.beginPath();
            ctx.arc(x * CELL_SIZE + (CELL_SIZE / 2), y * CELL_SIZE + (CELL_SIZE / 2), (CELL_SIZE / 2) - (CELL_SIZE / 10), 0, Math.PI * 2, false);
            ctx.stroke();
        }
        return canv_cache.canv_effect;
    }

    function canMovePanel(panel_num, MAP) {
        var number = MAP[panel_num] | 0;
        var x = ~~(panel_num / 10);
        var y = ~~(panel_num % 10);
        var canMove = [];
        var checkDouble = [];
        if (number === 0) {
            return canMove;
        }
        for (var i = 0; i < 9; i++) {
            if (movable[number][i] === 0) {
                continue;
            }
            if (movable[number][i] === 1) {
                var target_x = x + ~~(i % 3) - 1;
                var target_y = y + ~~(i / 3) - 1;
            }
            if (movable[number][i] === 2) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) - 1 - j;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 3) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1 - j;
                    var target_y = y + ~~(i / 3) - 1;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 4) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1 + j;
                    var target_y = y + ~~(i / 3) - 1;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 5) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) - 1 + j;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 6) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1 - j;
                    var target_y = y + ~~(i / 3) - 1 - j;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 7) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1 + j;
                    var target_y = y + ~~(i / 3) - 1 - j;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 8) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1 - j;
                    var target_y = y + ~~(i / 3) - 1 + j;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 9) {
                for (var j = 0; j < 9; j++) {
                    var target_x = x + ~~(i % 3) - 1 + j;
                    var target_y = y + ~~(i / 3) - 1 + j;
                    if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1 || target_number * number < 0) {
                        continue;
                    }
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (target_number * number > 0 || target_number * number < 0) {
                        break;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 10) {
                var target_x = x + ~~(i % 3) - 1;
                var target_y = y + ~~(i / 3) - 2;
            }
            if (movable[number][i] === 11) {
                for (var j = -1; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) - 1 - j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || pos % 10 === 0 || target_number * number > 0 || target_number * number < 0) {
                        continue;
                    }
                    checkDouble = state.map.slice(10, 19);
                    if (pos > 10 && pos < 19 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(20, 29);
                    if (pos > 20 && pos < 29 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(30, 39);
                    if (pos > 30 && pos < 39 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(40, 49);
                    if (pos > 40 && pos < 49 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(50, 59);
                    if (pos > 50 && pos < 59 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(60, 69);
                    if (pos > 60 && pos < 69 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(70, 79);
                    if (pos > 70 && pos < 79 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(80, 89);
                    if (pos > 80 && pos < 89 && checkDouble.includes(8)) {
                        continue;
                    }
                    checkDouble = state.map.slice(90, 99);
                    if (pos > 90 && pos < 99 && checkDouble.includes(8)) {
                        continue;
                    }

                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 12) {
                for (var j = -7; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y - j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || target_number * number > 0 || target_number * number < 0 || pos > 99 || pos < 9) {
                        continue;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 13) {
                for (var j = -7; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) - 1 - j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || pos % 10 === 0 || pos % 10 === 1 || target_number * number > 0 || target_number * number < 0 || pos < 9 || pos > 99) {
                        continue;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 14) {
                for (var j = -9; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) - 1 - j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || pos % 10 === 0 || target_number * number > 0 || target_number * number < 0 || pos < 9 || pos > 99) {
                        continue;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 15) {
                for (var j = -1; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) - 1 + j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || pos % 10 === 8 || target_number * number > 0) {
                        continue;
                    }
                    checkDouble = state.map.slice(10, 19);
                    if (pos > 10 && pos < 19 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(20, 29);
                    if (pos > 20 && pos < 29 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(30, 39);
                    if (pos > 30 && pos < 39 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(40, 49);
                    if (pos > 40 && pos < 49 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(50, 59);
                    if (pos > 50 && pos < 59 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(60, 69);
                    if (pos > 60 && pos < 69 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(70, 79);
                    if (pos > 70 && pos < 79 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(80, 89);
                    if (pos > 80 && pos < 89 && checkDouble.includes(31)) {
                        continue;
                    }
                    checkDouble = state.map.slice(90, 99);
                    if (pos > 90 && pos < 99 && checkDouble.includes(31)) {
                        continue;
                    }

                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 16) {
                for (var j = -7; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || target_number * number > 0 || target_number * number < 0 || pos > 99 || pos < 9) {
                        continue;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 17) {
                for (var j = -7; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) + j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || pos % 10 === 0 || pos % 10 === 1 || target_number * number > 0 || target_number * number < 0 || pos < 9 || pos > 99) {
                        continue;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 18) {
                for (var j = -9; j < 87; j++) {
                    var target_x = x + ~~(i % 3) - 1;
                    var target_y = y + ~~(i / 3) + j;
                    var pos = target_x * 10 + target_y;
                    var target_number = MAP[pos] | 0;
                    if (pos % 10 === 9 || pos % 10 === 0 || target_number * number > 0 || target_number * number < 0 || pos < 9 || pos > 99) {
                        continue;
                    }
                    canMove.push(pos);
                }
            }
            if (movable[number][i] === 19) {
                var target_x = x + ~~(i % 3) - 1;
                var target_y = y + ~~(i / 9) + 2;
            }
            if (target_y < 0 || target_y > 8 || target_x > 9 || target_x < 1) {
                continue;
            }

            var pos = target_x * 10 + target_y;
            var target_number = MAP[pos] | 0;

            if (state.turn % 2 === 0 && target_number !== 0 && target_number >= 17) {
                continue;
            }

            if (state.turn % 2 !== 0 && target_number !== 0 && target_number <= 16) {
                continue;
            }
            canMove.push(pos);
        }
        return canMove;
    }

    function changePiece(panel_num, MAP) {
        var borderLine = ~~(panel_num % 10);
        var number = MAP[panel_num] | 0;
        if (number < 9 && number !== 1 && number !== 4) {
            if (borderLine <= 2) {
                if (confirm("成りますか？")) {
                    state.map[panel_num] += 8;
                    return;
                }
            }
        }
        if (number >= 17 && number <= 23) {
            state.map[panel_num] -= 15;
        }
        if (number < 32 && number > 23 && number !== 24 && number !== 27) {
            if (borderLine >= 6) {
                if (confirm("成りますか？")) {
                    state.map[panel_num] += 8;
                    return;
                }
            }
        }
        if (number >= 40 && number <= 46) {
            state.map[panel_num] -= 15;
        }
    }

    function stockPiece(number) {
        var stockNumber = state.map.slice(100, 108);
        var eStockNumber = state.map.slice(1, 8);
        var x;
        var target;
        for (var i = 17; i < 24; i++) {
            if (stockNumber.includes(i) && state.map[number] === i + 8) {
                if (i === 17) {
                    hiCt++;
                }
                if (i === 18) {
                    kaCt++;
                }
                if (i === 19) {
                    kiCt++;
                }
                if (i === 20) {
                    giCt++;
                }
                if (i === 21) {
                    keCt++;
                }
                if (i === 22) {
                    koCt++;
                }
                if (i === 23) {
                    fuCt++;
                }
                return;
            } else {
                if (stockNumber.includes(i) && state.map[number] === i + 16) {
                    if (i === 17) {
                        hiCt++;
                    }
                    if (i === 18) {
                        kaCt++;
                    }
                    if (i === 19) {
                        kiCt++;
                    }
                    if (i === 20) {
                        giCt++;
                    }
                    if (i === 21) {
                        keCt++;
                    }
                    if (i === 22) {
                        koCt++;
                    }
                    if (i === 23) {
                        fuCt++;
                    }
                    return;
                }
            }
        }
        for (var i = 40; i < 47; i++) {
            if (eStockNumber.includes(i) && state.map[number] === i - 38) {
                if (i === 40) {
                    eHiCt++;
                }
                if (i === 41) {
                    eKaCt++;
                }
                if (i === 42) {
                    eKiCt++;
                }
                if (i === 43) {
                    eGiCt++;
                }
                if (i === 44) {
                    eKeCt++;
                }
                if (i === 45) {
                    eKoCt++;
                }
                if (i === 46) {
                    eFuCt++;
                }
                return;
            } else {
                if (eStockNumber.includes(i) && state.map[number] === i - 30) {
                    if (i === 40) {
                        eHiCt++;
                    }
                    if (i === 41) {
                        eKaCt++;
                    }
                    if (i === 42) {
                        eKiCt++;
                    }
                    if (i === 43) {
                        eGiCt++;
                    }
                    if (i === 44) {
                        eKeCt++;
                    }
                    if (i === 45) {
                        eKoCt++;
                    }
                    if (i === 46) {
                        eFuCt++;
                    }
                    return;
                }
            }
        }
        if (state.map[number] === 0) {
            return;
        }
        if (state.map[number] > 24 && state.map[number] < 32 && state.map[107] === 0) {
            state.map[107] = state.map[number];
            state.map[107] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[107] === 0) {
                state.map[107] = state.map[number];
                state.map[107] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[101]) {
            state.map[100] = state.map[number];
            state.map[100] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[101]) {
                state.map[100] = state.map[number];
                state.map[100] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[102]) {
            state.map[101] = state.map[number];
            state.map[101] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[102]) {
                state.map[101] = state.map[number];
                state.map[101] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[103]) {
            state.map[102] = state.map[number];
            state.map[102] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[103]) {
                state.map[102] = state.map[number];
                state.map[102] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[104]) {
            state.map[103] = state.map[number];
            state.map[103] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[104]) {
                state.map[103] = state.map[number];
                state.map[103] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[105]) {
            state.map[104] = state.map[number];
            state.map[104] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[105]) {
                state.map[104] = state.map[number];
                state.map[104] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[106]) {
            state.map[105] = state.map[number];
            state.map[105] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[106]) {
                state.map[105] = state.map[number];
                state.map[105] -= 16;
                return;
            }
        }

        if (state.map[number] > 24 && state.map[number] < 32 && state.map[107]) {
            state.map[106] = state.map[number];
            state.map[106] -= 8;
            return;
        } else {
            if (state.map[number] > 32 && state.map[number] < 40 && state.map[107]) {
                state.map[106] = state.map[number];
                state.map[106] -= 16;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[1] === 0) {
            state.map[1] = state.map[number];
            state.map[1] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[1] === 0) {
                state.map[1] = state.map[number];
                state.map[1] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[7]) {
            state.map[8] = state.map[number];
            state.map[8] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[7]) {
                state.map[8] = state.map[number];
                state.map[8] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[6]) {
            state.map[7] = state.map[number];
            state.map[7] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[6]) {
                state.map[7] = state.map[number];
                state.map[7] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[5]) {
            state.map[6] = state.map[number];
            state.map[6] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[5]) {
                state.map[6] = state.map[number];
                state.map[6] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[4]) {
            state.map[5] = state.map[number];
            state.map[5] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[4]) {
                state.map[5] = state.map[number];
                state.map[5] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[3]) {
            state.map[4] = state.map[number];
            state.map[4] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[3]) {
                state.map[4] = state.map[number];
                state.map[4] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[2]) {
            state.map[3] = state.map[number];
            state.map[3] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[2]) {
                state.map[3] = state.map[number];
                state.map[3] += 30;
                return;
            }
        }

        if (state.map[number] < 9 && state.map[1]) {
            state.map[2] = state.map[number];
            state.map[2] += 38;
            return;
        } else {
            if (state.map[number] > 9 && state.map[number] < 17 && state.map[1]) {
                state.map[2] = state.map[number];
                state.map[2] += 30;
                return;
            }
        }
    }


    function objCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

})((this || 0).self || global);

/*{0: -7, 10: -6, 20: -5, 30: -4, 40: -1, 50: -4, 60: -5, 70: -6, 80: -7,
      1: 0, 11: -2, 21: 0, 31: 0, 41: 0, 51: 0, 61: 0, 71: -3, 81: 0,
      2: -8, 12: -8, 22: -8, 32: -8, 42: -8, 52: -8, 62: -8, 72: -8, 82: -8,
      3: 0, 13: 0, 23: 0, 33: 0, 43: 0, 53: 0, 63: 0, 73: 0, 83: 0,
      4: 0, 14: 0, 24: 0, 34: 0, 44: 0, 54: 0, 64: 0, 74: 0, 84: 0,
      5: 0, 15: 0, 25: 0, 35: 0, 45: 0, 55: 0, 65: 0, 75: 0, 85: 0,
      6: 8, 16: 8, 26: 8, 36: 8, 46: 8, 56: 8, 66: 8, 76: 8, 86: 8,
      7: 0, 17: 3, 27: 0, 37: 0, 47: 0, 57: 0, 67: 0, 77: 2, 87: 0,
      8: 7, 18: 6, 28: 5, 38: 4, 48: 1, 58: 4, 68: 5, 78: 6, 88: 7,
},*/
