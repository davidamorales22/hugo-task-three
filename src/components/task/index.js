import MomentUtils from '@date-io/moment'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import moment from 'moment'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Task = () => {
  const [iniDate, setIniDate] = React.useState(moment())
  const [finDate, setFinDate] = React.useState(moment())
  const [error, setError] = React.useState(null)
  const [type, setType] = React.useState(1)
  const handleChangeType = event => {
    setType(event.target.value)
  }
  const handleSubmit = () => {
    MySwal.fire(
      'Success',
      `You have booked a ${type === 1
        ? `one-way flight on ${iniDate.format('DD/MM/YYYY')}`
        : `return from ${iniDate.format('DD/MM/YYYY')} to ${finDate.format(
            'DD/MM/YYYY'
          )}`}`,
      'success'
    )
  }
  React.useEffect(
    () => {
      setError(
        iniDate.isAfter(finDate)
          ? 'The initial date is strictly before to return date.'
          : null
      )
      type === 1 && setFinDate(iniDate) // type 1 -> one-way-flight
    },
    [iniDate, finDate, type]
  )
  return (
    <Container maxWidth='sm'>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Box minHeight={600}>
          <Typography variant='h5' color='primary' align='center'>
            Flight Booker
          </Typography>
          <Divider />
          <Box height={24} />
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='select-label'>Options</InputLabel>
            <Select
              labelId='select-label'
              id='simple-select'
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value={1}>one-way flight</MenuItem>
              <MenuItem value={2}>return flight</MenuItem>
            </Select>
          </FormControl>
          <Box height={24} />
          <KeyboardDatePicker
            color='secondary'
            disableToolbar
            variant='inline'
            format='DD/MM/YYYY'
            label='From'
            margin='normal'
            value={iniDate}
            onChange={v => {
              setIniDate(v)
            }}
          />
          <Box height={24} />
          <KeyboardDatePicker
            color='secondary'
            disableToolbar
            variant='inline'
            format='DD/MM/YYYY'
            label='To'
            disabled={type === 1}
            margin='normal'
            value={finDate}
            onChange={v => {
              setFinDate(v)
            }}
          />
          {error &&
            <Alert severity='error'>
              {error}
            </Alert>}
          <Box height={24} />
          <Button
            variant='contained'
            disableElevation
            size='large'
            startIcon={<FontAwesomeIcon icon={faCheck} />}
            color='secondary'
            fullWidth
            disabled={error}
            onClick={handleSubmit}
          >
            Accept
          </Button>
        </Box>
      </MuiPickersUtilsProvider>
    </Container>
  )
}

export default Task
