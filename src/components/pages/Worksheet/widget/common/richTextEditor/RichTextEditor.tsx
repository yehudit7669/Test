import JoditEditor from 'jodit-react'
import { useRef, useState, useEffect } from 'react'
import EmojiData from '@emoji-mart/data/sets/14/apple.json'
import Picker from '@emoji-mart/react'
import { useToggle } from '../../../../../../hooks/useToggle'
import { renderToString } from 'react-dom/server'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { RichTextEditorConfig } from './RichTextEditorConfig'
import './RichTextEditor.css'

export default function RichTextEditor() {
  /* Rich Text Editor dependencies */
  const [editorValue] = useState<string>('')
  /* Rich Text Editor dependencies */

  let editorInstance: any = null
  const emojiStatusButtonRef = useRef<any>(null)

  /* Emoji Picker Dialog dependencies */
  const {
    status: emojiPickerStatus,
    changeStatus: handleChangeEmojiPickerStatus,
    setStatus: setEmojiPickerStatus,
  } = useToggle(false)
  /* Emoji Picker Dialog dependencies */

  /* Default editor config dependencies */
  const editorConfig: any = {
    ...RichTextEditorConfig,
    extraButtons: [
      {
        name: 'emoji',
        icon: renderToString(<SentimentSatisfiedAltIcon />),
        tooltip: 'Emoji',
        exec: () => {
          emojiStatusButtonRef?.current.click()
        },
      },
    ],
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

  /* On component mount Check if user has clicked outside the emoji picker then close the emoji picker */
  useEffect(() => {
    const handleClickOutsideEmojiWrapper = (event: any) => {
      const emojiIcon = document.querySelector("[aria-label='Emoji']")
      const container: HTMLElement | null = document.getElementById(
        'EmojiPicker_Container'
      )
      if (event.target?.ariaLabel !== emojiIcon?.ariaLabel) {
        if (container && !container.contains(event.target)) {
          setEmojiPickerStatus(false)
        }
      }
    }

    document.addEventListener('click', handleClickOutsideEmojiWrapper)

    return () => {
      document.removeEventListener('click', handleClickOutsideEmojiWrapper)
    }
  }, [])
  /* On component mount Check if user has clicked outside the emoji picker then close the emoji picker */

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

  /***** Render Emoji Picker Container *****/
  const renderEmojiPickerContainer = () => {
    /* Function definition for Emoji Picker - On change */
    const handleEmojiSelect = (emoji: any) => {
      editorInstance?.selection?.insertHTML(`${emoji.native}`)
    }
    /* Function definition for Emoji Picker - On change */

    return (
      <div id="EmojiPicker_Container" className="EmojiPicker_Wrapper">
        <button
          ref={emojiStatusButtonRef}
          style={{ display: 'none' }}
          onClick={handleChangeEmojiPickerStatus}
        ></button>
        {emojiPickerStatus ? (
          <Picker
            set="apple"
            data={EmojiData}
            onEmojiSelect={handleEmojiSelect}
            emojiButtonSize={27}
            emojiSize={20}
            previewPosition="none"
          />
        ) : null}
      </div>
    )
  }
  /***** Render Emoji Picker Container *****/

  return (
    <>
      <div className="RichTextEditor_Wrapper">
        {renderRichTextEditor()}
        {renderEmojiPickerContainer()}
      </div>
    </>
  )
}
