//top scroll percentage indicator

var scrollProgress = document.getElementById('scroll-progress');
var height =
document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
   const scrollTop =
     document.body.scrollTop || document.documentElement.scrollTop;
   scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});

//side scroll indicator points

window.addEventListener('scroll', () => {
  var circles = document.getElementsByClassName('circle');
  const scrollPosition =
     document.body.scrollTop || document.documentElement.scrollTop;
  const scrollPercent = (scrollPosition / height) * 100;
  
  if(scrollPercent >= 0 && scrollPercent <= 12.5) {
    scaleCircleAndColor(0);
  } else if (scrollPercent >= 12.5 && scrollPercent <= 37.5) {
    scaleCircleAndColor(1);
  } else if (scrollPercent >= 37.5 && scrollPercent <= 62.5) {
    scaleCircleAndColor(2);
  } else if (scrollPercent >= 62.5 && scrollPercent <= 87.5) {
    scaleCircleAndColor(3);
  } else if (scrollPercent >= 87.5 && scrollPercent <= 100) {
    scaleCircleAndColor(4);
  }

  function scaleCircleAndColor(index) {
    for(let i=0; i < circles.length; i++) {
      if(i == index) {
        circles[i].style.transform = "scale(1.5)";
        circles[i].style.backgroundColor = "#F7C860";
      } else {
        circles[i].style.transform = "scale(1)";
        circles[i].style.backgroundColor = "transparent";
      }
    }
  }
});


//navigation bar color change
var nav = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 50) {
    nav.classList.add('scrolled');
  }
  else {
    nav.classList.remove('scrolled');
  }
});

// sidenav open and close

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//page 2 (about section) on small screen
window.addEventListener('resize', () => {
  
  back = document.getElementById('back-icon');
  next = document.getElementById('next-icon');
  docWidth = window.innerWidth;
  let slideIndex = 1;
  let slides = document.getElementsByClassName("content");

  showSlides(slideIndex);

  if(docWidth <= 1000) {
    back.addEventListener('click', () => {
      plusSlides(-1);
    });
    next.addEventListener('click', () => {
      plusSlides(1);
    });
  } else if(window.innerWidth > 1000){
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "flex";  
    }
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    let i;
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "flex"; 
  }  
});

//form submission

var form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}