// disable the submit button until a valid username is entered
$('.submit').attr('disabled', true);

// when the username field loses focus, check to see if the name exists
$('#user-name').on('blur', function (e) {
    var name = $(this).val()
    $.get('/ajax/checkuser', {"user_name":name}, function (data) {
        // If the AJAX call returns an object, then the user exists
        if (Object.keys(data).length > 0) {
            $('.submit').attr('disabled', false);
            console.log("yes");
        // If the AJAX call returns a string then the user does not exist
        } else if (typeof(data) === 'string') {
            $('.not-found').removeClass('hidden');
            console.log('no');
        } else {
            $('.not-found').removeClass('hidden')
            console.log('neither');
        }
    });
});

// Listens for "OK" on the modal
$('.not-found-ok').on('click', function() {
    $('.not-found').addClass('hidden');
    $('#user-name').val('');
});