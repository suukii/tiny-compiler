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
    test('It can tokenize open parenthese.', () => {
        expect(tokenizeParenOpen('(', 0)).toEqual([
            1,
            { type: 'paren', value: '(' },
        ])
        expect(tokenizeParenOpen(')', 0)).toEqual([0, null])
        expect(tokenizeParenOpen('', 0)).toEqual([0, null])
    })
    test('It can tokenize close parenthese.', () => {
        expect(tokenizeParenClose(')', 0)).toEqual([
            1,
            { type: 'paren', value: ')' },
        ])
        expect(tokenizeParenClose('(', 0)).toEqual([0, null])
        expect(tokenizeParenClose('', 0)).toEqual([0, null])
    })
})

describe('Tokenize Multiple Characters', () => {
    test('It can tokenize numbers correctly.', () => {
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

    test('It can tokenize identifiers correctly', () => {
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

describe('Tokenize String', () => {
    test('It can tokenize string correctly.', () => {
        expect(tokenizeString('"hello world"', 0)).toEqual([
            13,
            {
                type: 'string',
                value: 'hello world',
            },
        ])
        expect(tokenizeString('hello world', 0)).toEqual([0, null])
        expect(() => tokenizeString('"hello world', 0)).toThrowError(
            'invalid string terminator',
        )
    })
})

describe('Tokenize White Space', () => {
    test('White spaces will be skipped.', () => {
        expect(skipWhiteSpace(' ', 0)).toEqual([1, null])
        expect(skipWhiteSpace('', 0)).toEqual([0, null])
        expect(skipWhiteSpace(' abc', 0)).toEqual([1, null])
        expect(skipWhiteSpace('  ', 0)).toEqual([1, null])
    })
})

describe('Tokenizer', () => {
    test('It can tokenize identifiers, number, parenthese, and white spaces.', () => {
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
    test('Uncorrectly closed parenthese will be tokenized too.', () => {
        const code = '(hello) (yoyo'
        const tokens = [
            { type: 'paren', value: '(' },
            { type: 'name', value: 'hello' },
            { type: 'paren', value: ')' },
            { type: 'paren', value: '(' },
            { type: 'name', value: 'yoyo' },
        ]
        expect(tokenizer(code)).toEqual(tokens)
    })
    test('It can not tokenize [.', () => {
        expect(() => tokenizer('yoyo[1]')).toThrowError(
            `I can't figure out this charater: [`,
        )
    })
})
