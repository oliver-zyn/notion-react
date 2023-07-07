import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { initialContent } from './initialContent'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble
} from 'react-icons/rx'

import 'highlight.js/styles/tokyo-night-dark.css'
import { BubbleButton } from './BubbleButton'

lowlight.registerLanguage('js', js)

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  return (
    <>
      <EditorContent className="max-w-[700px] mx-auto pt-16 prose prose-invert prose-violet" editor={editor} />
      {
        editor && (
          <FloatingMenu 
            editor={editor} 
            className="bg-zinc-700 py-2 px-1 shadow-xl border gap-1 border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col" 
            shouldShow={({ state }) => {
              const { $from } = state.selection

              const currentLineText = $from.nodeBefore?.textContent

              return currentLineText === '/'
          }}>
            <button 
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
              <img src="https://www.notion.so/images/blocks/quote/en-US.png" alt="Text" className="w-12 border border-zinc-600 rounded" />
              <div className="flex flex-col text-left">
                <span className="text-sm">Quote</span>
                <span className="text-xs text-zinc-400">Capture a quote.</span>
              </div>
            </button>

            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
              <img src="https://www.notion.so/images/blocks/header.57a7576a.png" alt="Text" className="w-12 border border-zinc-600 rounded" />
              <div className="flex flex-col text-left">
                <span className="text-sm">Heading</span>
                <span className="text-xs text-zinc-400">Big section heading.</span>
              </div>
            </button>
          </FloatingMenu>
        )
      }
      {
        editor && (
          <BubbleMenu className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600" editor={editor}>
            <BubbleButton>
              Text
              <RxChevronDown className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton>
              <RxChatBubble className="w-4 h-4" />
              Comment
            </BubbleButton>
            <div className="flex items-center">
              <BubbleButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-active={editor.isActive('bold')}
              >
                <RxFontBold className="w-4 h-4" />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-active={editor.isActive('italic')}
              >
                <RxFontItalic className="w-4 h-4" />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-active={editor.isActive('strike')}
              >
                <RxStrikethrough className="w-4 h-4" />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                data-active={editor.isActive('code')}
              >
                <RxCode className="w-4 h-4" />
            </BubbleButton>
            </div>
          </BubbleMenu>
        )
      }
    </>
  )
}