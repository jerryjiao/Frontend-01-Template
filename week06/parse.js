const css = require('css')
// 这里的symbol是什么意思?
const EOF = Symbol("EOF")

let currentToken = null
let currentAttribute = null

let stack = [{type: "document", children:[]}]
let currentTextNode = null

let rules = []

function addCssRules(text) {
  let ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

function match(element, selector) {
  if(!selector || !element.attributes)
    return false
  if(selector.charAt(0) == "#") {
    let attr = element.attributes.filter(attr => attr.name === "id")[0]
    if(attr && attr.value === selector.replace("#", ''))
      return true
  } else if(selector.charAt(0) == ".") {
    let attr = element.attributes.filter(attr=> attr.name === "class")[0]
    if(attr && attr.value === selector.replace(".", ''))
      return true
  } else {
    if(element.tagName === selector) {
      return true
    }
  }
}

function specificity(selector) {
  let p = [0, 0, 0, 0]
  let selectorParts = selector.split("  ")
  for(let part of selectorParts) {
    if(part.charAt(0) == "#") {
      p[1] += 1
    } else if(part.charAt(0) == ".") {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }

  return p
}

function compare(sp1, sp2) {
  if(sp1[0] - sp2[0])
    return sp1[0]
}