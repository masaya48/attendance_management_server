import Service from './../domain/services/office_hours_service'
import * as moment from './../libs/moment'
console.log(moment().format())
console.log(moment('2018-07-05').toDate())
const start = moment()
const end = start.clone().add(60 * 11 + 1, 'minutes')
console.log(Service.calcRestTime(start, end))

