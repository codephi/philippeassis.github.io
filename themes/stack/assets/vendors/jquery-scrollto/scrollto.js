$.scrollToEngine = $.fn.scrollToEngine = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
        }, options.animation);
    });
};

$.scrollTo = $.fn.scrollTo = function(options){
    $(this).on('click',function(e){
        e.preventDefault();

        if(attrScrollTo = $(this).attr('scrollto')){
            attrScrollTo = attrScrollTo.split(',')
            x = attrScrollTo[0] ? attrScrollTo[0] : this.hash
            y = attrScrollTo[1] ? attrScrollTo[1] : this.hash
        }
        else
            x = y = this.hash;

        $('html,body').stop().scrollToEngine(x, y, options);

        return false;
    })
}
