import { emitter } from '../src/index'

test('It should handle NumberLiteral.', () => {
    const node = {
        type: 'NumberLiteral',
        value: '1',
    }
    expect(emitter(node)).toBe('1')
})

test('It should handle StringLiteral.', () => {
    const node = {
        type: 'StringLiteral',
        value: 'hello world',
    }
    expect(emitter(node)).toBe(`"hello world"`)
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
    expect(emitter(node)).toBe('add(1, 2)')
})

test('It should throw error if met with unexpected type of ast node.', () => {
    const node = {
        type: 'JustKidding',
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
    expect(() => emitter(node)).toThrowError('JustKidding')
})
