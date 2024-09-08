import { replace } from 'rambdax';
import { HTML_TAGS } from './internals/constants';

export function stripTags(str) {
	return replace(/\s+/g, ' ', replace(HTML_TAGS, ' ', str)).trim();
}
