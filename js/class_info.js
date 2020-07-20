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
  console.log(valnum);
  var regexp = /^[0-9]*$/;
  if (!regexp.test(valnum)) {
    alert("접속 오류");
    location.href = "class.html"; //잘못된 접속 시 페이지 강제 이동
  }
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 201) {
        var result = JSON.parse(xhr.responseText);
        for (var i = 0; i < result.length; i++) {
          var indi = "",
            img = "";

          price = parseInt(result[0].class_price);
          //max = parseInt(result[0].studio_max);
          //people_price = parseInt(result[0].studio_people_price);
          title = result[0].studio_name;

          if (i == 0) {
            indi =
              "<li data-target='#carouselStudioView' data-slide-to='" +
              i +
              "' class='active'></li>";
            img =
              "<div class='carousel-item active'><img src='" +
              result[i].class_images +
              "' class='d-block w-100' alt='...'></div>";
            img_link = result[i].class_images;
          } else {
            indi =
              "<li data-target='#carouselStudioView' data-slide-to='" +
              i +
              "'></li>";
            img =
              "<div class='carousel-item'><img src='" +
              result[i].class_images +
              "' class='d-block w-100' alt='...'></div>";
          }

          $("#indicator").append($(indi));
          $("#carousel").append($(img));
        }

        $("#title").append(
          $(
            "<h2 class='my-4'>" +
              result[0].class_name +
              "</h2>"
          )
        );

        var info = "";
        var splitInfo = result[0].class_info.split('/');

        for (var s in splitInfo) {
          info += s + "<br>";
        }

        $("#info").append(
          $(
            "<div class='my-5'>" +
              "<h4 class='mb-4 text-bullet'>소개</h4>" +
              "<p class='font-weight-light font-size-s'>" +
              splitInfo +
              "</p></div>"
          )
        );

        var rule = "";
        var rules = result[0].class_rule.split('/');

        for (var s in rules) {
          rule += s + "<br>";
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
        var gs = result[0].class_howabout.split('/');

        for (var s in gs) {
          g += s + "<br>";
        }

        $("#guide").append(
          $(
            "<div class='my-5'><h4 class='mb-4 text-bullet'>레슨 안내</h4>"+
            "<p class='font-weight-light font-size-s'>"+g+"</p></div>"
          )
        );

        $("#title_purchase").append(
          $(
            "<h6>" +
              result[0].class_name +
              "</h6>" +
              "<p class='font-weight-bold mb-4 text-red font-size-l'>" +
              result[0].class_price +
              "원/1" +
              result[0].class_price_type +
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

  xhr.open("POST", "http://3.34.150.116:3000/class/info");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("class_key=" + value);
});