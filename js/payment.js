var total_price = 0;
var items = [];

//!< 결제 창에서 현재 구매할 아이템들을 확인하고
//!< 총 금액을 확인함
$(document).ready(function () {
  items = JSON.parse(sessionStorage.getItem("cart"));
  console.log(items);

  $.each(items, function (index, item) {
    $("#cart").append(
      $(
        "<li class='list-group-item pr-4 pl-3 py-4'>" +
          "<div class='d-lg-flex align-items-center custom-inputs'>" +
          "<div class='d-flex align-items-lg-center'>" +
          "<input type='checkbox' class='custom-checkbox mr-sm-3 mr-2'>" +
          "<div class='d-flex justify-content-center overflow-hidden mr-sm-3 mr-2 cart-thumbs'>" +
          "<img src='" +
          item.img +
          "' class='align-self-center w-100 h-100' alt=''></div>" +
          "<div><span class='d-block font-weight-light text-red cart-item-category'>연습실</span>" +
          "<a href='/sub/studio_view.html' class='text-decoration-none'>" +
          "<h4 class='text-gray cart-item-title'>" +
          item.title +
          "</h4></a>" +
          "<p class='font-weight-light text-gray mb-0'>" +
          item.date +
          "</p>" +
          "<p class='font-weight-light text-gray'></p>" +
          "<p class='font-weight-light text-light-gray mb-0'><span class='ml-5'> </span></p>" +
          "<div class='text-right ml-auto'>" +
          "<p class='font-weight-light text-gray mb-0'>합계</p>" +
          "<h2 class='mb-0'>" +
          item.price +
          "원</h2><p class='font-weight-light text-light-gray mb-0'>(VAT포함)</p></div></div></li>"
      )
    );

    total_price += parseInt(item.price);
  });

  $("#price").append(
    $(
      "<p class='font-weight-light text-gray font-size-l'>총 <span class='font-weight-bold'>" +
        items.length +
        "</span></p>" +
        "<div class='d-flex text-right' ><div class='mr-4'>" +
        "<p class='font-weight-light mb-0 text-gray'>합계</p>" +
        "<p class='font-weight-light mb-0 text-light-gray'>(VAT포함)</p></div>" +
        "<h1 class='font-weight-bold text-red'>" +
        total_price +
        "원</h1></div>"
    )
  );

  $("#user").append(
    $(
      "<div class='d-md-flex'><div class='flex-fill w-25 mr-md-4 mb-3 mb-md-0'>" +
        "<label for='order_name' class='d-block text-gray'>이름</label>" +
        "<input type='text' class='form-control' id='order_name' value='" +
        sessionStorage.getItem("nickname") +
        "' placeholder='이름'></div>" +
        "<div class='flex-fill w-75'><label for='order_email' class='d-block text-gray'>이메일</label>" +
        "<input type='text' class='form-control' id='order_email' value='" +
        sessionStorage.getItem("id") +
        "' placeholder='example@example.com'></div></div>"
    )
  );
    
  //!< 총 금액을 저장하여 추후 검증에 사용함ㅁ
  sessionStorage.setItem('total', total_price);
});



//var product = [];
    // for (var i in items) {
    //   product.push({
    //     item_name: items[i].title, //상품명
    //     qty: 1, //수량
    //     unique: "pid_03022", //해당 상품을 구분짓는 primary key
    //     price: items[i].price, //상품 단가
    //     cat1: "클래스",
    //   });
    // }

    // console.log(product);

    // BootPay.request({
    //   price: total_price, //실제 결제되는 가격
    //   application_id: "5ed87b408f0751001efcd31d",
    //   name: "아트바이어스 스튜디오&클래스", //결제창에서 보여질 이름
    //   pg: "payapp",
    //   //method: '', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
    //   show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
    //   items: product,
    //   user_info: {
    //     phone: sessionStorage.getItem("phone"),
    //   },
    //   order_id: "orderid_payproduct", //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
    //   account_expire_at: "2020-07-30",
    // })
    //   .error(function (data) {
    //     //결제 진행시 에러가 발생하면 수행됩니다.
    //     console.log(data);
    //   })
    //   .cancel(function (data) {
    //     //결제가 취소되면 수행됩니다.
    //     console.log(data);
    //   })
    //   .ready(function (data) {
    //     // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
    //     console.log(data);
    //   })
    //   .confirm(function (data) {
    //     //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
    //     //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
    //     console.log(data);
    //     var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
    //     if (enable) {
    //       BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
    //     } else {
    //       BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
    //     }
    //   })
    //   .close(function (data) {
    //     // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
    //     console.log(data);
    //   })
    //   .done(function (data) {
    //     //결제가 정상적으로 완료되면 수행됩니다
    //     //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
    //     console.log(data);
    //   });