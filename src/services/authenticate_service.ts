import * as Config from 'config';
import * as my_config from 'my-config';
import * as jwt from 'jsonwebtoken';
import * as Sequelize from 'sequelize';
import Employee from "models/m_employee";
import * as Bluebird from 'bluebird';
import * as Express from 'express';

export default class AuthenticateService {
  /** 暗号化鍵configから取得 */
  private secret_key:string;
  /** 暗号化アルゴリズムconfigから取得 */
  private algorithm:string;

  /**
   * コンストラクタ
   */
  constructor(config:Config.IConfig) {
    const params = config.get<my_config.jwt_config>('jwt');
    const secret_key = params.authentication_secret_key;
    const algorithm = params.algorithm;
    // if (secret_key && algorithm) {
    this.secret_key = secret_key;
    this.algorithm = algorithm;
    // } else {
    //   throw new Error('config faild!');
    // }
  }

  public login_tes = (models:Sequelize.Models):Express.RequestHandler => {
    return (req, res, next) => {
      const body = req.body;
      body.password
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
            // 存在せず
            resolve({error: 'ユーザーIDもしくはパスワードが間違っています。'});
            return;
          } else {
            // tokenの生成
            const {employee_no, user_no} = employee;
            let token:string = jwt.sign({employee_no, user_no}, this.secret_key, {algorithm: this.algorithm});
            // token保存
            employee.token = token;
            employee
              .save()
              .then(() => {
                // tokenを返却
                return resolve({token: token});
              });
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
  public verifyToken = (Employee:Employee.Model, token:string):Bluebird<boolean> => {
    return new Bluebird((resolve, reject) => {
      jwt.verify(token, this.secret_key, {algorithms: [this.algorithm]}, (err, decoded) => {
        if (err) {
          // 複合化失敗
          resolve(false);
          return;
        }

        return Employee
          .findOne({
            where: {
              token: token,
              user_no: decoded['user_no']
            }
          })
          .then(employee => {
            if (!employee) {
              // 検索できず
              resolve(false);
              return;
            }
            // 成功
            resolve(true);
            return;
          });
      });
    });
  };
}