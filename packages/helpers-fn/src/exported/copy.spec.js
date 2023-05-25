const { copy } = require("./copy");

let multiLine = `
ok1(tests, suiteLabel)([ {
  label : String,
  fn    : Function,
} ], String)

const benches = tests.forEach(({ label, fn }) => bench.add(label, fn))
const folder = maybe(
  input.folder,
  input.folder,
  process.env.BENCHMARK_FOLDER ?
    process.env.BENCHMARK_FOLDER :
    folderFallback
)
`.trim();

test.skip("happy", async () => {
  await copy("foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 foo123 ");
});

test("multi line", async () => {
  await copy(multiLine);
} );
