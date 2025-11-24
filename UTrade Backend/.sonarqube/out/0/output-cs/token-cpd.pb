º
hC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\TiposReporteDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
TiposReporteDTO		  
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ¥
fC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\TipoAccionDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
TipoAccionDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
IdTipoMensaje #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
IdPersonaRemitente (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
string 
IdPersonaReportada (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
string 
? 
TipoId 
{ 
get  #
;# $
set% (
;( )
}* +
} 
} ê
bC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\SesionDTO.cs
	namespace 	
DTO
 
{		 
public

 

class

 
	SesionDTO

 
{ 
public 
string 
	IdUsuario 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
Correo 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
Contrase√±a  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
? 
Telefono 
{  !
get" %
;% &
set' *
;* +
}, -
} 
} ®
_C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\RolDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
RolDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
=' (
null) -
!- .
;. /
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
=+ ,
null- 1
!1 2
;2 3
} 
} Õ
cC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\Rese√±aDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 

Rese√±aDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
int 
Calificacion 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 

Comentario !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
string 
IdPublicacion #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
	IdPersona 
{  !
get" %
;% &
set' *
;* +
}, -
public 
DateTime 
Fecha 
{ 
get  #
;# $
set% (
;( )
}* +
public 
bool 

Verificado 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
virtual 
ICollection "
<" #
LikesDTO# +
>+ ,
?, -
Likes. 3
{4 5
get6 9
;9 :
set; >
;> ?
}@ A
} 
} Ÿ
dC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\ReportesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
ReportesDTO		 
{

 
public 
string 
	IdReporte 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
IdTipoReporte #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
IdEstado 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
DateTime 
FechaReportada &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DateTime 
? 
FechaActualizacion +
{, -
get. 1
;1 2
set3 6
;6 7
}8 9
public 
bool 
Leido 
{ 
get 
;  
set! $
;$ %
}& '
public 
string 
IdReportante "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
string 
IdReportado !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
string 
IdMotivo 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
? 
Descripcion "
{# $
get% (
;( )
set* -
;- .
}/ 0
} 
}   ™
cC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\RazonesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 

RazonesDTO		 
{

 
public 
string 
IdRazon 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
public 
virtual 
ICollection "
<" #
ContactanosDTO# 1
>1 2
Contactanos3 >
{? @
getA D
;D E
setF I
;I J
}K L
} 
} ô
iC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\PublicacionesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
PublicacionesDTO		 !
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Titulo 
{ 
get "
;" #
set$ '
;' (
}) *
public 
DateTime 
FechaPublicacion (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
string 
	IdUsuario 
{  !
get" %
;% &
set' *
;* +
}, -
public 
decimal 
? 
Precio 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
? 
IdCategoria "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
string 
Descripcion !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
string 
? 
IdEstado 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
	Direccion  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
decimal 
? 
Altitud 
{  !
get" %
;% &
set' *
;* +
}, -
public 
decimal 
? 
Latitud 
{  !
get" %
;% &
set' *
;* +
}, -
public   
List   
<   !
FotosPublicacionesDTO   )
>  ) *
?  * +
fotosPublicaciones  , >
{  ? @
get  A D
;  D E
set  F I
;  I J
}  K L
}"" 
}## Å
cC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\PersonaDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 

PersonaDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Nombres 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
	Apellidos 
{  !
get" %
;% &
set' *
;* +
}, -
public 
DateOnly 
? 
FechaNacimiento (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
string 
? 
Genero 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
IdRol 
{ 
get !
;! "
set# &
;& '
}( )
public 
string 
NombreUsuario #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
Contrase√±a  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
? 
Correo 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
Telefono 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
FotoPerfilBase64 '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
public   
byte   
[   
]   
?   

FotoPerfil   !
{  " #
get  $ '
;  ' (
set  ) ,
;  , -
}  . /
public"" 
string"" 
?"" 
IdEstado"" 
{""  !
get""" %
;""% &
set""' *
;""* +
}"", -
}## 
}$$ ∞	
jC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\NotificacionesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
NotificacionesDTO		 "
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
	IdPersona 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
IdTipoAccion "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
DateOnly 
Fecha 
{ 
get  #
;# $
set% (
;( )
}* +
public 
TimeOnly 
Hora 
{ 
get "
;" #
set$ '
;' (
}) *
public 
bool 
Estado 
{ 
get  
;  !
set" %
;% &
}' (
} 
} ¿
jC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\MotivosReporteDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
MotivosReporteDTO		 "
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ‚
dC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\MensajesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
MensajesDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
ChatId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
AutorId 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
Mensaje1 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
DateTime 
Hora 
{ 
get "
;" #
set$ '
;' (
}) *
public 
virtual 
ICollection "
<" #
ArchivosAdjuntosDTO# 6
>6 7
ArchivosAdjuntos8 H
{I J
getK N
;N O
setP S
;S T
}U V
public 
virtual 

PersonaDTO !
Autor" '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
public 
virtual 
ChatDTO 
Chat #
{$ %
get& )
;) *
set+ .
;. /
}0 1
} 
} √
iC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\MensajeAccionDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
MensajeAccionDTO		 !
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Descripcion !
{" #
get$ '
;' (
set) ,
;, -
}. /
} 
} Ä
aC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\LoginDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
LoginDTO		 
{

 
public 
string 
? 
Correo 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
Telefono 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
Contrase√±a !
{" #
get$ '
;' (
set) ,
;, -
}. /
} 
} Œ
aC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\LikesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
LikesDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
	IdRese√±a 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
	IdPersona 
{  !
get" %
;% &
set' *
;* +
}, -
} 
} ∞
nC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\FotosPublicacionesDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 !
FotosPublicacionesDTO		 &
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
byte 
[ 
] 
Foto 
{ 
get  
;  !
set" %
;% &
}' (
public 
string 
? 

FotoBase64 !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
string 
IdPublicacion #
{$ %
get& )
;) *
set+ .
;. /
}0 1
} 
} ⁄
eC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\FavoritosDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
FavoritosDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
	IdPersona 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
IdPublicacion #
{$ %
get& )
;) *
set+ .
;. /
}0 1
} 
} ¿
jC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\EstadosReporteDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
EstadosReporteDTO		 "
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ≤
cC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\EstadosDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 

EstadosDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} Ñ
tC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\EnviarCorreoVerificacionDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 '
EnviarCorreoVerificacionDTO		 ,
{

 
public 
string 
CorreoDestino #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
Asunto 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
CodigoVerficacion '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
} 
} ∞
oC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\EnviarCorreoSoporteDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 "
EnviarCorreoSoporteDTO		 '
{

 
public 
string 
CorreoDestino #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
Asunto 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
Mensaje 
{ 
get  #
;# $
set% (
;( )
}* +
public 

RazonesDTO 
Razon 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
CorreoRespuesta %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
} 
} ‹
hC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\CrearMensajeDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
CrearMensajeDTO		  
{

 
public 
string 
ChatId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
AutorId 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
Mensaje 
{ 
get  #
;# $
set% (
;( )
}* +
} 
} Â
eC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\CrearChatDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
CrearChatDTO		 
{

 
public 
string 

Usuario1Id  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 

Usuario2Id  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
DateTime 
FechaCreacion %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
} 
} ˜
gC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\ContactanosDTO.cs
	namespace 	
DTO
 
{		 
public

 

class

 
ContactanosDTO

 
{ 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
	IdPersona 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
IdRazon 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
Descripcion !
{" #
get$ '
;' (
set) ,
;, -
}. /
} 
} ‹
nC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\CodigoVerificacionDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 !
CodigoVerificacionDTO		 &
{

 
public 
string 
CodigoRegistro $
{% &
get' *
;* +
set, /
;/ 0
}1 2
public 
string 
CodigoRecibido $
{% &
get' *
;* +
set, /
;/ 0
}1 2
} 
} ‰
oC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\CodigosVerificacionDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 "
CodigosVerificacionDTO		 '
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Codigo 
{ 
get "
;" #
set$ '
;' (
}) *
public 
TimeOnly 
Hora 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} »
`C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\ChatDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
ChatDTO		 
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 

Usuario1Id  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 

Usuario2Id  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
DateTime 
FechaCreacion %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
virtual 
ICollection "
<" #
MensajesDTO# .
>. /
Mensajes0 8
{9 :
get; >
;> ?
set@ C
;C D
}E F
public 
virtual 

PersonaDTO !
Usuario1" *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
public 
virtual 

PersonaDTO !
Usuario2" *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
} 
} Ã
pC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\CategoriaPublicacionDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 #
CategoriaPublicacionDTO		 (
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
string 
Nombre 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ˛
lC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\DTO\ArchivosAdjuntosDTO.cs
	namespace 	
DTO
 
{ 
public		 

class		 
ArchivosAdjuntosDTO		 $
{

 
public 
string 
Id 
{ 
get 
; 
set  #
;# $
}% &
public 
byte 
[ 
] 
Archivo 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
	IdMensaje 
{  !
get" %
;% &
set' *
;* +
}, -
} 
} 