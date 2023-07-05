import { useCallback, useEffect, useState } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import {
  deleteQuote,
  getAllQuoteRequests,
  updateQuoteRequestStatus,
} from '../../../../../services/quote/quoteServices'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { StatusQuote } from '../../../../../reducers/quoteReducer'
import { DeleteLogo } from '../../../../../assets/svgs/svg-components'
import './QuoteRequestList.css'
import Popup from '../../../../common/popup/Popup'
import { useTranslation } from 'react-i18next'

export default function QuoteRequestList() {
  const dispatch = useAppDispatch()
  const [, setError] = useState('')
  const [, setLoading] = useState(false)
  const { quoteRequest } = useAppSelector((state) => state.quoteRequest)
  const { t } = useTranslation()
  const quoteRequestsTitle = [
    t('adminDashboard.quoteRequest.quoteRequestsTitle.schoolName'),
    t('adminDashboard.quoteRequest.quoteRequestsTitle.owner'),
    t('adminDashboard.quoteRequest.quoteRequestsTitle.ownerEmail'),
    t('adminDashboard.quoteRequest.quoteRequestsTitle.currentSeats'),
    t('adminDashboard.quoteRequest.quoteRequestsTitle.seatsRequest'),
    t('adminDashboard.quoteRequest.quoteRequestsTitle.lastUpdate'),
    t('adminDashboard.quoteRequest.quoteRequestsTitle.status'),
  ]
  const [open, setOpen] = useState(false)
  const [customerName, setcustomerName] = useState('')
  const [quoteRequestId, setQuoteRequestId] = useState('')

  const handleClickOpen = (customerName: string, quoteId: string) => {
    setOpen(true)
    setcustomerName(customerName)
    setQuoteRequestId(quoteId)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderQuoteRequests = useCallback(() => {
    dispatch(getAllQuoteRequests(setError, setLoading))
  }, [dispatch, setError, setLoading])

  useEffect(() => {
    renderQuoteRequests()
  }, [renderQuoteRequests])

  const changeQuoteRequestStatus = (status: StatusQuote, id: string) => {
    dispatch(updateQuoteRequestStatus(status, id))
  }

  const deleteQuoteRequest = (id: string) => {
    dispatch(deleteQuote(setError, id))
    setOpen(false)
  }

  return (
    <div className="quoteRequestsContainer">
      <TableContainer component={Paper} className="tableContainerQuotes">
        <Table
          stickyHeader
          sx={{ minWidth: 360 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {quoteRequestsTitle.map((title) => {
                return <TableCell align="right">{title}</TableCell>
              })}
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            .
            {quoteRequest ? (
              quoteRequest.map((quote: any) => (
                <TableRow
                  key={quote.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{quote.schoolname}</TableCell>
                  <TableCell align="center">{quote.owner}</TableCell>
                  <TableCell align="center">{quote.owneremail}</TableCell>
                  <TableCell align="center">{quote.currentseats}</TableCell>
                  <TableCell align="center">{quote.seatsrequest}</TableCell>
                  <TableCell align="center">{quote.lastupdate}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select
                          sx={{
                            height: 30,
                            boxShadow: 'none',
                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={quote.status}
                          onChange={(event) => {
                            const target = event.target as HTMLSelectElement
                            const status = target.value as StatusQuote
                            changeQuoteRequestStatus(status, quote.id)
                          }}
                        >
                          <MenuItem value={StatusQuote.QuoteSent}>
                            {t(
                              'adminDashboard.quoteRequest.statusQuote.Quotesent'
                            )}
                          </MenuItem>
                          <MenuItem value={StatusQuote.Pending}>
                            {t(
                              'adminDashboard.quoteRequest.statusQuote.Pending'
                            )}
                          </MenuItem>
                          <MenuItem value={StatusQuote.Done}>
                            {t('adminDashboard.quoteRequest.statusQuote.Done')}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {/* {quote.status} */}
                  </TableCell>
                  <TableCell align="right">
                    <div
                      onClick={() =>
                        handleClickOpen(quote.schoolname, quote.id)
                      }
                      className="deleteLogo"
                    >
                      <DeleteLogo />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={quoteRequestsTitle.length}>
                  {t('adminDashboard.quoteRequest.noQuoteRequest')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        cancleButton={true}
        submitButton={true}
        cancleText={t('adminDashboard.quoteRequest.popup.cancleButton')}
        submitText={t('adminDashboard.quoteRequest.popup.submitButton')}
        title={t('adminDashboard.quoteRequest.popup.title')}
        handleClose={handleClose}
        onSubmit={() => deleteQuoteRequest(quoteRequestId)}
        open={open}
        classNameDialog="deleteQuotePopup"
        classNameDialogActions="dialogActions"
        classNameCloseIcon="closeIcon"
        classNameTitle="title"
        classNameCancleButton="cancleButton"
        classNameSubmitButton="submitButton"
      >
        <span className="popupSpan">{`${t(
          'adminDashboard.quoteRequest.popup.bodyText'
        )} ${customerName}?`}</span>
      </Popup>
    </div>
  )
}
