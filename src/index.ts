interface Token {
    type: string
    value: string
}

type TokenPos = [number, Token | null]

interface TokenizerFunc {
    (input: string, current: number): TokenPos
}

const tokenizeCharacter = (
    type: string,
    value: string,
    input: string,
    current: number,
): TokenPos => {
    return [0, null]
}

export const tokenizeParenOpen = (input: string, current: number): TokenPos => {
    return [1, { type: 'paren', value: '(' }]
}

export const tokenizeParenClose = (
    input: string,
    current: number,
): TokenPos => {
    return [1, { type: 'paren', value: ')' }]
}

const tokenizePattern = (
    type: string,
    pattern: RegExp,
    input: string,
    current: number,
): TokenPos => {
    return [0, null]
}

export const tokenizeNumber = (input: string, current: number): TokenPos => {
    return [0, null]
}

export const tokenizeName = (input: string, current: number): TokenPos => {
    return [0, null]
}

export const tokenizeString = (input: string, current: number): TokenPos => {
    return [0, null]
}

export const skipWhiteSpace = (input: string, current: number): TokenPos => {
    return [0, null]
}

const tokenizers: Array<TokenizerFunc> = [
    skipWhiteSpace,
    tokenizeString,
    tokenizeName,
    tokenizeNumber,
    tokenizeParenClose,
    tokenizeParenOpen,
]

export const tokenizer = (input: string): Array<Token> => {
    let current: number = 0
    const tokens: Array<Token> = []

    return tokens
}
