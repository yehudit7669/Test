import CustomerList from './customerList/CustomerList'
import './AdminDashboard.css'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import QuoteRequestList from './quoteRequestList/QuoteRequestList'

export default function AdminDashboard() {
  const navigate = useNavigate()
  return (
    <div className="adminDashboardContainer">
      <div className="listSpaces">
        <div
          className="divButton"
          onClick={() => navigate(`/admin/dashboard/new-customer`)}
        >
          <Button variant="contained" className="buttonNewDeal">
            + Create new deal
          </Button>
        </div>
        <h1 className="quoteRequestTitle">Quote request</h1>
        <QuoteRequestList />
        <h1 className="customerListTitle">Customer list</h1>
        <CustomerList />
      </div>
    </div>
  )
}
