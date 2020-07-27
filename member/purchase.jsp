<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.inicis.std.util.SignatureUtil"%>
<%@page import="java.util.*"%>
<%
    //############################################
    // 1.전문 필드 값 설정(***가맹점 개발수정***)
    //############################################

    // 여기에 설정된 값은 Form 필드에 동일한 값으로 설정
    String mid					= "wpartby071";		// 가맹점 ID(가맹점 수정후 고정)					

    //인증
    String signKey			    = "bjdYek1nbjlSd3dmZml5b1JDRmowUT09";	// 가맹점에 제공된 웹 표준 사인키(가맹점 수정후 고정)
    String timestamp			= SignatureUtil.getTimestamp();			// util에 의해서 자동생성

    String oid					= mid+"_"+SignatureUtil.getTimestamp();	// 가맹점 주문번호(가맹점에서 직접 설정)
    String price				= request.getParameter("p");													// 상품가격(특수기호 제외, 가맹점에서 직접 설정);
    
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
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
    <script language="javascript" type="text/javascript" src="HTTPS://stdpay.paywelcome.co.kr/stdjs/INIStdPay.js"
        charset="UTF-8"></script>
</head>

<body>
    <main role="main">
        <form id="SendPayForm_id" name="" method="POST">
            
        </form>
    </main>
</body>

<script>
    function payment() {
        INIStdPay.pay('SendPayForm_id');
    }

    $(document).ready(function () {
        var total_price = sessionStorage.getItem('total');
        var prc = "<%=price%>";

        console.log(total_price + ", " + prc);
        if (total_price != prc) {
            alert('가격 위변조')
            location.href = "/member/purchase.html"
        }

        var sfid = "<input type='hidden' name='version' value='1.0'/>" +
            "<input type='hidden' name='mid' value='wpartby071'/>" +
            "<input type='hidden' name='oid' value='wpartby071_<%=timestamp%>'/>" +
            "<input type='hidden' name='goodname' value='아트바이어스 스튜디오&클래스'/>" +
            "<input type='hidden' name='price' value='" + total_price + "'/>" +
            "<input type='hidden' name='currency' value='WON'/>" +
            "<input type='hidden' name='buyername' value='" + sessionStorage.getItem('name') + "'/>" +
            "<input type='hidden' name='buyertel' value='" + sessionStorage.getItem("phone") + "'/>" +
            "<input type='hidden' name='timestamp' value='<%=timestamp%>'/>" +
            "<input type='hidden' name='signature' value='<%=signature%>'/>" +
            "<input type='hidden' name='returnUrl' value='http://artbyus.co.kr/js/INIStdPayReturn.jsp'/>" +
            "<input type='hidden' name='mKey' value='<%=mKey%>'/>" +
            "<input type='hidden' name='closeUrl' value='http://artbyus.co.kr/js/close.jsp'/>" +
            "<input type='hidden' name='popupUrl' value='http://artbyus.co.kr/js/popup.jsp'/>";
        
        $("#SendPayForm_id").append($(sfid))

        payment();
    });


</script>
</html>

<!-- "<input type='hidden' name='gopaymethod' value='DirectBank'/>" + -->