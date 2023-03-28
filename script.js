'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////
/// Scrolling

btnScrollTo.addEventListener('click', function (e) {
  // Get the coordinates of the el that we want ot scroll to
  const s1coords = section1.getBoundingClientRect(); // this method is relative to visible viewport (x and y properties change values as we scroll and change position of the element on viewport basically)

  // console.log(s1coords); //  DOMrect with positions, x and y positions, width and height of the element....
  // console.log(e.target.getBoundingClientRect()); // e.target is element that was clicked (here it's btnScrollTo)
  // current scroll position:
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // height and width of viewport (without scroll bars, just the area available for content):
  // console.log(
  //   'height/width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // current position with current scroll

  // making scroll smooth with passing in an object instead just argument:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // more modern way of doing this:
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////
//// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // bc href looks like id of section to scroll into

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation
// 1. add event listener to a common parent element of all the elements that we're interested in
// 2. in that event listener determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy (to find only links that we are interested in, bc we want event only when we click on certain parts, not the entire container of nav bar)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // there are span elements on the button that we can accidentally click, so we need to use closest() to find right element, to find a perent that matches a certain query

  // Guard clause
  if (!clicked) return; // if there's nothing clicked then we want to immediately finish this func

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////
// Menu fade animation

// (mouseenter doesn't bubble, mouseover bubbles up)

const handleHover = function (e, opacity) {
  // there are no chinld elements that we could accidentally click when we click on links, so we don't need closest():
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   // opposite of mouseover, to undo things that happen with mouseover
//   handleHover(e, 1);
// });

// better way - using bind() that creates a copy of the function that is called on and it will set this kw in this funcion call to whatever value that we pass into bind

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// it's impossible to pass another argument into and eventHandler function, it only has 1 parameter which is event. so if we want to pass additional values into the handler function that we need to use this kw, that becomes possible with using bind()
