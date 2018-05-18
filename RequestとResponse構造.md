# [Request]と[Response]の構造予定
## request
```http
POST /url HTTP/1.1
Authorization: token(login以外)
Content-Type: application/json
...

{
  "param1": "value1",
  "param2": "value2",
  ...
  "paramN": "valueN"
}
```
## response
```http
HTTP/1.1 200 message
Content-Type: application/json
...

{
  "status": 200,
  "message": "global-message",
  "results"?: {
    "param1": "value1",
    "param2": "value2",
    ...
    "paramN": "valueN"
  },
  "errors"?: {
    "errorCode": "errorCode",
    "params"?: [
      {
        "param": "param1",
        "value": "value1",
        "location": "body",
        "msg": "message1"
      },
      {
        "param": "param2",
        "value": "value2",
        "location": "header",
        "msg": "message2"
      },
      ...
      {
        "param": "paramN",
        "value": "valueN",
        "location": "query",
        "msg": "messageN"
      }
    ]
  }
}
```
