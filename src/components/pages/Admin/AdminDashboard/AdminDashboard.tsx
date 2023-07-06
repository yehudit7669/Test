import CustomerList from './customerList/CustomerList'
import './AdminDashboard.css'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import QuoteRequestList from './quoteRequestList/QuoteRequestList'
import { routes } from '../../../../constants'
import AdminMainLayout from '../../../layouts/AdminMainLayout'
import { useTranslation } from 'react-i18next'

function AdminDashboard() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className="adminDashboardContainer">
      <AdminMainLayout />
      <div className="listSpaces">
        <div
          className="newDeal"
          onClick={() =>
            navigate(`/${routes.ADMIN_DASHBOARD}/${routes.NEW_CUSTOMER}`)
          }
        >
          <Button variant="contained" className="buttonNewDeal">
            {t('adminDashboard.createNewDealButton')}
            {/* t('+ Create new deal') */}
          </Button>
        </div>
        <h1 className="quoteRequestTitle">
          {t('adminDashboard.quoteRequestList')}
        </h1>
        <QuoteRequestList />
        <h1 className="customerListTitle">
          {t('adminDashboard.customerList')}
        </h1>
        <CustomerList />
      </div>
    </div>
  )
}
export default AdminDashboard
