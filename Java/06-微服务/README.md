# 微服务

> 建议学习时长：10 天

---

## 概述

微服务是一种架构风格，将单体应用拆分为多个小型服务。本阶段将学习微服务相关技术栈。

---

## 学习内容

### 1. Spring Cloud

- [ ] Spring Cloud 简介
- [ ] Spring Cloud 版本选择
- [ ] 微服务架构概述

### 2. 服务注册与发现

- [ ] Eureka (已停止维护)
- [ ] Nacos (推荐)
- [ ] Zookeeper

### 3. 服务调用

- [ ] Ribbon (负载均衡)
- [ ] Feign (声明式 HTTP 客户端)
- [ ] OpenFeign

### 4. 服务熔断与降级

- [ ] Hystrix (已停止维护)
- [ ] Sentinel (推荐)

### 5.  Gateway 网关

- [ ] Gateway 简介
- [ ] 路由配置
- [ ] 过滤器
- [ ] 限流

### 6. 配置中心

- [ ] Config Server
- [ ] Nacos Config
- [ ] Apollo (携程)

### 7. 消息总线

- [ ] Spring Cloud Bus

### 8. 分布式事务

- [ ] Seata

### 9. Docker 容器化

- [ ] Docker 基础
- [ ] 镜像与容器
- [ ] Docker Compose
- [ ] Docker 网络
- [ ] Dockerfile 编写

### 10. Redis

- [ ] Redis 数据结构
- [ ] 持久化
- [ ] 哨兵模式
- [ ] 集群模式
- [ ] 缓存穿透、击穿、雪崩

### 11. 消息队列

- [ ] RabbitMQ
- [ ] Kafka

### 12. Elasticsearch

- [ ] ES 简介与安装
- [ ] 索引与文档
- [ ] 搜索与聚合
- [ ] Spring Data Elasticsearch

---

## 视频推荐

| 视频 | UP 主 | 时长 |
|:---|:---|:---|
| [Spring Cloud 教程](https://www.bilibili.com/video/BV1hE411p7vG) | 尚硅谷周阳 |  |
| [Docker 教程](https://www.bilibili.com/video/BV1Ls411n7Ws) | 狂神说 |  |
| [Redis 教程](https://www.bilibili.com/video/BV1S54y1R7ct) | 狂神说 |  |
| [RabbitMQ 教程](https://www.bilibili.com/video/BV1cb4y1Q7L1) | 黑马程序员 |  |

---

## 微服务架构图

```
                                    ┌─────────────┐
                                    │   Gateway   │
                                    └──────┬──────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
        ┌─────┴─────┐              ┌───────┴───────┐            ┌───────┴───────┐
        │  服务 A   │              │    服务 B     │            │    服务 C     │
        └─────┬─────┘              └───────┬───────┘            └───────┬───────┘
              │                            │                            │
              │                            │                            │
        ┌─────┴─────┐              ┌───────┴───────┐            ┌───────┴───────┐
        │  MySQL    │              │    Redis      │            │ Elasticsearch │
        └───────────┘              └───────────────┘            └───────────────┘
```

---

## 下一步

学完微服务后，开始 [项目实战](../07-项目实战/README.md)
