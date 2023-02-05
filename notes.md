# 目录

- 基本介绍
  - mern概览
  - express中间件
- demo
  - 搭建express服务器
  - 连接上MongoDB atlas服务器
  - 编写并且测试查询的api

# EXPRESS的中间件



# Mongoose

Mongoose中所有可用的数据类型。

- String
  字符串
- Number
  数字
- Date
  日期
- Buffer
  缓冲区
- Boolean
  布尔值
- Mixed
  混合
- Objectid
  对象ID
- Array
  数组

```js
var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})
```



# TODOLIST PROJECT STEPS

- [FRONTEND](https://github.com/MoiraDust/hooks-todolist)
- cd server `npm init -y`
- 需要安装的 module
  - express
  - nodemon
  - cors
  - mongoose
- 做 configuration `"start": "nodemon server"`
- 在根目录创建 server.js 作为后端的入口文件
- 引入 express 并且测试服务器连接性

```javascript
// 引用express
const express = require("express");
const app = express();
// 指定端口
const port = 5003;

// 监听端口是否开启
app.listen(port, () => {
  console.log(`server ${port} start`);
});
```

- 建立 MongoDB 的链接, mongo atlas 的话 ACL 要设定所有的 IP 都可以连接
- 引入 mongoose 的组件
- 找到 database 的链接 url
- 代码链接数据库
  `"mongodb+srv://admin:admin@cluster0.zgbvtqh.mongodb.net/todolist?retryWrites=true&w=majority";`
  注意在问号前面写上数据库的名字

```javascript
// 链接数据库
const url =
  "mongodb+srv://admin:admin@cluster0.zgbvtqh.mongodb.net/todolist?retryWrites=true&w=majority";

// 指定端口
const port = 5003;

// 监听端口是否开启
const listenPort = () => {
  app.listen(port, () => {
    console.log(`server ${port} start`);
  });
};

mongoose
  .connect(url)
  .then(() => {
    listenPort();
  })
  .catch((err) => {
    console.log(err.message);
  });
```

- 这里报了一个 warning, 因为 mongoose 弃用了一些设置,只需要加上`mongoose.set("strictQuery", true);`就可以了

- 设计 API

  - 新建 router 文件夹,再新建一个名为`todo_items_router.js`的文件
  - 引用 router 组件,先大致写一下结构如下

  ```javascript
  const express = require("express");
  const router = express.Router();
  // get todos
  router.get("/", (req, res) => {});
  // add todo
  router.post("/add", (req, res) => {});
  
  module.exports = router;
  ```

  - 在`server.js`里面引入 router

    ```javascript
    const routes = require("./router/todo_items_router");
    // ...
    app.use("/", routes);
    ```
  
- 在server里面新增一个controller文件夹，用来放业务逻辑

- 在controller里面新增两个方法并且暴露出去

```JavaScript
async function getItems(req, res){};

module.exports = { ... }
```

- 然后在`todo_item_router`里面引用controller，并且补完API

```javascript
const todoItemController = require("../controller/todoItemController");
// get todos
router.get("/getItem", todoItemController.getItems);
//...
```

- 新建modules，生成schema

```js
const mongoose = require("mongoose");
const schema = mongoose.schema;
const todoSchema = new schema({
  _id: { type: String, required: true },
  time: { type: Date, required: true },
  content: { type: String, required: true },
  itemStatus: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("ToDosModel", todoSchema);
```

- 写controller

```js
const todoModel = require("../models/todo");
const mongoose = require("mongoose");

async function getItem(req, res) {
  try {
    const items = await todoModel.find();
    res.json({ data: items });
  } catch (err) {
    console.log(err.message);
  }
}
 //...          

module.exports = {
 getItem ... 
}
```

- 用postman测试
- 连接前后端
- 前端需要的package：`axios`
- 改完前端后发现报错，因为出现了跨域的问题
- 解决跨越问题
  - 在server引入cors
  - 一般跨域要当做第一个中间件
