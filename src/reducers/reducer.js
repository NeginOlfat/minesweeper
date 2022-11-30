import { createReducer } from "@reduxjs/toolkit";

import { startGame } from "../actions/action";
import { difficultyBombNumber, difficultySize } from "../utils/types";
import { generateCells } from "../utils/functions";

const initialState = {
    cells: [],
    rowSize: 0,
    bombNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(startGame, (state, action) => {
            state.bombNumber = difficultyBombNumber[action.payload]
            state.rowSize = difficultySize[action.payload];
            state.cells = generateCells(difficultySize[action.payload], difficultyBombNumber[action.payload])
        });
})

export default reducer;