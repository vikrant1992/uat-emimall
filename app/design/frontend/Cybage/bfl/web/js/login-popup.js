/**** Start Login*****/
require(['jquery'], function ($) {
  $(document).ready(function () {
    $(".a_emi_header .topfHeader .a_rightnotiPop > button").click(function(e) {
      e.stopPropagation();
      $("#j_headerLoginPop.j_loginPop").addClass("j_showpopup");
      $(".transparentBG").show();
      $("body").css("overflow", "hidden");
    });
    $(".a_emi_header .topfHeader .getAmount > button").click(function(e) {
      e.stopPropagation();
      $(".j_loginPop").addClass("j_showmopopup");
      $("body").css("overflow", "hidden");
    });
    $(".j_loginPop .backHeader .a_backHeader").click(function(e) {
        $(".j_loginPop").removeClass("j_showmopopup");
    });    
    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_loginform .j_subOtp button").click(function(e) {
      verifyOtpAndGetOffer(this);
    });
    function fildValidation(th, ErrMSG) {
        if (ErrMSG) {
            $(th).siblings(".errormsg").text(ErrMSG);
        }
    }    
   function allFormFieldValidationCheck(ThisObj, eventType) {

        var parent = ThisObj.parents("form").attr("id");
        var error = 0;
        $("#" + parent + " " + ".InputField input").each(function() {

            if (!$(this).hasClass("nomandetory")) {
                if (!$(this).attr('disabled')) {
                    if ($(this).val() == "") {

                        $(this).siblings(".errormsg").show();
                        fildValidation(this);

                    } else {

                        if ($(this).hasClass('FirstNameVD')) {

                            if (!/^[a-zA-Z]*$/g.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter alphabets only");
                                if ($(this).val().indexOf(" ") != -1) {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "Space is not allowed");
                                }
                            } else { $(this).siblings(".errormsg").hide(); }

                        } else if ($(this).hasClass('LastNameVD')) {

                            if (!/^[a-zA-Z]*$/g.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter alphabets only");
                                if ($(this).val().indexOf(" ") != -1) {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "Space is not allowed");
                                }
                            } else { $(this).siblings(".errormsg").hide(); }

                        } else if ($(this).hasClass('PinCodeVD')) {

                            if (!/^[0-9]+$/.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter 6 digit Pin code");

                            } else { $(this).siblings(".errormsg").hide(); }

                        } else if ($(this).hasClass('mobileVD')) {

                            var value = $(this).val();

                            if (value.length < 10 || value.length > 10) {
                                if (eventType == 1) {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "Please enter 10 digit mobile number");
                                }
                            } else {
                                if (value.indexOf('.') > -1) {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "Please enter 10 digit mobile number");
                                } else if (value.substr(0, 1) == 9 || value.substr(0, 1) == 8 || value.substr(0, 1) == 7 || value.substr(0, 1) == 6 || value.substr(0, 1) == 5) {
                                    $(this).siblings(".errormsg").hide();
                                    fildValidation(this);
                                } else {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "Invalid mobile number");
                                }
                            }

                        } else if ($(this).hasClass('otpVD')) {

                            var value = $(this).val();

                            if (value.length < 6) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter 6 digit otp");
                            } else {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            }

                        } else if ($(this).hasClass('captchaVD')) {

                            var value = $(this).val();

                            if (value.length < 4 || value.length > 4) {

                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter 4 digit OTP");
                            } else {
                                $(this).siblings(".errormsg").hide();
                            }

                        } else if ($(this).hasClass('datepickerVD')) {
                            if ($(this).val()) {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                                $(this).siblings("label").addClass("active");
                            } else {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this);
                                $(this).siblings("label").removeClass("active");
                            }
                        } else if ($(this).hasClass('AddressVD')) {

                            var value = $(this).val();

                            if (/[`~.<>;':"\/\[\]\|{}()=_+-]/g.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "<>?'=+-_^`~  not allowed");
                            } else {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            }


                        } else if ($(this).hasClass('PanVD')) {

                            var value = $(this).val();
                            if (value.length < 10 || value.length > 10) {
                                if (eventType == 1) {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "Please enter 10 characters PAN");
                                }
                                error++;
                            }
                            if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test($(this).val())) {

                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter valid PAN. eg: ABCHE9999A");
                            } else {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            }

                        } else if ($(this).hasClass('emailVD')) {
                            var sval = $(this).val().trim();
                            $(this).val(sval);
                            var a = $(this).val();
                            var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (filter.test(a)) {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            } else {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter valid email ID");
                            }
                        } else if ($(this).hasClass('numberVD')) {

                            if (!/^[0-9]+$/.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this);

                            }

                        } else if ($(this).hasClass('FullNameVD')) {
                            var sval = $(this).val().trim();
                            $(this).val(sval);
                            if (!/^[a-zA-Z ]*$/g.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter alphabets only");

                            } else if ($(this).val().split(" ").length == 1) {
                                $(this).siblings(".errormsg").show();
                            } else {
                                if ($(this).val().split(" ").length > 3) {
                                    $(this).siblings(".errormsg").show();
                                    fildValidation(this, "More than one space not allowed");
                                } else {
                                    $(this).siblings(".errormsg").hide();
                                    fildValidation(this);
                                }
                            }
                        } else if ($(this).hasClass('textVD')) {

                            if (!/^[a-zA-Z ]*$/g.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter alphabets only");

                            } else {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            }
                        } else if ($(this).hasClass('captchaVD')) {

                            if (!/^[A-Za-z0-9-]*$/g.test($(this).val())) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter valid CAPTCHA");

                            } else {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            }
                        }

                    }

                }
            }

        });

        $("#" + parent + " " + ".InputField select").each(function() {
            if (!$(this).hasClass("nomandetory")) {
                if (!$(this).attr('disabled')) {
                    if ($(this).val() == "") {
                        $(this).siblings(".errormsg").show();
                        fildValidation(this);
                    } else {
                        $(this).siblings(".errormsg").hide();
                        fildValidation(this);
                    }
                }
            } else {

            }
        });
    } 

    $(".Subbutton").click(function(e) {
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Login_PSTP',                
			'clickText': 'Get OTP',
			'pageType': 'Compare',
			'customerID': customerId,
			'customerType': ''
		});
        e.preventDefault();
        var ThisObj = $(this);
        var NoError = allFormFieldValidationCheck(ThisObj, 1);

    });    
   
    $(".InputField input").blur(function() {
        var ThisObj = $(this);

        if (!$(this).hasClass("nomandetory")) {
            if (!$(this).attr('disabled')) {
                if ($(this).val() == "") {
                    $(this).siblings(".errormsg").show();
                    fildValidation(this);
                } else {

                    if ($(this).hasClass('FirstNameVD')) {

                        if (!/^[a-zA-Z]*$/g.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter alphabets only");
                            if ($(this).val().indexOf(" ") != -1) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Space is not allowed");
                            }
                        } else { $(this).siblings(".errormsg").hide(); }


                    } else if ($(this).hasClass('LastNameVD')) {

                        if (!/^[a-zA-Z]*$/g.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter alphabets only");
                            if ($(this).val().indexOf(" ") != -1) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Space is not allowed");
                            }
                        } else { $(this).siblings(".errormsg").hide(); }

                    } else if ($(this).hasClass('PinCodeVD')) {

                        if (!/^[0-9]+$/.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this);
                        } else { $(this).siblings(".errormsg").hide(); }

                    } else if ($(this).hasClass('mobileVD')) {

                        var value = $(this).val();

                        if (value.length < 10 || value.length > 10) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter 10 digit mobile number");
                        } else {
                            if (value.indexOf('.') > -1) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Please enter 10 digit mobile number");
                            } else if (value.substr(0, 1) == 9 || value.substr(0, 1) == 8 || value.substr(0, 1) == 7 || value.substr(0, 1) == 6 || value.substr(0, 1) == 5) {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            } else {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "Invalid mobile number");
                            }
                        }

                    } else if ($(this).hasClass('otpVD')) {

                        var value = $(this).val();

                        if (value.length < 6) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter 6 digit otp");
                        } else {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        }

                    } else if ($(this).hasClass('captchaVD')) {

                        var value = $(this).val();

                        if (value.length < 4 || value.length > 4) {

                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter 4 digit captcha");
                        } else {
                            $(this).siblings(".errormsg").hide();
                        }

                    } else if ($(this).hasClass('datepickerVD')) {
                        if ($(this).val()) {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                            $(this).siblings("label").addClass("active");
                        } else {

                            $(this).siblings(".errormsg").show();
                            fildValidation(this);
                            $(this).siblings("label").removeClass("active");

                        }
                    } else if ($(this).hasClass('AddressVD')) {

                        var value = $(this).val();

                        if (/[`~.<>;':"\/\[\]\|{}()=_+-]/g.test($(this).val())) {

                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "<>?'=+-_^`~  not allowed");
                        } else {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        }

                    } else if ($(this).hasClass('PanVD')) {
                        var value = $(this).val();
                        if (value.length < 10 || value.length > 10) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter 10 characters PAN");
                        }
                        if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter valid PAN. eg: ABCHE9999A");
                        } else {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        }

                    } else if ($(this).hasClass('emailVD')) {
                        var sval = $(this).val().trim();
                        $(this).val(sval);
                        var a = $(this).val();
                        var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (filter.test(a)) {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        } else {

                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter valid email ID");

                        }
                    } else if ($(this).hasClass('numberVD')) {

                        if (!/^[0-9]+$/.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this);

                        } else {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        }


                    } else if ($(this).hasClass('FullNameVD')) {
                        var sval = $(this).val().trim();
                        $(this).val(sval);
                        if (!/^[a-zA-Z ]*$/g.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter alphabets only");

                        } else if ($(this).val().split(" ").length == 1) {
                            $(this).siblings(".errormsg").show();
                        } else {
                            if ($(this).val().split(" ").length > 3) {
                                $(this).siblings(".errormsg").show();
                                fildValidation(this, "More than one space not allowed");
                            } else {
                                $(this).siblings(".errormsg").hide();
                                fildValidation(this);
                            }

                        }
                    } else if ($(this).hasClass('textVD')) {

                        if (!/^[a-zA-Z ]*$/g.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter alphabets only");

                        } else {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        }
                    } else if ($(this).hasClass('captchaVD')) {

                        if (!/^[A-Za-z0-9-]*$/g.test($(this).val())) {
                            $(this).siblings(".errormsg").show();
                            fildValidation(this, "Please enter valid CAPTCHA");

                        } else {
                            $(this).siblings(".errormsg").hide();
                            fildValidation(this);
                        }
                    }
                }

            }
        }

    });    
    $('.mobileVD').keyup(function(e) {
        var mo = $(this).val();
        if (mo.length > 10) {
            $(this).val(mo.substr(0, 10));
        }
    });
    $('.PinCodeVD').keyup(function(e) {
        var mo = $(this).val();
        if (mo.length > 6) {
            $(this).val(mo.substr(0, 6));
        }
    });
    $(".captchaVD").keyup(function(e) {
        var otp = $(this).val();
        if (otp.length > 4) {
            $(this).val(otp.substr(0, 4));
        }
        else if (otp.length == 4) {
            $(this).siblings(".errormsg").hide();
            loginformbtncolor();
        }
    });
    $(".otpVD").keyup(function(e) {
        var otp = $(this).val();
        if (otp.length > 6) {
            $(this).val(otp.substr(0, 6));
        }
    });    
    $('.InputField input').focus(function() {
        $(this).parent('.InputField').addClass('activeField');
    });

    $('.InputField input').blur(function() {
        if ($(this).val() == '') {
            $(this).parent('.InputField').removeClass('activeField');
        } else {
            $(this).parent('.InputField').addClass('activeField');
        }
    });

    $('.InputField label').click(function() {
        $(this).siblings('input').focus();
    });
    
    $('#otp').focus(function() {
        $('.otp_validation_error').hide();
    });
    
    var intval;
    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_headDivsec p a").click(function() {
        clearInterval(intval);
        $(".j_login").show();
        $(".j_fullport2").hide();
        $("#loginForm .InputField .mobileVD").val("").focus();
    });



    $('#loginForm .Subbutton').click(function(e) {
        e.preventDefault();
        setTimeout(function() {
            var totalerror = 0;
            if ($('.tNccheck input[type="checkbox"]').prop("checked") == true) {
                totalerror = 0;
                $('.tNccheck .errormsg').hide();

            } else {
                totalerror++;
                $('.tNccheck .errormsg').show();
            }            
            $("#loginForm .errormsg").each(function(i) {
                if ($(this).css("display") == "block") {
                    totalerror++;
                }
            });
            if (totalerror == 0) {
                submitFormAndGetOtp();
                var count = 60;
                clearInterval(intval);
                intval = setInterval(function() {
                    count--;
                    $(".j_counttime > p").text("00:" + count);
                    if (count == 0) {
                        $(".j_otpTimer").hide();
                        $(".j_resendOtp").show();
                        clearInterval(intval);
                    }
                }, 1000);
            }
        }, 300);
    });



    /*
    $("#otpSub .j_subOtp .Subbutton").click(function() {
        if ($(this).hasClass("valid")) {
            $("#j_headerLoginPop.j_loginPop").removeClass("j_showpopup");
            $(".transparentBG").hide();
        }
    });
    */


    function otpformbtncolor() {
        setTimeout(function() {
            if ($("#otpSub .InputField input").val()) {
                if ($("#otpSub .InputField .errormsg").css("display") == "block") {
                    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_loginform .j_subOtp button").css("background", "rgba(88, 99, 228, 0.2)").removeClass("valid");
                } else {
                    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_loginform .j_subOtp button").css("background", "rgba(88, 99, 228, 1)").addClass("valid");


                }
            }
        }, 500);
    }


    $("#otpSub .InputField input").keyup(function() {
        otpformbtncolor();
    });
    $("#otpSub .InputField input").blur(function() {
        otpformbtncolor();
    });



    function loginformbtncolor() {
      if ($('.tNccheck input[type="checkbox"]').prop("checked") == true) {
        $('.tNccheck .errormsg').hide();
        var ttlerr = 0;
        setTimeout(function() {
            for (var f = 0; f < $("#loginForm .InputField input").length; f++) {
                var fi = f + 1;

                if ($("#loginForm .InputField:nth-child(" + fi + ") input").val()) {

                    if ($("#loginForm .InputField:nth-child(" + fi + ") input").siblings(".errormsg").css("display") == "block") {
                        ttlerr++;
                    }
                } else {
                    ttlerr++;
                }

            }
            if (ttlerr == 0) {
                $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_loginform .j_btn button").css("background", "rgba(88, 99, 228, 1)");
            } else {
                $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_loginform .j_btn button").css("background", "rgba(88, 99, 228, 0.2)");
            }
        }, 500);
      }
      else {
        $('.tNccheck .errormsg').show();
        $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec .j_fullport .j_loginform .j_btn button").css("background", "rgba(88, 99, 228, 0.2)"); 
      }
    }

    $('#loginForm .InputField input').keyup(function() {
        loginformbtncolor();
    });

    $('#loginForm .InputField input').blur(function() {
        loginformbtncolor();
    });
    
    $('#loginForm .InputField input[type="checkbox"]').change(function () {
      loginformbtncolor();
    });    
    
    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_cloLoginform").click(function() {
        $("#j_headerLoginPop.j_loginPop").removeClass("j_showpopup");
        $(".transparentBG").hide();
        $("body").css("overflow", "auto");
        location.reload();
		/**
		 * PPT: EMI_MALL_Login_Event_Version_1.ppt implementation : Screen-6 : Desktop
		 * Get data layer code executed whenever someone click on 'Get your pre-approved offer' button in header
		 */
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Login_PSTP',                
			'clickText': 'Close',
			'pageType': 'PLP',
			'customerID': customerId,
			'customerType': ''
		});
		/********** End: Google Analytics code for Login Failed Page ************************************/
    });
    
	/**
	 * PPT: EMI_MALL_Login_Event_Version_1.ppt implementation : Screen-6 : Desktop
	 * Get data layer code executed whenever someone click on 'Get your pre-approved offer' button in header
	 */
	$('.btnBlue').click(function(){
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Login_PSTP',                
			'clickText': 'Continue',
			'pageType': 'PLP',
			'customerID': customerId,
			'customerType': ''
		});
	});
	$('.btnLink').click(function(){
		var pageTitle = $(document).find("title").text();
		var customerId = '';
		dataLayer.push({
			'pageTitle': pageTitle,
			'event': 'Login_PSTP',                
			'clickText': 'Find_Store',
			'pageType': 'PLP',
			'customerID': customerId,
			'customerType': ''
		});
	});
	/********** End: Google Analytics code for Login Failed Page ************************************/
	
    /*** Get OTP Function Begin ***/
    function submitFormAndGetOtp(){
        var getOtpUrl = $('#hiddenGetOtpUrl').val();
        var frm = $('#loginForm');
        $.ajax({
            url: getOtpUrl,
            type: 'POST',
            dataType: "json",
            showLoader: true,
            async: false,
            data: frm.serialize(),
            success: function (data) {
                if (data.apiResponseCode == "00" && data.message == "OTP Sent Successfully") {
                    $(".j_login").hide();
                    $(".j_fullport2").show();
                    $("#hiddenOtpRequestId").val(data.requestID);
                    var mobileNumber = $('#mobileNumber').val();
                    $(".a_otpNumber span").text(mobileNumber);
                } else {
                    $(".j_login").show();
                    $("#hiddenOtpRequestId").val('');
                    $('.action.captcha-reload'). trigger ('click');
                    $("#loginForm #captchaError").show();
                    $("#otpError").html(data.message);
                }
            }
        });
    }
    /*** Get OTP Function End ***/
    
    
    /*** Verify OTP and Show Offers Begin***/
        function verifyOtpAndGetOffer(verifyButton) {
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var mobileNumber = $('#mobileNumber').val();
            var otp = $('#otp').val();
            var requestID = $('#hiddenOtpRequestId').val();
            var verifyOtpUrl = $('#hiddenGetOfferUrl').val();
            
            $.ajax({
                url: verifyOtpUrl,
                type: 'POST',
                dataType: "json",
                showLoader: true,
                async : false,
                data: {
                    mobileNumber: mobileNumber,
                    firstName: firstName,
                    lastName: lastName,
                    otp: otp,
                    requestID: requestID
                },
                success: function (data) {
                    if(data.apiResponseCode == "0" && data.message == "SUCCESS") {
                        var amount = '<span class="preapprovedAmt">' + data.amount + '</span>';
                        showOffers(verifyButton,data);
                        $(".pre-approved-amount").text(data.amount);
                        $(".offer-data .user-name").text(firstName);
                        $("#customerAmount").html(amount);
                        $(".a_rightnotiPop button").hide();
                        $(".getAmount button").hide();
						setCustomerInSession();
                        location.reload();
						/********** End: Google Analytics code for Login Failed Page ************************************/
						/**
						 * PPT: EMI_MALL_Login_Event_Version_1.ppt implementation : Screen-5 : Desktop
						 * Get data layer code executed whenever someone click on 'Get your pre-approved offer' button in header
						 */
						var pageTitle = $(document).find("title").text();
						var customerId = '';
						dataLayer.push({
							'pageTitle': pageTitle,
							'event': 'Login_PSTP',                
							'clickText': 'Login_Success',
							'pageType': 'PLP',
							'customerID': customerId,
							'customerType': ''
						});
						/********** End: Google Analytics code for Login Failed Page ************************************/
                    }
                    else {
                        if($(".j_fullport2 .errormsg").text()){
                            $(".j_fullport2 .errormsg").text("");
                        }
						/********** End: Google Analytics code for Login Failed Page ************************************/
						/**
						 * PPT: EMI_MALL_Login_Event_Version_1.ppt implementation : Screen-4 : Desktop
						 * Get data layer code executed whenever someone click on 'Get your pre-approved offer' button in header
						 */
						var pageTitle = $(document).find("title").text();
						var customerId = '';
						dataLayer.push({
							'pageTitle': pageTitle,
							'event': 'Login_PSTP',                
							'clickText': 'Login_Fail',
							'pageType': 'PLP',
							'customerID': customerId,
							'customerType': ''
						});
						/********** End: Google Analytics code for Login Failed Page ************************************/	
                        $(".j_fullport2 .otp_validation_error").html(data.message).css('display','block');
                    }
                }
            });
        }
        
        function showOffers(verifyButton,data){
            if ($(verifyButton).hasClass("valid")) {
                $("#j_headerLoginPop.j_loginPop .j_popHundWidth .j_portsec").hide();
                $("#j_headerLoginPop.j_loginPop .j_popHundWidth .jRightPort").hide();
                if(data.amount > 0){
                    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .congratesPart.congOpen1").show();
                }else{
                    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .congratesPart.congOpen3").show();
                    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .congratesPart.congOpen1").hide();
                    $("#j_headerLoginPop.j_loginPop .j_popHundWidth .congratesPart.congOpen2").hide();
                }
            }
        }
        $(".openofr").click(function(e) {
            $("#j_headerLoginPop.j_loginPop .j_popHundWidth .congratesPart.congOpen1").hide();
            $("#j_headerLoginPop.j_loginPop .j_popHundWidth .congratesPart.congOpen2").show();
        });
    /*** Verify OTP and Show Offers End***/
    
    /*** Resend OTP Begin***/
        $('.j_loginform .j_resendOtp').click(function () {
            $('#hiddenSkipCaptchaCheck').val("yes");
            submitFormAndGetOtp();
            if($('#hiddenOtpRequestId').val() != '') {
                var count = 60;
                clearInterval(intval);
                intval = setInterval(function() {
                    count--;
                    $(".j_counttime > p").text("00:" + count);
                    if (count == 0) {
                        $(".j_otpTimer").hide();
                        $(".j_resendOtp").show();
                        clearInterval(intval);
                    }
                }, 1000);
            }
        });
    /*** Resend OTP End***/

    /***Set Customer Value in Session Begin***/
        function setCustomerInSession(){
            var baseUrl = window.location.origin;
            var url = baseUrl + "/storelocator/index/session";
            var firstName = $('#firstName').val();
            $.ajax({
                showLoader: true,
                url: url,
                data: {
                    firstName: firstName
                },
                type: "POST",
                success: function () {
                }
            });
        }
    /***Set Customer Value in Session End***/

  });
});