$(document).ready(function() {
    // Submit post on submit
    $('#post-form').on('submit', function(event){
        event.preventDefault();
        console.log("form submitted!")  // sanity check
        create_task();
    });

    // AJAX for posting
    function create_task() {
        console.log("create post is working!") // sanity check
        $.ajax({
            url : "tasks/store", // the endpoint
            type : "POST", // http method
            data : { the_post : $('#post-title').val() }, // data sent with the post request

            // handle a successful response
            success : function(json) {
                $('#post-text').val(''); // remove the value from the input
                console.log(json); // log the returned json to the console
                console.log("success"); // another sanity check
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    };

    var form = document.getElementById("login_submit_form");
    document.getElementById("loginSubmit").addEventListener("click", function () {
        submitMailForm();
        return false;
    });

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
    
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
    
        return indexed_array;
    }

    // submit form
    function submitMailForm() {

        var url = $('#login_submit_form').attr('data-form-action');
        var formData = $('#login_submit_form');
        formData = getFormData(formData);
        formData = JSON.stringify(formData);

        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'JSON',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            processData: false,
            beforeSend: function() {
                // Even before ajax call
                $('.ajax_spinner').show();
            },
            complete: function() {
                // Handle the complete event
                $('.ajax_spinner').fadeOut('500');
            },
            success: function(response) {
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            } 
            /*success: function(response) {
                console.log(3);
                console.log(response);
                if (response.results.status == true) {
                    // success message
                    var content = response;
                    var templateScript = $("#ajax_error_message_template").html();
                    var template = Handlebars.compile(templateScript);
                    var html = template(content);

                    $('.alert_container').html(html);

                    // // scroll to error page
                    $('body,html').animate({
                        scrollTop: $(".alert_container:eq(0)").offset().top - 200 // include header herihgt
                    });

                    setTimeout(function() {
                        $('.alert_container .alert').slideUp(500, function() {
                            $(this).remove();
                            // redirect to listing page
                            window.location = $.trim($('.page_navigation').attr('href'));
                        });
                    }, 2900);

                } else if (response.results.status == false) {
                    // error message
                    var content = response;
                    var templateScript = $("#ajax_error_message_template").html();
                    var template = Handlebars.compile(templateScript);
                    var html = template(content);

                    $('.alert_container').html(html);

                    // scroll to error page
                    $('body,html').animate({
                        scrollTop: $(".alert_container:eq(0)").offset().top - 200 // include header herihgt
                    });

                } else {
                    // Show server error message 
                    $('#server_error_modal .message').text('API error occured.');
                    $('#server_error_modal').modal('show');
                }

            },*/
        });

    }

});