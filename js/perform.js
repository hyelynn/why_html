//!< 퍼포먼스 부분 정보 요청

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
                "<a href='performance_view.html?"+item.perform_id+"' class='stretched-link text-decoration-none'></a></div></div></div>"
                ));
        });

        },

        //error 발생 시 
        error : function(xhr, status, error) {

        alert("접속 오류");
 
         }

    });

})

