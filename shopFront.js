const mobNavWrapper = document.getElementById('om-Nav');
const mobSlideWrapper = document.getElementById('mob_SlideWrapper');
const mobPageWrapper = document.getElementById('mob_PageWrapper');

mobSlideWrapper.addEventListener('click', function (event) {
  const elementClass = event.target.classList;
  let elChild;
  let parElement;

  // I show sub menu. I show scroll bar for sub menu if submenu longer than view height
  if (elementClass.contains('mm-slideWrap__parentLI')) {
    elChild = event.target.children[2];
    elChild.classList.add('om-subWrap--width-cal140');
    mobSlideWrapper.classList.add('om-slideWrap--overflow-scroll');
  }
  // I hide sub menu. I hide scroll bar for the submenu
  if (elementClass.contains('am-subWrap__titleLink')) {
    parElement = event.target.parentElement.parentElement;
    parElement.classList.remove('om-subWrap--width-cal140');
    mobSlideWrapper.classList.remove('om-slideWrap--overflow-scroll');
  }
  // I close the main slide navigation
  if (elementClass.contains('am-slideWrap__closeWrap')) {
    mobSlideWrapper.classList.remove('om-slideWrap--left-cal54');
    mobPageWrapper.classList.remove('pm-pageWrap--left-calc54');
  }
});

mobNavWrapper.addEventListener('click', function (event) {
  const elementClass = event.target.classList;
  // If parent list item is clicked I display the submenu list
  if (elementClass.contains('mm-Nav__iconBars')) {
    mobSlideWrapper.classList.add('om-slideWrap--left-cal54');
    mobPageWrapper.classList.add('pm-pageWrap--left-calc54');
  }
});

window.addEventListener('resize', function (event) {
  if (window.innerWidth > 700) {
    mobSlideWrapper.className = 'om-slideWrap';
    mobPageWrapper.className = 'pm-pageWrap';
  }
});