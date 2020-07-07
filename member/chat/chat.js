var current_host = "asdf";

function clicked_chat() {
    var xhr = new XMLHttpRequest();
    var id = sessionStorage.getItem('id');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
              var result = JSON.parse(xhr.responseText);
              for (var i = 0; i < result.length; i++) {
                
                //chat_img user_email chat_msg chat_date
                var img = result[i].chat_img.length > 10 ? "<img src='"+result[i].chat_img+"' alt='' class='w-100 mb-2'>"
                : "<div class='d-flex align-items-start p-3 position-relative chat-item'>";
                var msg = "";
                if (result[i].user_email == id) {
                  msg = "<div class='d-flex justify-content-end mb-3'>" +
                  "<div class='ml-auto font-weight-light user-msg'>" +
                  "<div class='bg-sky rounded-xl p-md-3 p-2 mb-2 text-white chat-msg'>" + img +
                  "<p class='mb-0'>+"+result[i].chat_msg+"+</p></div>" +
                  "<p class='text-light-gray font-size-xs'>"+result[i].chat_date+"</p></div></div>"
                } else {
                  msg = "<div class='d-flex justify-content-start mb-3'>" +
                  "<div class='mr-auto font-weight-light user-msg'>" +
                  "<div class='d-flex mb-2'>" +
                  "<div class='d-flex justify-content-center rounded-circle overflow-hidden mr-2 user-bg sm'>" +
                  "<img src='/why_html/img/studio-host.jpg' class='align-self-center w-100 h-100' alt=''></div>" + 
                  "<p class='mb-0'>" +
                  result[i].user_email +
                  "</p></div>" +
                  "<div class='bg-light rounded-xl p-md-3 p-2 mb-2 chat-msg'>" + img +
                  "<p class='mb-0'>" +
                  result[i].chat_msg + "</p></div>" +
                  "<p class='text-right text-light-gray font-size-xs'>" + +result[i].chat_date +"</p></div></div>";
                }

                $("#msgs").append($( msg ));
              }
            }
        } else {
          alert('연결이 불안정합니다');
        } 
    }

    xhr.open("POST", "http://3.34.150.116:3000/chat/data");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("user_id=" + id + "&host_id=" + current_host);
}

$(document).ready(function () {
    //Get Room information
    var xhr = new XMLHttpRequest();
    var id = sessionStorage.getItem('id');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
              var result = JSON.parse(xhr.responseText);
              for (var i = 0; i < result.length; i++) {
                var prefix = i == 0 ? "<div class='d-flex align-items-start p-3 position-relative chat-item active'>" 
                : "<div class='d-flex align-items-start p-3 position-relative chat-item'>";

                $("#chat_list").append($(
                    prefix+"<div class='d-lg-flex d-none justify-content-center rounded-circle overflow-hidden mr-lg-4 mr-2 user-bg'>"+
                    "<img src='/why_html/img/studio-host.jpg' class='align-self-center w-100 h-100' alt=''></div>"+
                    "<div class='font-weight-light'>"+
                    "<p class='mb-1'>"+result[i].user_nickname+"</p>"+
                    "<p class='mb-1 d-md-block d-none text-light-gray font-size-xs'>"+result[i].chat_msg+"</p>"+
                    "<p class='mb-0 text-light-gray font-size-xs'>-</p></div>"+
                    "<a href='#x' class='stretched-link text-decoration-none'></a></div>"
                ));
              }
            }
        } else {
          alert('연결이 불안정합니다');
        }
    }

    xhr.open("POST", "http://3.34.150.116:3000/chat");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("user_id=" + id);
});

function send_chat() {
  var xhr = new XMLHttpRequest();
  var id = sessionStorage.getItem('id');
  var send_img = "";
  var send_msg = $("#msg").val();

  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 || xhr.status === 201) {
            var result = JSON.parse(xhr.responseText);
            for (var i = 0; i < result.length; i++) {
              
              //chat_img user_email chat_msg chat_date
              var img = result[i].chat_img.length > 10 ? "<img src='"+result[i].chat_img+"' alt='' class='w-100 mb-2'>"
              : "<div class='d-flex align-items-start p-3 position-relative chat-item'>";
              var msg = "";
              if (result[i].user_email == id) {
                msg = "<div class='d-flex justify-content-end mb-3'>" +
                "<div class='ml-auto font-weight-light user-msg'>" +
                "<div class='bg-sky rounded-xl p-md-3 p-2 mb-2 text-white chat-msg'>" + img +
                "<p class='mb-0'>+"+result[i].chat_msg+"+</p></div>" +
                "<p class='text-light-gray font-size-xs'>"+result[i].chat_date+"</p></div></div>"
              }

              $("#msgs").append($( msg ));
            }
          }
      } else {
        alert('연결이 불안정합니다');
      } 
  }

  xhr.open("POST", "http://3.34.150.116:3000/chat/send");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("user_id=" + id + "&host_id=" + current_host +"&chat_img="+send_img+"&chat_msg="+send_msg);
}