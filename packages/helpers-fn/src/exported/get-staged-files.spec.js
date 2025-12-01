const { getStagedFiles } = require("./get-staged-files");
import { expect, test, describe } from 'vitest'

test("happy", async () => {
  const getStagedFilesResult = await getStagedFiles(process.cwd());
  console.log({getStagedFilesResult})
});
