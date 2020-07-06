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
                    "<p class='mb-1'>"+result[0].user_nickname+"</p>"+
                    "<p class='mb-1 d-md-block d-none text-light-gray font-size-xs'>"+result[0].chat_msg+"</p>"+
                    "<p class='mb-0 text-light-gray font-size-xs'>-</p></div>"+
                    "<a href='#x' class='stretched-link text-decoration-none'></a></div>"
                ));
              }
            }
        }
    }

    xhr.open("POST", "http://3.34.150.116:3000/chat");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("user_id=" + id);
});
  

function clicked_chat() {

}