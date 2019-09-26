/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require(['jquery', 'slick','Magento_Ui/js/modal/confirm'], function ($, slick, confirmation) {
 $(document).ready(function() {
    var baseUrl = $("#baseUrl").val();

    $(document).click(function() {
        if ($(window).width() > 768) {
            $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").hide();
            $(".cms-home.cms-index-index.page-layout-1column .transparentBackground").hide();
            if($('.cms-home.cms-index-index.page-layout-1column .transparentBG').css('display') == 'block') {
               $("body").css("overflow", "hidden"); 
            } else {
                $("body").css("overflow", "auto"); 
            }
        } else{
            if($('.cms-home.cms-index-index.page-layout-1column .transparentBG').css('display') == 'block') {
               $("body").css("overflow", "hidden"); 
            } else { 
                if($(".mobileSubCategoryPop").hasClass('ShowSubCategoryPop') || $(".j_loginPop").hasClass('j_showmopopup')){
                    $("body").css("overflow", "hidden");
                } else{
                    $("body").css("overflow", "auto");
                }      
            }
        }
    });

    if ($(window).width() > 768) {

        $('.cms-home.cms-index-index.page-layout-1column .smertphone').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 9,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .laptopbrend').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: true,
            slidesToShow: 3.1,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .p_iphoneside').each(function(){
            $(this).not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                speed: 300,
                arrows: true,
                slidesToShow: 5.1,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 8,
                            slidesToScroll: 1,
                            infinite: false,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }

                ]
            });
        });
        $('.cms-home.cms-index-index.page-layout-1column .smertphonebtn').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            variableWidth: true,
            arrows: false,
            slidesToShow: 3.5,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .checkapproved').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 2.5,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .p_priceinside').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            variableWidth: true,
            arrows: false,
            slidesToShow: 6.5,
            slidesToScroll: 2,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .iphonexbanner').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 2.5,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .inchscreen').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 2,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .telibord').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 2.5,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
        $('.cms-home.cms-index-index.page-layout-1column .lgsmart').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 2.5,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    }
        $('.cms-home.cms-index-index.page-layout-1column .p_boxquckcompaierinner').not('.slick-initialized').slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: true,
            slidesToShow: 2.2,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    $('.cms-home.cms-index-index.page-layout-1column .p_startingpricce ul li a').click(function() {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
    });
    
    $("body").on("click", ".p_slideapple .slick-next", function(e) {
        $(this).parents(".p_leftpaddzeroslide").removeClass("leftPadd");
        $(this).parents('.p_iphoneside').slick('slickSetOption', 'slidesToShow', 5.6);
    });


    $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").click(function(e) {
        e.stopPropagation();
    });

    $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .findcta").click(function(e) {
        e.stopPropagation();
        if ($(window).width() > 768) {
            $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").hide();
            $(".cms-home.cms-index-index.page-layout-1column .transparentBackground").hide();
            $(".cms-home.cms-index-index.page-layout-1column .a_emi_header").css('z-index','999');
            $("body").css("overflow", "auto");
        } else {
            $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").removeClass("activeShopEmiRange");
            $(".cms-home.cms-index-index.page-layout-1column .a_emi_header").css('z-index','999');
            $(".cms-home.cms-index-index.page-layout-1column .mobileBottomTab").css('z-index','99');
            $("body").css("overflow", "auto");
        }
    });

    $(".cms-home.cms-index-index.page-layout-1column .p_homebannerpart .p_bannerdesignhome .p_bannerhometext a").click(function(e) {
        e.stopPropagation();
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").show();
        $(".cms-home.cms-index-index.page-layout-1column .transparentBackground").show();
        $("body").css("overflow", "hidden");
        $(".cms-home.cms-index-index.page-layout-1column .a_emi_header").css('z-index','0');
    });

    $(".cms-home.cms-index-index.page-layout-1column .p_homesearch .p_serchdata .p_serchinput a").click(function(e) {
        e.stopPropagation();
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").addClass("activeShopEmiRange");
        $(".cms-home.cms-index-index.page-layout-1column .a_emi_header").css('z-index','0');
        $(".cms-home.cms-index-index.page-layout-1column  .mobileBottomTab").css('z-index','0');
        $("body").css("overflow", "hidden");
    });


    $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .backsript").click(function(e) {
        e.stopPropagation();
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp").removeClass("activeShopEmiRange");
        $(".cms-home.cms-index-index.page-layout-1column .a_emi_header").css('z-index','999');
        $(".cms-home.cms-index-index.page-layout-1column .mobileBottomTab").css('z-index','99');
        $("body").css("overflow", "auto");

    });

    $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .slctCategory ul li a").click(function(e) {
        e.stopPropagation();
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .slctCategory ul li a").removeClass('active');
        $(this).addClass('active');
        var activeCategary = $(this).data("category");
        var activeCategaryLabel = $(this).data("label");
        if(activeCategaryLabel !== undefined){
            $(".findcta").css('display', 'block');
          $(".findcta").html("Find "+activeCategaryLabel);  
        } else{
            $(".findcta").css('display', 'none');
        }        
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .slctEmirange ul.showEmirange").css('display','none');
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .slctEmirange ul.hideEmirange").css('display','none');
        $("#"+activeCategary).css('display','block');
        if ($(this).hasClass("more")) {
            $(".showonmore").css("display", "inline-block");
            $(this).parent().hide();
        }
    });
    
    $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .findcta").click(function(e) {
        e.stopPropagation();
        var emirangeFilter = $(".slctEmirange ul li a.active").data("value");
        var activeCategaryUrl = $(".shoponEasyEmiPopUp .slctCategory ul li a").data("url");
        $(".cms-home.cms-index-index.page-layout-1column .findcta").attr("href",baseUrl+activeCategaryUrl+"?emi_starting_at="+emirangeFilter);
    });

    $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .slctEmirange ul li a").click(function(e) {
        e.stopPropagation();
        $(".cms-home.cms-index-index.page-layout-1column .shoponEasyEmiPopUp .slctEmirange ul li a").removeClass("active");
        $(this).addClass("active");
    });

    $(".cms-home.cms-index-index.page-layout-1column .p_appleiphone.shopbyemirange .p_leftpaddslide .p_startingpricce ul li a").click(function(e) {
        e.stopPropagation();
        $(".cms-home.cms-index-index.page-layout-1column .p_appleiphone.shopbyemirange .p_leftpaddslide .p_startingpricce  ul li a").removeClass('active');
        $(".cms-home.cms-index-index.page-layout-1column .p_appleiphone.shopbyemirange").find("div.showproducts").css('display', 'none');
        $(".cms-home.cms-index-index.page-layout-1column .p_appleiphone.shopbyemirange").find("div.hideproducts").css('display', 'none');
        $(this).addClass('active');
        var activeEmirange = $(this).data("emirange");
        var activeEmirangeUrl = $(this).data("url");
        $(".cms-home.cms-index-index.page-layout-1column .p_appleiphone.shopbyemirange .p_leftpaddslide ul.showproducts").css('display','none');
        $("#"+activeEmirange).css('display','block');
        var emirange = activeEmirange.replace('emirange-','');
        $(".p_viewallunder a").html("View all products under "+'<i class="fa fa-rupee"></i> '+ emirange +" &gt;");
        $(".p_viewallunder a").attr("href",baseUrl+activeEmirangeUrl);
        if ($(window).width() > 768) {
            $('.p_iphoneside').slick('refresh');
            $("#"+activeEmirange+ ' .p_leftpaddzeroslide.leftPadd .p_slideapple .slick-list .slick-track').css('width', '2500px');
            $("#"+activeEmirange+ ' .p_leftpaddzeroslide.leftPadd .p_slideapple .slick-list .slick-track .p_applebox.slick-slide').css('width', '228px'); 
        }
    });

    $(".recentsearch li a").click(function() {
        var rcnt = $(this).children(".proName").text();
        $(".a_searchinfild input").val(rcnt);
    });
    $(".cms-home.cms-index-index.page-layout-1column .p_homesearch.mobileSearch .a_searchinfild .field.search input").click(function(e) {
        e.stopPropagation();
        $('.cms-home.cms-index-index.page-layout-1column .p_homesearch.mobileSearch .a_searchinfild').remove('.mst-searchautocomplete__autocomplete._active');
        $('.cms-home.cms-index-index.page-layout-1column .p_homesearch.mobileSearch .a_searchinfild .mst-searchautocomplete__autocomplete._active').css('visibility', 'hidden');
        $('.a_searchBlack').show();
        $('.mainSearch').addClass('showSearch');
        $('.cms-home.cms-index-index.page-layout-1column .mainSearch.showSearch .a_searchPart .searchPart .field.search input').trigger("click"); 
    });
    
     $(document).click(function () {
         $('.cms-home.cms-index-index.page-layout-1column .p_homesearch.mobileSearch .a_searchinfild .field.search input').css({"background": "#f2f2f2", "border-radius": "30px 30px 30px 30px", "box-shadow": "none", "border-bottom": "none"});
         $(".cms-home.cms-index-index.page-layout-1column .a_emi_header").css('z-index','999');
     });
    
    /*--------------------------- Quick Compare Begin ------------------------------------------*/
    $(".cms-home.cms-index-index.page-layout-1column .p_googlebtn a").click(function() {
        var firstProductSku = $(this).data("sku1");
        var secondProductSku = $(this).data("sku2");
        var removeExisting = false;
        if (JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products']) {
            var collection = JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products'];
            var compareProductsCount = collection.items.length;
        }
        if(compareProductsCount > 0){
            confirmation({
                title: $.mage.__('Quick Compare'),
                content: $.mage.__('There are alredy some products in compare list. Do you wanr to remove them and continue?'),
                actions: {
                    confirm: function(){
                        removeExisting = true;
                        addToCompare(firstProductSku,secondProductSku,removeExisting);
                    },
                    cancel: function(){}
                }
            });
        }else{
            addToCompare(firstProductSku,secondProductSku,removeExisting);
        }
    });
    
    function addToCompare(firstProductSku,secondProductSku,removeExisting){
        if(firstProductSku !== undefined && secondProductSku !== undefined){
            $.ajax({
                url: 'homepage/compare/add',
                type: 'POST',
                showLoader:true,
                data: {sku1:firstProductSku,sku2:secondProductSku,removeExisting:removeExisting},
                dataType: 'json',
                success: function (resposne) {
                    if(resposne.success === true){
                        window.location.href = resposne.redirectUrl;
                    }else{
                        resposne.message;
                    }
                }
            });
        }
    }
	
	/********** Start: Google Analytics code for Home Page ************************************/
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-2 : Desktop
	 * Get data layer code executed whenever someone click on 'Get your pre-approved offer' button in header
	 */
	$("div .a_rightnotiPop button").click(function() {
		var pageTitle = $(document).find("title").text();
		var buttonText = $("div .a_rightnotiPop button").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Click',                
			'clickText': buttonText,
			'pageType': 'Home',
			'customerID': customerId
		});
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-2 : Desktop
	 * Get data layer code executed whenever someone click on city link like 'Mumbai', 
	 * just left side of button 'Get your pre-approved offer'
	 */
	$("div .a_rightnotiPop a").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $("div .a_rightnotiPop a p").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Click',                
			'clickText': linkText,
			'pageType': 'Home',
			'customerID': customerId
		});
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-3 : Mobile
	 * Get data layer code executed whenever someone click on 'Get Amount' button in header
	 */
	$("div .getAmount button").click(function() {
		var pageTitle = $(document).find("title").text();
		var buttonText = $("div .getAmount button").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Click',                
			'clickText': buttonText,
			'pageType': 'Home',
			'customerID': customerId
		});
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-4 : Desktop
	 * It executes when you put some text in Search text-field and then press ENTER key on keyboard
	 */
	$("#search")
	.on('keyup', function(e){
		/**
		 * 13 => is code for ENTER key on keyboard to detect the same in browser
		 */
		if(e.keyCode == 13) {
			var pageTitle = $(document).find("title").text();
			var searchText = $("#search").val();
			var customerId = '';
			
			dataLayer.push({
				'pageTitle': pageTitle,
				'event': 'Search_Click',                
				'clickText': searchText,
				'pageType': 'Home',
				'customerID': customerId
			});
		}
		//console.log('Cybage..805 '+pageTitle+' '+searchText+' '+customerId);
	});
	
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-4 : Desktop
	 * Autocomplete option selection event
	 */
	/*$("#search_smd")
	.change(function() {
		alert('Hiiiii...4');
		var pageTitle = $(document).find("title").text();
		var searchText = $(this).value;
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Search_Click',                
			'clickText': searchText,
			'pageType': 'Home',
			'customerID': customerId,
			'searchResult': 3
		});
		console.log('Cybage..802 '+pageTitle+' '+searchText+' '+customerId);
	});*/
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-6 : Desktop & Screen-7 : Mobile
	 * Get data layer code executed whenever someone clicks on 'Website Logo' link in header
	 */
	$("div.topfHeader a.logo").click(function() {
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Icon_Click',                
			'clickText': 'Icon_click',
			'pageType': 'Home',
			'customerID': customerId
		});
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-6 : Desktop
	 * Get data layer code executed whenever someone clicks on 'Categories' link in header
	 */
	$("div .a_mobileScrollwhithLo ul li:first a").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $("div .a_mobileScrollwhithLo a:first").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Icon_Click',                
			'clickText': linkText,
			'pageType': 'Home',
			'customerID': customerId
		});
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-6 : Desktop
	 * Get data layer code executed whenever someone clicks on 'Stores' link in header
	 */
	$("div .a_mobileScrollwhithLo ul li:nth-child(2) a").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $("div .a_mobileScrollwhithLo ul li:nth-child(2) a").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Icon_Click',                
			'clickText': linkText,
			'pageType': 'Home',
			'customerID': customerId
		});
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-10 : Desktop
	 * Get data layer code executed whenever someone clicks on 'Shop on Easy EMIs' link in top-banner
	 */
	$(".p_homebannerpart.desktopBanner .p_bannerhometext a").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $(".p_homebannerpart.desktopBanner .p_bannerhometext a").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Shop_Easy_Icon_Click',                
			'clickText': linkText,
			'pageType': 'Home',
			'customerID': customerId
		});
		//console.log('Cybage..9841 '+pageTitle+' '+linkText+' '+customerId);
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-11 : Desktop & Mobile
	 * Get data layer code executed whenever someone clicks on 'Find Smartphones' button (actually a link)
	 * for 'Shop on Easy EMI' filters like 'category' & 'EMI range'
	 * This button appears when you click on 'Shop on Easy EMIs' link in top-banner
	 */
	$(".findcta").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $(".findcta").text();
		var category = $(".slctCategory ul li a.active").text();
		var emiRange = $(".slctEmirange ul").find("li a.active").text();
		//var emiRange = $(".slctEmirange ul li a.active").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Shop_Easy_Icon_Click',                
			'clickText': 'Filter_Click',
			'pageType': 'Home',
			'customerID': customerId,
			'clickFilterValue': linkText+' | '+category+' | '+emiRange
		});
		//console.log('Cybage..984 '+pageTitle+' '+linkText+' '+category+' '+emiRange+' '+customerId);
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-12 : Compare Products : Desktop
	 * Get data layer code executed whenever someone clicks on: 
	 * Arrow sign
	 */
	$(".p_quickcompar button[aria-label='Previous'],.p_quickcompar button[aria-label='Next']")
    .on('click', function () {
        var pageTitle = $(document).find("title").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Quick_Compare',                
			'clickText': 'Arrow_click',
			'pageType': 'Home',
			'customerID': customerId,
			'clickComparevalue': 'NA'
		});
		//console.log('Cybage..101 '+pageTitle+' '+customerId);
    });
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-12 : Compare Products : Desktop
	 * Get data layer code executed whenever someone clicks on: 
	 * Quick compare button
	 */
	$(".p_quickcompar div.p_googlebtn a")
    .on('click', function () {
        var pageTitle = $(document).find("title").text();
		var customerId = '';
		var clickComparevalue = $(this).attr('data-sku1')+'|'+$(this).attr('data-sku2');
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Quick_Compare',                
			'clickText': '2|Compare_Click',
			'pageType': 'Home',
			'customerID': customerId,
			'clickComparevalue': clickComparevalue
		});
		//console.log('Cybage..102 '+pageTitle+' '+customerId+' '+clickComparevalue+' mlength '+linkLevel);
    });
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-22 : Desktop
	 * Get data layer code executed whenever someone clicks on 'More on Laptops' or 'More on televisions' options link/button
	 */
	$("div.p_pricebtn ul li a").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $(this).text();
		var linkLevel = $(this).closest(".p_pricebtn").prev().text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Inline_Filter_Click',                
			'clickText': 'Filter_Click',
			'pageType': 'Home',
			'customerID': customerId,
			'clickFilterValue': linkText+'|'+linkLevel
		});
		//console.log('Cybage..701 '+pageTitle+' '+linkText+' '+linkLevel+' '+customerId);
	});
	
	/**
	 * PPT: EMI_MALL_Home_Page_Version_2.ppt implementation : Screen-23 : Desktop
	 * Get data layer code executed whenever someone clicks on 'Popular Screen Sizes' options link
	 */
	$("div.p_inchbox ul li a").click(function() {
		var pageTitle = $(document).find("title").text();
		var linkText = $(this).text();
		var linkLevel = $(".p_screensize h2").text();
		var customerId = '';
		
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Banner_Click_Screen_Size',                
			'clickText': linkText+'|'+linkLevel,
			'pageType': 'Home',
			'customerID': customerId
		});
		//console.log('Cybage..702 '+pageTitle+' '+linkText+' '+linkLevel+' '+customerId);
	});
	
	/********** End: Google Analytics code for Home Page ************************************/
	
    /*--------------------------- Quick Compare End ------------------------------------------*/
    
    /* search options for mobile devices */
    $(".cms-home.cms-index-index.page-layout-1column .mainSearch.showSearch .a_searchPart input#search_smd").click(function() {
        $(".cms-home.cms-index-index.page-layout-1column .mainSearch.showSearch .a_searchPart #search_mini_form_smd").submit();
    });
    /* search options for mobile devices */
});
});
