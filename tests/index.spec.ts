import { compiler } from '../src/index'

test('It should compile.', () => {
    const input = '(add 1 2 (mult 3 4))'
    expect(compiler(input)).toBe(`add(1, 2, mult(3, 4));`)
})
