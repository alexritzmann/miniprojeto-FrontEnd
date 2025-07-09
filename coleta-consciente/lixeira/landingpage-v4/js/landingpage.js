window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  var scrolled = window.scrollY > 50;
  header.classList.toggle('scrolled', scrolled);});