import ts from "typescript";

export function isArrayNode(node: ts.Node) {
  return (
    ts.isArrayTypeNode(node) ||
    (ts.isTypeReferenceNode(node) &&
      node.typeName.getText() === "Array" &&
      node.typeArguments?.length === 1)
  );
}
