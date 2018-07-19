---
title: chrome扩展开发笔记
pid: chrome扩展开发笔记
categories:
  - 杂项
tags: []
date: 2016-10-19 23:15:06
---
学习chrome扩展开发是一件十分有趣的事情。如果你对Web前端技术比较熟悉，那么很快就会上手。
<!-- more -->

## Manifest文件

chrome扩展的入口文件是<span class="ic">manifest.json</span>，它包含了一些键值对。Google官方对扩展(extension)和应用(application)对<span class="ic">manifest.json</span>有不同的区分，但两者共享了很多属性。chrome会根据扩展独享的属性或者应用独享的属性来判断当前程序是以扩展还是应用的方式对待。

chrome扩展的<span class="ic">manifest.json</span>必须包含<span class="ic">name</span>、<span class="ic">version</span>、<span class="ic">manifest_version</span>属性。目前，<span class="ic">manifest_version</span>只能为2，对于应用来说，还必须包含<span class="ic">app</span>属性。其他可选属性还包括<span class="ic">browser_action</span>、<span class="ic">page_action</span>、<span class="ic">background</span><span class="ic">permissions</span>、<span class="ic">options_page</span>、<span class="ic">content_scripts</span>等。

## Chrome扩展基础
<span class="ic">manifest.json</span>中的<span class="ic">content_scripts</span>指定哪些脚本何时注入哪些页面中，<span class="ic">content_scripts</span>是一个数组[]。

每个元素都是


    {
        "matches":xxxx,
        "exclude_matches":xxxx,
        "css":xxxx,
        "js":xxxx,
        "run_at":xxxx,
        "all_frames":xxxx,
        "include_globs":xxxx,
        "exclude_globs":xxxx
        ...
    }


的形式，各个属性作用如下:

1.<span class="ic">matches</span>属性定义了哪些页面会被注入脚本
2.<span class="ic">exclude_matches</span>则定义了哪些脚本不会被注入脚本
3.<span class="ic">css</span>和<span class="ic">js</span>对应了要注入的CSS样式和JavaScript脚本
4.<span class="ic">run_at</span>定义了脚本何时注入
5.<span class="ic">all_frames</span>定义了脚本是否会注入**嵌入式框架**中
6.<span class="ic">include_globs</span>和<span class="ic">exclude_globs</span>则是全局URL匹配

最终脚本是否会被注入由<span class="ic">matches</span>、<span class="ic">exclude_matches</span>、<span class="ic">include_globs</span>和<span class="ic">exclude_globs</span>的值共同决定。即如果URL匹配<span class="ic">matches</span>值的同时也匹配<span class="ic">include_globs</span>的值，则会被注入。如果URL匹配<span class="ic">exclude_matches</span>的值或者<span class="ic">exclude_globs</span>的值，则不会被注入。

<span class="ic">content_scripts</span>中的脚本只是共享页面的DOM，而不共享页面中嵌入的js的命名空间。