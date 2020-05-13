// 本次编程上课有跟，后面没跟上
// 自己写的时候，跟着视频写的request，
// 后面写response的时候，因为也没有那么多时间了，参考了一位同学的作业
// 基本原理弄清楚了，状态机的写法也熟悉了
// 参考作业连接：https://github.com/nsuedu/Frontend-01-Template/blob/master/week05/Toy-Browser/client.js
// 后面代码没运行，但是基本逻辑有注释

const net =require("net")

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.path = options.path;
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};

    if(!this.headers["Content-Type"]) {
      this.headers["Content-Type"]="application/x-www-form-urlencodoed"
    }

    if(this.headers["Content-Type"] === "application/json")  {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencodoed") {
      //todo
      // console.log('this--->',this.body)
      this.bodyText = Object.keys(this.body).map(key=>`${key}=${encodeURIComponent(this.body[key])}`).join('&')
      this.headers["Content-length"] = this.bodyText.length;
    }
  }
  toString() {
    // todo
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(
      this.headers,
  )
      .map((key) => `${key}: ${this.headers[key]}`)
      .join('\r\n')}\r\n\r\n${this.bodyText}\r\n\r\n`;
  }
  open(method, url) {

  }
  send(connection) {
    // const parser = new ResponseParser
    return new Promise((resolve, reject) =>{
      if(connection){
      connection.write(this.toString())
    }
      else {
        console.log('this.host--->', this.host)
        console.log('this.port-->',this.port)
        connection = net.createConnection({
          host:this.host,
          port: this.port
        },()=>{
          console.log('this--->', this)
          connection.write(this.toString())
        })
      }
      // console.log('22222',connection)
      connection.on('data', (data)=>{
        console.log('data--->',data)
        resolve(data.toString())
        connection.end()
      })
      connection.on('err',(data)=>{
        reject(err)
        connection.end()
      })
    })
    //todo:
  }
}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END =1 
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITI_BODY = 7;
    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';

    this.bodyParser = null;

  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveParse(string.charAt(i))
    }
  }
  // 有限状态机
  receiveParse(char) {
    // 处理状态行
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
          // 如果到\r 就改变到  "状态行执行完毕" 状态
          this.current = this.WAITING_STATUS_LINE_END
      }
      if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME
      }
      else {
          this.statusLine += char;
      }
      
    }  else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME
      }
  }
          // 处理 请求头的 key/名称
          else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            }
            // headers执行到空行了，
            else if (char === '\r') {
                //  如果headers已经执行到最后了  当执行回车键的时候
                this.current = this.WAITING_HEADER_BLOCK_END;

                // 如果headers已经执行到最后了，则开始接收body o(╯□╰)o
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new TrunkedBodyParser();
                }
            }
            else {
                this.headerName += char;
            }
        }
        else if (this.current === this.WAITING_HEADER_SPACE) {
          if (char === ' ') {
              this.current = this.WAITING_HEADER_VALUE;
          }
      }

      // 处理 请求头的 value
      else if (this.current === this.WAITING_HEADER_VALUE) {
          if (char === '\r') {
              this.current = this.WAITING_HEADER_LINE_END;
              // 把当前的value 赋值给当前的header键
              this.headers[this.headerName] = this.headerValue;

              this.headerName = '';
              this.headerValue = '';
          } else {
              this.headerValue += char;
          }
      }

      //
      else if (this.current === this.WAITING_HEADER_LINE_END) {

          if (char === '\n') {
              // 到下一行了 重新执行 headers 名称的设置
              this.current = this.WAITING_HEADER_NAME;
          }
      }

      // headers最后一行 执行回车
      else if (this.current === this.WAITING_HEADER_BLOCK_END) {
          if (char === '\n') {
              this.current = this.WAITI_BODY;
          }
      }
      // 开始执行 bdoy内容解析
      else if (this.current === this.WAITI_BODY) {
          this.bodyParser.receiveChar(char);
      }

  }
}

/*
思路: 
    先读数字，
    然后当回车时忽略回车，
    然后再读字符，
    依次循环
*/
class TrunkedBodyParser {
  constructor() {
      // 十进制的
      this.WAITING_LENGTH = 0;
      this.WAITING_LENGTH_LINE_END = 1;
      this.READING_TRUNK = 2;
      this.WAITING_NEW_LINE = 3;
      this.WAITING_NEW_LINE_END = 4;


      this.length = 0;
      this.content = [];

      this.isFinished = false;

      this.current = this.WAITING_LENGTH;
  }
  receiveChar(char) {
      // 可以看到body的内容
      // console.log(JSON.stringify(char));

      // 在 this.WAITING_LENGTH 的状态下 获得当前字符块的长度
      if (this.current === this.WAITING_LENGTH) {
          if (char === '\r') {
              if (this.length === 0) {

                  // console.log('----打印出 content');
                  // console.log(this.content);

                  this.isFinished = true;
              }
              this.current = this.WAITING_LENGTH_LINE_END;
          } else {
              // 十进制的末尾加一位
              this.length *= 10;
              this.length += char.charCodeAt(0) - '0'.charCodeAt(0);

          }
      }

      // 
      else if (this.current === this.WAITING_LENGTH_LINE_END) {
          if (char === '\n') {
              this.current = this.READING_TRUNK;
          }
      }

      // 
      else if (this.current === this.READING_TRUNK) {
          this.content.push(char)
          this.length--;
          if (this.length === 0) {
              this.current = this.WAITING_NEW_LINE;
          }
      }

      // 
      else if (this.current === this.WAITING_NEW_LINE) {
          if (char === '\r') {
              this.current = this.WAITING_NEW_LINE_END;
          }
      }

      // 
      else if (this.current === this.WAITING_NEW_LINE_END) {
          if (char === '\n') {
              this.current = this.WAITING_LENGTH;
          }
      }
  }
}


void async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8888",
    path:"/",
    headers:{
      ["X-Foo2"]:"customed"
    },
    body: {
      name: "winter"
    }
  });
  // console.log('11111')
  let res = await request.send();
  console.log('res--->',res)
}()
