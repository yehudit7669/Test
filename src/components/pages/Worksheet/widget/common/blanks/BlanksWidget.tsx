import { Grid } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import NoneTypeBlank from './NoneTypeBlank'
import ClickTypeBlank from './ClickTypeBlank'
import SelectTypeBlank from './SelectTypeBlank'
import './BlanksWidget.css'

const BlanksWidget = ({ data }: any) => {
  const blankTypes = {
    none: 'none',
    click: 'click',
    text: 'text',
  }

  const renderBlankByType = () => {
    switch (data.wordBank) {
      case blankTypes.none:
        return <NoneTypeBlank data={data} />
      case blankTypes.click:
        return <ClickTypeBlank data={data} />
      case blankTypes.text:
        return <SelectTypeBlank data={data} />
    }
  }

  return (
    <div className="Widget_Container">
      <Grid container spacing={1}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid item xs={12}>
          {renderBlankByType()}
        </Grid>
      </Grid>
    </div>
  )
}

export default BlanksWidget
