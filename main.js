/*
$.mobile.loading('show', {
text: '加载中...', //加载器中显示的文字
textVisible: true, //是否显示文字
theme: 'a',        //加载器主题样式a-e
textonly: false,   //是否只显示文字
html: ""           //要显示的html内容，如图片等
});

$.mobile.loading('hide');
*/
var myDebug = 0;
    /*
$(document).ready(function(){


    //$.mobile.changePage('#page1','flip',true,true);
});
*/

function show_debug(msg){
    var t=document.getElementById('Tdebug');
    t.innerHTML="debug:caller is " + arguments.callee.caller.name + "()<br>"+msg;
}

//.javascript 去除頭尾空白Trim()
function trim(tar)
{
    if(tar == undefined) return '';
    return tar.replace(/(^\s*)|(\s*$)/g, "");
}

function jsMobileReload(){
    /*
    jQuery.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
    */
    window.location.href = "index.php";
}

function doLogin(mode){
    var ajax_url;
    var tmp;
    var errMsg_dialog = $("#errMsg");
    if(mode != 'out'){
        ajax_url='main.php?sub=func&moj=login';
        //        show_debug(ajax_url);
        var uid = trim(jQuery('#uid').val());
        var upwd = trim(jQuery('#upwd').val());
		//location.assign("http://yuxun.our-program.com.tw/m2/menu.php");//test
        if(!uid || !upwd) {
            //$.mobile.changePage('func/liogin_err.php','flip',false,false);
            //$.mobile.changePage('func/liogin_err.php','flip',true,true);
            //$.mobile.changePage('func/liogin_err.php','flip');
            //
            errMsg_dialog.click();
            return;
        }
		
        var dataTypeStr;
        if(myDebug)dataTypeStr = 'html';
        else dataTypeStr = 'json';
        
        var submitBtn = jQuery('#submitBtn');
        
        submitBtn.addClass('ui-disabled');
        
        jQuery.ajax({
            url:ajax_url,
            dataType: dataTypeStr,
            type: 'POST',
            data: {
                uid: uid
                ,upwd: upwd
            },
            timeout: 5000,
            error: function(sRs, ajaxOptions, thrownError){
                //. alert(thrownError);
				
                alert('回傳的資料錯誤>>'+thrownError); //當讀取失敗
            },
            success: function(data){
                if(myDebug){
                    alert(data);
                }else{
                    if(data.logged == true){
                        //.                        alert("登入成功");
                        jsMobileReload();
                    }else{
                        //$.mobile.changePage('func/liogin_err.php','flip',true,true);
                        //$.mobile.changePage('func/liogin_err.php','flip');
                        //$.mobile.changePage('func/liogin_err.php','slidedown');
                        errMsg_dialog.click();

                        submitBtn.removeClass('ui-disabled');
                    }

                }

                //$.mobile.changePage("func/liogin_err.php", "slideup");

            }});

    }else{
        ajax_url='main.php?sub=func&moj=logout';
        jQuery.ajax({
            url:ajax_url,
            type: 'POST',
            data: {
                uid: ''
                ,upwd: ''
            },
            timeout: 2000,
            error: function(sRs){
                alert('回傳錯誤'+sRs); //當讀取失敗
            },
            success: function(data){
                //.            alert(data);
                //
                jsMobileReload();
            }});
    }



}