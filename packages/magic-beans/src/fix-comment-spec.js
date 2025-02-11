const { convertComment } = require('./fix-comment')

test('happy', () => {
  const a = convertComment(
    `// foo bar baz foo1 bar1 baz1 foo2 bar2 baz2, foo3 bar3 baz3 foo4 bar4 baz4
    foo5 bar5 baz5 foo6 bar6. Baz6 foo7 bar7 baz7 foo8 bar8 baz8 foo9 bar9 baz9
    `,
    50,
  )
  expect(a).toMatchInlineSnapshot(`
    [
      "   // foo bar baz foo1 bar1 baz1 foo2 bar2 baz2, foo3",
      "   // bar3 baz3 foo4 bar4 baz4
           foo5 bar5 baz5 foo6",
      "   // bar6. Baz6 foo7 bar7 baz7 foo8 bar8 baz8 foo9",
      "   // bar9 baz9",
    ]
  `)
})
