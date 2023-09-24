import { isWinner } from "../game";

describe('isWinner', () => {
	it('diagonal right', () => {
		const grid: number[][] = [
		  [ 2, 1, 1, 1, 1, 1 ],
		  [ 1, 2, 1, 1, 1, 1 ],
		  [ 1, 1, 2, 1, 1, 1 ],
		  [ 1, 1, 1, 2, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ]
		];
		expect(isWinner(2, grid)).toBe(true);
	});

	it('diagonal left', () => {
		const grid: number[][] = [
		  [ 1, 1, 1, 1, 1, 2 ],
		  [ 1, 1, 1, 1, 2, 1 ],
		  [ 1, 1, 1, 2, 1, 1 ],
		  [ 1, 1, 2, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ]
		];
		expect(isWinner(2, grid)).toBe(true);
	});

	it('vertical', () => {
		const grid: number[][] = [
		  [ 1, 1, 1, 2, 1, 1 ],
		  [ 1, 1, 1, 2, 1, 1 ],
		  [ 1, 1, 1, 2, 1, 1 ],
		  [ 1, 1, 1, 2, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ]
		];
		expect(isWinner(2, grid)).toBe(true);
	});

	it('horizontal', () => {
		const grid: number[][] = [
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 2, 2, 2, 2, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ],
		  [ 1, 1, 1, 1, 1, 1 ]
		];
		expect(isWinner(2, grid)).toBe(true);
	});
});
