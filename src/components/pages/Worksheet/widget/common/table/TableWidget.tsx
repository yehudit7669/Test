import { Grid } from '@mui/material'
import './TableWidget.css'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'

const TableWidget = ({ data }: any) => {
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
          <table className="table-container-widget">
            <tbody className="table-body-container-widget">
              {data?.tablerows.map((item: any, indexing: number) => (
                <tr className="table-row-container-widget" key={indexing}>
                  {item?.cols?.map((cols: any, index: number) => (
                    <td
                      key={index}
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
