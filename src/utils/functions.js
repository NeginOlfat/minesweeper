import { CellStatus, CellValue, GameStatus } from "./types";

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

export const updateCell = (item, cells, rowSize, flag) => {

    let newCells = cells
    const [rowIndex, colIndex] = item.id.split(":");

    if (item.cellStatus === CellStatus.FLAGGED) {
        newCells[rowIndex][colIndex].cellStatus = CellStatus.CLOSED;
        return newCells;
    } else if (flag && item.cellStatus === CellStatus.CLOSED) {
        newCells[rowIndex][colIndex].cellStatus = CellStatus.FLAGGED;
        return newCells;
    } else if (item.cellValue === CellValue.BOMB) {
        newCells = cells.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if (cell.cellValue === CellValue.BOMB) {
                    return {
                        ...cell,
                        cellStatus: CellStatus.REVEALED
                    };
                }
                return cell;
            })
        })
        return newCells
    } else if (item.cellValue === CellValue.NONE) {
        newCells = revealNoneSurrounding(rowIndex, colIndex, newCells, rowSize)
        return newCells;
    } else if (item.cellStatus === CellStatus.CLOSED) {
        newCells[rowIndex][colIndex].cellStatus = CellStatus.REVEALED;
        return newCells
    }
    return cells;
};


const revealNoneSurrounding = (rowIndex, colIndex, cells, rowSize) => {

    const currentCell = cells[rowIndex][colIndex];
    const row = parseInt(rowIndex)
    const col = parseInt(colIndex)
    let newCells = cells

    if (currentCell.cellStatus === CellStatus.REVEALED || currentCell.cellStatus === CellStatus.FLAGGED) {
        return cells;
    }

    newCells[rowIndex][colIndex].cellStatus = CellStatus.REVEALED;

    const { topLeftCell, topCell, topRightCell, leftCell, rightCell, bottomLeftCell,
        bottomCell, bottomRightCell } = adjacentCells(row, col, newCells, rowSize)

    if (topLeftCell?.cellStatus === CellStatus.CLOSED && topLeftCell.cellValue !== CellValue.BOMB) {
        if (topLeftCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row - 1, col - 1, newCells, rowSize);
        else
            newCells[row - 1][col - 1].cellStatus = CellStatus.REVEALED;
    }
    if (topCell?.cellStatus === CellStatus.CLOSED && topCell.cellValue !== CellValue.BOMB) {
        if (topCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row - 1, col, newCells, rowSize);
        else
            newCells[row - 1][col].cellStatus = CellStatus.REVEALED;
    }
    if (topRightCell?.cellStatus === CellStatus.CLOSED && topRightCell.cellValue !== CellValue.BOMB) {
        if (topRightCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row - 1, col + 1, newCells, rowSize);
        else
            newCells[row - 1][col + 1].cellStatus = CellStatus.REVEALED;
    }
    if (leftCell?.cellStatus === CellStatus.CLOSED && leftCell.cellValue !== CellValue.BOMB) {
        if (leftCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row, col - 1, newCells, rowSize);
        else
            newCells[row][col - 1].cellStatus = CellStatus.REVEALED;

    }
    if (rightCell?.CellStatus === CellStatus.CLOSED && rightCell.cellValue !== CellValue.BOMB) {
        if (rightCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row, col + 1, newCells, rowSize);
        else
            newCells[row][col + 1].cellStatus = CellStatus.REVEALED;
    }
    if (bottomLeftCell?.cellStatus === CellStatus.CLOSED && bottomLeftCell.cellValue !== CellValue.BOMB) {
        if (bottomLeftCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row + 1, col - 1, newCells, rowSize);
        else
            newCells[row + 1][col - 1].cellStatus = CellStatus.REVEALED;
    }
    if (bottomCell?.cellStatus === CellStatus.CLOSED && bottomCell.cellValue !== CellValue.BOMB) {
        if (bottomCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row + 1, col, newCells, rowSize)
        else
            newCells[row + 1][col].cellStatus = CellStatus.REVEALED;
    }
    if (bottomRightCell?.cellStatus === CellStatus.CLOSED && bottomRightCell.cellValue !== CellValue.BOMB) {
        if (bottomRightCell.cellValue === CellValue.NONE)
            newCells = revealNoneSurrounding(row + 1, col + 1, newCells, rowSize);
        else
            newCells[row + 1][col + 1].cellStatus = CellStatus.REVEALED;
    }
    return newCells;
};

export const getFlagNumber = (cells) => {
    let flaggedNumber = 0
    cells.map((row, rowIndex) => {
        row.map((cell, colIndex) => {
            if (cell.cellStatus === CellStatus.FLAGGED)
                flaggedNumber++;
        })
    })
    return flaggedNumber;
};

export const setGameStatus = (cells) => {
    const flatCells = cells.flat()
    const bombCells = flatCells.filter(x => x.cellValue === CellValue.BOMB)
    const revealedBombCell = bombCells.find(x => x.cellStatus === CellStatus.REVEALED)
    const flaggedBombCells = bombCells.every(x => x.cellStatus === CellStatus.FLAGGED)
    const isAllRevealed = flatCells.every(cell => cell.cellStatus === CellStatus.REVEALED ||
        cell.cellStatus === CellStatus.FLAGGED)

    if (revealedBombCell)
        return GameStatus.LOST
    else if (flaggedBombCells && isAllRevealed)
        return GameStatus.WON
    else
        return null
};

export const checkFinish = (cells) => {
    const flatCells = cells.flat()
    const bombCells = flatCells.filter(x => x.cellValue === CellValue.BOMB)
    const revealedBombCell = bombCells.find(x => x.cellStatus === CellStatus.REVEALED)
    if (revealedBombCell)
        return true
    else
        return false
};

export const showCells = (cells) => {
    let newCells = [];
    newCells = cells.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
            if (cell.cellValue !== CellValue.REVEALED) {
                return {
                    ...cell,
                    cellStatus: CellStatus.REVEALED
                };
            }
            return cell;
        })
    })
    return newCells
};
