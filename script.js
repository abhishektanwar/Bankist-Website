'use strict';

const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

buttonScrollTo.addEventListener('click', function (e) {
  // first we need to get the coordinates of the element/section we want to scroll to
  // getBoundingClientRect is relative to the viewport , values here changes as we scroll 
  const s1coords = section1.getBoundingClientRect();
  console.log("s1coords", s1coords);
  // top of the page to position of scrollbar 
  console.log("current scroll (X,Y)", window.pageXOffset, window.pageYOffset);

  // height and width of the viewport in which we are seeing the web page
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // scrolling method 1
  // s1coords.top gives distance b/w target element to scroll to from start of viewport
  // wehere as scrollTo take distance from top of page . So we add scrollY if page is scrolled to reach correct position
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY)

  // for smooth scrolling
  // window.scrollTo({ left: s1coords.left + window.scrollX, right: s1coords.top + window.scrollY, behavior: 'smooth' })
  // scrolling modern way
  section1.scrollIntoView({ behavior: 'smooth' })
});

// PAGE NAVIGATION W/O EVENT DELEGATION
// document.querySelectorAll('.nav__links').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// });


// PAGE NAVIGATION W/ EVENT DELEGATION
// STEPS:
// 1:Add event listener to a common parent element
// 2:Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }

})

// TABBED COMPONENTS
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  //if we are clicking the span element then also we need the button element
  // parent of the span elt, so closest(<target class name>) gives the closest
  // parent elt with that class name
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  // activate content area
  tabsContent.forEach(tabContent => tabContent.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// sticky navigation
const inititalCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > inititalCoords.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
})

// revealing elements on scroll

// SLIDER COMPONENT
// What we basically do in slider component is keep all the slides side by side and make
// only one slide visible using overflow:hidden.Then as we click left and right arrows , move the 
// slides accordingly using transform

const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length;
slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * index}%)`)
btnRight.addEventListener('click', function (e) {
  if (currentSlide === maxSlide - 1) { currentSlide = 0 }
  else currentSlide++;
  slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
  activateDot(currentSlide)
})

btnLeft.addEventListener('click', function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else { currentSlide-- }
  slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
  activateDot(currentSlide)
})

const dotContainer = document.querySelector(".dots")

const createDots = function () {
  slides.forEach((slide, index) => {
    dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    )
  })
}
createDots();
const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    slides.forEach((s, index) => s.style.transform = `translateX(${100 * (index - slide)}%)`);
    activateDot(slide)
  }
})

activateDot(0);
