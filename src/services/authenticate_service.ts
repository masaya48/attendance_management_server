import * as Config from 'config';
import * as jwt from 'jsonwebtoken';
import * as Sequelize from 'sequelize';
import * as Employee from "models/m_employee";
import * as Bluebird from 'bluebird';

export class AuthenticateService {
  /** 暗号化鍵configから取得 */
  private secret_key:string;
  /** 暗号化アルゴリズムconfigから取得 */
  private algorithm:string;

  /**
   * コンストラクタ
   */
  constructor(config:Config.IConfig) {
    const params = config.get('jwt');
    const secret_key = params['authentication_secret_key'];
    const algorithm = params['algorithm'];
    if (secret_key && algorithm) {
      this.secret_key = secret_key;
      this.algorithm = algorithm;
    } else {
      throw new Error('config faild!');
    }
  }

  /**
   * ログイン
   */
  public login = (Employee:Employee.Model, emplyee_no:string, password:string):Bluebird<any> => {
    return Employee
      .findOne({
        where: {
          employee_no: emplyee_no,
          password: password
        }
      })
      .then((employee:Employee.Instance) => {
        return new Bluebird((resolve, reject) => {
          if (!employee) {
            resolve({error: 'ユーザーIDもしくはパスワードが間違っています。'});
            return;
          } else {
            const {employee_no, user_no} = employee;
            let token:string = jwt.sign({employee_no, user_no}, this.secret_key, {algorithm: this.algorithm});
            employee.token = token;
            employee.save();
            resolve({token: token});
            return;
          }
        });
      });
  };

  /**
   * ログアウト
   */
  public logout = () => {
    // いる？
  }

  /**
   * トークン複合化
   */
  public verifyToken = (token:string, config:Config.IConfig):Bluebird<boolean> => {
    return new Bluebird((resolve, reject) => {
      jwt.verify(token, this.secret_key, {algorithms: [this.algorithm]}, (err, decoded) => {
        if (err) {
          console.log('faild:' + JSON.stringify(decoded));
          resolve(false);
          return;
        }
        console.log('success:' + JSON.stringify(decoded));
        resolve(true);
        return;
      });
    });
  };
}