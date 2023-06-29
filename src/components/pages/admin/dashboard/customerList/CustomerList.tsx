import { useCallback, useEffect, useState } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks'
import './CustomerList.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  getAllCustomers,
  deleteCustomer,
} from '../../../../../services/customer/customerServices'
import {
  DeleteLogo,
  LinkToDashboardLogo,
  PasswordLogo,
} from '../../../../../assets/svgs/svg-components'
import { PopperPlacementType } from '@mui/material/Popper'
import Popup from '../../../../common/ui/popup/Popup'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import PopperToCopy from '../../../../common/ui/popperToCopy/PopperToCopy'

export default function CustomerList() {
  const dispatch = useAppDispatch()
  const [, setError] = useState('')
  const [, setLoading] = useState(false)
  const { customers } = useAppSelector((state) => state.customer)
  const customersTitle = [
    'School name',
    'Owner',
    'Owner email',
    'seats',
    'Last update',
  ]
  const [open, setOpen] = useState(false)
  const [customerName, setcustomerName] = useState('')
  const [customerId, setcustomerId] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [openLink, setOpenLink] = useState(false)
  const [link, setLink] = useState('')
  const [openPassword, setOpenPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [placement, setPlacement] = useState<PopperPlacementType>()

  const handleClickOpen = (customerName: string, customerId: string) => {
    setOpen(true)
    setcustomerName(customerName)
    setcustomerId(customerId)
  }

  const handleClickLink =
    (newPlacement: PopperPlacementType, link: string) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
      setOpenLink((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
      setLink(link)
    }

  const handleClickPassword =
    (newPlacement: PopperPlacementType, password: string) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
      setOpenPassword((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
      setPassword(password)
    }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClosePassword = () => {
    setOpenPassword(false)
  }

  const handleCloseLink = () => {
    setOpenLink(false)
  }

  const deleteCustomers = (id: string) => {
    dispatch(deleteCustomer(setError, id))
    setOpen(false)
  }

  const renderCustomers = useCallback(() => {
    dispatch(getAllCustomers(setError, setLoading))
  }, [dispatch, setError, setLoading])

  useEffect(() => {
    renderCustomers()
  }, [renderCustomers])

  return (
    <>
      <TableContainer className="tableContainer">
        <Table
          stickyHeader
          sx={{ minWidth: 360 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {customersTitle.map((title) => {
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
            {customers ? (
              customers.map((customer: any) => (
                <TableRow
                  key={customer.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{customer.schoolname}</TableCell>
                  <TableCell align="center">{customer.firstname}</TableCell>
                  <TableCell align="center">{customer.email}</TableCell>
                  <TableCell align="center">{customer.numberseats}</TableCell>
                  <TableCell align="center">{customer.updatedat}</TableCell>
                  <TableCell align="center">
                    <div>
                      <ClickAwayListener
                        mouseEvent="onMouseDown"
                        onClickAway={handleClosePassword}
                      >
                        <span
                          onClick={handleClickPassword(
                            'bottom-end',
                            customer.password
                          )}
                          className="cursor"
                        >
                          <PasswordLogo />
                        </span>
                      </ClickAwayListener>
                      <ClickAwayListener
                        mouseEvent="onMouseDown"
                        onClickAway={handleCloseLink}
                      >
                        <span
                          onClick={handleClickLink('bottom-end', customer.link)}
                          className="cursor"
                          onMouseEnter={handleCloseLink}
                        >
                          <LinkToDashboardLogo />
                        </span>
                      </ClickAwayListener>

                      <span
                        onClick={() =>
                          handleClickOpen(customer.customerName, customer.id)
                        }
                        className="cursor"
                      >
                        <DeleteLogo />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>There are no customers</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Popup
        cancleButton={true}
        submitButton={true}
        cancleText="Cancle"
        submitText="Yes"
        title="Delete School"
        handleClose={handleClose}
        onSubmit={() => deleteCustomers(customerId)}
        open={open}
      >
        <span className="popupSpan">{`Are you sure you want to delete ${customerName} dashboard`}</span>
      </Popup>

      <PopperToCopy
        open={openLink}
        text={link}
        anchorEl={anchorEl}
        placement={placement}
      />
      <PopperToCopy
        open={openPassword}
        text={password}
        anchorEl={anchorEl}
        placement={placement}
      />
    </>
  )
}
