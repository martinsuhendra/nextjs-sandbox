export const camelCaseToTitleCase = (field: string | undefined) => {
  if (!field) {
    return ''
  }
  const result = field.replace(/([A-Z])/g, ' $1')
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}
