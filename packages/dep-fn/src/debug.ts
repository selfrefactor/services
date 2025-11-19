// import {update} from './update'

import { getLatest } from "./modules/helpers/getLatest";

// update({
// 	isParallel: true,
// 	atLeast30DaysOld: false
// })

getLatest('vitest', '3.2.4').then(result => {
	console.log('Latest version:', result)
})