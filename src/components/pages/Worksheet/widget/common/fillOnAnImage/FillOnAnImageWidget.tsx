import { Grid, TextField } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import './FillOnAnImageWidget.css'
import { useState } from 'react'
import {
  PointWithChanges,
  PointWithoutChanges,
} from '../../../../../../assets/svgs/svg-components'

const FillOnAnImageWidget = ({ data }: any) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([])
  const [tagsData, setTagsData] = useState([...data.tags])

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

  const handleInputChange = (value: string, index: number) => {
    const updatedData = structuredClone(tagsData)
    updatedData[index].text = value
    setTagsData([...updatedData])
    return updatedData[index].text
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
                {tagsData[index].text == data.tags[index].text ? (
                  <PointWithoutChanges />
                ) : (
                  <PointWithChanges />
                )}
              </div>
            ))}
            {activeIndices.map((activeIndex) => (
              <div
                key={activeIndex}
                className="activeIndices"
                style={{
                  top: data.tags[activeIndex].positionY,
                  left: `${parseFloat(data.tags[activeIndex].positionX) + 6}%`,
                }}
              >
                <input
                  step="any"
                  className="tagInput"
                  style={{
                    border:
                      tagsData[activeIndex].text === data.tags[activeIndex].text
                        ? '1px solid #DBDBDB'
                        : '1px solid #4688CB',
                  }}
                  aria-multiline={true}
                  placeholder="Enter text"
                  defaultValue={tagsData[activeIndex].text}
                  onChange={(event) =>
                    handleInputChange(event.target.value, activeIndex)
                  }
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
