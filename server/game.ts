export type Game = {
	grid: number[][],
	drops: number[],
	player1: string | null,
	player2: string | null,
}

export function createGrid(columns: number, rows: number) {
	return Array.from({ length: columns }, () => Array(rows).fill(0));
}

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
