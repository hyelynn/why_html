$(document).ready(function () {
    // console.log('2')

    // 모달
    $('#modals').load('../include/common/header_sub_modal.html')

    // 서브 헤더
    $('#header').load('../include/common/header_host_sub.html', function () {
        // main태그 요소 위치에 스크롤 이동하는 이슈가 있어 추가
        // $('html').scrollTop(0);
    })

    // 광고 슬라이드
    $('#carouselSlide').load('../include/host/carousel_slide.html')

    // 예약 페이지 탭 - 사용자/호스트 공통
    $('#reservTab').load('../include/common/reserv_tab.html')

    // qna, 후기, 예약 페이지(사용자/호스트) 검색바
    //  - input placeholder 텍스트, selectbox 항목 다름
    //  - qna
    //      placeholder : 작성자로 검색해 주세요.
    //      selectbox : 답변필요순/미답변순/최신 등록일순
    //  - 후기
    //      placeholder : 작성자로 검색해 주세요.
    //      selectbox : 평점 4.5점이상/미답변순/최신 등록일순
    //  - 예약
    //      placeholder : 예약번호, 예약자명으로 검색해주세요
    //      selectbox : 예약일순
    $('#subSearchBar').load('../include/common/sub_search_bar.html')
    $('#subSearchBar.host-search').load('../include/common/sub_search_bar2.html')   // 호스트 선택한 예약 처리 selectbox 추가

    // 등록 프로세스 기본 - studio
    $('#registerProcess').load('../include/host/item_register_process.html #type4')

    // include_html을 불러오는 서브페이지 파일에서는 스크립트가 동작하지 않아 getScript 사용
    $.getScript('../js/custom.js');

    // 서브 푸터
    $('#footer').load('../include/common/footer_host_sub.html')
})