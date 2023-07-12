import { Button, Grid, Paper } from '@mui/material'
import './DiscussionsWidget.css'
import { MessageLeft, MessageRight } from './Message'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import { useState } from 'react'
import useUser from '../../../../../../hooks/useUser'
import RichTextEditor from '../richTextEditor'

const DiscussionsWidget = ({ data }: any) => {
  const user = useUser()
  const [chats, setChats] = useState(data?.chats)
  const [newMessages, setNewMessages] = useState<any>([])
  const [text, setText] = useState('')

  const soloChat = chats.find(
    (chat: any) => chat?.user?.email === user?.[0]?.email,
  )

  const onSendMessage = () => {
    if (text) {
      setNewMessages([...newMessages, { ...soloChat, text }])
      setChats([...chats, { ...soloChat, text: text }])
      setText('')
    }
  }
  return (
    <div className="Widget_Container">
      <Grid container spacing={1}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid item xs={8} padding={2} margin={'auto'} marginY={4}>
          <Paper elevation={2}>
            <Grid padding={2} paddingBottom={0}>
              <Paper variant="outlined" id="style-1">
                <Grid padding={1}>
                  {chats.map((chat: any, index: number) => {
                    if (
                      chat?.user?.email?.toLowerCase() ===
                      user?.[0]?.email?.toLowerCase()
                    ) {
                      return (
                        <MessageRight
                          key={index}
                          message={chat?.text}
                          photoURL={chat?.user?.imagePath}
                          displayName={chat?.user.username}
                        />
                      )
                    } else {
                      return (
                        <MessageLeft
                          key={index}
                          message={chat?.text}
                          photoURL={chat?.user?.imagePath}
                          displayName={chat?.user.username}
                        />
                      )
                    }
                  })}
                </Grid>
              </Paper>
            </Grid>
            <Grid padding={2}>
              <input
                placeholder="Temp input"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <RichTextEditor />
            </Grid>
            <Grid marginBottom={1} padding={2} paddingTop={0} textAlign={'end'}>
              <Button
                onClick={() => onSendMessage()}
                variant="contained"
                color="primary"
                className={'send-message-button'}
              >
                Send
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default DiscussionsWidget
