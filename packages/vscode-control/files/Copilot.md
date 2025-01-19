Free bindings
snippet not that needed
alt+4
alt+5

File suggestions in chat

In chat input fields, you can now type # to get file name suggestions and quickly attach them to your prompt as context. This works in chat locations that support file attachments, such as the Chat view, Quick Chat, Inline Chat, and Notebook Chat.

Drag and drop files to add chat context

You can now attach additional files as context for a chat prompt by dragging files or editor tabs from the workbench directly into chat. For Inline Chat, hold Shift and drop a file to add it as context instead of opening it in the editor.

File attachments included in history

When you attach a file or editor selection as relevant context to your chat request, Copilot Chat will include them in the history of follow-on requests so that you can keep referring to them without having to reattach them. Previously, this context was added only for the current request and was not included in the history of follow-on requests.

use knowlege base
github.copilot.chat.experimental.testGeneration.instructions
github.copilot.chat.experimental.setupTests.enabled

use `/` to use context in chat

can save session to json
can load session from json

not work
  {
		"priority": true,
    "key": "ctrl+4",
    "command": "github.copilot.interactiveEditor.review.continueInChat"
  },

  https://code.visualstudio.com/docs/copilot/copilot-chat#_workspace
https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-context
	@workspace /newNotebook (or /newNotebook): create a new Jupyter Notebook

	Show next/previous inline suggestion 