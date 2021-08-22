$(function(){
    var isPlayMusic = false;
    var isplayEnd = false; 
    var musicBg = document.getElementById('musicBg');
    var $music = $('.music');
    $music.on('click',function(){
        if($(this).hasClass('active')){
            musicBg.pause();
            $music.removeClass('active')
            isPlayMusic = false;
        }else{
            musicBg.play();
            $music.addClass('active')
            isPlayMusic = true;
        }
    });
    try{
        var paused;
        document.addEventListener('visibilitychange', function() {
            var isHidden = document.hidden;
            if (isHidden) {
                paused = musicBg.paused;
                musicBg.pause();
                $music.removeClass('active');
            } else {
                if(!paused){
                    musicBg.play();
                    $music.addClass('active');
                }
                
            }
        });
    }catch(err){

    }
    var swiper = new Swiper('.role-container', {
        navigation: {
            nextEl: '.role-next',
            prevEl: '.role-prev',
        },
        // effect : 'fade',
        // fadeEffect: {
        //     crossFade: true,
        // },
        pagination: {
            el: '.role-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '"><img src="https://tlbb.wanmei.com/images/point'+(index + 1)+'.png"/></span>';
            },
        },
        loop:true,
        autoplay:true,
    });
    $(".slideBox").slide( { mainCell:".bd ul", effect:'fold',autoPlay:true,trigger:'click',easing:'swing',delayTime:500,mouseOverStop:true,pnLoop:true });

    var $page = $('.silder-right li');
    var $cont = $('.page');
    var $bg = $('.bgbox .bg');
    var oNow = 0;
    var swiperPage = new Swiper('.page-container', {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
            el: '.page-pagination',
            clickable: true,
        },
        on:{
            slideChangeTransitionStart: function(){
              //alert(this.activeIndex);
              $bg.removeClass('active').eq(this.activeIndex).addClass('active');
              $cont.removeClass('cur').eq(this.activeIndex).addClass('cur');
              $page.removeClass('on').eq(this.activeIndex).addClass('on');
            },
        }
    });
    
    $page.on('click',function(){
        oNow = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $cont.removeClass('cur').eq(oNow).addClass('cur');
        $bg.removeClass('active').eq(oNow).addClass('active');
        $('.page-pagination span').eq(oNow).click();
    });

    //视频
    var myVideo = document.getElementById('myvideo');
    var $popVideo = $('.pop-video');
    $('.btnPlay').on('click',function(){
        $popVideo.fadeIn();
        myVideo.play();
        musicBg.pause();
        $music.removeClass('active');
    });

    //关闭视频
    $('.close1').on('click',function(){
        myVideo.pause();
        $popVideo.hide();
    });

    var $newCont = $('.news-body');
    //新闻切换
    $('.newstab span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
        $newCont.hide().eq($(this).index()).show();
    });

    $('.showfriendsBtn').on('click',function(){
        $(this).closest('.pop_fixed').hide();
        $('#InviteFriendsShow').show();
    });
});