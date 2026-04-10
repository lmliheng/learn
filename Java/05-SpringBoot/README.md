# Spring Boot

> 建议学习时长：3-5 天

---

## 概述

Spring Boot 是 Spring 家族的成员，简化了 Spring 应用的创建和部署过程，"约定大于配置"，是当前 Java 开发的主流框架。

---

## 学习内容

### 1. 快速入门

- [ ] Spring Boot 简介
- [ ] Spring Boot 快速构建 (Spring Initializr)
- [ ] Spring Boot starter
- [ ] 快速运行与打包

### 2. 配置文件

- [ ] application.yml / application.properties
- [ ] 多环境配置 (dev, test, prod)
- [ ] 配置文件优先级
- [ ] @ConfigurationProperties
- [ ] @Value 注解读取配置

### 3. Web 开发

- [ ] Spring MVC 自动配置
- [ ] 静态资源映射
- [ ] 文件上传
- [ ] 拦截器
- [ ] 异常处理

### 4. 数据访问

- [ ] Spring Data JPA
- [ ] Spring Data JDBC
- [ ] MyBatis-Plus 集成
- [ ] 多数据源配置

### 5. 事务管理

- [ ] @Transactional 注解
- [ ] 事务传播行为
- [ ] 事务隔离级别
- [ ] 分布式事务 (Seata)

### 6. 安全控制

- [ ] Spring Security 入门
- [ ] 认证与授权
- [ ] 登录拦截
- [ ] 密码加密

### 7. 缓存

- [ ] Spring Cache
- [ ] Redis 集成
- [ ] 缓存注解 (@Cacheable, @CacheEvict)

### 8. 定时任务

- [ ] @Scheduled 注解
- [ ] cron 表达式
- [ ] 异步任务 (@Async)

### 9. 消息队列

- [ ] JMS
- [ ] RabbitMQ 集成
- [ ] Kafka 集成

### 10. 部署

- [ ] jar 包部署
- [ ] war 包部署
- [ ] Docker 部署
- [ ] CI/CD 流水线

---

## 视频推荐

| 视频 | UP 主 | 时长 |
|:---|:---|:---|
| [Spring Boot 教程](https://www.bilibili.com/video/BV1PE411i7CV) | 狂神说 |  |
| [Spring Boot 2 权威教程](https://www.bilibili.com/video/BV1Wx411X7k4) | 尚硅谷雷神 |  |
| [Spring Boot 3 教程](https://www.bilibili.com/video/BV1P5411N7ZF) | 尚硅谷 |  |

---

## 练习项目

- [ ] RESTful API 开发
- [ ] 博客系统后端接口

---

## 重点特性

- **自动配置**：Spring Boot 根据 classpath 中的 jar 包自动配置
- **-starter**：简化依赖配置
- **Actuator**：监控与管理
- **嵌入式服务器**：内置 Tomcat、Jetty

---

## 下一步

学完 Spring Boot 后，继续学习 [微服务](../06-微服务/README.md)
