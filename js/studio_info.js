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
                        console.log(result);

                       



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