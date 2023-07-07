import { Grid } from '@mui/material'
import RenderQuestionHeader from './common/renderQuestions/RenderQuestionHeader'
import PuzzleGame from './common/puzzleGame'

interface WordSearchPuzzleProps {
  data: {
    title: string
    description: string
    grid: {
      height: number
      width: number
    }
    words: string[]
    level: string
    cells: any
  }
}

const WordSearchPuzzle: React.FC<WordSearchPuzzleProps> = ({ data }) => {
  // const [puzzleData, setPuzzleData] = useState<{ title: string; description: string; grid: { height: number; width: number; }; words: string[]; level: string; cells: any;}>()

  // useEffect(() => {
  //   setPuzzleData(data)

  // }, [data])

  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RenderQuestionHeader title={data?.title} desc={data?.description} />
        </Grid>
        {
          <Grid item xs={12}>
            <PuzzleGame puzzleWidgetData={data} />
          </Grid>
        }
      </Grid>
    </div>
  )
}

export default WordSearchPuzzle
