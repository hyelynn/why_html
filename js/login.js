function normal_login() {
  var email = document.getElementById("login_email").value;
  var pw = document.getElementById("login_pwd").value;
  // var data = {'email' : mail, 'pwd' : pwd};
  //alert(sessionStorage.getItem('id'));
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      var result = JSON.parse(xhr.responseText);
      if (
        (xhr.status === 200 || xhr.status === 201) &&
        result.result == "true"
      ) {
        //alert(result.user_nickname);
        sessionStorage.setItem("id", result.user_key);
        sessionStorage.setItem("nickname", result.user_nickname);
        window.location.href = "index.html";
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