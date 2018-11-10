## ant-client

The complete solution for project cli.

### analDep
#### Installation
```
$ npm install commander -g
```

#### Used
```
$ cd [your project]
$ ant-client analDep [entry]
``` 
or you can use alias parameter
```
$ ant-client ad
```

- exmaple
```
$ cd crm
$ ant-client ad ./src/index
```

- output
```json
{
  "./exist": {
    "absosulte": "crm/src/exist",
    "nodeModule": false,
    "deps": {
      "./utils": {
        "absosulte": "crm/src/utils",
        "nodeModule": false,
        "deps": {}
      }
    }
  },
  "./index.less": {
    "absosulte": "crm/src/index.less",
    "nodeModule": false,
    "deps": {}
  },
  "babel-eslint": {
    "absosulte": "crm/node_modules/babel-eslint",
    "nodeModule": true
  },
  "./asset/img/banner.png": {
    "absosulte": "crm/src/asset/img/banner.png",
    "nodeModule": false,
    "deps": {}
  }
}
```