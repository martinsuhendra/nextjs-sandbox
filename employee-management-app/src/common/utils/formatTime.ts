import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(customParseFormat)

const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY'
const DEFAULT_TIME_FORMAT = 'HH:mm'
const DEFAULT_DATE_TIME_FORMAT = 'D MMM YYYY, hh:mm a'

export const convertDateWithTimeOption = (
  day: dayjs.Dayjs,
  timeOption: string
): number => {
  const [hour, minute] = timeOption.split(':')

  return day
    .hour(Number.parseInt(hour, 10))
    .minute(Number.parseInt(minute, 10))
    .valueOf()
}

export const getDate = (
  date?: string | number | Date | dayjs.Dayjs,
  format?: string
): dayjs.Dayjs => dayjs(date, format)

export const getCalendarDate = (day: dayjs.Dayjs) => day.calendar(dayjs())

export const getUTCNow = (): dayjs.Dayjs => dayjs.utc().utcOffset(8)

export const fDate = (day: dayjs.Dayjs, format = DEFAULT_DATE_FORMAT): string =>
  day.format(format)

export const fTime = (day: dayjs.Dayjs): string =>
  day.format(DEFAULT_TIME_FORMAT)

export const fDateTime = (day: dayjs.Dayjs): string =>
  day.format(DEFAULT_DATE_TIME_FORMAT)

export const getLastNDays = (day: dayjs.Dayjs, n: number): string =>
  fDate(day.subtract(n, 'day'))

export const getLastMonday = (day: dayjs.Dayjs): string => {
  const isTodaySunday = day.isSame(day.day(0))

  const lastMonday = isTodaySunday
    ? day.subtract(2, 'week').day(1)
    : day.subtract(1, 'week').day(1)

  return fDate(lastMonday)
}

// TODO: this is only used by big query queries
export const gOneMonthAndNow = (timestamp: number): string[] => {
  const now = dayjs(timestamp)
  const oneMonth = now.subtract(1, 'month').subtract(1, 'day')

  return [fDate(oneMonth), fDate(now)]
}

export const getGMTOffset = (date = new Date()) =>
  -date.getTimezoneOffset() / 60

export const getFromNow = (date: Date | string | number) =>
  dayjs(date).fromNow()

export const createTimeslots = (
  start = '00:00',
  end = '23:59',
  interval = 10
): string[] => {
  let startTime = dayjs(start, DEFAULT_TIME_FORMAT)
  let endTime = dayjs(end, DEFAULT_TIME_FORMAT)

  if (endTime.isBefore(startTime)) {
    endTime = endTime.add(1, 'd')
  }

  const timeslots = []

  while (startTime.isBefore(endTime)) {
    timeslots.push(fTime(startTime))
    startTime = startTime.add(interval, 'm')
  }

  return timeslots
}

export const getPickupTime = (day: dayjs.Dayjs): string => {
  const remainder = day.minute() % 10

  return remainder > 0 ? fTime(day.add(10 - remainder, 'm')) : fTime(day)
}
