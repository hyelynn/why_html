$(document).ready(function () {
  //Get Room information
  var xhr = new XMLHttpRequest();
  var id = sessionStorage.getItem("id");

  if (id != null) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          var result = JSON.parse(xhr.responseText);
          console.log(result.length);
          for (var i = 0; i < result.length; i++) {
            $("#chat_list").append(
              $(
                "<div class='d-flex align-items-start p-md-3 px-0 py-2 chat-item'>"+
                "<div class='d-flex justify-content-center rounded-circle overflow-hidden mr-md-4 mr-3 user-bg'>"+
                "<img src='/img/studio-host.jpg' class='align-self-center w-100 h-100' alt=''></div>"+
                "<div class='font-weight-light'><p class='mb-1'>" +result[i].user_nickname +"</p>"+
                "<p class='mb-1 text-light-gray font-size-xs'>" + result[i].chat_msg +"</p>"+
                "<p class='mb-0 text-light-gray font-size-xs'>"+ moment(result[i].chat_date).format('YYYY-MM-DD') +"</p></div>"+
                "<a href='/member/chat_user_view.html?"+result[i].dest_key+"' class='stretched-link text-decoration-none'></a></div>"
              )
            );
          }

          if (result.length == undefined || result.length == 'undefined') {
            alert('현재 진행중인 채팅이 없습니다');
          }
        }
      }
    };

    xhr.open("POST", "http://3.34.150.116:3000/chat");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("user_id=" + id);
  } else {
    alert("로그인이 필요합니다");
  }
});

