import { useParams } from 'react-router'
import Widget from './widget/Widget'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { getWorksheetById } from '../../../services/worksheet/worksheetServices'
import { CircularProgress } from '@mui/material'
import './Worksheet.css'

const Worksheet = () => {
  const currentSheetData = useAppSelector(
    (state) => state.worksheet.currentSheet
  )
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  //   console.log('Worksheet id', id)
  const fetchWorksheet = () => {
    dispatch(getWorksheetById(id, setError, setLoading))
  }
  useEffect(() => {
    fetchWorksheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return (
      <div className="Worksheet-container">
        <CircularProgress />
      </div>
    )
  }
  return (
    <div className="worksheet-container">
      <h1>Hello</h1>
      {error}

      <h1>{currentSheetData?.name}</h1>
      <p>{currentSheetData?.description}</p>
      {currentSheetData?.widgets?.map((widget: any, index: number) => (
        <Widget key={index} widget={widget} />
      ))}
    </div>
  )
}

export default Worksheet
