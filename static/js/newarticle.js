$('.submit').attr('disabled', true);

$('#user-name').on('blur', function (e) {
    var name = $(this).val()
    $.get('/ajax/checkuser', {"user_name":name}, function (data) {
        if (Object.keys(data).length > 0) {
            $('.submit').attr('disabled', false);
            console.log("yes");
        } else if (typeof(data) === 'string') {
            $('.not-found').removeClass('hidden');
            console.log('no');
        } else {
            $('.not-found').removeClass('hidden')
            console.log('neither');
        }
    });
});

$('.not-found-ok').on('click', function() {
    $('.not-found').addClass('hidden');
    $('#user-name').val('');
});