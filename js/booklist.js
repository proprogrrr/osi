//입력상자에 어떤 key든 입력이 되면 무조건 호출

//전체목록출력 누르면 발생하는 이벤트////////////////////////////////////
$(document).on("click","#allList",function(){

    $("li").remove();
    $("#contents1").attr("id","contents");

    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/selectForPage",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",

        data:{
            page : 1
        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){
            alert("정상처리되었습닏.");
            alert(result[0].title);
            alert(result[0].count);
            var rp = result[0].pageCal;
            for(var i=0;i<result.length;i++) {

                var tr = $("<li></li>").attr("data-isbn", result[i].isbn);
                var img = $("<div id='bookimg' ><img id='getimg' src='" + result[i].img + "' height='200px'/></div>");
                var titleTd = $("<p id='title' align='center'></p>").text(result[i].title);
                var authorTd = $("<p id='author'></p>").text(result[i].author);
                var priceTd = $("<p id='price'></p>").text(result[i].price);

                var updatebtn = $("<button id='update'>수정</button>");
                var detailbtn = $("<button id='detail' >상세정보</button>");

                var ptag = $("<p id='buttontag'></p>");


                ptag.append(updatebtn);
                ptag.append(detailbtn);


                var button = $("<button id='remove' >삭제</button><br>");
                var comment = $("<button id='comment' >서평쓰기</button>");
                var review = $("<button id='review' >서평보기</button>");


                ptag.append(button);
                ptag.append(comment);
                ptag.append(review);

                updatebtn.on("click",function(){

                    var price = $(this).parent().parent().find("#price").text();
                    var title = $(this).parent().parent().find("#title").text();
                    var author = $(this).parent().parent().find("#author").text();

                    var titlebox =$("<input id='ti'/>").attr("type","text").val(title);
                    var authorbox =$("<input id='au'/>").attr("type","text").val(author);
                    var updatebox = $("<input id='pr'/>").attr("type","text").val(price);

                    var updatecomplete = $("<button id='updatecom'>완료</button>");


                    $(this).parent().parent().find("#title").text("")
                    $(this).parent().parent().find("#title").append(titlebox);
                    $(this).parent().parent().find("#author").text("")
                    $(this).parent().parent().find("#author").append(authorbox);
                    $(this).parent().parent().find("#price").text("")
                    $(this).parent().parent().find("#price").append(updatebox);
                    $(this).parent().parent().find("#update").after(updatecomplete);
                    $(this).parent().parent().find("#update").attr("disabled","disabled");


                });//updatebtn onclick end

                tr.append(img);
                tr.append(titleTd);
                tr.append(authorTd);
                tr.append(priceTd);
                tr.append(ptag);

                $("#list").append(tr);


                //페이징처리 div에 값 넣어주기===========================================================================
                if(result[0].pageCal==0){

                    rp = rp+1;

                    if(i+1<=10){

                        var pagenum = $("<a id='"+(rp)+"' href='#' onclick='list("+rp+")'>"+(rp)+"</a>");
                        //페이징처리 div에 값 넣어주기

                        $(".paging").append(pagenum);

                        if(i+1==12){
                            var sp = $("<span style='font-size: 20px'>></span>");
                            $(".paging").append(sp);
                        }
                    }

                }else{

                    if(i+1<=10){
                        var sp = $("<span>></span>");
                        var sp1 = $("<span><</span>");
                        var pagenum = $("<a id='"+(rp)+"' href='#' onclick='list("+rp+")'>"+(rp)+"</a>");

                        if(i==0){
                            $(".paging").append(sp1);
                        }

                            $(".paging").append(pagenum);
                            if(i+1==12){
                            $(".paging").append(sp);
                        }
                    }
                }
                //==================================================================page 마무리=======================
            }
        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("코드 다시짜라~!")
        }
    });

});


function list(rp){

    alert("들어왓습ㄴ다."+rp);
    $("li").remove();

    $("#contents1").attr("id","contents");

    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/selectForPage",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",

        data:{
            page : rp
        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){
            alert("정상처리되었습닏.");

            alert(result[0].title);
            alert(result[0].count);
            var rp =null;
            
            //시작페이지 번호 구하기
            var firstpageNum = Math.ceil(result[0].page/10);
            alert(firstpageNum+"첫번째 페이지 번호");
            var lastPageNum = firstpageNum*10;
            var firstpageNum = 10*firstpageNum-9;

            $(".paging").empty();

            for(var i=0;i<result.length;i++) {

                var tr = $("<li></li>").attr("data-isbn", result[i].isbn);
                var img = $("<div id='bookimg' ><img id='getimg' src='" + result[i].img + "' height='200px'/></div>");
                var titleTd = $("<p id='title' align='center'></p>").text(result[i].title);
                var authorTd = $("<p id='author'></p>").text(result[i].author);
                var priceTd = $("<p id='price'></p>").text(result[i].price);

                var updatebtn = $("<button id='update'>수정</button>");
                var detailbtn = $("<button id='detail' >상세정보</button>");

                var ptag = $("<p id='buttontag'></p>");


                ptag.append(updatebtn);
                ptag.append(detailbtn);


                var button = $("<button id='remove' >삭제</button><br>");
                var comment = $("<button id='comment' >서평쓰기</button>");
                var review = $("<button id='review' >서평보기</button>");


                ptag.append(button);
                ptag.append(comment);
                ptag.append(review);

                updatebtn.on("click",function(){

                    var price = $(this).parent().parent().find("#price").text();
                    var title = $(this).parent().parent().find("#title").text();
                    var author = $(this).parent().parent().find("#author").text();

                    var titlebox =$("<input id='ti'/>").attr("type","text").val(title);
                    var authorbox =$("<input id='au'/>").attr("type","text").val(author);
                    var updatebox = $("<input id='pr'/>").attr("type","text").val(price);

                    var updatecomplete = $("<button id='updatecom'>완료</button>");

                    $(this).parent().parent().find("#title").text("")
                    $(this).parent().parent().find("#title").append(titlebox);
                    $(this).parent().parent().find("#author").text("")
                    $(this).parent().parent().find("#author").append(authorbox);
                    $(this).parent().parent().find("#price").text("")
                    $(this).parent().parent().find("#price").append(updatebox);
                    $(this).parent().parent().find("#update").after(updatecomplete);
                    $(this).parent().parent().find("#update").attr("disabled","disabled");


                });//updatebtn onclick end

                tr.append(img);
                tr.append(titleTd);
                tr.append(authorTd);
                tr.append(priceTd);
                tr.append(ptag);

                $("#list").append(tr);


                //페이징처리 div에 값 넣어주기===========================================================================
 /*               if(result[0].pageCal==0){

                    rp = rp+1;

                    if(i+1<=10){

                        var pagenum = $("<a id='"+(rp)+"' href='#' onclick='list("+rp+")'>"+(rp)+"</a>");
                        //페이징처리 div에 값 넣어주기

                        $(".paging").append(pagenum);

                        if(i+1==12){
                            var sp = $("<span style='font-size: 20px'>></span>");
                            $(".paging").append(sp);
                        }
                    }

                }else*/


                    //첫번째 페이지가 마지막페이지에 다다를때까지
                    if(firstpageNum <=lastPageNum){

                        var sp1 = $("<span onclick='list("+(rp-1)+")'><</span>");
                        var pagenum = $("<a id='"+(rp)+"' href='#' onclick='list("+firstpageNum+")'>"+firstpageNum+"</a>");

                        $(".paging").append(pagenum);

                        if(firstpageNum==lastPageNum){
                            var sp = $("<span onclick='list("+(firstpageNum+1)+")'>></span>");
                            $(".paging").append(sp);
                        }

                        firstpageNum = firstpageNum+1;
                    }






                //==================================================================page 마무리=======================
            }
        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("코드 다시짜라~!")
        }
    });


}


function searchBook(){

    //enter key가 입력됐을때 사용자가 입력한 내용을 가지고
    //서버 프로그램 Ajax방식으로 호출

    if(event.keyCode ==13){
        //ajax 호출

        $("li").remove();

        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/book/bookList",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{
                keyword : $("#keyword").val()
            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){
                alert("정상처리되었습닏.");
                alert(result[0].title);

                for(var i=0;i<result.length;i++) {

                    var tr = $("<li></li>").attr("data-isbn", result[i].isbn);
                    var img = $("<div id='bookimg' ><img id='getimg' src='" + result[i].img + "' height='200px'/></div>");
                    var titleTd = $("<p id='title' align='center'></p>").text(result[i].title);
                    var authorTd = $("<p id='author'></p>").text(result[i].author);
                    var priceTd = $("<p id='price'></p>").text(result[i].price);


                    var updatebtn = $("<button id='update'>수정</button>");
                    var detailbtn = $("<button id='detail' >상세정보</button>");

                    var ptag = $("<p id='buttontag'></p>");


                    ptag.append(updatebtn);
                    ptag.append(detailbtn);


                    var button = $("<button id='remove' >삭제</button><br>");
                    var comment = $("<button id='comment' >서평쓰기</button>");
                    var review = $("<button id='review' >서평보기</button>");


                    ptag.append(button);
                    ptag.append(comment);
                    ptag.append(review);

                    updatebtn.on("click",function(){

                        var price = $(this).parent().parent().find("#price").text();
                        var title = $(this).parent().parent().find("#title").text();
                        var author = $(this).parent().parent().find("#author").text();

                        var titlebox =$("<input id='ti'/>").attr("type","text").val(title);
                        var authorbox =$("<input id='au'/>").attr("type","text").val(author);
                        var updatebox = $("<input id='pr'/>").attr("type","text").val(price);

                        var updatecomplete = $("<button id='updatecom'>완료</button>");


                        $(this).parent().parent().find("#title").text("")
                        $(this).parent().parent().find("#title").append(titlebox);
                        $(this).parent().parent().find("#author").text("")
                        $(this).parent().parent().find("#author").append(authorbox);
                        $(this).parent().parent().find("#price").text("")
                        $(this).parent().parent().find("#price").append(updatebox);
                        $(this).parent().parent().find("#update").after(updatecomplete);
                        $(this).parent().parent().find("#update").attr("disabled","disabled");


                    });//updatebtn onclick end

                    tr.append(img);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(ptag);

                    $("#list").append(tr);

                }
            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("코드 다시짜라~!")
            }
        });
    }
}


//update 완료하는 곳
$(document).on('click', '#updatecom', function() {

    var isbn = $(this).parent().parent().attr("data-isbn");
    alert(isbn);

    var li = $(this).parent().parent();

    var title = $(this).parent().parent().find("#ti").val();
    var author = $(this).parent().parent().find("#au").val();
    var price = $(this).parent().parent().find("#pr").val();


    var tr = $(this).parent().parent();

    $.ajax({
        url : "http://localhost:7070/book/bookUpdate",
        type:"GET",
        dataType : "jsonp",
        data : {
            isbn : isbn,
            title : title,
            author : author,
            price : price
        },
        success : function(){
            alert("정상적으로 수정되었습니다..");

            li.children("p").not("#buttontag").empty();
            $("#updatecom").remove();

            li.find("#title").text("")
            li.find("#title").append(title);
            li.find("#author").text("")
            li.find("#author").append(author);
            li.find("#price").text("")
            li.find("#price").append(price);
            li.find("#update").attr("disabled",false);


        },
        error : function(){
            alert("update 에러 발생 ㅠㅠㅠ");
        }
    });
});



//서평 들어가는곳
$(document).on('click', '#comment', function() {

    localStorage.isbn = $(this).parent().parent().attr("data-isbn");
    localStorage.title = $(this).parent().parent().find("#title").text();
    localStorage.author = $(this).parent().parent().find("#author").text();
    localStorage.img = $(this).parent().parent().find("#getimg").attr("src");

    $(location).attr("href","commentForm.html");

});


$(document).on('click', '#review', function() {

    localStorage.reviewisbn = $(this).parent().parent().attr("data-isbn");
    $(location).attr("href","commentList.html");

});




//서평 쓰러가기전에 local에 저장하고 서평 폼으로 넘어가기 ///////////////////////////////////////////////////////
$(document).on('click', '#com', function() {

    localStorage.isbn = $(this).parent().parent().attr("data-isbn");
    localStorage.title = $(this).parent().parent().find("#title").text();
    localStorage.author = $(this).parent().parent().find("#author").text();

    $(location).attr("href","commentForm.html");

});





//자바 스크립트 내에서 삭제되게 하기!!
$(document).on('click', '#remove', function() {


    $(this).parent().parent().remove();
    alert($(this).parent().parent().attr("data-isbn"));

        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/book/bookDelete",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{
                isbn : $(this).parent().parent().attr("data-isbn")
            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                alert("책 정보가 삭제되었습니다.");
            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("코드 다시짜라~!")
            }
        });
});



// 이미지 올리면 미리보기 코드
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


//정렬하기
function mySort() {
    var data = $("tbody>tr").get();
    data.sort(function (first, second) {
        return $(first).children("td").eq(3).text() > $(second).children("td").eq(3).text() ? 1 : -1;
    });

    $.each(data, function (idx, row) {
        $("tbody").append(row);
    });

}





//
//상세보기
$(document).on('click', '#detail', function() {

    var isbn = $(this).parent().parent().attr("data-isbn");
    alert(isbn);

    $(".detail").remove();

    var xx =  $(this).parent().parent();
    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/bookDetail",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",

        data:{
            keyword : isbn
        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){



            var detag = $("<p class='detail'></p>");

            detag.append("날짜 : "+result[0].date+"<br>");
            detag.append("페이지수 : "+result[0].page+"<br>");
            detag.append("번역 : "+result[0].translator+"<br>");
            detag.append("추가 : "+result[0].supplement+"<br>");
            detag.append("출판사 : "+result[0].publisher);

            xx.find("#price").append(detag);

        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){

            alert("코드 다시짜라~!")

        }
    });

});


//세션을 확인해서 로그인, 로그아웃으로 바꿈
$(function(){

    var xx ="f";

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

            if(result==true){

                $(".inout").text("로그아웃");
                $(".inout").attr("href","").attr("id","out");
            }
            else{

                $(".inout").text("로그인");
            }

        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("서버에 문제가있습니다.~");
        }
    });

});





