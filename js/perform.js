$(document).ready(function(){
    
   
    //Get Room information
    $.ajax({

        type:"GET",
        url: "http://3.34.150.116:3000/perform",
        dataType:"JSON", 

        
        //성공 시
        success : function(data) {

        console.log(data);

        $.each(data, function(index, item){

            
         
        if(index <= 3){ //4개 까지는 보여줌

            $("#show_list").append(
            $("<div class='col-md-6 mb-4'><div class='card rounded-0'><div class='position-absolute p-md-2 p-1 w-100 z-index-2'>"+
            "<div id = 'studio_index' style='display: none;''>"+item.perform_id+"</div>"+
            "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-l' onclick='addWishList(this);'><i class='far fa-heart'></i></button></div>"+
            "<div class='d-flex overflow-hidden' style='max-height: 210px'>"+
            "<img src='/img/performance-4.jpg' class='card-img-top rounded-0 align-self-center' alt=''></div>"+
            "<div class='card-body'><h4 class='font-size-m'>"+item.perform_name+"</h4>"+
            "<div class='bg-deep-dark my-4 list-card-divider'></div>"+
            "<p class='font-weight-light text-red font-size-sm'>"+item.perform_location+"</p>"+
            "<p class='font-weight-light overflow-hidden list-card-content text-light-gray font-size-sm'>"+item.perform_subname+"</p>"+
            "<p class='font-weight-light mb-0 text-light-gray font-size-sm'>2020.04.03</p>"+
            "<a href='performance_view.html' class='stretched-link text-decoration-none'></a></div></div></div>"
            ));
        }
        else{

            $("#show_list").append(
            $("<div id='showview' class='col-lg-3 col-6 mb-lg-5 mb-4' style ='display : none;'>"+
            "<div id = 'studio_index' style='display: none;''>"+item.studio_key +"</div>"+
            "<div class='card border-0 bg-transparent'>"+
            "<div class='position-absolute p-md-2 p-1 w-100 z-index-2'>"+
            "<div class='p-lg-2 p-1 d-flex list-tag list-tag-yellow'>"+
            "<span class='align-self-center list-tag-title'>바로결제</span>"+
            "</div>"+
            "<button type='button' class='float-right bg-transparent border-0 p-0 text-white font-size-md' onclick='addWishList(this);'><i class='far fa-heart'></i></button>"+
            "</div>"+
            "<img src='"+item.studio_thumbnail+"' class='card-img-top rounded-0' srcset='/img/section-1-photo@2x.jpg 2x, /img/section-1-photo@3x.jpg 3x' alt=''>"+
            "<h5 class='mt-lg-3 mt-2'>"+ item.studio_name +"</h5>"+
            "<p class='font-weight-light border-bottom pb-2 mb-2 font-size-xs'>"+item.studio_subname+"</p>"+
            "<a href='studio_view.html?"+item.studio_key+"' class='stretched-link text-decoration-none'>"+
            "<span class='text-red font-weight-bold font-size-l'>"+item.studio_price+"</span><span class='text-dark font-weight-light pl-1 font-size-s'>원/" +item.studio_price_type +"</span>"+
           "</a> </div></div>"
            ));
        }
       
        });

        },

        //error 발생 시 
        error : function(xhr, status, error) {

        alert("접속 오류");
 
         }

    });

})

