$(function() {
    $(window).scroll(function() {
        var menu = $('#menu'),
            home = $('#home'),
            sobre = $('#sobre'),
            portfolios = $('#portfolios'),
            contatos = $('#contatos'),
            footer = $('#footer'),
            winTop = $(window).scrollTop(),
            center = $(window).height() / 2;

        if (home.is(':in-viewport')) {
            window.currentPage = 'home';
        }


        if (sobre.is(':in-viewport(' + center + ')')) {
            window.currentPage = 'sobre';
        }

        if (portfolios.is(':in-viewport(' + center + ')')) {
            window.currentPage = 'portfolios';
        }

        if (contatos.is(':in-viewport(' + center + ')')) {
            window.currentPage = 'contatos';
        }

        if (footer.is(':in-viewport(' + center + ')')) {
            window.currentPage = 'footer';
        }


        if (window.lastPage != window.currentPage) {
            window.lastPage = window.currentPage;
            $(window).trigger('changepage')
        }

        if (winTop >= (sobre.offset().top - 5)) {
            menu.addClass('fixed white show');
            $('li a[href=#home]', menu).parent().removeClass('hide')
        }
        else {
            menu.removeClass('fixed white show');
            $('li a[href=#home]', menu).parent().addClass('hide')
        }
    });

    $(window).on('changepage', function() {
        $('li.active', '#menu').removeClass('active')
        $('a[href=#' + window.currentPage + ']', '#menu').parent().addClass('active');
    });

    $('.scrollto').scrollTo();

    $('.scrollto', '#menu:not(.show)').click(function() {
        if ($(window).width() < 768) {
            $('button', '#menu').click()
        }
    });


    window.currentPage = 'home';
    var speedBigFlower = 0.5;
    $('#home').parallaxObjects([{
        class: 'bigflower white',
        speed: speedBigFlower,
        y: -1,
        opacity: 0,
        limit: false
    }]);

    $('#wrap-sobre').parallaxObjects([{
        class: 'bigflower black',
        speed: speedBigFlower,
        y: -1,
        opacity: 0,
        limit: false,
        viewport: false

    }]);

    $('#portfolios').parallaxObjects([{
        class: 'bigflower-color',
        speed: 0.2,
        y: -1,
        x: -1,
        opacity: -1,
        speedOpacity: 0.1,
        limit: false,
        viewport: 0
    }]);

})
