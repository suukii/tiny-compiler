interface LiteralAstNode {
    type: string
    value: string
}

interface ExpressionAstNode {
    name: string
    type: string
    params: Array<AstNode>
}
interface ProgramAstNode {
    type: string
    body: Array<AstNode>
}

type AstNode = LiteralAstNode | ExpressionAstNode | ProgramAstNode

export const emitNumber = (node: LiteralAstNode): string => `${node.value}`

export const emitString = (node: LiteralAstNode): string => `"${node.value}"`

export const emitExpression = (node: ExpressionAstNode): string => {
    // code here
}

export const emitProgram = (node: ProgramAstNode): string => {
    // code here
}

export const emitter = (node: AstNode): string => {
    switch (node.type) {
        case 'Program':
            return emitProgram(node as ProgramAstNode)
        case 'CallExpression':
            return emitExpression(node as ExpressionAstNode)
        case 'StringLiteral':
            return emitString(node as LiteralAstNode)
        case 'NumberLiteral':
            return emitNumber(node as LiteralAstNode)

        default:
            throw new TypeError(node.type)
    }
}
