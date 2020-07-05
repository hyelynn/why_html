
$(document).ready(function(){
    
    $('.main-item-slide').click({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<button type="button" class="btn slide-prev"><span class="slide-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></button>',
        nextArrow: '<button type="button" class="btn slide-next"><span class="slide-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
              }
            }
        ]
    });

    //Get Room information
    $.ajax({

        type:'GET',
        url: 'http://3.34.150.116:3000/studio',
        dataType:'JSON', 

        
        //성공 시
        success : function(data) {

        console.log(data);

        $.each(data, function(index, item){
            var prefix ="";
            if (data == null) {
                prefix = "<div class='position-absolute p-md-2 p-1 w-100 z-index-2'>"+
                "<div class='p-lg-2 p-1 d-flex list-tag list-tag-sky'>"+
                "<span class='align-self-center list-tag-title'>예약결제</span></div>"+
                "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-md' onclick='addWishList(this);'><i class='far fa-heart'></i></button></div>"
            } else {
                prefix = "<div class='position-absolute p-md-2 p-1 w-100 z-index-2'>"+
                "<div class='p-lg-2 p-1 d-flex list-tag list-tag-yellow'>"+
                "<span class='align-self-center list-tag-title'>즉시결제</span></div>"+
                "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-md' onclick='addWishList(this);'><i class='far fa-heart'></i></button></div>"
            }
            
            $("#main-item-slide").append(
                $("<div class='col-lg-3 col-6'><div class='card border-0'>"+prefix+
                "<img src='img/section-2-photo.jpg' class='card-img-top rounded-0' srcset='img/section-2-photo@2x.jpg 2x, img/section-2-photo@3x.jpg 3x' alt=''>"+
                "<h5 class='mt-lg-3 mt-2'>"+item.studio_name+"</h5>"+
                "<p class='font-weight-light border-bottom pb-2 mb-2 font-size-xs'>"+item.studio_name+"</p>"+
                "<a href='studio_view.html?"+item.studio_key+"' class='stretched-link text-decoration-none'>"+
                "<span class='text-red font-weight-bold font-size-l'>"+item.studio_price+"</span><span class='text-dark font-weight-light pl-1 font-size-s'>원/" +item.studio_price_type +"</span></a></div></div>"));
        });

        },

        //error 발생 시 
        error : function(xhr, status, error) {

        alert('접속 오류');
 
         }

    });

})

