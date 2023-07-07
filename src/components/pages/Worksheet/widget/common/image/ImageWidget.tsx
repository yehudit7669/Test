import { Grid } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import RichTextEditor from '../richTextEditor'

const ImageWidget = ({ data }: any) => {
  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid item xs={12} textAlign={'center'}>
          <img
            src={data?.image?.url}
            height={data?.image?.height}
            width={data?.image?.width}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditor />
        </Grid>
      </Grid>
    </div>
  )
}

export default ImageWidget
