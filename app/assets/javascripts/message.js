$(function(){ 
  last_message_id = $('.message:last').data("message-id");
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  	  var html =
  	    `<div class="message" data-message-id= "${message.id}">
          <div class="message__group-info">
            <div class="chat-main__member">
              ${message.user_name}
            </div>
            <div class="chat-main__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
    return html;
  }
 $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
   .done(function(data){
     var html = buildHTML(data);
     $('.messages').append(html);
     $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
     $('form')[0].reset();
   })
   .fail(function() {
    alert("メッセージ送信に失敗しました");
   })
   .always(() => {
    $(".form__submit").removeAttr("disabled");
   });
})

var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
    var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.messages').append(insertHTML);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $("#new_message")[0].reset();
    $(".form__submit").prop("disabled", false);
    }
  })
  .fail(function() {
    alertthe('error');
  });
};
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
