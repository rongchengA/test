function getRootPath(){  
    //获取当前网址，如： http://localhost:80/ybzx/index.jsp  
    var curPath=window.document.location.href;  
    //获取主机地址之后的目录，如： ybzx/index.jpg
    var pathName=window.document.location.pathname;  
    var pos=curPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:80  
    var localhostPaht=curPath.substring(0,pos);  
    //获取带"/"的项目名，如：/ybzx
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    return localhostPaht+projectName; 
}