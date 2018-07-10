import * as moment from './../libs/moment'

export const now:(() => moment.Moment) = () => {
  return moment()
}

export const getTime:((minutes: number) => string) = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const min = minutes - hours * 60
  return '0' + hours + ':' + min + ':00'
}
