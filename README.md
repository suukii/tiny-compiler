# Build Your Own Tiny Compiler - #1 词法分析器 tokenizer

在编译过程中，parsing 一般分为两个阶段：词法分析(Lexical Analysis)、语法分析(Syntactic Analysis)。

1. 词法分析：将源码字符串拆成一系列 token，负责这个工作的机器叫做 `词法分析器`(`tokenizer`, `lexer`)，也就是我们上一节中完成的任务。

2. 语法分析：负责将 token 按照一定规则重新组合，转换成另一种抽象的形式，比如 AST(抽象语法树)，用来表示 token 之间的关系，一般负责这个工作的程序就做 `语法分析器`(`parser`)。

在这一节我们要写一个超迷你的词法分析器，这个词法分析器的任务就是：将输入的 `代码字符串` 转换成一系列 `token` 之后输出。它只要处理 3 种简单的 token 就行:

-   单个字符: `(` 和 `)`
-   多个字符: 比如 `name` 或者 `12`
-   字符串: 包裹在双引号 `"` 之间的内容，`"hello"`

输出的 token 格式：

```ts
type TokenPos = [
    number,
    {
        type: string
        value: string
    },
]
```

数组第 1 项是 token 的长度，第 2 项是 token 的详细信息，包括 `type`(类型) 和 `value`(值)。

token 的类型包括：

-   `paren`: 括号，只包括 `(` 和 `)`。
-   `string`: 字符串，用双引号包裹起来的内容，不考虑转义字符。
-   `number`: 数字，`[0-9]`。
-   `name`: 标识符，只能使用 `[a-zA-Z]` 字符。

**我们的任务是，阅读以下内容，并实现 `src/index.ts` 中定义的所有函数，然后通过 `npm test` 来测试你的代码。**

p.s. 使用 `npm run dev` 会监控 `src/index.ts` 的变化并重新执行该文件。

## 任务 1: 分析单个字符

实现两个函数 `tokenizeParenOpen` 和 `tokenizeParenClose`，分别分析 `(` 和 `)`，函数接收 2 个参数，第 1 个是代码字符串，第 2 个是从第 n 个字符开始分析代码。

任务：

```js
const tokenizeParenOpen = (input, current) => {
    // code here...
}

const tokenizeParenClose = (input, current) => {
    // code here...
}
```

示例：

```js
tokenizeParenOpen('(', 0) // [1, { type: 'paren', value: '(' }]

tokenizeParenClose('hello', 0) // [0, null]
```

其实这两个函数非常相似，我们还可以把相同的逻辑抽出来写成一个函数。

```js
// 单字符分析器
const tokenizeCharacter = (type, value, input, current) => {
    // code here
}

// 开括号分析器
const tokenizeParenOpen = (input, current) =>
    tokenizeCharacter('paren', '(', input, current)

// 闭括号分析器
const tokenizeParenClose = (input, current) =>
    tokenizeCharacter('paren', ')', input, current)
```

## 任务 2: 分析单多个字符

我们上面说了，多字符 token 就包括 2 种：`name` 和 `number`，分析这两种 token 的不同只在于匹配的正则，所以我们也可以考虑写一个一般的处理多字符的分析器，再通过参数来分别处理标识符和数字。

任务：

```js
const tokenizePattern = (type, pattern, input, current) => {
    // code here
}
```

示例：

```js
// 数字分析器
const tokenizeNumber = (input, current) =>
    tokenizePattern('number', /[0-9]/, input, current)
tokenizeNumber('123', 0) // [3, { type: 'number', value: '123' }]

// 标识符分析器
const tokenizeName = (input, current) =>
    tokenizePattern('name', /[a-z]i/, input, current)
tokenizeNumber('age', 0) // [3, { type: 'name', value: 'age' }]
```

## 任务 3: 分析字符串

在这里我们说的字符串就是双引号 `"` 之间的内容。

任务：

```js
const tokenizeString = (input, current) => {
    // code here
}
```

示例：

```js
tokenizeString('"hello world"', 0) //  [ 13, { type: 'string', value: 'hello world' } ]
```

## 任务 4: 跳过空格

空格是没有意义的，所以我们还需要一个函数来跳过空格。

任务：

```js
const skipWhiteSpace = (input, current) => {
    // code here
}
```

示例：

```js
skipWhiteSpace(' 123', 0) //  [ 1, null ]
skipWhiteSpace('123', 0) //  [ 0, null ]
```

## 任务 5: 组合起来

现在已经有了我们所需要的各类 token 分析器了，我们来把它们组合起来吧。

任务：

```js
const tokenizers = [
    skipWhiteSpace,
    tokenizeParenOpen,
    tokenizeParenClose,
    tokenizeString,
    tokenizeNumber,
    tokenizeName,
]

const tokenizer = input => {
    // code here
}
```

说明：

`tokenizer` 的任务就是接收一个代码字符串 `input`，尝试把代码喂给所有 token 分析器，如果有 token 生成，就加入到 tokens 数组中，在分析结束后返回。如果所有分析器都无法基于 `input` 生成合法的 token，那就抛出错误。

## 小结

好了，任务就这么多，现在去 `src/index.ts` 文件中完成你的任务吧。

你可以执行 `npm run dev` 命令，然后在 `src/index.ts` 中使用 `console.log` 来进行调试，或者也可以使用 Quokka.js 之类的。

完成之后可以通过 `npm test` 来检查你的实现是否符合要求。
