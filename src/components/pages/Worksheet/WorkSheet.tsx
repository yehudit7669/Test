import { useParams } from 'react-router'
import Widget from './widget/Widget'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { getWorksheetById } from '../../../services/worksheet/worksheetServices'
import { CircularProgress } from '@mui/material'
import './Worksheet.css'

const Worksheet = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentSheetData = useAppSelector(
    (state) => state.worksheet.currentSheet
  )
  const currentStyles = currentSheetData.style
  //   Flatten nested widgets into a single list of widgets
  const widgetList = currentSheetData?.widgets?.flat()
  //   Sorting widgets by sequence
  const sortedWidgetList = widgetList?.sort(
    (a: any, b: any) => a.seqid - b.seqid
  )

  const fetchWorksheet = () => {
    dispatch(getWorksheetById(id, setError, setLoading))
  }
  useEffect(() => {
    fetchWorksheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  console.log(currentSheetData)

  if (loading) {
    return (
      <div className="Worksheet-container-loader">
        <CircularProgress />
      </div>
    )
  }
  if (error) {
    return <div className="Worksheet-container-error">{error}</div>
  }
  return (
    <div
      className={`Worksheet-container `}
      style={{
        backgroundImage: `url(${currentStyles?.background.images[0].path})`,
        backgroundSize:
          currentStyles?.background.images[0]?.['background-size'],
        backgroundRepeat: currentStyles?.background.images[0]?.repeat,
      }}
    >
      <div className="worksheet-header">
        <h1>{currentSheetData?.name}</h1>
      </div>
      <div className="worksheet-background"></div>
      <div className="worksheet">
        <p>{currentSheetData?.description}</p>

        {sortedWidgetList?.map((widget: any) => (
          <Widget key={widget.seqid} widget={widget} />
        ))}
      </div>
    </div>
  )
}

export default Worksheet
