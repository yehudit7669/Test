import { Grid } from '@mui/material'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'
import './linkWidget.css'

const LinkWidget = ({ data }: any) => {
  console.log('Link widget', data)
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
              <a
                className="link-widget-container"
                href={data?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={data?.image} alt="image" />
              </a>
            </Grid>
          )}
          <Grid item xs={data?.image ? 8 : 12}>
            <p>{data?.description}</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LinkWidget
