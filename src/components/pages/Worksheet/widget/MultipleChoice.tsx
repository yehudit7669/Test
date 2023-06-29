import { Grid } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import RenderQuestionHeader from './common/renderQuestions/RenderQuestionHeader'
import AudioVideoInstructions from './common/audioVideoInstructions/AudioVideoInstructions'

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
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value)
  }

  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={''} />
        {(data.audio || data.video) && (
          <Grid item xs={12}>
            <AudioVideoInstructions
              videoSrc={data?.video?.url}
              audioSrc={data?.audio?.url}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          {data.options.map((option) => (
            <div key={option.index}>
              <input
                type="radio"
                name="option"
                value={option.text}
                checked={selectedOption === option.text}
                onChange={handleOptionChange}
              />
              <label dangerouslySetInnerHTML={{ __html: option.text }}></label>
              {option.imageUrl && <img src={option.imageUrl} alt="Option" />}
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}

export default MultipleChoice
