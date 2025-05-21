// live2d_path 参数建议使用绝对路径
// const live2d_path = 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.2/dist/';
// const live2d_path = '/dist/';
const live2d_path = "/live2d-widget/dist/";

// 封装异步加载资源的方法
// 定义一个函数，用于加载外部资源
function loadExternalResource(url, type) {
  // 返回一个Promise对象
  return new Promise((resolve, reject) => {
    // 声明一个变量，用于存储创建的标签
    let tag;

    // 如果type为css，则创建一个link标签
    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    }
    // 如果type为js，则创建一个script标签
    else if (type === 'js') {
      tag = document.createElement('script');
      tag.type = 'module';
      tag.src = url;
    }
    // 如果tag存在，则添加到head标签中
    if (tag) {
      // 当资源加载成功时，调用resolve函数，并传入url
      tag.onload = () => resolve(url);
      // 当资源加载失败时，调用reject函数，并传入url
      tag.onerror = () => reject(url);
      // 将标签添加到head标签中
      document.head.appendChild(tag);
    }
  });
}

// 加载 live2d.min.js waifu.css waifu-tips.js
// 如果担心手机上显示效果不佳，可以通过 `if (screen.width >= 768)` 来判断是否加载
(async () => {
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);
  // 配置选项的具体用法见 README.md
  initWidget({
    waifuPath: live2d_path + 'waifu-tips.json',
    cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
    cubism2Path: live2d_path + 'live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'warn',
    drag: false,
  });
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');
console.log(`
Source: https://github.com/stevenjoezhang/live2d-widget

く__,.ヘヽ.        /  ,ー､ 〉
         ＼ ', !-─‐-i  /  /´
         ／｀ｰ'       L/／｀ヽ､
       /   ／,   /|   ,   ,       ',
     ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
      ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
        !,/7 '0'     ´0iソ|    |
        |.从"    _     ,,,, / |./    |
        ﾚ'| i＞.､,,__  _,.イ /   .i   |
          ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
            | |/i 〈|/   i  ,.ﾍ |  i  |
           .|/ /  ｉ：    ﾍ!    ＼  |
            kヽ>､ﾊ    _,.ﾍ､    /､!
            !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
            ﾚ'ヽL__|___i,___,ンﾚ|ノ
                ﾄ-,/  |___./
                'ｰ'    !_,.:
`);
