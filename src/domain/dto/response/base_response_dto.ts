abstract class BaseResponseDTO {
  protected readonly status:number
  protected readonly message:string
  public constructor(status:number, message:string) {
    this.status = status
    this.message = message
  }
  public getStatus() {
    return this.status;
  }
  public getMessage() {
    return this.message;
  }

  /**
   * @const
   */
  public _getResponseEntity():BaseResponseDTO.IResponseEntity {
    return {
      status: this.status,
      message: this.message,
      body: this.getResponseBody()
    }
  }
  abstract getResponseBody():BaseResponseDTO.IResponseBody
}
declare namespace BaseResponseDTO {
  interface IResponseBody {}
  interface IResponseEntity {
    status: number;
    message: string;
    body: IResponseBody;
  }
}
export default BaseResponseDTO;
