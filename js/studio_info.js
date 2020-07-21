var url = location.href;
var value = url.slice(url.indexOf("?") + 1, url.length).split("&");
var price = 0;
var max = 0;
var people_price = 0;
var img_link = "";
var title = "";
var curr_price = 0;

$(document).ready(function () {
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
          var indi = "",
            img = "";

          price = parseInt(result[0].studio_price);
          curr_price = price;
          max = parseInt(result[0].studio_max);
          people_price = parseInt(result[0].studio_people_price);
          title = result[0].studio_name;

          if (i == 0) {
            indi =
              "<li data-target='#carouselStudioView' data-slide-to='" +
              i +
              "' class='active'></li>";
            img =
              "<div class='carousel-item active'><img src='" +
              result[i].studio_images +
              "' class='d-block w-100' alt='...'></div>";
            img_link = result[i].studio_images;
          } else {
            indi =
              "<li data-target='#carouselStudioView' data-slide-to='" +
              i +
              "'></li>";
            img =
              "<div class='carousel-item'><img src='" +
              result[i].studio_images +
              "' class='d-block w-100' alt='...'></div>";
          }

          $("#indicator").append($(indi));
          $("#carousel").append($(img));
        }

        $("#title").append(
          $(
            "<h2 class='my-4'>" +
              result[0].studio_name +
              "</h2>" +
              "<p class='font-weight-light mb-4 text-light-gray font-size-s'>" +
              result[0].studio_subname +
              "</p>"
          )
        );

        var info = "";
        var splitInfo = result[0].studio_info.split(".");

        for (var s in splitInfo) {
          info += splitInfo[s] + "<br>";
        }

        $("#info").append(
          $(
            "<div class='my-5'>" +
              "<h4 class='mb-4 text-bullet'>소개</h4>" +
              "<p class='font-weight-light font-size-s'>" +
              info +
              "</p></div>" +
              "<div class='my-5'>" +
              "<h4 class='mb-4 text-bullet'>편의시설</h4>" +
              "<div class='d-flex-fill font-weight-light font-size-s'>" +
              "<span class='mr-2'>" +
              result[0].studio_useful +
              "</span></div></div>"
          )
        );

        $("#terms").append(
          $(
            "<div class='my-5'><h4 class='mb-4 text-bullet'>이용약관</h4>" +
              "<p class='font-weight-light font-size-s'>" +
              result[0].studio_rule +
              "</p></div>"
          )
        );

        // $("#refund").append(
        //   $(
        //     "<div class='my-5'><h4 class='mb-4 text-bullet'>환불규정</h4>" +
        //       "<p class='font-weight-light font-size-s'>" +
        //       result[0].studio_refund +
        //       "</p></div>"
        //   )
        // );

        $("#contact").append(
          $(
            "<div class='my-5'><h4 class='mb-4 text-bullet'>주소</h4>" +
              "<div class='mb-2'><iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.2200823320336!2d126.94783625121208!3d37.47913253678695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe9d42c354ca061aa!2z7IK87J2867mM65Sp!5e0!3m2!1sko!2skr!4v1589899812488!5m2!1sko!2skr' width='100%' height='210' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe></div>" +
              "<p class='font-weight-light font-size-s'>" +
              result[0].studio_location +
              "</p></div>" +
              "<div class='my-5'><h4 class='mb-4 text-bullet'>대중교통</h4><p class='font-weight-light font-size-s'>" +
              result[0].studio_subway +
              "<br>" +
              result[0].studio_bus +
              "</p></div>" +
              "<div class='my-5 border bg-white d-flex p-4'><div class='d-flex justify-content-center rounded-circle overflow-hidden mr-lg-5 mr-3 card-host'>" +
              "<img src='/img/studio-host.jpg' class='align-self-center' alt=''></div>" +
              "<div><h4 class='font-size-m'>" +
              result[0].biz_title +
              "</h4>" +
              "<p class='text-light-gray font-size-xs'>" +
              result[0].biz_introduce +
              "</p>" +
              "<button type='button' class='btn rounded-pill px-lg-5 px-3 py-2 border-yellow font-size-xs mr-2'>전화하기</button>" +
              "<button type='button' class='btn rounded-pill px-lg-5 px-3 py-2 border-yellow font-size-xs'>메시지 전송</button></div></div>"
          )
        );

        $("#title_purchase").append(
          $(
            "<h6>" +
              result[0].studio_name +
              "</h6>" +
              "<p class='font-weight-bold mb-4 text-red font-size-l'>" +
              result[0].studio_rp +
              "원/1" +
              result[0].studio_price_type +
              "</p>"
          )
        );
      } else {
        alert("접속 오류");
        location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
      }
    } else {
    }
  };

  $(".star-rating").starRating({
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

  xhr.open("POST", "http://3.34.150.116:3000/studio/info");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("studio_key=" + value);
});

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
        curr_price +
        "원<span class='font-weight-light font-size-xs text-light-gray-more'>(VAT포함)</span></p>" +
        "<button type='button' class='btn btn-block border rounded-0 py-2 font-weight-light'><i class='fas fa-shopping-cart mr-2' onclick='addCart();'></i>장바구니</button>"
    )
  );
}
