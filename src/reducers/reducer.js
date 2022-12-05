import { createReducer } from "@reduxjs/toolkit";

import { startGame, changeFlag, press } from "../actions/action";
import { difficultyBombNumber, difficultySize, GameStatus } from "../utils/types";
import { generateCells, updateCell, getFlagNumber, setGameStatus, checkFinish, showCells } from "../utils/functions";

const initialState = {
    cells: [],
    rowSize: 0,
    bombNumber: 0,
    flagNumber: 0,
    flag: false,
    isFinished: false,
    gameStatus: null
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(startGame, (state, action) => {
            state.isFinished = false
            state.bombNumber = difficultyBombNumber[action.payload]
            state.rowSize = difficultySize[action.payload];
            state.cells = generateCells(difficultySize[action.payload], difficultyBombNumber[action.payload])
            state.flagNumber = getFlagNumber(state.cells)
            state.gameStatus = null
        })
        .addCase(press, (state, action) => {
            if (state.gameStatus === null && !state.isFinished) {
                state.cells = updateCell(action.payload, state.cells, state.rowSize, state.flag)
                state.gameStatus = setGameStatus(state.cells)
                state.flagNumber = getFlagNumber(state.cells)
                state.isFinished = checkFinish(state.cells)
                if (state.flagNumber >= state.bombNumber)
                    state.flag = false;
            } else if ((state.gameStatus === GameStatus.LOST || state.gameStatus === GameStatus.WON) && !state.isFinished) {
                state.isFinished = true
            } else {
                state.cells = showCells(state.cells)
            }
        })
        .addCase(changeFlag, (state, action) => {
            state.flag = !state.flag;
            if (state.flagNumber >= state.bombNumber)
                state.flag = false;
        })
});

export default reducer;
