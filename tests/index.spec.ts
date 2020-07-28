import { emitNumber, emitString, emitExpression, emitter } from '../src/index'

test('It should handle NumberLiteral.', () => {
    const node = {
        type: 'NumberLiteral',
        value: '1',
    }
    expect(emitNumber(node)).toBe('1')
})

test('It should handle StringLiteral.', () => {
    const node = {
        type: 'StringLiteral',
        value: 'hello world',
    }
    expect(emitString(node)).toBe(`"hello world"`)
})

test('It should handle Program.', () => {
    const ast = {
        type: 'Program',
        body: [
            {
                type: 'CallExpression',
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
            },
            {
                type: 'CallExpression',
                name: 'add',
                params: [
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                    {
                        type: 'CallExpression',
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
                    },
                ],
            },
        ],
    }
    expect(emitter(ast)).toBe(`print("Hello", 2);
add(2, subtract(4, 2));`)
})

test('It should handle CallExpression.', () => {
    const node = {
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
    }
    expect(emitExpression(node)).toBe('add(1, 2)')
})
