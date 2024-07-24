"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDependencyEligible = isDependencyEligible;
const package_storage_1 = require("package-storage");
function isDependencyEligible(dependency) {
    const loaded = (0, package_storage_1.load)('depFn', undefined, true);
    return Array.isArray(loaded) ? !loaded.includes(dependency) : true;
}
