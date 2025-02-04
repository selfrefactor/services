/**
	let isParallel = input.parallel ?? false
	let parrallelLimit = input.parrallelLimit ?? 6
	let atLeast30DaysOld = input.atLeast30DaysOld ?? false
 */
export function cli(mode?: string): Promise<void>
export function update(input: any): Promise<void>