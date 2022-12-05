import { createAction } from "@reduxjs/toolkit";

export const startGame = createAction("startGame/game");
export const changeFlag = createAction("changeFlag/game");
export const press = createAction("press/game");
