 /**
 * Created by CJuser on 2016-11-04.
 */

$(function(){

    var cid = localStorage.cid;
    alert("cid는"+cid);
    var checkid = null;


    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/delSessionCheck",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면
        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",
        data:{

        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){
             checkid = result.email;
        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("코드 다시짜라~!")
        }
    });



    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/commentContent",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면
        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",
        data:{
            cid : cid
        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){

            alert("서평 내용을 출력합니다..");

                var tr = $("<tr></tr>").attr("data-isbn", result[0].isbn);
                var cid = $("<th class='last'>" + result[0].cid + "</th>");
                var ctitle2 = $("<th class='last' style='width:60%;'>" + result[0].ctitle2 + "</th>");
                var cdate = $("<th class='last' style='width:20%;'>" + result[0].cdate + "</th>");
                var email = $("<th class='last' align='right'>" + result[0].email + "</th>");

                var img = $("<img id='getimg' src='" + result[0].img + "'  align=left vspace=0 hspace=30 height='300px'/>");

                var table = $("<table></table>");
                var tr1 = $("<tr></tr>");
                var title = $("<td>"+result[0].ctitle+"</td>>");


                tr1.append(title);
                table.append(tr1);

               tr.append(cid);
               tr.append(ctitle2);
                tr.append(cdate);
                 tr.append(email);
                $("tbody").append(tr);
                alert(result[0].ctext);

                $(".newsCont").text(result[0].ctext);

                $(".newsCont1").append(img);
                $(".newsCont1").append("<span>도서번호 : </span>");
                $(".newsCont1").append(result[0].isbn);
                $(".newsCont1").append("<br>");
                $(".newsCont1").append(result[0].ctitle);
                $(".newsCont1").append("<br>");
                $(".newsCont1").append("<span>저자 : </span>");
                $(".newsCont1").append(result[0].cauthor);



            if(checkid==result[0].email){
                alert("체크로 들어왔습니다=============================================")
                var delbtn= $("<button id='delcom'>서평삭제</button>");
                $(".tac").append(delbtn);
            }


        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("코드 다시짜라~!")
        }
    });

    $(document).on('click', '#delcom', function() {

        alert(cid);

        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/book/deleteComment",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{
                cid : cid
            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                alert("책 정보가 삭제되었습니다.");

                $(location).attr("href","commentList.html");

            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("코드 다시짜라~!")
            }
        });
    });



});

