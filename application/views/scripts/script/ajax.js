//Al leer la pagina chequea si hay un usuario
$(document).ready(check_users);

//Funcion encargada de agregar un contacto a la cuenta de Alegra
function add_contact()
{
    var name = document.getElementById("name_client").value;
    if(name != null && name != "")
    {
        var json = {
                "name":document.getElementById("name_client").value,
                "identification":document.getElementById("id_client").value ,
                "email":document.getElementById("email_client").value,
                 "address" : {
                        "address" :document.getElementById("address_client").value,
                        "city" : document.getElementById("city_client").value
                },
                "phonePrimary":document.getElementById("phone1_client").value,
                "phoneSecondary":document.getElementById("phone2_client").value,
                "mobile":document.getElementById("mobile_client").value,
                "observations":document.getElementById("observations").value,
            };
        json = JSON.stringify(json);
        $.ajax({
            async : true,
            type : "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            headers: {
                Accept: "*/*",
                authorization: "Basic "+sessionStorage.getItem("user")
                },
            data:json,
            url : 'https://app.alegra.com/api/v1/contacts/',
            dataType : "html",
            success:function () {
                delete_content(),
                delete_style_alert(),
                load_contacs(null)
            },
            error: check_error
        })
    }
    else
    {
        alert_forms("Es necesario por lo menos un nombre para crear un contacto");
    }
}

//chequear si hay un error en el  envio del nuevo contacto
function check_error(connect,textStatu,errorThrown)
{
    switch(connect.status)
    {
        case 400:
            alert_forms("El email ingresado no es valido");
        break;
        case 404:
            alert_forms("No hay conexi&oacute;n ha internet");
        break;
    }
}

//funcion que se encarga de chequear si hay un usuario temporal
function check_users()
{
    var token = sessionStorage.getItem('user');
    if(token == null)
        insert_login();
    else
        load_contacs(null);
}

//autentificar si hay datos para crear un session
function auth_users()
{
    if(document.getElementById("input-user").value != null && document.getElementById("input-token").value != null)
    {
        var token = btoa(document.getElementById('input-user').value+":"+document.getElementById("input-token").value);
        check_exist(token);
    }
    else
    {
        alert_forms("No ha ingresado usuario");
    }
}

//Aqui va a ordenar carga los contactos de la API de alegra asociados
function load_contacs(id)
{
    if(id==null)
    {
        $.ajax({
        async : true,
        type : "GET",
        headers: {
            Accept: "*/*",
            authorization: "Basic "+sessionStorage.getItem("user")
            },
        dataType : "html",
        url : 'https://app.alegra.com/api/v1/contacts/',
        success: insert_contacts
        });
    }
    else
    {
                $.ajax({
        async : true,
        type : "GET",
        headers: {
            Accept: "*/*",
            authorization: "Basic "+sessionStorage.getItem("user")
            },
        dataType : "html",
        url : 'https://app.alegra.com/api/v1/contacts/'+id,
        success: view_client
        })
    }
}


function check_exist(token)
{
      $.ajax({
        async : true,
        type : "GET",
        headers: {
            Accept: "*/*",
            authorization: "Basic "+token
            },
        dataType : "html",
        url : 'https://app.alegra.com/api/v1/contacts/',
        success: function () {
            delete_style_alert();
            sessionStorage.setItem("user",token);
            load_contacs(null);
        },
        error: error_auth
        });
}

function error_auth(connect,textStatu,errorThrown)
{
    switch(connect.status)
    {
        case 401:
            alert_forms("El usuario o contrase&ntilde;a son incorrectos");
        break;
        case 404:
            alert_forms("Pagina no encontrada");
        break;
    }
}