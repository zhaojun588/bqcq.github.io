/* 全局统计变量 */
var _wmrid;
var _gaq = _gaq || [];  //谷歌
var _hmt = _hmt || [];  //百度
var _mtxq = _mtxq || [];  //完美
var _smq = _smq || [];  //SiteMaster
var _CWiQ = _CWiQ || []; //
(function () {
    var u = document.location;
    if (/^file:/.test(u) || u.hostname.indexOf('localhost') > -1 || /\d+\.\d+\.\d+\.\d+/.test(u.hostname) || /test\.sys\.wanmei\.com/.test(u.hostname)) {//本地地址或IP地址
        return;
    }
    var g = {};
    g.href = g._href = u.href;
    g.pathname = g._pathname = u.pathname;
    g.protocol = ('https:' == u.protocol) ? 'https://' : 'http://';
    (function () {
        var extArr = ['.com.cn', '.com', '.cn', '.net', '.tv', '.org', '.cc', '.info', '.in.th'];
        var len = extArr.length;
        var ext, res;
        for (var i = 0; i < len; i++) {
            if (u.hostname.indexOf(extArr[i]) !== -1) {
                ext = extArr[i];
                res = u.hostname.replace(ext, '');
                break;
            }
        }
        var _domain = res.substring(res.lastIndexOf('.') + 1) + ext
        g._domain = _domain;
        g.domain = '.' + _domain;
        g.hostname = g._hostname = u.hostname == _domain ? 'www.' + _domain : u.hostname;
    })();
    /* 专题wa统计处理函数 */
    var formatUrl_wanmei_event = function () {
       if(g.protocol == "http://"){
	        var reg = '^http://(.*?)' + g.domain + '/(.*?)/';
	        reg = new RegExp(reg);
	        var p = g.href.replace('/mslr/', '/ms/').match(reg);
	        var _href = g.href.replace(reg, 'http://$2' + g.domain + '/$1/');
        }else{
        	var reg = '^https://(.*?)' + g.domain + '/(.*?)/';
	        reg = new RegExp(reg);
	        var p = g.href.replace('/mslr/', '/ms/').match(reg);
	        var _href = g.href.replace(reg, 'https://$2' + g.domain + '/$1/');
        }
        //console.log(reg);
        var _hostname = (p[2] == 'wanmei' || p[2] == 'dota2' ? 'www' : p[2]) + g.domain;
        var _pathname = g.pathname.replace(/\/.*?\//, '/' + p[1] + '/');
        return {
            _href: _href,
            _hostname: _hostname,
            _pathname: _pathname
        }
    };
    /* 全局配置文件 注意上下级顺序 */
    var analyticsConfig = [
		{
		    r: '*',
		    wa: {
		        domainName: g.domain,
		        customVar: [['_trackPageview']]
		    },
		    ga: {
		        customVar: function () {
		            _gaq.push(['_setDomainName', g.domain])
		            _gaq.push(['_setAllowAnchor', true]);
		            _gaq.push(['_addOrganic', 'so', 'q']);
		            _gaq.push(['_addOrganic', 'baidu', 'word']);
		            _gaq.push(['_addOrganic', 'soso', 'w']);
		            _gaq.push(['_addOrganic', 'yodao', 'q']);
		            _gaq.push(['_addOrganic', 'sogou', 'query']);
		            _gaq.push(['_addOrganic', 'gougou', 'search']);
		            if (g.hostname != 'cs.wanmei.com') {
		                var d = g._domain.split('.');
		                _gaq.push(['_addIgnoredRef', g._domain]);
		            }
		            if (g.pathname.indexOf('error') >= 0 && document.referrer) {
		                _gaq.push(['_trackEvent', '404', document.referrer]);
		            }
		            _gaq.push(['_trackPageview']);
		        },
		        beforeLoad: function () {
		            var srcPage = getDomain(document.referrer).replace(/\./g, '-');
		            if (srcPage == '') {
		                srcPage = 'notget';
		            }
		            var parameter = get_parameter('dida');
		            if (parameter && /^x/.test(parameter)) {
		                window.location.hash = 'utm_source=' + srcPage + '&utm_medium=ad' + '&utm_campaign=' + parameter;
		            }
		        }
		    },
		    sm: {
		        customVar: function () {
		            _smq.push(['_setDirectoryIndex', '']);
		            _smq.push(['_setClickTimeOut', 200]);
		            _smq.push(['pageview']);
		        }
		    }
		    // ,
		    // miaozhen: {
		    //     customVar: function () {
		    //     }
		    // }
		},
		{
		    r: '(zxsj|w).wanmei.com',
		    newga: { siteId: 'UA-52120841-15' },
			wmrid: 'RP77760929',
		    h: { siteId: '2d67c764d18c59ec875ae8750379ead6' }
		},
		{
		    r: 'www.wanmei.com',
		    h: { siteId: 'ced744dfae7a0fe07aadbd98133e242b' }
		},
		{
		    r: 'games.wanmei.com',
		    h: { siteId: '7f53d27b9d97a54d463ce1cea7d1d81c' }
		},
		{
		    r: 'games.laohu.com',
		    h: { siteId: '7f53d27b9d97a54d463ce1cea7d1d81c' }
		},
		{
		    r: 'passport.wanmei.com',
		    h: { siteId: '2451e91cabdc44e0611c28a8ee93af90' }
		},
		{
		    r: 'pay.wanmei.com',
		    h: { siteId: '4389c553609aacc5ded73fe148a82e8b' }
		},
		{
		    r: 'pay.wanmei.com/e/dota2/',
		    ga: false
		},
		{
		    r: 'cpay.wanmei.com',
		    h: { siteId: 'e74c01b7cd83f4762bb10c1eb3c08e9e' }
		},
		{
		    r: '(zhuxian|zhuxian2).wanmei.com',
		    ga: { siteId: 'UA-33602282-1' },
			newga: {siteId:'UA-52120841-1'},
		    wmrid: 'RP74569347',
		    h: { siteId: '882c9327d5c903b937fc2cd1def59080' }
		},
		{
		    r: 'zhuxian.games.wanmei.com',
		    ga: { siteId: 'UA-33602282-1' },
			newga: {siteId:'UA-52120841-1'},
		    wmrid: 'RP74569347',
		    h: { siteId: '882c9327d5c903b937fc2cd1def59080' }
		},
		{
		    r: 'w2i.wanmei.com',
		    ga: { siteId: 'UA-37136860-1' },
			newga: {siteId:'UA-52120841-2'},
		    wmrid: 'RP75591501',
		    h: { siteId: '01bd6a5a533824752397036fe5595d07' }
		},
		{
		    r: 'w2i.games.wanmei.com',
		    ga: { siteId: 'UA-37136860-1' },
			newga: {siteId:'UA-52120841-2'},
		    wmrid: 'RP75591501',
		    h: { siteId: '01bd6a5a533824752397036fe5595d07' }
		},
		{
		    r: 'wulin2.wanmei.com',
		    h: { siteId: 'aab66f9083b0326fef2d34ba60d42670' },
		    ga: { siteId: 'UA-37455417-1' },
			newga: {siteId:'UA-52289206-7'},
		    wmrid: 'RP32196602'
		},
		{
		    r: 'wulin2.games.wanmei.com',
		    h: { siteId: 'aab66f9083b0326fef2d34ba60d42670' },
		    ga: { siteId: 'UA-37455417-1' },
			newga: {siteId:'UA-52289206-7'},
		    wmrid: 'RP32196602'
		},
		{
		    r: '(mhzx2|xmhzx|mhzx).wanmei.com',
		    //sm: { siteId: '24FF9659' },
		    ga: { siteId: 'UA-37456371-1' },
			newga: {siteId:'UA-52120841-8'},
		    //miaozhen: { siteId: '45364' },
		    wmrid: 'RP84591218',
		    h: { siteId: '53255cf4bd34dd85678a015e1f9eedbf' }
		},
		{
		    r: 'mhzx.games.wanmei.com',
		    //sm: { siteId: '24FF9659' },
		    ga: { siteId: 'UA-37456371-1' },
			newga: {siteId:'UA-52120841-8'},
		    //miaozhen: { siteId: '45364' },
		    wmrid: 'RP84591218',
		    h: { siteId: '53255cf4bd34dd85678a015e1f9eedbf' }
		},
		{
		    r: 'shenmo.wanmei.com',
		    ga: { siteId: 'UA-37455927-1' },
			newga: {siteId:'UA-52120841-4'},
		    //miaozhen: { siteId: '45365' },
		    wmrid: 'RP94237145',
		    h: { siteId: 'f7e9306a4c12f492674dc7214ee67945' }
		},
		{
		    r: 'shenmo.games.wanmei.com',
		    ga: { siteId: 'UA-37455927-1' },
			newga: {siteId:'UA-52120841-4'},
		    //miaozhen: { siteId: '45365' },
		    wmrid: 'RP94237145',
		    h: { siteId: 'f7e9306a4c12f492674dc7214ee67945' }
		},
		{
		    r: 'xa.wanmei.com',
		    h: { siteId: 'f294ee00163d5224901273d4de286262' },
		    ga: { siteId: 'UA-37449295-1' },
			newga: {siteId:'UA-52120841-10'},
		    wmrid: 'RP51714680'
		},
		{
		    r: 'xa.games.wanmei.com',
		    h: { siteId: 'f294ee00163d5224901273d4de286262' },
		    ga: { siteId: 'UA-37449295-1' },
			newga: {siteId:'UA-52120841-10'},
		    wmrid: 'RP51714680'
		},
		{
		    r: 'seiya.wanmei.com',
		    h: { siteId: '0aaceecf316ceb51a43b380de4ee6e36' },
		    ga: { siteId: 'UA-37469501-1' },
			newga: {siteId:'UA-52120841-9'},
		    wmrid: 'RP69225691'
		},
		{
		    r: 'sdxl.wanmei.com',
		    //sm: { siteId: '84A2E45E' },
		    ga: { siteId: 'UA-37457809-1' },
			newga: {siteId:'UA-52120841-3'},
		    wmrid: 'RP56028681',
		    h: { siteId: '9c520816533cec665d942fdfcf8891b8' }
		},
		{
		    r: 'sdxl.games.wanmei.com',
		    //sm: { siteId: '84A2E45E' },
		    ga: { siteId: 'UA-37457809-1' },
			newga: {siteId:'UA-52120841-3'},
		    wmrid: 'RP56028681',
		    h: { siteId: '9c520816533cec665d942fdfcf8891b8' }
		},
		{
		    r: 'sd.wanmei.com',
		    ga: { siteId: 'UA-40875069-1' },
			newga: {siteId:'UA-52120841-12'},
		    wmrid: 'RP06627742',
		    h: { siteId: '2f46b16c5c697a24d3d634ddbdacd420' }
		},
		{
		    r: 'sgcq.wanmei.com',
		    //sm: { siteId: 'D8CA2654' },
		    ga: { siteId: 'UA-37453083-1' },
		    wmrid: 'RP87945669',
		    h: { siteId: '12691b7d4a20e35bfd4bba9979fcba9c' },
			newga: {siteId:"UA-52120841-5"}
		},
		{
		    r: 'sgcq.games.wanmei.com',
		    //sm: { siteId: 'D8CA2654' },
		    ga: { siteId: 'UA-37453083-1' },
		    wmrid: 'RP87945669',
		    h: { siteId: '12691b7d4a20e35bfd4bba9979fcba9c' },
			newga: {siteId:"UA-52120841-5"}
		},
		{
		    r: '(nw|wdzy).wanmei.com',
		    ga: { siteId: 'UA-37441077-1' },
			newga: {siteId:'UA-52289206-5'},
		    wmrid: 'RP17310732',
		    h: { siteId: '9633e231af1adad6e2d3e09d670b0a7b' }
		},
		{
		    r: 'xljz.wanmei.com',
		    ga: { siteId: 'UA-37442089-1' },
			newga: {siteId:'UA-52289206-6'},
		    wmrid: 'RP21485908'
		},
		{
		    r: 'rwpd.wanmei.com',
		    ga: { siteId: 'UA-37450630-1' },
			newga: {siteId:'UA-52289206-3'},
		    wmrid: 'RP47825737',
		    h: { siteId: '02d093fdc3439d71345e5d7a713d9c88' }
		},
		{
		    r: 'rwpd.games.wanmei.com',
		    ga: { siteId: 'UA-37450630-1' },
			newga: {siteId:'UA-52289206-3'},
		    wmrid: 'RP47825737',
		    h: { siteId: '02d093fdc3439d71345e5d7a713d9c88' }
		},
		{
		    r: '(sg|chibi).wanmei.com',
		    ga: { siteId: 'UA-37458406-1' },
			newga: {siteId:'UA-52120841-7'},
		    wmrid: 'RP60043954',
		    h: { siteId: 'ff059e25d7590459c5ed750b5167042b' }
		},
		{
		    r: 'sg.games.wanmei.com',
		    ga: { siteId: 'UA-37458406-1' },
			newga: {siteId:'UA-52120841-7'},
		    wmrid: 'RP60043954',
		    h: { siteId: 'ff059e25d7590459c5ed750b5167042b' }
		},
		{
		    r: 'kdxy.wanmei.com',
		    h: { siteId: '4d019a1cb610afea72aa13236383aaa1' }
		},
		{
		    r: 'kdxy.games.wanmei.com',
		    h: { siteId: '4d019a1cb610afea72aa13236383aaa1' }
		},
		{
		    r: 'world2.wanmei.com',
		    ga: { siteId: 'UA-37457385-1' },
			newga: {siteId:'UA-52289206-8'},
		    wmrid: 'RP52060072',
		    h: { siteId: 'aef03204fbb4773b15365f8b22bfb288' }
		},
		{
		    r: 'world2.games.wanmei.com',
		    ga: { siteId: 'UA-37457385-1' },
			newga: {siteId:'UA-52289206-8'},
		    wmrid: 'RP52060072',
		    h: { siteId: 'aef03204fbb4773b15365f8b22bfb288' }
		},
		{
		    r: 'sgsj.wanmei.com',
		    ga: { siteId: 'UA-37462233-1' },
			newga: {siteId:'UA-52120841-6'},
		    wmrid: 'RP35968753',
		    h: { siteId: 'e1bbf830daec5f7b1ae3d1af5024385d' }
		},
		{
		    r: 'sgsj.games.wanmei.com',
		    ga: { siteId: 'UA-37462233-1' },
			newga: {siteId:'UA-52120841-6'},
		    wmrid: 'RP35968753',
		    h: { siteId: 'e1bbf830daec5f7b1ae3d1af5024385d' }
		},
		{
		    r: '(cs|vip).wanmei.com',
		    ga: { siteId: 'UA-37455462-1' },
			newga: {siteId:'UA-52289206-9'}
		},
		{
		    r: 'hr.wanmei.com',
		    ga: { siteId: 'UA-37455462-2' }
		},
		{
		    r: 'live.wanmei.com',
		    h: { siteId: 'ebf30a7f9dc1adda8e53cae11b512ff0' }
		},
		{
		    r: 'sw.wanmei.com',
		    ga: { siteId: 'UA-40333031-1' },
			newga: {siteId:'UA-52120841-11'},
		    wmrid: 'RP05186867',
		    h: { siteId: '86cc9c3f618d2ef92be896c2115887e9' }
		},
		{
		    r: 'ts.wanmei.com',
			newga: {siteId:'UA-52028519-2'},
		    wmrid: 'RP76949206'
		},
		{
			r: 'xbox.wanmei.com',
			h: {siteId: '8d4be99a4944100892dee81c71cf01c7'}
		},
		{
			r: 'sgcqjd.wanmei.com',
			h: {siteId: '729e8d69f6bc684bed04f9113eb48d88'}
		},
		{
			r: 'hex.wanmei.com',
			wmrid: 'RP28097540',
			h: {siteId: 'cd50def46ddb63d213147d1986da02b4'}
		},
		{
			r: 'store.wanmei.com',
			h: {siteId: '75c81ab081a0336322fd7b033d82ad48'}
		},
		{
			r: '/i.wanmei.com',
			h: {siteId: 'abd911987d468d4394a17911c7d0d47f'}
		},
        {
			r: '/zx.wanmei.com',
			h: {siteId: 'ae97b400f1f05b27de22fe147269a33a'}
		},
		{
			r: 'panzar.wanmei.com',
			h: {siteId: '85f836c243bc7553e3babef3af44da60'}
		},
		/*
		{
			r: 'play.wanmei.com',
			h: {siteId: '807169bce2677a3694dd9223e4cb9ff5'}
		},
		*/
		{
			r: 'pgp.wanmei.com',
			wmrid: 'RP76902891',
			h: {siteId: '84d6f11d57b204c972c7166da291e5ef'}
		},
		{
			r: '/t.wanmei.com',
			h: {siteId: '882b79919b91109217f3b6b4c5186826'}
		},
		{
			r: '/t.games.wanmei.com',
			h: {siteId: '882b79919b91109217f3b6b4c5186826'}
		},
		{
		    r: 'dota2.com.cn',
		    ga: { siteId: 'UA-37455460-1' },
			newga: {siteId: 'UA-52291309-1'},
		    h: { siteId: '4ff9dc38bbcfc8d79bb8cd61d9972c32' },
			wmrid: 'RP96736316'
		},
		{
		    r: 'dota2.com.cn/(client|launcher)/',
		    h: { siteId: '4ff9dc38bbcfc8d79bb8cd61d9972c32' },
		},
		{
		    r: 'sdyx.wanmei.com',
		    h: { siteId: 'c60df0a263f0537c14631210b8bea0c9'}
		},
		{
		    r: 'edu.wanmei.com',
		    h: { siteId: '432e42554ad26484702dd4f5b33935ca'}
		},
		{
		    r: 'pvp.wanmei.com',
		    h: { siteId: '74a82bf3870c0b01071bbe493b2bc15d'}
		},
		{
		    r: 'pictures.wanmei.com',
		    h: { siteId: 'f26dab58c4e592bd09b75c325b3a00ab'}
		},
		{
			r: 'ytxmz.wanmei.com',
			wmrid: 'RP36800591',
			h:{ siteId: '000260d4fc76a57c80a83e1009271e69'}
		},
		{
			r: 'am.wanmei.com',
			wmrid: 'RP89965465',
			h:{ siteId: '40a7f46d6ae4080d3e57ecf0dab6cbe4'}
		},
		{
			r: 'zzbq.wanmei.com',
			wmrid: 'RP76902891',
			h:{ siteId: 'f2e1405e26817cbccdb18959bb6533f0'}
		},
		{
			r: 'uw.wanmei.com',
			h:{ siteId: '5c968246a28cfb921a5b6cd48740c348'}
		},
		{
			r: 'cs.wanmei.com',
			h:{ siteId: 'd8bd7212ab82b89c74fef33ea18a2bf6'}
		},
		{
			r: 'weixin.cs.wanmei.com',
			h: {siteId: 'f8538c7760ad0b4dc845716570cead50'}
		},
        {
			r: 'shushan.wanmei.com',
			h:{ siteId: '501cd1c53396e4d23838de3dd668ada6'}
		},
		{
			r: 'hytj.wanmei.com',
			h:{ siteId: 'fdac6f740feaedcf93f98e3a42b5ebbb'}
		},
		{
			r: 'csgo.wanmei.com',
			h:{ siteId: '1597dca1f94a64fca0543d468b7ef7d9'}
		},
		{
			r: 'co.wanmei.com',
			h:{ siteId: '8d2bb983193ed8b3aba7db6452d27523'}
		},
		{
			r: 'co.games.wanmei.com',
			h:{ siteId: '8d2bb983193ed8b3aba7db6452d27523'}
		},
		{
			r: 'https://members.csgo.com.cn/pay/',
			h:{ siteId: 'ab1be45cb542488bca94c4675d285749'}
		},
		{
			r: 'https://members.csgo.com.cn/pay/result',
			h:{ siteId: 'ab1be45cb542488bca94c4675d285749'}
		},
		{
			r: 'hczy.wanmei.com',
			h:{ siteId: 'f2bea14bede340840f41d47f5c352106'}
		},
		{
			r: 'hczy.games.wanmei.com',
			h:{ siteId: 'f2bea14bede340840f41d47f5c352106'}
		},
		//EVENT
		{
		    r: '*.dota2.com.cn/event*/',
		    wa: {
		        customVar: function () {
		            _mtxq.push(['_setHostName', g._hostname]);
		            _mtxq.push(['_trackPageview', g._pathname]);
		        }
		    }
		},
		{
		    r: '*.wanmei.com/event*/',
		    wa: {
		        customVar: function () {
		            _mtxq.push(['_setHostName', g._hostname]);
		            _mtxq.push(['_trackPageview', g._pathname]);
		        }
		    }
		},
        {
            r: 'event51.wanmei.com/(zhuxian|zhuxian2)/',
            h: { siteId: '24192124664d2b46342a22a98e5debc8' }
        },
        {
            r: 'event50.wanmei.com/(zhuxian|zhuxian2)/',
            h: { siteId: '957265b09accd689d4f9dc9639e864ed' }
        },
        {
            r: '*.wanmei.com/event50/',
            h: { siteId: 'dfc89a89afdfb7c70b681b7bf1c1ef5d' }
        },
        {
            r: '*.wanmei.com/event51/',
            h: { siteId: 'd42a52c1e19b80542922db8c8ab5ef2d' }
        },
        {
            r: '*.wanmei.com/eventie/',
            h: { siteId: 'ac8a74c79a6d558447abb76a730d6133' }
        },
        {
            r: '*.wanmei.com/event/',
            h: { siteId: '69fae2e80f54618b006b557e1d2b3159' }
        },
		{
            r: '/t.wanmei.com/event/',
            h: { siteId: '882b79919b91109217f3b6b4c5186826' }
        },
        {
            r: '*.wanmei.com/event20/',
            h: { siteId: '7665ba3a4f978677241c4eac2725ce1e' }
        },
        {
            r: '*.wanmei.com/event21/',
            h: { siteId: 'ba4c2b16935bb0a270939b4f51e0d38d' }
        },
		//BBS
		{
		    r: 'bbs.*.wanmei.com',
		    h: false
		},
		{
		    r: 'bbs.wanmei.com',
		    h: { siteId: 'abeeb946b7f5f1a44bae8f6291d794e0' }
		},
		{
		    r: 'zhuxian.bbs.wanmei.com',
		    h: { siteId: 'adf70c7654cf66cb8833381a9a6010ff' }
		},
		{
		    r: 'seiya.bbs.wanmei.com',
		    h: { siteId: '81d805e6e76c69aa270040bca82fc4c6' }
		},
		{
		    r: 'xa.bbs.wanmei.com',
		    h: { siteId: '44ebed2a194186d87a5e67252b92bc1a' }
		},
		{
		    r: 'shenmo.bbs.wanmei.com',
		    h: { siteId: '6d34bbc9b6e7dc25717de27d46c05664' }
		},
		{
		    r: 'sgcq.bbs.wanmei.com',
		    h: { siteId: '89efef9c355e79b901298257c7aaca7b' }
		},
		{
		    r: 'rwpd.bbs.wanmei.com',
		    h: { siteId: 'c65d7916ffb3b8d8208325ffdc9a30ad' }
		},
		{
		    r: 'mhzx2.bbs.wanmei.com',
		    h: { siteId: '53b8249bdfd3e7fd21eb9953c7afd38f' }
		},
        {
		    r: 'zx.bbs.wanmei.com',
		    h: { siteId: '7f2764e91a22da116c00e55f5871f4e3' }
		},
		{
		    r: 'wulin2.bbs.wanmei.com',
		    h: { siteId: 'd71c37f8208ec0e03648c84de62238ff' }
		},
		{
		    r: 'w2i.bbs.wanmei.com',
		    h: { siteId: '6bdd79c1dc5a72c454121bfdba58a082' }
		},
		{
		    r: 'sgsj.bbs.wanmei.com',
		    h: { siteId: '02b430c02f5544574babff450c15eee0' }
		},
		{
		    r: 'kdxy.bbs.wanmei.com',
		    h: { siteId: '6bc32ee2743a5c509ef146fe2921611b' }
		},
		{
		    r: 'sg.bbs.wanmei.com',
		    h: { siteId: 'b0f62e6ad9c14f049e7148b48eaeee45' }
		},
		{
		    r: 'world2.bbs.wanmei.com',
		    h: { siteId: 'ce75a27058c3c97ec8949a53e3f5c66c' }
		},
		{
		    r: 'sd.bbs.wanmei.com',
		    h: { siteId: '241ed6fc335b3051a65365e3a5e86ee5' }
		},

		{
		    r: 'nw.bbs.wanmei.com',
		    h: { siteId: '8a3778713d269744f24065de07eb8267' }
		},
		{
		    r: 'sdxl.bbs.wanmei.com',
		    h: { siteId: '347e23ef3fd33c13cbd6954411ca863e' }
		},
		{
		    r: 'hex.bbs.wanmei.com',
		    h: { siteId: '5f6bfe654ab0280635749bbe1d480ab5' }
		},
		{
		    r: 'sd.bbs.wanmei.com',
		    h: { siteId: '32725825d012c88d87b13a122c11d55c' }
		},
		{
		    r: 'sdyx.bbs.wanmei.com',
		    h: { siteId: '3ae9ca91860e3f804744ace6e297e9c9' }
		},
		{
		    r: 'ytxmz.bbs.wanmei.com',
		    h: { siteId: 'ff169d5707bd5e71dfbab67e305edf77' }
		},
		{
		    r: 'w.bbs.wanmei.com',
		    h: { siteId: '20b3ac21f99af4cdcb8a52117b087c34' }
		},
		{
		    r: 'zxsj.bbs.wanmei.com',
		    h: { siteId: '0b6c54678de9653d4ce8e5a9776c21ad' }
		},
        {
		    r: 'pgp.bbs.wanmei.com',
		    h: { siteId: '1dd88513e76a3aca621d28126d54ffd7' }
		},
        {
		    r: 'shushan.bbs.wanmei.com',
		    h: { siteId: 'd2909fbad9805e256a7ea2598fcffd52' }
		},
		{
			r: "playradio.cn",
			h: {siteId: "c424a7a54a58ddd70f33033478d2535b"}
		},
		{
			r: "jobs.wanmei.com",
			h: {siteId: "fdae4dac4f3769381c52da9650661f28"}
		},
		{
			r: "event.laohu.com",
			h: {siteId: "b8b8f151a2b38a6e5e23723be02f287a"}
		},
		{
			r: "event.games.laohu.com",
			h: {siteId: "b8b8f151a2b38a6e5e23723be02f287a"}
		},
		{
			r: "/arrival/",
			h: false
		},
		{
			r: "/launcher/",
			h: false
		},
		{
			r: "www.csgo.com.cn",
			h: {siteId:'46be175a5f482efa91259d6615336579'}
		},
		{
			r: "hot.wanmei.com",
			h: {siteId:'729df1065e61a93fec160ae2bd1f5817'}
		},
		{
			r: "zx.laohu.com",
			h: {siteId:'cb91a3b35af6745e7a9427c53d1abb76'}
		},
		{
			r: "zx.games.laohu.com",
			h: {siteId:'cb91a3b35af6745e7a9427c53d1abb76'}
		},
		{
			r: 'co.bbs.wanmei.com',
			h:{ siteId: 'b170e11c3463077e1c8b0299284c1be3'}
		},{
			r: 'fx.wanmei.com',
			h:{ siteId: '7fcd064e36c1f61afb876831f10fb5d1'}
		},
		{
			r: 'vip.wanmei.com',
			h:{ siteId: 'd7720d0d71a6d5632e233422cc13e5de'}
		},
        {
            r: 'shmh.wanmei.com',
            h:{ siteId: '11a65a91e5ff10e283fd32fd114c6717'}	
        },
        {
            r: 'shmh.games.wanmei.com',
            h:{ siteId: '11a65a91e5ff10e283fd32fd114c6717'}	
        },
        {
        	r: 'ylz.wanmei.com',
            h:{ siteId: 'e1d8d8311bc2e8600d1e1f3b0ab344a5'}	
        },
        {
        	r: 'ylz.games.wanmei.com',
            h:{ siteId: 'e1d8d8311bc2e8600d1e1f3b0ab344a5'}	
        },
		{
            r: 'hob.wanmei.com',
            h:{ siteId: 'bacbfd7e5b6d8655d522224d603690bf'}	
        },
        {
            r: 'campus.wanmei.com',
            h:{ siteId: '9fe564b1cba6d10c33d8e882aba3565e'}
        },
        {
            r: 'event.csgo.com.cn',
            h:{ siteId: 'c7e3e95795ba1397d1eac52169205ad7'}
        },
        {
            r: 'www.pwacg.com',
            h:{ siteId: 'ea3b0fde36821c8bcd6a1dd2e03463a1'}
        },
        {
            r: 'pvp.wanmei.com',
            h:{ siteId: 'ef625f1a4b732e02067ed562d9fbf6ad'}
        },
        {
            r: 'www.pwpic.com',
            h:{ siteId: 'a4b1695f099221677e628d4396a80076'}
        },
        {
            r: 'wl.wanmei.com',
            h:{ siteId: '8026b64b75dee05bc194ec1a74b7837a'}
        },
        {
            r: 'wl.laohu.com',
            h:{ siteId: '8026b64b75dee05bc194ec1a74b7837a'}
        },
        {
            r: 'wl.games.laohu.com',
            h:{ siteId: '8026b64b75dee05bc194ec1a74b7837a'}
        },
        {
            r: 'cloudpic.wanmei.com',
            h:{ siteId: '3ad8b31e815c6923c6013d4be232d13b'}
        },
        {
            r: 'www.15s.im',
            h:{ siteId: 'a0d7003007c53b6529d3b7d1595d8135'}
        },
        {
            r: 'farside.wanmei.com',
            h:{ siteId: '84f81265df7570321875fd1b113ea5ed'}
        },
        {
            r: 'xxa.wanmei.com',
            h:{ siteId: 'f6859ec5f4ea3c1b8d8c32d5e7cd32d2'}
        },
		{
			r: 'xxa.games.wanmei.com',
			h:{ siteId: 'f6859ec5f4ea3c1b8d8c32d5e7cd32d2'}
		},
		{
			r: 'xxa.laohu.com',
			h:{ siteId: 'f6859ec5f4ea3c1b8d8c32d5e7cd32d2'}
		},
		{
			r: 'xxa.games.laohu.com',
			h:{ siteId: 'f6859ec5f4ea3c1b8d8c32d5e7cd32d2'}
		},
        {
            r: 'www.farsidegame.com',
            h:{ siteId: 'c3d8f71eebc08bbda752dc93d31524f5'}
        },
        {
            r: 'm.laohu.com',
            h:{ siteId: 'df0e8316f5a414f6da3740510e1c305a'}
        },
        {
            r: 'm.games.laohu.com',
            h:{ siteId: 'df0e8316f5a414f6da3740510e1c305a'}
        },
        {
            r: 'lhj.laohu.com',
            h:{ siteId: '67b7e8ff58abbdc35e0b1922619ded8b'}
        },
        {
            r: 'lhj.games.laohu.com',
            h:{ siteId: '67b7e8ff58abbdc35e0b1922619ded8b'}
        },
        {
            r: 'al.laohu.com',
            h:{ siteId: 'e3a9ad2a6811a04dcca253fb135ef773'}
        },
        {
            r: 'sdxl2.laohu.com',
            h:{ siteId: '4172a3c3501e059181393815b032f39f'}
        },
        {
            r: 'sdxl2.wanmei.com',
            h:{ siteId: '4172a3c3501e059181393815b032f39f'}
        },
		{
            r: 'sdxl2.wanmei.com',
            h:{ siteId: '4172a3c3501e059181393815b032f39f'}
        },
        {
            r: 'animation.wanmei.com',
            h:{ siteId: '4c86a12e4cbdf986f8f3e3791f0c37df'}
        },
        {
            r: 'sy.wanmei.com',
            h:{ siteId: 'aa2ffd65cdd3c2546566222470b5aef3'}
        },
        {
            r: 'flzj.wanmei.com',
            h:{ siteId: '434d473e1405aabb8f22368d2ff0b088'}
        },
        {
            r: 'flzj.games.laohu.com',
            h:{ siteId: '434d473e1405aabb8f22368d2ff0b088'}
        },
        {
            r: 'unrulyheroes.wanmei.com',
            h:{ siteId: '315edbdf09a26f05caa0a9903e9cd12f'}
        },
        {
            r: 'unrulyheroes.games.wanmei.com',
            h:{ siteId: '315edbdf09a26f05caa0a9903e9cd12f'}
        },
        {
            r: 'www.det-i.com',
            h:{ siteId: 'e67e548291e8cb3a40df49611e330f51'}
        },
        {
            r: 'wmsj.wanmei.com',
            h:{ siteId: 'a071b22d8405265b761fd8a6d6da6020'}
        },
        {
            r: 'sm.laohu.com',
            h:{ siteId: '280481c3de6634d13b4b3e3c068788d6'}
        },
        {
            r: 'sm.games.laohu.com',
            h:{ siteId: '280481c3de6634d13b4b3e3c068788d6'}
        },
        {
            r: 'sm.wanmei.com',
            h:{ siteId: '280481c3de6634d13b4b3e3c068788d6'}
        },
		{
            r: 'sm.games.wanmei.com',
            h:{ siteId: '280481c3de6634d13b4b3e3c068788d6'}
        },
        {
            r: 'mountain.173.com',
            h:{ siteId: '51dbff40a56fafcbcb1c30f27f773797'}
        },
        {
            r: 'www.173.com',
            h:{ siteId: '977fbf7f82062b38e9c075f180ea56a9'}
        },
        {
            r: 'www.playperfectworld.com',
            h:{ siteId: '02ef8014e450078b015e11761e58d4c6'}
        },
        {
            r: 'm2.wanmei.com',
            h:{ siteId: '7433e13e540d32f8ac9e05a44e55ca50'}
        },
        {
            r: 'm2.games.wanmei.com',
            h:{ siteId: '7433e13e540d32f8ac9e05a44e55ca50'}
        },
        {
            r: 'al.wanmei.com',
            h:{ siteId: '4dcf1d5d28f694e0c8151a3fd2727722'}
        },
        {
            r: 'al.games.wanmei.com',
            h:{ siteId: '4dcf1d5d28f694e0c8151a3fd2727722'}
        },
        {
            r: 'fcyx.wanmei.com',
            h:{ siteId: '0aa4379719243b24e9a81b96188bfb3f'}
        },
        {
            r: 'fcyx.games.wanmei.com',
            h:{ siteId: '0aa4379719243b24e9a81b96188bfb3f'}
        },
        {
            r: 'fcyx.games.laohu.com',
            h:{ siteId: '0aa4379719243b24e9a81b96188bfb3f'}
        },
        {
            r: 'fcyx.laohu.com',
            h:{ siteId: '0aa4379719243b24e9a81b96188bfb3f'}
        },
        {
            r: 'mhxzx.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhxzx.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhxzx.laohu.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhxzx.games.laohu.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'menghuanxzxmx.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhxinzhuxianmy.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'menghxzxianmz.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhxinzxna.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhuanxzxxiannb.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'mhxinzxiannc.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
		 {
            r: 'menghxxinzxiannd.games.wanmei.com',
            h:{ siteId: '67fea8ed9da7adbc6e9fceb9a5bee85d'}
        },
        {
            r: 'mtr.wanmei.com',
            h:{ siteId: 'b9c7eb043a54cc62bc4241a50f8f121c'}
        },
        {
            r: 'mtr.games.wanmei.com',
            h:{ siteId: 'b9c7eb043a54cc62bc4241a50f8f121c'}
        },
        {
            r: 'sgsy.laohu.com',
            h:{ siteId: '4516cb5ada1abf9b23c090b17ef8828e'}
        },
        {
            r: 'sgsy.games.laohu.com',
            h:{ siteId: '4516cb5ada1abf9b23c090b17ef8828e'}
        },
        {
            r: 'ym.games.wanmei.com',
            h:{ siteId: 'ff8d3e0a8cb36b7fad87c6eeaba51202'}
        },
        {
            r: 'zs.wanmei.com',
            h:{ siteId: 'ce8d170a4101ba1bf47a505fde58ab41'}
        },
        {
            r: 'ht.wanmei.com',
            h:{ siteId: '44af316c20a52a0490f940524f9b7186'}
        },
        {
            r: 'sdxl2.games.laohu.com',
            h:{ siteId: '4172a3c3501e059181393815b032f39f'}
        },
        {
            r: 'pwesports.cn',
            h:{ siteId: '662d1819343d3b09c13255f4675f0751'}
        },
        {
            r: 'wmjd.wanmei.com',
            h:{ siteId: 'c0c2c0fa14bcf2949706d55c71c99b6a'}
        },
        {
            r: 'esports.wanmei.com',
            h:{ siteId: '23420986f56441d19bebcbe66b9b6941'}
        },
        {
            r: 'lh.games.laohu.com',
            h:{ siteId: '40adb117ce057c29fbba176e450ae581'}
        },
        {
            r: 'lh.laohu.com',
            h:{ siteId: '40adb117ce057c29fbba176e450ae581'}
        },
        {
            r: 'lh.games.wanmei.com',
            h:{ siteId: '40adb117ce057c29fbba176e450ae581'}
        },
        {
            r: 'hm.games.wanmei.com',
            h:{ siteId: '055b1e4805b3d6a5466aab2877aedc4f'}
        },
        {
            r: 'hm.games.laohu.com',
            h:{ siteId: '055b1e4805b3d6a5466aab2877aedc4f'}
        },
        {
            r: 'jr.games.wanmei.com',
            h:{ siteId: '77488fc246a2e6cedf63d124f1fe197a'}
        },
        {
            r: 'jr.games.wanmei.com',
            h:{ siteId: '77488fc246a2e6cedf63d124f1fe197a'}
        },
        {
            r: 'jr.games.wanmei.com',
            h:{ siteId: '77488fc246a2e6cedf63d124f1fe197a'}
        },
        {
            r: 'tlbb.wanmei.com',
            h:{ siteId: '95a3d2625d2ccbc1e9c4c0f86571d878'}
        },
		 {
            r: 'tlbb.games.laohu.com',
            h:{ siteId: '95a3d2625d2ccbc1e9c4c0f86571d878'}
        },
        {
            r: 'douliu.wanmei.com',
            h:{ siteId: '132102418c9639c7122592f507661f29'}
        },
        {
            r: 'gt.games.wanmei.com',
            h:{ siteId: 'dc7c25b99b6e3f61ca34fa9c5bb3abb8'}
        },
        {
            r: 'ma.wanmei.com',
            h:{ siteId: 'd24ee12d433c2bf6a173569a5c3398e5'}
        },
        {
            r: 'lumione.games.wanmei.com',
            h:{ siteId: '14be548a3e95aa833bb6d19dfb5dc9f1'}
        }
    ];
    var URL_formater = {
        'event*.wanmei.com': formatUrl_wanmei_event
    };
    var extend = function () {
        var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;
        if (target.constructor == Boolean) { deep = target; target = arguments[1] || {}; i = 2; }
        if (typeof target != "object" && typeof target != "function") { target = {} };
        if (length == i) { target = this; --i; }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (var name in options) {
                    var src = target[name], copy = options[name];
                    if (target === copy) { continue; }
                    if (deep && copy && typeof copy == "object" && !copy.nodeType) {
                        target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
                    } else if (copy !== undefined) { target[name] = copy; }
                }
            }
        }
        return target;
    };
    /* 判断数组 */
    var isArray = function (obj) {
        return Object.prototype.toString.apply(obj) === '[object Array]' ? true : false;
    };
    /* 加载JS */
    var loadJS = function (url, callback) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        s.onload = s.onreadystatechange = function () {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                s.onload = s.onreadystatechange = null;
                if (callback) callback();
                s.parentNode.removeChild(s);
            }
        };
        var doc = document.getElementsByTagName('head')[0];
        doc.appendChild(s);
    };
    /* 正则转换 */
    var evalRegexp = function (str) {
        var reg_str = str.replace(/\*/g, '.*?');
        var reg = new RegExp(reg_str);
        return reg;
    };
    /* 转换地址 */
    var transformURL = function () {
        for (var k in URL_formater) {
            if (evalRegexp(k).test(g.hostname)) {
                return URL_formater[k]();
            }
        }
        return null;
    };
    /* 过滤无用配置 */
    var filterOptions = function () {
        extend(g, transformURL());
        var len = analyticsConfig.length;
        var res = [];
        for (var i = 0; i < len; i++) {
            if (evalRegexp(analyticsConfig[i]['r']).test(g._href)) {
                res.push(analyticsConfig[i]);
            }
        }
        return res;
    };
    /* 合并配置 */
    var getOptions = function () {
        var optionsArr = filterOptions();
        var len = optionsArr.length;
        var res = {};
        for (var i = 0; i < len; i++) {
            res = extend(true, res, optionsArr[i]);
        }
        return res;
    };
    /* URL辅助方法*/
    function get_parameter(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&#]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }

    function getDomain(thestring) {
        var urlpattern = new RegExp("(http|ftp|https)://(.*?)/.*$");
        var parsedurl = thestring.match(urlpattern);
        if (parsedurl == null)
            return "";
        else
            return parsedurl[2];
    }
    /* 统计函数 */
    var h = function (options) {
        if (options.siteId) {
            var src = g.protocol + 'hm.baidu.com/h.js?' + options.siteId;
            setTimeout(function () { loadJS(src) }, 10);
        }
    };
    var ga = function (options) {
		/*
        if (options.siteId) {
            options.beforeLoad && options.beforeLoad();
            _gaq.push(['_setAccount', options.siteId]);
            if (typeof options.customVar == 'function') {
                options.customVar();
            } else if (isArray(options.customVar)) {
                for (var i = 0; i < options.customVar.length; i++) {
                    _gaq.push(options.customVar[i]);
                }
            }
            var src = g.protocol + 'stats.g.doubleclick.net/dc.js';
            setTimeout(function () { loadJS(src) }, 10);
        }
		*/
    };
	var newga = function(options){
		/*
		if(options.siteId){
			 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','GA');
			GA('create', options.siteId, 'auto');
			GA('require', 'displayfeatures');
			GA('require', 'linkid', 'linkid.js');
			GA('send', 'pageview');

		}
		*/
	}
    var wa = function (options) {
        _mtxq.push(['_setDomainName', options.domainName]);
        if (typeof options.customVar == 'function') {
            options.customVar();
        } else if (isArray(options.customVar)) {
            for (var i = 0; i < options.customVar.length; i++) {
                _mtxq.push(options.customVar[i]);
            }
        }
        var src = 'https://static.games.wanmei.com/public/js/wa.js';
		
        if (g.domain == '.4games.com') src = 'http://www.4games.com/wa.js';
		var protocal=window.location.protocol;
		//if(protocal=="https:")return;
        setTimeout(function () { loadJS(src) }, 10);
    };
    var sm = function (options) {
        if (options.siteId) {
            _smq.push(['_setAccount', options.siteId, new Date()]);
            if (typeof options.customVar == 'function') {
                options.customVar();
            } else if (isArray(options.customVar)) {
                for (var i = 0; i < options.customVar.length; i++) {
                    _smq.push(options.customVar[i]);
                }
            }
            var src = 'https://cdnmaster.com/sitemaster/sm.js';
            setTimeout(function () { loadJS(src) }, 10);
        }
    };
    var adm = function (options) {
        var src = 'https://e.admaster.com.cn/sod/admBcnActwm2.js';
        loadJS(src, function () {
            var cmpnId = options;
            var actInfo = (new Date()).getTime();
            var weight = 1;
            var tagStr = "";
            admBcnActGen(cmpnId, actInfo, weight, tagStr);
        });
    };
    // var miaozhen = function (options) {
    //     if (options.siteId) {
    //         var c = document.createElement('script');
    //         c.type = 'text/javascript';
    //         c.async = true;
    //         c.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'sitemonitor.cn.miaozhen.com/boot/' + options.siteId;
    //         var h = document.getElementsByTagName('script')[0];
    //         h.parentNode.insertBefore(c, h);
    //     }
    // }

	var tagmanager = function (options){
		(function(a, b, c, d, e, f) {
			a[d] = a[d] || [];
			var g = a[e] = a[e] || {};
			a.tagmangerGlobalObject = e, g[f] = {dlName: d};
			var h = b.getElementsByTagName(c)[0], i = b.createElement(c);
			i.async = !0, i.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://cdn') + '.tagmanager.cn/boot/' + f + '.js', h.parentNode.insertBefore(i, h)
		})(window, document, 'script', 'TGDataLayer', 'tagmanager', options.siteId);
	}

    var factory = function (options) {
        if (options.h) h(options.h);
        if (options.ga) ga(options.ga);
        if (options.wa) wa(options.wa);
        if (options.sm) sm(options.sm);
        if (options.adm) adm(options.adm);
        //if (options.miaozhen) miaozhen(options.miaozhen);
		if (options.tm) tagmanager(options.tm);
        if (options.wmrid) _wmrid = options.wmrid;
		if (options.newga) newga(options.newga);
    };

    window.compositeStat = function (options) {
        options = extend(getOptions(), options);
        factory(options);
    }
    window.singleStat = function (str) {
        var id = typeof str == 'string' ? 'wm_analytics_' + str : 'wm_analytics_';
        var serverid = "http://cookie.bi.wanmei.com/servlet/wanmei.html";
        var serverid2 = "http://cookie.bi.wanmei.com/servlet/huodongcount.html";
        var addr = encodeURIComponent(htmlencode(window.location.href)) + '&referer=' + encodeURIComponent(document.referrer);
        if (typeof str == 'string') { addr += '&bihuodongid=' + encodeURIComponent(str); }
        addr = '<iframe id="' + id + '" src="' + serverid + '?addr=' + addr + '" scrolling="no"  frameborder="0" style="height:0px;wideht:0px;margin:0px; padding:0px;" ></iframe>';
        var bidiv = document.createElement('div');
        bidiv.style.display = 'none';
        bidiv.innerHTML = addr;
        document.body.appendChild(bidiv);
    }

    function htmlencode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/    /g, "&nbsp;");
        s = s.replace(/\'/g, "'");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;

    }
    //init
    function newFn(str) {
        var _var;
        try {
            _var = new Function('', 'return' + str)();
        } catch (e) {
            _var = str;
        }
        return _var;
    }

    compositeStat();
    var elems = document.getElementsByTagName('*');
    for (var i = 0; i < elems.length; i++) {
        //if (/((.+)( +)|\b)wm-public(( +)(.+)|\b)/.test(elems[i].className.replace(/(^\s*)|(\s*$)/g, ""))) {
        if (/((.+)( +)|\b)wm-public(( +)(.+)|\b)/.test((elems[i].className.toString()).replace(/(^\s*)|(\s*$)/g, ""))) {
            /*if (elems[i].getAttribute('analytics')) {
                var obj = newFn(elems[i].getAttribute('analytics'));
                if (obj.single) {
                    if (isArray(obj.single)) {
                        for (var i = 0; i < obj.single.length; i++) {
                            singleStat(obj.single[i]);
                        }
                    } else {
                        singleStat(obj.single);
                    }
                }
                break;
            }*/
            if (elems[i].getAttribute('wmrid')) {
                _wmrid = elems[i].getAttribute('wmrid');
            }
        }
    }

    if (_wmrid) {
        var D = new Date();
        D.setTime(D.getTime() + 10800000);
        document.cookie = "WMRID=" + _wmrid + ";path=/;domain=.wanmei.com;expires=" + D.toGMTString();
    }
    var setpageUrldata = [
    	"static.wanmei.com",
    	"tlanding.laohu.com",
    	"app.laohu.com",
    	"zs.wanmei.com",
    	"sm.games.wanmei.com",
    	"www.laohu.com",
    	"hm.games.wanmei.com",
    	"hm.games.laohu.com",
    	"ht.wanmei.com",
    	"lh.games.laohu.com",
    	"jr.games.wanmei.com",
    	"al.games.wanmei.com",
    	"ym.games.wanmei.com",
    	"mhxzx.wanmei.com",
    	"mhxzx.games.wanmei.com",
    	"shushan.wanmei.com",
		"w2i.wanmei.com",
		"seiya.wanmei.com",
		"shenmo.wanmei.com",
		"kdxy.wanmei.com",
		"sdxl.wanmei.com",
		"hex.wanmei.com",
		"zhuxian.wanmei.com",
		"mhzx2.wanmei.com",
		"rwpd.wanmei.com",
		"world2.wanmei.com",
		"wulin2.wanmei.com",
		"xa.wanmei.com",
		"sgsj.wanmei.com",
		"sgcq.wanmei.com",
		"sg.wanmei.com",
		"t.wanmei.com",
		"co.wanmei.com",
		"shmh.wanmei.com",
		"mtr.wanmei.com",
		"ylz.wanmei.com",
		"unrulyheroes.wanmei.com",
		"hczy.wanmei.com",
		"fcyx.laohu.com",
		"wl.wanmei.com",
		"m.laohu.com",
		"zx.wanmei.com",
		"sdxl.laohu.com",
		"hj.laohu.com",
		"yt.laohu.com",
		"s.laohu.com",
		"xxa.wanmei.com",
		"m2.wanmei.com",
		"sdxl2.laohu.com",
		"sd.laohu.com",
		"shushan.games.wanmei.com",
		"w2i.games.wanmei.com",
		"seiya.games.wanmei.com",
		"shenmo.games.wanmei.com",
		"kdxy.games.wanmei.com",
		"sdxl.games.wanmei.com",
		"hex.games.wanmei.com",
		"zhuxian.games.wanmei.com",
		"mhzx2.games.wanmei.com",
		"rwpd.games.wanmei.com",
		"world2.games.wanmei.com",
		"wulin2.games.wanmei.com",
		"xa.games.wanmei.com",
		"sgsj.games.wanmei.com",
		"sgcq.games.wanmei.com",
		"sg.games.wanmei.com",
		"t.games.wanmei.com",
		"co.games.wanmei.com",
		"shmh.games.wanmei.com",
		"mtr.games.wanmei.com",
		"ylz.games.wanmei.com",
		"unrulyheroes.games.wanmei.com",
		"hczy.games.wanmei.com",
		"fcyx.games.laohu.com",
		"m.games.laohu.com",
		"sdxl.games.laohu.com",
		"hj.games.laohu.com",
		"yt.games.laohu.com",
		"s.games.laohu.com",
		"xxa.games.wanmei.com",
		"m2.games.wanmei.com",
		"sdxl2.games.laohu.com",
		"sd.games.laohu.com",
		"wl.wanmei.com",
		"zx.wanmei.com",
		"sdxl.laohu.com",
		"xxa.wanmei.com",
		"sdxl2.laohu.com",
		"tlbb.wanmei.com",
		"ma.wanmei.com"
    ];
    var isClient = (function(){
        var userAgent = window.navigator.userAgent.toLowerCase();
        return userAgent.indexOf('laohuapp') > -1;
    })();
    var locationUrl = document.location;
    var locationFlag = false;
    var locationOptions = function () {
        for (var i = 0; i < setpageUrldata.length; i++) {
            if(setpageUrldata[i] == locationUrl.hostname){
            	return true;
            }
        };     
    };
    locationFlag = true;;
    if(locationFlag){
	    setTimeout(function(){loadJS("https://static.games.wanmei.com/public/js/tjsdk-min-1.5.4.js",function(){
	    	var myAnaly;
	    	myAnaly = new webSdk();
		    //myAnaly.setDebug("true")
		    myAnaly.initSDK({ project: "wmwebsite", linkHost: "https://clog.tanshudata.com",withAppJsBridge:false,updatelog:true});
		    myAnaly.pageVisted();
		    window.myAnaly = myAnaly;
	    })}, 10);
	    var pcDownloadiosObject = document.getElementById("pcDownloadios");
	    var pcDownloadiosObject2 = document.getElementById("pcDownloadios2");
	    var pcDownloadandObject = document.getElementById("pcDownloadand");
	    var pcDownloadandObject2 = document.getElementById("pcDownloadand2");
	    var pcDownloaddesktopObject = document.getElementById("pcDownloaddesktop");
	    var pcDownloaddesktopObject2 = document.getElementById("pcDownloaddesktop2");
	    var pcDownloadtaptapObject = document.getElementById("pcDownloaddtaptap");
	    var pcDownloadminiObject = document.getElementById("pcDownloadmini");
	    var mDownloadTopObject = document.getElementById("mDownloadTop");
	    var mDownloadNormalObject = document.getElementById("mDownloadNormal");
	    if(pcDownloadiosObject){
	    	pcDownloadiosObject.addEventListener("click",function(){
	    		myAnaly.track("pcDownloadios", { }, "high");
	    	});
		};
		if(pcDownloadiosObject2){
	    	pcDownloadiosObject2.addEventListener("click",function(){
	    		myAnaly.track("pcDownloadios", { }, "high");
	    	});
		};
		if(pcDownloadandObject){
			pcDownloadandObject.addEventListener("click",function(){
	    		myAnaly.track("pcDownloadand", { }, "high");
	    	});
		};
		if(pcDownloadandObject2){
			pcDownloadandObject2.addEventListener("click",function(){
	    		myAnaly.track("pcDownloadand", { }, "high");
	    	});
		};
		if(pcDownloaddesktopObject){
			pcDownloaddesktopObject.addEventListener("click",function(){
	    		myAnaly.track("pcDownloaddesktop", { }, "high");
	    	});
		};
		if(pcDownloaddesktopObject2){
			pcDownloaddesktopObject2.addEventListener("click",function(){
	    		myAnaly.track("pcDownloaddesktop", { }, "high");
	    	});
		};
		if(pcDownloadtaptapObject){
			pcDownloadtaptapObject.addEventListener("click",function(){
	    		myAnaly.track("pcDownloaddtaptap", { }, "high");
	    	});
		};
		if(pcDownloadminiObject){
			pcDownloadminiObject.addEventListener("click",function(){
	    		myAnaly.track("pcDownloadmini", { }, "high");
	    	});
		};
		if(mDownloadTopObject){
			mDownloadTopObject.addEventListener("click",function(){
	    		myAnaly.track("mDownloadTop", { }, "high");
	    	});
		};
		if(mDownloadNormalObject){
			mDownloadNormalObject.addEventListener("click",function(){
	    		myAnaly.track("mDownloadNormal", { }, "high");
	    	});
		};
	};
	var setprivacyUrldata = [
		"al.games.wanmei.com",
		"wl.wanmei.com",
		"xxa.wanmei.com",
		"sm.games.wanmei.com",
		"ym.games.wanmei.com",
		"mhxzx.wanmei.com",
		"ht.wanmei.com",
		"zs.wanmei.com",
		"hm.games.wanmei.com",
		"jr.games.wanmei.com",
		"m2.games.wanmei.com"
	];

	var locationOptions2 = function () {
        for (var i = 0; i < setprivacyUrldata.length; i++) {
            if(setprivacyUrldata[i] == locationUrl.hostname){
            	return true;
            }
        };     
    };
    

    locationFlag2 = locationOptions2();
    if(locationFlag2){
	    var public_hgStr ="";
		public_hgStr+='<style>'
		public_hgStr+=' 	.public_hg_top{background: #FFF; border-bottom: 1px solid #e2e2e2;  font-size: 12px; position:fixed; left:0; top:0; width:100%; z-index:999999;}'
		public_hgStr+=' 	.public_hg_main{max-width: 1200px; margin: 0 auto; position:relative;}'
		public_hgStr+=' 	.public_hg_text{width:80%; padding: 5px 0 5px 20px; color: #000; line-height: 20px; font-size: 15px;}'
		public_hgStr+=' 	.public_hg_text a{color: #000; text-decoration: underline;}'
		public_hgStr+=' 	.public_hg_text span{font-family: arial;}'
		public_hgStr+=' 	.public_hg_ok{width: 86px; position:absolute; right:0; top:50%; margin-top:-16px;}'
		public_hgStr+=' 	.public_hg_ok a{display: block; width: 66px; height: 28px; line-height: 28px; text-align: center; background: #e8e8ea; border: 1px solid #e2e2e2; color:#666; border-radius: 4px; text-decoration: none;}'
		public_hgStr+=' 	.public_hg_ok a:hover{background: #f5f5f5; text-decoration: none;}'
		public_hgStr+=' 	</style>'
		public_hgStr+=' 	<div class="public_hg_top" id="public_hg_top" style="display:none;">'
		public_hgStr+=' 		<div class="public_hg_main">'
		public_hgStr+=' 			<div class="public_hg_text">为向您提供良好的网站使用体验，完美世界网站会使用自身或第三方的<span>Cookie</span>，以作为安全、技术、分析、推广等之用。继续浏览本网站即表示您同意我们使用<span>Cookie</span>。若想了解更多，请阅读我们的<a href="http://static.wanmei.com/passport/agreement/cookie-policy.html" target="_blank"><span>Cookie</span>政策</a>。'
		public_hgStr+=' 			</div>'
		public_hgStr+=' 			<div class="public_hg_ok"><a href="javascript:;"id="public_hg_btn2">知道了</a></div>'
		public_hgStr+=' 		</div>'
		public_hgStr+=' 	</div>';

		var public_hgdiv=document.createElement("div");
		public_hgdiv.innerHTML = public_hgStr;
		if(!isClient){
			document.body.appendChild(public_hgdiv);
		}
		getIdName("public_hg_btn2").onclick = function(){
		    searchCookieTop();
		};
		function getIdName(id){
		    return document.getElementById(id);
		};
		function setCookieHg(c_name,value,expiredays){
		    var exdate=new Date()
		    exdate.setDate(exdate.getDate()+expiredays)
		    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
		};
		function getCookieHg(name){ 
		    var strCookie=document.cookie;
		    var arrCookie=strCookie.split("; "); 
		    for(var i=0;i<arrCookie.length;i++){ 
		        var arr=arrCookie[i].split("="); 
		        if(arr[0]==name)return arr[1]; 
		    } 
		    return ""; 
		};
		function searchCookieTop(){
		    if(getCookieHg("puclic_hg_flag2")){
		        getIdName("public_hg_top").style.display="none"
		    }else{
		        getIdName("public_hg_top").style.display="block"
		        setCookieHg("puclic_hg_flag2","true",365);
		    }
		};
		searchCookieTop();
	};

})();

var trackEvent = function (k, v) {
    try {
        _mtxq.push(["_trackActionEvent", k, v]);
    } catch (e) { }
}

//清明页面变黑白
if(typeof(grayScript)=="undefined"){
	var grayScript=document.createElement("script");
	grayScript.src="https://static.games.wanmei.com/public/js/gray.js";
	document.getElementsByTagName("head").item(0).appendChild(grayScript);
}
