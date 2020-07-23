function login_header() {
  var nickname = sessionStorage.getItem("nickname");
  var img = sessionStorage.getItem("prof");
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      sessionStorage.setItem("lat", pos.coords.latitude);
      sessionStorage.setItem("lng", pos.coords.longitude);
      console.log(pos);
    })
  } else {
    alert('해당 브라우저에서는 위치정보를 제공하지 않습니다')
  }

  if (img == undefined || img == 'undefined') {
    img = "/img/profile_default.png";
  }
  var menu = ""
  
  if (location.href != 'http://artbyus.co.kr/index.html' && location.href != 'https://artbyus.co.kr/index.html' && 
      location.href != 'http://artbyus.co.kr/' && location.href != 'https://artbyus.co.kr/' ) {
    menu = "<ul class='navbar-nav m-auto font-weight-light sub-nav'>" +
    "<li class='nav-item mx-lg-3 mx-2'>" +
    "<div class='d-flex justify-content-between'>" +
    "<a class='nav-link text-dark' href='/sub/studio.html' id='menu1'>Studio</a>" +
    "<button class='navbar-toggler border-0 font-size-md text-dark' type='button' data-toggle='collapse' data-target='#subNavDropdown1' aria-controls='subNavDropdown1' aria-expanded='false' aria-label='Toggle navigation'>" +
    "<i class='fas fa-chevron-down'></i></button></div></li>" +
    "<li class='nav-item mx-lg-3 mx-2'>" +
    "<div class='d-flex justify-content-between'>" +
    "<a class='nav-link text-dark' href='/sub/class.html' id='menu2'>Class</a>" +
    "<button class='navbar-toggler border-0 font-size-md text-dark' type='button' data-toggle='collapse' data-target='#subNavDropdown2' aria-controls='subNavDropdown2' aria-expanded='false' aria-label='Toggle navigation'>" +
    "<i class='fas fa-chevron-down'></i></button></div></li>" +
    "<li class='nav-item mx-lg-3 mx-2'>" +
    "<div class='d-flex justify-content-between'>" +
    "<a class='nav-link text-dark' href='/sub/performance.html' id='menu3'>Performance</a>" +
    "<button class='navbar-toggler border-0 font-size-md text-dark' type='button' data-toggle='collapse' data-target='#subNavDropdown3' aria-controls='subNavDropdown3' aria-expanded='false' aria-label='Toggle navigation'>" +
    "<i class='fas fa-chevron-down'></i></button></div></li>" +
    "<li class='nav-item mx-lg-3 mx-2'>" +
    "<div class='d-flex justify-content-between'>" +
    "<a class='nav-link text-dark' href='/sub/audition.html' id='menu2'>Audition</a>" +
    "<button class='navbar-toggler border-0 font-size-md text-dark' type='button' data-toggle='collapse' data-target='#subNavDropdown2' aria-controls='subNavDropdown2' aria-expanded='false' aria-label='Toggle navigation'>" +
    "<i class='fas fa-chevron-down'></i></button></div></li></ul>" 
  }

  if (nickname != null) {
    var append_html = menu +
      "<ul class='navbar-nav ml-auto align-items-center d-none d-lg-flex'>" +
      "<li class='nav-item mr-2 font-size-md'>" +
      "<a class='nav-link text-dark' href='/member/calendar.html'><i class='far fa-calendar-alt'></i></a></li>" +
      "<li class='nav-item mr-2 font-size-md'>" +
      "<a class='nav-link text-dark' href='/member/recent_list.html'><i class='far fa-clock'></i></a></li>" +
      "<li class='nav-item mr-3 font-size-md'>" +
      "<a class='nav-link text-dark' href='/member/cart.html'><i class='fas fa-shopping-cart'></i></a></li>" +
      "<li class='nav-item'><div class='dropdown'>" +
      "<button class='btn border text-dark dropdown-toggle bg-white rounded-xl' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
      "<div class='d-flex'>" +
      "<div class='position-relative mr-2 nav-user-profile'>" +
      "<span class='position-absolute rounded-pill bg-hot-pink nav-user-notify'></span>" +
      "<img src='" +
      img +
      "' class='rounded-circle nav-user-profile-img'></div>" +
      "<span>" +
      nickname +
      "</span></div></button>" +
      "<div class='dropdown-menu dropdown-menu-lg-right rounded-xl' aria-labelledby='dropdownMenuButton'>" +
      "<a class='dropdown-item' href='/member/reserv_list.html'>예약 리스트</a>" +
      "<a class='dropdown-item' href='/member/bookmark_list.html'>찜 리스트</a>" +
      "<a class='dropdown-item' href='/member/myreview_list.html'>나의 이용 후기</a>" +
      "<a class='dropdown-item' href='/member/chat_user_list.html'>채팅</a>" +
      "<a class='dropdown-item' href='/member/myqna_list.html'>1:1 문의<span class='ml-2 d-inline-block rounded-pill align-top mt-1 bg-hot-pink nav-notify'></span></a>" +
      "<div class='dropdown-divider'></div>" +
      "<a class='dropdown-item' href='/member/form_user.html'>회원 정보 관리</a>" +
      "<a class='dropdown-item' href='/host/index.html'>호스트 전환</a>" +
      "<a class='dropdown-item text-hot-pink' href='#x' onclick='onLogout();'>로그아웃</a></div></div></li></ul>" +
      "<ul class='navbar-nav border-top pt-3 m-lg-auto mt-2 font-size-xs d-block d-lg-none'>" +
      "<li class='nav-item mx-lg-3 mx-2 mb-2'>" +
      "<div class='d-flex'><div class='position-relative mr-2 nav-user-profile'>" +
      "<span class='position-absolute rounded-pill bg-hot-pink nav-user-notify'></span>" +
      "<img src='" +
      img +
      "' class='rounded-circle nav-user-profile-img' alt='" +
      nickname +
      "님'></div>" +
      "<span class='align-self-center'>" +
      nickname +
      "</span></div></li>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/member/reserv_list.html'>예약 리스트</a></li>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/member/bookmark_list.html'>찜 리스트</a></li>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/member/myreview_list.html'>나의 이용 후기</a></li>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/member/chat_user_list.html'>채팅</a></li>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/member/myqna_list.html'>1:1 문의<span class='ml-2 d-inline-block rounded-pill align-top mt-1 bg-hot-pink nav-notify'></span></a></li>" +
      "<div class='dropdown-divider'></div>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/member/form_user.html'>회원 정보 관리</a></li>" +
      "<li class='nav-item mx-lg-3 mx-2'><a class='nav-link' href='/host/index.html'>호스트 전환</a></li>" +
      "<li class='nav-item mx-lg-3 mx-2'></li><a class='nav-link text-hot-pink' href='#x'>로그아웃</a></li></ul>";

    $("#navbarNavDropdown").empty();
    $("#navbarNavDropdown").append($(append_html));
  } else {
    $("#navbarNavDropdown").empty();
    $("#navbarNavDropdown").append(
      $(  menu +
          "<ul class='navbar-nav border-top pt-3 m-lg-auto mt-2 font-size-xs d-block d-lg-none'>" +
          "<li class='nav-item mx-lg-3 mx-2 mb-2'>" +
          "<button class='btn btn-block border text-dark dropdown-toggle p-2 bg-white rounded-xl' type='button' data-toggle='modal' data-target='#loginModal'><span>로그인</span></button></li></ul>" +
          "<ul class='navbar-nav ml-auto align-items-center d-none d-lg-flex'>" +
          "<li class='nav-item mr-2 font-size-md'>" +
          "<a class='nav-link text-dark' href='/member/calendar.html'><i class='far fa-calendar-alt'></i></a></li>" +
          "<li class='nav-item mr-2 font-size-md'>" +
          "<a class='nav-link text-dark' href='/member/recent_list.html'><i class='far fa-clock'></i></a></li>" +
          "<li class='nav-item mr-3 font-size-md'>" +
          "<a class='nav-link text-dark' href='/member/purchase.html'><i class='fas fa-shopping-cart'></i></a></li>" +
          "<li class='nav-item'>" +
          "<button class='btn border text-dark dropdown-toggle bg-white rounded-xl' type='button' data-toggle='modal' data-target='#loginModal'><span>로그인</span>" +
          "</button></li></ul>"
      )
    );
  }
}

function copyToClipboard() {
  var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = location.href;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert('링크 복사 완료');
}



function numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}