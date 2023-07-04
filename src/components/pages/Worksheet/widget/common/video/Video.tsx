import { Grid } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import './Video.css'

const Video = ({ data }: any) => {
  const videoId = data?.video?.videoId
  console.log(data)
  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid item xs={12} className="youtube-video-container">
          <iframe
            className="youtube-iframe"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Video
