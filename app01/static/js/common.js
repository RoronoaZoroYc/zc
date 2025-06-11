// 10.21 start
$(function() {
    redirectbylang();
    //20210830 漏洞
    $(".mc_botbox_btn").click(function() {
        $(".mc_botbox").stop().fadeOut();
        $.cookie('isHide', 'true');
    });

    var isHide = $.cookie('isHide');

    if (isHide) {
        $(".mc_botbox").stop().hide();
    } else {
        $(".mc_botbox").stop().show();
    }

});

// 10.21end

$(function() {
    // wow初始化
    new WOW().init();
    // 手机导航下拉
    phMenu();
    mcCheckbox();
    pcNav();
    ftInit();
    xlSearch();
});

function redirectbylang() {
    var domain = window.location.href; //获取当前地址
    var host = window.location.host; //当前域名
    var ref = document.referrer;
    //获取当前浏览器语言
    var currentLang = navigator.language;
    if (!currentLang) {
        currentLang = navigator.browserLanguage;
    }
    //判断是否有language cookie
    var haslang = false;
    var isenglish = false; //英文
    var isFr = false; //法语
    var isDe = false; //德文
    var isId = false; //印尼文
    var isIt = false; //意大利
    var isJapanese = false; //日文
    var isKr = false; //韩文
    var isEs = false; //西班牙
    if ($.cookie('language')) {
        haslang = true;
        if ($.cookie('language').indexOf("en") > -1) {
            //判断是否之前存的en的cookie
            isenglish = true;
        }
        if ($.cookie('language').indexOf("jp") > -1) {
            //判断是否之前存的en的cookie
            isJapanese = true;
        }
        if ($.cookie('language').indexOf("de") > -1) {
            //判断是否之前存的en的cookie
            isDe = true;
        }
        if ($.cookie('language').indexOf("kr") > -1) {
            //判断是否之前存的en的cookie
            isKr = true;
        }
        if ($.cookie('language').indexOf("id") > -1) {
            //判断是否之前存的en的cookie
            isId = true;
        }
        if ($.cookie('language').indexOf("fr") > -1) {
            //判断是否之前存的en的cookie
            isFr = true;
        }
        if ($.cookie('language').indexOf("it") > -1) {
            //判断是否之前存的en的cookie
            isIt = true;
        }
        if ($.cookie('language').indexOf("es") > -1) {
            //判断是否之前存的en的cookie
            isEs = true;
        }
    }
    //判断是否是来源于本站
    var islocal = false;
    if (ref && ref.indexOf(host) > -1) {
        islocal = true;
    }
    //区分是否是刷新（即本页面点击刷新，也为统一浏览器刷新有来路和回车无来路问题）
    if (window.performance.navigation.type == 1) {
        islocal = false;
    }
    console.log(currentLang);
    //判断是否是首页 仅在首页执行所有逻辑
    if (domain == "https://" + host + "/" || domain == "http://" + host + "/") {
        if (!haslang) { //没有语言cookie
            //判断浏览器语言是否是中文
            if (currentLang.indexOf("zh") == -1) {
                if (!islocal) {
                    //备注：通过 window.location.href ，waf和cdn无法获取来源
                    if (currentLang.indexOf("en") > -1) {
                        $.cookie('language', 'en', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/en/";
                    }
                    if (currentLang.indexOf("ja") > -1) {
                        $.cookie('language', 'jp', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/jp/";
                    }
                    if (currentLang.indexOf("de") > -1) {
                        $.cookie('language', 'de', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/de/";
                    }
                    if (currentLang.indexOf("ko") > -1) {
                        $.cookie('language', 'kr', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/kr/";
                    }
                    if (currentLang.indexOf("id") > -1) {
                        $.cookie('language', 'id', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/id/";
                    }

                    if (currentLang.indexOf("fr") > -1) {
                        $.cookie('language', 'fr', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/fr/";
                    }
                    if (currentLang.indexOf("it") > -1) {
                        $.cookie('language', 'it', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/it/";
                    }
                    if (currentLang.indexOf("es") > -1) {
                        $.cookie('language', 'es', {
                            path: "/"
                        });
                        window.location.href = "http://" + host + "/es/";
                    }
                    setTimeout(function() {
                        $("body").css("visibility", "visible");
                    }, 300);
                    return false;
                }
            }
            //设置cookie
            $.cookie('language', 'cn', {
                path: "/"
            });
            //显示首页body
            $("body").css("visibility", "visible");
        } else {
            //如果不是本地来路且cookie存的英文
            if (!islocal && isenglish) {
                window.location.href = "http://" + host + "/en/";
            } else if (!islocal && isJapanese) {
                window.location.href = "http://" + host + "/jp/";
            } else if (!islocal && isDe) {
                window.location.href = "http://" + host + "/de/";
            } else if (!islocal && isKr) {
                window.location.href = "http://" + host + "/kr/";
            } else if (!islocal && isId) {
                window.location.href = "http://" + host + "/id/";
            } else if (!islocal && isFr) {
                window.location.href = "http://" + host + "/fr/";
            } else if (!islocal && isIt) {
                window.location.href = "http://" + host + "/it/";
            } else if (!islocal && isEs) {
                window.location.href = "http://" + host + "/es/";
            } else {
                //显示首页body
                $("body").css("visibility", "visible");
                $.cookie('language', 'cn', {
                    path: "/"
                });
            }
        }
    }
}
// 手机导航下拉
function phMenu() {
    // ph导航
    $(".mc_ph_menu").click(function(e) {
        e.stopPropagation();
        // 11.19
        var h = window.innerHeight - 64;
        $(".xialaph").css("height", h + "px");
        // 11.19
        $(this).find(".point").toggleClass("active");
        $(".xialaph").stop().slideToggle();
        $(".phonemeng").toggleClass('active');
        $("html").toggleClass("modal-open")
        // $("body,html").animate({
        //     scrollTop: 0
        // }, 500);
    });
    // ph导航二级
    $(".xialaph h4").click(function(e) {
        if ($(e.target).hasClass("g_phnav1")) {
            return;
        }
        if ($(this).parents("li").hasClass("mc_phnav_hasnosub")) {
            return;
        }
        $(this).siblings(".ul2").stop().slideToggle();
        $(this).parent().parent().siblings().find(".ul2").stop().slideUp();
        $(this).toggleClass("active");
        $(this).parent().parent().siblings().find("h4,h5").removeClass('active');
    });
    /*ph导航三级*/
    $(".xialaph h5").click(function() {
        $(this).siblings(".ul3").stop().slideToggle();
        $(this).parent().siblings().find(".ul3").stop().slideUp();
        $(this).toggleClass("active");
        $(this).parent().siblings().find("h4,h5").removeClass('active');
    });

    $(".ul1>li").each(function() {
        if ($(this).find(".ul2 li").length == 0) {
            $(this).addClass("mc_phnav_hasnosub");
        }
    })
    $(".xialaph h4 a").click(function(e) {
        e.stopPropagation
    });

}

// checkbox
function mcCheckbox() {
    $(".mc_ly_checkbox").find("input").click(function(e) {
        e.stopPropagation();
    })
    $(".mc_ly_checkbox").click(function() {
        $(this).find("input").click();
    })
    //单选 2021.1.26  mark
    $(".mc_ly_yycj .mc_ly_checkbox").click(function() {
        $(this).siblings().find("input[type=checkbox]").removeAttr("checked");
    })
}


// 锚点
function yxtop() {
    $(window).load(function() {
        var test = (window.location.href).split('tp/');
        if (!isNaN(test[1])) {
            $("html,body").animate({
                scrollTop: $('[yxdatop-pag="' + test[1] + '"]').offset().top - 90
            }, 700);
        }
    })
};


// pc导航相关
function pcNav() {
    // 导航吸顶
    navFixed();
    $(window).scroll(function() {
        navFixed();
    })

    function navFixed() {
        if ($(window).scrollTop() > 0) {
            $(".mc_navbar").addClass("mc_fixed")
        } else {
            if ($(".mc_navbar").hasClass("hovernow")) {
                return;
            }
            $(".mc_navbar").removeClass("mc_fixed")
        }
    }

    $(".mc_navbar").hover(
        function() {
            $(this).addClass("hovernow");
            if ($(window).scrollTop() == 0) {
                $(this).addClass("mc_fixed mc_nav_hover")
            }
        },
        function() {
            $(this).removeClass("hovernow");
            if ($(window).scrollTop() == 0) {
                $(this).removeClass("mc_fixed")
            }
            $(this).removeClass("mc_nav_hover")
        }
    )


    // 二级下拉
    $(".mc_nav_li").not(".yxnav_active1").hover(
        function() {
            // if ($(window).scrollTop() == 0) {
            //     $(".mc_navbar").addClass("mc_fixed")
            // }
            $(this).find(".mc_nav_xl").stop().slideDown().addClass("show");
            $(".mc_nav_li.yxnav_active1").find(".mc_nav_xl").addClass("xlhide");
        },
        function() {
            // if ($(window).scrollTop() == 0) {
            //     $(".mc_navbar").removeClass("mc_fixed")
            // }
            $(this).find(".mc_nav_xl").stop().slideUp().removeClass("show");
            $(".mc_nav_li.yxnav_active1").find(".mc_nav_xl").removeClass("xlhide");
        }
    )


    // 搜索下拉
    var isShow = false;
    $(".mc_search").click(function(e) {
        e.stopPropagation();
        if (!isShow) {
            $(this).addClass("isshow");
            $(this).find(".mc_search_xl").stop().slideDown().addClass("show");
            isShow = true;
            $(".mc1_area").removeClass("act");
            $(".mc1_area_second").stop().slideUp();
        } else {
            $(this).removeClass("isshow");
            $(this).find(".mc_search_xl").stop().slideUp().removeClass("show");
            isShow = false;
        }

    })
    $(".mc_search_xl").click(function(e) {
        e.stopPropagation();
    });
    $(".mc_search_xl").mouseleave(function() {
        $(this).parents(".mc_search").removeClass("isshow");
        $(this).stop().slideUp().removeClass("show");
        isShow = false;
    });
}

//底部相关
function ftInit() {
    // 底部二维码显示
    if ($(window).width() > 1200) {
        $(".mc_ft1_qrbox").hover(
            function() {
                $(this).find(".mc_ft1_qrxl").stop().slideDown();
            },
            function() {
                $(this).find(".mc_ft1_qrxl").stop().slideUp();
            }
        )
    } else {
        $(".mc_ft1_qrbox").click(function(e) {
            e.stopPropagation();
            $(this).siblings().find(".mc_ft1_qrxl").stop().slideUp();
            $(this).find(".mc_ft1_qrxl").stop().slideToggle();
        });
        $("body").click(function() {
            $(".mc_ft1_qrxl").stop().slideUp();
        })
    }
}


//导航hover效果
$(function() {
    // navHover();
});

function navHover() {
    var $line = $('<span class="mc_nav_line"></span>')
    if ($(".mc_nav_line").length < 1) {
        $(".mc_nav").append($line);
    }

    var linePara = {
        widthArr: [],
        leftArr: [],
        leftAct: 0,
        widthAct: 0,
    }
    getLinePara();
    lineInit();

    $(window).load(function() {
        getLinePara();
        lineInit();
    })

    $(window).resize(function() {
        getLinePara();
        lineInit();
    })

    $(".mc_nav_li").hover(
        function() {
            var index = $(this).index();
            setLinePara(linePara.leftArr[index], linePara.widthArr[index]);
        },
        function() {
            lineInit();
        }
    )

    // 线初始化
    function lineInit() {
        setLinePara(linePara.leftAct, linePara.widthAct);

    }

    // 获取线的left和width参数
    function getLinePara() {
        linePara.widthArr = [];
        linePara.leftArr = [];
        $(".mc_nav>.mc_nav_li").each(function() {
            var itemLeft = $(this).position().left
            linePara.leftArr.push(itemLeft);
            var itemWidth = $(this).outerWidth();
            linePara.widthArr.push(itemWidth);

            if ($(this).hasClass("yxnav_active1")) {
                linePara.leftAct = itemLeft;
                linePara.widthAct = itemWidth;
            }
        })
    }

    //设定线的参数
    function setLinePara(itemLeft, itemWidth) {
        $line.css({
            left: itemLeft,
            width: itemWidth,
        })
    }
}


//前沿技术（研发）往上移动效果
$(function() {
    dataTable();
})
$(window).load(function() {
    dataTable();
})

function dataTable() {
    if ($(".mc_data_td").length > 0) {
        var dataTopArr = [];


        getTopArr();
        isDataShow();

        $(window).resize(function() {
            getTopArr();
        })

        $(window).scroll(function() {
            isDataShow();
        })

        // 判断是否显示
        function isDataShow() {
            for (var i = 0; i < dataTopArr[length]; i++) {
                if ($(window).scrollTop() > dataTopArr[i]) {
                    $(".mc_data_td").eq(i).addClass("active");
                } else {
                    $(".mc_data_td").eq(i).removeClass("active");
                }
            }
        }

        // 获取元素距离顶部的高度
        function getTopArr() {
            $(".mc_data_td").each(function(index) {
                var itemIndex = index;
                var itemTop = $(this).offset().top - $(window).height() / 1.5;
                dataTopArr[itemIndex] = itemTop;
            })
        }
    }
}

//前沿技术（研发）往上移动效果
$(function() {
    g1List();
})
$(window).load(function() {
    g1List();
})

function g1List() {
    if ($(".mc_g1_li").length > 0) {
        var dataTopArr = [];


        getTopArr();
        isDataShow();

        $(window).resize(function() {
            getTopArr();
        })

        $(window).scroll(function() {
            isDataShow();
        })

        // 判断是否显示
        function isDataShow() {
            for (var i = 0; i < dataTopArr[length]; i++) {
                if ($(window).scrollTop() > dataTopArr[i]) {
                    $(".mc_g1_li").eq(i).addClass("active");
                } else {
                    $(".mc_g1_li").eq(i).removeClass("active");
                }
            }
        }

        // 获取元素距离顶部的高度
        function getTopArr() {
            $(".mc_g1_li").each(function(index) {
                var itemIndex = index;
                var itemTop = $(this).offset().top - $(window).height() / 1.5;
                dataTopArr[itemIndex] = itemTop;
            })
        }
    }
}


// 更多案例
function moreCase() {
    var tool =
        '<div class="mc_btn_toggle">' +
        '<div class="mc_btn_show">' +
        '<span class="iconfont iconjia"></span>' +
        '<span>MORE</span>' +
        '</div>' +
        '<div class="mc_btn_hide">' +
        '<span class="iconfont iconarr1"></span>' +
        '</div>' +
        '</div>'

    $(".mc_btn_list").each(function() {
        if ($(this).find(".mc_btn_li").length > 4) {
            $(this).append(tool);
        }
    })

    $(".mc_btn_list").on("click", ".mc_btn_show", function() {
        $(this).hide().parent(".mc_btn_toggle").siblings(".mc_btn_li").css("display", "inline-block");
        $(this).siblings(".mc_btn_hide").show();
    });
    $(".mc_btn_list").on("click", ".mc_btn_hide", function() {
        $(this).hide().parent(".mc_btn_toggle").siblings(".mc_btn_li:gt(3)").hide();
        $(this).siblings(".mc_btn_show").show();
    });
}

// 9.2
function xlSearch() {
    $("#serachs").click(function() {
        var keywords = $("#keywords").val();
        if (keywords.length == 0) {
            alert("Please enter key words！");
        } else {
            window.location.href = "/search/?" + keywords
        }
    });
    $("#keywords").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#serachs").trigger("click");
        }
    });
}

// searchInit();

function searchInit() {
    var keywords = window.location.search;
    keywords = decodeURI(keywords.replace("?", ''));
    $("#text").val(keywords);
    if (!keywords) {
        return false;
    }
    serach();
}


//20210702下拉
$(function() {
    globleXl();
})

function globleXl() {
    if ($(window).width() > 1024) {
        $(".mc1_area").css('cursor', 'pointer');

        $(".mc1_area").click(function() {
            $(this).toggleClass("act");
            $(".mc1_area_second").stop().slideToggle();
            if ($(".mc_search").hasClass("isshow")) {
                $(".mc_search").trigger("click");
            }
        });

        $(".mc1_area_second").mouseleave(function() {
            $(this).parents(".mc1_area").removeClass("act");
            $(this).stop().slideUp()
        });

        $(".mc1_area_sec_li").hover(
            function() {
                $(this).find(".mc1_area_third").stop().fadeIn();
            },
            function() {
                $(this).find(".mc1_area_third").stop().fadeOut();
            }
        )
    } else {
        $(".mc1_area").click(function(e) {
            e.stopPropagation();
            $(this).toggleClass("act");
        });
        $(".mc1_area_sec_li").click(function(e) {
            e.stopPropagation();
            $(this).find(".mc1_area_third").stop().fadeToggle();
        });
        $(".mc1_area_second").click(function(e) {
            e.stopPropagation();
        })
        $(".mc1_area_back").click(function() {
            $(".mc1_area").removeClass("act");
        });
        $(".mc_ph_menu").click(function() {
            $(".mc1_area").removeClass("act");
        });
    }
};


// 2022.3.4
(function(window) {
    var myScrollbar;
    if (window.myScrollbar) {
        myScrollbar = window.myScrollbar
    };
    myScrollbar = {
        $html: $("html"),
        $body: $("body"),
        originalBodyPad: null,
        scrollbarWidth: 0,
        hide: function() {
            this.$body = $("body");
            this.checkScrollbar();
            this.setScrollbar();
            this.$html.css("overflow", "hidden");
        },
        show: function() {
            this.$body = $("body");
            this.$html.removeAttr("style");
            this.resetScrollbar()
        },
        checkScrollbar: function() {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            this.scrollbarWidth = this.measureScrollbar()
        },
        setScrollbar: function() {
            var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
            this.originalBodyPad = document.body.style.paddingRight || '';
            if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
        },
        measureScrollbar: function() {
            var scrollDiv = document.createElement('div');
            scrollDiv.style.position = "absolute";
            scrollDiv.style.top = "-9999px";
            scrollDiv.style.width = "50px";
            scrollDiv.style.height = "50px";
            scrollDiv.style.overflow = "scroll";
            this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.$body[0].removeChild(scrollDiv);
            console.log(scrollbarWidth);
            return scrollbarWidth
        },
        resetScrollbar: function() {
            this.$body.css('padding-right', this.originalBodyPad)
        },
        isMobileSafari: function() {
            var ua = navigator.userAgent.toLowerCase();
            var isChrome = ua.indexOf("chrome") != -1;
            var isSafari = ua.indexOf("safari") != -1;
            var isMobile = ua.indexOf("safari") != -1;
            if (!isChrome && isSafari && isMobile) {
                return 1
            } else {
                return 0
            }
        }
    };
    window.myScrollbar = myScrollbar
}(window));