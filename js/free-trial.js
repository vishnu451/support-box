$(document).ready(function(){
    function isEmail(email) {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        }
        function IsMobileNumber(txtMobId) {
            var mob = /^[1-9]{1}[0-9]{9}$/;
            return mob.test(txtMobId)
        }
    $("#trial_form_submit").click(function(){
        var plan = findGetParameter('plan');
        $(this).attr("disabled",true);
        var to_list=[
            {"email_id":"nagarjunan.d@corefactors.in","name":"Naga"}]
        var accname = $('#name').val();
        var accemail = $('#email').val();
        var accmobile = $('#mobile').val();
        var company_name = $('#company_name').val();
        if (accname == ""){
            $("#form_error").html("Please enter your <strong>Name</strong>").attr("style","");;
            $('#name').focus().attr("style","border-color:red");
            $(this).attr("disabled",false);
    //		$(window).scrollTop($('#form_error').offset().top);
            $('html, body').animate({
            scrollTop: $("#form_error").offset().top
            }, 100);
            return false;
        }
        else{
            //$("#form_error").html("").css("display","none");
            $('#name').attr("style","");
        }
        if (accmobile == ""){
            $("#form_error").attr("style","").html("Please enter your <strong>Mobile</strong>");
            $('#mobile').focus().attr("style","border-color:red");
            $(this).attr("disabled",false);
            $('html, body').animate({
            scrollTop: $("#form_error").offset().top
            }, 100);
            return false;
        }
        else{
            if (!IsMobileNumber(accmobile)){
                $("#form_error").attr("style","").html("Please enter valid <strong>Mobile</strong>");
                $('#mobile').focus().attr("style","border-color:red");
                $(this).attr("disabled",false);
        //		$(window).scrollTop($('#form_error').offset().top);
                $('html, body').animate({
                scrollTop: $("#form_error").offset().top
                }, 100);
                return false;
            }
            else{
                $('#mobile').attr("style","");
            }
        }
        if (accemail == ""){
            $("#form_error").html("Please enter your <strong>Email</strong>").attr("style","");
            $('#email').focus().attr("style","border-color:red");
            $(this).attr("disabled",false);
    //		$(window).scrollTop($('#form_error').offset().top);
            $('html, body').animate({
            scrollTop: $("#form_error").offset().top
            }, 100);
            return false;
        }
        else{
            if (!isEmail(accemail)){
                $("#form_error").attr("style","").html("Please enter valid <strong>Email</strong>");
                $('#email').focus().attr("style","border-color:red");
                $(this).attr("disabled",false);
                $('html, body').animate({
            scrollTop: $("#form_error").offset().top
            }, 100);
                return false;
            }
            else{
                $('#email').attr("style","");
            }
            
        }
        if (company_name == ""){
            $("#form_error").html("Please enter <strong>Company Name</strong>").attr("style","");
            $('#company_name').focus().attr("style","border-color:red");
            $(this).attr("disabled",false);
    //		$(window).scrollTop($('#form_error').offset().top);
            $('html, body').animate({
            scrollTop: $("#form_error").offset().top
            }, 100);
            return false;
        }
        else{
            //$("#form_error").html("").css("display","none");
            $('#company_name').attr("style","");
        }
        $("#form_error").attr("style","display:none");
        $('#sub_spinner').attr("style","");
        $.ajax({
                url: "//teleduce.corefactors.in/signup/",
                type: "POST",
                dataType: "json",
                data: {
                    name: $("#name").val(),
                    username: $("#email").val(),
                    mobile: $("#mobile").val(),
                    email: $("#email").val(),
                    cname: $('#company_name').val(),
                    requestsource : "Sign Up - Start your free trial",
                    request_type: "signup",
                    customer_type: 'Permanent',
                 //   csrfmiddlewaretoken: '{{ csrf_token }}'
                },
                success: function (json) {
                    if (json.datas == 'username') {
                        $('#form_error').attr("style","").html(json.error);
                        $('#trial_form_submit').attr("disabled",false);
                        $('#sub_spinner').attr("style","display:none");
                        return false;
                    }
                    else if (json.datas == 'email') {
                        $('#form_error').attr("style","").html(json.error);
                        $('#trial_form_submit').attr("disabled",false);
                        $('#sub_spinner').attr("style","display:none");
                        return false;
                    }
                    else if (json.datas == 'mobile') {
                        $('#form_error').attr("style","").html(json.error);
                        $('#trial_form_submit').attr("disabled",false);
                        $('#sub_spinner').attr("style","display:none");
                        return false;
                    }
                    else if (json.datas == 'success') {
                       
                        $.ajax({
                            url: 'https://teleduce.corefactors.in/lead/apiwebhook/32c17645-575d-4ffe-bd89-0a80622b47f2/Default/',
                            type: "POST",
                            dataType: "json",
                            data: {
                                "mobile" : accmobile,
                                "email" : accemail,
                                "first_name" : accname,
                                "plans" : plan,
                                "company_name" : company_name,
                                "leadsource" : "Website",
                            },
                            success: function(json) {
                                console.log(json.response + ": " + json.response_code);
                            },
                            error: function(xhr, errmsg, err){
                                console.log(xhr.status + ": " + xhr.responseText);
                            }
                        });
                        
                        $("#form_error").attr("style","display:none");
                        $.ajax({
                            type: "GET",
                            url: json.domain_url,
                            dataType: "json",
                            success: function (json1) {
                                // 	 window.location.href = json1.domain1
                                $('#trial-form').trigger('reset');
                                $("#form_error").attr("style","display:none");
                                $("#form_success").attr("style","").html('We have sent an email to you. Please verify your email address. Once verified, your account will get activated.');
                                $('#trial_form_submit').attr("disabled",false);
                                $('#sub_spinner').attr("style","display:none");
                                setTimeout(window.location.replace("free-trial/thankyou.html"), 2000);
                                return false;
                            },
                            error: function (xhr, errmsg, err) {
                                $('#form_error').attr("style","").html("Some error has been occured");
                                $('#trial_form_submit').attr("disabled",false);
                                $('#sub_spinner').attr("style","display:none");
                                return false;
                            }
                        });
                        return false;
                    }
                },
                error: function (xhr, errmsg, err) {
                    $('#form_error').attr("style","").html("Some error has been occured");
                    $('#trial_form_submit').attr("disabled",false);
                    $('#sub_spinner').attr("style","display:none");
                    return false;
                }

            });	
            return false;
    });
    
});