import React, { useState } from 'react'
import './PuzzleGame.css'
import { Grid, Typography } from '@mui/material'
import useRandomColor from '../../../../../../hooks/useRandomColor'

type Props = {
  puzzleWidgetData: any
}

const PuzzleGame = ({ puzzleWidgetData }: Props) => {
  const [selectedLetterElement, setSelectedLetterElement] = useState<{
    letter: string
    x: number
    y: number
  } | null>(null)
  const [highlightedLetters, setHighlightedLetters] = useState<
    | {
        letter: string
        x: number
        y: number
      }[]
    | null
  >([])
  const [foundWords, setFoundWords] = useState<
    { foundWord: string; color: string }[]
  >([])
  const [foundLetters, setFoundLetters] = useState<
    { letter: string; x: number; y: number; backgroundColor: string }[]
  >([])

  const { generateRandomColor } = useRandomColor()

  /* Function definition to select an alphabet on click */
  const handleSelectAlphabet = (
    _element: { letter: string; x: number; y: number },
    rowIndex: number,
    colIndex: number,
  ) => {
    if (
      highlightedLetters &&
      highlightedLetters !== undefined &&
      highlightedLetters !== null &&
      highlightedLetters?.length > 2
    ) {
      const selectedWord = highlightedLetters
        .map((element) => element.letter)
        .join('')
      if (
        selectedWord &&
        selectedWord !== '' &&
        selectedWord !== undefined &&
        !puzzleWidgetData.grid.words.includes(selectedWord)
      ) {
        setSelectedLetterElement(null)
        setHighlightedLetters([])
      } else {
        const randomColor = generateRandomColor()
        setFoundWords((prevValue) => [
          ...prevValue,
          { foundWord: selectedWord, color: randomColor },
        ])
        const foundLetterArr = highlightedLetters?.map((element) => {
          return { ...element, backgroundColor: randomColor }
        })
        setFoundLetters((prevValue) => [...prevValue, ...foundLetterArr])
      }
    } else {
      const tempPuzzleWidgetDataGrid = puzzleWidgetData?.grid
      if (
        tempPuzzleWidgetDataGrid &&
        tempPuzzleWidgetDataGrid !== null &&
        tempPuzzleWidgetDataGrid !== undefined
      ) {
        const { letter, x, y } =
          tempPuzzleWidgetDataGrid.cells !== undefined &&
          Array.isArray(tempPuzzleWidgetDataGrid.cells) &&
          tempPuzzleWidgetDataGrid.cells[rowIndex][colIndex]
        const selectedElement = {
          letter,
          x,
          y,
        }
        setSelectedLetterElement(selectedElement)
        setHighlightedLetters([])
      }
    }
  }
  /* Function definition to select an alphabet on click */

  /* Function definition to perform operations when the letters are hovered */
  const handleHover = (_element: any, rowIndex: any, colIndex: any) => {
    const tempHighlightedLetters: any = []

    const currentHoveredElement = {
      letter: _element.letter,
      x: _element.x,
      y: _element.y,
    }

    if (selectedLetterElement) {
      const selectedRowIndex = puzzleWidgetData?.grid?.cells?.findIndex(
        (row: any) => {
          return row.some(
            (_elem: { letter: string; x: number; y: number }) =>
              _elem.letter === selectedLetterElement.letter &&
              _elem.x === selectedLetterElement.x &&
              _elem.y === selectedLetterElement.y,
          )
        },
      )

      const selectedColIndex = puzzleWidgetData?.grid?.cells[
        selectedRowIndex
      ].findIndex((col: { letter: string; x: number; y: number }) => {
        return (
          col.letter === selectedLetterElement.letter &&
          col.x === selectedLetterElement.x &&
          col.y === selectedLetterElement.y
        )
      })

      /* If else condition to highlight same row upto the cursor hovered element */
      let i, j
      if (rowIndex === selectedRowIndex) {
        for (
          i = Math.min(selectedColIndex, colIndex);
          i <= Math.max(selectedColIndex, colIndex);
          i++
        ) {
          tempHighlightedLetters.push({
            letter: puzzleWidgetData?.grid?.cells[rowIndex][i].letter,
            x: puzzleWidgetData?.grid?.cells[rowIndex][i].x,
            y: puzzleWidgetData?.grid?.cells[rowIndex][i].y,
          })
        }
      }
      /* If else condition to highlight same row upto the cursor hovered element */

      /* If else condition to highlight same column upto the cursor hovered element */
      if (colIndex === selectedColIndex) {
        for (
          j = Math.min(selectedRowIndex, rowIndex);
          j <= Math.max(selectedRowIndex, rowIndex);
          j++
        ) {
          tempHighlightedLetters.push({
            letter: puzzleWidgetData?.grid?.cells[j][colIndex].letter,
            x: puzzleWidgetData?.grid?.cells[j][colIndex].x,
            y: puzzleWidgetData?.grid?.cells[j][colIndex].y,
          })
        }
      }
      /* If else condition to highlight same column upto the cursor hovered element */

      /* Function definition to check if the selected element is on the diagonal line or not */
      const isOnDiagonalLine = (
        rowIndex: number,
        colIndex: number,
        selectedRowIndex: number,
        selectedColIndex: number,
      ) => {
        return (
          Math.abs(rowIndex - selectedRowIndex) /
          Math.abs(colIndex - selectedColIndex)
        )
      }
      /* Function definition to check if the selected element is on the diagonal line or not */

      /* If else statement to highlight letters diagonally if the hovered element is on diagonal line */
      if (
        isOnDiagonalLine(
          rowIndex,
          colIndex,
          selectedRowIndex,
          selectedColIndex,
        ) === 1
      ) {
        const colStep = colIndex > selectedColIndex ? 1 : -1
        const rowStep = rowIndex > selectedRowIndex ? 1 : -1

        let currentRow = selectedRowIndex + rowStep
        let currentCol = selectedColIndex + colStep

        while (currentRow !== rowIndex && currentCol !== colIndex) {
          tempHighlightedLetters.push({
            letter:
              puzzleWidgetData?.grid?.cells[currentRow][currentCol].letter,
            x: puzzleWidgetData?.grid?.cells[currentRow][currentCol].x,
            y: puzzleWidgetData?.grid?.cells[currentRow][currentCol].y,
          })

          currentRow += rowStep
          currentCol += colStep
        }
      }
      /* If else statement to highlight letters diagonally if the hovered element is on diagonal line */

      const isSelectedElementHighlighted = tempHighlightedLetters.some(
        (element: { letter: string; x: number; y: number }) => {
          return (
            element.letter === selectedLetterElement.letter &&
            element.x === selectedLetterElement.x &&
            element.y === selectedLetterElement.y
          )
        },
      )
      const isCurrentHoveredElementHighlighted = tempHighlightedLetters.some(
        (element: { letter: string; x: number; y: number }) => {
          return (
            element.letter === currentHoveredElement.letter &&
            element.x === currentHoveredElement.x &&
            element.y === currentHoveredElement.y
          )
        },
      )
      !isCurrentHoveredElementHighlighted &&
        tempHighlightedLetters.push({ ...currentHoveredElement })
      !isSelectedElementHighlighted &&
        tempHighlightedLetters.unshift({ ...selectedLetterElement })

      setHighlightedLetters([...tempHighlightedLetters])
    }
  }
  /* Function definition to perform operations when the letters are hovered */
  return (
    <Grid container spacing={2} className="Puzzle_Container">
      <Grid
        item
        xs={
          puzzleWidgetData.level === 'beginner'
            ? 5.5
            : puzzleWidgetData.level === 'intermediate'
            ? 7
            : puzzleWidgetData.level === 'advanced'
            ? 7.5
            : 8
        }
        className="PuzzleGame_Container"
        style={{
          gridTemplateColumns: `repeat(${puzzleWidgetData?.grid?.width},  ${
            puzzleWidgetData.level === 'beginner'
              ? '35px'
              : puzzleWidgetData.level === 'intermediate'
              ? '30px'
              : puzzleWidgetData.level === 'advanced'
              ? '25px'
              : ''
          })`,
          gridTemplateRows: `repeat(${puzzleWidgetData?.grid?.height}, ${
            puzzleWidgetData.level === 'beginner'
              ? '35px'
              : puzzleWidgetData.level === 'intermediate'
              ? '30px'
              : puzzleWidgetData.level === 'advanced'
              ? '25px'
              : ''
          })`,
        }}
        onMouseLeave={() => setHighlightedLetters([])}
      >
        {puzzleWidgetData?.grid?.cells.map(
          (
            rowElement: {
              isSelected: boolean
              letter: string
              onCorrectPath: boolean
              onPath: boolean
              solvedColorClasses: []
              x: number
              y: number
            }[],
            rowIndex: number,
          ) => {
            return rowElement.map((columnElement, colIndex) => {
              return (
                <span
                  key={colIndex}
                  style={{
                    backgroundColor:
                      foundLetters
                        .filter(
                          (elem) =>
                            elem.letter === columnElement.letter &&
                            elem.x === columnElement.x &&
                            elem.y === columnElement.y,
                        )
                        .map((elem) => elem.backgroundColor)
                        .join('') || 'default',
                  }}
                  className={`Alphabet_Container 
              ${
                selectedLetterElement?.letter === columnElement.letter &&
                selectedLetterElement?.x === columnElement.x &&
                selectedLetterElement?.y === columnElement.y
                  ? 'selected'
                  : ''
              }
              ${
                highlightedLetters?.some(
                  (elem) =>
                    elem.x === columnElement.x && elem.y === columnElement.y,
                )
                  ? 'highlighted'
                  : ''
              }
              ${
                puzzleWidgetData.level === 'beginner'
                  ? 'beginner'
                  : puzzleWidgetData.level === 'intermediate'
                  ? 'intermediate'
                  : puzzleWidgetData.level === 'advanced'
                  ? 'advanced'
                  : ''
              }
              `}
                  onMouseEnter={() =>
                    handleHover(columnElement, rowIndex, colIndex)
                  }
                  onClick={() =>
                    handleSelectAlphabet(columnElement, rowIndex, colIndex)
                  }
                >
                  {columnElement.letter}
                </span>
              )
            })
          },
        )}
      </Grid>
      <Grid
        item
        xs={
          puzzleWidgetData.level === 'beginner'
            ? 6.5
            : puzzleWidgetData.level === 'intermediate'
            ? 5
            : puzzleWidgetData.level === 'advanced'
            ? 4.5
            : 4
        }
        className="Words_Container"
      >
        <Typography className="Word_Title">Words :</Typography>
        <div
          className="Words"
          style={{
            height: `${
              puzzleWidgetData?.grid?.height *
              (puzzleWidgetData.level === 'beginner'
                ? 33
                : puzzleWidgetData.level === 'intermediate'
                ? 29
                : puzzleWidgetData.level === 'advanced'
                ? 25
                : 0)
            }px`,
          }}
        >
          {puzzleWidgetData?.grid?.words.map((word: string, index: any) => {
            return (
              <React.Fragment key={index}>
                <Typography
                  sx={{
                    color:
                      foundWords
                        .filter((elem) => elem.foundWord === word)
                        .map((elem) => elem.color)
                        .join('') || 'default',
                    textDecoration:
                      foundWords
                        .filter((elem) => elem.foundWord === word)
                        .map(() => 'line-through')
                        .join('') || 'none',
                  }}
                  className="Single_Word"
                >
                  {word}
                </Typography>
              </React.Fragment>
            )
          })}
        </div>
      </Grid>
    </Grid>
  )
}

export default PuzzleGame
