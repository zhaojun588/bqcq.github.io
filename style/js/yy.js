var publicUrl = "https://event.games.wanmei.com";
//var publicUrl = "http://event.t.sys.wanmei.com";

var secCode, wmCaptcha1, capTicket;
var is_mobile = isMobile();
var is_ipad = /ipad/i.test(navigator.userAgent);
//wmCaptcha
function wmCaptcha() {
    $.ajax({
        type: 'get',
        url: 'https://event.games.wanmei.com/mcaptcha/getAiCaptcha',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (rdata) {
            var appId = rdata.appId;
            capTicket = rdata.capTicket;
            wmCaptcha1 = new WanmeiCaptcha({ 'containerId': 'container_pick_text' });
            wmCaptcha1.init({
                appId: appId,
                capTicket: capTicket,
                capStyle: 'popup',
                onRefresh: function () {
                    wmCaptcha1 = null;
                    wmCaptcha();
                }
            });
        },
        error: function () {
            alert('网络错误，刷新重试！');
        }
    });
}

var url = window.location.href;

function parseQueryString(url) {
    var str = url.split("?")[1];    //通过?得到一个数组,取?后面的参数
    if (str) {
        var items = str.split("&");    //分割成数组
        var arr, name, value;

        for (var i = 0; i < items.length; i++) {
            arr = items[i].split("=");    //["key0", "0"]
            name = arr[0];
            value = arr[1];
            this[name] = value;
        }
    }
}

var obj = new parseQueryString(url);
var gloable_from = obj.from ? obj.from : '';
var gloable_extrainfo = 'm';
var gloable_entrance = obj.entrance ? obj.entrance : '';
var gloable_icode = obj.friendcode ? obj.friendcode : '';
var gloable_system = 'ios';
var gloable_isLogin = false;                                //是否登录
var gloable_isBook = false;                                 //是否预约
var gloable_iscountry = false;                              //是否为海外用户
var gloable_popup = obj.popup ? obj.popup : '';             //唤起预约弹窗
var hasAnswer  = false;
if (gloable_popup == 1) {
    $('.no_yuyue').click();
    $('#pop_yy').fadeIn().addClass('act');
}

var email = ''; //邮箱
var gloable_leftTimes = 0;
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
if (IsPC()) {
    gloable_extrainfo = 'pc';
}

var $initnumb = $('.invite-numb');
var $quest = $('.question');

//初始化
function getInitMsg() {
    $.ajax({
        type: 'get',
        url: publicUrl + '/m/tlbb/booking/init',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (data) {
            if (data.success) {
                //判断是否登录
                gloable_isLogin = data.isLogin;                 //当前用户是否登录（true/false）(当此字段为true时，有下面的数据)
                gloable_isBook = data.isBook; 
                hasAnswer = data.hasAnswer;           
                //当前用户是否预约（正常情况下都是true，如有异常情况为false，就没有下面的数据）
                var allNum = parseInt(data.bookNum);            //bookNum: 当前预约总人数
                var yqNum = parseInt(data.inviteNum);           //inviteNum: 用户已邀请人数
                console.log(data.inviteNum);          

                                                           //leftTimes: 用户剩余抽奖次数
                if (gloable_isLogin) {
                    $('.userName').html(data.phone);
                    $('.login').hide();
                    $('.loginout').show();
                    // $('.sub_form_box').hide();
                    $('.btnYY').addClass('endYY');
                    invite();
                    if(yqNum){
                        $initnumb.html(yqNum);
                    }else{
                        $initnumb.html(0);
                    }
                    
                    if(hasAnswer){
                        $quest.hide();
                        $('.showrotateBtn').hide();
                    }else{
                        $quest.show();
                        $('.showrotateBtn').show();
                    }
                    
                } else {
                    $('.loginout').hide();
                    $('.login').show();
                    $('.userName').html('');
                    $('.btnYY').removeClass('endYY');
                    // $('.sub_form_box').show();
                    $('.sub_succ_login').hide();
                    $('.sub_succ_box').hide();
                    $(".no_yuyue").click();
                    wmCaptcha();
                }
            };
        }
    });
}
getInitMsg();

var invite_link = '';
function invite() {
    $.ajax({
        type: 'get',
        url: publicUrl + '/m/tlbb/booking/invite',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (rdata) {
            if (rdata.success) {
                if(is_mobile && !is_ipad){
                    invite_link = 'https://tlbb.wanmei.com/m/index.html?friendcode=' + rdata.message;
                }else{
                    invite_link = 'https://tlbb.wanmei.com/index.html?friendcode=' + rdata.message;
                }
                $('.shareUrl').html(invite_link);
                $('.copy_invite_text').val('金庸正版授权《天龙八部2手游》预约开启，一起来玩呀！【'+ invite_link +'】抢先预约得公测大礼，更高概率获得测试资格~');
            } else {
                alert(rdata.message);
            }
        },
        error: function () {
            alert('网络错误，请稍后重试！');
        }
    });
}

var clipboard = new Clipboard('.copyBtnText', {
    text: function () {
        return $(".copy_invite_text").val();
    }
});

clipboard.on('success', function (e) {
    alert("复制成功");
});

clipboard.on('error', function (e) {
    alert("复制失败");
});
var clipboard = new Clipboard('.copyBtnText2', {
    text: function () {
        return $("#codetxt").text();
    }
});

clipboard.on('success', function (e) {
    alert("复制成功");
});

clipboard.on('error', function (e) {
    alert("复制失败");
});


//心动预约登录
$('.btnyyue').on('click', function () {
    if(gloable_isLogin){
        if(hasAnswer){
            $('#InviteFriendsShow').fadeIn(300);
        }else{
            $('#pop_yy').fadeIn().find('.sub_form_box').hide();
            $('.sub_succ_box').show();
        }
    }else{
        $('.no_yuyue').click();
        $('#pop_yy').fadeIn().find('.sub_form_box').show();
    }
    
});

//问卷调查
$('.question').on('click',function(){
    if(gloable_isLogin){
        window.location.href='https://surveys.games.wanmei.com/survey/rmIfeq'+'?time='+((new Date()).getTime());
    }else{
        $('.no_yuyue').click();
        $('#pop_yy').fadeIn().find('.sub_form_box').show();
    }
});


//点击登出
$('.quit').click(function () {
    $.ajax({
        type: 'get',
        url: publicUrl + '/m/tlbb/booking/logout',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (res) {
            if (res.success) {
                getInitMsg();
            }
        },
        error: function () {
            console.log('网络错误，请稍后重试！');
        }
    });
});

//是否为海外用户
$('.iscountry input').on('change', function () {
    $(this).closest('label').addClass('on').siblings().removeClass('on');
    if ($(this).closest('label').index()) {//海外
        gloable_iscountry = true;
        $('.sub_right').eq(0).hide();
        $('.sub_right').eq(1).show();
    } else {//国内
        gloable_iscountry = false;
        $('.sub_right').eq(0).show();
        $('.sub_right').eq(1).hide();
    }
});
var $email = $('.sub-email');
//选择系统
$('.system a').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
    if ($('.system a.on').index()) {//and
        gloable_system = 'android';
        $email.hide();
    } else {
        gloable_system = 'ios';
        $email.show();
    }
});
//提交预约
$('.btn_sub').click(function () {
    var phone = '';
    
    if (gloable_iscountry) {
        var areaCode = $('.area_code_select').val();
        phone = $('.phone_inter').val();
        if (areaCode == '') {
            alert('区号不能为空。');
            return false;
        }
        if (phone == '') {
            alert('手机号不能为空。');
            return false;
        }
        areaCode = areaCode.replace(/^0{0,}/g, '');
        phone = areaCode + '-' + phone;
    } else {
        phone = $('.phone').val();
        if (phone == '') {
            alert('手机号不能为空。');
            return false;
        }
    }
    var code = $('.tel_code').val();
    if (code == '') {
        alert('手机验证码不能为空。');
        return false;
    }
 
    if (gloable_isBook) {//如果是已预约 system为空
        gloable_system = '';
        email = ''; 
    }
    if ($('.end_yuyue').hasClass('on')) {    //判断预约未预约 系统传空
        gloable_system = ''
    } else {
        if ($('.system a.on').index()) {//and
            gloable_system = 'android';
            email = '';
        } else {
            gloable_system = 'ios';
            email = $.trim($('.email').val());
            if(email == ''){
                alert('邮箱不能为空。');
                return false;
            }else{
                var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                if(!myreg.test(email)){
                    alert("请输入正确邮箱地址");
                    return false;
                }
            }
        }
    }
    $.ajax({
        type: 'get',
        url: publicUrl + '/m/tlbb/booking/submit',
        data: {
            system: gloable_system,             //系统
            phone: phone,               //手机号
            code: code,                 //短信验证码
            entrance: gloable_entrance + gloable_from,  //来源入口
            icode: gloable_icode,
            extrainfo: gloable_extrainfo,        //'pc' or 'm'
            email: email,
        },
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (rdata) {
            console.log(rdata)
            if (rdata.success) {
                getInitMsg();
                $('.sub_form_box').hide();
                $('.sub_succ_box').show();
            } else {
                if (rdata.status == -3) {//判断没有预约，提示去预约
                    alert('您尚未预约，请选择“未预约”标签进行预约！');
                    wmCaptcha();
                } else if (rdata.status == -9) {//验证码错误
                    alert(rdata.message);
                } else {
                    alert(rdata.message);
                    wmCaptcha();
                }
            }
        },
        error: function () {
            alert('网络错误，请稍后重试！');
        }
    });
});

//发送短信
var sendIngFlag = false;
$('.get_yzm_tel').click(function () {
    if (!sendIngFlag) {
        var $this = $(this);
        var phone = '';
        var url;
        url = publicUrl + '/newsendcode/tlbb/booking/getCodeWithAi';
        if (gloable_iscountry) {
            var areaCode = $('.area_code_select').val();
            phone = $('.phone_inter').val();
            
            if (areaCode == '') {
                alert('区号不能为空。');
                return false;
            }
            if (phone == '') {
                alert('手机号不能为空。');
                return false;
            }
            areaCode = areaCode.replace(/^0{0,}/g, '');
            phone = areaCode + '-' + phone;
        } else {
            phone = $('.phone').val();
            if (phone == '') {
                alert('手机号不能为空。');
                return false;
            }
        }
        secCode = wmCaptcha1.getValidateResult();
        if (!secCode) {
            alert('请先进行认证。');
            return false;
        }
        sendIngFlag = true;
        $.ajax({
            type: 'get',
            url: url,
            data: {
                phone: phone,
                ticket: capTicket,
                secCode: secCode
            },
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function (rdata) {
                if (rdata.success) {
                    alert(rdata.message);
                    var Total = 60;
                    var t = setInterval(function () {
                        if (Total > 0) {
                            Total--;
                            $this.html(Total + '秒后重新获取');
                        } else {
                            $this.html('点击获取验证码');
                            clearInterval(t);
                            wmCaptcha();
                            sendIngFlag = false;
                        }
                    }, 1000);
                } else {
                    alert(rdata.message);
                    wmCaptcha();
                    sendIngFlag = false;
                }
            },
            error: function () {
                wmCaptcha();
                sendIngFlag = false;
                alert('网络错误，请稍后重试！');
            }
        });
    }
});


// 已预约 未预约切换
$('.yuyue_tab a').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
    if ($(this).hasClass('end_yuyue')) {//如果是已预约
        $(".btn_sub").removeClass("btn_sub_yuyue");
        $('.system').hide();
        $('.yuyue_tip1').removeClass('on');
        $('.yuyue_tip2').addClass('on');
        //gloable_isBook =true
        $email.hide();
    } else {//如果是未预约
        $('.system').show();
        $(".system .f_left").click();
        $('.yuyue_tip1').addClass('on');
        $('.yuyue_tip2').removeClass('on');
        $(".btn_sub").addClass("btn_sub_yuyue");
        //gloable_isBook = false
        $email.show();
    }
});

//关闭弹出框
$(".closeBtn").click(function () {
    $(this).parent("div").parents("div.pop_fixed").fadeOut();
});

/*// 邀请好友
$('.btn-invite').on('click',function(){
    if(gloable_isLogin){
       $('#InviteFriendsShow').show();
    }else{
        $('.no_yuyue').click();
        $('#pop_yy').fadeIn().find('.sub_form_box').show();
    }
});
*/



