import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { email } from '../../validationFields/validationFeilds'

type VoidFunction = (array: Array<string>) => void

type Props = {
  label: string
  placeholder: string
  setValue: VoidFunction
  value: Array<string>
}
export default function EmailsInput(props: Props) {
  return (
    <>
      <Autocomplete
        multiple
        style={{ maxHeight: '60' }}
        limitTags={4}
        id="multiple-limit-tags"
        options={[]}
        freeSolo
        onChange={(event, newValue) => {
          if (email((event.target as HTMLInputElement).value)) {
            newValue.pop()
            return
          }
          props.setValue(newValue)
        }}
        defaultValue={props.value}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            multiline
            maxRows={4}
            {...params}
            variant="outlined"
            label={props.label}
            placeholder={props.placeholder}
          />
        )}
      />
    </>
  )
}
