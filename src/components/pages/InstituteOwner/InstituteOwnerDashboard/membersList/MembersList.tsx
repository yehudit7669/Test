import { useAppSelector } from '../../../../../hooks/redux-hooks'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function MembersList() {
  const { teachers } = useAppSelector((state: any) => state.teacher)
  const membersTitle = [
    'First name',
    'Last name',
    'Email',
    'Status',
    'Impact',
    'WS',
    'Asgmt.',
    'Students',
    'Subm.',
    'Last login',
  ]

  return (
    <>
      <TableContainer className="tableContainer" style={{ marginTop: '30px' }}>
        <Table
          stickyHeader
          sx={{ minWidth: 360 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {membersTitle.map((title) => {
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
            {teachers.map((teacher: any) => (
              <TableRow
                key={teacher.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{teacher.firstName}</TableCell>
                <TableCell align="center">{teacher.lastName}</TableCell>
                <TableCell align="center">{teacher.email}</TableCell>
                <TableCell align="center">{teacher.status}</TableCell>
                <TableCell align="center">{teacher.impact}</TableCell>
                <TableCell align="center">{teacher.workSheet}</TableCell>
                <TableCell align="center">{teacher.asgmt}</TableCell>
                <TableCell align="center">{teacher.students}</TableCell>
                <TableCell align="center">{teacher.submitions}</TableCell>
                <TableCell align="center">{teacher.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
