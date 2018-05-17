class BaseResponseDTO {
  protected readonly status:number
  protected readonly message:string
  protected readonly success:boolean
  public constructor(success:boolean, status:number, message:string) {
    this.success = success
    this.status = status
    this.message = message
  }
  public getStatus() {
    return this.status;
  }
  public getMessage() {
    return this.message;
  }
  public isSuccess() {
    return this.success
  }
}
export default BaseResponseDTO
