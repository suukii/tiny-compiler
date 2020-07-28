import {
    parseString,
    parseNumber,
    parseExpression,
    parseToken,
    parser,
} from '../src/index'

test('It should be able to parse strings.', () => {
    const tokens = [
        {
            type: 'string',
            value: 'hello wolrd',
        },
    ]
    expect(parseString(tokens, 0)).toEqual([
        1,
        {
            type: 'StringLiteral',
            value: 'hello wolrd',
        },
    ])
})

test('It should be able to parse numbers.', () => {
    const tokens = [
        {
            type: 'number',
            value: '666',
        },
    ]
    expect(parseNumber(tokens, 0)).toEqual([
        1,
        {
            type: 'NumberLiteral',
            value: '666',
        },
    ])
})

describe('Parse Expression', () => {
    test('It should be able to parse expressions.', () => {
        const tokens = [
            {
                type: 'paren',
                value: '(',
            },
            {
                type: 'name',
                value: 'add',
            },
            {
                type: 'number',
                value: '1',
            },
            {
                type: 'number',
                value: '2',
            },
            {
                type: 'paren',
                value: ')',
            },
        ]
        expect(parseExpression(tokens, 0)).toEqual([
            tokens.length,
            {
                type: 'CallExpression',
                name: 'add',
                params: [
                    {
                        type: 'NumberLiteral',
                        value: '1',
                    },
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                ],
            },
        ])
    })

    test('It should be able to parse nested expressions.', () => {
        const tokens = [
            {
                type: 'paren',
                value: '(',
            },
            {
                type: 'name',
                value: 'add',
            },
            {
                type: 'number',
                value: '1',
            },
            {
                type: 'paren',
                value: '(',
            },
            {
                type: 'name',
                value: 'subtract',
            },
            {
                type: 'number',
                value: '5',
            },
            {
                type: 'number',
                value: '3',
            },
            {
                type: 'paren',
                value: ')',
            },
            {
                type: 'paren',
                value: ')',
            },
        ]
        expect(parseExpression(tokens, 0)).toEqual([
            tokens.length,
            {
                type: 'CallExpression',
                name: 'add',
                params: [
                    {
                        type: 'NumberLiteral',
                        value: '1',
                    },
                    {
                        type: 'CallExpression',
                        name: 'subtract',
                        params: [
                            {
                                type: 'NumberLiteral',
                                value: '5',
                            },
                            {
                                type: 'NumberLiteral',
                                value: '3',
                            },
                        ],
                    },
                ],
            },
        ])
    })
})

test('It should be able to parse strings, numbers, or expressions.', () => {
    const tokens = [
        { type: 'string', value: 'Hello' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '4' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
    ]
    expect(parseToken(tokens, 0)).toEqual([
        1,
        {
            type: 'StringLiteral',
            value: 'Hello',
        },
    ])
    expect(parseToken(tokens, 1)).toEqual([
        2,
        {
            type: 'NumberLiteral',
            value: '2',
        },
    ])
    expect(parseToken(tokens, 2)).toEqual([
        7,
        {
            type: 'CallExpression',
            name: 'add',
            params: [
                {
                    type: 'NumberLiteral',
                    value: '4',
                },
                {
                    type: 'NumberLiteral',
                    value: '2',
                },
            ],
        },
    ])
})

test('It should be able to generate an ast.', () => {
    const tokens = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'print' },
        { type: 'string', value: 'Hello' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },
    ]
    expect(parser(tokens)).toEqual({
        body: [
            {
                name: 'print',
                params: [
                    {
                        type: 'StringLiteral',
                        value: 'Hello',
                    },
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                ],
                type: 'CallExpression',
            },
            {
                name: 'add',
                params: [
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                    {
                        name: 'subtract',
                        params: [
                            {
                                type: 'NumberLiteral',
                                value: '4',
                            },
                            {
                                type: 'NumberLiteral',
                                value: '2',
                            },
                        ],
                        type: 'CallExpression',
                    },
                ],
                type: 'CallExpression',
            },
        ],
        type: 'Program',
    })
})
