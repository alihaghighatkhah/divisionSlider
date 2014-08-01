/**
 * Division slider
 * v0.1.0
 * https://github.com/alihaghighatkhah/divisionSlider
 * MIT licensed
 *
 * Author: Ali Haghighatkhah (@reyraa)
 */


var app = 
{
    base_url:  window.location.protocol + "//" + window.location.host
};

/**
 * 1 )  setting positions, flags and styles, choosing proper animation functions
 * - use animations depeneded to mouse move to animate slider when pointer is grapped
 * - use terminate 
*/
app.divisionSlider = function()
{
    // flags and initial settings
    var isGraped= false;
    var resizable = 0;
    var temp = 0;
    var screenWidth = $(window).width();
  
    //## starting animation
    // getting initial coordinates of mouse pointer, just when enters the title area

    $('.m-division-slider .button').mousedown(function (e) 
    {
        isGraped= true;
        xcoor = e.clientX;
    });

    //## during animation
    $('.m-division-slider').mousemove(function (e) 
    {
        //cheking if mouse is inside the title area and the initial animation has shown
        if (isGraped & screenWidth > 960) 
        {
            var x = e.clientX-xcoor;
            resizable = $('.m-division-slider .division.right').width();
            if (x!==0) {resizable -= x;}//not doubling
            xcoor = e.clientX;
            // restrict resizing
            if (resizable > 40 && resizable < 880) 
            {  
                //directly writing to inilne styles of element
                $('.m-division-slider .division.right').width(resizable);
                $('.m-division-slider .border').css('right',resizable);
                // more than half
                if (resizable >= 460) 
                {
                    liveToLeft(resizable);
                }
                //less than half
                else
                {
                    liveToRight(resizable);
                }
            }
        }
    });
    //## terminating animation
    // if mouse leaved the area, stop resizing
    $('body').on("mouseup",function (e) 
    {
        if(isGraped)
        {
            teminateAnimation(resizable , isGraped);
        }
        isGraped = false;
    });
    $('.m-division-slider').on("mouseleave",function()
    {
        if(isGraped)
        {
            teminateAnimation(resizable , isGraped);
        }
        isGraped = false;
    });

};


/**
 * 2 )     Function of animations of slider
 * 2 - 1 ) liveToLeft : sets elements for the positions of mouse in left half
 * 2 - 2 ) liveToRight : sets elements for positions of mouse in right half
 * 2 - 3 ) animateToRight : this animations sets all elements to a stable position at right side
 * 2 - 4 ) animateToLeft : this is vise versa of animateToRight function
 * 2 - 5 ) setCenter : animating elements to stay at initial positions
 * 2 - 6 ) teminateAnimation : uses funtion of 1-2 to 1-4 in proper positions of mouse
*/

function liveToLeft(resizable) {
    // while description boxes in the left half are invisable,
    // animate the opacity of description boxes in right half
    // accouring to sliding status
    $('.division.right .description-box, .division.right .description-box figure').fadeTo(1,(resizable-460)/332);
    
    //set the position of main images
    $('.division.right .main-object').css({'margin-right' : (460-resizable)/6});
    $('.division.left .main-object').css({'margin-left' : -87+(resizable-460)/6 });
}
function liveToRight(resizable) {
    //hide tooltips when slider moved
    temp = (460-resizable)/400;
    temp = temp*temp*temp;

    // while description boxes in the right half are invisable,
    // animate the opacity of description boxes in left half
    // accouring to sliding status
    $('.division.left .description-box, .division.left .description-box figure').fadeTo(5,temp);
    //set the position of main images
    $('.division.left .main-object').css({'margin-left' : -87+(resizable-460)/4.5});
}
function animateToRight() {
  
    // We're creating an stable position for slider, so
    // hide the descriptoin boxes in the right half, and show them in the left half
    $('.description-box.left, .description-box.left, figure').fadeTo(1,1);
    $('.division.right .description-box, .division.right .description-box figure').fadeTo(1,0);

    //set main images centeral 
    $('.division.left .main-object').stop().animate({'margin-left' : -160});
}
function animateToLeft() {
    // We're creating an stable position for slider, so
    // hide the descriptoin boxes in the left half, and show them in the right half
    $('.division.left .description-box, .division.left .description-box figure').fadeTo(1,0);
    $('.division.right .description-box, .division.right .description-box figure').fadeTo(1,1);

}
function setCenter(){
    //back to initial positions
    $('.division .description-box, .division .description-box figure').fadeTo(1,0);
    $('.division.left .main-object').css({'margin-left' : -87});
}
function teminateAnimation(resizable , isGraped) {
    // This function will fire when we release the pointer
    // so let's check if we're in the right haf or the left half or near the center
    if(isGraped)
    {
        if (resizable > 600) 
        {
           $('.m-division-slider .division.right').animate({width : '805px'} ,300); 
           $('.m-division-slider .border').animate({right : '805px'},300);
           animateToLeft();
        }
        else if(resizable < 300)
        {
            $('.m-division-slider .division.right').animate({width : '108px'}, 300);
            $('.m-division-slider .border').animate({right : '110px'}, 300);
            animateToRight();
        }
        else
        {
            $('.m-division-slider .division.right').animate({width : '50%'}, 300);
            if(!Modernizr.csstransforms){
                $('.m-division-slider .border').css({right : '50%'});
            }else{
                $('.m-division-slider .border').animate({right : '50%'}, 300);
            }
            setCenter();
        }
    }
}

