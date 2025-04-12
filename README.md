# 🧩 TypeScript to JSON Schema Parser

This tool parses TypeScript interfaces and type aliases and outputs a structured JSON representation of their shape. It supports primitives, arrays, unions, nested objects, optional properties, and even references to other types.

## ✨ Features

- ✅ Parses TypeScript interfaces and type aliases
- 🧠 Handles:
  - Primitives (`string`, `number`, `boolean`)
  - Arrays (`string[]`, `Array<number>`)
  - Union types (`string | number`)
  - Nested types
  - Optional fields (`?`)
  - Type references (`user: Foo`)
- ⚡ Outputs a clean and structured JSON

---

## 📦 Installation

```bash
npm install
```

---

## 🚀 Usage

```bash
npm run start -- path=./types.ts
```

> ⚠️ Don't forget the double dash `--` to forward CLI arguments to your script.

This will analyze the file passed via `path` and generate a JSON representation of the exported types/interfaces.

---

## 📂 Output

The script will output a structured JSON like:

```json
{
  "User": {
    "id": { "isPrimitive": true, "type": "string", "isOptional": false },
    "name": { "isPrimitive": true, "type": "string", "isOptional": false },
    "email": { "isPrimitive": true, "type": "string", "isOptional": true },
    "groups": {
      "isArray": true,
      "items": { "isPrimitive": true, "type": "string" },
      "isOptional": false
    }
    // ...
  }
}
```

---

## 📁 Example Input

**types.ts**

```ts
type Id = string;

type RGB = "red" | "blue" | "green";
type Hobbie = "music" | "sport" | "swim";
type WeirdUnionType = 42[] | boolean[] | "toto";
type UnionInsideArray = (string | number | boolean)[];

interface User {
  id: Id;
  name: string;
  email?: string;
  age?: number;
  hobbies: Hobbie[];
}

interface Group {
  id: Id;
  users: User[];
  color: RGB;
}
```

---

## 🧪 Future Ideas

- [ ] Support for imported types

---
