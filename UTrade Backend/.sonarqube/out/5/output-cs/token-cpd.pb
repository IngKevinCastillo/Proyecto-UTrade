®1
eC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\IOC\Dependencias.cs
	namespace 	
IOC
 
{ 
public 

static 
class 
Dependencias $
{ 
public 
static 
void  
InyectarDependencias /
(/ 0
this0 4
IServiceCollection5 G
servicesH P
,P Q
IConfigurationR `
configurationa n
)n o
{ 	
services 
. 
AddDbContext !
<! "
UtradedbContext" 1
>1 2
(2 3
options3 :
=>; =
{ 
options 
. 
UseSqlServer $
($ %
configuration% 2
.2 3
GetConnectionString3 F
(F G
$strG R
)R S
)S T
;T U
} 
) 
; 
services 
. 
AddTransient !
(! "
typeof" (
(( ) 
IRepositorioGenerico) =
<= >
>> ?
)? @
,@ A
typeofB H
(H I
RepositorioGenericoI \
<\ ]
>] ^
)^ _
)_ `
;` a
services 
. 
AddAutoMapper "
(" #
typeof# )
() *
PerfilAutoMapper* :
): ;
); <
;< =
services 
. 
	AddScoped 
< 
IPersonaServicio /
,/ 0
PersonaServicio1 @
>@ A
(A B
)B C
;C D
services 
. 
	AddScoped 
< 
IRolServicio +
,+ ,
RolServicio- 8
>8 9
(9 :
): ;
;; <
services 
. 
	AddScoped 
< !
INotificacionServicio 4
,4 5 
NotificacionServicio6 J
>J K
(K L
)L M
;M N
services   
.   
	AddScoped   
<   
IReporteServicio   /
,  / 0
ReporteServicio  1 @
>  @ A
(  A B
)  B C
;  C D
services!! 
.!! 
	AddScoped!! 
<!!  
ITipoReporteServicio!! 3
,!!3 4
TipoReporteServicio!!5 H
>!!H I
(!!I J
)!!J K
;!!K L
services"" 
."" 
	AddScoped"" 
<"" "
IEstadoReporteServicio"" 5
,""5 6!
EstadoReporteServicio""7 L
>""L M
(""M N
)""N O
;""O P
services## 
.## 
	AddScoped## 
<## "
IMotivoReporteServicio## 5
,##5 6!
MotivoReporteServicio##7 L
>##L M
(##M N
)##N O
;##O P
services%% 
.%% 
	AddScoped%% 
<%% 
ITipoAccionServicio%% 2
,%%2 3
TipoAccionServicio%%4 F
>%%F G
(%%G H
)%%H I
;%%I J
services&& 
.&& 
	AddScoped&& 
<&& "
IMensajeAccionServicio&& 5
,&&5 6!
MensajeAccionServicio&&7 L
>&&L M
(&&M N
)&&N O
;&&O P
services'' 
.'' 
	AddScoped'' 
<'' "
IPublicacionesServicio'' 5
,''5 6!
PublicacionesServicio''7 L
>''L M
(''M N
)''N O
;''O P
services(( 
.(( 
	AddScoped(( 
<(( )
ICategoriaPublicacionServicio(( <
,((< =(
CategoriaPublicacionServicio((> Z
>((Z [
((([ \
)((\ ]
;((] ^
services)) 
.)) 
	AddScoped)) 
<)) '
IFotosPublicacionesServicio)) :
,)): ;&
FotosPublicacionesServicio))< V
>))V W
())W X
)))X Y
;))Y Z
services** 
.** 
	AddScoped** 
<**  
IContactanosServicio** 3
,**3 4
ContactanosServicio**5 H
>**H I
(**I J
)**J K
;**K L
services++ 
.++ 
	AddScoped++ 
<++ 
IRazonServicio++ -
,++- .
RazonesServicio++/ >
>++> ?
(++? @
)++@ A
;++A B
services,, 
.,, 
	AddScoped,, 
<,, 
IRegistroServicio,, 0
,,,0 1
RegistroServicio,,2 B
>,,B C
(,,C D
),,D E
;,,E F
services-- 
.-- 
	AddScoped-- 
<-- 
IEstadosServicio-- /
,--/ 0
EstadosServicio--1 @
>--@ A
(--A B
)--B C
;--C D
services.. 
... 
	AddScoped.. 
<.. (
ICodigosVerificacionServicio.. ;
,..; <'
CodigosVerificacionServicio..= X
>..X Y
(..Y Z
)..Z [
;..[ \
services// 
.// 
	AddScoped// 
<// 
IChatServicio// ,
,//, -
ChatServicio//. :
>//: ;
(//; <
)//< =
;//= >
services00 
.00 
	AddScoped00 
<00 
IMensajesServicio00 0
,000 1
MensajesServicio002 B
>00B C
(00C D
)00D E
;00E F
services11 
.11 
	AddScoped11 
<11 
IFavoritosServicio11 1
,111 2
FavoritosServicio113 D
>11D E
(11E F
)11F G
;11G H
services22 
.22 
	AddScoped22 
<22 
IReseniaServicio22 /
,22/ 0
ReseniasServicio221 A
>22A B
(22B C
)22C D
;22D E
services33 
.33 
	AddScoped33 
<33 
ILikesServicio33 -
,33- .
LikesServicio33/ <
>33< =
(33= >
)33> ?
;33? @
}44 	
}55 
}66 