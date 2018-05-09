export function elementInViewport(el) {
  //IN VIEW 250PX FROM BOTTOM - change below to num needed
  var amount = 250;
  var rect = el.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight + amount || html.clientHeight + amount) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
  //ALL PARTS IN VIEW
  // var top = el.offsetTop;
  // var left = el.offsetLeft;
  // var width = el.offsetWidth;
  // var height = el.offsetHeight;
  //
  // while(el.offsetParent) {
  //   el = el.offsetParent;
  //   top += el.offsetTop;
  //   left += el.offsetLeft;
  // }
  //
  // return (
  //   top >= window.pageYOffset &&
  //   left >= window.pageXOffset &&
  //   (top + height) <= (window.pageYOffset + window.innerHeight) &&
  //   (left + width) <= (window.pageXOffset + window.innerWidth)
  // );

  // ANY PART IN VIEW
  // const rect = el.getBoundingClientRect();
  //   // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
  //   const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  //   const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
  //
  //   // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
  //   const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  //   const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  //
  //   return (vertInView && horInView);
}
