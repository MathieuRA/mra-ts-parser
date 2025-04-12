export const PRIMITIVE_TYPE = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
} as const;

export type PRIMITIVE_TYPE =
  (typeof PRIMITIVE_TYPE)[keyof typeof PRIMITIVE_TYPE];
