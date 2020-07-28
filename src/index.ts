interface Token {
    type: string
    value: string
}

interface LiteralAstNode {
    type: string
    value: string
}

interface ExpressionAstNode {
    name: string
    type: string
    params: Array<AstNode>
}

type AstNode = LiteralAstNode | ExpressionAstNode

interface Ast {
    type: string
    body: Array<AstNode>
}

export const parseNumber = (
    tokens: Array<Token>,
    current: number,
): [number, LiteralAstNode] => [
    current + 1,
    {
        type: 'NumberLiteral',
        value: tokens[current].value,
    },
]

export const parseString = (
    tokens: Array<Token>,
    current: number,
): [number, LiteralAstNode] => [
    current + 1,
    {
        type: 'StringLiteral',
        value: tokens[current].value,
    },
]

export const parseExpression = (
    tokens: Array<Token>,
    current: number,
): [number, ExpressionAstNode] => {
    let token: Token = tokens[++current]

    if (!token || token.type !== 'name')
        throw new TypeError('invalid expression met')

    const node: ExpressionAstNode = {
        type: 'CallExpression',
        name: token.value,
        params: [],
    }
    token = tokens[++current]

    // code here

    return [++current, node]
}

export const parseToken = (
    tokens: Array<Token>,
    current: number,
): [number, AstNode] => {
    // code here
}

const parseProgram = (tokens: Array<Token>): Ast => {
    let current: number = 0
    let ast: Ast = {
        type: 'Program',
        body: [],
    }
    // code here
    return ast
}

export const parser = parseProgram
