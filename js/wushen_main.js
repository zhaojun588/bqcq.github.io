 
(function( SQ, $ ) {
    var main = {
        init: function () {
            var ts = this;
              ts.role();
        },
        role: function() {
            var $tip = $( "#roleName" ),
                $tab = $( "#roleTab li" ),
                $panels = $( "#roleCont .role-panel" ),
                offset,
                index = 0,
                ts = this;
            $( "#roleTab" ).on( "mouseenter", "li", function() {
                var $ts = $(this);
                offset = $ts.offset();
                index = $tab.index( $ts );

                $tip.html( $ts.find("a").attr("title") ).css({
                    "left": offset.left+$ts.width() - 16, "top": offset.top
                }).show();

                $ts.addClass( "cur" ).siblings().removeClass( "cur" );
                $panels.removeClass( "curMod" ).eq(index).addClass( "curMod" );
 
            });
            var mid = 0;
            $tab.eq( mid ).trigger( "mouseenter" );
            // 翻页;
            var t_index = 0,
                init_top = 0,
                $ul = $( "#roleTab ul" ),
                h = $tab.outerHeight(true);
            $ul.css({
                "height": $tab.length*$tab.outerHeight(true), "left": 0, "position": "absolute"
            });
            // 下一页;
            $(  "#nextBtn" ).on( "click", function(e) {

                e.preventDefault();

                if ( $tab.length-5 > t_index ) {
                    $tab.removeClass( "cur" );
                    $tip.hide();
                    
                    $ul.animate({
                        "top": init_top = -h*++t_index
                    }, 200, function() {
                        //$tab.eq( ++mid ).trigger( "mouseenter" );
                    });
                    
                }
            });
            // 上一页;
            $(  "#prevBtn" ).on( "click", function(e) {

                e.preventDefault();
                
                if ( t_index ) {
                    $tab.removeClass( "cur" );
                    $tip.hide();
                    
                    t_index --;
                    init_top = init_top + h;
                    $ul.animate({
                        "top": init_top
                    }, 200, function() {
                        //$tab. 
                    });
                    
                }
            });

        },
        links: function() {
            var links=$( "#links .con li" );
            if ( !links.length ) return;
            if( links && links.length > 2 ){
                $( "#links .con" ).jCarouselLite( {auto:2000,speed:1000,visible:2,vertical: false} );
            }
        },
       
    };
    $(function() {
        return main.init();
    });

})( SQ, jQuery );


function myShow(e) {
    function c(e) {
        index = e;
        var t = 0;
        for (u = 0; u < f.length; u++) f[u].className = "";
        f[index].className = "current",
        clearInterval(o);
        for (u = 0; u < s.length; u++) s[u].style.opacity = 0,
        s[u].style.filter = "alpha(opacity=0)",
        s[u].style.display = "none";
        o = setInterval(function() {
            t += 15,
            t > 100 && (t = 100),
            s[index].style.opacity = t / 100,
            s[index].style.filter = "alpha(opacity = " + t + ")",
            s[index].style.display = "block"
        },
        70);
        if (!window.XMLHttpRequest) {
            for (u = 0; u < s.length; u++) s[u].style.display = "none";
            s[index].style.display = "block"
        }
    }

    function h() {
        play = setInterval(function() {
            index++,
            index >= s.length && (index = 0),
            c(index)
        },
        3500)
    }

    var t = document.getElementById(e),
    n = t.getElementsByTagName("span")[0],
    r = t.getElementsByTagName("span")[1],
    i = t.getElementsByTagName("ul")[0],
    s = i.getElementsByTagName("li"),
    o = play = null,
    u = index = 0,
    a = [],
    f = null;
    for (u = 0; u < s.length; u++) a.push("<li>" + (u + 1) + "</li>");
    var l = document.createElement("ul");
    l.className = "count",
    l.innerHTML = a.join(""),
    t.appendChild(l),
    f = t.getElementsByTagName("ul")[1].getElementsByTagName("li"),
    c(index);
    for (u = 0; u < f.length; u++) f[u].index = u,
    f[u].onmouseover = function() {
        c(this.index)
    };

    h(),
    t.onmouseover = function() {
        clearInterval(play)
    },
    t.onmouseout = function() {
        h()
    };

    if (n, r) n.onclick = function() {
        index--,
        index < 0 && (index = s.length - 1),
        c(index)
    },
    r.onclick = function() {
        index++,
        index >= s.length && (index = 0),
        c(index)
    }
}

function selectList() {
   
   
}
$(function() {
    $.fn.hc_proTabChange = function(e) {
        var e = e || "click",
        t = $(this);
        t.find(".tab_h li").each(function(n) {
            $(this)[e](function() {
                $(this).addClass("current").siblings("li").removeClass("current"),
                t.find(".tab_c").eq(n).show().siblings(".tab_c").hide()
            })
        })
    }
}),

$(function() {
    $(".data li").hover(function() {
        $(this).addClass("cur").siblings().removeClass("cur"),
        $(this).stop().animate({
            width: 389
        },
        300).siblings().stop().animate({
            width: 130
        },
        300)
    })
});


function zyshow1(e) {
    showTime(e)
}
function zyshow2(e) {
    showTime(e)
}
function zyshow3(e) {
    showTime(e)
}
function zyshow4(e) {
    showTime(e)
}
function showTime(e) {
    $(function() {
        function f() {
            $("#" + e + " .zyCount li").removeClass("cur"),
            $("#" + e + " .zyCount li").eq(o).addClass("cur"),
            $("#" + e + "  .Focus_list .tac").stop().animate({
                opacity: 0
            },
            300),
            $("#" + e + "  .Focus_list .tac").eq(o).stop().animate({
                opacity: 1
            },
            300),
            $("#" + e + "  .Focus_list .tac").removeClass("cur"),
            $("#" + e + "  .Focus_list .tac").eq(o).addClass("cur")
        }
        function l() {
            u = setInterval(function() {
                o++,
                o > i - 1 && (o = 0),
                f(),
                e == "box0" && myflash2(o),
                e == "box1" && myflash3(o),
                e == "box2" && myflash(o)
            },
            2500)
        }
        var t = [],
        n = $("#" + e),
        r = n.children(".Focus_list"),
        i = r.children(".tac").size(),
        s = n.children(".count"),
        o = 0,
        u = null;
        f(),
        $("#" + e + " .zyCount li").each(function(t) {
            $(this).hover(function() {
                o = t,
                f(),
                e == "box0" && myflash2(o),
                e == "box1" && myflash3(o),
                e == "box2" && myflash(o)
            })
        }),
        l(),
        $(".zyTag").hover(function() {
            clearInterval(u)
        },
        function() {
            l()
        })
    })
}

function myflash2(e) {
    var t = document.getElementById("flash2");
    e == 0 && (t.innerHTML = "<image src='img/1.gif'  width='507' height='470'  />"),
    e == 1 && (t.innerHTML = "<image src='img/2.gif'  width='507' height='470'   />"),
    e == 2 && (t.innerHTML = "<image src='img/3.gif'  width='507' height='470'  / >"),
    e == 3 && (t.innerHTML = "<image src='img/4.gif'  width='507' height='470'  / >"),
    e == 4 && (t.innerHTML = "<image src='img/5.gif'  width='507' height='470'  / >"),
    e == 5 && (t.innerHTML = "<image src='img/6.gif'  width='507' height='470'  / >"),
    e == 6 && (t.innerHTML = "<image src='img/7.gif'  width='507' height='470'  / >"),
    e == 7 && (t.innerHTML = "<image src='img/8.gif'  width='507' height='470'  />"),
    e == 8 && (t.innerHTML = "<image src='img/9.gif'  width='507' height='470'  / >"),
    e == 9 && (t.innerHTML = "<image src='img/10.gif'  width='507' height='470'  />")
}
function myflash3(e) {
    var t = document.getElementById("flash3");
    e == 0 && (t.innerHTML = "<image src='img/bo1.gif'  width='507' height='470'  />"),
    e == 1 && (t.innerHTML = "<image src='img/bo2.gif'  width='507' height='470'  />"),
    e == 2 && (t.innerHTML = "<image src='img/bo3.gif'  width='507' height='470'  />"),
    e == 3 && (t.innerHTML = "<image src='img/bo4.gif'  width='507' height='470'  />"),
    e == 4 && (t.innerHTML = "<image src='img/bo5.gif'  width='507' height='470'  />"),
    e == 5 && (t.innerHTML = "<image src='img/bo6.gif'  width='507' height='470'  />"),
        e == 6 && (t.innerHTML = "<image src='img/bo7.gif'  width='507' height='470'  />"),
            e == 7 && (t.innerHTML = "<image src='img/bo8.gif'  width='507' height='470'  />")
}
$(function() {
    $(".zyTab li").click(function() {
        $(this).addClass("cur").siblings().removeClass("cur");
        var e = $(".zyTab li").index(this);
        $(".zyTag .zyTac").eq(e).show().siblings().hide()
    })
});

 
	$(".careerswitch").click(function() {
		var e = $("#careerbox li.current").eq(0),
			t = $(this);
		e.attr("class") != t.attr("class") && (e.removeClass("current"), t.parents("li").addClass("current"))
	}), $(".sexbtn").click(function() {
		var e = $(this);
		e.siblings(".sexbtn").removeClass("active"), $(this).addClass("active"), e.hasClass("jian") ? (e.parents(".career_bg").find(".sexswitch .jian").addClass("active"), e.parents(".career_bg").find(".jianbingbg").stop().fadeOut(), e.parents(".career_bg").find(".jianbg").stop().fadeIn(), e.find(".s1").stop().animate({
			left: "0px"
		}, {
			complete: function() {
				e.removeClass("jianbing")
			}
		})) : (e.parents(".career_bg").find(".sexswitch .jianbing").addClass("active"), e.parents(".career_bg").find(".jianbg").stop().fadeOut(), e.parents(".career_bg").find(".jianbingbg").stop().fadeIn(), e.find(".s1").stop().animate({
			left: "95px"
		}, {
			complete: function() {
				e.addClass("jianbing")
			}
		}))
	}), $(".jian").addClass("active"), $("#careerbox .career_detail .detail-btn").hover(function() {
		$(this).parent().addClass("active")
	}, function() {
		$(this).parent().removeClass("active")
	}) ;
  
  
  $(document).ready(function () {
	$(".main_visual").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
	},function(){
		$("#btn_prev,#btn_next").fadeIn()//一直显示fadeOut改为fadeIn
	});
	
	$dragBln = false;
	
	$(".main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".flicking_con a"),
		counter : function (e){
			$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
			$(".main_image ul li").removeClass("on2").eq(e.current-1).addClass("on2");
		}
	});
	
	$(".main_image").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".main_image").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$("#btn_next").click();
	}, 999000);
	
	$(".main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		},999000);
	});
	
	$(".main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 999000);
	});
	
});



$(document).ready(function () {
	$(".main_visual2").hover(function(){
		$("#btn_prev2,#btn_next2").fadeIn()
	},function(){
		$("#btn_prev2,#btn_next2").fadeIn()//一直显示fadeOut改为fadeIn
	});
	
	$dragBln = false;
	
	$(".main_image2").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev2"),
		btn_next : $("#btn_next2"),
		paging : $(".flicking_con2 a"),
		counter : function (e){
			$(".flicking_con2 a").removeClass("on").eq(e.current-1).addClass("on");
			$(".main_image2 ul li").removeClass("on2").eq(e.current-1).addClass("on2");
		}
	});
	
	$(".main_image2").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".main_image2").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".main_image2 a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$("#btn_next2").click();
	}, 999000);
	
	$(".main_visual2").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next2").click();
		},999000);
	});
	
	$(".main_image2").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next2").click();
		}, 999000);
	});
	
});
var PAGE = function() {
	var e = {
		attention: function() {
			var e = $(".u-attention");
			e.bind("mouseenter", function() {
				e.find(".wx").show()
			}).bind("mouseleave", function() {
				e.find(".wx").hide()
			});
			var k = $(".m-fd-links").find(".btn-wx");
			k.bind("mouseenter", function() {
				k.siblings(".att-wx").show()
			}).bind("mouseleave", function() {
				k.siblings(".att-wx").hide();
			});
			var p = $(".attention").find(".btn-wx");
			p.bind("mouseenter", function() {
				$(this).addClass("cur");
				p.siblings(".att-wx").show()
			}).bind("mouseleave", function() {
				$(this).removeClass("cur");
				p.siblings(".att-wx").hide();
			});
		},
		newTab: function() {
			var e = $(".news-tab li"),
				t = $(".news-list"),
				n = 0;
			e.hover(function() {
				n = e.index(this), e.removeClass("cur").eq(n).addClass("cur"), t.removeClass("cur").eq(n).addClass("cur")
			});
			for (var s = 0; s < t.length; s++) t.eq(s).find("a").eq(0).addClass("cur")
		},
		mediaTab: function() {
			var e = $(".m-media .tab-tt li"),
				t = $(".media-box"),
				n = 0;
			e.hover(function() {
				n = e.index(this), e.removeClass("cur").eq(n).addClass("cur"), t.removeClass("cur").eq(n).addClass("cur")
			});
			for (var s = 0; s < t.length; s++) t.eq(s).find("a").eq(0).addClass("cur")
		},
		imgTab:function(){
			var e = $(".links-img ul");
			var t = $(".links-img ul li");
			var eWidth = t.width() * t.length;
			e.width(eWidth);
			var scPage  = t.width() * 1;
			var bigPage = Math.ceil(eWidth/scPage);
			var i = 0;
			$(".links-img .next").click(function(){
				i++;
				if(i<bigPage){
					e.stop().animate({'left': -scPage*i},500);
					var new_w = eWidth  - scPage * i;
					$(".num").html(eWidth+"-"+ scPage * i+"="+new_w);
					if(new_w<scPage){
						var n_m = (scPage - new_w)/t.width();
						e.width(eWidth+(n_m*t.width()));	

					}
				}else{
					i--;
				}
			});
			$(".links-img .prve").click(function(){
				i--;
				if(i>0 || i==0){
					e.stop().animate({left: -scPage * i},500);	 
				}else{
					i++;
				}
			});
		},
		faqIpt:function(){
			var e=$(".faq-ipt");
			e.each(function(){
				var thisVal=$(this).val();
					if(thisVal!=""){
						$(this).siblings(".txt").hide();
					}else{
						$(this).siblings(".txt").show();
					}
					$(this).focus(function(){
						$(this).siblings(".txt").hide();
					}).blur(function(){
						var val=$(this).val();
					if(val!=""){
						$(this).siblings(".txt").hide();
					}else{
						$(this).siblings(".txt").show();
					} 
				});
		    });
		},
		pageScroll:function(){
			$(window).scroll(function(){
				var t = $(document).scrollTop();
				var e = $(".m-sidebar");
				var b = $(".m-wrap");
				b.each(function(){
					var m = b.offset().top;
					if (t > m) {
						var d= t-m+0;
						e.css("top", d + "px" );
					} else {
						e.css("top", "0")
					};
				});

			});
		},
		sidebarBtn:function(){
			var i = 1;
			var e = $(".sidebar-btn a");
			var t = $(".m-sidebar");
			e.click(function(){
				if(i==1){
					t.animate({right: '-276px'},300);
					e.animate({right: '0'},300).removeClass("btnOpen").addClass("btnCtn");
					i=0;
				}else{
					t.animate({right: '0'},300);
					e.animate({right: '276px'},300).removeClass("btnCtn").addClass("btnOpen")
					i=1;
				}
			});
		},
		linksLstImg:function(){
			var e = $("#lst-l").find("li");
			e.find("a").mouseover(function(){
				$('.small').show().animate();
		        $('.big').hide().animate();
		        $(this).find('.small').hide().animate();
		        $(this).find('.big').show().animate();
		    });
			var e = $("#lst-r").find("li");
			e.find("a").mouseover(function(){
				$('.small2').show().animate();
		        $('.big2').hide().animate();
		        $(this).find('.small2').hide().animate();
		        $(this).find('.big2').show().animate();
		    });
		}
	},
	t = function() {
			 e.attention(), e.newTab(),e.imgTab(),e.mediaTab(),e.faqIpt(),e.pageScroll(),e.sidebarBtn(),e.linksLstImg()
		};
	return {
		fn: e,
		init: t
	}
}();
// 大眼睛
var indexEye = {
	autoTime:0,
	init: function () {
		var eyeObj = $("#eye_box a:eq(0) img:eq(0)");
		eyeObj.attr("src", eyeObj.attr("data-imgSrc"));
		eyeObj.load(function () {
			indexEye.autoTime = setTimeout(function () {
				indexEye.autoPlay();
  		}, 10000);
		});
		$("#eye_number a").bind("mouseover", function() {
			if($(this).attr("class").indexOf("on") > 0) return;
			indexEye.autoPlay(this);
		});
	},
	autoPlay:function (me) {
		clearTimeout(this.autoTime);
		this.turnNumber(me);
		var now = $("#eye_number a.on").index();
		var imgObj = $("#eye_box a").eq(now).children("img");
		if(imgObj.attr("src") == "") {
			imgObj.attr("src", imgObj.attr("data-imgSrc"));
		}
		setTimeout(function () {
			$("#eye_box a:visible").fadeOut(0, function() {
				$("#eye_box a").eq(now).fadeIn(0);
			});
		}, 200);
		this.autoTime = setTimeout("indexEye.autoPlay()", 6000);
	},

	turnNumber:function(me) {
		if(typeof(me) == 'undefined') {
			var i = $("#eye_number a.on").index();
			i = i >= $("#eye_number a").length - 1 ? 0 : i + 1;
			me = $("#eye_number a").eq(i);
		}
		$("#eye_number a.on").each(function () {
  		$(this).removeClass("on").addClass('off');
		});
		$(me).removeClass("off").addClass('on');
	}
};
$(function(){
	function tabs(tabTit,on,tabCon){
	    $(tabCon).each(function(){
	      $(this).children().eq(0).show();
	      });
	    $(tabTit).each(function(){
	      $(this).children().eq(0).addClass('cur');
	      });
	   $(tabTit).children().hover(function(){
	      $(this).addClass('cur').siblings().removeClass('cur');
	       var index = $(tabTit).children().index(this);
	       $(tabCon).children().eq(index).show().siblings().hide();
	   });
	};
 	tabs(".tab-navs","active",".tab-lst");
 	PAGE.init();
	indexEye.init();
});
(function($) {
    $.fn.textSlider = function(settings) {
        settings = jQuery.extend({
            speed: "normal",
            line: 2,
            timer: 3000
        }, settings);
        return this.each(function() {
            $.fn.textSlider.scllor($(this), settings);
        });
    };
    $.fn.textSlider.scllor = function($this, settings) {
        var ul = $("ul:eq(0)", $this);
        var timerID;
        var li = ul.children();
        var liHight = $(li[0]).height();
        var upHeight = 0 - settings.line * liHight; //滚动的高度;
        var scrollUp = function() {
            ul.animate({
                marginTop: upHeight
            }, settings.speed, function() {
                for (i = 0; i < settings.line; i++) {
                    ul.find("li:first", $this).appendTo(ul);
                }
                ul.css({
                    marginTop: 0
                });
            });
        };
        var autoPlay = function() {
            timerID = window.setInterval(scrollUp, settings.timer);
        };
        var autoStop = function() {
            window.clearInterval(timerID);
        };
        //事件绑定
        ul.hover(autoStop, autoPlay).mouseout();
    };
})(jQuery);