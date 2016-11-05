	//입력상자에 어떤 key든 입력이 되면 무조건 호출
	function searchBook(){
		
		//enter key가 입력됐을때 사용자가 입력한 내용을 가지고
		//서버 프로그램 Ajax방식으로 호출
		
		if(event.keyCode ==13){
			//ajax 호출

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
					alert("들어왔음");
					for(var i=0;i<result.length;i++) {

						var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);
						var img = $("<td><img src='" + result[i].img + "'/></td>");
						var titleTd = $("<td></td>").text(result[i].title);
						var authorTd = $("<td></td>").text(result[i].author);
						var priceTd = $("<td></td>").text(result[i].price);
						var button = $("<td><button id='remove' >삭제</button></td>");

						var updatebtn =$("<input/>").attr("type","button").attr("value","수정");


						updatebtn.on("click",function(){

							var price = $(this).parent().parent().find("td:nth-child(4)").text();
							var updatebox = $("<input/>").attr("type","text").val(price);

							updatebox.on("keyup",function(){

								if(event.keyCode==13){

									var isbn = $(this).parent().parent().attr("data-isbn");
									var price = $(this).val();
									var tr = $(this).parent().parent();

									$.ajax({
										url : "http://localhost:7070/book/bookUpdate",
										type:"GET",
										dataType : "jsonp",
										data : {
											isbn : isbn,
											price : price
										},

										success : function(){

											alert("정상적으로 처리되었습니다.");
											tr.find("td:nth-child(4)").empty();
											tr.find("td:nth-child(4)").text(price);

										},

										error : function(){
											alert("update 에러 발생 ㅠㅠㅠ");
										}

									});

								}

							});//updatebox onclick end

							$(this).parent().parent().find("td:nth-child(4)").text("")
							$(this).parent().parent().find("td:nth-child(4)").append(updatebox);
							$(this).parent().parent().find("[type=button]").attr("disabled","disabled");


						});//updatebtn onclick end




						var updatebtntd = $("<td></td>").append(updatebtn);

						tr.append(img);
						tr.append(titleTd);
						tr.append(authorTd);
						tr.append(priceTd);
						tr.append(button);
						tr.append(updatebtntd);
						$("tbody").append(tr);

					}
				},
				//서버쪽 프로그램을 실행시키는 과정이 실패하면!!
				error : function(){
					alert("코드 다시짜라~!")
				}
			});
		}
	}


		$(document).on('click', '#remove', function() {
				$(this).parent().parent().remove();
		});

	
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


