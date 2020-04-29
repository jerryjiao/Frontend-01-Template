# week03
## Atom
### Grammar
* 简单语句
* 组合语句
* 声明

### Runtime
* Completion Record
* LexicalEnvironment

### 简单语句
* ExpressionStatement
* EmptyStatement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakStatement
* ReturnStatement

### 复合语句
* BlockStatement
* IfStatement
* SwitchStatement
* IterationStatement
* WithStatement
* LabelledStatement
* TryStatement

### 声明
* FunctionDeclaration
* GeneratorDeclaration
* AsyncFunctionDeclaration
* AsyncGeneratorDeclaration
* VariableStatement
* ClassDeclaration
* LexicalDeclaration

## Object
1. state
2. identifier
3. behavior



## JS 标准里面有哪些对象是我们无法实现的，都有哪些特性

- Bound Function Exotic Objects
  - 有这些特性`[[Call]]` `[[Construct]]`
- Array Exotic Objects
  - 有这些特性`[[DefineOwnProperty]]` `ArrayCreate(length[,proto])` `ArraySpeciesCreate(originalArray,length)` `ArraySetLength(A,Desc)`
- String Exotic Objects
  - 有这些特性`[[GetOwnProperty]]` `[[DefineOwnProperty]]` `[[OwnPropertyKeys]]` `StringCreate(value,prototype)`
    `StringGetOwnProperty(S,P)`
- Arguments Exotic Objects
  - 有这些特性`[[GetOwnProperty]]` `[[DefineOwnProperty]]` `[[Get]]` `[[Set]]` `[[Delete]]` `CreateUnmappedArgumentsObject(argumentsList)` `CreateMappedArgumentsObject(func,formals,argumentsList,env)`
- Integer-Indexed Exotic Objects
  - 有这些特性`[[GetOwnProperty]]` `[[HasProperty]]` `[[DefineOwnProperty]]` `[[Get]]` `[[Set]]` `[[OwnPropertyKeys]]` `IntegerIndexedObjectCreate(prototype,internalSlotsList)` `IntegerIndexedElementGet(O,index)` `IntegerIndexedElementSet(O,index,value)`
- Module Namespace Exotic Objects
  - 有这些特性`[[SetPrototypeOf]]` `[[IsExtensible]]` `[[PreventExtensions]]` `[[GetOwnProperty]]` `[[DefineOwnProperty]]` `[[HasProperty]]` `[[Get]]` `[[Set]]` `[[Delete]]` `[[OwnPropertyKeys]]` `ModuleNamespaceCreate(module,exports)`
- Immutable Prototype Exotic Objects
  - 有这些特性`[[SetPrototypeOf]]` `SetImmutablePrototype`