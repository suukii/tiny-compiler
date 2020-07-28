type Token = [
    number,
    {
        type: string
        value: string
    } | null,
]

interface TokenizerFunc {
    (input: string, current: number): Token
}

const tokenizeCharacter = (
    type: string,
    value: string,
    input: string,
    current: number,
): Token => {}

export const tokenizeParenOpen = (input: string, current: number): Token => {}

export const tokenizeParenClose = (input: string, current: number): Token => {}

const tokenizePattern = (
    type: string,
    pattern: RegExp,
    input: string,
    current: number,
): Token => {}

export const tokenizeNumber = (input: string, current: number): Token => {}

export const tokenizeName = (input: string, current: number): Token => {}

export const tokenizeString = (input: string, current: number): Token => {}

const skipWhiteSpace = (input: string, current: number): Token => {}

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
