"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const beforeEnd_1 = require("./modules/beforeEnd");
const getUpdateDependencies_1 = require("./modules/getUpdateDependencies");
const getDependencies_1 = require("./modules/helpers/getDependencies");
async function update() {
    const { devDependencies, dependencies, peerDependencies, packageJson } = (0, getDependencies_1.getDependencies)();
    const updatedDependencies = await (0, getUpdateDependencies_1.getUpdateDependencies)(dependencies);
    const updatedDevDependencies = await (0, getUpdateDependencies_1.getUpdateDependencies)(devDependencies);
    const updatedPeerDependencies = await (0, getUpdateDependencies_1.getUpdateDependencies)(peerDependencies);
    (0, beforeEnd_1.beforeEnd)({
        dependencies: updatedDependencies,
        devDependencies: updatedDevDependencies,
        packageJson: packageJson,
        peerDependencies: updatedPeerDependencies,
    });
}
