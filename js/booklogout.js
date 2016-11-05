/**
 * Created by CJuser on 2016-11-03.
 */

//세션을 확인해서 로그인, 로그아웃으로 바꿈

$(document).on('click', '#out', function() {

    var xx = "t";
    $.ajax({

        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/sessionCheck",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면
        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",

        data:{
            quit : xx
        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){

            alert("로그아웃 되었습니다");
            $(location).attr("href","index.html");
        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("서버에 문제가있습니다.~");
        }
    });

});