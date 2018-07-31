import MHoliday from './../models/types/m_holiday'
module.exports = {
  name: 'm_holiday',
  seeds: [
    {
      holiday_code: 1,
      holiday_type: 0,
      name: '有給休暇',
      addition_hours: 8,
      addition_dates: 1.0
    },
    {
      holiday_code: 2,
      holiday_type: 0,
      name: 'AM有休',
      addition_hours: 4,
      addition_dates: 0.5
    },
    {
      holiday_code: 3,
      holiday_type: 0,
      name: 'PM有休',
      addition_hours: 4,
      addition_dates: 0.5
    },
    {
      holiday_code: 4,
      holiday_type: 0,
      name: '休暇',
      addition_hours: 8,
      addition_dates: 1.0
    },
    {
      holiday_code: 5,
      holiday_type: 0,
      name: 'AM休暇',
      addition_hours: 4,
      addition_dates: 0.5
    },
    {
      holiday_code: 6,
      holiday_type: 0,
      name: 'PM休暇',
      addition_hours: 4,
      addition_dates: 0.5
    },
    {
      holiday_code: 7,
      holiday_type: 0,
      name: '代休',
      addition_hours: 8,
      addition_dates: 1.0
    },
    {
      holiday_code: 8,
      holiday_type: 0,
      name: 'AM半代',
      addition_hours: 4,
      addition_dates: 0.5
    },
    {
      holiday_code: 9,
      holiday_type: 0,
      name: 'PM半代',
      addition_hours: 4,
      addition_dates: 0.5
    },
    {
      holiday_code: 10,
      holiday_type: 0,
      name: '振替休日',
      addition_hours: 8,
      addition_dates: 1.0
    },
    {
      holiday_code: 11,
      holiday_type: 0,
      name: '早帰',
      addition_hours: 0,
      addition_dates: 0.0
    },
    {
      holiday_code: 12,
      holiday_type: 0,
      name: '遅刻',
      addition_hours: 0,
      addition_dates: 0.0
    },
    {
      holiday_code: 13,
      holiday_type: 0,
      name: '早退',
      addition_hours: 0,
      addition_dates: 0.0
    },
    {
      holiday_code: 14,
      holiday_type: 0,
      name: '欠勤',
      addition_hours: 0,
      addition_dates: 0.0
    },
    {
      holiday_code: 15,
      holiday_type: 0,
      name: '無給休暇',
      addition_hours: 0,
      addition_dates: 0.0
    }
  ]
} as {
  name: string,
  seeds: MHoliday.Params[]
}
