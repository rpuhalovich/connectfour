<script>
	import {
		status,
		drops,
		rowCount,
		hoverColumn,
		dropColumn,
		oppHoverColumn,
		oppDropColumn,
		winPositions,
	} from './stores.js';
	import Slot from './Slot.svelte';

	export let columnIndex = -1;
	$: rows = Array($rowCount).fill(0);
	$: hovered = -1;

	drops.subscribe((history) => {
		if (!history) {
			rows = Array($rowCount).fill(0);
		}
		setTimeout(() => {
			history
				.map((column, index) => [column, index % 2 === 0])
				.filter((drop) => drop[0] === columnIndex)
				.forEach((dropped) => drop(historyToCurrent(dropped)));
		}, 20);
		function historyToCurrent(dropped) {
			const isHistoryOdd = history.length % 2;
			const isPlayerTwo =
				(isHistoryOdd && $status === 'turn') ||
				(!isHistoryOdd && $status !== 'turn');
			return isPlayerTwo ? !dropped[1] : dropped[1];
		}
	});
	oppHoverColumn.subscribe((col) => {
		hovered = -1;
		if (col != columnIndex) return;
		hovered = lowestFreeSlot();
	});
	oppDropColumn.subscribe((col) => {
		if (col !== columnIndex) return;
		drop(false);
		oppDropColumn.set(undefined);
	});

	function handleHoverEnter(start) {
		if ($status !== 'turn') return;
		hoverColumn.set(columnIndex);
		hovered = lowestFreeSlot();
	}
	function handleHoverLeave(start) {
		if ($status !== 'turn') return;
		hovered = -1;
	}
	function handleClick() {
		if ($status !== 'turn') return;
		if (drop(true)) dropColumn.set(columnIndex);
	}
	function drop(isPlayer) {
		const dropPosition = lowestFreeSlot();
		if (dropPosition === null) return false;
		hovered = -1;
		rows[dropPosition] = isPlayer ? 1 : 2;
		return true;
	}
	function lowestFreeSlot() {
		if (rows[0] > 0) return null;
		return rows.length - [...rows].reverse().findIndex((slot) => slot < 1) - 1;
	}
</script>

<div
	class="column"
	on:mouseenter={handleHoverEnter}
	on:mouseleave={handleHoverLeave}
	on:click={handleClick}
>
	{#each rows as disc, slotIndex}
		<Slot
			{disc}
			hover={hovered >= 0}
			drophint={hovered == slotIndex}
			dance={$winPositions.some(
				([col, row]) => col == columnIndex && row == slotIndex,
			)}
		/>
	{/each}
</div>

<style>
	.column {
		display: flex;
		flex-flow: column nowrap;
	}
</style>
