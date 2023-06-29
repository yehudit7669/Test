import { ClipBoardIcon } from '../../../assets/svgs/svg-components'
type Props = {
  text: string
  color: string
}
export const CopyTextToClipboard = (props: Props) => {
  return (
    <div
      style={{
        cursor: 'pointer',
        backgroundColor: props.color ? props.color : '',
        borderRadius: '6px',
        width: '30px',
        height: '30px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
      onClick={() => {
        const clipboard = navigator.clipboard
        clipboard.writeText(props.text)
      }}
    >
      <ClipBoardIcon></ClipBoardIcon>
    </div>
  )
}
