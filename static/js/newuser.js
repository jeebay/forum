$('.submit').attr('disabled', true);

$('#user-name').on('blur', function (e) {
    var name = $(this).val()
    $.get('/ajax/checkuser', {"user_name":name}, function (data) {
        if (Object.keys(data).length > 0) {
            $('.exists-modal').removeClass('hidden');
            console.log("exists");
        } else if (typeof(data) === 'string') {
            $('.submit').attr('disabled', false);
            console.log('does not exist');
        } else {
            $('.not-found').removeClass('hidden')
            console.log('neither');
        }
    });
});

$('#img-url').on('blur', function (e) {
    $('.profile-pic-container').empty();
    var picURL = $('#img-url').val();
    var $pic = $("<img class='profile-pic u-max-full-width'>");
    $pic.attr('src', picURL);
    $('.profile-pic-container').append($pic);
});

$('.exists-modal-ok').on('click', function() {
    $('.exists-modal').addClass('hidden');
    $('#user-name').val('');
});

