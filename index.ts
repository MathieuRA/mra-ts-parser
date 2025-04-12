import ts from "typescript";
import * as fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import { parse } from "./common/getter.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const filePath = args.find((a) => a.startsWith("path="))?.split("=")[1];

if (filePath === undefined) {
  throw new Error(
    'a "path" argument must be provided. E.g. npm run start -- path=./user.ts'
  );
}

const sourceFilePath = path.join(__dirname, filePath);
const sourceFile = ts.createSourceFile(
  sourceFilePath,
  fs.readFileSync(sourceFilePath, "utf8"),
  ts.ScriptTarget.ES2015,
  true
);
let schema: Record<string, unknown> = {};

sourceFile.forEachChild((node) => {
  const type = parse(node);
  schema = { ...schema, ...type };
});

// console.log(JSON.stringify(schema, null, 2));
fs.writeFile(
  "./output.json",
  JSON.stringify(schema, null, 2),
  "utf-8",
  () => {}
);
