var url = location.href;
var value = url.slice(url.indexOf("?") + 1, url.length).split("&");
var price = 0;
var max = 0;
var people_price = 0;
var title = "";
var curr_price = 0;
var host = "";
var like = 0;
var img_link = "";

//!< 현재 페이지 속성에 따라 정보를 다르게 그려주는 함수
//!< curr는 studio, class, audition, perform, store의 다섯종류가 있음
function initialize(curr) {
  var valnum = Number(value);

  var regexp = /^[0-9]*$/;
  if (!regexp.test(valnum)) {
    alert("접속 오류");
    location.href = curr + ".html"; //잘못된 접속 시 페이지 강제 이동
  }
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 201) {
        var result = JSON.parse(xhr.responseText);
        if (curr == "studio" || curr == "class") {
          for (var i = 0; i < result.length; i++) {
            var indi = "",
              img = "";

              //!< 현재가, 인원당 가격을 저장
            price = parseInt(result[0].obj_price);
            curr_price = price;
            max = parseInt(result[0].obj_max);
            people_price = parseInt(result[0].obj_people_price);
            title = result[0].obj_name;
            host = result[0].user_key;
            
            //!< 캐로샐에 이미지 추가
            if (i == 0) {
              indi =
                "<li data-target='#carouselStudioView' data-slide-to='" +
                i +
                "' class='active'></li>";
              img =
                "<div class='carousel-item active'><img src='" +
                result[i]._images +
                "' class='d-block w-100' alt='...'></div>";
                img_link = result[0]._images;
            } else {
              indi =
                "<li data-target='#carouselStudioView' data-slide-to='" +
                i +
                "'></li>";
              img =
                "<div class='carousel-item'><img src='" +
                result[i]._images +
                "' class='d-block w-100' alt='...'></div>";
            }

            $("#indicator").append($(indi));
            $("#carousel").append($(img));
          }

          //!< 메인 타이틀 부분 설정
          $("#title").append(
            $(
              "<h2 class='my-4'>" +
                result[0].obj_name +
                "</h2>" +
                "<p class='font-weight-light mb-4 text-light-gray font-size-s'>" +
                result[0].obj_subname +
                "</p>"
            )
          );

          //!< 정보 데이터
          var info = "";
          var splitInfo = result[0].obj_info.split("/");

          for (var s in splitInfo) {
            info += splitInfo[s] + "<br>";
          }

          //!< 편의시설 정보는 스튜디오만 있음
          var suf = "";
          if (curr == "studio") {
            suf =
              "<div class='my-5'>" +
              "<h4 class='mb-4 text-bullet'>편의시설</h4>" +
              "<div class='d-flex-fill font-weight-light font-size-s'>" +
              "<span class='mr-2'>" +
              result[0].obj_useful +
              "</span></div>" +
              "</div>";
          }

          $("#info").append(
            $(
              "<div class='my-5'>" +
                "<h4 class='mb-4 text-bullet'>소개</h4>" +
                "<p class='font-weight-light font-size-s'>" +
                info +
                "</p></div>" +
                suf
            )
          );

          //!< STUDIO
          if (curr == "studio") {
            $("#terms").append(
              $(
                "<div class='my-5'><h4 class='mb-4 text-bullet'>이용약관</h4>" +
                  "<p class='font-weight-light font-size-s'>" +
                  result[0].obj_rule +
                  "</p></div>"
              )
            );

            $("#contact").append(
              $(
                "<div class='my-5'><h4 class='mb-4 text-bullet'>주소</h4>" +
                  "<div class='mb-2'><iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.2200823320336!2d126.94783625121208!3d37.47913253678695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe9d42c354ca061aa!2z7IK87J2867mM65Sp!5e0!3m2!1sko!2skr!4v1589899812488!5m2!1sko!2skr' width='100%' height='210' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe></div>" +
                  "<p class='font-weight-light font-size-s'>" +
                  result[0].obj_location +
                  "</p></div>" +
                  "<div class='my-5'><h4 class='mb-4 text-bullet'>대중교통</h4><p class='font-weight-light font-size-s'>" +
                  result[0].obj_subway +
                  "<br>" +
                  result[0].obj_bus +
                  "</p></div>" +
                  "<div class='my-5 border bg-white d-flex p-4'><div class='d-flex justify-content-center rounded-circle overflow-hidden mr-lg-5 mr-3 card-host'>" +
                  "<img src='/img/studio-host.jpg' class='align-self-center' alt=''></div>" +
                  "<div><h4 class='font-size-m'>" +
                  result[0].biz_title +
                  "</h4>" +
                  "<p class='text-light-gray font-size-xs'>" +
                  result[0].biz_introduce +
                  "</p>" +
                  "<button type='button' class='btn rounded-pill px-lg-5 px-3 py-2 border-yellow font-size-xs mr-2'  data-target='#notifyModal'>전화하기</button>" +
                  "<button type='button' class='btn rounded-pill px-lg-5 px-3 py-2 border-yellow font-size-xs' onclick='start_chat();'>메시지 전송</button></div></div>"
              )
            );

            $("#title_purchase").append(
              $(
                "<h6>" +
                  result[0].obj_name +
                  "</h6>" +
                  "<p class='font-weight-bold mb-4 text-red font-size-l'>" +
                  result[0].obj_rp +
                  "원/1" +
                  result[0].obj_price_type +
                  "</p>"
              )
            );
            //!< CLASS
          } else if (curr == "class") {
            var rule = "";
            var rules = result[0].obj_rule.split("/");

            for (var s in rules) {
              rule += rules[s] + "<br>";
            }

            $("#terms").append(
              $(
                "<div class='my-5'><h4 class='mb-4 text-bullet'>이용약관</h4>" +
                  "<p class='font-weight-light font-size-s'>" +
                  rule +
                  "</p></div>"
              )
            );

            var g = "";
            var gs = result[0].obj_howabout.split("/");
            for (var s in gs) {
              g += gs[s] + "<br>";
            }

            $("#guide").append(
              $(
                "<div class='my-5'><h4 class='mb-4 text-bullet'>레슨 안내</h4>" +
                  "<p class='font-weight-light font-size-s'>" +
                  g +
                  "</p></div>"
              )
            );

            $("#title_purchase").append(
              $(
                "<h6>" +
                  result[0].obj_name +
                  "</h6>" +
                  "<p class='font-weight-bold mb-4 text-red font-size-l'>" +
                  result[0].obj_rp +
                  "원/1" +
                  result[0].obj_price_type +
                  "</p>"
              )
            );
          } 

          $("#reviewModal").append(
            $(
              "<div class='modal-dialog modal-xl custom-modal' role='document'><div class='modal-content px-lg-6 px-4 py-lg-5 py-5'><div class='modal-header p-0 mb-md-4 mb-2 border-0'>" +
                "<h2 class='modal-title' id='reviewModalLabel'><span class='modal-title-text position-relative'><span class='text-underline'>" +
                result[0].obj_name +
                "</span></span>의<br>여러분의 리뷰를 남겨주세요</h2></div>" +
                "<div class='modal-body p-0 custom-inputs text-center'><div class='text-left mb-md-3 mb-2 font-weight-light'>" +
                "<p class='font-size-s mb-2'>별점</p><span id='star-rating' class='star-rating'></span><span id='live-rating' class='live-rating align-middle ml-2'></span></div>" +
                "<div class='text-left font-weight-light'><p class='font-size-s mb-2'>리뷰 내용</p><div class='input-group mb-4'>" +
                "<textarea id='review_text' class='form-control medium-textarea' placeholder='작성된 후기는 전체 공개 됩니다.'></textarea></div></div>" +
                "<button type='button' onclick='sendReview();' class='btn bg-yellow w-lg-65 w-100 py-md-4 py-2 h-auto rounded-0 font-size-s' data-dismiss='modal'>리뷰 작성하기</button></div></div></div>"
            )
          );
  
          $("#notifytext").append(
            $(
              "<p class='text-gray wordbreak-keep-all'>" +
                result[0].biz_num +
                "</p>"
            )
          );
  
          console.log(result[0].obj_like);
          if (result[0].obj_like != "undefined") {
            like = parseInt(result[0].obj_like);
          }
  
          $("#like").append(
            "<button type='button' class='btn border rounded-xl bg-white btn-block py-2'onclick='addWishList(this);'><i class='far fa-heart'></i>" +
              "<id id ='studio_index' style='display: none;''>" +
              result[0].obj_key +
              "</id>" +
              "<span id='cnt' class='ml-1 font-size-xs'>" +
              like +
              "</span></button>"
          );
  
          $(".live-rating").text(3.5);
          $("#star-rating").starRating({
            initialRating: 3.5,
            disableAfterRate: false,
            strokeWidth: 0,
            useGradient: false,
            emptyColor: "#f1f1f1",
            activeColor: "#ffde3b",
            ratedColor: "#ffde3b",
            hoverColor: "#ffde3b",
  
            onHover: function (currentIndex, currentRating, $el) {
              $(".live-rating").text(currentIndex);
            },
            onLeave: function (currentIndex, currentRating, $el) {
              $(".live-rating").text(currentRating);
            },
          });
          //!< PERFORM
        } else if (curr == "perform") {
          var rule = "";
          
            var rules = result[0].obj_info.split("/");
            var title = title = rules[0];  

            for (var s in rules) {
              rule += rules[s] + "<br>";
            }

          $("#title").prepend(
            "<img src="+result[0].obj_thumbnail+" class='img-fluid' alt=''>"+
            "<h2 class='my-4'>"+result[0].obj_name+"</h2>"
          );
          
          $("#locdate").prepend(
            "<p class='font-weight-light mb-0 py-3 text-red font-size-s'>"+result[0].obj_useful+"<span class='d-inline-block' style='width: 30px'></span>"+result[0].obj_location+"</p>"
          );
          
          for (var i = 0; i < result.length; i++) {
            $("#info").append("<img src="+result[i]._images+" class='img-fluid' alt=''>")
          }          
          $("#info").append("<br><p class='font-weight-light font-size-s'>"+ rule + "</p>")
                     
        } else if (curr == "audition") {
          var info = "";
          var splitInfo = result[0].obj_info.split("/");
          var rule = "";
          var rules = result[0].obj_rule.split("/");

          for (var s in splitInfo) {
            info += splitInfo[s] + "<br>";
          }

          for (var s in rules) {
            rule += rules[s] + "<br>";
          }
          $("#title").prepend(
            "<img src="+result[0].obj_thumbnail+" class='img-fluid' alt=''>"+
            "<h2 class='my-4'>"+result[0].obj_name+"</h2>"
          );
          
          $("#info").append($("<p class='font-weight-light font-size-s'>"+info+"</p>"));
          $("#rule").append($("<p class='font-weight-light font-size-s'>"+rule+"</p>"));
        }

        price_maker();
        load_review();
        load_qna();
      } else {
        alert("접속 오류");
        location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
      }
    } else {
    }
  };

  xhr.open("POST", "http://3.34.150.116:3000/object/info");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("key=" + value);
}

//!< 채팅 시작을 위한 함수
function start_chat() {
  let id = sessionStorage.getItem("id");
  if (id == null) {
    alert("로그인이 필요합니다");
    location.reload();
  } else {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          location.href = "/member/chat_user_view.html?" + host;
        }
      }
    };

    //!< 현재 사용자 아이디와 해당 오브젝트의 호스트 값을 이용하여 채팅 시작 요청을 보냄
    xhr.open("POST", "http://3.34.150.116:3000/chat/start");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log("from=" + id + "&dest=" + host);
    xhr.send("from=" + id + "&dest=" + host);
  }
}

//!< 해당 오브젝트에 연결된 QNA 데이터 요청
function load_qna() {
  var valnum = Number(value);

  var regexp = /^[0-9]*$/;
  if (!regexp.test(valnum)) {
    alert("접속 오류");
    location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
  }
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 201) {
        var result = JSON.parse(xhr.responseText);
        for (var i = 0; i < result.length; i++) {
          var suffix = "";

          //!< 답변이 있는경우
          if (
            result[i].qna_answer != "undefined" &&
            result[i].qna_answer != null
          ) {
            suffix =
              "<li class='mb-3'><div class='d-flex'><div class='mr-lg-4 mr-2'><span class='d-inline-block rounded-circle user-bg'></span></div>" +
              "<div class='border-bottom pb-4 mb-4'>" +
              "<p class='text-sky font-size-m'>호스트의 답변</p>" +
              "<p class='font-weight-light font-size-s text-light-gray'>" +
              result[i].qna_answer +
              "</p>" +
              "<p class='text-light-gray-more font-size-xs'>" +
              moment(result[i].qna_answer_date).format("YYYY-MM-DD HH:mm") +
              "</p></div></div></li>";
          }

          $("#qnas").append(
            $(
              "<li class='mb-3'><div class='d-flex'><div class='mr-lg-4 mr-2'><span class='d-inline-block rounded-circle user-bg'></span></div>" +
                "<div class=''><p class='font-size-m'> " +
                result[i].user_nickname +
                " </p>" +
                "<p class='font-weight-light font-size-s text-light-gray'>" +
                result[i].qna_msg +
                "</p>" +
                "<p class='text-light-gray-more font-size-xs'>" +
                moment(result[i].qna_date).format("YYYY-MM-DD HH:mm") +
                "</p></div></div></li>" +
                suffix
            )
          );
        }
      } else {
        alert("접속 오류");
        location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
      }
    } else {
    }
  };

  xhr.open("POST", "http://3.34.150.116:3000/studio/qna/get");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("studio_key=" + value);
}

//!< 해당 오브젝트에 연결된 리뷰 데이터 요청
function load_review() {
  var valnum = Number(value);

  var regexp = /^[0-9]*$/;
  if (!regexp.test(valnum)) {
    alert("접속 오류");
    location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
  }
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 201) {
        var result = JSON.parse(xhr.responseText);
        var totalscore = 0.0;
        for (var i = 0; i < result.length; i++) {
          totalscore += parseFloat(result[i].review_score);
          var suffix = "";

          //!< 답변이 있는경우
          if (
            result[i].review_answer != "undefined" &&
            result[i].review_answer != null
          ) {
            suffix =
              "<li class='mb-3'><div class='d-flex'><div class='mr-lg-4 mr-2'><span class='d-inline-block rounded-circle user-bg'></span></div>" +
              "<div class='border-bottom pb-4 mb-4'>" +
              "<p class='text-sky font-size-m'>호스트의 답변</p>" +
              "<p class='font-weight-light font-size-s text-light-gray'>" +
              result[i].review_answer +
              "</p>" +
              "<p class='text-light-gray-more font-size-xs'>" +
              moment(result[i].review_answer_date).format("YYYY-MM-DD HH:mm") +
              "</p></div></div></li>";
          }

          $("#reviews").append(
            $(
              "<li class='mb-3'><div class='d-flex'><div class='mr-lg-4 mr-2'><span class='d-inline-block rounded-circle user-bg'></span></div>" +
                "<div class=''><p class='font-size-m'> " +
                result[i].user_nickname +
                "<span class='float-right font-weight-light font-size-s text-light-gray'>★" +
                result[i].review_score +
                "/5</span> </p>" +
                "<p class='font-weight-light font-size-s text-light-gray'>" +
                result[i].review_msg +
                "</p>" +
                "<p class='text-light-gray-more font-size-xs'>" +
                moment(result[i].review_date).format("YYYY-MM-DD HH:mm") +
                "</p></div></div></li>" +
                suffix
            )
          );
        }

        $("#review_info").prepend(
          $(
            "<h4 class='mb-md-4 mb-2 text-bullet'>이용후기 <span class='text-sky font-weight-light ml-3 mr-2'> " +
              result.length +
              "개 </span> 평균 <span class='text-sky font-weight-light'>★" +
              totalscore / result.length +
              "/5</span></h4>"
          )
        );
      } else {
        alert("접속 오류");
        location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
      }
    } else {
    }
  };

  xhr.open("POST", "http://3.34.150.116:3000/studio/review/get");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("studio_key=" + value);
}

//!< 스튜디오에서 시간 값이 있는 경우 
function time_picker() {
  for (var i = 0; i < 23; i++) {
    $("#start_times").append(
      $("<option></option", {
        value: i,
        text: i + ":00",
      })
    );

    $("#end_times").append(
      $("<option></option", {
        value: i + 1,
        text: i + 1 + ":00",
      })
    );
  }
}

//!< 가격 정보에 대한 입력
function price_maker() {
  var stat = $("#numberUpDown").val();
  var num = parseInt(stat, 10);
  var start = $("#start_times option:selected").val();
  var end = $("#end_times option:selected").val();
  var date = ""; //$('#datePicker').value;

  if (start != null && end != null) curr_price = (end - start) * price;
  if (curr_price < 0) curr_price = 0;
  else {
    if (num > max && max != 0) curr_price += num * people_price;
  }

  $("#priceinfo").empty();
  $("#priceinfo").prepend(
    $(
      "<p>예약내용</p>" +
        "<p class='mb-0 font-weight-light font-size-xs'>" +
        date +
        " " +
        $("#start_times option:selected").text() +
        "</p>" +
        "<p class='font-weight-light font-size-xs'>- " +
        $("#end_times option:selected").text() +
        "</p>" +
        "<p class='font-weight-bold text-red font-size-l'>" +
        numberFormat(curr_price) +
        "원<span class='font-weight-light font-size-xs text-light-gray-more'>(VAT포함)</span></p>" +
        "<button type='button' class='btn btn-block border rounded-0 py-2 font-weight-light'><i class='fas fa-shopping-cart mr-2' onclick='addCart();'></i>장바구니</button>"
    )
  );
}

//!< 상세페이지에서의 좋아요 요청
function addWishList(obj) {
  //!< 로그인이 되어있어야 찜이 가능함
  let uid = sessionStorage.getItem("id");
  if (uid == null) {
    alert("로그인이 필요합니다");
    location.reload();
  } else {
    //!< 현재 아이콘 상태에 따라 좋아요 혹은 취소 요청
    let icon = $(obj).find("i");
    if (icon.hasClass("far fa-heart")) {
      like++;
      $(obj).find("#cnt").text(like);
      $(icon).attr("class", "fas fa-heart text-red");
    } else {
      like--;
      $(obj).find("#cnt").text(like);
      $(icon).attr("class", "far fa-heart");
    }

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          console.log("조아여");
        }
      }
    };

    xhr.open("POST", "http://3.34.150.116:3000/object/like");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("key=" + value + "&ukey=" + uid);
  }
}


function numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//!< 질문 전달
//!< qna_text라는 아이템의 데이터를 바탕으로 전달
function sendQna() {
  let id = sessionStorage.getItem("id");
  if (id != null) {
      let msg = $("#qna_text").val();

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === xhr.DONE) {
              $("#qnas").prepend(
                      $(
                      "<li class='mb-3'><div class='d-flex'><div class='mr-lg-4 mr-2'><span class='d-inline-block rounded-circle user-bg'></span></div>"+
                      "<div class=''><p class='font-size-m'> "+sessionStorage.getItem("nickname")+" </p>"+
                      "<p class='font-weight-light font-size-s text-light-gray'>"+msg+"</p>"+
                      "<p class='text-light-gray-more font-size-xs'> 방금 전 </p></div></div></li>"
                      )
                  )
          } else {
          }
      };

      xhr.open("POST", "http://3.34.150.116:3000/studio/qna");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("studio_key=" + value + "&user_id=" + id + "&msg=" + msg);
  } else {
      alert("로그인이 필요합니다");
  }
}

//!< 리뷰 전달
//!< 별점의 텍스트를 점수로 환산하고, 입력 값을 리뷰로 하여 전달
function sendReview() {
  let id = sessionStorage.getItem("id");
  if (id != null) {
      let msg = $("#review_text").val();
      let rating = $(".live-rating").text();

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === xhr.DONE) {
              $("#reviews").prepend(
                      $(
                      "<li class='mb-3'><div class='d-flex'><div class='mr-lg-4 mr-2'><span class='d-inline-block rounded-circle user-bg'></span></div>"+
                      "<div class=''><p class='font-size-m'> "+sessionStorage.getItem("nickname")+" </p>"+
                      "<p class='font-weight-light font-size-s text-light-gray'>"+msg+"</p>"+
                      "<p class='text-light-gray-more font-size-xs'> 방금 전 </p></div></div></li>"
                      )
                  )
          } else {
          }
      };

      xhr.open("POST", "http://3.34.150.116:3000/studio/review");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("studio_key=" + value + "&user_id=" + id + "&msg=" + msg + "&score=" + rating);
  } else {
      alert("로그인이 필요합니다");
  }
}


//!< 데이터를 카트에 저장
function addCart() {
  var cartInfo = JSON.parse(sessionStorage.getItem("cart"));
  var cart = [];

  //!< 현재 가격이 0인 경우 잘못된 상태로 가정
  if (curr_price > 0) {
    //!< 기존 카트 정보 획득
      for (var item in cartInfo) {
          cart.push({
              img: cartInfo[item].img,
              title: cartInfo[item].title,
              price: cartInfo[item].price,
              date: cartInfo[item].date,
          });
      }

      //!< 신규 정보 카트 등록
      cart.push({
          img: img_link,
          title: title,
          price: curr_price,
          date:
              "예약일시 : " +
              $("#datePicker").val() +
              " " +
              $("#start_times option:selected").text() +
              " ~ " +
              $("#end_times option:selected").text(),
      });

      sessionStorage.setItem("cart", JSON.stringify(cart));

      console.log(cart);
      alert("장바구니에 상품이 담겼습니다");
  } else {
      alert("상품 정보를 선택해주세요");
  }
}

//!< 구매하기
//!< 바로 결제페이지로 넘어감
function purchase() {
  addCart();
  location.href = "http://artbyus.co.kr/member/purchase.html";
}