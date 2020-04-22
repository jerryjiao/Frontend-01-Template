## 写一个正则表达式 匹配所有 Number 
```
 /^-?\d+$|^(-?\d+)(\.\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/g;
```

## 写一个utf-8编码函数
 var UTF8 = {
    encode: function(str) {
        var rs = '';
        for(var i of str) {
            var code = i.codePointAt(0);
                if(code < 128) {
                    rs += i;
                } else if(code > 127 && code < 2048) {
                    rs += String.fromCharCode((code >> 6) | 192, (code & 63) | 128);
                } else if(code > 2047 && code < 65536) {
                    rs += String.fromCharCode((code >> 12) | 224, ((code >> 6) & 63) | 128, (code & 63) | 128);
                } else if(code > 65536 && code < 1114112) {
                    rs += String.fromCharCode((code >> 18) | 240, ((code >> 12) & 63) | 128, ((code >> 6) & 63) | 128, (code & 63) | 128);
            }
        }
        console.log(rs);
        return rs;
    }
};

## 字符串正则匹配
```
^(?:['"\\bfnrtv\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fa-F]{4})*$
```
