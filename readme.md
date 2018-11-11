## ant-client

The complete solution for project cli.

### analDep
#### Installation
```
$ npm install commander -g
```

#### Usage
```
$ cd [your project]
$ ant-client analDep [-e entry] [-o output]
``` 
or you can use alias parameter
```
$ ant-client ad
```

- exmaple
```
$ cd ant-datasource
$ ant-client ad -e src/index -o f
```

- output
```bash
/Users/lihongji/study/ant-datasource/src/test1文件不存在
ant-datasource/src/index模块过多依赖
ant-datasource/src/test模块过多依赖
模块列表
ant-datasource/src/exist,ant-datasource/src/utils,ant-datasource/src/in.less,ant-datasource/src/test,ant-datasource/src/index,ant-datasource/src/test1,ant-datasource/node_modules/babel-eslint,ant-datasource/src/k/a.png
模块数量
8
```

- deptree: deps.json
```json
{
  "./exist": {
    "absosultePath": "ant-datasource/src/exist",
    "deps": {
      "./utils": {
        "absosultePath": "ant-datasource/src/utils",
        "deps": {},
        "depLen": 0
      }
    },
    "depLen": 1
  },
  "./in.less": {
    "absosultePath": "ant-datasource/src/in.less",
    "deps": {},
    "depLen": 0
  },
  "./test": {
    "absosultePath": "ant-datasource/src/test",
    "deps": {
      "absosultePath": "ant-datasource/src/in.less",
      "deps": {},
      "depLen": 0,
      "./index": {
        "absosultePath": "ant-datasource/src/index",
        "deps": {
          "absosultePath": "ant-datasource/src/in.less",
          "deps": {},
          "depLen": 0,
          "tip": "循环引用",
          "./test1": {
            "absosultePath": "ant-datasource/src/test1",
            "deps": {},
            "depLen": 0
          },
          "babel-eslint": {
            "absosultePath": "ant-datasource/node_modules/babel-eslint"
          },
          "./k/a.png": {
            "absosultePath": "ant-datasource/src/k/a.png",
            "deps": {},
            "depLen": 0
          }
        },
        "depLen": 7
      }
    },
    "depLen": 4
  },
  "absosultePath": "ant-datasource/src/k/a.png",
  "deps": {},
  "depLen": 0
}
```

#### todolist
- analyse needless dependencies of package.json.
- analyse file dependencies order.