const superagent= require('superagent');
const cheerio = require('cheerio');

let getHotNews = (res) => {
  let hotNews = [];
  let $ = cheerio.load(res.text);

  $('div#pane-news ul li a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(),        // 获取标题
      href: $(ele).attr('href')    // 获取网页链接
    };
    hotNews.push(news)              // 存入最终结果数组
  });
  return hotNews
};


const username = 'mgdemo@knownsec.com';
const password = 'HALO&678dxcddd';

superagent.get(`http:${username}:${password}//adq.chinacmbc.org/wp-login.php`).end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`抓取失败 - ${err}`)
  } else {
   // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
   // 抓取热点新闻数据
   const hotNews = getHotNews(res)
   console.log('hotNews:', hotNews);
  }
});


