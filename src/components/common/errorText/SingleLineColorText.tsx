import { Typography } from '@mui/material'

type Props = {
  text: string
  variant: any
  component: any
  color: string
  align: 'right' | 'left' | 'center' | 'inherit' | 'justify'
}

const SingleLineColorText = ({
  text,
  variant,
  component,
  color,
  align,
}: Props) => {
  if (text)
    return (
      <Typography
        variant={variant}
        align={align}
        component={component}
        color={color}
      >
        {text}
      </Typography>
    )
  return null
}

export default SingleLineColorText
