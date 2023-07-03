import { Link } from 'react-router-dom'
import './StudentDashboard.css'

export default function StudentDashboard() {
  return (
    <div>
      <div>
        <Link to={'/worksheet/D1OVW2'}>Worksheet 1</Link>
      </div>
      <div>
        <Link to={'/worksheet/TI2KSG'}>Worksheet 2</Link>
      </div>
      <div>
        <Link to={'/worksheet/KUGXFS'}>Worksheet 3</Link>
      </div>
    </div>
  )
}
