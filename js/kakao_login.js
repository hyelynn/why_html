var access_token;
var refresh_token;
var email;


$("#kakao_login").on("click", function() {

    Kakao.Auth.login({
        scope: 'account_email',
        success: function(response) {

          access_token = response.access_token;
          refresh_token = response.refresh_token;
          location.href = "http://localhost:8080/member/test.html";
          
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