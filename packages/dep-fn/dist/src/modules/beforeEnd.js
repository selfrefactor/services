"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeEnd = void 0;
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
let sortFn = (aProp, bProp) => {
    if (aProp === bProp)
        return 0;
    return bProp.localeCompare(aProp);
};
const beforeEnd = (input) => {
    const filePath = (0, path_1.join)(process.cwd(), 'package.json');
    (0, fs_1.unlinkSync)(filePath);
    let dependencies = (0, rambdax_1.sortObject)(sortFn, input.dependencies);
    let devDependencies = (0, rambdax_1.sortObject)(sortFn, input.devDependencies);
    const newPackageJson = {
        ...input.packageJson,
        dependencies,
        devDependencies,
    };
    (0, fs_extra_1.writeJsonSync)(filePath, newPackageJson, { spaces: 2 });
    console.log('end');
};
exports.beforeEnd = beforeEnd;
