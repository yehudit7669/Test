import { Grid } from '@mui/material'
import './TableWidget.css'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'

const TableWidget = ({ data }: any) => {
  console.log('TableWidget', data)
  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />
        <Grid item xs={12} textAlign={'center'}>
          <img
            src={data?.image?.url}
            height={data?.image?.height}
            width={data?.image?.width}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <RichTextEditor /> */}

          <table className="table-container-widget">
            <tbody className="table-body-container-widget">
              {' '}
              {data?.tablerows.map((item: any) => (
                <tr className="table-row-container-widget">
                  {item?.cols?.map((cols: any) => (
                    <td
                      className="table-item-container-widget"
                      dangerouslySetInnerHTML={{ __html: cols.text }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </div>
  )
}

export default TableWidget
