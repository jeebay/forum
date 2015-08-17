console.log("article.js linked");

// One listener to listen for all clicks on a paragraph section
$('.paragraph').click(function(e){
    var row = e.currentTarget.children;
    var commentSection = $(row).eq(1);
    var targetId = e.target.id;
    // Tests for click on article text
    if (/p\d+/.test(targetId)) {
        var paragraphId = targetId.replace(/[^\d]/g,"");
        $.get('/ajax/paragraphs/'+paragraphId, function (data) {
            $(commentSection).html(data);
        });
    // Tests for click on hide comment button
    } else if (targetId === "hide-comments") {
        $(commentSection).empty();
    // Tests for click on new comment button
    } else if (targetId === "new-comment") {
        var ptext = $(row).eq(0).children().eq(0).html();
        var pID = $(row).eq(0).children().eq(0).attr('id').replace(/[^\d]/g,"");
        $('.comment-modal-ptext').text(ptext);
        $('.paragraph-id').val(pID);
        $('.comment-modal').removeClass('hidden');
    }
});

// For the new comment modal, check for valid username
$('#user-name').on('blur', function (e) {
    var name = $(this).val()
    $.get('/ajax/checkuser', {"user_name":name}, function (data) {
        // If object, username exists in DB
        if (Object.keys(data).length > 0) {
            $('.submit').attr('disabled', false);
            $('.user-id').val(data['id'])
            $('#user-name').attr('disabled', true);
            $('.profile-pic-container').empty();
            var picURL = data.img_url
            var $pic = $("<img class='profile-pic'>");
            $pic.attr('src', picURL);
            $('.profile-pic-container').append($pic);
            console.log(data['id']);
        // If string, username does not exist in DB
        } else if (typeof(data) === 'string') {
            alert('Please enter a valid user name or enter "anonymous" to post without an id. Click "create user" in the menu bar to create a new user id');
            $('#user-name').val('');
            console.log('no');
        } else {
            alert('Please enter a valid user name or enter "anonymous" to post without an id. Click "create user" in the menu bar to create a new user id');
            $('#user-name').val('');
            console.log('neither');
        }
    });
});

// Listens for cancel button to hide the modal
$('.cancel').click(function(e){
    $('.comment-modal').addClass('hidden');
    $('#user-name').val('');
    $('#new-comment-content').val('');
});

function geo_success(position) {
  console.log(position.coords.latitude, position.coords.longitude);
}

function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error);


