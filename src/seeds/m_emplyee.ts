import MEmployee from './../models/types/m_employee'
module.exports = {
  name: 'm_employee',
  seeds: [
    {
      user_no: 1,
      employee_no: '0011',
      employee_name: 'テスト　太郎',
      password: '******1',
      token: null,
      entry_date: new Date(2015,3,1),
      birthday: new Date(1993,3,29)
    },
    {
      user_no: 2,
      employee_no: '0012',
      employee_name: 'テスト　花子',
      password: '******2',
      token: null,
      entry_date: new Date(2016,3,1),
      birthday: new Date(1993,5,29)
    },
    {
      user_no: 3,
      employee_no: '0013',
      employee_name: 'テスト　二郎',
      password: '******3',
      token: null,
      entry_date: new Date(2017,3,1),
      birthday: new Date(1993,11,29)
    },
    {
      user_no: 4,
      employee_no: '0014',
      employee_name: 'テスト　三郎',
      password: '******4',
      token: null,
      entry_date: new Date(2018,3,1),
      birthday: new Date(1993,0,29)
    }
  ]
} as {
  name: string
  seeds: MEmployee.Params[]
}
