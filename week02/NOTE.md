# 编程语言通识

## 按语法分类
### 形式语言
* 0型: 无限制文法<br/>
等号左边不止一个 <a><b> ::= "c"

* 1型: 上下文相关文法<br/>
"a"<b>"c"::="a""x""c"

* 2型: 上下文无关文法<br/>
js, 大部分情况是上下文无关
* 3型: 正则文法<br/>
限制表达能力

## 产生式 BNF

```
<Number> = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

<DecimalNumber> = "0" | (("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") <Number>\* )

<PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "\*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>

<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>

```

## 类型系统
* 动态/静态
* 强类型/弱类型
* 复合类型
* 子类型
   <br>逆变/协变

# 词法和类型

## whitespace
* Tab
* VT
* FF
* SP
...
## LineTerminator
* <LF>
* <CR>
...
## comment
* //
* /* */

##  Token
  - Punctuator: 符号 比如 `> = < }`
  - Keywords：比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外
    - Future reserved Keywords: `eum`
  - IdentifierName：标识符
    - 变量名：不能用 Keywords
    - 属性：可以用 Keywords
  - Literal: 直接量
    - Number
      - 存储 Uint8Array、Float64Array
      - 各种进制的写法
        - 二进制0b
        - 八进制0o
        - 十进制0x
      - 实践
        - 比较浮点是否相等：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
        - 如何快捷查看一个数字的二进制：(97).toString(2)
    - String
      - Character
      - Code Point
      - Encoding
        - unicode编码 - utf
          - utf-8 可变长度 （控制位的用处）
      - Grammar
        - `''`、`""`、``` `
    - Boolean
    - Null
    - Undefind