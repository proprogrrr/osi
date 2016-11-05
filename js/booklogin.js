/**
 * Created by CJuser on 2016-11-03.
 */


//회원가입 버튼 누르면

$(document).on('click', '#join', function() {

    //	비밀번호 유효성 체크
    var pwd = $("#pass").val();
    var pwd1 = $("#pass1").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var overlapcheck = $("#overlap").text();

        if( pwd != pwd1 ) {	//	비밀번호 와 비밀번호 확인이 다르다면 ...
            alert("비밀번호가 잘못 되었습니다. 다시 입력하세요");
        }
        else if(name==""){
            alert("이름을 입력하세요");
        }

        else if(email==""){
            alert("이메일을 입력하세요")
        }
        else if(pwd==""){
            alert("비밀번호를 입력하세요")
        }
        else if(pwd1==""){
            alert("비밀번호를 입력하세요")
        }
        else if(overlapcheck!="중복확인이 완료되었습니다."){

            alert("아이디 중복확인을 하세요!");

        }
        else{
                $.ajax({
                    // url : 서버 프로그램에 대한 url
                    url:"http://localhost:7070/book/bookJoin",
                    // type: 전송방식
                    type: "GET",
                    // 만약 서버쪽에서 보내주는 데이터가 JSON이면

                    dataType : "jsonp",
                    //클라이언트가 서버쪽에 보내주는 데이터
                    jsonp : "callback",

                    data:{

                        email : $("#email").val(),
                        pass : $("#pass").val(),
                        name : $("#name").val()

                    },

                    //서버쪽 프로그램을 실행시키는 과정이 성공하면
                    success : function(result){

                        alert("회원가입이 완료되었습니다.");
                    },
                    //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
                    error : function(){
                    alert("회원가입 실패!!")
            }
        });
    }
});





/**
 * Created by CJuser on 2016-11-03.
 */

//중복확인 하기!!
$(document).on('click', '.overlap', function() {

    var email = $("#email").val();

        $.ajax({

            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/book/loginCheck",
            // type: 전송방식

            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터

            jsonp : "callback",

            data:{

                email : $("#email").val()

            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                if(result!=""){
                    alert(result);
                    alert("해당 이메일이 존재합니다.");
                    $("#overlap").text("");
                    $("#overlap").css("color","blue");
                    $("#overlap").text("해당 이메일이 존재합니다.");
                }
                else{
                    alert(result);
                    alert("중복확인이 완료되었습니다.");
                    $("#overlap").text("");
                    $("#overlap").css("color","blue");
                    $("#overlap").text("중복확인이 완료되었습니다.");
                    $(location).attr('href',"#");
                }



            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("회원가입 실패!!")
            }
        });

});


//로그인 하기
$(document).on('click', '#login', function() {


    var email = $("#email").val();
    var pass = $("#pass").val();

    $.ajax({

        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/book/bookLogin",
        // type: 전송방식

        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터

        jsonp : "callback",

        data:{


            email : $("#email").val(),
            pass : $("#pass").val()

        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){

            if(result==true){
                alert("로그인 성공");

                $(location).attr('href', "index.html");

            }
            else{
                alert("로그인 실패")
            }


        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("서버에 문제가있습니다.~");
        }
    });

});









