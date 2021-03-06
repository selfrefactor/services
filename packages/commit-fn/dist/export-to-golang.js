"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportToGolang = void 0;
const constants_1 = require("./constants");
const LINE_LIMIT = 50;
function exportToGolang() {
    const lines = [];
    let currentLine = '';
    constants_1.ALL_LABELS.forEach((x, i) => {
        const newCurrentLine = i === 0 || currentLine === '' ? x : `${currentLine} | ${x}`;
        const isLast = i === constants_1.ALL_LABELS.length - 1;
        if (isLast) {
            lines.push(newCurrentLine);
        }
        else if (newCurrentLine.length > LINE_LIMIT) {
            lines.push(newCurrentLine);
            currentLine = '';
        }
        else {
            currentLine = newCurrentLine;
        }
    });
    const toSave = lines.map(line => {
        return `fmt.Printf("\\n${line.trim()}\\n")`;
    }).join('\n');
    return toSave;
}
exports.exportToGolang = exportToGolang;
//# sourceMappingURL=export-to-golang.js.map