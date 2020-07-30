//!< HTML 파일들을 분할하기 위해 제공하는 함수 
//!< 해당 함수를 호출하게 되면, include-html 속성을 가진 값에서 html 파일을 읽어옴

function includeHTML(callback) {
    var z, i, elmnt, file, xhr;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      //console.log(file);
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML(callback);
          }
        };
        xhr.open("GET", file, true);
        xhr.send();
        /*exit the function:*/
        return;
      }
    }
    setTimeout(function() {
      callback();
    }, 0);
  }

  function includeRouter(cb) {
    var content, file, xhttp, i;
    document.body.addEventListener("click", e => {
      file = e.target.getAttribute("route-link");
      if (file) {
        content = document.getElementById("content");
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              content.innerHTML = this.responseText;
              var scripts = content.getElementsByTagName("script");
              for (var i = 0; i < scripts.length; i++) {
                eval(scripts[i].text);
              }
              setTimeout(function() {
                cb(e);
              }, 0);
            }
            if (this.status == 404) {
              content.innerHTML = "Page not found.";
            }
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
      }
    });
  }