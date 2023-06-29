export const required = (value: any) => (value ? undefined : 'Required')

export const email = (value: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(value) ? undefined : 'Enter a valid email'
}
