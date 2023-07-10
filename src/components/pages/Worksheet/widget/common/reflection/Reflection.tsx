import { Grid } from '@mui/material'
import './Reflection.css'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import RichTextEditor from '../richTextEditor'
import {
  ReflectionFingerUp,
  ReflectionThumbsDown,
  ReflectionThumbsUp,
} from '../../../../../../assets/svgs/svg-components'
import { useState } from 'react'

const Reflection = ({ data }: any) => {
  console.log('Reflection', data)
  const [selectRanking, setSelectRanking] = useState<number>()
  return (
    <div className="Widget_Container">
      <Grid container spacing={1}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid container item xs={12}>
          {data?.isRanking && (
            <Grid container item xs={4} m={'auto'} marginY={4}>
              <Grid
                onClick={() => setSelectRanking(1)}
                xs={4}
                className={`reflection-box reflection-box-selected-thumbs-down ${
                  selectRanking === 1 &&
                  'reflection-box-selected-answer-thumbs-down'
                }`}
              >
                <ReflectionThumbsDown />
              </Grid>
              <Grid
                onClick={() => setSelectRanking(2)}
                xs={4}
                className={`reflection-box reflection-box-selected-finger-up ${
                  selectRanking === 2 &&
                  'reflection-box-selected-answer-finger-up'
                }`}
              >
                {' '}
                <ReflectionFingerUp />
              </Grid>
              <Grid
                onClick={() => setSelectRanking(3)}
                xs={4}
                className={`reflection-box reflection-box-selected-thumbs-up ${
                  selectRanking === 3 &&
                  'reflection-box-selected-answer-thumbs-up'
                }`}
              >
                {' '}
                <ReflectionThumbsUp />
              </Grid>
            </Grid>
          )}

          {data?.isFreeText && <RichTextEditor />}
        </Grid>
      </Grid>
    </div>
  )
}

export default Reflection
