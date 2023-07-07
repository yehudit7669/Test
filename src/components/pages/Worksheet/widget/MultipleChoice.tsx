import { Grid } from '@mui/material'
import RenderQuestionHeader from './common/renderQuestions/RenderQuestionHeader'
import AudioVideoInstructions from './common/audioVideoInstructions/AudioVideoInstructions'
import MultipleChoiceOptions from './common/miltipleChoiceOptions'

interface Option {
  text: string
  index: number
  showUploadImage?: boolean
  imageUrl?: string
  checked?: boolean
}

interface MultipleChoiceProps {
  data: {
    title: string
    options: Option[]
    audio?: {
      url: string
      name: string
    }
    video?: {
      url: string
    }
  }
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ data }) => {
  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RenderQuestionHeader title={data?.title} desc={''} />
        </Grid>
        {(data.audio || data.video) && (
          <Grid item xs={12}>
            <AudioVideoInstructions
              videoSrc={data?.video?.url}
              audioSrc={data?.audio?.url}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <MultipleChoiceOptions
            questionDirection={'row'}
            options={data?.options}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default MultipleChoice
