var smjq = jQuery;
var _typei = 0;
var weichuncai_text = '';
smjq(document).ready(function() {
    var getwidth = window.localStorage.getItem("historywidth");
    var getheight = window.localStorage.getItem("historyheight");
    if (getwidth != null && getheight != null) {
        var width = getwidth;
        var height = getheight;
    } else {
        var width = document.documentElement.clientWidth - 100 - imagewidth;
        var height = document.documentElement.clientHeight - 80 - imageheight;
    }
    if (!window.localStorage.getItem("historylifetime")) {
        window.localStorage.setItem("historylifetime", new Date().getTime());
    }

    var cwidth = document.documentElement.clientWidth - 100;
    var cheight = document.documentElement.clientHeight - 20;

    var moveX = 0;
    var moveY = 0;
    var moveTop = 0;
    var moveLeft = 0;
    var moveable = false;
    var docMouseMoveEvent = document.onmousemove;
    var docMouseUpEvent = document.onmouseup;

    var docTouchMoveEvent = document.ontouchmove;
    var docTouchUpEvent = document.ontouchend;
    smjq("body").append('<div id="smchuncai" onfocus="this.blur();" style="color:#626262;z-index:999;"><div id="chuncaiface"></div><div id="dialog_chat"><div id="chat_top"></div><div id="dialog_chat_contents"><div id="dialog_chat_loading"></div><div id="tempsaying"></div><div id="showchuncaimenu"><ul class="wcc_mlist" id="shownotice">显示公告</ul><ul class="wcc_mlist" id="chatTochuncai">聊&nbsp;&nbsp;天</ul><ul class="wcc_mlist" id="foods">吃 零 食</ul><ul class="wcc_mlist" id="blogmanage">博客后台</ul><ul class="wcc_mlist" id="lifetimechuncai">生存时间</ul><ul class="wcc_mlist" id="closechuncai">关闭春菜</ul></div><div><ul id="chuncaisaying"></ul></div><div id="getmenu"> </div></div><div id="chat_bottom"></div></div></div>');
    smjq("#smchuncai").append('<div id="addinput"><div id="inp_l"><input id="talk" type="text" name="mastersay" value="" /> <input id="talkto" type="button" value=" " /></div><div id="inp_r">X</div></div>');
    smjq("body").append('<div id="callchuncai">召唤春菜</div>');
    //判断春菜是否处于隐藏状态
    var is_closechuncai = window.localStorage.getItem("is_closechuncai");
    if (is_closechuncai == 'close') {
        closechuncai_init();
    }
    //设置初始状态
    getdata("getnotice");
    setFace(1);

    smjq("#smchuncai").css('left', width + 'px');
    smjq("#smchuncai").css('top', height + 'px');
    smjq("#smchuncai").css('width', imagewidth + 'px');
    smjq("#smchuncai").css('height', imageheight + 'px');
    smjq("#callchuncai").attr("style", "top:" + cheight + "px; left:" + cwidth + "px; text-align:center;");

    smcc = document.getElementById("smchuncai");
    smcc.onmousedown = function() {
        var ent = getEvent();
        moveable = true;
        moveX = ent.clientX;
        moveY = ent.clientY;
        var obj = document.getElementById("smchuncai");
        moveTop = parseInt(obj.style.top);
        moveLeft = parseInt(obj.style.left);
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            window.getSelection().removeAllRanges();
        }
        document.onmousemove = function() {
            if (moveable) {
                var ent = getEvent();
                var x = moveLeft + ent.clientX - moveX;
                var y = moveTop + ent.clientY - moveY;
                var w = 200;
                var h = 200; //w,h为浮层宽高
                obj.style.left = x + "px";
                obj.style.top = y + "px";
            }
        };
        document.onmouseup = function() {
            if (moveable) {
                var historywidth = obj.style.left;
                var historyheight = obj.style.top;
                historywidth = historywidth.replace('px', '');
                historyheight = historyheight.replace('px', '');
                window.localStorage.setItem("historywidth", historywidth);
                window.localStorage.setItem("historyheight", historyheight);
                document.onmousemove = docMouseMoveEvent;
                document.onmouseup = docMouseUpEvent;
                moveable = false;
                moveX = 0;
                moveY = 0;
                moveTop = 0;
                moveLeft = 0;
            }
        }
    };
    smcc.ontouchstart  = function(e) {
        var ent = e.touches[0];
        moveable = true;
        moveX = ent.clientX;
        moveY = ent.clientY;
        var obj = document.getElementById("smchuncai");
        moveTop = parseInt(obj.style.top);
        moveLeft = parseInt(obj.style.left);
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            window.getSelection().removeAllRanges();
        }
        document.ontouchmove = function(e) {
            e.preventDefault();
            var ent = e.touches[0];
            if (moveable) {
                var x = moveLeft + ent.clientX - moveX;
                var y = moveTop + ent.clientY - moveY;
                var w = 200;
                var h = 200; //w,h为浮层宽高
                obj.style.left = x + "px";
                obj.style.top = y + "px";
            }
        };
        document.ontouchend = function(ent) {
            if (moveable) {
                var historywidth = obj.style.left;
                var historyheight = obj.style.top;
                historywidth = historywidth.replace('px', '');
                historyheight = historyheight.replace('px', '');
                window.localStorage.setItem("historywidth", historywidth);
                window.localStorage.setItem("historyheight", historyheight);
                document.ontouchmove = docTouchMoveEvent;
                document.ontouchend = docTouchUpEvent;
                moveable = false;
                moveX = 0;
                moveY = 0;
                moveTop = 0;
                moveLeft = 0;
            }
        }
    };
    smjq("#getmenu").click(function() {
        chuncaiMenu();
        setFace(1);
    });
    smjq("#shownotice").click(function() {
        getdata("getnotice");
        setFace(1);
    });
    smjq("#closechuncai").click(function() {
        setFace(3);
        closechuncai();
    });
    smjq("#callchuncai").click(function() {
        setFace(2);
        callchuncai();
        window.localStorage.setItem("is_closechuncai", '');
    });
    smjq("#shownotice").click(function() {
        setFace(1);
        closeChuncaiMenu();
    });
    smjq("#lifetimechuncai").click(function() {
        closeChuncaiMenu();
        closeNotice();
        setFace(2);
        getdata('showlifetime');
    });
    smjq("#chatTochuncai").click(function() {
        showInput();
    });
    smjq("#inp_r").click(function() {
        closeInput();
        chuncaiSay('不聊天了吗？(→_→)');
        setFace(3);
    });
    smjq("#talkto").click(function() {
        getdata("talking");
    });
    smjq("#blogmanage").click(function() {
        closeChuncaiMenu();
        closeNotice();
        smjq("#getmenu").css("display", "none");
        chuncaiSay("马上就跳转到后台管理页面去了哦～～～");
        setFace(2);
        setTimeout(function() {
            chuncaiSay("对啊！静态网页哪来的后台啊～～～");
            smjq("#getmenu").css("display", "block");
            //window.location.href = _site_path + '/wp-admin/';
        }, 2000);
    });
    smjq("#foods").click(function() {
        closeChuncaiMenu();
        closeNotice();
        getdata("foods");
    });
    /*    smjq("#showchuncaimenu").hover(function(){
          },function(){
          smjq("#showchuncaimenu").slideUp('slow').show();
          });*/
    document.onmousemove = function() {
        stoptime();
        tol = 0;
        setTime();
        //chuncaiSay("啊，野生的主人出现了！ ～～～O口O");
    }
    talkSelf(talktime);
    document.getElementById("smchuncai").onmouseover = function() {
        if (talkobj) {
            clearTimeout(talkobj);
        }
        talktime = 0;
        talkSelf(talktime);
    }
});

function getEvent() {
    return window.event || arguments.callee.caller.arguments[0];
}

function eatfood(obj) {
    var eatstatus = window.localStorage.getItem("eattimes") || JSON.stringify({ eattimes: 0, time: new Date().getTime() });
    var gettimes = JSON.parse(eatstatus).eattimes;
    if (new Date().getTime() - eatstatus.time > 8 * 3600 * 1000) {
        gettimes = 0;
    }
    console.log(gettimes);
    if (parseInt(gettimes) > parseInt(9)) {
        chuncaiSay("主人是个大混蛋！！");
        setFace(3);
        closechuncai_evil();
    } else if (parseInt(gettimes) > parseInt(7)) {
        chuncaiSay(".....................肚子要炸了，死也不要再吃了～～！！！TAT");
        setFace(3);
    } else if (parseInt(gettimes) == parseInt(5)) {
        chuncaiSay("我已经吃饱了，不要再吃啦......");
        setFace(3);
    } else if (parseInt(gettimes) == parseInt(3)) {
        chuncaiSay("多谢款待，我吃饱啦～～～ ╰（￣▽￣）╭");
        setFace(2);
    } else {
        var id = obj.replace("f", '');
        getdata('eatsay', id);
    }
    gettimes++;
    window.localStorage.setItem("eattimes", JSON.stringify({ eattimes: gettimes, time: new Date().getTime() }));
}

function chuncaiMenu() {
    //smjq("#showchuncaimenu").slideDown('fast').show();
    clearChuncaiSay();
    closeInput();
    chuncaiSay("准备做什么呢？");
    smjq("#showchuncaimenu").css("display", "block");
    smjq("#getmenu").css("display", "none");
    smjq("#chuncaisaying").css("display", "none");
}

function closeChuncaiMenu() {
    clearChuncaiSay();
    smjq("#showchuncaimenu").css("display", "none");
    showNotice();
    smjq("#getmenu").css("display", "block");
}

function showNotice() {
    smjq("#chuncaisaying").css("display", "block");
}

function closechuncai() {
    stopTalkSelf();
    chuncaiSay("记得再叫我出来哦...");
    smjq("#showchuncaimenu").css("display", "none");
    setTimeout(function() {
        smjq("#smchuncai").fadeOut(1200);
        smjq("#callchuncai").css("display", "block");
    }, 2000);
    //保存关闭状态的春菜
    window.localStorage.setItem("is_closechuncai", 'close');
}

function closechuncai_evil() {
    stopTalkSelf();
    smjq("#showchuncaimenu").css("display", "none");
    setTimeout(function() {
        smjq("#smchuncai").fadeOut(1200);
        smjq("#callchuncai").css("display", "block");
    }, 2000);
}

function closechuncai_init() {
    stopTalkSelf();
    smjq("#showchuncaimenu").css("display", "none");
    setTimeout(function() {
        smjq("#smchuncai").css("display", "none");
        smjq("#callchuncai").css("display", "block");
    }, 30);
}

function callchuncai() {
    talkSelf(talktime);
    smjq("#smchuncai").fadeIn('normal');
    smjq("#callchuncai").css("display", "none");
    closeChuncaiMenu();
    closeNotice();
    chuncaiSay("我回来啦～");
    window.localStorage.setItem("is_closechuncai", '');
}

function chuncaiSay(s) {
    clearChuncaiSay();
    smjq("#tempsaying").append(s);
    smjq("#tempsaying").css("display", "block");
    weichuncai_text = s;
    typeWords();
}

function clearChuncaiSay() {
    document.getElementById("tempsaying").innerHTML = '';
}

function closeNotice() {
    smjq("#chuncaisaying").css("display", "none");
}

function showInput() {
    closeChuncaiMenu();
    closeNotice();
    chuncaiSay("............?");
    smjq("#addinput").css("display", "block");
}

function closeInput() {
    setFace(3);
    smjq("#addinput").css("display", "none");
}

function clearInput() {
    document.getElementById("talk").value = '';
}

function createFace(a, b, c) {
    smjq("head").append('<div id="hiddenfaces"><img id="hf1" src="' + a + '" /><img id="hf2" src="' + b + '" /><img id="hf3" src="' + c + '" /></div>');
    setFace(1);
}

function setFace(num) {
    obj = document.getElementById("hf" + num).src;
    smjq("#chuncaiface").attr("style", "background:url(" + obj + ") no-repeat scroll 50% 0% transparent; width:" + imagewidth + "px;height:" + imageheight + "px;");
}

function getdata(el, id) {
    smjq("#tempsaying").css('display', "none");
    var dat = {
        notice: '欢迎来玩~',
        'adminname': 'sonack',
        'isnotice': '',
        'ques': ['早上好', '中午好', '下午好', '晚上好', '晚安', 'sonack', '你好'],
        'ans': ['早上好～', '中午好～', '下午好～', '晚上好～', '晚安～', '是我的主人哦~', '你好呀～小不点'],
        'lifetime': {
            'rakutori': 1,
            'neko': 2,
            'chinese_moe': 3,
        },
        'ccs': ['rakutori', 'neko', 'chinese_moe'],
        'defaultccs': 'rakutori',
        'foods': ['金坷垃', '咸梅干'],
        'eatsay': ['吃了金坷垃，一刀能秒一万八～！', '吃咸梅干，变超人！哦耶～～～'],
    }
    if (el == 'defaultccs') {
        chuncaiSay(dat.defaultccs);
    } else if (el == 'getnotice') {
        chuncaiSay(dat.notice);
        setFace(1);
    } else if (el == 'showlifetime') {
        var mt = new Date().getTime() - window.localStorage.getItem("historylifetime");
        var day = parseInt(mt / (1000 * 24 * 3600));
        var hour = parseInt((mt - day * 1000 * 24 * 3600) / (1000 * 3600));
        var min = parseInt((mt - day * 3600 * 24 * 1000 - hour * 3600 * 1000) / (1000 * 60));
        var sec = parseInt((mt % (1000 * 60)) / 1000);
        var s = '我已经认识您 <font color="red">' + day + '</font> 天 <font color="red">' + hour + '</font> 小时 <font color="red">' + min + '</font> 分钟 <font color="red">' + sec + '</font> 秒的快乐时光啦～*^_^*';
        chuncaiSay(s);
    } else if (el == 'talking') {
        var talkcon = smjq("#talk").val();
        var i = in_array(talkcon, dat.ques);
        var types = typeof(i);
        if (types != 'boolean') {
            chuncaiSay(dat.ans[i]);
            setFace(2);
        } else {
            chuncaiSay('.......................嗯？');
            setFace(3);
        }
        clearInput();
    } else if (el == 'foods') {
        var str = '';
        var arr = dat.foods;
        var preg = /function/;
        for (var i in arr) {
            if (arr[i] != '' && !preg.test(arr[i])) {
                str += '<ul id="f' + i + '" class="eatfood" onclick="eatfood(this.id)">' + arr[i] + '</ul>';
            }
        }
        chuncaiSay(str);
    } else if (el = "eatsay") {
        var str = dat.eatsay[id];
        chuncaiSay(str);
        setFace(2);
    } else if (el = "talkself") {
        var arr = dat.talkself;
        return arr;
    }
}

function in_array(str, arr) {
    for (var i in arr) {
        if (arr[i] == str) {
            return i;
        }
    }
    return false;
}

var timenum;
var tol = 0;
//10分钟后页面没有响应就停止活动
var goal = 10 * 60;

function setTime() {
    tol++;
    //document.body.innerHTML(tol);
    timenum = window.setTimeout("setTime('" + tol + "')", 1000);
    if (parseInt(tol) == parseInt(goal)) {
        stopTalkSelf();
        closeChuncaiMenu();
        closeNotice();
        closeInput();
        chuncaiSay("主人跑到哪里去了呢....");
        setFace(3);
        stoptime();
    }
}

function stoptime() {
    if (timenum) {
        clearTimeout(timenum);
    }
}
var talktime = 0;
//设置自言自语频率（单位：秒）
var talkself = 60;
var talkobj;
var tsi = 0;
var talkself_arr = [
    ["白日依山尽，黄河入海流，欲穷千里目，更上.....一层楼？", "1"],
    ["我看见主人熊猫眼又加重了！", "3"],
    ["我是不是很厉害呀～～？", "2"],
    ["5555...昨天有个小孩子跟我抢棒棒糖吃.....", "3"],
    ["昨天我好像看见主人又在众人之前卖萌了哦～", "2"]
];

function talkSelf(talktime) {
    talktime++;
    var tslen = talkself_arr.length;
    /*  if(parseInt(tsi) >= parseInt(tslen)){
        tsi = 0;
        }*/
    var yushu = talktime % talkself;
    if (parseInt(yushu) == parseInt(9)) {
        closeChuncaiMenu();
        closeNotice();
        closeInput();
        tsi = Math.floor(Math.random() * talkself_arr.length + 1) - 1;
        chuncaiSay(talkself_arr[tsi][0]);
        setFace(talkself_arr[tsi][1]);
    }
    talkobj = window.setTimeout("talkSelf(" + talktime + ")", 1000);
}

function stopTalkSelf() {
    if (talkobj) {
        clearTimeout(talkobj);
    }
}

function arrayShuffle(arr) {
    var result = [],
    len = arr.length;
    while (len--) {
        result[result.length] = arr.splice(Math.floor(Math.random() * (len + 1)), 1);
    }
    return result;
}


function typeWords() {
    var p = 1;
    var str = weichuncai_text.substr(0, _typei);
    var w = weichuncai_text.substr(_typei, 1);
    if (w == "<") {
        str += weichuncai_text.substr(_typei, weichuncai_text.substr(_typei).indexOf(">") + 1);
        p = weichuncai_text.substr(_typei).indexOf(">") + 1;
    }
    _typei += p;
    document.getElementById("tempsaying").innerHTML = str;
    txtst = setTimeout("typeWords()", 20);
    if (_typei > weichuncai_text.length) {
        clearTimeout(txtst);
        _typei = 0;
    }
}

