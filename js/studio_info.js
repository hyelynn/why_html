var url = location.href;
    var value= (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    

    $(document).ready(function(){

        var valnum = Number(value);

            var regexp = /^[0-9]*$/;
            if (!regexp.test(valnum)) {
                alert('접속 오류'); 
                location.href = 'studio.html';  //잘못된 접속 시 페이지 강제 이동
            }
            var xhr = new XMLHttpRequest();
    
            xhr.onreadystatechange = function() { 
                if (xhr.readyState === xhr.DONE) { 
                    if (xhr.status === 200 || xhr.status === 201) {
                        var result = JSON.parse(xhr.responseText);
                        console.log(result[0]);
                        
                        $("#info").append(
                        $("<div class='my-5'>"+
                        "<h4 class='mb-4 text-bullet'>소개</h4>"+
                        "<p class='font-weight-light font-size-s'>"+result+"</p></div>"+
                        "<div class='my-5'>"+
                        "<h4 class='mb-4 text-bullet'>편의시설</h4>"+
                        "<div class='d-flex-fill font-weight-light font-size-s'>"+
                        "<span class='mr-2'>"+result+"</span></div></div>"));
                    } else {

                    }
                }
                else{
                }
            };
            
        xhr.open('POST', 'http://3.34.150.116:3000/studio/info');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("studio_key="+ value); 
    })