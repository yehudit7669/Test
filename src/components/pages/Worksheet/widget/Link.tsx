const LinkWidget = ({ data }: any) => {
  const { url, teacher_title, teacher_description, description, favicon } = data

  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: teacher_title }} />
      <p dangerouslySetInnerHTML={{ __html: teacher_description }} />
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={favicon} alt="Favicon" />
      </a>
    </div>
  )
}

export default LinkWidget
