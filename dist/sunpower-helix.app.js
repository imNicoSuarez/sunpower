// var lockScroll;

// var SunPowerHelixScroll = function(canvasId, numFrame) {

//   // Definitions
//   var totalFrames, frames, currentFrame, canvasSizeInterval;
//   var TIMEOUT_AUTO_ANIMATION = 10;
//   var TIMEOUT_AUTO_SCROLL_ANIMATION = 10


//   lockScroll = false;

//   var canvas = document.getElementById(canvasId);
//   var context = canvas.getContext('2d');

//   var pauseFrame = [{keyFrame: 0,  selector: '', delay: 0, isShow: false},
//                     {keyFrame: 80, selector: '.js-intro', delay: 100, sizeAutoScroll: 0, isActive: false, isShow: true},
//                     {keyFrame: 365, selector: '.js-plataform', delay: 100, sizeAutoScroll: 200, isActive: false, isShow: true},
//                     {keyFrame: 568, selector: '.js-maxeon', delay: 100, sizeAutoScroll: 30, isActive: false, isShow: true},
//                     {keyFrame: 590, selector: '.js-design', delay: 100, sizeAutoScroll: 22, isActive: false, },
//                     {keyFrame: 612, selector: '.js-hardware', delay: 100, sizeAutoScroll: 18, isActive: false, isShow: true},
//                     {keyFrame: 630, selector: '.js-whole-system', delay: 100, sizeAutoScroll: 20, isActive: false, isShow: true},
//                     {keyFrame: 700, selector: '.js-on-roof', delay: 100, sizeAutoScroll: 70, isActive: false, isShow: true},
//                     {keyFrame: 833, selector: '.js-components', delay: 100, sizeAutoScroll: 100, isActive: false, isShow: true},
//                     {keyFrame: 992, selector: '.js-office', delay: 100, sizeAutoScroll: 70, isActive: false, isShow: true},
//                     {keyFrame: 1070, selector: '', delay: 100, sizeAutoScroll: 50, isActive: false, isShow: true},
//                     {keyFrame: numFrame, selector: '', delay: 0, isShow: false},];

//   var bodyContextList = [{keyFrameStart: 0,   keyFrameEnd: 150, context: 's-dark'},
//                          {keyFrameStart: 160, keyFrameEnd: 180, context: 's-dark'},
//                          {keyFrameStart: 234, keyFrameEnd: 290, context: 's-dark'},
//                          {keyFrameStart: 500, keyFrameEnd: 530, context: 's-dark'},
//                          {keyFrameStart: 750, keyFrameEnd: 870, context: 's-dark'},
//                          {keyFrameStart: 1067, keyFrameEnd: numFrame, context: 's-dark'}];

//   var getFrames = function() {
//     totalFrames = numFrame;
//     frames      = new Array();

//     var interval = 10;

//     var iterate = function(num) {
//       var num = num;
//       if (interval < totalFrames){
//         if (num == interval) {

//           interval += 10;
//           iterate(num);

//         } else {
//           num += 1;
//           setTimeout(function(){
//             var filepath = 'images/background/movie_' + num + '.jpg';
//             var img = new Image;
//             img.src = filepath;
//             frames.push(img);

//             iterate(num);
//           }, 1);
//         }
//       }
//     }

//     iterate(0)

//   }

//   var setImage = function(newLocation) {
//     if (typeof frames[newLocation] !== 'undefined') {
//       context.drawImage(frames[newLocation], 0, 0, 1280, 720);
//     }
//   }

//   var setImageOnLoad = function(){
//     var base_image = new Image();

//     base_image.src    = 'images/background/movie_1.jpg';
//     base_image.onload = function(){
//       context.drawImage(base_image, 0, 0, 1280, 720);
//     }
//   }

//   // Functions
//   var sizeByViewport = function() {
//     canvasSizeInterval = setInterval(function(){
//       $(canvas).width($(window).width())
//                .height($(window).height());
//     }, 100);
//   }

//   var validKeyFrame = function(currentKey, arryFrameList, callback) {
//     if (typeof callback == 'function' && typeof callback !== 'undefined') {
//       var result = callback();
//     } else {
//       var result = searchKeyFrame(currentKey, arryFrameList)
//     }

//     if (typeof result !== 'undefined') {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   var valideBodyContext = function(currentKey) {
//     return validKeyFrame(currentKey, bodyContextList, function(){
//       var num = getContextByFrame(currentKey);
//       return getContextByFrame(currentKey);
//     });
//   }

//   var getContextByFrame = function(currentKey) {
//     return _.find(bodyContextList, function(num){
//       if(num.keyFrameStart <= currentKey && num.keyFrameEnd >= currentKey) {
//         return num;
//       }
//     });
//   }

//   var searchKeyFrame = function(currentKey, arryFrameList) {
//     var arryFrameList = arryFrameList || pauseFrame;

//     return _.find(pauseFrame, function(num){
//      if(num.keyFrame == currentKey) {
//        return num;
//      }
//     });
//   }

//   var setBodyContext = function(currentKey) {
//     $('body').removeClass();

//     if (valideBodyContext(currentKey)) {
//       var bodyContext = getContextByFrame(currentKey);

//       $('body').addClass(bodyContext.context);
//     }
//   }

//   var direction = function(deltaY, callback) {

//     var deltaDirection = Math.max(-1, Math.min(1, deltaY));

//     if (deltaDirection == -1) {
//       currentFrame += 1;
//       var dir = 'DOWN';
//       if (typeof callback == 'function' && typeof callback !== 'undefined') callback(dir);

//     } else if (deltaDirection == 1) {
//       currentFrame -= 1;
//       var dir = 'UP';
//       if (typeof callback == 'function' && typeof callback !== 'undefined') callback(dir);
//     }

//     if (currentFrame <= 0) {
//       currentFrame = 0;
//     }

//     if (currentFrame >= frames.length) {
//       currentFrame = 0;
//     }

//   }

//   var onMouseWheel = function() {
//     currentFrame = 0;
//     var delayCustom = 0;

//     $(window).mousewheel(function(event) {
//       event.preventDefault();
//       event.stopPropagation();
//       if (!lockScroll) {
//         $('.js-elements').removeClass('is-active is-current');
//         direction(event.deltaY, function(dir) {

//           actionScrollFrame(function(keyUp, keyDown, currentKeyFrame){

//             if (dir == 'UP') {
//               // UP Diraction
//               if (currentFrame > keyUp.keyFrame) {
//                 console.log('UP');
//                 lockScroll = true;
//                 var iterate = function() {
//                   if (currentFrame > keyUp.keyFrame) {
//                     currentFrame -= 1;
//                     debug('Easing: TRUE');
//                     activeAction(iterate, currentFrame, keyUp.keyFrame, TIMEOUT_AUTO_SCROLL_ANIMATION);
//                   } else {
//                     delayKeyFrame();
//                   }
//                 }
//                 setTimeout(iterate, TIMEOUT_AUTO_SCROLL_ANIMATION);

//               }
//             } else {
//               // DOWN Diraction
//               if (currentFrame < keyDown.keyFrame) {

//                 lockScroll = true;
//                 debug('Easing: TRUE');
//                 var iterate = function() {
//                   if (currentFrame < keyDown.keyFrame) {
//                     currentFrame += 1;
//                     activeAction(iterate, currentFrame, keyDown.keyFrame, TIMEOUT_AUTO_SCROLL_ANIMATION);
//                   } else {
//                     delayKeyFrame();
//                   }
//                 }
//                 setTimeout(iterate, TIMEOUT_AUTO_SCROLL_ANIMATION);
//               }

//             }

//           });

//         });

//         $(document).trigger( "updateFrame", currentFrame);

//         setImage(currentFrame);
//       }
//     });
//   }


//   var navFrame = function(navFrame) {

//     if (!lockScroll) {
//       $('.js-elements').removeClass('is-active is-current');

//       var isFocus = $('.is-focus').data('keyFrame');

//       if (currentFrame > navFrame ) {
//         var iterate = function() {
//           if (currentFrame > navFrame ) {
//             currentFrame -= 1;
//             lockScroll = true;
//             debug('Easing: TRUE');
//             activeAction(iterate, currentFrame, navFrame);
//             if (isFocus == currentFrame || currentFrame == navFrame) {
//               debug('Easing: FALSE');
//               lockScroll = false;
//               $('.is-focus').removeClass('is-focus');
//             }
//           }
//         }
//         setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
//       }

//       if (currentFrame < navFrame ) {
//         var iterate = function() {
//           if (currentFrame < navFrame) {
//             currentFrame += 1;
//             lockScroll = true;
//             debug('Easing: TRUE');

//             activeAction(iterate, currentFrame, navFrame);
//             if (isFocus == currentFrame || currentFrame == navFrame) {
//               lockScroll = false;
//               debug('Easing: FALSE');
//               $('.is-focus').removeClass('is-focus');
//             }
//           }
//         }
//         setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
//       }
//     }
//   }

//   var activeAction = function(functionIterate, frame, selectFrame, timeoutCustom) {
//     setImage(frame);

//     if (typeof timeoutCustom === 'undefined') {
//       var timeoutCustom = TIMEOUT_AUTO_ANIMATION;
//     }

//     setTimeout(functionIterate, timeoutCustom);
//     if (validKeyFrame(frame) && frame == selectFrame) {
//       $(searchKeyFrame(frame).selector).addClass('is-active');
//     } else {
//       $('.js-elements').removeClass('is-active is-current');
//     }

//     $(document).trigger( "updateFrame", frame);
//   }

//   var navGenerateNav = function() {
//     var $ulNav = $('ul.c-nav');

//     // $ulNav.append(formatItemNav(0));

//     for (var i = 0; i < pauseFrame.length; i++) {
//       var frame = pauseFrame[i]
//       if (frame.isShow) {
//         $ulNav.append(formatItemNav(frame.keyFrame));
//       }
//     };

//     var topPosition   = $ulNav.height() /2;
//     var windowsHeight = $(window).height() /2;

//     $ulNav.css({'top': (windowsHeight - topPosition) + 'px' })
//   }

//   var activeNav = function() {
//     if (validKeyFrame(currentFrame) || currentFrame == 0) {
//       if (validKeyFrame(currentFrame)) {
//         var key = searchKeyFrame(currentFrame).keyFrame;
//       } else {
//         var key =  0;
//       }

//       $('.js-nav__item').removeClass('is-active');
//       $('#' + formatNavId(key)).addClass('is-active');
//     }
//   }

//   var actionScrollFrame = function(callback) {

//     var currentKeyFrame =  nearestKeyFrame(pauseFrame, currentFrame);

//     // var keyFrameAutoScrollUp =  currentKeyFrame.keyFrame + currentKeyFrame.sizeAutoScroll;
//     // var keyFrameAutoScrollDown =  currentKeyFrame.keyFrame - currentKeyFrame.sizeAutoScroll;


//     currentKeyFrame


//     var keyFrameAutoScrollUp =  pauseFrame[currentKeyFrame.index - 1] || pauseFrame[currentKeyFrame.index];
//     console.log(keyFrameAutoScrollUp)
//     var keyFrameAutoScrollDown =  pauseFrame[currentKeyFrame.index + 1] || pauseFrame[pauseFrame.length-1];
//     console.log(keyFrameAutoScrollDown)

//     callback(keyFrameAutoScrollUp, keyFrameAutoScrollDown, currentKeyFrame);

//   }

//   var delayKeyFrame = function(){
//     var delay = 0
//     var currentKeyFrame = searchKeyFrame(currentFrame);
//     console.log('Valid Key');

//       var iterate = function() {
//         if (delay == (currentKeyFrame.delay/4)) {
//           $(currentKeyFrame.selector).addClass('is-active');
//         }

//         if (delay <= currentKeyFrame.delay) {
//           setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
//         }

//         if (delay == currentKeyFrame.delay) {
//           currentKeyFrame.isActive = true;
//           lockScroll = false;
//           debug('Easing: FALSE');
//         }

//         delay += 1;
//       }
//       setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
//   }

//   var formatItemNav = function(keyFrame) {
//     var anchor = $('<a/>').addClass('c-nav__action js-nav__item')
//                           .attr('href', '#')
//                           .attr('id', formatNavId(keyFrame))
//                           .data('keyFrame', keyFrame);

//     var li = $('<li/>').html(anchor)
//                        .addClass('c-nav__item');

//     return li;
//   }

//   var nearestKeyFrame =  function(list, target) {
//     var minElem = null;
//     var max =  10000;

//     for (var i = 0; i < list.length; i++) {
//       var elem = list[i];
//       elem.index =  i;

//       var min = Math.abs(target - elem.keyFrame);

//       if (min < max) {
//         max = min;
//         minElem = elem;
//       }
//     };

//     return minElem;
//   }

//   var formatNavId =  function(key) {
//     return 'keyFrame-' + key;
//   }

//   var debug = function(text){
//     // $('.js-debug').html(text)
//     //               .css({ position: 'absolute',
//     //                      bottom: '0',
//     //                      left: '0' });
//   }


//   // Calls
//   getFrames();
//   sizeByViewport();
//   onMouseWheel();
//   navGenerateNav();
//   setBodyContext(0);
//   activeNav();
//   setImageOnLoad();
//   navFrame(pauseFrame[1].keyFrame);
//   // Events

//   $(document).on('updateFrame', function(e, frame) {
//     // $('.js-currentFrame').html(currentFrame);
//     activeNav();
//     setBodyContext(frame);
//   });

//   $(document).on('click', '.js-nav__item', function(e){
//     e.preventDefault();

//     if (!lockScroll) {
//       var $this = $(this);

//       var keyFrame =  $this.data('keyFrame');

//       $this.addClass('is-focus');

//       navFrame(keyFrame);
//     }
//   });

// }
var lockScroll;

var SunPowerHelixScroll = function(canvasId, numFrame) {

  // Definitions
  var totalFrames, frames, currentFrame, canvasSizeInterval;
  var TIMEOUT_AUTO_ANIMATION = 10;
  var TIMEOUT_AUTO_SCROLL_ANIMATION = 10


  lockScroll = false;

  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');

  var pauseFrame = [{keyFrame: 0,  selector: '', delay: 0, isShow: false},
                    {keyFrame: 80, selector: '.js-intro', delay: 100, sizeAutoScroll: 0, isActive: false, isShow: true},
                    {keyFrame: 365, selector: '.js-plataform', delay: 100, sizeAutoScroll: 200, isActive: false, isShow: true},
                    {keyFrame: 568, selector: '.js-maxeon', delay: 100, sizeAutoScroll: 30, isActive: false, isShow: true},
                    {keyFrame: 590, selector: '.js-design', delay: 100, sizeAutoScroll: 22, isActive: false, },
                    {keyFrame: 612, selector: '.js-hardware', delay: 100, sizeAutoScroll: 18, isActive: false, isShow: true},
                    {keyFrame: 630, selector: '.js-whole-system', delay: 100, sizeAutoScroll: 20, isActive: false, isShow: true},
                    {keyFrame: 700, selector: '.js-on-roof', delay: 100, sizeAutoScroll: 70, isActive: false, isShow: true},
                    {keyFrame: 833, selector: '.js-components', delay: 100, sizeAutoScroll: 100, isActive: false, isShow: true},
                    {keyFrame: 992, selector: '.js-office', delay: 100, sizeAutoScroll: 70, isActive: false, isShow: true},
                    {keyFrame: 1070, selector: '', delay: 100, sizeAutoScroll: 50, isActive: false, isShow: true},
                    {keyFrame: numFrame, selector: '', delay: 0, isShow: false},];

  var bodyContextList = [{keyFrameStart: 0,   keyFrameEnd: 150, context: 's-dark'},
                         {keyFrameStart: 160, keyFrameEnd: 180, context: 's-dark'},
                         {keyFrameStart: 234, keyFrameEnd: 290, context: 's-dark'},
                         {keyFrameStart: 500, keyFrameEnd: 530, context: 's-dark'},
                         {keyFrameStart: 750, keyFrameEnd: 870, context: 's-dark'},
                         {keyFrameStart: 1067, keyFrameEnd: numFrame, context: 's-dark'}];

  var getFrames = function() {
    totalFrames = numFrame;
    frames      = new Array();

    var interval = 10;

    var iterate = function(num) {
      var num = num;
      if (interval < totalFrames){
        if (num == interval) {

          interval += 10;
          iterate(num);

        } else {
          num += 1;
          setTimeout(function(){
            var filepath = 'images/background/movie_' + num + '.jpg';
            var img = new Image;
            img.src = filepath;
            frames.push(img);

            iterate(num);
          }, 1);
        }
      }
    }

    iterate(0)

  }

  var setImage = function(newLocation) {
    if (typeof frames[newLocation] !== 'undefined') {
      context.drawImage(frames[newLocation], 0, 0, 1280, 720);
    }
  }

  var setImageOnLoad = function(){
    var base_image = new Image();

    base_image.src    = 'images/background/movie_1.jpg';
    base_image.onload = function(){
      context.drawImage(base_image, 0, 0, 1280, 720);
    }
  }

  // Functions
  var sizeByViewport = function() {
    canvasSizeInterval = setInterval(function(){
      $(canvas).width($(window).width())
               .height($(window).height());
    }, 100);
  }

  var validKeyFrame = function(currentKey, arryFrameList, callback) {
    if (typeof callback == 'function' && typeof callback !== 'undefined') {
      var result = callback();
    } else {
      var result = searchKeyFrame(currentKey, arryFrameList)
    }

    if (typeof result !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  var valideBodyContext = function(currentKey) {
    return validKeyFrame(currentKey, bodyContextList, function(){
      var num = getContextByFrame(currentKey);
      return getContextByFrame(currentKey);
    });
  }

  var getContextByFrame = function(currentKey) {
    return _.find(bodyContextList, function(num){
      if(num.keyFrameStart <= currentKey && num.keyFrameEnd >= currentKey) {
        return num;
      }
    });
  }

  var searchKeyFrame = function(currentKey, arryFrameList) {
    var arryFrameList = arryFrameList || pauseFrame;

    return _.find(pauseFrame, function(num){
     if(num.keyFrame == currentKey) {
       return num;
     }
    });
  }

  var setBodyContext = function(currentKey) {
    $('body').removeClass();

    if (valideBodyContext(currentKey)) {
      var bodyContext = getContextByFrame(currentKey);

      $('body').addClass(bodyContext.context);
    }
  }

  var direction = function(deltaY, callback) {

    var deltaDirection = Math.max(-1, Math.min(1, deltaY));

    if (deltaDirection == -1) {
      currentFrame += 1;
      var dir = 'DOWN';
      if (typeof callback == 'function' && typeof callback !== 'undefined') callback(dir);

    } else if (deltaDirection == 1) {
      currentFrame -= 1;
      var dir = 'UP';
      if (typeof callback == 'function' && typeof callback !== 'undefined') callback(dir);
    }

    if (currentFrame <= 0) {
      currentFrame = 0;
    }

    if (currentFrame >= frames.length) {
      currentFrame = 0;
    }

  }

  var onMouseWheel = function() {
    currentFrame = 0;
    var delayCustom = 0;

    $(window).mousewheel(function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (!lockScroll) {
        $('.js-elements').removeClass('is-active is-current');
        direction(event.deltaY, function(dir) {

          actionScrollFrame(function(keyUp, keyDown, currentKeyFrame){

            if (dir == 'UP') {

              // UP Diraction
              if (currentFrame <= keyUp && currentFrame >= currentKeyFrame.keyFrame) {
                console.log('UP');
                lockScroll = true;
                var iterate = function() {
                  if (currentFrame > currentKeyFrame.keyFrame) {
                    currentFrame -= 1;
                    debug('Easing: TRUE');
                    activeAction(iterate, currentFrame, currentKeyFrame.keyFrame, TIMEOUT_AUTO_SCROLL_ANIMATION);
                  } else {
                    delayKeyFrame();
                  }
                }
                setTimeout(iterate, TIMEOUT_AUTO_SCROLL_ANIMATION);

              }
            } else {
              // DOWN Diraction
              if (currentFrame >= keyDown
                    && currentFrame <= currentKeyFrame.keyFrame) {
                lockScroll = true;
                debug('Easing: TRUE');
                console.log('DOWN', currentFrame >= keyDown, currentFrame <= currentKeyFrame.keyFrame);
                var iterate = function() {
                  if (currentFrame < currentKeyFrame.keyFrame) {
                    currentFrame += 1;
                    activeAction(iterate, currentFrame, currentKeyFrame.keyFrame, TIMEOUT_AUTO_SCROLL_ANIMATION);
                  } else {
                    delayKeyFrame();
                  }
                }
                setTimeout(iterate, TIMEOUT_AUTO_SCROLL_ANIMATION);
              }

            }

          });

        });

        $(document).trigger( "updateFrame", currentFrame);

        setImage(currentFrame);
      }
    });
  }


  var navFrame = function(navFrame) {

    if (!lockScroll) {
      $('.js-elements').removeClass('is-active is-current');

      var isFocus = $('.is-focus').data('keyFrame');

      if (currentFrame > navFrame ) {
        var iterate = function() {
          if (currentFrame > navFrame ) {
            currentFrame -= 1;
            lockScroll = true;
            debug('Easing: TRUE');
            activeAction(iterate, currentFrame, navFrame);
            if (isFocus == currentFrame || currentFrame == navFrame) {
              debug('Easing: FALSE');
              lockScroll = false;
              $('.is-focus').removeClass('is-focus');
            }
          }
        }
        setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
      }

      if (currentFrame < navFrame ) {
        var iterate = function() {
          if (currentFrame < navFrame) {
            currentFrame += 1;
            lockScroll = true;
            debug('Easing: TRUE');

            activeAction(iterate, currentFrame, navFrame);
            if (isFocus == currentFrame || currentFrame == navFrame) {
              lockScroll = false;
              debug('Easing: FALSE');
              $('.is-focus').removeClass('is-focus');
            }
          }
        }
        setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
      }
    }
  }

  var activeAction = function(functionIterate, frame, selectFrame, timeoutCustom) {
    setImage(frame);

    if (typeof timeoutCustom === 'undefined') {
      var timeoutCustom = TIMEOUT_AUTO_ANIMATION;
    }

    setTimeout(functionIterate, timeoutCustom);
    if (validKeyFrame(frame) && frame == selectFrame) {
      $(searchKeyFrame(frame).selector).addClass('is-active');
    } else {
      $('.js-elements').removeClass('is-active is-current');
    }

    $(document).trigger( "updateFrame", frame);
  }

  var navGenerateNav = function() {
    var $ulNav = $('ul.c-nav');

    // $ulNav.append(formatItemNav(0));

    for (var i = 0; i < pauseFrame.length; i++) {
      var frame = pauseFrame[i]
      if (frame.isShow) {
        $ulNav.append(formatItemNav(frame.keyFrame));
      }
    };

    var topPosition   = $ulNav.height() /2;
    var windowsHeight = $(window).height() /2;

    $ulNav.css({'top': (windowsHeight - topPosition) + 'px' })
  }

  var activeNav = function() {
    if (validKeyFrame(currentFrame) || currentFrame == 0) {
      if (validKeyFrame(currentFrame)) {
        var key = searchKeyFrame(currentFrame).keyFrame;
      } else {
        var key =  0;
      }

      $('.js-nav__item').removeClass('is-active');
      $('#' + formatNavId(key)).addClass('is-active');
    }
  }

  var actionScrollFrame = function(callback) {

    var currentKeyFrame =  nearestKeyFrame(pauseFrame, currentFrame);

    var keyFrameAutoScrollUp =  currentKeyFrame.keyFrame + currentKeyFrame.sizeAutoScroll;
    var keyFrameAutoScrollDown =  currentKeyFrame.keyFrame - currentKeyFrame.sizeAutoScroll;

    callback(keyFrameAutoScrollUp, keyFrameAutoScrollDown, currentKeyFrame);

  }

  var delayKeyFrame = function(){
    var delay = 0
    var currentKeyFrame = searchKeyFrame(currentFrame);
    console.log('Valid Key');

      var iterate = function() {
        if (delay == (currentKeyFrame.delay/4)) {
          $(currentKeyFrame.selector).addClass('is-active');
        }

        if (delay <= currentKeyFrame.delay) {
          setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
        }

        if (delay == currentKeyFrame.delay) {
          currentKeyFrame.isActive = true;
          lockScroll = false;
          debug('Easing: FALSE');
        }

        delay += 1;
      }
      setTimeout(iterate, TIMEOUT_AUTO_ANIMATION);
  }

  var formatItemNav = function(keyFrame) {
    var anchor = $('<a/>').addClass('c-nav__action js-nav__item')
                          .attr('href', '#')
                          .attr('id', formatNavId(keyFrame))
                          .data('keyFrame', keyFrame);

    var li = $('<li/>').html(anchor)
                       .addClass('c-nav__item');

    return li;
  }

  var nearestKeyFrame =  function(list, target) {
    var minElem = null;
    var max =  10000;

    for (var i = 0; i < list.length; i++) {
      var elem = list[i];
      elem.index =  i;

      var min = Math.abs(target - elem.keyFrame);

      if (min < max) {
        max = min;
        minElem = elem;
      }
    };

    return minElem;
  }

  var formatNavId =  function(key) {
    return 'keyFrame-' + key;
  }

  var debug = function(text){
    // $('.js-debug').html(text)
    //               .css({ position: 'absolute',
    //                      bottom: '0',
    //                      left: '0' });
  }


  // Calls
  getFrames();
  sizeByViewport();
  onMouseWheel();
  navGenerateNav();
  setBodyContext(0);
  activeNav();
  setImageOnLoad();
  navFrame(pauseFrame[1].keyFrame);
  // Events

  $(document).on('updateFrame', function(e, frame) {
    // $('.js-currentFrame').html(currentFrame);
    activeNav();
    setBodyContext(frame);
  });

  $(document).on('click', '.js-nav__item', function(e){
    e.preventDefault();

    if (!lockScroll) {
      var $this = $(this);

      var keyFrame =  $this.data('keyFrame');

      $this.addClass('is-focus');

      navFrame(keyFrame);
    }
  });

}
$(function(){

  SunPowerHelixScroll('background', 1100);

  $('.js-plataform-btn').on('click', function(e){
    e.preventDefault();

    var selectorAction = $(this).data('key-selector');

    var isClose = $(this).hasClass('is-close');


    if (isClose) {
      $(this).removeClass('is-current is-close');
      $('.js-plataform-content').removeClass('is-active');
    } else {
      $('.js-plataform-btn').removeClass('is-current');
      $('.js-plataform-content').removeClass('is-active');

      $(this).addClass('is-current is-close');
      $(selectorAction).addClass('is-active');
    }
  });


  $('.js-office-btn').on('click', function(e){
    e.preventDefault();

    var selectorAction = $(this).data('key-selector');
    var isClose = $(this).hasClass('is-close');


    if (isClose) {
      $(this).removeClass('is-current is-close');
      $('.js-office-content').removeClass('is-active');
    } else {
      $('.js-office-btn').removeClass('is-current');
      $('.js-office-content').removeClass('is-active');

      $(this).addClass('is-current is-close');
      $(selectorAction).addClass('is-active');
    }


  });



});