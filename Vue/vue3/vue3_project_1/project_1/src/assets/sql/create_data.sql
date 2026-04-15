INSERT INTO `article_cart` (`cart_id`, `cart_name`, `user_id`, `created_at`, `updated_at`) VALUES
(1001, '后端开发', 1, NOW(), NOW()),
(1002, '前端开发', 1, NOW(), NOW()),
(1003, '数据库', 1, NOW(), NOW()),
(1004, '运维部署', 1, NOW(), NOW()),
(1005, '算法刷题', 1, NOW(), NOW()),
(1006, '职场成长', 1, NOW(), NOW()),
(1007, '开源项目', 1, NOW(), NOW()),
(1008, 'AI 技术', 1, NOW(), NOW()),
(1009, '创业思考', 1, NOW(), NOW()),
(1010, '随笔杂谈', 1, NOW(), NOW());




INSERT INTO `user` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1001, 'dev_zhang', 'zhang@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1002, 'dev_wang', 'wang@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1003, 'dev_li', 'li@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1004, 'tester_lu', 'lu@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1005, 'ops_chen', 'chen@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1006, 'pm_zhao', 'zhao@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1007, 'designer_sun', 'sun@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1008, 'ai_fan', 'fan@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1009, 'startup_lei', 'lei@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW()),
(1010, 'guest_user', 'guest@fastweb.test', '$2a$10$fakehash1234567890abcdefghijklmnopqrstuvwx', NOW(), NOW());



INSERT INTO `article` (`id`, `title`, `content`, `user_id`, `cart_id`, `cart_name`, `created_at`, `updated_at`) VALUES
(200001, 'Spring Boot 实战笔记', '本文介绍 Spring Boot 的核心用法...', 1001, 1001, '后端开发', NOW() - INTERVAL 10 DAY, NOW()),
(200002, 'Vue3 + Vite 最佳实践', '从零搭建企业级前端项目...', 1002, 1002, '前端开发', NOW() - INTERVAL 9 DAY, NOW()),
(200003, 'MySQL 索引优化指南', '详解 B+Tree 与执行计划...', 1003, 1003, '数据库', NOW() - INTERVAL 8 DAY, NOW()),
(200004, 'Docker 部署实战', '一套通用的 Docker 部署方案...', 1004, 1004, '运维部署', NOW() - INTERVAL 7 DAY, NOW()),
(200005, 'LeetCode 刷题总结', '高频算法题解题思路整理...', 1005, 1005, '算法刷题', NOW() - INTERVAL 6 DAY, NOW()),
(200006, '程序员职业发展路径', '从初级到架构师的成长路线...', 1006, 1006, '职场成长', NOW() - INTERVAL 5 DAY, NOW()),
(200007, '如何参与开源项目', 'GitHub 协作与 PR 流程详解...', 1007, 1007, '开源项目', NOW() - INTERVAL 4 DAY, NOW()),
(200008, '大模型落地实践', 'LLM 在企业中的应用案例...', 1008, 1008, 'AI 技术', NOW() - INTERVAL 3 DAY, NOW()),
(200009, '创业公司技术选型', '早期团队的技术决策思考...', 1009, 1009, '创业思考', NOW() - INTERVAL 2 DAY, NOW()),
(200010, '技术人的写作习惯', '为什么工程师应该坚持写作...', 1010, 1010, '随笔杂谈', NOW() - INTERVAL 1 DAY, NOW()),

(200011, 'Redis 缓存设计', '缓存穿透、击穿与雪崩解决方案...', 1001, 1003, '数据库', NOW() - INTERVAL 20 DAY, NOW()),
(200012, 'React 18 新特性', '并发渲染与自动批处理解析...', 1002, 1002, '前端开发', NOW() - INTERVAL 19 DAY, NOW()),
(200013, 'Kubernetes 入门', 'Pod、Service 与 Deployment...', 1004, 1004, '运维部署', NOW() - INTERVAL 18 DAY, NOW()),
(200014, 'Go 语言实战技巧', '并发编程与性能优化...', 1001, 1001, '后端开发', NOW() - INTERVAL 17 DAY, NOW()),
(200015, 'CI/CD 流水线设计', 'GitLab CI 与 Jenkins 对比...', 1004, 1004, '运维部署', NOW() - INTERVAL 16 DAY, NOW()),

(200016, 'TypeScript 高级类型', '从基础到进阶的类型系统...', 1002, 1002, '前端开发', NOW() - INTERVAL 15 DAY, NOW()),
(200017, 'PostgreSQL vs MySQL', '两种关系型数据库的深度对比...', 1003, 1003, '数据库', NOW() - INTERVAL 14 DAY, NOW()),
(200018, '微服务拆分实践', '从单体到微服务的演进...', 1001, 1001, '后端开发', NOW() - INTERVAL 13 DAY, NOW()),
(200019, 'Prompt Engineering', '如何写出高质量的 AI Prompt...', 1008, 1008, 'AI 技术', NOW() - INTERVAL 12 DAY, NOW()),
(200020, '技术面试复盘', '一线大厂面试经验总结...', 1005, 1005, '算法刷题', NOW() - INTERVAL 11 DAY, NOW()),

(200021, 'FastAPI 实战', 'Python 高性能 Web 框架...', 1001, 1001, '后端开发', NOW() - INTERVAL 30 DAY, NOW()),
(200022, 'Next.js 全栈开发', '服务端渲染与 SSR 实践...', 1002, 1002, '前端开发', NOW() - INTERVAL 29 DAY, NOW()),
(200023, 'Elasticsearch 实战', '搜索引擎原理与调优...', 1003, 1003, '数据库', NOW() - INTERVAL 28 DAY, NOW()),
(200024, '云原生架构设计', 'Service Mesh 与 Istio...', 1004, 1004, '运维部署', NOW() - INTERVAL 27 DAY, NOW()),
(200025, '代码评审规范', '如何做一场高质量 Code Review...', 1006, 1006, '职场成长', NOW() - INTERVAL 26 DAY, NOW()),

(200026, 'Rust 入门指南', '内存安全与所有权模型...', 1001, 1001, '后端开发', NOW() - INTERVAL 25 DAY, NOW()),
(200027, 'Flutter 跨端开发', '一套代码运行多端...', 1002, 1002, '前端开发', NOW() - INTERVAL 24 DAY, NOW()),
(200028, '消息队列选型', 'Kafka vs RabbitMQ vs RocketMQ...', 1003, 1003, '数据库', NOW() - INTERVAL 23 DAY, NOW()),
(200029, '监控系统搭建', 'Prometheus + Grafana...', 1004, 1004, '运维部署', NOW() - INTERVAL 22 DAY, NOW()),
(200030, '技术博客写作', '如何持续输出高质量内容...', 1010, 1010, '随笔杂谈', NOW() - INTERVAL 21 DAY, NOW()),

(200031, 'DDD 领域驱动设计', '复杂业务系统的建模方法...', 1001, 1001, '后端开发', NOW() - INTERVAL 40 DAY, NOW()),
(200032, '前端工程化实践', '构建、打包与自动化部署...', 1002, 1002, '前端开发', NOW() - INTERVAL 39 DAY, NOW()),
(200033, '分库分表实战', '海量数据存储设计方案...', 1003, 1003, '数据库', NOW() - INTERVAL 38 DAY, NOW()),
(200034, 'Serverless 架构', '无服务器计算的落地场景...', 1004, 1004, '运维部署', NOW() - INTERVAL 37 DAY, NOW()),
(200035, '技术管理心得', '从工程师到管理者的转变...', 1006, 1006, '职场成长', NOW() - INTERVAL 36 DAY, NOW()),

(200036, 'GraphQL 实战', '前后端数据交互新范式...', 1002, 1002, '前端开发', NOW() - INTERVAL 35 DAY, NOW()),
(200037, '数据一致性方案', '分布式事务与最终一致性...', 1003, 1003, '数据库', NOW() - INTERVAL 34 DAY, NOW()),
(200038, '高并发系统设计', '秒杀与抢购系统实战...', 1001, 1001, '后端开发', NOW() - INTERVAL 33 DAY, NOW()),
(200039, 'LLM 微调实践', '基于 Llama 的垂直领域训练...', 1008, 1008, 'AI 技术', NOW() - INTERVAL 32 DAY, NOW()),
(200040, '远程工作指南', '高效远程协作的方法论...', 1006, 1006, '职场成长', NOW() - INTERVAL 31 DAY, NOW()),

(200041, 'WebSocket 实战', '实时通信与 IM 系统...', 1001, 1001, '后端开发', NOW() - INTERVAL 50 DAY, NOW()),
(200042, '低代码平台设计', '企业级低代码架构解析...', 1009, 1009, '创业思考', NOW() - INTERVAL 49 DAY, NOW()),
(200043, 'API 设计规范', 'RESTful API 最佳实践...', 1001, 1001, '后端开发', NOW() - INTERVAL 48 DAY, NOW()),
(200044, '前端性能监控', 'FP、FCP、LCP 指标优化...', 1002, 1002, '前端开发', NOW() - INTERVAL 47 DAY, NOW()),
(200045, '数据湖架构', 'Data Lake vs Data Warehouse...', 1003, 1003, '数据库', NOW() - INTERVAL 46 DAY, NOW()),
(200046, 'DevOps 文化', '研发效能提升的关键...', 1004, 1004, '运维部署', NOW() - INTERVAL 45 DAY, NOW()),
(200047, '技术债治理', '如何平衡业务与技术演进...', 1006, 1006, '职场成长', NOW() - INTERVAL 44 DAY, NOW()),
(200048, '开源协议详解', 'MIT / Apache / GPL 区别...', 1007, 1007, '开源项目', NOW() - INTERVAL 43 DAY, NOW()),
(200049, 'AI 绘画实践', 'Stable Diffusion 本地部署...', 1008, 1008, 'AI 技术', NOW() - INTERVAL 42 DAY, NOW()),
(200050, '技术人书单', '影响我职业生涯的 10 本书...', 1010, 1010, '随笔杂谈', NOW() - INTERVAL 41 DAY, NOW());





INSERT INTO `article_cart` (`cart_id`, `cart_name`, `user_id`, `created_at`, `updated_at`) VALUES
(2001, 'Java 后端', 1, NOW(), NOW()),
(2002, 'Go 语言', 1, NOW(), NOW()),
(2003, 'Python 开发', 1, NOW(), NOW()),
(2004, '前端 Vue', 1, NOW(), NOW()),
(2005, '前端 React', 1, NOW(), NOW()),
(2006, '数据库 MySQL', 1, NOW(), NOW()),
(2007, '数据库 Redis', 1, NOW(), NOW()),
(2008, 'DevOps', 1, NOW(), NOW()),
(2009, 'Docker & K8s', 1, NOW(), NOW()),
(2010, '微服务架构', 1, NOW(), NOW()),
(2011, '系统设计', 1, NOW(), NOW()),
(2012, '算法与数据结构', 1, NOW(), NOW()),
(2013, 'AI 人工智能', 1, NOW(), NOW()),
(2014, '产品思维', 1, NOW(), NOW()),
(2016, '技术管理', 1, NOW(), NOW()),
(2020, '其他分类', 1, NOW(), NOW());



INSERT INTO `article` (`id`, `title`, `content`, `user_id`, `cart_id`, `cart_name`, `created_at`, `updated_at`) VALUES
(300001, 'Java 基础详解', 'Java 面向对象与集合体系...', 1, 2001, 'Java 后端', NOW() - INTERVAL 30 DAY, NOW()),
(300002, 'Java 并发编程实战', '线程池、锁与 AQS...', 1, 2001, 'Java 后端', NOW() - INTERVAL 29 DAY, NOW()),

(300003, 'Go Gin 框架入门', '快速构建 Go Web 服务...', 1, 2002, 'Go 语言', NOW() - INTERVAL 28 DAY, NOW()),
(300004, 'Go 并发模型解析', 'goroutine 与 channel...', 1, 2002, 'Go 语言', NOW() - INTERVAL 27 DAY, NOW()),

(300005, 'Python Django 实战', '从零搭建后台管理系统...', 1, 2003, 'Python 开发', NOW() - INTERVAL 26 DAY, NOW()),
(300006, 'Python 数据分析', 'Pandas 与 NumPy 实践...', 1, 2003, 'Python 开发', NOW() - INTERVAL 25 DAY, NOW()),

(300007, 'Vue3 组合式 API', 'setup、响应式与生命周期...', 1, 2004, '前端 Vue', NOW() - INTERVAL 24 DAY, NOW()),
(300008, 'Vue Router 与 Pinia', '状态管理与路由守卫...', 1, 2004, '前端 Vue', NOW() - INTERVAL 23 DAY, NOW()),

(300009, 'React Hooks 深入', 'useEffect、useMemo...', 1, 2005, '前端 React', NOW() - INTERVAL 22 DAY, NOW()),
(300010, 'Next.js 全栈开发', 'SSR 与服务端渲染...', 1, 2005, '前端 React', NOW() - INTERVAL 21 DAY, NOW()),

(300011, 'MySQL 索引优化', 'B+Tree 与执行计划...', 1, 2006, '数据库 MySQL', NOW() - INTERVAL 20 DAY, NOW()),
(300012, 'MySQL 事务与锁', 'MVCC 与隔离级别...', 1, 2006, '数据库 MySQL', NOW() - INTERVAL 19 DAY, NOW()),

(300013, 'Redis 缓存设计', '缓存穿透与雪崩...', 1, 2007, '数据库 Redis', NOW() - INTERVAL 18 DAY, NOW()),
(300014, 'Redis 分布式锁', 'RedLock 与实战...', 1, 2007, '数据库 Redis', NOW() - INTERVAL 17 DAY, NOW()),

(300015, 'CI/CD 实践', 'GitLab CI 流水线...', 1, 2008, 'DevOps', NOW() - INTERVAL 16 DAY, NOW()),
(300016, '自动化部署脚本', 'Shell 与 Ansible...', 1, 2008, 'DevOps', NOW() - INTERVAL 15 DAY, NOW()),

(300017, 'Docker 入门教程', '镜像、容器与 Volume...', 1, 2009, 'Docker & K8s', NOW() - INTERVAL 14 DAY, NOW()),
(300018, 'Kubernetes 核心概念', 'Pod、Service、Deployment...', 1, 2009, 'Docker & K8s', NOW() - INTERVAL 13 DAY, NOW()),

(300019, '微服务拆分原则', 'DDD 与边界上下文...', 1, 2010, '微服务架构', NOW() - INTERVAL 12 DAY, NOW()),
(300020, '服务治理与熔断', 'Sentinel 与限流...', 1, 2010, '微服务架构', NOW() - INTERVAL 11 DAY, NOW()),

(300021, '高并发系统设计', '秒杀与削峰填谷...', 1, 2011, '系统设计', NOW() - INTERVAL 10 DAY, NOW()),
(300022, '分布式一致性', 'CAP、BASE 与 Raft...', 1, 2011, '系统设计', NOW() - INTERVAL 9 DAY, NOW()),

(300023, '常见算法题总结', '链表、树、动态规划...', 1, 2012, '算法与数据结构', NOW() - INTERVAL 8 DAY, NOW()),
(300024, 'LeetCode 刷题技巧', '双指针与滑动窗口...', 1, 2012, '算法与数据结构', NOW() - INTERVAL 7 DAY, NOW()),

(300025, '大模型应用实践', 'Prompt 工程与微调...', 1, 2013, 'AI 人工智能', NOW() - INTERVAL 6 DAY, NOW()),
(300026, 'AI 绘画与 Stable Diffusion', '本地部署与模型训练...', 1, 2013, 'AI 人工智能', NOW() - INTERVAL 5 DAY, NOW()),

(300027, '从用户视角看产品', '需求优先级与 MVP...', 1, 2014, '产品思维', NOW() - INTERVAL 4 DAY, NOW()),
(300028, '技术驱动产品增长', '数据埋点与迭代...', 1, 2014, '产品思维', NOW() - INTERVAL 3 DAY, NOW());


INSERT INTO `article` (`id`, `title`, `content`, `user_id`, `cart_id`, `cart_name`, `created_at`, `updated_at`) VALUES
(600001, 'Java 基础语法回顾', '变量、数据类型与控制流程...', 1, 2001, 'Java 后端', NOW() - INTERVAL 20 DAY, NOW()),
(600002, 'Java 集合框架详解', 'List、Set、Map 实现原理...', 1, 2001, 'Java 后端', NOW() - INTERVAL 19 DAY, NOW()),
(600003, 'Java 多线程编程', 'Thread、Runnable 与线程池...', 1, 2001, 'Java 后端', NOW() - INTERVAL 18 DAY, NOW()),
(600004, 'Java IO 与 NIO', '阻塞与非阻塞 IO 模型...', 1, 2001, 'Java 后端', NOW() - INTERVAL 17 DAY, NOW()),
(600005, 'Java 反射机制', '运行时动态操作类...', 1, 2001, 'Java 后端', NOW() - INTERVAL 16 DAY, NOW()),
(600006, 'Java 注解与泛型', '编译期与运行期特性...', 1, 2001, 'Java 后端', NOW() - INTERVAL 15 DAY, NOW()),
(600007, 'JVM 内存模型', '堆、栈、方法区详解...', 1, 2001, 'Java 后端', NOW() - INTERVAL 14 DAY, NOW()),
(600008, 'JVM 垃圾回收机制', 'GC 算法与收集器...', 1, 2001, 'Java 后端', NOW() - INTERVAL 13 DAY, NOW()),
(600009, 'Java 并发包 JUC', 'AQS、Lock、原子类...', 1, 2001, 'Java 后端', NOW() - INTERVAL 12 DAY, NOW()),
(600010, 'Java 网络编程', 'Socket 与 NIO 实战...', 1, 2001, 'Java 后端', NOW() - INTERVAL 11 DAY, NOW()),
(600011, 'Spring 核心原理', 'IOC 与 AOP 实现机制...', 1, 2001, 'Java 后端', NOW() - INTERVAL 10 DAY, NOW()),
(600012, 'Spring MVC 工作流程', '请求分发与拦截器...', 1, 2001, 'Java 后端', NOW() - INTERVAL 9 DAY, NOW()),
(600013, 'Spring Boot 自动配置', '@Conditional 与 Starter...', 1, 2001, 'Java 后端', NOW() - INTERVAL 8 DAY, NOW()),
(600014, 'MyBatis 源码解析', 'SQL 执行流程...', 1, 2001, 'Java 后端', NOW() - INTERVAL 7 DAY, NOW()),
(600015, 'Spring Data JPA', 'Repository 与 Specification...', 1, 2001, 'Java 后端', NOW() - INTERVAL 6 DAY, NOW()),
(600016, 'Java 日志框架', 'Logback 与 Log4j2 对比...', 1, 2001, 'Java 后端', NOW() - INTERVAL 5 DAY, NOW()),
(600017, 'Java 单元测试', 'JUnit 5 与 Mockito...', 1, 2001, 'Java 后端', NOW() - INTERVAL 4 DAY, NOW()),
(600018, 'Java 性能调优', 'JProfiler 与 Arthas...', 1, 2001, 'Java 后端', NOW() - INTERVAL 3 DAY, NOW()),
(600019, 'Java 设计模式', '单例、工厂、观察者...', 1, 2001, 'Java 后端', NOW() - INTERVAL 2 DAY, NOW()),
(600020, 'Java 项目实战', '从零搭建企业级后台...', 1, 2001, 'Java 后端', NOW() - INTERVAL 1 DAY, NOW());