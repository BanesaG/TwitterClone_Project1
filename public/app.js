const text_max = 140;
const showModal = function(e) {
    e.preventDefault ();
    $('.modal-container').show()
}

const hideModal = function(e) {
    e.preventDefault();
    $('#Input').val('');
    $('#counter').html(text_max + ' characters');
    $('.modal-container').hide();
}

$('#new-tweet').on('click', showModal);
$('.close-modal').on('click', hideModal);


const render2 = function(data){
    alert(data.tweet);
    $('.center-feed').append(
        '<p><img src="assets/twitter-round-icon.png" class="avatar2" width="48" height="48"/><div class="user-date"> <span class="userTwitter"> Twitter &nbsp;&nbsp; @Twitter </span> <span class="postDate"> &nbsp; &nbsp; Oct 18 </span> <button class="delete" data-id=`${data._id}`><i class="fas fa-times"></i></button><br/><br/><div class="loadNewTweet">`${data.tweet}`</p>');
        $('#Input').val('');
        $('#counter').html(text_max + ' characters');
        $('.modal-container').hide();
}

const renderTables = (outputElement, dataList) => {
    $(outputElement).empty();
    $('#Input').val('');
    $('#counter').html(text_max + ' characters');
    $('.modal-container').hide();
    dataList.reverse();
    dataList.forEach(e => {
        const output = $(outputElement);
        const listItem = $(`<div class='user-date' id='${e._id}'>`);
        listItem.append(
                    '<span class="userTwitter"> Twitter &nbsp;&nbsp; @Twitter </span>',
                    '<span class="postDate"> &nbsp; &nbsp; Oct 18 </span>',
                    `<button class="delete"><i class="fas fa-times"></i></button>`,
                    `<div class="loadNewTweet"><p>${e.tweet}</p><br></div>`
        );

        output.append(
            '<img src="../assets/twitter-round-icon.png" class="avatar2" width="48" height="48">',
            listItem);
    });

  }

  const deleteTweet = function () {
      
    event.preventDefault();

    tweetDel = {
      tweet_id: String($(this).parent().attr('id'))
    }
          $.ajax({url: "/api/deleteTweet",  method: "DELETE", data: tweetDel}).then(function() {
              render();
            });

    
    }

  $('.center-feed').on('click','.delete' , deleteTweet);


  const render = function () {
    $('.modal-container').hide();
    $('#counter').html(text_max + ' characters');
    $.get('/api/tweet')
        .then(function(serverData){
            renderTables('.center-feed',serverData);
        })
  }

const saveInput = function(e) {
    e.preventDefault();
    const InputData = $('#Input').val();
    const postInput = {
        username: 'Twitter',
        tweet: InputData,
    }
    $.post('/api/tweet', postInput)
    .then(function(data){
        render(data);
    })
}

$('.tweet-btn').on('click', saveInput);

$.get('/api/tweet')
.then(function(serverData){
    for (let i=0; i <serverData.length; i++){
        render(serverData[i].tweet);
    }
})

$(document).ready(function () {

    render();
});

$('#Input').bind('keydown', function(event) {

    let text_length = $('#Input').val().length;
    text_remaining = text_max - text_length;
   $('#counter').html(text_remaining + ' characters');
 });