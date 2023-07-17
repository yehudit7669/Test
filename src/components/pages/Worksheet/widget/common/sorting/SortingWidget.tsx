import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  ListItemButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import './SortingWidget.css'
import RenderQuestionHeader from '../renderQuestions/RenderQuestionHeader'

interface Item {
  index: number
  text: string
}

interface Option {
  text: string
  index: number
  items: Item[]
}

const SortingWidget = ({ data }: any) => {
  const extractOptions = data?.groups?.map(
    (group: { header: { index: number; text: string } }) => {
      return {
        text: group.header.text,
        index: group.header.index,
        items: [],
      }
    },
  )

  const extractItems = data?.groups
    ?.map((group: { items: { index: number; text: string }[] }) => group.items)
    .flat()

  const [items, setItems] = useState<Item[]>(extractItems || [])
  const [options, setOptions] = useState<Option[]>(extractOptions || [])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [flyoutVisible, setFlyoutVisible] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleItemClick = (
    item: Item,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setSelectedItem(item)
    setAnchorEl(event.currentTarget)
    setFlyoutVisible(true)
  }

  const handleOptionClick = (optionId: number) => {
    if (selectedItem && options.length > 0) {
      const updatedItems = items.filter(
        (item) => item.index !== selectedItem.index,
      )
      setItems(updatedItems)

      const updatedOptions = options.map((option) => {
        if (option.index === optionId) {
          return {
            ...option,
            items: [...option.items, selectedItem],
          }
        }
        return option
      })

      setOptions(updatedOptions)
      setSelectedItem(null)
      setFlyoutVisible(false)
    }
  }
  const handleRemoveItemClick = (optionId: number, itemId: number) => {
    const updatedOptions = options.map((option) => {
      if (option.index === optionId) {
        const updatedItems = [...option.items]
        const removedItemIndex = updatedItems.findIndex(
          (item) => item.index === itemId,
        )
        if (removedItemIndex !== -1) {
          const removedItem = updatedItems.splice(removedItemIndex, 1)[0]
          setItems((prevItems) => [...prevItems, removedItem])
        }
        return {
          ...option,
          items: updatedItems,
        }
      }
      return option
    })

    setOptions(updatedOptions)
  }

  return (
    <div className="Widget_Container">
      <Grid container spacing={2}>
        <RenderQuestionHeader title={data?.title} desc={data?.description} />

        <Grid item xs={12}>
          <Grid container item xs={12}>
            <Box className="item-box">
              <Typography variant="h6">Items</Typography>
              <Grid item xs={12} display={'flex'} border={1}>
                {items?.map((item, i) => (
                  <ListItemButton
                    key={i}
                    className="item"
                    onClick={(event) => handleItemClick(item, event)}
                    alignItems="center"
                  >
                    <span dangerouslySetInnerHTML={{ __html: item?.text }} />
                  </ListItemButton>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6}>
            {options.length > 0 && (
              <Menu
                open={flyoutVisible}
                anchorEl={anchorEl}
                onClose={() => setFlyoutVisible(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {options?.map((option, i) => (
                  <MenuItem
                    key={i}
                    className="option-group"
                    onClick={() => handleOptionClick(option.index)}
                  >
                    <span dangerouslySetInnerHTML={{ __html: option.text }} />
                  </MenuItem>
                ))}
              </Menu>
            )}

            <Box className="option-box">
              <Typography variant="h6">Options</Typography>
              {options?.map((option) => (
                <div key={option.index} className="option">
                  <Typography
                    variant="subtitle1"
                    dangerouslySetInnerHTML={{ __html: option.text }}
                  />
                  <div className="option-items">
                    {option?.items?.map((item, i) => (
                      <div key={i} className="option-item">
                        <span
                          dangerouslySetInnerHTML={{ __html: item?.text }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            handleRemoveItemClick(option.index, item.index)
                          }
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SortingWidget
