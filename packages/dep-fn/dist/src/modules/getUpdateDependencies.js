"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateDependencies = void 0;
const rambdax_1 = require("rambdax");
const getUpdate_1 = require("./helpers/getUpdate");
const isDependencyEligible_1 = require("./helpers/isDependencyEligible");
const getUpdateDependencies = async (dependencies, isParallel, parrallelLimit) => {
    const willReturn = {};
    let iterable = async (prop) => {
        const dependency = dependencies[prop];
        const eligible = (0, isDependencyEligible_1.isDependencyEligible)(prop);
        if (!eligible) {
            console.log(`Dependency ${prop} is skipped`);
            willReturn[prop] = dependency;
            return;
        }
        const willPush = await (0, getUpdate_1.getUpdate)({
            dependency: prop,
            tag: dependency,
            isParallel,
        });
        if (willPush !== dependency) {
            console.log(`Updated '${prop}' dependency to ${willPush}`);
        }
        else {
            console.log(`'${prop}' dependency no need to update`);
        }
        willReturn[prop] = willPush;
    };
    if (isParallel) {
        await (0, rambdax_1.mapParallelAsyncWithLimit)(iterable, parrallelLimit, Object.keys(dependencies));
    }
    else {
        await (0, rambdax_1.mapAsync)(iterable, Object.keys(dependencies));
    }
    return willReturn;
};
exports.getUpdateDependencies = getUpdateDependencies;
