import { ChangeEvent, useState } from 'react'

interface Option {
  text: string
  index: number
  showUploadImage?: boolean
  imageUrl?: string
  checked?: boolean
}

interface MultipleChoiceProps {
  data: {
    title: string
    options: Option[]
    audio?: {
      url: string
      name: string
    }
    video?: {
      url: string
    }
  }
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Selected option:', selectedOption)
  }

  return (
    <div>
      <h2>{data.title}</h2>
      {data.options.map((option) => (
        <div key={option.index}>
          <input
            type="radio"
            name="option"
            value={option.text}
            checked={selectedOption === option.text}
            onChange={handleOptionChange}
          />
          <label>{option.text}</label>
          {option.imageUrl && <img src={option.imageUrl} alt="Option" />}
        </div>
      ))}
      {data.audio && <audio src={data.audio.url} controls />}
      {data.video && <video src={data.video.url} controls />}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default MultipleChoice
