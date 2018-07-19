// Add a tail to every post from tail.md
// Great for adding copyright info

var fs = require('fs');

hexo.extend.filter.register('before_post_render', function(data){
    if(data.copyright == false) return data;
    var file_content = fs.readFileSync('tail.md');
    if(file_content) 
    {
        data.content += file_content;
        var permalink = '\n本文永久链接：<a href="' +data.permalink + '">' + data.permalink + '</a>\n<hr />';
        data.content += permalink + "</div>";
    }
    return data;
});