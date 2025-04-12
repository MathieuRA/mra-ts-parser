# Examples

## 📁 Input

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

## 📂 Ouput
```json
{
  "Id": {
    "isPrimitive": true,
    "type": "string"
  },
  "RGB": {
    "isUnionType": true,
    "types": [
      {
        "isLiteral": true,
        "type": "red"
      },
      {
        "isLiteral": true,
        "type": "blue"
      },
      {
        "isLiteral": true,
        "type": "green"
      }
    ]
  },
  "Hobbie": {
    "isUnionType": true,
    "types": [
      {
        "isLiteral": true,
        "type": "music"
      },
      {
        "isLiteral": true,
        "type": "sport"
      },
      {
        "isLiteral": true,
        "type": "swim"
      }
    ]
  },
  "WeirdUnionType": {
    "isUnionType": true,
    "types": [
      {
        "isArray": true,
        "items": {
          "isLiteral": true,
          "type": 42
        }
      },
      {
        "isArray": true,
        "items": {
          "isPrimitive": true,
          "type": "boolean"
        }
      },
      {
        "isLiteral": true,
        "type": "toto"
      }
    ]
  },
  "UnionInsideArray": {
    "isArray": true,
    "items": {
      "isUnionType": true,
      "types": [
        {
          "isPrimitive": true,
          "type": "string"
        },
        {
          "isPrimitive": true,
          "type": "number"
        },
        {
          "isPrimitive": true,
          "type": "boolean"
        }
      ]
    }
  },
  "User": {
    "id": {
      "isPrimitive": true,
      "type": "string",
      "isOptional": false
    },
    "name": {
      "isPrimitive": true,
      "type": "string",
      "isOptional": false
    },
    "email": {
      "isPrimitive": true,
      "type": "string",
      "isOptional": true
    },
    "age": {
      "isPrimitive": true,
      "type": "number",
      "isOptional": true
    },
    "hobbies": {
      "isArray": true,
      "items": {
        "isUnionType": true,
        "types": [
          {
            "isLiteral": true,
            "type": "music"
          },
          {
            "isLiteral": true,
            "type": "sport"
          },
          {
            "isLiteral": true,
            "type": "swim"
          }
        ]
      },
      "isOptional": false
    }
  },
  "Group": {
    "id": {
      "isPrimitive": true,
      "type": "string",
      "isOptional": false
    },
    "users": {
      "isArray": true,
      "items": {
        "id": {
          "isPrimitive": true,
          "type": "string",
          "isOptional": false
        },
        "name": {
          "isPrimitive": true,
          "type": "string",
          "isOptional": false
        },
        "email": {
          "isPrimitive": true,
          "type": "string",
          "isOptional": true
        },
        "age": {
          "isPrimitive": true,
          "type": "number",
          "isOptional": true
        },
        "hobbies": {
          "isArray": true,
          "items": {
            "isUnionType": true,
            "types": [
              {
                "isLiteral": true,
                "type": "music"
              },
              {
                "isLiteral": true,
                "type": "sport"
              },
              {
                "isLiteral": true,
                "type": "swim"
              }
            ]
          },
          "isOptional": false
        }
      },
      "isOptional": false
    },
    "color": {
      "isUnionType": true,
      "types": [
        {
          "isLiteral": true,
          "type": "red"
        },
        {
          "isLiteral": true,
          "type": "blue"
        },
        {
          "isLiteral": true,
          "type": "green"
        }
      ],
      "isOptional": false
    }
  }
}
```
