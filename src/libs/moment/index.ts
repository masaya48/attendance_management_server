import * as moment from 'moment-timezone'
import config from './../config'
const timezone = config.moment.timezone
if (timezone) {
  // タイムゾーン設定
  moment.tz(timezone)
} else {
  moment.tz('Asia/Tokyo')
}
export = moment
