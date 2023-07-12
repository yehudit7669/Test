import { useState } from 'react'

interface ClickTypeBlankProps {
  data: {
    blankText: string
  }
}

const createWordBank = (wordBlankText: string): string[] => {
  const wordBank: string[] = []
  const regex = /<wmblank>(.*?)<\/wmblank>/g
  let match

  while ((match = regex.exec(wordBlankText)) !== null) {
    const word = match[1].trim()
    if (word) {
      wordBank.push(word)
    }
  }
  return wordBank
}

const ClickTypeBlank = ({ data }: ClickTypeBlankProps) => {
  const completeBlankText = data?.blankText

  const wordBlankTextToRender = completeBlankText.replace(
    /<wmblank>.*?<\/wmblank>/g,
    '<wmblank></wmblank>',
  )

  const wordBank = createWordBank(completeBlankText)
  const [inputValues, setInputValues] = useState<string[]>(
    Array(wordBank.length).fill(''),
  )

  const handleSelectChange = (index: number, value: string) => {
    const newInputValues: any = [...inputValues]
    const selectedValue = value !== '' ? value : undefined

    const valueIndex = newInputValues.indexOf(selectedValue)
    if (valueIndex !== -1) {
      newInputValues[valueIndex] = ''
    }
    newInputValues[index] = selectedValue

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
            <select
              className="blank-select-field"
              key={index}
              value={word || ''}
              onChange={(e) => handleSelectChange(inputIndex, e.target.value)}
            >
              <option value="">Select word</option>
              {wordBank.map((word, wordIndex) => (
                <option key={wordIndex} value={word}>
                  {word}
                </option>
              ))}
            </select>
          )
        } else {
          return (
            <span
              className="blank-text-parts"
              dangerouslySetInnerHTML={{ __html: part }}
              key={index}
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

export default ClickTypeBlank
