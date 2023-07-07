import { Grid, Typography } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import './linkWidget.css'

const LinkWidget = ({ data }: any) => {
  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader
          title={data?.title ? data?.title : data?.teacher_title}
          desc={data?.teacher_description}
          faviconLink={data?.favicon}
          url={data?.url}
        />

        <Grid gap={1} container item xs={12}>
          {data?.image && (
            <Grid item xs={3}>
              <Typography
                component={'a'}
                className="link-widget-container"
                href={data?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={data?.image} alt="image" />
              </Typography>
            </Grid>
          )}
          <Grid item xs={data?.image ? 8 : 12}>
            <Typography>{data?.description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LinkWidget
