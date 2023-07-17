import { Grid } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import './FillOnAnImageWidget.css'
import { useState } from 'react'
import AdjustIcon from '@mui/icons-material/Adjust'

const FillOnAnImageWidget = ({ data }: any) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([])

  const handlePointClick = (index: number) => {
    setActiveIndices((prevIndices: number[]) => {
      if (prevIndices.includes(index)) {
        // Close the input field for the clicked point
        return prevIndices.filter((prevIndex) => prevIndex !== index)
      } else {
        // Open the input field for the clicked point
        return [...prevIndices, index]
      }
    })
  }

  return (
    <div className="Widget_Container">
      <Grid container spacing={1}>
        <RenderQuestionHeader title={data.title} desc={data?.description} />
        <Grid
          item
          xs={12}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <div className="fillOnImageContainer">
            <img src={data.image.url} />
            {data.tags.map((tag: any, index: number) => (
              <div
                className="tags"
                style={{
                  top: tag.positionY,
                  left: tag.positionX,
                }}
                onClick={() => handlePointClick(index)}
              >
                <AdjustIcon className="adjust" />
              </div>
            ))}
            {activeIndices.map((activeIndex) => (
              <div
                key={activeIndex}
                className="activeIndices"
                style={{
                  top: `${parseFloat(data.tags[activeIndex].positionY) + 10}%`,
                  left: data.tags[activeIndex].positionX,
                }}
              >
                <input
                  placeholder="Enter text"
                  value={data.tags[activeIndex].text}
                />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default FillOnAnImageWidget
