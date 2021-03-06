function makelist(keyword) {
  console.log(keyword);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 201) {
        var result = JSON.parse(xhr.responseText);
        for (var i = 0; i < result.length; i++) {
          var form = "";
          if (keyword == "studio" || keyword == "class") {
            form =
              "<div class='col-lg-3 col-6 mb-lg-5 mb-4'>" +
              "<div id = 'studio_index' style='display: none;''>" +
              result[i].obj_key +
              "</div>" +
              "<div class='card border-0 bg-transparent'>" +
              "<div class='position-absolute p-md-2 p-1 w-100 z-index-2'>" +
              "<div class='p-lg-2 p-1 d-flex list-tag list-tag-yellow'>" +
              "<span class='align-self-center list-tag-title'>바로결제</span>" +
              "</div>" +
              "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-md' onclick='addWishList(" +
              result[i].obj_key +
              ");'><i class='far fa-heart'></i></button>" +
              "</div>" +
              "<img src='" +
              result[i].obj_thumbnail +
              "' class='card-img-top rounded-0'>" +
              "<h5 class='mt-lg-3 mt-2'>" +
              result[i].obj_name +
              "</h5>" +
              "<p class='font-weight-light border-bottom pb-2 mb-2 font-size-xs'>" +
              result[i].obj_subname +
              "</p>" +
              "<a href='/sub/" +
              keyword +
              "_view.html?" +
              result[i].obj_key +
              "' class='stretched-link text-decoration-none'>" +
              "<span class='text-red font-weight-bold font-size-l'>" +
              result[i].obj_rp +
              "</span><span class='text-dark font-weight-light pl-1 font-size-s'>원/" +
              result[i].obj_price_type +
              "</span>" +
              "</a> </div></div>";
          } else if (keyword == "perform") {
            var rule = "";
            var rules = result[i].obj_info.split("/");

            for (var s in rules) {
              rule += rules[s] + "<br>";
            }

            form =
              "<div class='col-md-6 mb-4'><div class='card rounded-0'><div class='position-absolute p-md-2 p-1 w-100 z-index-2'>" +
              "<div id = 'studio_index' style='display: none;''>" +
              result[i].obj_key +
              "</div>" +
              "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-l' onclick='addWishList(" +
              result[i].obj_key +
              ");'><i class='far fa-heart'></i></button></div>" +
              "<div class='d-flex overflow-hidden' style='max-height: 210px'>" +
              "<img src='" +
              result[i].obj_thumbnail +
              "' class='card-img-top rounded-0 align-self-center' alt=''></div>" +
              "<div class='card-body'><h4 class='font-size-m'>" +
              result[i].obj_name +
              "</h4>" +
              "<div class='bg-deep-dark my-4 list-card-divider'></div>" +
              "<p class='font-weight-light text-red font-size-sm'>" +
              result[i].obj_location +
              "</p>" +
              "<p class='font-weight-light overflow-hidden list-card-content text-light-gray font-size-sm'>" +
              rule +
              "</p>" +
              "<p class='font-weight-light mb-0 text-light-gray font-size-sm'>" +
              result[i].obj_useful +
              "</p>" +
              "<a href='/sub/performance_view.html?" +
              result[i].obj_key +
              "' class='stretched-link text-decoration-none'></a></div></div></div>";
          } else if (keyword == "audition") {
            form =
            "<div class='col-lg-3 col-6 mb-lg-5 mb-4'>" +
            "<div id = 'studio_index' style='display: none;''>" +
            result[i].obj_key +
            "</div>" +
            "<img src='" +
            result[i].obj_thumbnail +
            "' class='card-img-top rounded-0'>" +
            "<h5 class='mt-lg-3 mt-2'>" +
            result[i].obj_name +
            "</h5>" +
            "<p class='font-weight-light pb-2 mb-2 font-size-xs'>" +
            result[i].obj_subname +
            "</p>" +
            "<a href='/sub/" +
            keyword +
            "_view.html?" +
            result[i].obj_key +
            "' class='stretched-link text-decoration-none'>" +
            "</a> </div></div>";
          } else {
            form =  "<div class='col-lg-3 col-6 mb-lg-5 mb-4'><div class='card border-0 bg-transparent'>" + 
                    "<img src='"+result[i].obj_thumbnail +"' class='card-img-top rounded-0' alt=''>"+
                    "<h5 class='mt-lg-3 mt-2'>" + result[i].obj_name +"</h5>" +
                    "<p class='font-weight-light font-size-xs'>"+result[i].obj_subname +"</p>"+
                    "<a href='/sub/store_view.html"+result[i].obj_key +"' class='stretched-link text-decoration-none'></a></div></div>"
          }

          $("#show_list").append($(form));
        }
      } else {
      }
    }
  };

  xhr.open("POST", "http://3.34.150.116:3000/object/");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("keyword=" + keyword);
}

function addWishList(value) {
  let uid = sessionStorage.getItem("id");
  if (uid == null) {
    alert("로그인이 필요합니다");
    location.reload();
  } else {
    let icon = $(obj).find("i");
    if (icon.hasClass("far fa-heart")) {
      $(icon).attr("class", "fas fa-heart text-red");
    } else {
      $(icon).attr("class", "far fa-heart");
    }

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          location.reload();
        }
      }
    };

    xhr.open("POST", "http://3.34.150.116:3000/object/like");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("key=" + value + "&ukey=" + uid);
  }
}
