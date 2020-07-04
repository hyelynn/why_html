
function login_header(){
    var nickname = sessionStorage.getItem("nickname");

    if (nickname != null) {
        $("#navbarNavDropdown").append(
            $("<ul class='navbar-nav border-top pt-3 m-lg-auto mt-2 font-size-xs d-block d-lg-none'>"+
            "<li class='nav-item mx-lg-3 mx-2 mb-2'><div class='d-flex'>"+
            "<div class='position-relative mr-2 nav-user-profile'>"+
            "<span class='position-absolute rounded-pill bg-hot-pink nav-user-notify'></span>"+
            "<img src='/why_html/img/profile-photo@3x.jpg' class='rounded-circle nav-user-profile-img' alt='김민범님'></div>"+
            "<span class='align-self-center'>"+sessionStorage.getItem("nickname")+"</span></div></li>"+
            "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='#x'>예약 리스트</a></li>"+
            "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='#x'>찜 리스트</a></li>"+
            "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='#x'>나의 이용 후기</a></li>"+
            "<li class='nav-item mx-lg-3 mx-2'>"+
            "<a class='nav-link' href='#x'>채팅</a></li>"+
            "<li class='nav-item mx-lg-3 mx-2'>"+
            "<a class='nav-link' href='#x'>1:1 문의<span class='ml-2 d-inline-block rounded-pill align-top mt-1 bg-hot-pink nav-notify'></span></a></li>"+
            "<div class='dropdown-divider'></div>"+
            "<li class='nav-item mx-lg-3 mx-2'>"+
            "<a class='nav-link' href='#x'>회원 정보 관리</a></li>"+
            "<li class='nav-item mx-lg-3 mx-2'>"+
            "<a class='nav-link' href='#x'>호스트 전환</a></li>"+
            "<li class='nav-item mx-lg-3 mx-2'>"+
            "<a class='nav-link text-hot-pink' href='#x' onclick='onLogout();'>로그아웃</a></li></ul>"
        ));
    } else {
        $("#navbarNavDropdown").append(
            $("<ul class='navbar-nav ml-auto align-items-center d-none d-lg-flex'>"+
            "<li class='nav-item mr-2 font-size-md'>"+
            "<a class='nav-link text-dark' href='/why_html/member/calendar.html'><i class='far fa-calendar-alt'></i></a></li>"+
            "<li class='nav-item mr-2 font-size-md'>"+
            "<a class='nav-link text-dark' href='/why_html/member/recent_list.html'><i class='far fa-clock'></i></a></li>"+
            "<li class='nav-item mr-3 font-size-md'>"+
            "<a class='nav-link text-dark' href='/why_html/member/purchase.html'><i class='fas fa-shopping-cart'></i></a></li>"+
            "<li class='nav-item'>"+
            "<button class='btn border text-dark dropdown-toggle bg-white rounded-xl' type='button' data-toggle='modal' data-target='#loginModal'><span>로그인</span>"+
            "</button></li></ul>"
        ));
    }       
}