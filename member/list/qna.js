
$(document).ready(function () {
    var xhr = new XMLHttpRequest();
    var id = sessionStorage.getItem("id");
  
    if (id != null) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 || xhr.status === 201) {
            var result = JSON.parse(xhr.responseText);
            for (var i = 0; i < result.length; i++) {
                $("#reserv_item").append($(
                    "<li class='list-group-item p-3 mb-3 border'><div class='row align-items-center'><div class='col'><div class='d-flex align-items-lg-center'>"+
                    "<div class='d-flex justify-content-center align-items-center overflow-hidden mr-4 item-thumbs'><img src='"+result[i].reserv_img+"' alt=''></div>"+
                    "<div class='item-texts font-weight-light'><span class='text-red'>예약번호 : "+ result[i].reserv_id +"</span>" +
                    "<a href='/sub/class_view.html' class='text-decoration-none'><h4 class='text-gray'>"+result[i].reserv_name+"</h4></a>"+
                    "<ul class='list-unstyled text-light-gray mb-2'><li>예약호실 : "+result[i].reserv_place+"</li><li>예약자명 : "+result[i].reserv_pers+"</li><li>예약일시 : "+result[i].reserv_time+"</li></ul>"+
                    "<a href='chat_user_view.html?"+result[i].reserv_host+"' class='d-inline-block text-decoration-none text-sky mr-2'>1:1 대화하기</a>"+
                    "<a type='button' data-toggle='modal' data-target='#notifyModal' class='d-inline-block text-decoration-none text-sky'>전화하기</a></div></div></div></div></li>"    
                ))
            }

            $("#notifytext").append($("<p class='text-gray wordbreak-keep-all'>" + result[0].reserv_num + "</p>"));
          }
        }
      };
  
      xhr.open("POST", "http://3.34.150.116:3000/reserv/user");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("key=" + id);
    } else {
      alert("로그인이 필요합니다");
    }


});