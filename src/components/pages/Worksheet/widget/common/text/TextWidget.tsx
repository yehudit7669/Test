import { Grid, Typography } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'

const TextWidget = ({ data }: any) => {
  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid item xs={12}>
          <Typography dangerouslySetInnerHTML={{ __html: data?.content }} />
        </Grid>
      </Grid>
    </div>
  )
}

export default TextWidget
