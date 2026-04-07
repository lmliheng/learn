const axios = require('axios');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');



router.get('/test', (req, res) => {
    res.send('hello world');
    console.log(req.params);
    console.log('访问了/api/test');
})

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log(username);

        const response = await axios.get(`https://api.github.com/users/${username}`,
            {
                headers: {
                    'X-GitHub-Api-Version': '2026-03-10'
                }
            }
        );
        res.json(response.data); // 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '获取数据失败' });
    }
});

// 配置 Multer 存储策略（文件保存到 uploads 目录，文件名保留原始名）
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    // 确保 uploads 目录存在，不存在则创建
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 保留原始文件名（也可自定义，如加时间戳避免重名）
    cb(null, file.originalname);
  },
});
// 创建 Multer 实例
const upload = multer({ storage });

router.post('/upload', upload.single('img'), (req, res) => {
  try {
    // 上传成功后，返回图片的访问 URL
    const imageUrl = `http://127.0.0.1:3001/uploads/${req.file.originalname}`;
    res.json({
      code: 200,
      message: '上传成功',
      data: { imageUrl },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '上传失败',
      error: error.message,
    });
  }
    res.send('文件上传成功');
})

module.exports = router