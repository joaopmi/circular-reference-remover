# Info
Removes the inner circular references from objects


- [GITHUB](https://github.com/joaopmi/circular-reference-remover) 
- [NPM](https://www.npmjs.com/package/circular-reference-remover)

# Installation

```
npm i circular-reference-remover
```

## Usage
```typescript
import {remove} from "./circular-remover";

let a:any = {name:'circular a'};
let b:any = {name:'circular b'};
let c:any = {name:'circular c'};
let d:any = {name:'not circular'};

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


remove(a).then((result:any)=>{
    console.log(
        JSON.stringify(result,null,2)
    );
})

console.log('\n------------------\n');

//WITH setUndefined TRUE
remove(a,{setUndefined:true}).then((result:any)=>{
    console.log(
        JSON.stringify(result,null,2)
    );
})


```

Result:

```json
{
  "name": "circular a",
  "a": null,
  "b": {
    "name": "circular b",
    "b": null,
    "a": null,
    "c": {
      "name": "circular c",
      "c": null,
      "a": null,
      "b": null,
      "d": {
        "name": "not circular"
      }
    },
    "d": {
      "name": "not circular"
    }
  },
  "c": {
    "name": "circular c",
    "c": null,
    "a": null,
    "b": {
      "name": "circular b",
      "b": null,
      "a": null,
      "c": null,
      "d": {
        "name": "not circular"
      }
    },
    "d": {
      "name": "not circular"
    }
  },
  "d": {
    "name": "not circular"
  }
}

------------------

{
  "name": "circular a",
  "b": {
    "name": "circular b",
    "c": {
      "name": "circular c",
      "d": {
        "name": "not circular"
      }
    },
    "d": {
      "name": "not circular"
    }
  },
  "c": {
    "name": "circular c",
    "b": {
      "name": "circular b",
      "d": {
        "name": "not circular"
      }
    },
    "d": {
      "name": "not circular"
    }
  },
  "d": {
    "name": "not circular"
  }
}
```

## Documentation

- Function ```remove(src:any,options?:remover.Options):Promise<any>``` - Returns a Promise that resolves a copy of the ```src``` object with its inner circular references setted to ```null``` or ```undefined```. If the ```src``` is ```null``` or ```undefined``` return a Promise with the respective value.

- Function ```removeSync(src:any,options?:remover.Options):any``` - Returns a copy of the ```src``` object with its inner circular references setted to ```null``` or ```undefined```. If the ```src``` is ```null``` or ```undefined``` return the respective value.

- ```RemoverOptions``` - 
- - ```setUndefined?:boolean``` - If true set references as ```undefined``` instead of ```null```
## Contributing
Pull requests are welcome, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.