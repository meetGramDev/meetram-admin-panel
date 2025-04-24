export const subTypeFunction = (type: string) => {
  if (type === 'WEEKLY') {
    return '7 days'
  } else if (type === 'DAY') {
    return '1 day'
  } else if (type === 'MONTHLY') {
    return '1 month'
  }

  return ''
}
