//funcion encargada de hacer un formulario para ingresar un usuario con su token de la API de alegra
function insert_login()
{
    var content = '<form action=javascript:auth_users(); id="login"><div id="login_user"></div><div id="error"></div><div><label>Usuario:</label><input type="text" name="user" id="input-user"></div><div><label>Contraseña: </label><input type="text" name="token" id="input-token"></div><div><input type="button" value="ingresar" id="Sing-it"></div></div></form>';
    add_style_alert();
    $("#alert").html(content);
    $("#Sing-it").click(auth_users);
}

//ingresa el formulario para poder crear un contacto
function new_client()
{
    //varible que contendra el formulario y todo
    var content = "<div onclick=delete_style_alert(); id='exit'>Cerrar</div><br><div id='error'></div><form id='add_contact'>";
    content = content+"<div><label>Nombre: </label><input type='text' id='name_client'></div>";
    content = content+"<div><label>Idenficacion: </label><input type='text' id='id_client'></div>";
    content = content+"<div><label>Direcci&oacute;n: </label><input type='text' id='address_client'></div>";
    content = content+"<div><label>Ciudad: </label><input type='text' id='city_client'></div>";
    content = content+"<div><label>Correo electronico: </label><input type='text' id='email_client'></div>";
    content = content+"<div><label>Telefono 1: </label><input type='text' id='phone1_client'></div>";
    content = content+"<div><label>Telefono 2: </label><input type='text' id='phone2_client'></div>";
    content = content+"<div><label>Celular: </label><input type='text' id='mobile_client'></div>";
    content = content+"<div><label>Observaciones: </label><textarea id='observations'></textarea></div>";
    content = content+"<div><input type='button' id='Sing-it' value='Crear contacto' onclick=add_contact()></div></form>";
    add_style_alert();
    $("#alert").css("margin-top","10px");
    $("#alert").css("width","350px");
    //metemos todo el contenido en la id alert
    $("#alert").html(content);
}

//funcion encarga de hacer el formulario para agregar un nuevo cliente
function view_client(client)
{
    client = JSON.parse(client);//la variable client pasa a ser un array extraido de un json
    add_style_alert();
    var content = "<div><div onclick=delete_style_alert(); id='exit'>Cerrar</div><div><h3>"+client.name+"</h3></div>";
    content = content +"<div><label>Nombre: </label>"+client.name+"</div>";
    content = content+"<div><label>Identificaci&oacute;n: </label>"+client.identification+"</div>";
    content = content+"<div><label>Telefono 1: </label>"+client.phonePrimary+"</div>";
    content = content+"<div><label>Telefono 2: </label>"+client.phoneSecondary+"</div>";
    content = content+"<div><label>Celular: </label>"+client.mobile+"</div>";
    content = content+"<div><label>Direcci&oacute;n: </label>"+client.address.address+"</div>";
    content = content+"<div><label>Ciudad: </label>"+client.address.city+"</div>";
    content = content+"<div><label>Correo Electronico: </label>"+client.email+"</div>";
    content = content+"<div width='300px'><label>Observaciones: </label>"+client.observations+"</div></div>";

    $("#alert").html(content);
}

//funcion que se encarga de carga la tabla con todos los contactos que tiene la cuenta registrada
function table_contacs()
{
    var content = $("#content-document");
    content.append("<table id='client'><div id='context'><tr><td> Nombre </td> <td> Identificación </td> <td> Teléfono </td> <td> Observaciones </td><td> Ver contacto </td></tr></div>");
}

//mostrar los datos de los contactos
function insert_contacts(data)
{
    table_contacs();//crea la tabla de contactos
    var client = JSON.parse(data);//pasa los datos a un array

    for(i=0; i < client.length; i++)
    {
        /* Fraccione esto en una varible unificatoria para poder ver los datos mejor :D
	ademas de que me permite ver los datos en correspondiente del array dado por los datos */
        var x = "<tr id='cols'><td>"+client[i].name+"</td><td>";
        x = x+ client[i].identification+"</td><td>";
        x = x+client[i].phonePrimary+"</td><td>";
        if(client[i].observations.length > 20)
        {
            x = x+client[i].observations.substr(0,20)+"...</td>";
        }
        else
        {
            x = x+client[i].observations+"</td>";
        }
        x = x+"<td><a href=javascript:load_contacs("+client[i].id+")>Ver</a></td></tr>";

	//agregue hijos a la tabla de id "client"
        $("#client").append(x);
    }
    $("#content-document").append("</table><div onclick=new_client(); id='new_contact'><label> Crear un nuevo contacto </label></div>");

}

//da una alerta de de errores o exito al crear un contacto
function alert_forms(msg)
{
    $("#error").html(" * "+msg+" * ");
}

//pone visible la alert de un mensaje como un error o  algo asi
function add_style_alert()
{
	$("#msg-box").css("display","block");
	$("#alert").css("display","block");
}

//oculta el alert de un mensaje de error...
function delete_style_alert()
{
    $("#alert").css("display","none");
    $("#msg-box").css("display","none");
}

function delete_content()
{
    $("#content-document").html(null);
}