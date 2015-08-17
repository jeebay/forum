// Disable the submit button until a valid user name is entered
$('.submit').attr('disabled', true);

// When the user name field loses focus, check to see whether it is taken
$('#user-name').on('blur', function (e) {
    var name = $(this).val()
    $.get('/ajax/checkuser', {"user_name":name}, function (data) {
        // If name already exists, notify the user
        if (Object.keys(data).length > 0) {
            $('.exists-modal').removeClass('hidden');
            console.log("exists");
        // If name doesn't exist, enable the submit button
        } else if (typeof(data) === 'string') {
            $('.submit').attr('disabled', false);
            console.log('does not exist');
        // Otherwise, something went terribly wrong
        } else {
            $('.not-found').removeClass('hidden')
            console.log('neither');
        }
    });
});

// populate the profile pic container with the profile image once url is entered
$('#img-url').on('blur', function (e) {
    $('.profile-pic-container').empty();
    var picURL = $('#img-url').val();
    var $pic = $("<img class='profile-pic u-max-full-width'>");
    $pic.attr('src', picURL);
    $('.profile-pic-container').append($pic);
});

// Modal okay button hides the modal and clears the username field
$('.exists-modal-ok').on('click', function() {
    $('.exists-modal').addClass('hidden');
    $('#user-name').val('');
});

