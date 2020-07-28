import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { emitter } from './emitter'

export const compiler = (input: string): string => {
    const tokens = tokenizer(input)
    const ast = parser(tokens)
    const code = emitter(ast)
    return code
}
