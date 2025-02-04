"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestWithDelay = exports.isAtLeast30DaysOld = void 0;
const execCommand_1 = require("./execCommand");
const rambdax_1 = require("rambdax");
let isVersionString = (x) => x.indexOf('.') > -1 && x.lastIndexOf('.') > -1 && x.indexOf('.') !== x.lastIndexOf('.');
const isAtLeast30DaysOld = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 30;
};
exports.isAtLeast30DaysOld = isAtLeast30DaysOld;
const getLatestWithDelay = async (dependency) => {
    const command = `npm info --json ${dependency}`;
    const packageInfoRaw = await (0, execCommand_1.execCommand)(command);
    try {
        const packageInfo = JSON.parse(packageInfoRaw);
        const filtered = Object.entries(packageInfo.time).filter(([key, value]) => isVersionString(key) && (0, exports.isAtLeast30DaysOld)(value)).map(([key]) => key);
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
