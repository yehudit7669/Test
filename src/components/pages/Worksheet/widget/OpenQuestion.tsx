import { ChangeEvent, useState } from 'react'

interface OpenQuestionProps {
  data: {
    title: string
    description: string
    audio?: {
      url: string
      name: string
    }
    video?: {
      url: string
    }
  }
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({ data }) => {
  const [response, setResponse] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value)
  }

  const handleSubmit = () => {
    console.log('User response:', response)
  }

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.audio && <audio src={data.audio.url} controls />}
      {data.video && <video src={data.video.url} controls />}
      <input type="text" value={response} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default OpenQuestion
