var access_token;
var refresh_token;
var email;

// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('d88bea310f4a39afbea3146fe1c0fa72');

// SDK 초기화 여부를 판단합니다.
console.log(Kakao.isInitialized());

$("#kakao_login").on("click", function() {

    Kakao.Auth.login({
        scope: 'account_email',
        success: function(response) {

          access_token = response.access_token;
          refresh_token = response.refresh_token;
          location.href = "http://artbyus.co.kr/member/test.html";
          
        },
        fail: function(error) {
     
        },
      });
});


Kakao.API.request({
    url: '/v2/user/me',
    success: function(response) {
        
        $('#user_id').val(response.kakao_account.email);
        $('#user_nickname').val(response.properties.nickname);


    },
    fail: function(error) {

    }
});