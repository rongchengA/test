/**
 * 实现左侧导航栏显示或隐藏
 */
$(document).ready(function(){  
    var isHiden = true; /*控制切换菜单*/  
    $('#dis').click(function(){  
        if(isHiden){  
            $('#disCon').animate({left:'-=230px'});//菜单块向左移动  
            $('.main').animate({paddingLeft:'-=230px'});
        }else{  
            $('#disCon').animate({left:'+=230px'}); //菜单块向右移动  
            $('.main').animate({"paddingLeft":"+=230px"});
        }  
        isHiden = !isHiden;  
    });  
});  