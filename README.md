# Build Your Own Tiny Compiler - #3 代码生成器 emitter

编译的最后一步就是将 AST 转换成代码，这个代码可以是给计算机执行的机器代码，也可以是另一种高级语言。

这一节我们来完成一个代码生成器，将上一节中得到的 AST 转换成类似 C 语言语法的代码。

`(add 1 2)` 会被转换成 `add(1, 2)`。

## 任务 1: emitNumber

`emitNumber` 的任务是将 `NumberLiteral` 节点转换成代码字符串，这个函数已经写好了。

```ts
const emitNumber = (node: LiteralAstNode): string => `${node.value}`
```

## 任务 2: emitString

`emitString` 的任务是将 `StringLiteral` 节点转换成代码字符串，这个函数也已经写好了。

```ts
const emitString = (node: LiteralAstNode): string => `"${node.value}"`
```

## 任务 3: emitExpression

`emitExpression` 的任务是将 `CallExpression` 节点转换成代码字符串。

注意这两点，在 C 语言语法中：

-   函数名后面紧跟着开括号，而整个表达式以闭括号结束；
-   参数是由逗号隔开的；

另外还需要提醒一下，表达式的参数是需要递归处理的。

## 任务 4: emitProgram

`emitProgram` 的任务是将 `Program` 节点转换成代码字符串。

任务很简单，主要分两个：

-   对 `body` 中的所有节点进行转换；
-   在每一个表达式后面插入分号 `;` 和换行符 `\n`；

## 任务 5: emitter

`emitter` 的任务就是将以上几个函数统一起来，根据节点类型选择不同的转换函数，这个函数也已经完成了。所以，实际上你只需要完成任务 4 和 5 就行。

##  小结

好了，任务就这么多，现在去  `src/index.ts`  文件中完成你的任务吧。

你可以执行  `npm run dev`  命令，然后在  `src/index.ts`  中使用  `console.log`  来进行调试，或者也可以使用  Quokka.js  之类的。

完成之后可以通过  `npm test`  来检查你的实现是否符合要求。
