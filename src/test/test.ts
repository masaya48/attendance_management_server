import * as Config from 'config'
import S from './../libs/dbconn'
import S2 from './../libs/dbconn'

S2['aaaaaa'] = 'test'
console.log(S['aaaaaa'])
