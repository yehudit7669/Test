export const createAction = (type: string, payload: any) => {
  if (!type) {
    throw new Error('An action must have a type')
  }

  return { type, payload }
}

export default createAction
