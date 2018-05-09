export function sectionScroll(el) {
  // IE 11 FIX
  if (/*@cc_on!@*/false || !!document.documentMode) {
    document.querySelector(el).scrollIntoView(true);
      window.scrollBy(0, -100)
  } else {
    //ALL OTHER BROWSERS
    document.querySelector(el).scrollIntoView({
      behavior: 'smooth'
    });
  }
}
