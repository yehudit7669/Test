import { Divider, Grid, Typography } from '@mui/material'

type Props = {
  title: string
  desc: string | undefined
}

const RenderQuestionHeader = ({ title, desc }: Props) => {
  return (
    <>
      <Grid item xs={12} display="flex" gap="0.5rem" flexDirection="column">
        {/* Question will be rendered dynamically */}
        <Typography
          className="Question"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <Divider variant="middle" className="Divider" />
        {/* Description will be rendered dynamically */}
        {desc && (
          <Typography
            className="Instruction"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        )}
      </Grid>
    </>
  )
}

export default RenderQuestionHeader
