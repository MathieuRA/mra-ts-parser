import ts from "typescript";

import { PRIMITIVE_TYPE } from "./enum.ts";
import { isArrayNode } from "./check.ts";

type ArrayProp = {
  isArray: boolean;
  items: Prop;
};
type PrimitiveProp = {
  isPrimitive: boolean;
  type: PRIMITIVE_TYPE;
};
type UnionProp = {
  isUnionType: boolean;
  types: Prop[];
};
type LiteralProp = {
  isLiteral: boolean;
  type: string | number | boolean;
};
type ObjectProp = {
  [key: string]: Prop & {
    isOptional: boolean;
  };
};
type InterfaceProp = Record<string, ObjectProp>;
type TypeProp = Record<string, ObjectProp>;

type Prop =
  | PrimitiveProp
  | ArrayProp
  | UnionProp
  | LiteralProp
  | ObjectProp
  | InterfaceProp
  | TypeProp;

const CACHE_TYPES = {};

function getPrivitiveType(node: ts.Node): PrimitiveProp {
  let _type: PRIMITIVE_TYPE;
  switch (node.kind) {
    case ts.SyntaxKind.StringKeyword:
      _type = PRIMITIVE_TYPE.STRING;
      break;
    case ts.SyntaxKind.NumberKeyword:
      _type = PRIMITIVE_TYPE.NUMBER;
      break;
    case ts.SyntaxKind.BooleanKeyword:
      _type = PRIMITIVE_TYPE.BOOLEAN;
      break;
    default:
      _type = PRIMITIVE_TYPE.STRING;
      break;
  }

  return { isPrimitive: true, type: _type };
}

function getArrayType(
  node: ts.ArrayTypeNode | ts.TypeReferenceNode
): ArrayProp {
  // check if T[]
  // Else Array<T> (Array<T>) always have only one argument
  const _node = ts.isArrayTypeNode(node)
    ? node.elementType
    : node.typeArguments![0];

  return {
    isArray: true,
    items: getType(_node),
  };
}

function getUnionTypeNode(types: ts.NodeArray<ts.TypeNode>): UnionProp {
  return {
    isUnionType: true,
    types: types.map(getType),
  };
}

function getObjectType(
  node: ts.TypeLiteralNode | ts.InterfaceDeclaration | ts.TypeNode
): ObjectProp {
  const props = {};

  (node as ts.TypeLiteralNode).members.forEach((m) => {
    if (!ts.isPropertySignature(m) || m.type === undefined) {
      return;
    }
    const propName = m.name.getText();
    const type = getType(m.type);
    const isOptional = m.questionToken !== undefined;
    props[propName] = { ...type, isOptional } as unknown as ObjectProp;
  });

  return props;
}

function getLiteralType(node: ts.TypeNode): LiteralProp {
  // getText() return a string like: '"foo"'
  // so we use replaceAll to clean the string
  let type: string | number | boolean = node.getText().replaceAll('"', "");
  if (!Number.isNaN(Number(type))) {
    type = Number(type);
  } else {
    if (type === "false" || type === "true") {
        console.log(type)
      type = !!type;
    }
  }
  return { isLiteral: true, type };
}

function getReferenceType(node: ts.TypeReferenceNode) {
  const name = node.typeName.getText();
  const refType = CACHE_TYPES[node.typeName.getText()];
  if (refType !== undefined) {
    return refType;
  }

  // @TODO: how to correctly handle this usecase?
  throw new Error(`Cannot use type: ${name} before initialization`);
}

// Root getters
function getType(node: ts.TypeNode | ts.Node): Prop {
  if (ts.isTypeLiteralNode(node)) {
    return getObjectType(node);
  }
  if (ts.isLiteralTypeNode(node)) {
    return getLiteralType(node);
  }
  if (isArrayNode(node)) {
    return getArrayType(node as ts.ArrayTypeNode);
  }

  if (ts.isUnionTypeNode(node)) {
    return getUnionTypeNode(node.types);
  }
  // E.g. (string | number)
  if (ts.isParenthesizedTypeNode(node)) {
    return getType(node.type);
  }

  if (ts.isTypeReferenceNode(node)) {
    // type Foo {bar: Bar}
    return getReferenceType(node);
  }

  return getPrivitiveType(node);
}

function getInterfaceDeclaration(node: ts.InterfaceDeclaration): InterfaceProp {
  const internameName = node.name.getText();
  const props = getObjectType(node);

  CACHE_TYPES[internameName] = props;
  return { [internameName]: props };
}
function getTypeDeclaration(node: ts.TypeAliasDeclaration): TypeProp {
  const typeName = node.name.getText();
  let type;
  if (ts.isTypeLiteralNode(node.type)) {
    // type Foo = {foo: string}
    type = getObjectType(node.type);
  } else {
    // type Foo = string
    type = getType(node.type);
  }

  CACHE_TYPES[typeName] = type;
  return { [typeName]: type };
}

export function parse(node: ts.Node) {
  if (ts.isInterfaceDeclaration(node)) {
    return getInterfaceDeclaration(node);
  }

  if (ts.isTypeAliasDeclaration(node)) {
    return getTypeDeclaration(node);
  }
}
