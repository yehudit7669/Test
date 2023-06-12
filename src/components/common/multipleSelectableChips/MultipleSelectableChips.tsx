import React, { Dispatch, SetStateAction } from 'react';
import { Chip, Stack } from "@mui/material";


type Props = {
    multipleSelectableChipDetails: {
    id:string,
    label:string, 
    selected:boolean
    }[],
    setMultipleSelectableChipsDetails:Dispatch<SetStateAction<{id:string,label:string,selected:boolean}[]>>,
    handleGetSelectedChipsDetails:(value:{id:string,label:string,selected:boolean}[])=>void
}

const MultipleSelectableChips = ({multipleSelectableChipDetails, setMultipleSelectableChipsDetails, handleGetSelectedChipsDetails}:Props) => {
    
    /* Function definition to select the tag on click */
    const handleSelectTags = (selectedvalue:{id:string,label:string,selected:boolean}, index:number) => {
        const newMultipleSelectableChipDetails = [...multipleSelectableChipDetails]
        if(selectedvalue.selected === false)
        {
            newMultipleSelectableChipDetails[index].selected = true
        }
        else
        {
            newMultipleSelectableChipDetails[index].selected = false
        }
        setMultipleSelectableChipsDetails([...newMultipleSelectableChipDetails])
  
        handleGetSelectedChipsDetails(newMultipleSelectableChipDetails)
      }
      /* Function definition to select the tag on click */

    return (
        <>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {
            multipleSelectableChipDetails?.map((tag:{id:string,label:string,selected:boolean},index:number)=>{
              return (
                <>
                <Chip
                  onClick={()=>handleSelectTags(tag,index)}
                  size="medium"
                  color={tag.selected ? "secondary" : "default"}
                  variant={tag.selected ? "filled" : "outlined"}
                  sx={{ color:tag.selected ? 'white' : 'default',fontSize:'16px' }}
                  label={tag.label}
                />
                </>
              )
            })
          }
        </Stack>
        </>
    )
}

export default MultipleSelectableChips