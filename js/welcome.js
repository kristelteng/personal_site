// $(function() {
//   $(".typing-element").typed({
//     strings: ["Kristel", "a Developer", "a UX/UI Designer", "ambitious", "friendly", "Kristel"],
//     typeSpeed: 100,
//     contentType: 'html',
//     loop: true,
//     loopCount: 1,
//     showCursor: true,
//     cursorChar: "|",
//   });
// });

function isMobile() {
 return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if(!isMobile()) {
  $(function() {
    $(".typing-element").typed({
      strings: ["Kristel", "a Developer", "a UX/UI Designer", "ambitious", "friendly", "Kristel"],
      typeSpeed: 100,
      contentType: 'html',
      loop: true,
      loopCount: 1,
      showCursor: true,
      cursorChar: "|",
    });
  });
}



// $(document).ready(function()
// {
//   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent) == false) {
//     new simpleIntro();
//   }
// });