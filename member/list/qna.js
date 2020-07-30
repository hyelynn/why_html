//!< 현재 사용자가 등록한 QNA 요청
$(document).ready(function () {
    var xhr = new XMLHttpRequest();
    var id = sessionStorage.getItem("id");
  
    if (id != null) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 || xhr.status === 201) {
            var result = JSON.parse(xhr.responseText);
            for (var i = 0; i < result.length; i++) {
              var review = "<div class='accordion host-accordion text-gray mb-lg-5 mb-3' id='qnaItem1'>"
              "<div class='card'><div class='card-header d-flex justify-content-between align-items-center' id='itemHeading1'>"
              "<div class='mr-lg-5 mr-3'><p class='my-2'>"+ result[i].qna_msg + +"</p>"+
              "<span class='state-text bottom'>"+result[i].obj_name+"<span class='ml-md-4 d-md-inline-block d-block'>"+result[i].qna_date+"</span></span></div>" +
              "<button class='btn accordion-btn' type='button' data-toggle='collapse' data-target='#itemCollapse1' aria-expanded='true' aria-controls='itemCollapse1'>"+
              "<i class='fas fa-angle-double-down'></i></button></div>"

              if (result[i].qna_answer != '') {
                  review += "<div id='itemCollapse1' class='collapse show' aria-labelledby='itemHeading1' data-parent='#qnaItem1'>"+
                          "<div class='card-body'><span class='state-text'>답변</span><p class='my-2 answer'>" + result[i].qna_answer +
                          "</p><span class='state-text bottom'>"+ result[i].qna_answer_date + "</span></div></div>"
              }

              $("#lists").append($(
                review + "</div></div>"
              ))
            }
          }
        }
      };
  
      xhr.open("POST", "http://3.34.150.116:3000/studio/qna/user");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + id);
    } else {
      alert("로그인이 필요합니다");
    }
});

