"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatest = void 0;
const execCommand_1 = require("./execCommand");
const getLatest = async (dependency, currentVersion) => {
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
        return versions[0];
    }
    catch (err) {
        console.log(err, 'dep.fn');
        process.exit(1);
    }
};
exports.getLatest = getLatest;
