function converStringToNumber(s, radix) {
    // radix取0当十进制解析，取2-36以外的数返回NaN
    if (radix && (radix < 2 || radix > 36)) return NaN;
    
    // 去除首尾空格
    const str = s.toString().trim();
    
    // 单独处理字符串为16进制的情况
    const matchResult16 = str.match(/^(\-|\+)?0[xX][abcde0-9]+/);
    if (matchResult16) return Number(matchResult16[0]);
    
    // 普通情况
    const matchResult = str.match(/^(\-|\+)?[0-9]+/);
    if (!matchResult) return NaN;
    
    const targetStr = matchResult[0];
    if (!radix) {
      // radix不传或传0按10进制解析
      return Number(targetStr);
    } else {
      // radix在2-36范围内
      // 需要考虑带符号的情况，只需要记录是不是负数最后取相反数即可
      const matchResultChar = targetStr.match(/^(\-|\+)/);
      let ifNegative = false;
      // 先假设不带符号
      let finalStr = targetStr;
      if (matchResultChar) {
        ifNegative = matchResultChar[0] === '-';
        // 去掉符号
        finalStr = targetStr.slice(1);
      }
      
      // 第一个数字不在radix进制的范围内则返回
      if (Number(finalStr.slice(0, 1)) >= radix) return NaN;

      let usedStr = '';
      // 把最终能转换的字符一个一个提取出来，直到遇到超出radix指定进制范围内的数字
      [...finalStr].some(i => {
        usedStr += i;
        return Number(i) >= radix;
      });
      
      // 把有用的数字字符用数组存起来
      const targetArr = [...usedStr];
      
      // 整个函数的灵魂：某进制转十进制
      const targetNum = targetArr
        .reverse()
        .reduce((acc, cur, idx) => acc + Number(cur) * Math.pow(radix, idx), 0);
      
      // 返回结果的时候别忘了先前带的符号！负数要计算相反数，至于为什么要用-0来减，因为有-0这种神奇的存在！至于为什么有-0，那又是另外一个故事了
      return ifNegative ? -0-targetNum : targetNum;
    }
  }

  function convertNumberToString(number, x = 10) {
    let integer = Math.floor(number);
    let decimal = number - integer;
    let string = !integer ? '0' : '';
    while (integer > 0) {
      string = `${integer % x}${string}`;
      integer = Math.floor(integer / x);
    }
  
    if (decimal) {
      string += '.';
      while (decimal && !/\.\d{20}$/.test(string)) {
        decimal *= x;
        string += `${Math.floor(decimal)}`;
        decimal -= Math.floor(decimal);
      }
    }
    return string;
}