const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// 使用 cors 中间件
app.use(cors({
  origin: 'http://localhost:8080', // 允许的源
  methods: ['GET', 'POST'], // 允许的 HTTP 方法
  allowedHeaders: ['Content-Type'] // 允许的头部
}));

app.use(bodyParser.json());

// 运营商号段映射表
const OPERATOR_MAP = {
  '130': '联通',
  '131': '联通',
  '132': '联通',
  '155': '联通',
  '156': '联通',
  '185': '联通',
  '186': '联通',
  '145': '联通',
  '166': '联通',
  '176': '联通',
  '133': '电信',
  '153': '电信',
  '180': '电信',
  '181': '电信',
  '189': '电信',
  '177': '电信',
  '199': '电信',
  '134': '移动',
  '135': '移动',
  '136': '移动',
  '137': '移动',
  '138': '移动',
  '139': '移动',
  '150': '移动',
  '151': '移动',
  '152': '移动',
  '157': '移动',
  '158': '移动',
  '159': '移动',
  '182': '移动',
  '183': '移动',
  '184': '移动',
  '187': '移动',
  '188': '移动',
  '198': '移动'
};

// 吉凶描述
const FORTUNE_DESCRIPTIONS = [
  { fortune: '吉', description: '这是一个吉祥的号码，预示着好运连连，事事顺心！' },
  { fortune: '普通', description: '这是一个普通的号码，祝你生活平稳，一切顺利！' },
  { fortune: '凶', description: '这个号码可能带来一些小挫折，但请保持乐观，一切都会好起来的！' },
  // 这里可以继续添加更多的描述
  // ...
  // 示例：
  { fortune: '吉', description: '这个号码象征着财富和成功，祝你事业蒸蒸日上！' },
  { fortune: '普通', description: '这是一个平凡的号码，但愿你的生活充满乐趣和惊喜！' },
  { fortune: '凶', description: '这个号码可能会带来一些挑战，但坚持下去，你会看到希望的曙光！' },
  // 请根据需要添加更多描述
];

// 手机号码查询
app.get('/api/phone', (req, res) => {
  const phone = req.query.phone;
  console.log('Received phone number:', phone); // 添加日志

  if (phone &&phone.length === 11) {
    const operatorPrefix = phone.substring(0, 3);
    const operator = OPERATOR_MAP[operatorPrefix] || '未知';

    let fortune = '普通';
    let description = '这是一个普通的号码，祝你生活平稳，一切顺利！';

    if (operator.includes('联通')) {
      fortune = '吉';
      description = '这是一个吉祥的号码，预示着好运连连，事事顺心！';
    } else if (parseInt(phone[10]) % 2 === 1) {
      fortune = '凶';
      description = '这个号码可能带来一些小挫折，但请保持乐观，一切都会好起来的！';
    }

    // 随机选择一条描述
    const randomDescription = FORTUNE_DESCRIPTIONS.find(fd => fd.fortune === fortune);

    res.json({
      province: '无', // 没有具体省份信息
      city: '无', // 没有具体城市信息
      company: operator, // 运营商
      areaCode: '无', // 没有具体区号信息
      zipCode: '无', // 没有具体邮政编码信息
      fortune: randomDescription.fortune,
      description: randomDescription.description
    });
  } else {
    res.status(400).json({ error: '无效的手机号码' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
