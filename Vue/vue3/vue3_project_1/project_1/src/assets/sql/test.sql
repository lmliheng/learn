-- 获取文章列表
SELECT a.id, a.title, a.content, a.cart_id, c.cart_name, a.created_at, a.updated_at
FROM article a
    LEFT JOIN article_cart c ON a.cart_id = c.cart_id

SELECT a.id, a.title, a.content, a.cart_id, a.created_at, a.updated_at
FROM article a
    LEFT JOIN article_cart c ON a.cart_id = c.cart_id
ORDER BY a.created_at DESC
LIMIT 10
OFFSET
    0

SELECT a.id, a.title, a.content, a.cart_id, a.created_at, a.updated_at
FROM article a
    LEFT JOIN article_cart c ON a.cart_id = c.cart_id
WHERE
    a.cart_id = 2001
    AND a.user_id = 1
ORDER BY a.created_at DESC
LIMIT 10
OFFSET
    0;

SELECT * FROM article where user_id = 1;

SELECT a.id, a.title, a.content, a.cart_id, a.cart_name, a.created_at, a.updated_at
FROM article a
    LEFT JOIN article_cart c ON a.cart_id = c.cart_id
WHERE
    a.cart_id = 2001
    And a.user_id = 1
ORDER BY a.created_at DESC
LIMIT 10
OFFSET
    0