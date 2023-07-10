import { Grid } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'

import './BlanksWidget.css'

const BlanksWidget = ({ data }: any) => {
  return (
    <div className="Widget_Container">
      <Grid container spacing={1}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid
          item
          xs={12}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {/* <WordBlankGame blankText={blankText} wordBank={wordBank} /> */}
          Help
        </Grid>
      </Grid>
    </div>
  )
}

export default BlanksWidget
