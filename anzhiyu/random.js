var posts=["2025/03/21/若依开发笔记-1：若依搭建/","2025/03/23/若依开发笔记-2：入门项目/","2025/03/11/妙妙工具网站/","2025/02/11/浏览器去广告插件/","2025/03/22/若依开发笔记-3：功能详解/","2025/03/23/若依开发笔记-4：源码分析/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };