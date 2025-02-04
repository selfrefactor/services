"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestWithDelay = exports.isAtLeast30DaysOld = void 0;
const execCommand_1 = require("./execCommand");
const rambdax_1 = require("rambdax");
const isAtLeast30DaysOld = (dateString, key, dependency) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays, 'diffDays', dependency, key);
    return diffDays >= 30;
};
exports.isAtLeast30DaysOld = isAtLeast30DaysOld;
const getLatestWithDelay = async (dependency, currentVersion) => {
    const command = `npm info --json ${dependency}`;
    const packageInfoRaw = await (0, execCommand_1.execCommand)(command);
    try {
        const packageInfo = JSON.parse(packageInfoRaw);
        let versions = packageInfo.versions;
        versions.reverse();
        let indexOfCurrent = versions.indexOf(currentVersion);
        if (indexOfCurrent === -1) {
            console.log(`Dependency ${dependency} ${currentVersion} is not found in npm registry!!`);
            return '';
        }
        if (indexOfCurrent === 0) {
            console.log(`Dependency ${dependency} ${currentVersion} is already the latest version`);
            return '';
        }
        let versionsToCheck = versions.slice(0, indexOfCurrent).map((version) => ({ version, time: packageInfo.time[version] }));
        const filtered = versionsToCheck.filter(({ version, time }) => (0, exports.isAtLeast30DaysOld)(time, version, dependency)).map(([key]) => key);
        if (filtered.length === 0)
            return false;
        return (0, rambdax_1.last)(filtered);
    }
    catch (err) {
        console.log(err, 'dep.fn');
        process.exit(1);
    }
};
exports.getLatestWithDelay = getLatestWithDelay;
