require(['jquery', 'mage/apply/main','Magento_Customer/js/customer-data'], function ($, mage, customerData) {
    
    var checkcount = 0;
    var maxCheckCount = 3;
    var tips;
    checkcount = getComapreItemCount();

    if ($(window).width() < 768) {
        maxCheckCount = 2;
        removeBlankCmp(checkcount);
    }
    
    
    $(document).ready(function () {
        /** Left Filter Start**/
      $('body').on('click', '.a_opnFilter', function() {      
          $('.sidebar-main').addClass('filterShow');
          $('#maincontent').addClass('filterShow');
      });
      $('body').on('click', '.applyCanclBtn .applyFilter, .filter-content .filter-subtitle', function() { 
          $('.sidebar-main').removeClass('filterShow');
          $('#maincontent').removeClass('filterShow');
      });
      $('body').on('click', '.a_opnSort', function() {     
          $('.sidebar-main').addClass('sortShow');
          $('#maincontent').addClass('sortShow');
      });
      $('body').on('click', '.a_filterConmain .applyFilter, .filter-options-title p, #SortBY .filter-options-title img', function() { 
          $('.sidebar-main').removeClass('sortShow');
          $('#maincontent').removeClass('sortShow');
      });
       $('[data-role=ln_content]').find('li:nth-child(7)').nextAll().hide();
        $(document).on('click', '.seeMore', function () {
            var id = $(this).attr('id');
             $('.ln-items-' + id +' > li:gt(7)').show();
            $(this).hide();
        });        
        jQuery('.filter-options-content .layer-search-box').keyup(function() {
            var searchText = jQuery(this).val().toUpperCase();
            jQuery(this).siblings('ol').children('li').find('a').each(function() {
                var currentLiText = jQuery(this).text().toUpperCase(),
                    showCurrentLi = currentLiText.indexOf(searchText) !== -1;
                jQuery(this).parent('li').toggle(showCurrentLi);
            });
        });
        
        /** Left Filter End**/
        
         /** Start of  Compare Popup **/
         
         // check count of already added products
         if (checkcount > 0) {
            if ($(window).width() < 768) {
                $('.comparepart .mobilecomparedrop').show();
                $('.comparepart .compareProduct').show();                
            } else {
                $('.comparepart .mobilecomparedrop').hide();
            }
            $('.compareBTN').fadeIn(200);
            if (checkcount >= maxCheckCount) {
                $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', true);
            } else {
                $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', false);
            }
        } else {
            $('.compareBTN').hide();
        }
            /* Reponsive compare popup*/
        $('.mobilecomparedrop').click(function () {
            $('.comparepart').toggleClass('comparepartShow');
            $('.a_filterBtnot').toggleClass('topsift');
            $('.a_scrollUpInMob').toggleClass('topsift');
        });
 
	/********** Start: Google Analytics code for PLP Page ************************************/
	/**
	 * PPT: EMI_MALL_Login_Event_Version_1.ppt implementation : Screen-2 : Desktop
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
			'pageType': 'PLP',
			'customerID': customerId,
			'customerType': ''
		});
	});
	
	$(".viewCitypart").click(function() {
		var buttonText = $(".viewCitypart p").text();
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Nav_Click',                
			'clickText': buttonText,
			'pageType': 'PLP',
			'customerID': customerId,
			'customerType': ''
		});		
	});

	/**
	 * PPT: EMI_MALL_Login_Event_Version_1.ppt implementation : Screen-3 : Desktop
	 * Get data layer code executed whenever someone click on 'Get your pre-approved offer' button in header
	 */
	$(".Subbutton").click(function() {
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Login_PSTP',                
			'clickText': 'Get OTP',
			'pageType': 'PLP',
			'customerID': customerId,
			'customerType': ''
		});		
	});
	/********** End: Google Analytics code for PDP Page ************************************/
	
    });
       /* Show on over compare popup*/
    $(document).on("mouseenter", ".compareBTN", function () {
        $(".compareProduct").show();
        if('.oneboxPro') {
            $('.comparepart').find(".oneboxPro").each(function() {
                var getId = $(this).attr('check-set');
                var getproimg = $('#product_id_'+getId).find('img').attr('src');
                $(this).find('img').attr('src', getproimg);
            });
        }
    });
    /* close compare popup*/
    $(document).on("mouseleave", ".compareProduct", function () {
        $(".compareProduct").hide();
    });
     function getComapreItemCount()
    {
        var checkcount = 0;
        if(localStorage.getItem('mage-cache-storage')) {
            var collection = JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products'];
            if(collection) {
                checkcount = collection.count;
            }
        }
        return checkcount;
    }
    $('body').on('click', '.product-item-detailed-info .product-item-actions label', function () {   
        
        if ($(this).siblings("input[type='checkbox']").prop("disabled")) {
            clearTimeout(tips);
            $('.wishlistTips').fadeIn();
            if ($(window).width() > 768) {
                $(".wishlistTips p").text("You have already selected 3 products");
            } else {
                $(".wishlistTips p").text("You have already selected 2 products");
            }
            tips = setTimeout(function() {
                $('.wishlistTips').fadeOut();
            }, 2000);
        }
    });
    $(document).on('change', '.product-item-info-details input[type="checkbox"]', function () {
        //Increment count
        $('.mainProductSec .comparepart .compareBTN i').text(checkcount);

        var getproimg = $(this).parents('.product-item-info-details').find('img.product-image-photo').attr('src');
        var getProName = $(this).parents('.product-item-info-details').find('.product-item-name a').text();
        var getId = $(this).attr('id');
        
        var ischecked = $(this).is(':checked');
        if (ischecked) {
            checkcount++;
            var rawData = $(this).parent().siblings("a").attr('data-post');
        
            var url  = JSON.parse(rawData).action;
            
            var data = {
                form_key : $.cookie('form_key'),
                product  : JSON.parse(rawData).data.product,
                uenc     : JSON.parse(rawData).data.uenc
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                showLoader: true,
                success: function (resp) { 
                    
                    if (resp.success == true )
                    {
                        customerData.reload('compare-products',true);
                        addproductAction(getId,getproimg,getProName);
                    } else {                    
                        checkcount--;
                        $('.comparepart .compareProduct .oneboxPro[check-set="' + getId + '"]').remove();
                        $('#'+getId).prop('checked', false);
                        if(typeof(resp.message) != "undefined" && resp.message !== null) {
                            $(".wishlistTips p").text(resp.message);
                            $('.wishlistTips').fadeIn();
                            tips = setTimeout(function() {
                                $('.wishlistTips').fadeOut();
                            }, 2000);
                        }
                    }
                }
            });
        } else {
            
            $('.comparepart .compareProduct .oneboxPro[check-set="' + getId + '"]').children(".crossIcon").children("i").trigger("click");
            $('.comparepart .compareProduct .oneboxPro[check-set="' + getId + '"]').remove();
        }
    });
    $(document).on('click', '.compare input[type="checkbox"]', function () {
        //Increment count
        $('.mainProductSec .comparepart .compareBTN i').text(checkcount);
        var getproimg = $(this).parent().siblings('.p_comprorivew').find('.p_imgcompdp img').attr('src');
        var getProName = $(this).parent().siblings('.p_comprorivew').find('.p_detacomparepdp h2').text();
        var getId = $(this).attr('id');

        var ischecked = $(this).is(':checked');
        if (ischecked) {
        
            checkcount++;
            var rawData = $(this).parent().siblings("a").attr('data-post');

            var url = JSON.parse(rawData).action;
            var data = {
                form_key: $.cookie('form_key'),
                product: JSON.parse(rawData).data.product,
                uenc: JSON.parse(rawData).data.uenc
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp.success == true)
                    {                    
                        customerData.reload('compare-products', true);
                        addproductPdpAction(getId, getproimg, getProName);
                    } else {                    
                        checkcount--;
                        $('.comparepart .compareProduct .oneboxPro[check-set="' + getId + '"]').remove();
                        $('#' + getId).prop('checked', false);
                        if(typeof(resp.message) != "undefined" && resp.message !== null) {
                            $(".wishlistTips p").text(resp.message);
                            $('.wishlistTips').fadeIn();
                            tips = setTimeout(function() {
                                $('.wishlistTips').fadeOut();
                            }, 2000);
                        }
                    }
                }
            });
        } else {
        
            $('.comparepart .compareProduct .oneboxPro[check-set="' + getId + '"]').children(".crossIcon").children("i").trigger("click");
            $('.comparepart .compareProduct .oneboxPro[check-set="' + getId + '"]').remove();
        }
    });
    function addproductPdpAction(getId, getproimg, getProName)
    {
         var already_added = 0;
        $(".oneboxPro").each(function() {
            if($(this).attr('check-set') == getId) 
            {
                already_added = 1;
            }
        });
        if (already_added == 0) {
            $('.comparepart .compareBTN span').text(checkcount);

            if ($(window).width() < 768) {
                if (checkcount > 0) {
                    $('.comparepart .mobilecomparedrop').show();
                    $('.comparepart .compareProduct').show();
                    $('.compareBTN').fadeIn(200);
                    
                } else {
                    $('.compareBTN').fadeOut(200);
                    $('.comparepart .mobilecomparedrop').hide();
                    $('.comparepart').removeClass('comparepartShow');
                    $('.a_filterBtnot').removeClass('topsift');
                    $('.a_scrollUpInMob').removeClass('topsift');
                }
            } else {
                if (checkcount > 0) {
                    $('.compareBTN').fadeIn(200);
                }
                
            }
            removeBlankCmp(checkcount);
            var removeUrlRaw = {};
            if (JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products']) {
                var collection = JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products'];
                if (collection.items.length > 0) {
                    for (var i = 0; i < collection.items.length; i++) {
                        var compareListProduct = collection.items[i];

                        if (compareListProduct.id == getId) {
                            $('.comparepart .compareProduct').prepend('<div class="oneboxPro" check-set="' + compareListProduct.id + '"><div class="proImg"><img src="' + compareListProduct.product_image + '" alt=""><i class="fa fa-times" data-post="' + compareListProduct.remove_url + '"></i></div><p>' + compareListProduct.name + '</p></div>');
                        } else {
                            var base_url = window.location.origin + "/catalog/product_compare/remove/";
                            removeUrlRaw = '{"action": "' + base_url + '", "data": {"uenc": "", "product": "' + getId + '"}}';
                            $('.comparepart .compareProduct').prepend("<div class='oneboxPro' check-set='" + getId + "'><div class='proImg'><img src='" + getproimg + "' alt=''><i class='fa fa-times' data-post='" + removeUrlRaw + "'></i></div><p>" + getProName + "</p></div>");
                            break;
                        }
                    }
                } else {
                    var base_url = window.location.origin + "/catalog/product_compare/remove/";
                    removeUrlRaw = '{"action": "' + base_url + '", "data": {"uenc": "", "product": "' + getId + '"}}';
                    $('.comparepart .compareProduct').prepend("<div class='oneboxPro' check-set='" + getId + "'><div class='proImg'><img src='" + getproimg + "' alt=''><i class='fa fa-times' data-post='" + removeUrlRaw + "'></i></div><p>" + getProName + "</p></div>");
                }
            } else {
                var base_url = window.location.origin + "/catalog/product_compare/remove/";
                removeUrlRaw = '{"action": "' + base_url + '", "data": {"uenc": "", "product": "' + getId + '"}}';
                $('.comparepart .compareProduct').prepend("<div class='oneboxPro' check-set='" + getId + "'><div class='proImg'><img src='" + getproimg + "' alt=''><i class='fa fa-times' data-post='" + removeUrlRaw + "'></i></div><p>" + getProName + "</p></div>");
            }

            if (checkcount >= maxCheckCount) {
                $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', true);
            } else {
                $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', false);
            }
            $('#' + getId).prop('checked', true);
            $('#' + getId).parent().removeClass( "compare" ).addClass( "compare comparepdp" );
            $('#' + getId).next('label').html('Added');
            $('.compare .comparepdp label[for="' + getId + '"]').html(window.compare_added);
        }
    }
    function addproductAction(getId,getproimg,getProName)
    {
        var already_added = 0;
        
        $(".oneboxPro").each(function() {
            if($(this).attr('check-set') == getId) 
            {
                already_added = 1;
            }
        });
        if (already_added == 0) {
            $('.comparepart .compareBTN span').text(checkcount);

            if ($(window).width() < 768) {
                if (checkcount > 0) {
                    $('.comparepart .mobilecomparedrop').show();
                    $('.comparepart .compareProduct').show();
                    $('.compareBTN').fadeIn(200);
                    
                } else {
                    $('.compareBTN').fadeOut(200);
                    $('.comparepart .mobilecomparedrop').hide();
                    $('.comparepart').removeClass('comparepartShow');
                    $('.a_filterBtnot').removeClass('topsift');
                    $('.a_scrollUpInMob').removeClass('topsift');
                }
            } else {
                if (checkcount > 0) {
                    $('.compareBTN').fadeIn(200);
                }
                
            }
            removeBlankCmp(checkcount);
            var removeUrlRaw = {};
            if(JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products']) {
                var collection = JSON.parse(localStorage.getItem('mage-cache-storage'))['compare-products'];

                if(collection.items.length > 0) {
                    for (var i = 0; i < collection.items.length; i++) {
                        var compareListProduct = collection.items[i];

                        if(compareListProduct.id == getId) {
                            $('.comparepart .compareProduct').prepend('<div class="oneboxPro" check-set="' + compareListProduct.id + '"><div class="crossIcon"><i class="fa fa-times" data-post="'+ compareListProduct.remove_url +'"></i></div><div class="proImg"><img src="' + compareListProduct.product_image + '" alt=""></div><p>' + compareListProduct.name + '</p></div>');
                        } else {
                            var base_url = window.location.origin+"/catalog/product_compare/remove/";
                            removeUrlRaw = '{"action": "'+base_url+'", "data": {"uenc": "", "product": "'+getId+'"}}';
                            $('.comparepart .compareProduct').prepend("<div class='oneboxPro' check-set='" + getId + "'><div class='crossIcon'><i class='fa fa-times' data-post='" + removeUrlRaw +"'></i></div><div class='proImg'><img src='" + getproimg + "' alt=''></div><p>" + getProName + "</p></div>");
                            break;
                        }
                    }
                } else {
                    var base_url = window.location.origin+"/catalog/product_compare/remove/";
                    removeUrlRaw = '{"action": "'+base_url+'", "data": {"uenc": "", "product": "'+getId+'"}}';
                    $('.comparepart .compareProduct').prepend("<div class='oneboxPro' check-set='" + getId + "'><div class='crossIcon'><i class='fa fa-times' data-post='" + removeUrlRaw +"'></i></div><div class='proImg'><img src='" + getproimg + "' alt=''></div><p>" + getProName + "</p></div>");
                }
            } else {
                var base_url = window.location.origin+"/catalog/product_compare/remove/";
                removeUrlRaw = '{"action": "'+base_url+'", "data": {"uenc": "", "product": "'+getId+'"}}';
                $('.comparepart .compareProduct').prepend("<div class='oneboxPro' check-set='" + getId + "'><div class='crossIcon'><i class='fa fa-times' data-post='" + removeUrlRaw +"'></i></div><div class='proImg'><img src='" + getproimg + "' alt=''></div><p>" + getProName + "</p></div>");
            }
            
            addVsCmp(checkcount);

            if (checkcount >= maxCheckCount) {
                $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', true);
            } else {
                $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', false);
            }
            $('#' + getId).prop('checked', true);
            $('.product-items .product-item-detailed-info label[for="' + getId + '"]').css({'background': '#00b6b6', 'color': '#ffffff'});
            $('.product-items .product-item-detailed-info label[for="' + getId + '"]').html(window.compare_added);
        }
    }
    function removeBlankCmp(checkcount) {
        var removecnt = maxCheckCount - checkcount;
        if (checkcount > 0) {
            $('.compareProduct .blankCmparBox').slice(removecnt).remove();
        }
    }
    
    $(document).on('click', '.comparepart .compareProduct .oneboxPro .crossIcon i', function () {
        var rawData = $(this).attr('data-post');
        var url  = JSON.parse(rawData).action;
        var data = {
            form_key : $.cookie('form_key'),
            product  : JSON.parse(rawData).data.product,
            uenc     : JSON.parse(rawData).data.uenc
        }
        $.post(url, data);
        $(this).parents('.oneboxPro').remove();

        var getcheckSet = $(this).parents('.oneboxPro').attr('check-set');
        $('#' + getcheckSet).prop('checked', false);

        $('.product-items .product-item-detailed-info label[for="' + getcheckSet + '"]').css({'background': '#f6f6f6', 'color': '#222222'});
        $('.product-items .product-item-detailed-info label[for="' + getcheckSet + '"]').html(window.compare_remove);
        var base_url = window.location.origin+"/customcatalog/product/ajaxadd/";
        addUrlRaw = '{"action": "'+base_url+'", "data": {"uenc": "", "product": "'+JSON.parse(rawData).data.product+'"}}';
        $("#"+getcheckSet).siblings('a.action.tocompare').attr('data-post', addUrlRaw);
        checkcount--;
        $('.comparepart .compareBTN span').text(checkcount);       

        var oneboxProCount = $('.comparepart .compareProduct .oneboxPro').length;
        removeVsCmp(oneboxProCount);
        if (oneboxProCount < 1) {
            $('.comparepart .compareProduct').hide();            
            $('.compareBTN').fadeOut(200);
            $('.comparepart .mobilecomparedrop').hide();
            $('.comparepart').removeClass('comparepartShow');
        }
        

        if (checkcount >= maxCheckCount) {
            $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', true);
        } else {
            $('.product-items .product-item-detailed-info input[type="checkbox"]:not(:checked)').prop('disabled', false);
        }
    });
      function removeVsCmp(oneboxProCount) {
        if (oneboxProCount == 2) {
	   $('.comparepart .compareProduct .vs2').remove();
        }
        if (oneboxProCount == 1) {
	  $('.comparepart .compareProduct .vs1').remove();
          $('.comparepart .compareProduct .removeAllFltr .removeAll').removeClass("ShowRemoveAll");
        }
    }
    
       function addVsCmp(checkcount)
    {
       
        if( checkcount==2 ){
        $('.comparepart .compareProduct').
                            append(" <div class='vs1'><p>vs</p></div>");
          $('.comparepart .compareProduct .removeAllFltr .removeAll').addClass("ShowRemoveAll");
            
        }
         if(checkcount==3)
            {
                 $('.comparepart .compareProduct').
                            append(" <div class='vs2'><p>vs</p></div>");
            }  
      
    }
    /** EndOf Compare Popup **/
});