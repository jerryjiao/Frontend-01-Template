const net = require("net")
const parser = require("./parser.js")

class Request {
  constructor(options) {
    this.mthod = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path= options.path || "/"
    this.body = options.body || {}
    this.headers = options.headers || {}
    if(!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded"
    } 

    if(this.headers["Content-Type"]==="application/json")
      this.bodyText = JSON.stringify(this.body)
    else if(this.headers["Content-Type"] === "application/x-www-form-uelencoded")
      this.bodyText = Object.keys(this.body).map(key => `${key}=$`)
  }
}