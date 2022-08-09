import numeral from 'numeral'

export const fCurrency = (value: string | number) =>
  numeral(value).format('$ 0,0.00')
