// wishlist btn
function addWishList(obj) {
    if (sessionStorage.getItem('id') != null) {
        let icon = $(obj).find('i');
        if (icon.hasClass('far fa-heart')) {
            $(icon).attr('class', 'fas fa-heart text-red');
        } else {
            $(icon).attr('class', 'far fa-heart');
        }
    } else {
        alert('로그인이 필요합니다');
    }
}

// sub-nav hover : pc
$(function() {
    $('.sub-nav .nav-item .nav-link').hover(function () {
        let id = $(this).attr('id');
        let menu = $('.sub-nav-menu .' + id);

        menu.siblings('div').hide();
        menu.show();

        $(menu).mouseleave(function () {
            $(menu).hide()
        })
    })
})