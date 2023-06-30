import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'
import { useToggle } from '../../../../../../hooks/useToggle'
import { renderToString } from 'react-dom/server'
import { RichTextEditorConfig } from './RichTextEditorConfig'
import './RichTextEditor.css'
import { EmojiIcon } from '../../../../../../assets/svgs/svg-components'
import EmojiPickerDialog from './EmojiPickerDialog'

export default function RichTextEditor() {
  /* Rich Text Editor dependencies */
  const [editorValue] = useState<string>('')
  /* Rich Text Editor dependencies */

  let editorInstance: any = useRef(null)

  /* Emoji Picker Dialog dependencies */
  const {
    status: emojiPickerStatus,
    changeStatus: handleChangeEmojiPickerStatus,
  } = useToggle(false)
  /* Emoji Picker Dialog dependencies */

  /* Default editor config dependencies */
  const editorConfig: any = {
    ...RichTextEditorConfig,
    buttons: [
      ...RichTextEditorConfig.buttons,
      {
        name: 'emoji',
        icon: renderToString(<EmojiIcon />),
        tooltip: 'Emoji',
        exec: () => {
          handleChangeEmojiPickerStatus()
        },
      },
    ],
    extraButtons: [],
    uploader: {
      insertImageAsBase64URI: true,
    },
    events: {
      afterInit: (instance: any) => {
        editorInstance = instance
      },
    },
  }
  /* Default editor config dependencies */

  /***** Render rich text editor *****/
  const renderRichTextEditor = () => {
    return (
      <>
        <JoditEditor
          config={editorConfig}
          value={editorValue}
          onChange={(event) => console.log(event, 'editor change event')}
        />
      </>
    )
  }
  /***** Render rich text editor *****/

  const handleGetEmoji = (emoji: any) => {
    editorInstance?.selection?.insertHTML(`${emoji}`)
  }

  return (
    <>
      <div className="RichTextEditor_Wrapper">
        {renderRichTextEditor()}
        <EmojiPickerDialog
          open={emojiPickerStatus}
          handleClose={() => handleChangeEmojiPickerStatus()}
          handleGetEmoji={handleGetEmoji}
        />
      </div>
    </>
  )
}
