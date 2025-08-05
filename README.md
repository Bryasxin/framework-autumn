# Autumn

一个类似 Spring 的轻量级 JavaScript/TypeScript 依赖注入框架，基于 Bun 运行时构建。

## 特性

- 类 Spring 的依赖注入（DI）容器
- 组件作用域管理（单例/原型）
- 组件扩展机制
- 容器扩展机制
- 装饰器支持
- 完整的 TypeScript 类型支持

## 使用示例

```typescript
import { Component, Container } from "autumn";

// 定义一个简单的服务组件
@Component({})
class MyService {
  getData() {
    return "Hello from MyService";
  }
}

// 定义一个依赖于 MyService 的控制器组件
@Component({})
class MyController {
  constructor(private service: MyService) {}

  handleRequest() {
    return this.service.getData();
  }
}

// 创建容器并注册组件
const container = new Container();
container.register(MyService);
container.register(MyController);

// 获取并使用组件
const controller = await container.get(MyController);
console.log(controller.handleRequest());
```
