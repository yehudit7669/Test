import { Divider, Grid, Typography } from '@mui/material'

type Props = {
  title: string
  desc: string | undefined
  faviconLink?: string | undefined
  url?: string | undefined
}

const RenderQuestionHeader = ({ title, desc, faviconLink, url }: Props) => {
  return (
    <>
      <Grid item xs={12} display="flex" gap="0.5rem" flexDirection="column">
        {/* Question will be rendered dynamically */}
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          alignItems={'center'}
          gap={1}
        >
          {faviconLink && url && (
            <Typography
              component={'a'}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={faviconLink} alt="image" />
            </Typography>
          )}
          <Typography
            className="Question"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Grid>
        <Divider variant="middle" className="Divider" />
        {/* Description will be rendered dynamically */}
        {!faviconLink && desc && (
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
