abstract class BaseRequestDTO {
  protected readonly token: string
  constructor(token: string) {
    this.token = token
  }
  public getToken() {
    return this.token
  }
}
declare namespace BaseRequestDTO {
  interface IRequestBody {}
}
export default BaseRequestDTO
