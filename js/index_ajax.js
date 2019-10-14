//console.log("Working!");
let nextPage = "",
  prevPage = "";

function watchForm(){
  $('#submitButton').on( 'click', function( event ){
    event.preventDefault();

      //console.log("Clicked !");

    // Check if empty textfield exists
    if ($("#textfield").val() === "") {
      return;
    };

    //API CODE: AIzaSyCVjyJ1MI4QJuVSkFj-jIiyxfjbGvaVvbM
    let textField = document.getElementById ("textfield");
    let newName = textField.value
      //console.log(newName);

    //check if the input is not empty
    textField.value = "" // §("textField").val("");
    $("#videos").empty();


    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search",
      data: { part: "snippet", key: "AIzaSyCVjyJ1MI4QJuVSkFj-jIiyxfjbGvaVvbM", q: newName, maxResults: 10 },
      method: "GET",
      dataType: "json",
      success: function(responseJSON){
        //console.log(responseJSON);

        prevPage = responseJSON.prevPageToken; // ""
        nextPage = responseJSON.nextPageToken;
          //console.log(responseJSON.items.length);

        responseJSON.items.forEach(function(item) {
          $( '#videos' ).append(`<li>
                                    <a class="img" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                    <div>${item.snippet.title}</div>
                                    </a>
                                    <a class="img" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                    <img src="${item.snippet.thumbnails.default.url}" />
                                    </a>
                               </li>`);
        })

        let buttonsText;
        if(!prevPage && !nextPage) {
          buttonsText = `<div>No more pages.</div>`
        } else if(!prevPage){
          buttonsText =`<div>
                            <input type="submit" value="next" id="forward"/>
                        </div>`

        } else if(!nextPage){
          buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                        </div>`

        } else {
          `<div>
              <input type="submit" value="previous" id="backward"/>
              <input type="submit" value="next" id="forward"/>
          </div>`
        }

        $( '#videos' ).append(buttonsText);
      },

      error:function (err) {
        $( '#videos' ).html(`<li>
                              Something went wrong. Try again later
                            </li>`);
        }
      });

//forward Button
  $('#videos').on( 'click', '#forward', function( event ){
    event.preventDefault();

      //console.log("Clicked forward!");
    $("#videos").empty();

    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search",
      data: { part: "snippet", key: "AIzaSyCVjyJ1MI4QJuVSkFj-jIiyxfjbGvaVvbM", q: newName, maxResults: 10, pageToken: nextPage },
      method: "GET",
      dataType: "json",
      success: function(responseJSON){
        //console.log(responseJSON);

      prevPage = responseJSON.prevPageToken;
      nextPage = responseJSON.nextPageToken;

      responseJSON.items.forEach(function(item) {
        $( '#videos' ).append(`<li>
                                  <a class="img" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                  <div>${item.snippet.title}</div>
                                  </a>
                                  <a class="img" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                  <img src="${item.snippet.thumbnails.default.url}" />
                                  </a>
                              </li>`);
        })

        let buttonsText;
          //console.log(prevPage);
          //console.log(nextPage);

        if(!prevPage && !nextPage) {
          buttonsText = `<div>No more pages.</div>`
        } else if(!prevPage){
          buttonsText =`<div>
                          <input type="submit" value="next" id="forward"/>
                        </div>`

        } else if(!nextPage){
          buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                        </div>`

        } else {
          buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                            <input type="submit" value="next" id="forward"/>
                        </div>`
        }

        $( '#videos' ).append(buttonsText);
        },
      error:function (err) {
        $( '#videos' ).html(`<li>
                              Unexpected error.
                            </li>`);
        }
      });
      });

//backward Button
  $('#videos').on( 'click', '#backward', function( event ){
    event.preventDefault();

      //console.log("Clicked backward!");
    $("#videos").empty();


    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search",
      data: { part: "snippet", key: "AIzaSyCVjyJ1MI4QJuVSkFj-jIiyxfjbGvaVvbM", q: newName,maxResults: 10, pageToken: prevPage },
      method: "GET",
      dataType: "json",
      success: function(responseJSON){
        //console.log(responseJSON);

      prevPage = responseJSON.prevPageToken;
      nextPage = responseJSON.nextPageToken;

      responseJSON.items.forEach(function(item) {
        $( '#videos' ).append(`<li>
                                  <a class="img" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                  <div>${item.snippet.title}</div>
                                  </a>
                                  <a class="img" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                  <img src="${item.snippet.thumbnails.default.url}" />
                                  </a>
                              </li>`);
        })
        let buttonsText;
        if(!prevPage && !nextPage) {
          buttonsText = `<div>No more pages.</div>`
        } else if(!prevPage){
          buttonsText =`<div>
                            <input type="submit" value="next" id="forward"/>
                        </div>`

        } else if(!nextPage){
          buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                        </div>`

        } else {
          buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                            <input type="submit" value="next" id="forward"/>
                        </div>`
        }

        $( '#videos' ).append(buttonsText);
        },
        error:function (err) {
        $( '#videos' ).html(`<li>
                                Unexpected error.
                              </li>`);
          },
        });

    });

  });

}


watchForm();
