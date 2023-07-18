import { Grid, Typography } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import './EmbedWidget.css'

const EmbedWidget = ({ data }: any) => {
  return (
    <div className="Widget_Container">
      <Grid container spacing={1}>
        <RenderQuestionHeader
          title={data?.title ? data?.title : 'Embedded'}
          desc={data?.description}
        />
        <Grid
          item
          xs={12}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography
            dangerouslySetInnerHTML={{ __html: data?.embedHtml }}
          ></Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default EmbedWidget
