import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

type Props = {
  deals: Array<any> | null
}
export const DealList = (props: Props) => {
  const { t } = useTranslation()

  const columnTitle = [
    t('NewCustomer.DealsInfo.DealList.numberSeats'),
    t('NewCustomer.DealsInfo.DealList.amountPaid'),
    t('NewCustomer.DealsInfo.DealList.startDate'),
    t('NewCustomer.DealsInfo.DealList.endDate'),
    t('NewCustomer.DealsInfo.DealList.PONumber'),
    t('NewCustomer.DealsInfo.DealList.quoteNumber'),
  ]
  return (
    <>
      <label>{t('NewCustomer.DealsInfo.pastDealsTitle')}</label>
      <TableContainer className="tableContainer">
        <Table
          stickyHeader
          sx={{ minWidth: 360 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {columnTitle.map((title) => {
                return (
                  <TableCell className="tableCell" align="right">
                    {title}
                  </TableCell>
                )
              })}
              <TableCell className="tableCell" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.deals ? (
              props?.deals?.map((deal: any) => (
                <TableRow
                  key={deal.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{deal?.numberSeats}</TableCell>
                  <TableCell align="center">{deal?.amountPaid}</TableCell>
                  <TableCell align="center">{deal?.startDate}</TableCell>
                  <TableCell align="center">{deal?.endDate}</TableCell>
                  <TableCell align="center">{deal?.poNumber}</TableCell>
                  <TableCell align="center">{deal?.quoteNumber}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={columnTitle.length}>
                  There are no deals
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
