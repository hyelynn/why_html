$(function () {
    // console.log('1')

    // index slick slide
    if ($('.main-item-slide').length > 0) {
        $('.main-item-slide').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            prevArrow: '<button type="button" class="btn slide-prev"><span class="slide-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></button>',
            nextArrow: '<button type="button" class="btn slide-next"><span class="slide-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                  }
                }
            ]
        });
    }

    // 서브 드랍메뉴
    $('.sub-nav .nav-item .nav-link').hover(function () {
        let id = $(this).attr('id');
        let menu = $('.sub-nav-menu .' + id);

        menu.siblings('div').hide();
        menu.show();

        $(menu).mouseleave(function () {
            $(menu).hide()
        })
    })

    // 지역 선택 드롭메뉴
    $('#locationInput').click( function () {
        $(this).siblings('#locationList').toggleClass('d-none');
    })

    // 검색 영역 날짜 선택 datepicker - 드롭다운
    if ($('#datePickerDrop').length > 0) {
        $('#datePickerDrop').datepicker({
            language: 'ko',
            // multipleDatesSeparator: ' ~ ',
            range: false,
            // timepicker: true,    // timeslide
            navTitles: {
                days: '<span class="font-weight-bold mr-2">M</span> MM, <i>yyyy</i>'
            },
            prevHtml: '<i class="fas fa-chevron-left"></i>',
            nextHtml: '<i class="fas fa-chevron-right"></i>',
            onShow: function () {
                // datepicker width를 날짜 input width에 맞춤
                let box_width = $('#datePickerDrop').outerWidth();
                $('.datepicker.-from-bottom-').outerWidth(box_width);

                // studio페이지 시간 설정 영역 추가
                let timePicker = '';
                if ($('#pageNav').hasClass('page-studio')) {
                    timePicker = '<div class="mx-4 py-lg-4 py-3 border-top datepicker-timepicker">' +
                                        '<div class="row">' +
                                            '<div class="col-6 custom-inputs">' +
                                                '<p class="mb-lg-3 mb-2">시작시간</p>' +
                                                '<select name="" id="" class="form-control">' +
                                                    '<option value="08:00">08:00</option>' +
                                                    '<option value="09:00">09:00</option>' +
                                                    '<option value="10:00">10:00</option>' +
                                                '</select>' +
                                            '</div>' +
                                            '<div class="col-6 custom-inputs">' +
                                                '<p class="mb-lg-3 mb-2">종료시간</p>' +
                                                '<select name="" id="" class="form-control">' +
                                                    '<option value="13:00">13:00</option>' +
                                                    '<option value="14:00">14:00</option>' +
                                                    '<option value="15:00">15:00</option>' +
                                                '</select>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
                }

                if ($('.datepicker .btn').length > 0) {
                    return false;
                } else {
                    let btn = '<button type="button" class="btn btn-block py-3 border-0 rounded-0 font-weight-light bg-yellow">검색</button>';
                    $('.datepicker')
                        .append(timePicker)
                        .append(btn);
                }
            }
        })
    }

    // studio view 페이지 datepicker - 인ㅇ라인
    if ($('#datePickerInline').length > 0) {
        $('#datePickerInline').datepicker({
            language: 'ko',
            // multipleDatesSeparator: ' ~ ',
            // range: true,
            // multipleDates: true,
            navTitles: {
                days: '<span class="font-weight-bold mr-2">M</span> MM, <i>yyyy</i>'
            },
            prevHtml: '<i class="fas fa-chevron-left"></i>',
            nextHtml: '<i class="fas fa-chevron-right"></i>',
        })
    }

    // view 페이지 별점
    if ($('.tab-content #review').length > 0) {
        $('.star-rating').starRating({
            initialRating: 3.5,
            disableAfterRate: false,
            strokeWidth: 0,
            useGradient: false,
            emptyColor: '#f1f1f1',
            activeColor: '#ffde3b',
            ratedColor: '#ffde3b',
            hoverColor: '#ffde3b',
            onHover: function(currentIndex, currentRating, $el){
              $('.live-rating').text(currentIndex);
            },
            onLeave: function(currentIndex, currentRating, $el){
              $('.live-rating').text(currentRating);
            }
        })
    }

    // 인원수 감소
    $('#decreaseQuantity').click( function(e) {
        e.preventDefault();
        var stat = $('#numberUpDown').val();
        var num = parseInt(stat, 10);
        num--;

        if (num <= 0) {
            num = 1;
        }
        $('#numberUpDown').val(num);
    })
    // 인원수 증가
    $('#increaseQuantity').click( function(e) {
        e.preventDefault();
        var stat = $('#numberUpDown').val();
        var num = parseInt(stat, 10);
        num++;

        if (num > 100) {
            num = 100;
        }
        $('#numberUpDown').val(num);
    })

    // 인풋 활성/비활성
    $('#order_def').on('change', function () {
        if ($(this).prop('checked') === true) {
            $(this).parent().prev().find('input[type=text]').removeAttr('disabled');
        } else {
            $(this).parent().prev().find('input[type=text]').attr('disabled', 'disabled');
        }
    })

    // 아코디언 collapse
    $('.host-accordion').on('show.bs.collapse', function () {
        $(this).find('i').attr('class', 'fas fa-angle-double-up')
    })
    $('.host-accordion').on('hide.bs.collapse', function () {
        $(this).find('i').attr('class', 'fas fa-angle-double-down')
    })

    // 선택하기 버튼 클릭시 예약 내역 outline
    $('.host-menu .item-pick').on('click', function () {
        $(this).toggleClass('active')
        $(this).parents('li.list-group-item').toggleClass('outline')
    })

    // 등록 : 카테고리별 프로세스 load
    //  type4 : studio / class
    //  type3 : performance / audition
    //  type2 : store
    $('.host-register-items input:radio[name=category]').click(function () {
        let category = $(this).val();
        if (category === 'studio' || category === 'class') {
            $('#registerProcess').load('../include/host/item_register_process.html #type4')
        } else if (category === 'performance' || category === 'audition') {
            $('#registerProcess').load('../include/host/item_register_process.html #type3')
        } else if (category === 'store') {
            $('#registerProcess').load('../include/host/item_register_process.html #type2')
        }

        $('#' + category)
            .show()
            .siblings('div.category-depth').hide()

        $('.next-link').prop('href', category + '_register2.html')
    })

    if ($('.datePickerDrop').length > 0) {
        $('.datePickerDrop').datepicker({
            language: 'ko',
            // multipleDatesSeparator: ' ~ ',
            range: false,
            // timepicker: true,    // timeslide
            navTitles: {
                days: '<span class="font-weight-bold mr-2">M</span> MM, <i>yyyy</i>'
            },
            prevHtml: '<i class="fas fa-chevron-left"></i>',
            nextHtml: '<i class="fas fa-chevron-right"></i>',
            onShow: function () {
                // datepicker width를 날짜 input width에 맞춤
                let box_width = $('.datePickerDrop').outerWidth();
                $('.datepicker.-from-bottom-').outerWidth(box_width);
            }
        })
    }
})

// wishlist btn
function addWishList(obj) {
    let icon = $(obj).find('i');
    if (icon.hasClass('far fa-heart')) {
        $(icon).attr('class', 'fas fa-heart text-red');
    } else {
        $(icon).attr('class', 'far fa-heart');
    }
}

// 수정 input 활성화 - 호스트
function handleQna(id) {
    console.log(id)
    let answer_text = $.trim($('#' + id).find('p.answer').text());

    // console.log($('#' + id))
    $('#' + id).find('div.card-body').hide();
    $('#' + id).find('div.accordion-textarea').show().find('textarea').val(answer_text).focus();
}

// file input 추가
function addInputFile(obj) {
    if ($(obj).parent().find('div.custom-file').length + 1 > 14) {
        return;
    }

    let $last = $(obj).parent().find('div.custom-file:last');
    let id = $last.find('input[type=file]').prop('id').replace(/[1-9]/g, '');
    let new_id = id + (parseInt( $last.find('input[type=file]').prop('id').match(/\d+/g), 10 ) + 1);
    let $clone = $last.clone(true);

    $clone.find('input[type=file]').prop('id', new_id).val('');
    $clone.find('input.upload-name').val('최대 14장, JPG, PNG 파일만 가능합니다');
    $clone.find('label').prop('for', new_id);

    $last.after($clone)
}

// tag 추가
function addTag() {
    let tag = $('#tagText').val();

    if (!tag) {
        alert('태그를 입력하세요.');
        $('#tagText').focus();
        return;
    }

    let $clone = $('div.tag:last').clone(true);
    $clone.find('span').text(tag);
    $('.host-search-tags.tags').append($clone);
}

// tag 삭제
function removeTag(obj) {
    $(obj).parent().remove();
}

// 레슨선택 + 금액 추가
function addTime(obj) {
    let parent = $('.custom-inputs.' + obj)
    let tag = $(parent).find('.tag-text').val();

    if (!tag) {
        alert('금액을 입력하세요.');
        $(parent).find('.tag-text').focus();
        return;
    }

    let text = $(parent).find('select[name^=times] option:selected').text() + ' ' + tag;

    let $clone = $(parent).find('div.tag:last').clone(true);
    $clone.find('span').text(text);
    $(parent).find('.host-search-tags').append($clone);
}

// 공연 좌석별 금액 추가
function addPrice() {
    let price = $('.seat-price .seat').val() + ' - ' + $('.seat-price .price').val();

    let $clone = $('div.seat-price-tag .tag:last').clone(true);
    $clone.find('span').text(price);
    $('.seat-price-tag').append($clone);
}