export type Game = {
    id: string;
    grid: number[][];

    // this'll hold all players of at most 2. can push and pop if players
    // enter or exit the room. players array could be it's own object
    // (for an array of player objects)
    players: string[];

    // the id of the player who's turn it currently is
    playerCurrentTurn: string;
};

export function createGrid(rows: number, columns: number): number[][] {
    return Array.from({ length: columns }, () => Array(rows).fill(0));
}

/**
 * to extract the winner's array indexes, you can just track the current stack
 * that you have for counting the player's pucks, then return that or undefined
 * for a success or failure
 */
export function isWinner(player: number, grid: number[][]): boolean {
    const rows: number = grid.length;
    const cols: number = grid[0].length;
    const needed: number = 4;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // horizontal
            for (let cc = c, cnt = 0; cc < cols; cc++) {
                if (grid[r][cc] !== player) break;
                cnt++;
                if (cnt === needed) return true;
            }

            // vertical
            for (let cr = r, cnt = 0; cr < rows; cr++) {
                if (grid[cr][c] !== player) break;
                cnt++;
                if (cnt === needed) return true;
            }

            // diagonal right
            for (let cr = r, cc = c, cnt = 0; cr < rows && cc < cols; cr++, cc++) {
                if (grid[cr][cc] !== player) break;
                cnt++;
                if (cnt === needed) return true;
            }

            // diagonal left
            for (let cr = r, cc = c, cnt = 0; cr < rows && cc >= 0; cr++, cc--) {
                if (grid[cr][cc] !== player) break;
                cnt++;
                if (cnt === needed) return true;
            }
        }
    }

    return false;
}

/**
 * im pretty sure it's pass by reference so returning the same grid doesn't memalloc
 * TODO: probably should have a different function to test if you can drop to specified column
 */
export function dropPuck(grid: number[][], column: number, player: number): number[][] {
    const rows: number = grid.length;
    const cols: number = grid[0].length;

    if (column < 0 || column >= cols) return grid;

    for (let r = rows - 1; r >= 0; r--) {
        if (grid[r][column] === 0) {
            grid[r][column] = player;
            return grid;
        }
    }

    return grid;
}
