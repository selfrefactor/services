import type { GetInfo } from '../../../typings';
import { confirm } from './confirm';
import { getLatest } from './getLatest';
import { getLatestWithDelay } from './getLatestWithDelay';
import { getUpdateQuestion } from './getUpdateQuestion';
import { normalizeTag } from './normalizeTag';

export const getUpdate = async (input: GetInfo): Promise<string> => {
	const currentVersion = normalizeTag(input.tag);
	const method = input.atLeast30DaysOld ? getLatestWithDelay : getLatest;
	const latestVersion = (await method(input.dependency, currentVersion)) as string
	if (!latestVersion ) return currentVersion;
	if (currentVersion === latestVersion) {
		return currentVersion;
	}

	const question: string = getUpdateQuestion({
		currentTag: currentVersion,
		dependency: input.dependency,
		latestTag: latestVersion,
	});
	const answer = await confirm(question, input.isParallel);

	const willReturn = answer ? latestVersion : currentVersion;

	return willReturn;
};
