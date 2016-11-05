/**
 * Created by CJuser on 2016-11-04.
 */


//서평 게시판 리스트 출력하는 부분,,,,,,,,,,,,,,,
$(function(){

    var reviewisbn =  localStorage.reviewisbn;
    alert("제발 삭제되어라");
    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/commentList",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",
        data:{

            reviewisbn : reviewisbn

        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){
            alert("서평 리스트를 출력합니다..");

            for(var i=0;i<result.length;i++){

                var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);

                var cid = $("<td id='yy'>" + result[i].cid + "</td>");
                var ctitle2 = $("<td id='xx' ><a href='commentContent.html'>" + result[i].ctitle2 + "</a></td>");
                var cdate = $("<td>" + result[i].cdate + "</td>");
                var email = $("<td>" + result[i].email + "</td>");

                tr.append(cid);
                tr.append(ctitle2);
                tr.append(cdate);
                tr.append(email);
                $("tbody").append(tr);

            }

            delete localStorage.reviewisbn;

        },

        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("코드 다시짜라~!")

        }
    });

});


$(document).on('click', '#xx', function() {

        alert($(this).parent().find("#yy").text());
        localStorage.cid = $(this).parent().find("#yy").text();

});



///////////////////////검색해서~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`~~~`서평 보기~~~~~~~~~~~~~~~~~~~~~~~/////////////////////

$(document).on('click', '#search', function() {

    var search = $("#titlesearch").val();
    alert(search);

    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/CommentKeywordList",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",
        data:{

            search : search

        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){
            alert("서평 리스트를 출력합니다..");

            $("tbody").empty();

            for(var i=0;i<result.length;i++){
                alert(result[i].isbn);
                var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);

                var cid = $("<td id='yy'>" + result[i].cid + "</td>");
                var ctitle2 = $("<td id='xx' ><a href='commentContent.html'>" + result[i].ctitle2 + "</a></td>");
                var cdate = $("<td>" + result[i].cdate + "</td>");
                var email = $("<td>" + result[i].email + "</td>");

                tr.append(cid);
                tr.append(ctitle2);
                tr.append(cdate);
                tr.append(email);
                $("tbody").append(tr);



            }

        },

        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("코드 다시짜라~!")

        }
    });

});





