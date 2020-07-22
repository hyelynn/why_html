<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.inicis.std.util.SignatureUtil"%>
<%@page import="java.util.*"%>
<%
    //############################################
    // 1.전문 필드 값 설정(***가맹점 개발수정***)
    //############################################

    // 여기에 설정된 값은 Form 필드에 동일한 값으로 설정
    String mid					= "welcometst";		// 가맹점 ID(가맹점 수정후 고정)					

    //인증
    String signKey			    = "QjZXWDZDRmxYUXJPYnMvelEvSjJ5QT09";	// 가맹점에 제공된 웹 표준 사인키(가맹점 수정후 고정)
    String timestamp			= SignatureUtil.getTimestamp();			// util에 의해서 자동생성

    String oid					= mid+"_"+SignatureUtil.getTimestamp();	// 가맹점 주문번호(가맹점에서 직접 설정)
    String price				= "1000";													// 상품가격(특수기호 제외, 가맹점에서 직접 설정)

    String cardNoInterestQuota	= "11-2:3:,34-5:12,14-6:12:24,12-12:36,06-9:12,01-3:4";		// 카드 무이자 여부 설정(가맹점에서 직접 설정)
    String cardQuotaBase		= "2:3:4:5:6:11:12:24:36";		// 가맹점에서 사용할 할부 개월수 설정

    //###############################################
    // 2. 가맹점 확인을 위한 signKey를 해시값으로 변경 (SHA-256방식 사용)
    //###############################################
    String mKey = SignatureUtil.hash(signKey, "SHA-256");

    //###############################################
    // 2.signature 생성
    //###############################################
    Map<String, String> signParam = new HashMap<String, String>();

    signParam.put("mKey", mKey);				// 필수
    signParam.put("oid", oid); 					// 필수
    signParam.put("price", price);				// 필수
    signParam.put("timestamp", timestamp);		// 필수

    // signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
    String signature = SignatureUtil.makeSignature(signParam);
%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ART BY US</title>

    <!-- Bootstrap 4.3.1 -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script language="javascript" type="text/javascript" src="HTTPS://tstdpay.paywelcome.co.kr/stdjs/INIStdPay.js" charset="UTF-8"></script>

    <!-- Custom -->
    <link rel="stylesheet" href="/css/custom.css">
    <script src="/js/custom.js"></script>
    <!-- <script src="/js/payment.js"></script> -->
    <script src="/js/include.js"></script>
    <!-- Fontawesome -->
    <link rel="stylesheet" href="/css/fontawesome/css/all.min.css">
</head>

<body onload="INIStdPay.allowpopup();"> 
    <script src="https://cdn.bootpay.co.kr/js/bootpay-3.2.4.min.js" type="application/javascript"></script>
    <modal include-html="/include/header.html"></modal>
    <div class="py-md-3 px-5 py-2 text-center text-white bg-deep-dark top-notice">
        <span class="font-weight-light">코로나19에 대한 아트바이어스의 대책 및 환불 정책에 대한 최신 정보를 확인하세요.</span>
        <a href="#x" class="text-white d-lg-inline-block d-block">자세히 알아보기</a>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light py-lg-3 py-1">
        <div class="container">
            <a class="navbar-brand" href="/index.html"><img src="http://artbyus.co.kr/img/logo.png"
                    srcset="http://artbyus.co.kr/img/logo@2x.png 2x, http://artbyus.co.kr/img/logo@3x.png 3x"></a>
            <div class="ml-auto align-items-center d-lg-none d-flex">
                <a class="text-dark mr-3 font-size-sm" href="/member/calendar.html"><i
                        class="far fa-calendar-alt"></i></a>
                <a class="text-dark mr-3 font-size-sm" href="/member/recent_list.html"><i
                        class="far fa-clock"></i></a>
                <a class="text-dark mr-2 font-size-sm" href="/member/purchase.html"><i
                        class="fas fa-shopping-cart"></i></a>
            </div>
            <button class="navbar-toggler border-0 font-size-md text-dark" type="button" data-toggle="collapse"
                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown"></div>
        </div>
    </nav>
    <script src="/js/header.js"></script>

    <main role="main">
        <div class="container my-md-5 my-3">
            <h3 class="mb-4">결제</h3>

            <!-- list -->
            <div class="mb-5">
                <h5 class="mb-4">예약 및 구입정보</h5>

                <div class="border mb-4">
                    <ul class="list-group list-group-flush cart-list" id="cart"> </ul>
                </div>

                <!-- price -->
                <div class="d-flex justify-content-between" id="price">
                    
                </div>
            </div>

            <!-- orderer form -->
            <div class="mb-5">
                <h5 class="mb-4">예약 및 구매자 정보</h5>

                <div class="custom-inputs-sub mb-3" id="user"></div>

                <div class="d-flex mb-4 custom-inputs">
                    <input type="checkbox" class="custom-checkbox mr-2" id="order_def">
                    <label for="order_def" class="mb-0">예약자 정보와 다를 경우 체크해 주세요.(동일한 예약자로 진행해야 중복결제가 가능합니다.)</label>
                </div>
            </div>

            <!-- refund -->
            <div class="mb-5">
                <h5 class="mb-4">환불규정</h5>
                <refund include-html="/include/refund.html"></refund>
                

                <div class="d-flex mb-4 custom-inputs">
                    <input type="checkbox" class="custom-checkbox mr-2" id="order_refund">
                    <label for="order_refund" class="mb-0">환불규정에 대한 정보를 이해하였으며 이에 동의합니다.</label>
                </div>
            </div>

            <!-- payment -->
            <div class="mb-5">
                <!-- <h5 class="mb-4">결제방식 선택</h5>

                <div class="border mb-3">
                    <div class="d-flex justify-content-between px-lg-5 py-lg-4 p-3 custom-inputs">
                        <div class="d-flex align-items-center">
                            <input type="radio" name="payment" class="custom-radio mr-lg-3 mr-2" id="nPay">
                            <label for="nPay" class="mb-0"><img src="/img/logo_Npay.png" class="payment-logo" alt="..."></label>
                        </div>
                        <div class="d-flex align-items-center">
                            <input type="radio" name="payment" class="custom-radio mr-lg-3 mr-2" id="kakaoPay">
                            <label for="kakaoPay" class="mb-0"><img src="/img/logo_kakaoPay.png" class="payment-logo" alt="..."></label>
                        </div>
                        <div class="d-flex align-items-center">
                            <input type="radio" name="payment" class="custom-radio mr-lg-3 mr-2" id="creditCard">
                            <label for="creditCard" class="font-weight-light font-size-s mb-0">신용카드 결제</label>
                        </div>
                        <div class="d-flex align-items-center">
                            <input type="radio" name="payment" class="custom-radio mr-lg-3 mr-2" id="depBank">
                            <label for="depBank" class="font-weight-light font-size-s mb-0">무통장입금</label>
                        </div>
                    </div>
                </div> -->

                <div class="d-flex mb-4 custom-inputs">
                    <input type="checkbox" class="custom-checkbox mr-2" id="order_payment">
                    <label for="order_payment" class="mb-0">
                        서비스 및 결제방식에 대한 내용을 이해하였으며 이에 동의합니다.
                        <a href="/sub/payment_notice.html" class="text-dark" target="_blank">(보기)</a>
                    </label>
                </div>
            </div>

            <!-- button -->
            <div class="custom-inputs">
                <button type="button" id="send" onClick="INIStdPay.pay('SendPayForm_id')" class="btn btn-block bg-yellow">결제 진행하기</button>
            </div>
        </div>

        <form id="SendPayForm_id" name="" method="POST" ></form>
    </main>

    
    <footer include-html="/include/footer.html"></footer>
    <script src="/js/naver_login.js"></script>
    <script src="/js/login.js"></script>

    <script>includeHTML();</script>
    <script>login_header();</script>
</body>


</html>