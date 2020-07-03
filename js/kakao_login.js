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
