"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateDependencies = void 0;
const helpers_fn_1 = require("helpers-fn");
const getUpdate_1 = require("./helpers/getUpdate");
const isDependencyEligible_1 = require("./helpers/isDependencyEligible");
const getUpdateDependencies = async (dependencies) => {
    const willReturn = {};
    for (const prop in dependencies) {
        const dependency = dependencies[prop];
        const eligible = (0, isDependencyEligible_1.isDependencyEligible)(prop);
        if (!eligible) {
            (0, helpers_fn_1.log)(`Dependency ${prop} is skipped`, 'warning');
            willReturn[prop] = dependency;
            continue;
        }
        const willPush = await (0, getUpdate_1.getUpdate)({
            dependency: prop,
            tag: dependency,
        });
        if (willPush !== dependency) {
            (0, helpers_fn_1.log)(`Updated '${prop}' dependency to ${willPush}`, 'success');
        }
        else {
            (0, helpers_fn_1.log)(`'${prop}' dependency no need to update`, 'success');
        }
        willReturn[prop] = willPush;
    }
    return willReturn;
};
exports.getUpdateDependencies = getUpdateDependencies;
