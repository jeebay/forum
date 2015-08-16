console.log("article.js linked");

$('.paragraph').click(function(e){
    var row = e.currentTarget.children;
    var commentSection = $(row).eq(1);
    var targetId = e.target.id;
    console.log(targetId);
    if (/p\d+/.test(targetId)) {
        var paragraphId = targetId.replace(/[^\d]/g,"");
        $.get('/ajax/paragraphs/'+paragraphId, function (data) {
            $(commentSection).html(data);
        });
    } else if (targetId === "hide-comments") {
        $(commentSection).empty();
    } else if (targetId === "new-comment") {
        var ptext = $(row).eq(0).children().eq(0).html();
        $('.comment-modal-ptext').text(ptext);
        $('.comment-modal').removeClass('hidden');
    }
});

$('.hide-comments').click(function(e){
    console.log(e);
})