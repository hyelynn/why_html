var url = location.href;
var value = url.slice(url.indexOf("?") + 1, url.length).split("&");

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

        $("#title").append(
          $(
            "<h2 class='my-4'>" +
              result[0].studio_name +
              "</h2>" +
              "<p class='font-weight-light mb-4 text-light-gray font-size-s'>+" +
              result[0].studio_subname +
              "+</p>"
          )
        );

        $("#info").append(
          $(
            "<div class='my-5'>" +
              "<h4 class='mb-4 text-bullet'>소개</h4>" +
              "<p class='font-weight-light font-size-s'>" +
              result[0].studio_info +
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

        $("#refund").append(
          $(
            "<div class='my-5'><h4 class='mb-4 text-bullet'>환불규정</h4>" +
              "<p class='font-weight-light font-size-s'>" +
              result[0].studio_refund +
              "</p></div>"
          )
        );

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
              "<img src='/why_html/img/studio-host.jpg' class='align-self-center' alt=''></div>" +
              "<div><h4 class='font-size-m'>호스트 이름을 표현하는 공간</h4>" +
              "<p class='text-light-gray font-size-xs'>한줄 자기소개로 자신을 알릴 수 있습니다. </p>" +
              "<button type='button' class='btn rounded-pill px-lg-5 px-3 py-2 border-yellow font-size-xs mr-2'>전화하기</button>" +
              "<button type='button' class='btn rounded-pill px-lg-5 px-3 py-2 border-yellow font-size-xs'>메시지 전송</button></div></div>"
          )
        );
      } else {
        alert("접속 오류");
        location.href = "studio.html"; //잘못된 접속 시 페이지 강제 이동
      }
    } else {
    }
  };

  xhr.open("POST", "http://3.34.150.116:3000/studio/info");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("studio_key=" + value);

  var xhrimg = new XMLHttpRequest();
  xhrimg.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 201) {
        var result = JSON.parse(xhr.responseText);
        for(i in result.length) {
            $("#indicator").append(
                $("<li data-target='#carouselStudioView' data-slide-to='"+i+"' class='active'></li>")
            );

            $("#carousel").append(
                $("<div class='carousel-item active'><img src='"+result[i].studio_images+"' class='d-block w-100' alt='...'></div>")
            );
        }
      } else {
        alert("이미지 오류");
      }
    }
  };
  xhrimg.open("POST", "http://3.34.150.116:3000/studio/images");
  xhrimg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhrimg.send("studio_key=" + value);
});
