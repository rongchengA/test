$(function() {

    $('#loginsub').click(

        function() {
            var paramMap={};
            paramMap["username"] = $("#username").val();
            paramMap["password"] = $("#password").val();
                $.ajax({
                    type : "POST", // post提交方式默认是get
                    url : "/system/longin",
                    data : {"usermap" : paramMap},
                    error : function(request) {
                        toastr.error("系统异常");
                        return;
                    },
                    success : function(data) {
                        alert(date.mag);
                    }
                });

        })
});

function test() {
    alert("123")
}