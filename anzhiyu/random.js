var posts=["2025/03/11/妙妙工具网站/","2025/02/11/浏览器去广告插件/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };