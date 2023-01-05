"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeEnd = void 0;
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const helpers_fn_1 = require("helpers-fn");
const jsonFormat = require("json-format");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const beforeEnd = (input) => {
    const filePath = (0, path_1.join)(process.cwd(), 'package.json');
    const lockFilePath = (0, path_1.join)(process.cwd(), 'yarn.lock');
    (0, fs_1.unlinkSync)(filePath);
    if ((0, fs_1.existsSync)(lockFilePath)) {
        (0, fs_1.unlinkSync)(lockFilePath);
    }
    const newProps = {
        dependencies: input.dependencies,
        devDependencies: input.devDependencies,
    };
    const newPackageJson = (0, rambdax_1.merge)(input.packageJson, newProps);
    (0, fs_extra_1.writeFileSync)(filePath, jsonFormat(newPackageJson));
    (0, helpers_fn_1.log)('end', 'info');
};
exports.beforeEnd = beforeEnd;
