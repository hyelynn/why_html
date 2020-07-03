function kakao_login(){
    var access_token;
    var refresh_token;
    var email;
    
    Kakao.Auth.login({
        scope: 'account_email',
        success: function(response) {

          access_token = response.access_token;
          refresh_token = response.refresh_token;
          location.href = "http://artbyus.co.kr/why_html/member/test.html";
          
        },
        fail: function(error) {
     
        },
      });
}

function normal_login(){
    var email = document.getElementById("login_email").value;
    var pw = document.getElementById("login_pwd").value;
    // var data = {'email' : mail, 'pwd' : pwd};
    alert(sessionStorage.getItem('id'));
    var xhr = new XMLHttpRequest();       
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) { 
            if (xhr.status === 200 || xhr.status === 201) {
                var result = JSON.parse(xhr.responseText);
                alert(result.user_nickname);
                sessionStorage.setItem('id',result.user_key);
                sessionStorage.setItem('nickname',result.user_nickname);
                window.location.href="index.html";
            } else {
                alert("아이디와 비밀번호 중 잘못된 정보가 있습니다.");
                document.getElementById("login_email").value = "";
                document.getElementById("login_pwd").value = "";
                document.getElementById("login_email").focus();
            }
        }else{
            // alert("0::"+xhr.status);
        }
    };

    xhr.open('POST', 'http://3.34.150.116:3000/user/login');
    xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xhr.send("user_id="+email+"&user_pw="+pw);
} 


/* 설정정보를 초기화하고 연동을 준비 */
function naver_login() {
    var naverLogin = new naver.LoginWithNaverId(
        {
            clientId: "hZjBhAXkL54BXTOXsjWw",
            callbackUrl: "http://artbyus.co.kr/why_html/member/test.html",
            isPopup: true, /* 팝업을 통한 연동처리 여부 */
            callbackHandle: true /* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
        }
    );

    naverLogin.init();
    naverLogin.getLoginStatus(function (status) {
        if (status) {
            var email = naverLogin.user.getEmail();
            
            $('#user_id').val(naverLogin.user.getEmail()); //이메일 가져오기
            $('#user_nickname').val(naverLogin.user.getNickName()); //nickname 가져오기
            
            console.log(email);			
            var uniqId = naverLogin.user.getId();
            
        } else {
            console.log("AccessToken이 올바르지 않습니다.");
        }
    });
}