var naverLogin = new naver.LoginWithNaverId(
    {
        clientId: "hZjBhAXkL54BXTOXsjWw",
        callbackUrl: "http://localhost:8080/member/test.html",
        isPopup: true, /* 팝업을 통한 연동처리 여부 */
        callbackHandle: true /* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
    }
);

/* 설정정보를 초기화하고 연동을 준비 */
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