$(function(){
	var footerStr = "";
	footerStr+='<style type="text/css">'
	footerStr+='	.al_footer_box{background:#1b1919; font-size: 12px; color:#4c4c4c; padding-bottom:20px}'
	footerStr+='	.al_footer_box a{color: #4c4c4c;}'
	footerStr+='	.al_footer_box a:hover{color: #FFF;}'
	footerStr+='	.al_footer_health{padding: 14px 0 30px 0; text-align: center;}'
	footerStr+='	.al_footer_health strong{display: block; font-size: 20px; padding-bottom:8px;}'
	footerStr+='	.al_footer_health span{display: block;}'
	footerStr+='	.al_footer_nav{text-align: center; padding-bottom: 12px;}'
	footerStr+='	.al_footer_nav span{padding: 0 8px;}'
	footerStr+='	.al_footer_nav a.yang{position: relative;}'
	footerStr+='	.al_footer_yong{position: absolute; left:50%; z-index:10; margin-left: -85px; top:20px; border: 2px solid #393c40; width: 170px; line-height: 22px; background-color: #303338; padding: 6px 0; color: #f15733;display: none;}'
	footerStr+='	.al_footer_yong em{display:block; background: url(https://static.games.wanmei.com/public/images/stel.png) no-repeat 24px center; font-style: normal;}'
	footerStr+='	.al_footer_sclose{display:block; width: 12px; height: 12px; position: absolute; right:1px; top:1px; cursor: pointer; background:url(https://static.games.wanmei.com/public/images/sclose.png) no-repeat center center; background-size: 100% auto;}'
	footerStr+='	.al_footer_main{width: 1200px; margin:0 auto; position: relative; line-height: 20px;}'
	footerStr+='	.al_pwrd_logo{display: block; position: absolute; left: 530px; top: -40px;}'
	footerStr+='	.al_footer_text{padding: 0 0 0 370px;}'
	footerStr+='</style>'

	footerStr+='<div class="al_footer_box">'
	footerStr+='<div class="al_footer_health"><strong>健康游戏忠告</strong><span>抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</span></div>'
	footerStr+='<div class="al_footer_nav">'
/*	footerStr+='	<a target="_blank" href="https://kf.laohu.com/">客服中心</a><span>|</span>'
	footerStr+='	<a target="_blank" href="https://www.laohu.com/contactus.html">联系我们</a><span>|</span>'
	footerStr+='	<a target="_blank" href="https://www.laohu.com/contract.html">用户协议</a><span>|</span>'
	footerStr+='	<a target="_blank" href="https://www.laohu.com/privacy.html">个人信息保护政策</a><span>|</span>'
	footerStr+='	<a target="_blank" href="https://safestatic.games.laohu.com/main_station/legal.html">法律声明</a><span>|</span>'
	footerStr+='	<a href="https://www.laohu.com/cookie.html" target="_blank">Cookie政策</a><span>|</span>'
	footerStr+='	<a href="https://www.laohu.com/children.html" target="_blank">儿童个人信息保护指引</a><span>|</span>'
	footerStr+='	<a target="_blank" href="https://www.wanmei.com/jiazhang/">家长监护</a><span>|</span>'
	footerStr+='	<a target="_blank" href="https://kf.laohu.com/">纠纷处理</a><span>|</span>'
	footerStr+='	<a class="yang" id="al_footer_yang_button">未成年人关怀<div class="al_footer_yong">未成年人关怀专线：<br><em>028-68729606</em><div class="al_footer_sclose"></div></div></a><span>|</span>'
	footerStr+='    <a href="https://static.games.laohu.com/_s/public/business.jpg" target="_blank">营业执照</a>'*/
	footerStr+='</div>'
	footerStr+='<div class="al_footer_main">'
	footerStr+='	<a href="javascript:;" title="完美世界"><img alt="完美世界" src="../img/wmlogo.png" width="150" class="al_pwrd_logo"></a>'
	footerStr+='	<div class="al_footer_text">'
/*	footerStr+='		<p><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">京ICP备15025398号-2</a>    <a href="https://www.wanmei.com/permit/culture.html" target="_blank">《网络文化经营许可证》编号：京网文[2020]6170-1220号</a></p>'
	footerStr+='		<p><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502033859" target="_blank">京公网安备11010502033859号</a>    <a href="https://www.wanmei.com/permit/audio.htm" target="_blank">《网络视听许可证》编号：0110587</a></p>'
	footerStr+='		<p>© 完美世界 版权所有 Perfect World. All Rights Reserved.</p>'
	footerStr+='		<p>完美世界（北京）软件科技发展有限公司  联系电话：010-57801373 公司地址：北京市朝阳区北苑路86号院306号</p>'*/
	/*footerStr+='		<p><a href="http://al.wanmei.com/novel/novel.html"><font style="color: #1b1919;">《笑傲江湖》原著小说</a></font></p>'*/
	footerStr+='	</div>'
	footerStr+='</div>'
	footerStr+='</div>'
	$("body").on("click","#al_footer_yang_button",function(){
		if($(this).hasClass("on")){
			$(".al_footer_yong").hide();
			$(this).removeClass("on");
		}else{
			$(".al_footer_yong").show();
			$(this).addClass("on");
		}
	});	
	var footerId = $("#footid").attr("instid");
	if(footerId){
		$("#"+footerId).append(footerStr);
	}else{
		$('body').append(footerStr);
	};

	$("#footerBtn").click(function(){
		if($(this).hasClass("footerOn")){
			$("#pcfooter").fadeOut();
			$(this).removeClass("footerOn");
		}else{
			$("#pcfooter").fadeIn();
			$(this).addClass("footerOn");
		}
	});
});