/* Custom Select */
var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("parqueoo__select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

/* Waiting till the content is ready */
document.body.className += 'js-loading';
window.addEventListener('load', showPage, false);
function showPage(){
  document.body.className = document.body.className.replace('js-loading','')
}

/* Scroll Animations */
// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementToShow = document.querySelectorAll('.js-show-on-scroll'); 
let elementToShowArr = Array.prototype.slice.call(elementToShow,0); 
function loop(){
  elementToShowArr.forEach(function (element){
    if(isElementInViewport(element)){
      element.classList.add('is-visible');
    }else{
      element.classList.remove('is-visible');
    }
  });
  scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

//togle side NAv
var burgerBtn = document.getElementById('burgerBtn');
var sidebarNav = document.querySelector('.sidebar__nav');
var responsiveLinks =  sidebarNav.lastElementChild.children;
var arrLinks = Array.prototype.slice.call(responsiveLinks);
var headerNav = document.querySelector('.header__nav');
var headerLinks =  headerNav.lastElementChild.children;
var arrHeaderLinks = Array.prototype.slice.call(headerLinks);
burgerBtn.addEventListener('click', function() {  
  sidebarNav.classList.toggle('open');
}, false);

arrLinks.forEach(item => {
  item.addEventListener('click', function() {
    arrLinks.forEach(el => {
      el.classList.remove('active');
    })
    item.classList.toggle('active');
    sidebarNav.classList.toggle('open');
  }, false);
})

arrHeaderLinks.forEach(item => {
  item.addEventListener('click', function() {
    arrHeaderLinks.forEach(el => {
      el.classList.remove('active');
    })
    item.classList.toggle('active');
  }, false);
})