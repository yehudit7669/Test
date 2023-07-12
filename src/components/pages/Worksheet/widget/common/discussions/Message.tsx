import { Avatar } from '@mui/material'

export const MessageLeft = (props: any) => {
  const message = props.message ? props.message : ''
  const photoURL = props.photoURL ? props.photoURL : ''
  const displayName = props.displayName ? props.displayName : ''
  return (
    <>
      <div className={'messageRow'}>
        <Avatar alt={displayName} className={'orange'} src={photoURL}></Avatar>
        <div>
          <div className={'messageBlue'}>
            <div className={'displayName'}>{displayName}</div>
            <div>
              <p
                className={'messageContent'}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const MessageRight = (props: any) => {
  const message = props.message ? props.message : ''
  const photoURL = props.photoURL ? props.photoURL : ''
  return (
    <div className={'messageRowRight'}>
      <div className={'messageOrange'}>
        <p
          className={'messageContent'}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
      <Avatar className={'orange'} src={photoURL}></Avatar>
    </div>
  )
}
