	{
					"when": "explorerResourceIsFolder",
					"command": "magicBeans.openFolderInVSCodeBeta",
					"group": "navigation"
				},

				  const openFolderInVSCodeBeta = vscode.commands.registerCommand(
    'magicBeans.openFolderInVSCodeBeta',
    (data) => {
      openInVsCode(data, {isInsiders: true})
    },
  )