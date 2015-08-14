console.log("article.js linked");

$('.paragraph').click(function(e){
    var row = e.currentTarget.children;
    var commentSection = $(row).eq(1);
    var targetId = e.target.id;
    var paragraphId = targetId.replace(/[^\d]/g,"");
    $.get('/ajax/paragraphs/'+paragraphId, function (data) {
        $(commentSection).html(data);
    });
});