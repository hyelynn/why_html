$(document).ready(function(){
    var items = JSON.parse(sessionStorage.getItem("cart"));
    console.log(items)

    $.each(items, function(index, item){
        $('#cart').append(
            $("<li class='list-group-item pr-4 pl-3 py-4'>"+
            "<div class='d-lg-flex align-items-center custom-inputs'>"+
            "<div class='d-flex align-items-lg-center'>"+
            "<input type='checkbox' class='custom-checkbox mr-sm-3 mr-2'>"+
            "<div class='d-flex justify-content-center overflow-hidden mr-sm-3 mr-2 cart-thumbs'>"+
            "<img src='"+item.img+"' class='align-self-center w-100 h-100' alt=''></div>"+
            "<div><span class='d-block font-weight-light text-red cart-item-category'>연습실</span>"+
            "<a href='/sub/studio_view.html' class='text-decoration-none'>"+
            "<h4 class='text-gray cart-item-title'>"+item.title+"</h4></a>"+
            "<p class='font-weight-light text-gray mb-0'>"+item.date+"</p>"+
            "<p class='font-weight-light text-gray'></p>"+
            "<p class='font-weight-light text-light-gray mb-0'><span class='ml-5'> </span></p>"+
            "<div class='text-right ml-auto'>"+
            "<p class='font-weight-light text-gray mb-0'>합계</p>"+
            "<h2 class='mb-0'>" + item.price + "원</h2><p class='font-weight-light text-light-gray mb-0'>(VAT포함)</p></div></div></li>")
        );
    })
})