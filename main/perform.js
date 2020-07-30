//!< 메인 페이지 오디션 부분
function initPerform() {
    //Get Room information
    $.ajax({
      type: "GET",
      url: "http://3.34.150.116:3000/audition",
      dataType: "JSON",
  
      //성공 시
      success: function (data) {
        $.each(data, function (_, item) {
          
          $("#main-audition-slide").append(
            $(
                "<div class='col-lg-3 col-6'><div class='card border-0'>" +
                "<img src='"+item.obj_thumbnail+"' class='card-img-top rounded-0'>" +
                "<h5 class='mt-lg-3 mt-2'>" +
                item.obj_name +
                "</h5>" +
                "<p class='font-weight-light pb-2 mb-2 font-size-xs'>" +
                item.obj_name +
                "</p>" +
                "<a href='/sub/audition_view.html?" +
                item.obj_key +
                "' class='stretched-link text-decoration-none'>" +
                "</a></div></div>"
            )
          );
        });

        $("#main-audition-slide").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            prevArrow:
              '<button type="button" class="btn slide-prev"><span class="slide-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></button>',
            nextArrow:
              '<button type="button" class="btn slide-next"><span class="slide-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></button>',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ],
          });
      },
  
      //error 발생 시
      error: function (xhr, status, error) {
        alert("접속 오류");
      },
    });
  }