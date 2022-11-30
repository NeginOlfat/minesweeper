import { CellStatus, CellValue } from "./types";

const COLSIZE = 10;

export const generateCells = (rowSize, bombNumber) => {
    let cells = []
    let row = []
    for (let i = 0; i < rowSize; i++) {
        row = []
        for (let j = 0; j < COLSIZE; j++) {
            row.push({
                id: `${i}:${j}`,
                cellValue: CellValue.NONE,
                cellStatus: CellStatus.CLOSED,
            });
        }
        cells.push(row)
    }
    cells = addBomb(bombNumber, rowSize, cells);
    cells = calculateBombsSurrounding(cells, rowSize)
    return cells
};

const addBomb = (bombNumber, rowSize, cells) => {
    let bombPlaced = 0;
    let newCells = cells
    while (bombPlaced < bombNumber) {
        const randomRow = Math.floor(Math.random() * rowSize)
        const randomCol = Math.floor(Math.random() * COLSIZE)
        const currentCell = newCells[randomRow][randomCol]
        if (currentCell.cellValue !== CellValue.BOMB) {
            newCells = newCells.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    if (randomRow === rowIndex && randomCol === colIndex) {
                        return {
                            ...cell,
                            cellValue: CellValue.BOMB
                        }
                    }
                    return cell;
                })

            })
            bombPlaced++;
        }
    }
    return newCells
};

const adjacentCells = (rowIndex, colIndex, cells, rowSize) => {

    const topLeftCell = (rowIndex > 0 && colIndex > 0) ? cells[rowIndex - 1][colIndex - 1] : null;
    const topCell = (rowIndex > 0) ? cells[rowIndex - 1][colIndex] : null;
    const topRightCell =
        (rowIndex > 0 && colIndex < COLSIZE - 1) ? cells[rowIndex - 1][colIndex + 1] : null;
    const leftCell = (colIndex > 0) ? cells[rowIndex][colIndex - 1] : null;
    const rightCell = (colIndex < COLSIZE - 1) ? cells[rowIndex][colIndex + 1] : null;
    const bottomLeftCell =
        (rowIndex < rowSize - 1 && colIndex > 0) ? cells[rowIndex + 1][colIndex - 1] : null;
    const bottomCell = (rowIndex < rowSize - 1) ? cells[rowIndex + 1][colIndex] : null;
    const bottomRightCell =
        (rowIndex < rowSize - 1 && colIndex < COLSIZE - 1) ? cells[rowIndex + 1][colIndex + 1] : null;

    return { topLeftCell, topCell, topRightCell, leftCell, rightCell, bottomLeftCell, bottomCell, bottomRightCell }
};

const calculateBombsSurrounding = (cells, rowSize) => {
    let newCells = []
    newCells = cells.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
            if (cell.cellValue != CellValue.BOMB) {

                const { topLeftCell, topCell, topRightCell,
                    leftCell, rightCell, bottomLeftCell,
                    bottomCell, bottomRightCell } = adjacentCells(rowIndex, colIndex, cells, rowSize)

                let numberOfBombs = 0;

                if (topLeftCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (topCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (topRightCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (leftCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (rightCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (bottomLeftCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (bottomCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }
                if (bottomRightCell?.cellValue === CellValue.BOMB) {
                    numberOfBombs++;
                }

                if (numberOfBombs > 0) {
                    return {
                        ...cell,
                        cellValue: numberOfBombs,
                    };
                } else {
                    return cell
                }
            } else {
                return cell
            }
        })
    })
    return newCells;
};
