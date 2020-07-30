//!< 로그아웃과 동시에 지금까지 사용하면서 저장한 세션을 모두 제거
function onLogout() {
  sessionStorage.clear();
  location.reload();
}

//!< 사용자 로그인 체크, 아이디와 비밀번호를 서버에 보내고 이를 서버측에서 검증한 값을 바탕으로
//!< 로그인 성공 실패여부를 체크하며 필요한 정보를 세션에 저장해둠
function normal_login() {
  var email = document.getElementById("login_email").value;
  var pw = document.getElementById("login_pwd").value;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      var result = JSON.parse(xhr.responseText);
      if (
        (xhr.status === 200 || xhr.status === 201) &&
        result.result == "true"
      ) {
        sessionStorage.setItem("id", result.user_email);
        sessionStorage.setItem("nickname", result.user_nickname);
        sessionStorage.setItem("phone", result.user_phone);
        sessionStorage.setItem("name", result.user_name);
        sessionStorage.setItem("prof", result.user_profile);
        sessionStorage.setItem("user_type", result.user_type);
        
        location.reload();
      } else {
        alert("아이디와 비밀번호 중 잘못된 정보가 있습니다.");
        document.getElementById("login_email").value = "";
        document.getElementById("login_pwd").value = "";
        document.getElementById("login_email").focus();
      }
    }
  };

  xhr.open("POST", "http://3.34.150.116:3000/user/login");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("user_id=" + email + "&user_pw=" + pw);
}
