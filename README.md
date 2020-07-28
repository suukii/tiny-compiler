# 写一个超迷你的编译器 - #1 词法分析器 tokenizer

这个超迷你词法分析器的任务就是：将输入的 `代码字符串` 转换成一系列 `token` 之后输出。它只能处理 3 种简单的 token:

-   单个字符: `(` 和 `)`
-   多个字符: `name` 或者 `12`
-   字符串: 包裹在双引号 `"` 之间的内容

输出的 token 格式：

```js
;[
    5,
    {
        type: 'string',
        value: 'hello',
    },
]
```

数组第 1 项是 token 的长度，第 2 项是 token 的详细信息，包括 `类型` 和 `值`。

token 的类型包括：

-   `paren`: 括号，只包括 `(` 和 `)`
-   `string`: 字符串，用双引号包裹起来的内容，不考虑转义字符
-   `number`: 数字
-   `name`: 标识符，只能使用 `[a-zA-Z]` 字符

你的任务就是，阅读以下任务说明并实现 `src/index.ts` 文件中定义的所有函数，并通过 `npm test` 测试你的代码。

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

`tokenizer` 的任务就是接收一个代码字符串 `input`，在 `input` 上尝试所有 token 分析器，如果有 token 生成，就 push 到 tokens 数组中，在 `input` 分析结束后返回。如果试过所有分析器都无法生成合法的 token，那就抛出错误。
