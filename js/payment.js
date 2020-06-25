function payment() {
    BootPay.request({
        price: '362000', //실제 결제되는 가격
        application_id: "5ed87b408f0751001efcd31d",
        name: '아트바이어스 스튜디오&클래스', //결제창에서 보여질 이름
        pg: 'payapp',
        //method: '', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
        show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
        items: [
            {
                item_name: '사당역 제이그라운드 연습실', //상품명
                qty: 1, //수량
                unique: 'pid_03021', //해당 상품을 구분짓는 primary key
                price: 65000, //상품 단가
                cat1: '연습실', // 대표 상품의 카테고리 상, 50글자 이내
                cat2: '', // 대표 상품의 카테고리 중, 50글자 이내
                cat3: '', // 대표상품의 카테고리 하, 50글자 이내
            },
            {
                item_name: '“너도 손글씨 잘 쓸 수 있어” 김민범의 캘리그라피', //상품명
                qty: 1, //수량
                unique: 'pid_03022', //해당 상품을 구분짓는 primary key
                price: 150000, //상품 단가
                cat1: '클래스', // 대표 상품의 카테고리 상, 50글자 이내
                cat2: '', // 대표 상품의 카테고리 중, 50글자 이내
                cat3: '', // 대표상품의 카테고리 하, 50글자 이내
            },
            {
                item_name: '“너도 손글씨 잘 쓸 수 있어” 김민범의 캘리그라피', //상품명
                qty: 1, //수량
                unique: 'pid_03023', //해당 상품을 구분짓는 primary key
                price: 147000, //상품 단가
                cat1: '클래스', // 대표 상품의 카테고리 상, 50글자 이내
                cat2: '', // 대표 상품의 카테고리 중, 50글자 이내
                cat3: '', // 대표상품의 카테고리 하, 50글자 이내
            }
        ],
        user_info: {
            phone: '010-1234-4567'
        },
        order_id: 'orderid_payproduct', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
        account_expire_at: '2020-06-30', 
    }).error(function (data) {
        //결제 진행시 에러가 발생하면 수행됩니다.
        console.log(data);
    }).cancel(function (data) {
        //결제가 취소되면 수행됩니다.
        console.log(data);
    }).ready(function (data) {
        // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
        console.log(data);
    }).confirm(function (data) {
        //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
        //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
        console.log(data);
        var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
        if (enable) {
            BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
        } else {
            BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
        }
    }).close(function (data) {
        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
        console.log(data);
    }).done(function (data) {
        //결제가 정상적으로 완료되면 수행됩니다
        //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
        console.log(data);
    });
}