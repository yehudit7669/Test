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
      <h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
      <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
      <div>{data.audio && <audio src={data.audio.url} controls />}</div>
      <div>{data.video && <video src={data.video.url} controls />}</div>
      <div
        className="worksheet-form-container"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input type="text" value={response} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default OpenQuestion
