"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const beforeEnd_1 = require("./modules/beforeEnd");
const getUpdateDependencies_1 = require("./modules/getUpdateDependencies");
const getDependencies_1 = require("./modules/helpers/getDependencies");
async function update(input) {
    let isParallel = input.parallel ?? false;
    let parrallelLimit = input.parrallelLimit ?? 6;
    const { devDependencies, dependencies, peerDependencies, packageJson } = (0, getDependencies_1.getDependencies)();
    const updatedDependencies = await (0, getUpdateDependencies_1.getUpdateDependencies)(dependencies, isParallel, parrallelLimit);
    const updatedDevDependencies = await (0, getUpdateDependencies_1.getUpdateDependencies)(devDependencies, isParallel, parrallelLimit);
    const updatedPeerDependencies = await (0, getUpdateDependencies_1.getUpdateDependencies)(peerDependencies, isParallel, parrallelLimit);
    (0, beforeEnd_1.beforeEnd)({
        dependencies: updatedDependencies,
        devDependencies: updatedDevDependencies,
        packageJson: packageJson,
        peerDependencies: updatedPeerDependencies,
    });
}
