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
): TokenPos => (input[current] === value ? [1, { type, value }] : [0, null])

export const tokenizeParenOpen = (input: string, current: number): TokenPos =>
    tokenizeCharacter('paren', '(', input, current)

export const tokenizeParenClose = (input: string, current: number): TokenPos =>
    tokenizeCharacter('paren', ')', input, current)

const tokenizePattern = (
    type: string,
    pattern: RegExp,
    input: string,
    current: number,
): TokenPos => {
    let char: string = input[current]

    if (char && pattern.test(char)) {
        let consumedChars: number = 0
        let value: string = ''

        while (char && pattern.test(char)) {
            consumedChars++
            value += char
            char = input[++current]
        }

        return [consumedChars, { type, value }]
    }

    return [0, null]
}

export const tokenizeNumber = (input: string, current: number): TokenPos =>
    tokenizePattern('number', /[0-9]/, input, current)

export const tokenizeName = (input: string, current: number): TokenPos =>
    tokenizePattern('name', /[a-z]/i, input, current)

export const tokenizeString = (input: string, current: number): TokenPos => {
    let char: string = input[current]

    if (char === '"') {
        let consumedChars: number = 1
        let value: string = ''

        char = input[++current]
        while (char !== '"') {
            if (char === void 0)
                throw new TypeError('invalid string terminator')

            value += char
            consumedChars++
            char = input[++current]
        }
        return [
            consumedChars + 1,
            {
                type: 'string',
                value,
            },
        ]
    }

    return [0, null]
}

export const skipWhiteSpace = (input: string, current: number): TokenPos =>
    /\s/.test(input[current]) ? [1, null] : [0, null]

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

    while (current < input.length) {
        let tokenized: boolean = false

        for (let tokenizeFunc of tokenizers) {
            if (tokenized) break
            const [consumedChars, token] = tokenizeFunc(input, current)
            current += consumedChars

            consumedChars && (tokenized = true)
            token && tokens.push(token)
        }
        if (!tokenized)
            throw new TypeError(
                `I can't figure out this charater: ${input[current]}`,
            )
    }
    return tokens
}
