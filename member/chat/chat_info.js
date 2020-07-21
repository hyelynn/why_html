var value = location.href.slice(location.href.indexOf("?") + 1, location.href.length).split("&");

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
                if (i == 0) {
                    $("#title").append(
                        $("<span class='text-gray font-size-s'>"+result[i].user_nickname+"</span>")
                    );
        
                    $("#time").append(
                        $("<span class='d-inline-block rounded-xl px-3 py-1 bg-light chat-date'> " + moment(result[i].chat_date).format('YYYY-MM-DD') + " </span>")
                    );
                }

                var text = "";
                var img = "";
                if (result[i].chat_img != null && result[i].chat_img != undefined && result[i].chat_img != '') {
                    console.log(result[i].chat_img);
                    img = "<img src='"+result[i].chat_img+"' class='align-self-center w-100 h-100' alt=''></div>"
                }

                if (result[i].from_key != id) {
                    text = "<div class='d-flex justify-content-start mb-3'><div class='mr-auto font-weight-light user-msg'>"+
                    "<div class='d-flex mb-2 align-items-center'><div class='d-flex justify-content-center rounded-circle overflow-hidden mr-2 user-bg sm'> "+
                    img + "<p class='mb-0'>"+result[i].user_nickname+"</p></div>"+
                    "<div class='bg-light rounded-xl p-md-3 px-3 py-2 mb-2 chat-msg'><p class='mb-0'> "+result[i].chat_msg+" </p></div>"+
                    "<p class='text-right text-light-gray font-size-xs'> "+moment(result[i].chat_date).format('MM-DD HH:mm') +" </p></div></div>"
                } else {
                    text = "<div class='d-flex justify-content-end mb-3'><div class='ml-auto font-weight-light user-msg'>"+
                    "<div class='bg-sky rounded-xl p-md-3 px-3 py-2 mb-2 text-white chat-msg'>"+
                    "<p class='mb-0'> "+result[i].chat_msg+" </p></div><p class='text-light-gray font-size-xs'> "+moment(result[i].chat_date).format('MM-DD HH:mm') +" </p></div></div>"
                }
                $("#chat_list").append($(text));
            }
          }
        }
      };
  
      xhr.open("POST", "http://3.34.150.116:3000/chat/data");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("user_id=" + id + "&host_id=" + value);
    } else {
      alert("로그인이 필요합니다");
    }
  });
  


function send_chat() {
    var xhr = new XMLHttpRequest();
    var id = sessionStorage.getItem("id");
    var send_img = "";
    var send_msg = $("#msg").val();
    $("#msg").value = '';

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          var msg = "<div class='d-flex justify-content-end mb-3'>" +
                      "<div class='ml-auto font-weight-light user-msg'>" +
                      "<div class='bg-sky rounded-xl p-md-3 p-2 mb-2 text-white chat-msg'>" +
                      img +
                      "<p class='mb-0'>+" +
                      send_msg +
                      "+</p></div>" +
                      "<p class='text-light-gray font-size-xs'> 방금 전 </p></div></div>";

          $("#msgs").append($(msg));
        }
      }
    };

    xhr.open("POST", "http://3.34.150.116:3000/chat/send");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "user_id=" +
        id +
        "&host_id=" +
        value +
        "&chat_img=" +
        send_img +
        "&chat_msg=" +
        send_msg
    );
  }