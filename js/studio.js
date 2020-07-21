function initialize(keyword) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          var result = JSON.parse(xhr.responseText);
          for (var i = 0; i < result.length; i++) {
            $("#show_list").append(
              $(
                "<div class='col-lg-3 col-6 mb-lg-5 mb-4'>" +
                  "<div id = 'studio_index' style='display: none;''>" +
                  result[i].obj_key +
                  "</div>" +
                  "<div class='card border-0 bg-transparent'>" +
                  "<div class='position-absolute p-md-2 p-1 w-100 z-index-2'>" +
                  "<div class='p-lg-2 p-1 d-flex list-tag list-tag-yellow'>" +
                  "<span class='align-self-center list-tag-title'>바로결제</span>" +
                  "</div>" +
                  "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-md' onclick='addWishList(this);'><i class='far fa-heart'></i></button>" +
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
                  "<a href='"+keyword+"_view.html?" +
                  result[i].obj_key +
                  "' class='stretched-link text-decoration-none'>" +
                  "<span class='text-red font-weight-bold font-size-l'>" +
                  result[i].obj_rp +
                  "</span><span class='text-dark font-weight-light pl-1 font-size-s'>원/" +
                  result[i].obj_price_type +
                  "</span>" +
                  "</a> </div></div>"
              )
            );
          }
        } else {
        }
      }
  
      xhr.open("POST", "http://3.34.150.116:3000/object/");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("keyword=" + keyword);
    };
  }