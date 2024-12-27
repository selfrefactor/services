import {prompt} from 'inquirer'

export const confirm = async(question: string, isParallel: boolean): Promise<boolean> => {
  if (process.env.DEP_FN_UPDATE_ALL === 'true' 
		|| isParallel
	) return true

  const {answer} = await prompt([
    {type: confirm, name: 'answer', default: 'Y', message: question},
  ])

  return answer.toLowerCase() === 'y'
}
