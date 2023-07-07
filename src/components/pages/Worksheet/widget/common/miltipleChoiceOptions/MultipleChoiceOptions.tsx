import { Grid } from '@mui/material'
import './MultipleChoiceOptions.css'
import { CheckedCheckBoxIcon } from '../../../../../../assets/svgs/svg-components'

type Props = {
  options: any[]
  questionDirection: 'row' | 'column'
}

const MultipleChoiceOptions = ({ options, questionDirection }: Props) => {
  const letters = Array.from({ length: 29 }, (_, index) =>
    String.fromCharCode(65 + index)
  )

  // const handleCheckBoxSelect = (option,index) => {
  // console.log(option,'option')
  // if(options[index].checked === false){
  //     options[index].checked = true
  // }
  // else {
  //     options[index].checked = false
  // }
  // }
  return (
    <>
      <Grid container spacing={2} direction={questionDirection}>
        {options.map((option, index) => {
          return (
            <Grid item xs={4}>
              <div className={`Option_Container`}>
                {option.checked ? (
                  <div className="CheckBox_Common CheckedCheckbox">
                    <CheckedCheckBoxIcon />
                  </div>
                ) : (
                  <div
                    className="CheckBox_Common CheckBox"
                    // onClick={()=>handleCheckBoxSelect(option, index)}
                  >
                    {letters[index].toLowerCase()}
                  </div>
                )}
                <div className="Option_Text_Container">
                  <label
                    dangerouslySetInnerHTML={{ __html: option?.text }}
                    className="Option_Text"
                  />
                </div>
                {option?.imageUrl && (
                  <div className="Img_Container">
                    <img
                      src={option?.imageUrl}
                      className="Option_Image"
                      alt="Image"
                    />
                  </div>
                )}
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default MultipleChoiceOptions
