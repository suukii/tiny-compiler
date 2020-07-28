import {
    tokenizeParenOpen,
    tokenizeParenClose,
    tokenizeNumber,
    tokenizeName,
    tokenizeString,
    skipWhiteSpace,
    tokenizer,
} from '../src/index'

describe('Tokenize Single Character', () => {
    test('open paren', () => {
        expect(tokenizeParenOpen('(', 0)).toEqual([
            1,
            { type: 'paren', value: '(' },
        ])
        expect(tokenizeParenOpen(')', 0)).toEqual([0, null])
        expect(tokenizeParenOpen('', 0)).toEqual([0, null])
    })
    test('close paren', () => {
        expect(tokenizeParenClose(')', 0)).toEqual([
            1,
            { type: 'paren', value: ')' },
        ])
        expect(tokenizeParenClose('(', 0)).toEqual([0, null])
        expect(tokenizeParenClose('', 0)).toEqual([0, null])
    })
})

describe('Tokenize Multiple Characters', () => {
    test('number', () => {
        expect(tokenizeNumber('123abc', 0)).toEqual([
            3,
            {
                type: 'number',
                value: '123',
            },
        ])
        expect(tokenizeNumber('123abc', 1)).toEqual([
            2,
            {
                type: 'number',
                value: '23',
            },
        ])
        expect(tokenizeNumber('123 456', 0)).toEqual([
            3,
            {
                type: 'number',
                value: '123',
            },
        ])
        expect(tokenizeNumber('abc', 0)).toEqual([0, null])
        expect(tokenizeNumber('', 0)).toEqual([0, null])
    })

    test('name', () => {
        expect(tokenizeName('suukii', 0)).toEqual([
            6,
            {
                type: 'name',
                value: 'suukii',
            },
        ])
        expect(tokenizeName('suukii7991', 0)).toEqual([
            6,
            {
                type: 'name',
                value: 'suukii',
            },
        ])
        expect(tokenizeName('suukii yeung', 0)).toEqual([
            6,
            {
                type: 'name',
                value: 'suukii',
            },
        ])
        expect(tokenizeName('123abc', 0)).toEqual([0, null])
        expect(tokenizeName('', 0)).toEqual([0, null])
    })
})

describe('String', () => {
    test('string', () => {
        expect(tokenizeString('"hello world"', 0)).toEqual([
            11,
            {
                type: 'string',
                value: 'hello world',
            },
        ])
        expect(tokenizeString('hello world', 0)).toEqual([0, null])
        expect(tokenizeString('"hello world', 0)).toThrow()
    })
})

describe('White Space', () => {
    test('skip white spaces', () => {
        expect(skipWhiteSpace(' ', 0)).toEqual([1, null])
        expect(skipWhiteSpace('', 0)).toEqual([0, null])
        expect(skipWhiteSpace(' abc', 0)).toEqual([1, null])
        expect(skipWhiteSpace('  ', 0)).toEqual([1, null])
    })
})

describe('Tokenizer', () => {
    test('tokenize', () => {
        const code = 'add 1 (add 2 3)'
        const tokens = [
            { type: 'name', value: 'add' },
            { type: 'number', value: '1' },
            { type: 'paren', value: '(' },
            { type: 'name', value: 'add' },
            { type: 'number', value: '2' },
            { type: 'number', value: '3' },
            { type: 'paren', value: ')' },
        ]
        expect(tokenizer(code)).toEqual(tokens)
    })
})
