import {
  compareAsc,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInSeconds,
  getDaysInMonth,
  isSameDay,
  toDate,
} from 'date-fns'

export function formatDistanceToNow<DateType extends Date>(
  dirtyDate: DateType | number,
  now: DateType | number = Date.now(),
): string {
  const comparison = compareAsc(dirtyDate, now)

  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value')
  }

  let dateLeft
  let dateRight

  if (comparison > 0) {
    dateLeft = toDate(now)
    dateRight = toDate(dirtyDate)
  } else {
    dateLeft = toDate(dirtyDate)
    dateRight = toDate(now)
  }

  const minutesInYear = 525600
  const minutesInMonth =
    Math.min(getDaysInMonth(dateRight), getDaysInMonth(dateLeft)) * 1440

  const seconds = differenceInSeconds(dateRight, dateLeft)
  const offsetInSeconds =
    (getTimezoneOffsetInMilliseconds(dateRight) -
      getTimezoneOffsetInMilliseconds(dateLeft)) /
    1000
  const minutes = Math.round((seconds - offsetInSeconds) / 60)
  const past = comparison < 0

  if (isSameDay(dateRight, dateLeft)) {
    return 'today'
  }

  if (minutes < minutesInMonth) {
    const days = differenceInCalendarDays(dateRight, dateLeft)

    if (Math.abs(days) === 1) {
      return past ? 'yesterday' : 'tomorrow'
    } else {
      return localize('day', days, past)
    }
  }

  if (minutes < minutesInYear) {
    const months = differenceInCalendarMonths(dateRight, dateLeft)
    return localize('month', months, past)
  }

  const years = differenceInCalendarYears(dateRight, dateLeft)
  return localize('year', years, past)
}

function getTimezoneOffsetInMilliseconds(date: Date): number {
  const utcDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  )
  utcDate.setUTCFullYear(date.getFullYear())
  return date.getTime() - utcDate.getTime()
}

function localize(type: 'day' | 'month' | 'year', diff: number, past: boolean): string {
  const plural = diff > 1 ? 's' : ''

  if (past) {
    return `${diff} ${type}${plural} ago`
  } else {
    return `in ${diff} ${type}${plural}`
  }
}
