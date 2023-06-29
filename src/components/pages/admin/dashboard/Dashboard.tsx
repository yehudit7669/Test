import CustomerList from './customerList/CustomerList'
import QuoteRequestList from './quoteRequestList/QuoteRequestList'
import './Dashboard.css'
import Button from '@mui/material/Button'

export default function Dashboard() {
  return (
    <div className="listSpaces">
      <div className="divButton">
        <Button variant="contained" className="buttonNewDeal">
          + Cretae new deal
        </Button>
      </div>
      <h1 className="quoteRequestTitle">Quote request</h1>
      <QuoteRequestList />
      <h1 className="customerListTitle">Customer list</h1>
      <CustomerList />
    </div>
  )
}
