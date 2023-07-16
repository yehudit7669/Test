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
import Popup from '../../../../common/popup/Popup'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import PopperToCopy from '../../../../common/popperToCopy/PopperToCopy'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { routes } from '../../../../../constants'

export default function CustomerList() {
  const dispatch = useAppDispatch()
  const [, setError] = useState('')
  const [, setLoading] = useState(false)
  const { customers } = useAppSelector((state: any) => state.customer)
  const { t } = useTranslation()
  const customersTitle = [
    t('adminDashboard.customer.customerTitle.schoolName'),
    t('adminDashboard.customer.customerTitle.owner'),
    t('adminDashboard.customer.customerTitle.ownerEmail'),
    t('adminDashboard.customer.customerTitle.seats'),
    t('adminDashboard.customer.customerTitle.lastUpdate'),
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
                  <TableCell align="center">
                    <Link
                      to={`/${routes.ADMIN_DASHBOARD}/${customer?.id}/${routes.EDIT}`}
                    >
                      {customer.schoolname}
                    </Link>
                  </TableCell>
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
                            customer.password,
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
                          handleClickOpen(customer.schoolname, customer.id)
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
              <TableRow>
                <TableCell align="center" colSpan={customersTitle.length}>
                  There are no customers
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Popup
        cancleButton={true}
        submitButton={true}
        cancleText={t('adminDashboard.customer.popup.cancleButton')}
        submitText={t('adminDashboard.customer.popup.submitButton')}
        title={t('adminDashboard.customer.popup.title')}
        handleClose={handleClose}
        onSubmit={() => deleteCustomers(customerId)}
        open={open}
        classNameDialog="deleteCustomerPopup"
        classNameDialogActions="dialogActions"
        classNameCloseIcon="closeIcon"
        classNameTitle="title"
        classNameCancleButton="cancleButton"
        classNameSubmitButton="submitButton"
      >
        <span className="popupSpan">{`${t(
          'adminDashboard.customer.popup.bodyText',
        )} ${customerName}?`}</span>
      </Popup>

      <PopperToCopy
        open={openLink}
        text={link}
        anchorEl={anchorEl}
        placement={placement}
        classNameTypography="typography"
        classNameData="copyData"
        classNameIcon="copyIcon"
        color="#D4D4D4"
      />
      <PopperToCopy
        open={openPassword}
        text={password}
        anchorEl={anchorEl}
        placement={placement}
        classNameTypography="typography"
        classNameData="copyData"
        classNameIcon="copyIcon"
        color="#D4D4D4"
      />
    </>
  )
}
