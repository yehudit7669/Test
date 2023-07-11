import React, { useState } from 'react'

interface SelectTypeBlankProps {
  data: {
    blankText: string
  }
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const createWordBank = (wordBlankText: string): string[] => {
  const wordBank: string[] = []
  const regex = /<wmblank>(.*?)<\/wmblank>/g
  let match

  while ((match = regex.exec(wordBlankText)) !== null) {
    const word = match[1].trim()
    if (word) {
      wordBank.push(capitalizeFirstLetter(word))
    }
  }
  return wordBank
}

const SelectTypeBlank: React.FC<SelectTypeBlankProps> = ({ data }) => {
  const completeBlankText = data?.blankText || ''

  const wordBlankTextToRender = completeBlankText.replace(
    /<wmblank>.*?<\/wmblank>/g,
    '<wmblank></wmblank>',
  )

  const wordBank = createWordBank(completeBlankText)
  const [inputValues, setInputValues] = useState<string[]>(
    Array(wordBank.length).fill(''),
  )

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
  }

  const getProcessedText = () => {
    const blankTags = wordBlankTextToRender.match(/<wmblank><\/wmblank>/g)
    if (!blankTags) {
      return null
    }

    let currentIndex = 0
    return wordBlankTextToRender
      .split(/(<wmblank><\/wmblank>)/g)
      .map((part: string, index: number) => {
        if (part === '<wmblank></wmblank>') {
          const word = inputValues[currentIndex]
          const inputIndex = currentIndex
          currentIndex++
          return (
            <input
              className="blank-input-field"
              key={index}
              type="text"
              value={word}
              onChange={(e) => handleInputChange(inputIndex, e.target.value)}
            />
          )
        } else {
          return (
            <span
              className="blank-text-parts"
              dangerouslySetInnerHTML={{ __html: part }}
            ></span>
          )
        }
      })
  }

  const isWordEntered = (word: string): boolean => {
    return inputValues
      .map((value: string) => value.toLowerCase())
      .includes(word.toLowerCase())
  }

  return (
    <div className="word-blank-container">
      <div className="word-blank-text">{getProcessedText()}</div>

      <div className="word-bank">
        <h3>Word Bank:</h3>
        {wordBank.map((word, index) => (
          <div
            key={index}
            className={isWordEntered(word) ? 'strikethrough' : ''}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectTypeBlank
