/**
 * Created by CJuser on 2016-11-03.
 */

$(function(){

    var isbn = localStorage.isbn;
    var title = localStorage.title;
    var author = localStorage.author;
    var img = localStorage.img;


    $(document).on('click', '#com', function() {

        alert("저장 하러갑니닷");



        var pass = $("#pw").val();
        var text = $("#text").val();
        alert(text+"제목입니닷");

        var content = $("#content").val();


        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/book/commentInsert",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{

                isbn : isbn,
                title : title,
                author : author,
                pass : pass,
                text : text,
                content : content,
                img : img

            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                alert("서평이 입력되었습니다.");
            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){

                alert("코드 다시짜라~!")
            }
        });

    });

});












