import { useParams } from 'react-router'
import Widget from './widget/Widget'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { getWorksheetById } from '../../../services/worksheet/worksheetServices'
import { Button, Divider, Grid, Stack } from '@mui/material'
import './Worksheet.css'
import { HandInWorkIcon } from '../../../assets/svgs/svg-components'
import { useTranslation } from 'react-i18next'
import Loader from '../../common/loader'

const Worksheet = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentSheetData = useAppSelector(
    (state) => state.worksheet.currentSheet,
  )
  const currentStyles = currentSheetData.style
  //   Flatten nested widgets into a single list of widgets
  const widgetList = currentSheetData?.widgets?.flat()
  //   Sorting widgets by sequence
  const sortedWidgetList = widgetList?.sort(
    (a: any, b: any) => a.seqid - b.seqid,
  )

  const fetchWorksheet = () => {
    dispatch(getWorksheetById(id, setError, setLoading))
  }
  useEffect(() => {
    fetchWorksheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const renderSavedAndHandInWorkButtons = () => {
    return (
      <>
        <Grid item xs={12} marginTop={10}>
          <Stack direction="column" spacing={2}>
            <Divider variant="middle" className="Divider" data-saved />
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button className="Button" variant="contained" data-savedbutton>
                {t('Widget.saved')}
              </Button>
              <Button className="Button" variant="contained" data-handinwork>
                <HandInWorkIcon />
                {t('Widget.handInWork')}
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </>
    )
  }

  if (loading) {
    return (
      <div className="Worksheet-container-loader">
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div className="Worksheet-container-error">{error}</div>
  }
  return (
    <main className="Worksheet_mainWrapper">
      <div className="Worksheet_ImgWrapper">
        <img
          className="Worksheet_CoverImg"
          src={currentStyles?.background.images[0].path}
        />
        <span className={currentStyles?.font?.className}>
          {currentSheetData?.name}
        </span>
      </div>
      <section className="Worksheet_section">
        {/* <p>{currentSheetData?.description}</p> */}
        {sortedWidgetList?.map((widget: any) => (
          <Widget key={widget.seqid} widget={widget} />
        ))}
        {renderSavedAndHandInWorkButtons()}
      </section>
    </main>
  )
}

export default Worksheet
