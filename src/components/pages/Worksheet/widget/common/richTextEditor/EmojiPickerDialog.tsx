import { Backdrop } from '@mui/material'
import EmojiData from '@emoji-mart/data/sets/14/apple.json'
import Picker from '@emoji-mart/react'
import { useRef, useEffect } from 'react'

type Props = {
  open: boolean
  handleClose: () => void
  handleGetEmoji: (value: any) => void
}

function EmojiPickerDialog({ open, handleClose, handleGetEmoji }: Props) {
  const dialogRef = useRef<any>(null)

  /* Function definition for Emoji Picker - On change */
  const handleEmojiSelect = (emoji: any) => {
    handleGetEmoji(emoji.native)
  }
  /* Function definition for Emoji Picker - On change */

  /* Check for dialog outside click and close the dialog */
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dialogRef?.current && !dialogRef?.current?.contains(event.target)) {
        handleClose && handleClose()
      }
    }
    document?.addEventListener('click', handleClickOutside, true)
    return () => {
      document?.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClose])
  /* Check for dialog outside click and close the dialog */

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <dialog ref={dialogRef} open={open} className="Emoji_Dialog">
          <Picker
            set="apple"
            data={EmojiData}
            onEmojiSelect={handleEmojiSelect}
            emojiButtonSize={27}
            emojiSize={20}
            previewPosition="none"
          />
        </dialog>
      </Backdrop>
    </>
  )
}

export default EmojiPickerDialog
