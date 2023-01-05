"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependencies = void 0;
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const getDependencies = () => {
    const filePath = (0, path_1.join)(process.cwd(), 'package.json');
    if (!(0, fs_1.existsSync)(filePath)) {
        throw `filePath ${filePath} doesn't exists`;
    }
    const packageJson = (0, fs_extra_1.readJsonSync)(filePath);
    const dependencies = (0, rambdax_1.defaultTo)({}, packageJson.dependencies);
    const devDependencies = (0, rambdax_1.defaultTo)({}, packageJson.devDependencies);
    const peerDependencies = (0, rambdax_1.defaultTo)({}, packageJson.peerDependencies);
    return {
        dependencies,
        devDependencies,
        packageJson,
        peerDependencies,
    };
};
exports.getDependencies = getDependencies;
