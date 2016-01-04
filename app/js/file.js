var app = (function(){

    /**@TODO
     * 1.
     * 2.
     * 3.
     * 4.
     * 5.
     * 6.
     * 7. колонки с текстом в информейшн
     */
    var init = function(){
        setUpListeners();
    };

    var setUpListeners = function(){
        setUpSlider();
        infoColumn();
        $('.filter__reset').on('click', filterReset);
        $('.filter-fieldset__title').on('click', showForm);
        $('.view-catalog__link').on('click', changeView);
        $('.item__img').on('click', changeImage);
    };

    var filterReset = function(e){
        e.preventDefault();
        $(this).siblings().find('.filter-label__input').removeAttr('checked');
    };

    var setUpSlider = function() {
        $(".filter-label__range-bar").slider({
            range: true,
            min: 0,
            max: 25000,
            values: [ 100, 13000 ],
            slide: function( event, ui ) {
                $('.range__from').val(ui.values[ 0 ]);
                $('.range__to').val(ui.values[ 1 ]);
            }
        });
        $('.range__from').val($('.filter-label__range-bar').slider( "values", 0 ));
        $('.range__to').val($('.filter-label__range-bar').slider( "values", 1 ));
    };

    var showForm = function() {
        $(this).siblings('.filter-fieldset__box').stop(true, true).slideToggle();
        $(this).toggleClass('filter-fieldset__title_close');
    };

    var changeView = function(e){
        e.preventDefault();
        $('.view-catalog__link').removeClass('view-catalog__link_active');
        $(this).addClass('view-catalog__link_active');
        var view = $(this).data('view');
        $('.item').removeClass('item_tables').removeClass('item_row').addClass(view);
    };

    var changeImage = function(){
        var src = $(this).find('img').attr('src');
        $(this).siblings('.item__img_big').find('img').attr('src', src);
    };

    var infoColumn = function(){
        $('.information__text').columnize({columns: 2});
    };




    return{
        init:init
    }
}());

$(document).ready(function(){
    app.init();

});