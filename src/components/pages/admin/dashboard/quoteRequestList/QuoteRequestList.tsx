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
import Popup from '../../../../common/ui/popup/Popup'

export default function QuoteRequestList() {
  const dispatch = useAppDispatch()
  const [, setError] = useState('')
  const [, setLoading] = useState(false)
  const { quoteRequest } = useAppSelector((state) => state.quoteRequest)
  const quoteRequestsTitle = [
    'School name',
    'Owner',
    'Owner email',
    'Current seats',
    'Seats request',
    'Last update',
    'Status',
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
    <div style={{ paddingBottom: 30 }}>
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
                            Quote sent
                          </MenuItem>
                          <MenuItem value={StatusQuote.Pending}>
                            Pending
                          </MenuItem>
                          <MenuItem value={StatusQuote.Done}>Done</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {/* {quote.status} */}
                  </TableCell>
                  <TableCell align="right">
                    <div
                      onClick={() =>
                        handleClickOpen(quote.customerName, quote.id)
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
                  There are no quote requests
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        cancleButton={true}
        submitButton={true}
        cancleText="Cancle"
        submitText="Yes"
        title="Delete Quote"
        handleClose={handleClose}
        onSubmit={() => deleteQuoteRequest(quoteRequestId)}
        open={open}
      >
        <span className="popupSpan">{`Are you sure you want to delete the quote request of ${customerName}`}</span>
      </Popup>
    </div>
  )
}
