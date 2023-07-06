const emailRegex: any =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const signUpValidations = (
  email: string,
  password: string,
  classCode: string,
  role: any
) => {
  let status
  let message
  if (role && role !== '' && role !== undefined && role === 'student') {
    if (!email || !password || !classCode) {
      status = true
      message = 'Please fill all the details.'
      return { message, status }
    }
  } else {
    if (!email || !password) {
      status = true
      message = 'Please fill all the details.'
      return { message, status }
    }
  }
  if (!emailRegex.test(email)) {
    status = true
    message = 'Please enter valid email address.'
    return { message, status }
  } else {
    status = false
    message = ''
    return { message, status }
  }
}
