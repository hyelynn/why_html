$(document).ready(function () {
  //Get Room information
  var xhr = new XMLHttpRequest();
  var id = sessionStorage.getItem("id");

  if (id != null) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          var result = JSON.parse(xhr.responseText);
          for (var i = 0; i < result.length; i++) {
            $("#chat_list").append(
              $(
                "<div class='d-flex align-items-start p-md-3 px-0 py-2 chat-item'>"+
                "<div class='d-flex justify-content-center rounded-circle overflow-hidden mr-md-4 mr-3 user-bg'>"+
                "<img src='/img/studio-host.jpg' class='align-self-center w-100 h-100' alt=''></div>"+
                "<div class='font-weight-light'><p class='mb-1'>" +result[i].user_nickname +"</p>"+
                "<p class='mb-1 text-light-gray font-size-xs'>" + result[i].chat_msg +"</p>"+
                "<p class='mb-0 text-light-gray font-size-xs'>"+ result[i].chat_date +"</p></div>"+
                "<a href='/member/chat_user_view.html?"+result[i].dest_key+"' class='stretched-link text-decoration-none'></a></div>"
              )
            );
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

function send_chat() {
  var xhr = new XMLHttpRequest();
  var id = sessionStorage.getItem("id");
  var send_img = "";
  var send_msg = $("#msg").val();

  if (window.event.keyCode == 13 && current_host != '') {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          var result = JSON.parse(xhr.responseText);
          for (var i = 0; i < result.length; i++) {
            //chat_img user_email chat_msg chat_date
            var img =
              result[i].chat_img.length > 10
                ? "<img src='" +
                  result[i].chat_img +
                  "' alt='' class='w-100 mb-2'>"
                : "<div class='d-flex align-items-start p-3 position-relative chat-item'>";
            var msg = "";
            if (result[i].user_email == id) {
              msg =
                "<div class='d-flex justify-content-end mb-3'>" +
                "<div class='ml-auto font-weight-light user-msg'>" +
                "<div class='bg-sky rounded-xl p-md-3 p-2 mb-2 text-white chat-msg'>" +
                img +
                "<p class='mb-0'>+" +
                result[i].chat_msg +
                "+</p></div>" +
                "<p class='text-light-gray font-size-xs'>" +
                result[i].chat_date +
                "</p></div></div>";
            }

            $("#msgs").append($(msg));
          }
        }
      }
    };
    xhr.open("POST", "http://3.34.150.116:3000/chat/send");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "user_id=" +
        id +
        "&host_id=" +
        current_host +
        "&chat_img=" +
        send_img +
        "&chat_msg=" +
        send_msg
    );
  }

  
}
