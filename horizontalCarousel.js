/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;
/*
const dragged = [1,2,3,4,4,5,6,6];
for (i=0; i < dragged.length;){
    (function(a,b){ a + b ;})(dragged[i++]);
}

*/
    var dragged = [];
    let arrowLeft = [];
    let arrowRight = [];
    var reset = function(i, el) {
        // possibly to remove any memory leaks everytime it is loaded
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
           el[removeEventListener](mousedown, el.md, 0);
           _window[removeEventListener](mouseup, el.mu, 0);
           _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));

        /*
        - add event listener on each of arrow Left button. Click
        - if container can be scrolled, 
        - scroll left by 1 one list item unit.
        - get width of 1 list item unit.
        -  
        */

        for (i = 0; i < dragged.length;) {
            // I am using the parameters as variable declaration
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                let arrowLeft = el.parentElement.querySelector('.mm-content__carouselArrowL'); 
                let arrowRight = el.parentElement.querySelector('.mm-content__carouselArrowR');
                // HELPER METHODS 
                // I ensure the listing scrolls the width of 1 listing item.            
                function scrollDistance (){
                    if (_document.body.clientWidth > 920) {
                        return el.clientWidth / 4;
                    } else if (_document.body.clientWidth <= 920 && _document.body.clientWidth > 700) {
                        return el.clientWidth / 3;
                    } else if (_document.body.clientWidth <= 700 && _document.body.clientWidth > 620) {
                        return el.clientWidth / 2;   
                    } else
                        return el.clientWidth;
                    }

                // EVENT HANDLERS
                // I add an eventListener to the arrowLeft element Object
                arrowLeft[addEventListener](
                    mousedown,
                    // I assign the callback function to the element object
                    arrowLeft.md = function(e) {
                        el.scrollLeft -= scrollDistance();
                    });

                // I add an eventListener to the arrowRight element Object
                arrowRight[addEventListener](
                    mousedown, 
                    // I assign the callback function to the element object
                    arrowRight.md = function(e) {
                        el.scrollLeft += scrollDistance();
                    });
                // I add an event listener to each DOM elememnt with class name dragscroll
                // cont is the element 
                
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    
                    // I assign .md method to cont element.
                    cont.md = function(e) {
                        // if the target element is does not have 'nochilddrag' as an attribute Or
                        if (!el.hasAttribute('nochilddrag') ||
                            // If the element at the coordinate where the mouse was clicked is equal to 
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            
                            // the element the event listener is applied to.
                            ) == cont
                        ) {
                            // I indicate that the mouse is currently in push down mode
                            pushed = 1;
                            // I indicate the original position x is the x coordinate of the mouse down event 
                            lastClientX = e.clientX;
                            // I indicated the original y position is the y coordinate of the mouse down event
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    // I set pushed to 0 to indicate no longer active
                    mouseup, cont.mu = function() {pushed = 0;}, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        // If the mouse is pushed down...
                        if (pushed) {
                            
                            // I get the current X coordinate where mouse move was triggererd.
                            curClientX = e.clientX;
                            // I am the amount of pixels the X coordinate will move 
                            newScrollX = - lastClientX + curClientX;
                            // I reposition the currect scroll position by subtracting the new scroll qty.
                            // I assign the reposition element to scroller.
                            (scroller = el.scroller||el).scrollLeft -= newScrollX;
                            // I set the current ClientX position to the lastClientX position. 
                            lastClientX = curClientX;

                            // Refactored
                            // (scroller = el.scroller||el).scrollLeft -= 
                            //     newScrollX = ( - lastClientX + (lastClientX=e.clientX));
                            
                            /* set the scroll left value to something. 

                            */ 
                            // console.log((el.scroller||el).scrollLeft -=
                            //   newScrollX = (- lastClientX + (lastClientX=e.clientX)));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                // I allow the body of the website to be scrolled when click on the body. 
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));


// It should only scroll in mouse button is down,
