import { Backdrop } from '@mui/material'
import EmojiData from '@emoji-mart/data/sets/14/apple.json'
import Picker from '@emoji-mart/react'

type Props = {
  open: boolean
  handleClose: () => void
  handleGetEmoji: (value: any) => void
}

function EmojiPickerDialog({ open, handleClose, handleGetEmoji }: Props) {
  /* Function definition for Emoji Picker - On change */
  const handleEmojiSelect = (emoji: any) => {
    handleGetEmoji(emoji.native)
  }
  /* Function definition for Emoji Picker - On change */

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <dialog open={open} className="Emoji_Dialog">
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
