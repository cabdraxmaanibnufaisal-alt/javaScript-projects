// 'use strict';

// /**
//  * add event on multiple elements
//  */

// const addEventOnElements = function (elements, eventType, callback) {
//   for (let i = 0, len = elements.length; i < len; i++) {
//     elements[i].addEventListener(eventType, callback);
//   }
// }



// /**
//  * MOBILE NAVBAR
//  * navbar will show after clicking menu button
//  */

// const navbar = document.querySelector("[data-navbar]");
// const navToggler = document.querySelector("[data-nav-toggler]");
// const navLinks = document.querySelectorAll("[data-nav-link]");

// const toggleNav = function () {
//   navbar.classList.toggle("active");
//   this.classList.toggle("active");
// }

// navToggler.addEventListener("click", toggleNav);

// const navClose = () => {
//   navbar.classList.remove("active");
//   navToggler.classList.remove("active");
// }

// addEventOnElements(navLinks, "click", navClose);



// /**
//  * HEADER and BACK TOP BTN
//  * header and back top btn will be active after scrolled down to 100px of screen
//  */

// const header = document.querySelector("[data-header]");
// const backTopBtn = document.querySelector("[data-back-top-btn]");

// const activeEl = function () {
//   if (window.scrollY > 100) {
//     header.classList.add("active");
//     backTopBtn.classList.add("active");
//   } else {
//     header.classList.remove("active");
//     backTopBtn.classList.remove("active");
//   }
// }

// window.addEventListener("scroll", activeEl);



// /**
//  * Button hover ripple effect
//  */

// const buttons = document.querySelectorAll("[data-btn]");

// const buttonHoverRipple = function (event) {
//   this.style.setProperty("--top", `${event.offsetY}px`);
//   this.style.setProperty("--left", `${event.offsetX}px`);
// }

// addEventOnElements(buttons, "mousemove", buttonHoverRipple);



// /**
//  * Scroll reveal
//  */

// const revealElements = document.querySelectorAll("[data-reveal]");

// const revealElementOnScroll = function () {
//   for (let i = 0, len = revealElements.length; i < len; i++) {
//     const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

//     if (isElementInsideWindow) {
//       revealElements[i].classList.add("revealed");
//     }
//   }
// }

// window.addEventListener("scroll", revealElementOnScroll);

// window.addEventListener("load", revealElementOnScroll);



// /**
//  * Custom cursor
//  */

// const cursor = document.querySelector("[data-cursor]");
// const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

// const cursorMove = function (event) {
//   cursor.style.top = `${event.clientY}px`;
//   cursor.style.left = `${event.clientX}px`;
// }

// window.addEventListener("mousemove", cursorMove);

// addEventOnElements(hoverElements, "mouseover", function () {
//   cursor.classList.add("hovered");
// });

// addEventOnElements(hoverElements, "mouseout", function () {
//   cursor.classList.remove("hovered");
// });





//


'use strict';

/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR
 * navbar will show after clicking menu button
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);

// close menu when clicking outside it
document.addEventListener("click", function (event) {
  const clickedInsideNav = navbar.contains(event.target);
  const clickedToggler = navToggler.contains(event.target);

  if (navbar.classList.contains("active") && !clickedInsideNav && !clickedToggler) {
    navClose();
  }
});

// close menu on Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") navClose();
});



/**
 * HEADER and BACK TOP BTN
 * header and back top btn will be active after scrolled down to 100px of screen
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);



/**
 * SMOOTH SCROLL + ACTIVE NAV LINK
 * clicking a nav link (or any in-page anchor) scrolls smoothly,
 * and the link matching the section currently in view gets "active"
 */

addEventOnElements(document.querySelectorAll('a[href^="#"]'), "click", function (event) {
  const targetId = this.getAttribute("href");
  if (!targetId || targetId === "#") return; // placeholder links (e.g. "contact") stay as-is

  const targetEl = document.querySelector(targetId);
  if (!targetEl) return;

  event.preventDefault();
  targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

const sections = [...navLinks]
  .map(function (link) {
    const href = link.getAttribute("href");
    return (href && href !== "#") ? document.querySelector(href) : null;
  })
  .filter(Boolean);

const updateActiveLink = function () {
  if (!sections.length) return;

  let currentId = sections[0].id;
  for (let i = 0, len = sections.length; i < len; i++) {
    if (sections[i].getBoundingClientRect().top <= 120) currentId = sections[i].id;
  }

  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);



/**
 * Button hover ripple effect
 */

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);



/**
 * Scroll reveal
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);



/**
 * Custom cursor
 */

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});



/**
 * JOIN CTA BUTTONS ("join our team" / "Join With Us")
 * these currently point at href="#" with nowhere to go, so clicking
 * them scrolls to the newsletter signup form (the only real form on
 * the page) and focuses the email field, since that's the actual way
 * to get in touch right now
 */

const joinButtons = document.querySelectorAll('[data-btn][href="#"]');
const signupForm = document.querySelector(".footer-form");

addEventOnElements(joinButtons, "click", function (event) {
  if (!signupForm) return;

  event.preventDefault();
  signupForm.scrollIntoView({ behavior: "smooth", block: "center" });

  const emailInput = signupForm.querySelector('input[type="email"]');
  if (emailInput) {
    setTimeout(function () { emailInput.focus(); }, 400); // wait for the scroll to settle
  }
});



/**
 * NEWSLETTER FORM
 * validates the email and shows feedback instead of navigating to index.html
 */

const newsletterForm = document.querySelector(".footer-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let feedback = newsletterForm.querySelector(".form-feedback");
    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "form-feedback";
      newsletterForm.appendChild(feedback);
    }

    if (!emailPattern.test(email)) {
      feedback.textContent = "Please enter a valid email address.";
      feedback.classList.remove("success");
      feedback.classList.add("error");
      if (emailInput) emailInput.focus();
      return;
    }

    feedback.textContent = `Thanks! We'll send updates to ${email}.`;
    feedback.classList.remove("error");
    feedback.classList.add("success");
    newsletterForm.reset();
  });
}



/**
 * NEWS "READ MORE" DETAILS MODAL
 * clicking "Read More" on a news card opens a modal with that card's
 * banner, tag, meta, title and text. The modal markup is built here in
 * JS so the HTML file itself doesn't need to change.
 */

const readMoreLinks = document.querySelectorAll(".news-card .link.has-before");
let lastNewsTrigger = null;

if (readMoreLinks.length) {

  const newsModal = document.createElement("div");
  newsModal.className = "news-modal";
  newsModal.setAttribute("data-news-modal", "");
  newsModal.innerHTML = `
    <div class="news-modal-overlay" data-news-modal-overlay></div>
    <div class="news-modal-content" role="dialog" aria-modal="true" aria-label="news details">
      <button type="button" class="news-modal-close" aria-label="close details" data-news-modal-close>&times;</button>
      <figure class="news-modal-banner img-holder"></figure>
      <div class="news-modal-body">
        <span class="news-modal-tag"></span>
        <ul class="news-modal-meta card-meta-list"></ul>
        <h3 class="news-modal-title"></h3>
        <p class="news-modal-text"></p>
      </div>
    </div>
  `;
  document.body.appendChild(newsModal);

  const newsModalBanner = newsModal.querySelector(".news-modal-banner");
  const newsModalTag = newsModal.querySelector(".news-modal-tag");
  const newsModalMeta = newsModal.querySelector(".news-modal-meta");
  const newsModalTitle = newsModal.querySelector(".news-modal-title");
  const newsModalText = newsModal.querySelector(".news-modal-text");

  const openNewsModal = function (card) {
    const banner = card.querySelector(".card-banner");
    const tag = card.querySelector(".card-tag");
    const metaList = card.querySelector(".card-meta-list");
    const title = card.querySelector(".card-title");
    const text = card.querySelector(".card-text");

    newsModalBanner.innerHTML = banner ? banner.innerHTML : "";
    newsModalTag.innerHTML = tag ? tag.innerHTML : "";
    newsModalMeta.innerHTML = metaList ? metaList.innerHTML : "";
    newsModalTitle.textContent = title ? title.textContent.trim() : "";
    newsModalText.textContent = text ? text.textContent.trim() : "";

    newsModal.classList.add("active");
    document.body.classList.add("modal-open");
    newsModal.querySelector("[data-news-modal-close]").focus();
  };

  const closeNewsModal = function () {
    newsModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (lastNewsTrigger) lastNewsTrigger.focus();
  };

  newsModal.querySelector("[data-news-modal-overlay]").addEventListener("click", closeNewsModal);
  newsModal.querySelector("[data-news-modal-close]").addEventListener("click", closeNewsModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && newsModal.classList.contains("active")) closeNewsModal();
  });

  addEventOnElements(readMoreLinks, "click", function (event) {
    event.preventDefault();
    const card = this.closest(".news-card");
    if (!card) return;

    lastNewsTrigger = this;
    openNewsModal(card);
  });
}