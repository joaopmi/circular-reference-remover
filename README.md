# Info
Simple logger for textChannels.


- [GITHUB](https://github.com/joaopmi/circular-reference-remover) 
- [NPM](https://www.npmjs.com/package/circular-reference-remover)

# Installation

```
npm i circular-reference-remover
```

## Usage
```typescript
import remover from "./circular-remover";

let a:any = {nome:'circular a'};
let b:any = {nome:'circular b'};
let c:any = {nome:'circular c'};
let d:any = {nome:'not circular'};

a.a = a;
a.b = b;
a.c = c;
a.d = d;
b.b = b;
b.a = a;
b.c = c;
b.d = d;
c.c = c;
c.a = a;
c.b = b;
c.d = d;

console.log(
    JSON.stringify(remover(a),null,2)
);

console.log('\n------------------\n');

//WITH setUndefined TRUE
console.log(
    JSON.stringify(
        remover(a, { setUndefined: true })
        , null
        , 2
    )
);

```

Result:

```json
{
  "nome": "circular a",
  "a": null,
  "b": {
    "nome": "circular b",
    "b": null,
    "a": null,
    "c": {
      "nome": "circular c",
      "c": null,
      "a": null,
      "b": null,
      "d": {
        "nome": "not circular"
      }
    },
    "d": {
      "nome": "not circular"
    }
  },
  "c": {
    "nome": "circular c",
    "c": null,
    "a": null,
    "b": {
      "nome": "circular b",
      "b": null,
      "a": null,
      "c": null,
      "d": {
        "nome": "not circular"
      }
    },
    "d": {
      "nome": "not circular"
    }
  },
  "d": {
    "nome": "not circular"
  }
}

------------------

{
  "nome": "circular a",
  "b": {
    "nome": "circular b",
    "c": {
      "nome": "circular c",
      "d": {
        "nome": "not circular"
      }
    },
    "d": {
      "nome": "not circular"
    }
  },
  "c": {
    "nome": "circular c",
    "b": {
      "nome": "circular b",
      "d": {
        "nome": "not circular"
      }
    },
    "d": {
      "nome": "not circular"
    }
  },
  "d": {
    "nome": "not circular"
  }
}
```

## Documentation

- Function ```remover(src:any,options?:remover.Options``` - Returns a copy of the ```src``` object with its inner circular references setted to ```null``` or ```undefined```.
- ```remover.Options``` - 
- - ```setUndefined?:boolean``` - If true set references as ```undefined``` instead of ```null```
## Contributing
Pull requests are welcome, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.