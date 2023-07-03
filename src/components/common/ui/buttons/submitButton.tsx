type VoidFunction = () => void

type Props = {
  color?: string
  onSubmit: VoidFunction
  text: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export const SubmitButton = (props: Props) => {
  return (
    <>
      <button
        style={{
          backgroundColor: props.color ? props.color : '#FFC046',
          borderRadius: '6px',
          border: '0px',
          height: '30px',
          cursor: 'pointer',
        }}
        className={props.className}
        onSubmit={props.onSubmit}
        type="submit"
      >
        {props.text}
      </button>
    </>
  )
}
