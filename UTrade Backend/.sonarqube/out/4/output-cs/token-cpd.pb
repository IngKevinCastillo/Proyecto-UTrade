ò:
vC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\TipoReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
TipoReporteServicio $
:% & 
ITipoReporteServicio' ;
{ 
private 
readonly  
IRepositorioGenerico -
<- .
TiposReporte. :
>: ;#
_tipoReporteRepositorio< S
;S T
private 
readonly 
IMapper  
_mapper! (
;( )
public 
TipoReporteServicio "
(" # 
IRepositorioGenerico# 7
<7 8
TiposReporte8 D
>D E"
tipoReporteRepositorioF \
,\ ]
IMapper^ e
mapperf l
)l m
{ 	#
_tipoReporteRepositorio #
=$ %"
tipoReporteRepositorio& <
;< =
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
TiposReporteDTO )
>) *
Crear+ 0
(0 1
TiposReporteDTO1 @
modeloA G
)G H
{ 	
try 
{ 
var 
TipoReporteCreado %
=& '
await( -#
_tipoReporteRepositorio. E
.E F
CrearF K
(K L
_mapperL S
.S T
MapT W
<W X
TiposReporteX d
>d e
(e f
modelof l
)l m
)m n
;n o
if 
( 
TipoReporteCreado %
.% &
Id& (
==) +
null, 0
)0 1
throw 
new 
	Exception '
(' (
$str( :
): ;
;; <
return 
_mapper 
. 
Map "
<" #
TiposReporteDTO# 2
>2 3
(3 4
TipoReporteCreado4 E
)E F
;F G
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 
bool'' 
>'' 
Editar''  &
(''& '
TiposReporteDTO''' 6
modelo''7 =
)''= >
{(( 	
try)) 
{** 
var++ 
tipoReporteModelo++ %
=++& '
_mapper++( /
.++/ 0
Map++0 3
<++3 4
TiposReporte++4 @
>++@ A
(++A B
modelo++B H
)++H I
;++I J
var,, !
tipoReporteEncontrado,, )
=,,* +
await,,, 1#
_tipoReporteRepositorio,,2 I
.,,I J
Obtener,,J Q
(,,Q R
x,,R S
=>,,T V
x,,W X
.,,X Y
Id,,Y [
==,,\ ^
modelo,,_ e
.,,e f
Id,,f h
),,h i
;,,i j
if-- 
(-- !
tipoReporteEncontrado-- )
==--* ,
null--- 1
)--1 2
throw.. 
new.. !
TaskCanceledException.. 3
(..3 4
$str..4 F
)..F G
;..G H!
tipoReporteEncontrado// %
.//% &
Nombre//& ,
=//- .
tipoReporteModelo/// @
.//@ A
Nombre//A G
;//G H
bool00 
	respuesta00 
=00  
await00! &#
_tipoReporteRepositorio00' >
.00> ?
Editar00? E
(00E F!
tipoReporteEncontrado00F [
)00[ \
;00\ ]
if11 
(11 
!11 
	respuesta11 
)11 
throw22 
new22 !
TaskCanceledException22 3
(223 4
$str224 G
)22G H
;22H I
return33 
	respuesta33  
;33  !
}44 
catch55 
{66 
throw77 
;77 
}88 
}99 	
public;; 
async;; 
Task;; 
<;; 
TiposReporteDTO;; )
>;;) *
Buscar;;+ 1
(;;1 2
string;;2 8
id;;9 ;
);;; <
{<< 	
try>> 
{?? 
var@@ 
queryRol@@ 
=@@ 
await@@ $#
_tipoReporteRepositorio@@% <
.@@< =
Obtener@@= D
(@@D E
x@@E F
=>@@G I
x@@J K
.@@K L
Id@@L N
==@@O Q
id@@R T
)@@T U
;@@U V
returnBB 
_mapperBB 
.BB 
MapBB "
<BB" #
TiposReporteDTOBB# 2
>BB2 3
(BB3 4
queryRolBB4 <
)BB< =
;BB= >
}CC 
catchDD 
{EE 
throwFF 
;FF 
}GG 
}HH 	
publicJJ 
asyncJJ 
TaskJJ 
<JJ 
boolJJ 
>JJ 
EliminarJJ  (
(JJ( )
stringJJ) /
idJJ0 2
)JJ2 3
{KK 	
tryLL 
{MM 
varNN !
tipoReporteEncontradoNN )
=NN* +
awaitNN, 1#
_tipoReporteRepositorioNN2 I
.NNI J
ObtenerNNJ Q
(NNQ R
xNNR S
=>NNT V
xNNW X
.NNX Y
IdNNY [
==NN\ ^
idNN_ a
)NNa b
;NNb c
ifOO 
(OO !
tipoReporteEncontradoOO )
==OO* ,
nullOO- 1
)OO1 2
throwPP 
newPP !
TaskCanceledExceptionPP 3
(PP3 4
$strPP4 R
)PPR S
;PPS T
boolQQ 
	respuestaQQ 
=QQ  
awaitQQ! &#
_tipoReporteRepositorioQQ' >
.QQ> ?
EliminarQQ? G
(QQG H!
tipoReporteEncontradoQQH ]
)QQ] ^
;QQ^ _
ifRR 
(RR 
!RR 
	respuestaRR 
)RR 
throwSS 
newSS !
TaskCanceledExceptionSS 3
(SS3 4
$strSS4 I
)SSI J
;SSJ K
returnTT 
	respuestaTT  
;TT  !
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
List\\ 
<\\ 
TiposReporteDTO\\ .
>\\. /
>\\/ 0
Listar\\1 7
(\\7 8
)\\8 9
{]] 	
try^^ 
{__ 
var`` 
queryRol`` 
=`` 
await`` $#
_tipoReporteRepositorio``% <
.``< =
	Consultar``= F
(``F G
)``G H
;``H I
varaa 
listaRolaa 
=aa 
queryRolaa '
.aa' (
ToListaa( .
(aa. /
)aa/ 0
;aa0 1
returncc 
_mappercc 
.cc 
Mapcc "
<cc" #
Listcc# '
<cc' (
TiposReporteDTOcc( 7
>cc7 8
>cc8 9
(cc9 :
listaRolcc: B
)ccB C
;ccC D
}dd 
catchee 
{ff 
throwgg 
;gg 
}hh 
}ii 	
}jj 
}kk °=
uC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\TipoAccionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
TipoAccionServicio #
:$ %
ITipoAccionServicio& 9
{ 
private 
readonly  
IRepositorioGenerico -
<- .

TipoAccion. 8
>8 9"
_tipoAccionRepositorio: P
;P Q
private 
readonly 
IMapper  
_mapper! (
;( )
public 
TipoAccionServicio !
(! " 
IRepositorioGenerico" 6
<6 7

TipoAccion7 A
>A B!
tipoAccionRepositorioC X
,X Y
IMapperZ a
mapperb h
)h i
{ 	"
_tipoAccionRepositorio "
=# $!
tipoAccionRepositorio% :
;: ;
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
TipoAccionDTO '
>' (
Buscar) /
(/ 0
string0 6
id7 9
)9 :
{ 	
try 
{ 
var 
queryTipoAccion #
=$ %
await& +"
_tipoAccionRepositorio, B
.B C
ObtenerC J
(J K
xK L
=>M O
xP Q
.Q R
IdR T
==U W
idX Z
)Z [
;[ \
return 
_mapper 
. 
Map "
<" #
TipoAccionDTO# 0
>0 1
(1 2
queryTipoAccion2 A
)A B
;B C
} 
catch   
{!! 
throw"" 
;"" 
}## 
}$$ 	
public&& 
async&& 
Task&& 
<&& 
TipoAccionDTO&& '
>&&' (
Crear&&) .
(&&. /
TipoAccionDTO&&/ <
modelo&&= C
)&&C D
{'' 	
try(( 
{)) 
var** 
tipoAccionCreada** $
=**% &
await**' ,"
_tipoAccionRepositorio**- C
.**C D
Crear**D I
(**I J
_mapper**J Q
.**Q R
Map**R U
<**U V

TipoAccion**V `
>**` a
(**a b
modelo**b h
)**h i
)**i j
;**j k
if++ 
(++ 
tipoAccionCreada++ $
.++$ %
Id++% '
==++( *
null+++ /
)++/ 0
throw,, 
new,, 
	Exception,, '
(,,' (
$str,,( :
),,: ;
;,,; <
return-- 
_mapper-- 
.-- 
Map-- "
<--" #
TipoAccionDTO--# 0
>--0 1
(--1 2
tipoAccionCreada--2 B
)--B C
;--C D
}.. 
catch// 
{00 
throw11 
;11 
}22 
}33 	
public55 
async55 
Task55 
<55 
bool55 
>55 
Editar55  &
(55& '
TipoAccionDTO55' 4
modelo555 ;
)55; <
{66 	
try77 
{88 
var99 
tipoAccionModelo99 $
=99% &
_mapper99' .
.99. /
Map99/ 2
<992 3

TipoAccion993 =
>99= >
(99> ?
modelo99? E
)99E F
;99F G
var:: "
notificacionEncontrada:: *
=::+ ,
await::- 2"
_tipoAccionRepositorio::3 I
.::I J
Obtener::J Q
(::Q R
x::R S
=>::T V
x::W X
.::X Y
Id::Y [
==::\ ^
modelo::_ e
.::e f
Id::f h
)::h i
;::i j
if;; 
(;; "
notificacionEncontrada;; *
==;;+ -
null;;. 2
);;2 3
throw<< 
new<< !
TaskCanceledException<< 3
(<<3 4
$str<<4 N
)<<N O
;<<O P"
notificacionEncontrada== &
.==& '
IdPersonaRemitente==' 9
===: ;
tipoAccionModelo==< L
.==L M
IdPersonaRemitente==M _
;==_ `"
notificacionEncontrada>> &
.>>& '
IdPersonaReportada>>' 9
=>>: ;
tipoAccionModelo>>< L
.>>L M
IdPersonaReportada>>M _
;>>_ `"
notificacionEncontrada?? &
.??& '
IdTipoMensaje??' 4
=??5 6
tipoAccionModelo??7 G
.??G H
IdTipoMensaje??H U
;??U V
bool@@ 
	respuesta@@ 
=@@  
await@@! &"
_tipoAccionRepositorio@@' =
.@@= >
Editar@@> D
(@@D E"
notificacionEncontrada@@E [
)@@[ \
;@@\ ]
ifAA 
(AA 
!AA 
	respuestaAA 
)AA 
throwBB 
newBB !
TaskCanceledExceptionBB 3
(BB3 4
$strBB4 G
)BBG H
;BBH I
returnCC 
	respuestaCC  
;CC  !
}DD 
catchEE 
{FF 
throwGG 
;GG 
}HH 
}II 	
publicKK 
asyncKK 
TaskKK 
<KK 
boolKK 
>KK 
EliminarKK  (
(KK( )
stringKK) /
idKK0 2
)KK2 3
{LL 	
tryMM 
{NN 
varOO  
tipoAccionEncontradaOO (
=OO) *
awaitOO+ 0"
_tipoAccionRepositorioOO1 G
.OOG H
ObtenerOOH O
(OOO P
xOOP Q
=>OOR T
xOOU V
.OOV W
IdOOW Y
==OOZ \
idOO] _
)OO_ `
;OO` a
ifPP 
(PP  
tipoAccionEncontradaPP (
==PP) +
nullPP, 0
)PP0 1
throwQQ 
newQQ !
TaskCanceledExceptionQQ 3
(QQ3 4
$strQQ4 N
)QQN O
;QQO P
boolRR 
	respuestaRR 
=RR  
awaitRR! &"
_tipoAccionRepositorioRR' =
.RR= >
EliminarRR> F
(RRF G 
tipoAccionEncontradaRRG [
)RR[ \
;RR\ ]
ifSS 
(SS 
!SS 
	respuestaSS 
)SS 
throwTT 
newTT !
TaskCanceledExceptionTT 3
(TT3 4
$strTT4 I
)TTI J
;TTJ K
returnUU 
	respuestaUU  
;UU  !
}VV 
catchWW 
{XX 
throwYY 
;YY 
}ZZ 
}[[ 	
public]] 
async]] 
Task]] 
<]] 
List]] 
<]] 
TipoAccionDTO]] ,
>]], -
>]]- .
Listar]]/ 5
(]]5 6
)]]6 7
{^^ 	
try__ 
{`` 
varaa 
queryTipoAccionaa #
=aa$ %
awaitaa& +"
_tipoAccionRepositorioaa, B
.aaB C
	ConsultaraaC L
(aaL M
)aaM N
;aaN O
varbb 
listaTipoAccionbb #
=bb$ %
queryTipoAccionbb& 5
.bb5 6
ToListbb6 <
(bb< =
)bb= >
;bb> ?
returndd 
_mapperdd 
.dd 
Mapdd "
<dd" #
Listdd# '
<dd' (
TipoAccionDTOdd( 5
>dd5 6
>dd6 7
(dd7 8
listaTipoAcciondd8 G
)ddG H
;ddH I
}ee 
catchff 
{gg 
throwhh 
;hh 
}ii 
}jj 	
}kk 
}ll ‘7
nC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\RolServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public		 

class		 
RolServicio		 
:		 
IRolServicio		 +
{

 
private 
readonly  
IRepositorioGenerico -
<- .
Rol. 1
>1 2
_rolRepositorio3 B
;B C
private 
readonly 
IMapper  
_mapper! (
;( )
public 
RolServicio 
(  
IRepositorioGenerico /
</ 0
Rol0 3
>3 4
rolRepositorio5 C
,C D
IMapperE L
mapperM S
)S T
{ 	
_rolRepositorio 
= 
rolRepositorio ,
;, -
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
RolDTO  
>  !
Crear" '
(' (
RolDTO( .
modelo/ 5
)5 6
{ 	
try 
{ 
var 
	rolCreado 
= 
await  %
_rolRepositorio& 5
.5 6
Crear6 ;
(; <
_mapper< C
.C D
MapD G
<G H
RolH K
>K L
(L M
modeloM S
)S T
)T U
;U V
if 
( 
	rolCreado 
. 
Id  
==! #
null$ (
)( )
throw 
new 
	Exception '
(' (
$str( :
): ;
;; <
return 
_mapper 
. 
Map "
<" #
RolDTO# )
>) *
(* +
	rolCreado+ 4
)4 5
;5 6
} 
catch 
{ 
throw 
; 
} 
} 	
public!! 
async!! 
Task!! 
<!! 
bool!! 
>!! 
Editar!!  &
(!!& '
RolDTO!!' -
modelo!!. 4
)!!4 5
{"" 	
try## 
{$$ 
var%% 
	rolModelo%% 
=%% 
_mapper%%  '
.%%' (
Map%%( +
<%%+ ,
Rol%%, /
>%%/ 0
(%%0 1
modelo%%1 7
)%%7 8
;%%8 9
var&& 
rolEncontrado&& !
=&&" #
await&&$ )
_rolRepositorio&&* 9
.&&9 :
Obtener&&: A
(&&A B
x&&B C
=>&&D F
x&&G H
.&&H I
Id&&I K
==&&L N
modelo&&O U
.&&U V
Id&&V X
)&&X Y
;&&Y Z
if'' 
('' 
rolEncontrado'' !
==''" $
null''% )
)'') *
throw(( 
new(( !
TaskCanceledException(( 3
(((3 4
$str((4 F
)((F G
;((G H
rolEncontrado)) 
.)) 
Nombre)) $
=))% &
	rolModelo))' 0
.))0 1
Nombre))1 7
;))7 8
bool** 
	respuesta** 
=**  
await**! &
_rolRepositorio**' 6
.**6 7
Editar**7 =
(**= >
rolEncontrado**> K
)**K L
;**L M
if++ 
(++ 
!++ 
	respuesta++ 
)++ 
throw,, 
new,, !
TaskCanceledException,, 3
(,,3 4
$str,,4 G
),,G H
;,,H I
return-- 
	respuesta--  
;--  !
}.. 
catch// 
{00 
throw11 
;11 
}22 
}33 	
public55 
async55 
Task55 
<55 
RolDTO55  
>55  !
Buscar55" (
(55( )
string55) /
id550 2
)552 3
{66 	
try88 
{99 
var:: 
queryRol:: 
=:: 
await:: $
_rolRepositorio::% 4
.::4 5
Obtener::5 <
(::< =
x::= >
=>::? A
x::B C
.::C D
Id::D F
==::G I
id::J L
)::L M
;::M N
return<< 
_mapper<< 
.<< 
Map<< "
<<<" #
RolDTO<<# )
><<) *
(<<* +
queryRol<<+ 3
)<<3 4
;<<4 5
}== 
catch>> 
{?? 
throw@@ 
;@@ 
}AA 
}BB 	
publicDD 
asyncDD 
TaskDD 
<DD 
boolDD 
>DD 
EliminarDD  (
(DD( )
stringDD) /
idDD0 2
)DD2 3
{EE 	
tryFF 
{GG 
varHH 
rolEncontradaHH !
=HH" #
awaitHH$ )
_rolRepositorioHH* 9
.HH9 :
ObtenerHH: A
(HHA B
xHHB C
=>HHD F
xHHG H
.HHH I
IdHHI K
==HHL N
idHHO Q
)HHQ R
;HHR S
ifII 
(II 
rolEncontradaII !
==II" $
nullII% )
)II) *
throwJJ 
newJJ !
TaskCanceledExceptionJJ 3
(JJ3 4
$strJJ4 F
)JJF G
;JJG H
boolKK 
	respuestaKK 
=KK  
awaitKK! &
_rolRepositorioKK' 6
.KK6 7
EliminarKK7 ?
(KK? @
rolEncontradaKK@ M
)KKM N
;KKN O
ifLL 
(LL 
!LL 
	respuestaLL 
)LL 
throwMM 
newMM !
TaskCanceledExceptionMM 3
(MM3 4
$strMM4 I
)MMI J
;MMJ K
returnNN 
	respuestaNN  
;NN  !
}OO 
catchPP 
{QQ 
throwRR 
;RR 
}SS 
}TT 	
publicVV 
asyncVV 
TaskVV 
<VV 
ListVV 
<VV 
RolDTOVV %
>VV% &
>VV& '
ListarVV( .
(VV. /
)VV/ 0
{WW 	
tryXX 
{YY 
varZZ 
queryRolZZ 
=ZZ 
awaitZZ $
_rolRepositorioZZ% 4
.ZZ4 5
	ConsultarZZ5 >
(ZZ> ?
)ZZ? @
;ZZ@ A
var[[ 
listaRol[[ 
=[[ 
queryRol[[ '
.[[' (
ToList[[( .
([[. /
)[[/ 0
;[[0 1
return]] 
_mapper]] 
.]] 
Map]] "
<]]" #
List]]# '
<]]' (
RolDTO]]( .
>]]. /
>]]/ 0
(]]0 1
listaRol]]1 9
)]]9 :
;]]: ;
}^^ 
catch__ 
{`` 
throwaa 
;aa 
}bb 
}cc 	
}dd 
}ee Õu
sC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\ReseniasServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
ReseniasServicio !
:" #
IReseniaServicio$ 4
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Rese√±a. 4
>4 5
_reseniaRepositorio6 I
;I J
private 
readonly 
IMapper  
_mapper! (
;( )
public 
ReseniasServicio 
(   
IRepositorioGenerico  4
<4 5
Rese√±a5 ;
>; <
reseniaRepositorio= O
,O P
IMapperQ X
mapperY _
)_ `
{ 	
_reseniaRepositorio 
=  !
reseniaRepositorio" 4
;4 5
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 

Rese√±aDTO #
># $
Buscar% +
(+ ,
string, 2
id3 5
)5 6
{ 	
try 
{ 
var 
reseniaEncontrada %
=& '
await( -
_reseniaRepositorio. A
.A B
ObtenerB I
(I J
xJ K
=>L N
xO P
.P Q
IdQ S
==T V
idW Y
)Y Z
;Z [
if 
( 
reseniaEncontrada %
==& (
null) -
)- .
throw 
new !
TaskCanceledException 3
(3 4
$str4 I
)I J
;J K
return!! 
_mapper!! 
.!! 
Map!! "
<!!" #

Rese√±aDTO!!# ,
>!!, -
(!!- .
reseniaEncontrada!!. ?
)!!? @
;!!@ A
}"" 
catch## 
{$$ 
throw%% 
;%% 
}&& 
}'' 	
public)) 
async)) 
Task)) 
<)) 

Rese√±aDTO)) #
>))# $
Crear))% *
())* +

Rese√±aDTO))+ 4
modelo))5 ;
))); <
{** 	
try++ 
{,, 
modelo-- 
.-- 
Fecha-- 
=-- 
DateTime-- '
.--' (
Now--( +
;--+ ,
modelo.. 
... 
Id.. 
=.. 
await.. !
	GenerarId.." +
(..+ ,
).., -
;..- .
var// 
reseniaCreada// !
=//" #
await//$ )
_reseniaRepositorio//* =
.//= >
Crear//> C
(//C D
_mapper//D K
.//K L
Map//L O
<//O P
Rese√±a//P V
>//V W
(//W X
modelo//X ^
)//^ _
)//_ `
;//` a
if00 
(00 
reseniaCreada00 !
.00! "
Id00" $
==00% '
null00( ,
)00, -
throw11 
new11 
	Exception11 '
(11' (
$str11( :
)11: ;
;11; <
return33 
_mapper33 
.33 
Map33 "
<33" #

Rese√±aDTO33# ,
>33, -
(33- .
reseniaCreada33. ;
)33; <
;33< =
}44 
catch55 
{66 
throw77 
;77 
}88 
}99 	
public;; 
async;; 
Task;; 
<;; 
bool;; 
>;; 
Editar;;  &
(;;& '

Rese√±aDTO;;' 0
modelo;;1 7
);;7 8
{<< 	
try== 
{>> 
var?? 
reseniaExistente?? $
=??% &
await??' ,
_reseniaRepositorio??- @
.??@ A
Obtener??A H
(??H I
x??I J
=>??K M
x??N O
.??O P
Id??P R
==??S U
modelo??V \
.??\ ]
Id??] _
)??_ `
;??` a
if@@ 
(@@ 
reseniaExistente@@ $
==@@% '
null@@( ,
)@@, -
throwAA 
newAA !
TaskCanceledExceptionAA 3
(AA3 4
$strAA4 I
)AAI J
;AAJ K
reseniaExistenteCC  
.CC  !

ComentarioCC! +
=CC, -
modeloCC. 4
.CC4 5

ComentarioCC5 ?
;CC? @
reseniaExistenteDD  
.DD  !

VerificadoDD! +
=DD, -
modeloDD. 4
.DD4 5

VerificadoDD5 ?
;DD? @
returnFF 
awaitFF 
_reseniaRepositorioFF 0
.FF0 1
EditarFF1 7
(FF7 8
reseniaExistenteFF8 H
)FFH I
;FFI J
}GG 
catchHH 
{II 
throwJJ 
;JJ 
}KK 
}LL 	
publicNN 
asyncNN 
TaskNN 
<NN 
boolNN 
>NN 
EliminarNN  (
(NN( )
stringNN) /
idNN0 2
)NN2 3
{OO 	
tryPP 
{QQ 
varRR 
reseniaEncontradaRR %
=RR& '
awaitRR( -
_reseniaRepositorioRR. A
.RRA B
ObtenerRRB I
(RRI J
xRRJ K
=>RRL N
xRRO P
.RRP Q
IdRRQ S
==RRT V
idRRW Y
)RRY Z
;RRZ [
ifSS 
(SS 
reseniaEncontradaSS %
==SS& (
nullSS) -
)SS- .
throwTT 
newTT !
TaskCanceledExceptionTT 3
(TT3 4
$strTT4 I
)TTI J
;TTJ K
returnVV 
awaitVV 
_reseniaRepositorioVV 0
.VV0 1
EliminarVV1 9
(VV9 :
reseniaEncontradaVV: K
)VVK L
;VVL M
}WW 
catchXX 
{YY 
throwZZ 
;ZZ 
}[[ 
}\\ 	
public^^ 
async^^ 
Task^^ 
<^^ 
List^^ 
<^^ 

Rese√±aDTO^^ (
>^^( )
>^^) *
Listar^^+ 1
(^^1 2
)^^2 3
{__ 	
try`` 
{aa 
varbb 
listaReseniasbb !
=bb" #
awaitbb$ )
_reseniaRepositoriobb* =
.bb= >
	Consultarbb> G
(bbG H
)bbH I
;bbI J
varcc 
listaMaterializadacc &
=cc' (
listaReseniascc) 6
.cc6 7
ToListcc7 =
(cc= >
)cc> ?
;cc? @
ifdd 
(dd 
listaMaterializadadd &
==dd' )
nulldd* .
||dd/ 1
!dd2 3
listaMaterializadadd3 E
.ddE F
AnyddF I
(ddI J
)ddJ K
)ddK L
throwee 
newee !
TaskCanceledExceptionee 3
(ee3 4
$stree4 D
)eeD E
;eeE F
returngg 
_mappergg 
.gg 
Mapgg "
<gg" #
Listgg# '
<gg' (

Rese√±aDTOgg( 1
>gg1 2
>gg2 3
(gg3 4
listaMaterializadagg4 F
)ggF G
;ggG H
}hh 
catchii 
{jj 
throwkk 
;kk 
}ll 
}mm 	
publicoo 
asyncoo 
Taskoo 
<oo 
Listoo 
<oo 

Rese√±aDTOoo (
>oo( )
>oo) *!
ListarPorCalificacionoo+ @
(oo@ A
intooA D
calificacionooE Q
)ooQ R
{pp 	
tryqq 
{rr 
varss 
listaReseniasss !
=ss" #
awaitss$ )
_reseniaRepositorioss* =
.ss= >
	Consultarss> G
(ssG H
xssH I
=>ssJ L
xssM N
.ssN O
CalificacionssO [
==ss\ ^
calificacionss_ k
)ssk l
;ssl m
vartt 
listaMaterializadatt &
=tt' (
listaReseniastt) 6
.tt6 7
ToListtt7 =
(tt= >
)tt> ?
;tt? @
ifvv 
(vv 
listaMaterializadavv &
==vv' )
nullvv* .
||vv/ 1
!vv2 3
listaMaterializadavv3 E
.vvE F
AnyvvF I
(vvI J
)vvJ K
)vvK L
throwww 
newww !
TaskCanceledExceptionww 3
(ww3 4
$strww4 D
)wwD E
;wwE F
returnyy 
_mapperyy 
.yy 
Mapyy "
<yy" #
Listyy# '
<yy' (

Rese√±aDTOyy( 1
>yy1 2
>yy2 3
(yy3 4
listaMaterializadayy4 F
)yyF G
;yyG H
}zz 
catch{{ 
{|| 
throw}} 
;}} 
}~~ 
} 	
public
ÅÅ 
async
ÅÅ 
Task
ÅÅ 
<
ÅÅ 
List
ÅÅ 
<
ÅÅ 

Rese√±aDTO
ÅÅ (
>
ÅÅ( )
>
ÅÅ) *
ListarPorPersona
ÅÅ+ ;
(
ÅÅ; <
string
ÅÅ< B
	idPersona
ÅÅC L
)
ÅÅL M
{
ÇÇ 	
try
ÉÉ 
{
ÑÑ 
var
ÖÖ 
listaResenias
ÖÖ !
=
ÖÖ" #
await
ÖÖ$ )!
_reseniaRepositorio
ÖÖ* =
.
ÖÖ= >
	Consultar
ÖÖ> G
(
ÖÖG H
x
ÖÖH I
=>
ÖÖJ L
x
ÖÖM N
.
ÖÖN O
	IdPersona
ÖÖO X
==
ÖÖY [
	idPersona
ÖÖ\ e
)
ÖÖe f
;
ÖÖf g
var
ÜÜ  
listaMaterializada
ÜÜ &
=
ÜÜ' (
listaResenias
ÜÜ) 6
.
ÜÜ6 7
ToList
ÜÜ7 =
(
ÜÜ= >
)
ÜÜ> ?
;
ÜÜ? @
if
àà 
(
àà  
listaMaterializada
àà &
==
àà' )
null
àà* .
||
àà/ 1
!
àà2 3 
listaMaterializada
àà3 E
.
ààE F
Any
ààF I
(
ààI J
)
ààJ K
)
ààK L
throw
ââ 
new
ââ #
TaskCanceledException
ââ 3
(
ââ3 4
$str
ââ4 D
)
ââD E
;
ââE F
return
ãã 
_mapper
ãã 
.
ãã 
Map
ãã "
<
ãã" #
List
ãã# '
<
ãã' (

Rese√±aDTO
ãã( 1
>
ãã1 2
>
ãã2 3
(
ãã3 4 
listaMaterializada
ãã4 F
)
ããF G
;
ããG H
}
åå 
catch
çç 
{
éé 
throw
èè 
;
èè 
}
êê 
}
ëë 	
public
ìì 
async
ìì 
Task
ìì 
<
ìì 
List
ìì 
<
ìì 

Rese√±aDTO
ìì (
>
ìì( )
>
ìì) *"
ListarPorPublicacion
ìì+ ?
(
ìì? @
string
ìì@ F
idPublicacion
ììG T
)
ììT U
{
îî 	
try
ïï 
{
ññ 
var
óó 
listaResenias
óó !
=
óó" #
await
óó$ )!
_reseniaRepositorio
óó* =
.
óó= >
	Consultar
óó> G
(
óóG H
x
óóH I
=>
óóJ L
x
óóM N
.
óóN O
IdPublicacion
óóO \
==
óó] _
idPublicacion
óó` m
)
óóm n
;
óón o
var
òò  
listaMaterializada
òò &
=
òò' (
listaResenias
òò) 6
.
òò6 7
ToList
òò7 =
(
òò= >
)
òò> ?
;
òò? @
if
öö 
(
öö  
listaMaterializada
öö &
==
öö' )
null
öö* .
||
öö/ 1
!
öö2 3 
listaMaterializada
öö3 E
.
ööE F
Any
ööF I
(
ööI J
)
ööJ K
)
ööK L
throw
õõ 
new
õõ #
TaskCanceledException
õõ 3
(
õõ3 4
$str
õõ4 D
)
õõD E
;
õõE F
return
ùù 
_mapper
ùù 
.
ùù 
Map
ùù "
<
ùù" #
List
ùù# '
<
ùù' (

Rese√±aDTO
ùù( 1
>
ùù1 2
>
ùù2 3
(
ùù3 4 
listaMaterializada
ùù4 F
)
ùùF G
;
ùùG H
}
ûû 
catch
üü 
{
†† 
throw
°° 
;
°° 
}
¢¢ 
}
££ 	
public
•• 
async
•• 
Task
•• 
<
•• 
string
••  
>
••  !
	GenerarId
••" +
(
••+ ,
)
••, -
{
¶¶ 	
var
ßß 
mensajes
ßß 
=
ßß 
await
ßß  !
_reseniaRepositorio
ßß! 4
.
ßß4 5
	Consultar
ßß5 >
(
ßß> ?
)
ßß? @
;
ßß@ A
var
©© 
numerosExistentes
©© !
=
©©" #
mensajes
©©$ ,
.
™™ 
Where
™™ 
(
™™ 
m
™™ 
=>
™™ 
m
™™ 
.
™™ 
Id
™™  
!=
™™! #
null
™™$ (
&&
™™) +
m
™™, -
.
™™- .
Id
™™. 0
.
™™0 1

StartsWith
™™1 ;
(
™™; <
$str
™™< @
)
™™@ A
)
™™A B
.
´´ 
AsEnumerable
´´ 
(
´´ 
)
´´ 
.
¨¨ 
Select
¨¨ 
(
¨¨ 
m
¨¨ 
=>
¨¨ 
{
¨¨ 
var
≠≠ 
parteNumero
≠≠ #
=
≠≠$ %
m
≠≠& '
.
≠≠' (
Id
≠≠( *
.
≠≠* +
	Substring
≠≠+ 4
(
≠≠4 5
$num
≠≠5 6
)
≠≠6 7
;
≠≠7 8
if
ÆÆ 
(
ÆÆ 
int
ÆÆ 
.
ÆÆ 
TryParse
ÆÆ $
(
ÆÆ$ %
parteNumero
ÆÆ% 0
,
ÆÆ0 1
out
ÆÆ2 5
int
ÆÆ6 9
numero
ÆÆ: @
)
ÆÆ@ A
)
ÆÆA B
return
ØØ 
numero
ØØ %
;
ØØ% &
return
∞∞ 
$num
∞∞ 
;
∞∞ 
}
±± 
)
±± 
;
±± 
int
≥≥ 
	maxNumero
≥≥ 
=
≥≥ 
numerosExistentes
≥≥ -
.
≥≥- .
Any
≥≥. 1
(
≥≥1 2
)
≥≥2 3
?
≥≥4 5
numerosExistentes
≥≥6 G
.
≥≥G H
Max
≥≥H K
(
≥≥K L
)
≥≥L M
:
≥≥N O
$num
≥≥P Q
;
≥≥Q R
int
¥¥ 
nuevoNumero
¥¥ 
=
¥¥ 
	maxNumero
¥¥ '
+
¥¥( )
$num
¥¥* +
;
¥¥+ ,
string
µµ 
nuevoId
µµ 
=
µµ 
$"
µµ 
$str
µµ !
{
µµ! "
nuevoNumero
µµ" -
.
µµ- .
ToString
µµ. 6
(
µµ6 7
$str
µµ7 ;
)
µµ; <
}
µµ< =
"
µµ= >
;
µµ> ?
return
∑∑ 
nuevoId
∑∑ 
;
∑∑ 
}
∏∏ 	
}
ππ 
}∫∫ ˆ2
rC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\ReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
ReporteServicio  
:! "
IReporteServicio# 3
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Reportes. 6
>6 7
_reporteRepositorio8 K
;K L
private 
readonly 
IMapper  
_mapper! (
;( )
public 
ReporteServicio 
(  
IRepositorioGenerico 3
<3 4
Reportes4 <
>< =
reporteRepositorio> P
,P Q
IMapperR Y
mapperZ `
)` a
{ 	
_reporteRepositorio 
=  !
reporteRepositorio" 4
;4 5
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ReportesDTO %
>% &
Crear' ,
(, -
ReportesDTO- 8
modelo9 ?
)? @
{ 	
try 
{ 
var 
reporteCreado !
=" #
await$ )
_reporteRepositorio* =
.= >
Crear> C
(C D
_mapperD K
.K L
MapL O
<O P
ReportesP X
>X Y
(Y Z
modeloZ `
)` a
)a b
;b c
if 
( 
reporteCreado !
.! "
	IdReporte" +
==, .
null/ 3
)3 4
throw   
new   
	Exception   '
(  ' (
$str  ( :
)  : ;
;  ; <
return!! 
_mapper!! 
.!! 
Map!! "
<!!" #
ReportesDTO!!# .
>!!. /
(!!/ 0
reporteCreado!!0 =
)!!= >
;!!> ?
}"" 
catch## 
{$$ 
throw%% 
;%% 
}&& 
}'' 	
public)) 
async)) 
Task)) 
<)) 
bool)) 
>)) 

Actualizar))  *
())* +
ReportesDTO))+ 6
modelo))7 =
)))= >
{** 	
try++ 
{,, 
var-- 
reporteModelo-- !
=--" #
_mapper--$ +
.--+ ,
Map--, /
<--/ 0
Reportes--0 8
>--8 9
(--9 :
modelo--: @
)--@ A
;--A B
var.. 
reporteEncontrado.. %
=..& '
await..( -
_reporteRepositorio... A
...A B
Obtener..B I
(..I J
x..J K
=>..L N
x..O P
...P Q
	IdReporte..Q Z
==..[ ]
reporteModelo..^ k
...k l
	IdReporte..l u
)..u v
;..v w
if00 
(00 
reporteEncontrado00 %
==00& (
null00) -
)00- .
throw11 
new11 !
TaskCanceledException11 3
(113 4
$str114 K
)11K L
;11L M
reporteEncontrado33 !
.33! "
IdEstado33" *
=33+ ,
reporteModelo33- :
.33: ;
IdEstado33; C
;33C D
reporteEncontrado44 !
.44! "
Leido44" '
=44( )
reporteModelo44* 7
.447 8
Leido448 =
;44= >
reporteEncontrado55 !
.55! "
FechaActualizacion55" 4
=555 6
reporteModelo557 D
.55D E
FechaActualizacion55E W
;55W X
bool77 
	respuesta77 
=77  
await77! &
_reporteRepositorio77' :
.77: ;
Editar77; A
(77A B
reporteEncontrado77B S
)77S T
;77T U
if99 
(99 
!99 
	respuesta99 
)99 
throw:: 
new:: 
	Exception:: '
(::' (
$str::( F
)::F G
;::G H
return<< 
	respuesta<<  
;<<  !
}== 
catch>> 
{?? 
throw@@ 
;@@ 
}AA 
}BB 	
publicDD 
asyncDD 
TaskDD 
<DD 
ListDD 
<DD 
ReportesDTODD *
>DD* +
>DD+ ,
ListarDD- 3
(DD3 4
)DD4 5
{EE 	
tryFF 
{GG 
varHH 
queryUsuarioHH  
=HH! "
awaitHH# (
_reporteRepositorioHH) <
.HH< =
	ConsultarHH= F
(HHF G
)HHG H
;HHH I
varII 
listaReportesII !
=II" #
queryUsuarioII$ 0
.II0 1
ToListII1 7
(II7 8
)II8 9
;II9 :
returnKK 
_mapperKK 
.KK 
MapKK "
<KK" #
ListKK# '
<KK' (
ReportesDTOKK( 3
>KK3 4
>KK4 5
(KK5 6
listaReportesKK6 C
)KKC D
;KKD E
}LL 
catchMM 
{NN 
throwOO 
;OO 
}PP 
}QQ 	
publicSS 
asyncSS 
TaskSS 
<SS 
ReportesDTOSS %
>SS% &
ObtenerPorIdSS' 3
(SS3 4
stringSS4 :
idSS; =
)SS= >
{TT 	
tryUU 
{VV 
varWW 
reporteWW 
=WW 
awaitWW #
_reporteRepositorioWW$ 7
.WW7 8
ObtenerWW8 ?
(WW? @
xWW@ A
=>WWB D
xWWE F
.WWF G
	IdReporteWWG P
==WWQ S
idWWT V
)WWV W
;WWW X
ifYY 
(YY 
reporteYY 
==YY 
nullYY #
)YY# $
throwZZ 
newZZ !
TaskCanceledExceptionZZ 3
(ZZ3 4
$strZZ4 K
)ZZK L
;ZZL M
return\\ 
_mapper\\ 
.\\ 
Map\\ "
<\\" #
ReportesDTO\\# .
>\\. /
(\\/ 0
reporte\\0 7
)\\7 8
;\\8 9
}]] 
catch^^ 
{__ 
throw`` 
;`` 
}aa 
}bb 	
}cc 
}dd “;
sC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\RegistroServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
RegistroServicio !
:" #
IRegistroServicio$ 5
{ 
private 
string 
_correoEmisor $
=% &
$str' ?
;? @
private 
string $
_correoEmisorContrasenia /
=0 1
$str2 G
;G H
private 
string 
servidorSMTP #
=$ %
$str& 6
;6 7
private 
int 

puertoSMTP 
=  
$num! $
;$ %
public 
Task 
< 
bool 
> $
EnviarCorreoVerificacion 2
(2 3'
EnviarCorreoVerificacionDTO3 N
datosO T
)T U
{ 	
try 
{ 
MailMessage 
mail  
=! "
new# &
MailMessage' 2
(2 3
)3 4
;4 5
mail 
. 
From 
= 
new 
MailAddress  +
(+ ,
_correoEmisor, 9
)9 :
;: ;
mail 
. 
To 
. 
Add 
( 
datos !
.! "
CorreoDestino" /
)/ 0
;0 1
mail 
. 
Subject 
= 
datos $
.$ %
Asunto% +
;+ ,
mail 
. 
Body 
= 
$@" 
$str	8 ´
{
88´ ¨
datos
88¨ ±
.
88± ≤
CodigoVerficacion
88≤ √
}
88√ ƒ
$str	8Sƒ 
"SS 
;SS 
mailUU 
.UU 

IsBodyHtmlUU 
=UU  !
trueUU" &
;UU& '
mailVV 
.VV 
PriorityVV 
=VV 
MailPriorityVV  ,
.VV, -
HighVV- 1
;VV1 2

SmtpClientXX 
clienteSMTPXX &
=XX' (
newXX) ,

SmtpClientXX- 7
(XX7 8
servidorSMTPXX8 D
,XXD E

puertoSMTPXXF P
)XXP Q
{YY 
CredentialsZZ 
=ZZ  !
newZZ" %
NetworkCredentialZZ& 7
(ZZ7 8
_correoEmisorZZ8 E
,ZZE F$
_correoEmisorContraseniaZZG _
)ZZ_ `
,ZZ` a
	EnableSsl[[ 
=[[ 
true[[  $
}\\ 
;\\ 
clienteSMTP]] 
.]] 
Send]]  
(]]  !
mail]]! %
)]]% &
;]]& '
return^^ 
Task^^ 
.^^ 

FromResult^^ &
(^^& '
true^^' +
)^^+ ,
;^^, -
}__ 
catch`` 
{aa 
throwbb 
;bb 
}cc 
}dd 	
publicff 
Taskff 
<ff 
stringff 
>ff !
GenerarCodigoRegistroff 1
(ff1 2
DateTimeff2 :
fechaNacimientoff; J
)ffJ K
{gg 	
inthh 
diahh 
=hh 
fechaNacimientohh %
.hh% &
Dayhh& )
;hh) *
intii 
mesii 
=ii 
fechaNacimientoii %
.ii% &
Monthii& +
;ii+ ,
intjj 
a√±ojj 
=jj 
fechaNacimientojj %
.jj% &
Yearjj& *
;jj* +
Randomll 
randomll 
=ll 
newll 
Randomll  &
(ll& '
)ll' (
;ll( )
stringnn 
a√±oStrnn 
=nn 
a√±onn 
.nn  
ToStringnn  (
(nn( )
)nn) *
.nn* +
	Substringnn+ 4
(nn4 5
$numnn5 6
,nn6 7
$numnn8 9
)nn9 :
;nn: ;
stringoo 
mesStroo 
=oo 
mesoo 
.oo  
ToStringoo  (
(oo( )
)oo) *
.oo* +
PadLeftoo+ 2
(oo2 3
$numoo3 4
,oo4 5
$charoo6 9
)oo9 :
;oo: ;
stringpp 
diaStrpp 
=pp 
diapp 
.pp  
ToStringpp  (
(pp( )
)pp) *
.pp* +
PadLeftpp+ 2
(pp2 3
$numpp3 4
,pp4 5
$charpp6 9
)pp9 :
;pp: ;
intrr 
	randomNumrr 
=rr 
randomrr "
.rr" #
Nextrr# '
(rr' (
$numrr( )
,rr) *
$numrr+ .
)rr. /
;rr/ 0
stringss 
	randomStrss 
=ss 
	randomNumss (
.ss( )
ToStringss) 1
(ss1 2
)ss2 3
.ss3 4
PadLeftss4 ;
(ss; <
$numss< =
,ss= >
$charss? B
)ssB C
;ssC D
intuu 
randomFinaluu 
=uu 
randomuu $
.uu$ %
Nextuu% )
(uu) *
$numuu* +
,uu+ ,
$numuu- 0
)uu0 1
;uu1 2
stringvv 
randomFinalStrvv !
=vv" #
randomFinalvv$ /
.vv/ 0
ToStringvv0 8
(vv8 9
)vv9 :
.vv: ;
PadLeftvv; B
(vvB C
$numvvC D
,vvD E
$charvvF I
)vvI J
;vvJ K
stringxx 
codigoxx 
=xx 
$"xx 
{xx 
a√±oStrxx %
}xx% &
{xx& '
mesStrxx' -
}xx- .
{xx. /
diaStrxx/ 5
}xx5 6
{xx6 7
	randomStrxx7 @
}xx@ A
$strxxA B
{xxB C
randomFinalStrxxC Q
}xxQ R
"xxR S
;xxS T
ifzz 
(zz 
codigozz 
.zz 
IndexOfzz 
(zz 
$charzz "
)zz" #
>zz$ %
$numzz& '
)zz' (
{{{ 
codigo|| 
=|| 
codigo|| 
.||  
	Substring||  )
(||) *
codigo||* 0
.||0 1
IndexOf||1 8
(||8 9
$char||9 <
)||< =
-||> ?
$num||@ A
,||A B
$num||C D
)||D E
+||F G
codigo||H N
.||N O
	Substring||O X
(||X Y
codigo||Y _
.||_ `
IndexOf||` g
(||g h
$char||h k
)||k l
)||l m
;||m n
}}} 
return 
Task 
. 

FromResult "
(" #
codigo# )
)) *
;* +
}
ÄÄ 	
public
ÇÇ 
Task
ÇÇ 
<
ÇÇ 
bool
ÇÇ 
>
ÇÇ #
ValidarCodigoRegistro
ÇÇ /
(
ÇÇ/ 0
string
ÇÇ0 6
codigoRegistro
ÇÇ7 E
,
ÇÇE F
string
ÇÇG M
codigoRecibido
ÇÇN \
)
ÇÇ\ ]
{
ÉÉ 	
return
ÑÑ 
Task
ÑÑ 
.
ÑÑ 

FromResult
ÑÑ "
(
ÑÑ" #
codigoRegistro
ÑÑ# 1
.
ÑÑ1 2
Equals
ÑÑ2 8
(
ÑÑ8 9
codigoRecibido
ÑÑ9 G
,
ÑÑG H
StringComparison
ÑÑI Y
.
ÑÑY Z
OrdinalIgnoreCase
ÑÑZ k
)
ÑÑk l
)
ÑÑl m
;
ÑÑm n
}
ÖÖ 	
}
ÜÜ 
}áá ﬂ3
rC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\RazonesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
RazonesServicio  
:! "
IRazonServicio# 1
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Razones. 5
>5 6
_razonesRepositorio7 J
;J K
private 
readonly 
IMapper  
_mapper! (
;( )
public 
RazonesServicio 
(  
IRepositorioGenerico 3
<3 4
Razones4 ;
>; <
razonesRepositorio= O
,O P
IMapperQ X
mapperY _
)_ `
{ 	
_razonesRepositorio 
=  !
razonesRepositorio" 4
;4 5
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 

RazonesDTO $
>$ %
Buscar& ,
(, -
string- 3
id4 6
)6 7
{ 	
try 
{ 
var 
queryRazones  
=! "
await# (
_razonesRepositorio) <
.< =
Obtener= D
(D E
xE F
=>G I
xJ K
.K L
IdRazonL S
==T V
idW Y
)Y Z
;Z [
return 
_mapper 
. 
Map "
<" #

RazonesDTO# -
>- .
(. /
queryRazones/ ;
); <
;< =
} 
catch   
{!! 
throw"" 
;"" 
}## 
}$$ 	
public&& 
async&& 
Task&& 
<&& 

RazonesDTO&& $
>&&$ %
Crear&&& +
(&&+ ,

RazonesDTO&&, 6
modelo&&7 =
)&&= >
{'' 	
try(( 
{)) 
var** 
razonesCreado** !
=**" #
await**$ )
_razonesRepositorio*** =
.**= >
Crear**> C
(**C D
_mapper**D K
.**K L
Map**L O
<**O P
Razones**P W
>**W X
(**X Y
modelo**Y _
)**_ `
)**` a
;**a b
if++ 
(++ 
razonesCreado++ !
.++! "
IdRazon++" )
==++* ,
null++- 1
)++1 2
throw,, 
new,, 
	Exception,, '
(,,' (
$str,,( :
),,: ;
;,,; <
return-- 
_mapper-- 
.-- 
Map-- "
<--" #

RazonesDTO--# -
>--- .
(--. /
razonesCreado--/ <
)--< =
;--= >
}.. 
catch// 
{00 
throw11 
;11 
}22 
}33 	
public55 
async55 
Task55 
<55 
bool55 
>55 
Editar55  &
(55& '

RazonesDTO55' 1
modelo552 8
)558 9
{66 	
try77 
{88 
var99 
razonesModelo99 !
=99" #
_mapper99$ +
.99+ ,
Map99, /
<99/ 0
Razones990 7
>997 8
(998 9
modelo999 ?
)99? @
;99@ A
var:: 
razonesEncontrado:: %
=::& '
await::( -
_razonesRepositorio::. A
.::A B
Obtener::B I
(::I J
x::J K
=>::L N
x::O P
.::P Q
IdRazon::Q X
==::Y [
modelo::\ b
.::b c
IdRazon::c j
)::j k
;::k l
if;; 
(;; 
razonesEncontrado;; %
==;;& (
null;;) -
);;- .
throw<< 
new<< !
TaskCanceledException<< 3
(<<3 4
$str<<4 H
)<<H I
;<<I J
razonesEncontrado== !
.==! "
Nombre==" (
===) *
razonesModelo==+ 8
.==8 9
Nombre==9 ?
;==? @
return>> 
await>> 
_razonesRepositorio>> 0
.>>0 1
Editar>>1 7
(>>7 8
razonesModelo>>8 E
)>>E F
;>>F G
}?? 
catch@@ 
{AA 
throwBB 
;BB 
}CC 
}DD 	
publicFF 
asyncFF 
TaskFF 
<FF 
boolFF 
>FF 
EliminarFF  (
(FF( )
stringFF) /
idFF0 2
)FF2 3
{GG 	
tryHH 
{II 
varJJ 
razonesEncontradoJJ %
=JJ& '
awaitJJ( -
_razonesRepositorioJJ. A
.JJA B
ObtenerJJB I
(JJI J
xJJJ K
=>JJL N
xJJO P
.JJP Q
IdRazonJJQ X
==JJY [
idJJ\ ^
)JJ^ _
;JJ_ `
ifKK 
(KK 
razonesEncontradoKK %
==KK& (
nullKK) -
)KK- .
throwLL 
newLL !
TaskCanceledExceptionLL 3
(LL3 4
$strLL4 H
)LLH I
;LLI J
returnMM 
awaitMM 
_razonesRepositorioMM 0
.MM0 1
EliminarMM1 9
(MM9 :
razonesEncontradoMM: K
)MMK L
;MML M
}NN 
catchOO 
{PP 
throwQQ 
;QQ 
}RR 
}SS 	
asyncUU 
TaskUU 
<UU 
ListUU 
<UU 

RazonesDTOUU "
>UU" #
>UU# $
IRazonServicioUU% 3
.UU3 4
ListarUU4 :
(UU: ;
)UU; <
{VV 	
tryWW 
{XX 
varYY 
queryRazonesYY  
=YY! "
awaitYY# (
_razonesRepositorioYY) <
.YY< =
	ConsultarYY= F
(YYF G
)YYG H
;YYH I
returnZZ 
_mapperZZ 
.ZZ 
MapZZ "
<ZZ" #
ListZZ# '
<ZZ' (

RazonesDTOZZ( 2
>ZZ2 3
>ZZ3 4
(ZZ4 5
queryRazonesZZ5 A
.ZZA B
ToListZZB H
(ZZH I
)ZZI J
)ZZJ K
;ZZK L
}[[ 
catch\\ 
{]] 
throw^^ 
;^^ 
}__ 
}`` 	
}aa 
}bb ˙ñ
xC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\PublicacionesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class !
PublicacionesServicio &
:' ("
IPublicacionesServicio) ?
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Publicaciones. ;
>; <%
_publicacionesRepositorio= V
;V W
private 
readonly 
IMapper  
_mapper! (
;( )
private 
readonly '
IFotosPublicacionesServicio 4'
_fotosPublicacionesServicio5 P
;P Q
private 
readonly  
IRepositorioGenerico -
<- .
FotosPublicaciones. @
>@ A
_fotosPublicacionesB U
;U V
public !
PublicacionesServicio $
($ % 
IRepositorioGenerico% 9
<9 :
Publicaciones: G
>G H$
publicacionesRepositorioI a
,a b'
IFotosPublicacionesServicioc ~'
fotosPublicacionesServicio	 ô
,
ô ö
IMapper
õ ¢
mapper
£ ©
,
© ™"
IRepositorioGenerico
´ ø
<
ø ¿ 
FotosPublicaciones
¿ “
>
“ ” 
fotosPublicaciones
‘ Ê
)
Ê Á
{ 	%
_publicacionesRepositorio %
=& '$
publicacionesRepositorio( @
;@ A'
_fotosPublicacionesServicio '
=( )&
fotosPublicacionesServicio* D
;D E
_fotosPublicaciones 
=  !
fotosPublicaciones" 4
;4 5
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
PublicacionesDTO *
>* +
Buscar, 2
(2 3
string3 9
id: <
)< =
{ 	
try   
{!! 
var"" !
publicacionEncontrada"" )
=""* +
await"", 1%
_publicacionesRepositorio""2 K
.""K L
Obtener""L S
(""S T
x""T U
=>""V X
x""Y Z
.""Z [
Id""[ ]
==""^ `
id""a c
)""c d
;""d e
if## 
(## !
publicacionEncontrada## )
==##* ,
null##- 1
)##1 2
throw$$ 
new$$ !
TaskCanceledException$$ 3
($$3 4
$str$$4 G
)$$G H
;$$H I
return%% 
_mapper%% 
.%% 
Map%% "
<%%" #
PublicacionesDTO%%# 3
>%%3 4
(%%4 5!
publicacionEncontrada%%5 J
)%%J K
;%%K L
}&& 
catch'' 
{(( 
throw)) 
;)) 
}** 
}++ 	
public-- 
async-- 
Task-- 
<-- 
PublicacionesDTO-- *
>--* +
Crear--, 1
(--1 2
PublicacionesDTO--2 B
modelo--C I
)--I J
{.. 	
try// 
{00 
var11 
modeloActualizado11 %
=11& '
modelo11( .
;11. /
modeloActualizado22 !
.22! "
FechaPublicacion22" 2
=223 4
DateTime225 =
.22= >
Now22> A
;22A B
var33 
publicacionCreada33 %
=33& '
await33( -%
_publicacionesRepositorio33. G
.33G H
Crear33H M
(33M N
_mapper33N U
.33U V
Map33V Y
<33Y Z
Publicaciones33Z g
>33g h
(33h i
modeloActualizado33i z
)33z {
)33{ |
;33| }
if44 
(44 
publicacionCreada44 %
.44% &
Id44& (
==44) +
null44, 0
)440 1
throw55 
new55 
	Exception55 '
(55' (
$str55( :
)55: ;
;55; <
return66 
_mapper66 
.66 
Map66 "
<66" #
PublicacionesDTO66# 3
>663 4
(664 5
publicacionCreada665 F
)66F G
;66G H
}77 
catch88 
{99 
throw:: 
;:: 
};; 
}<< 	
public>> 
async>> 
Task>> 
<>> 
bool>> 
>>> 
Editar>>  &
(>>& '
PublicacionesDTO>>' 7
modelo>>8 >
)>>> ?
{?? 	
try@@ 
{AA 
varBB 
publicacionModeloBB %
=BB& '
_mapperBB( /
.BB/ 0
MapBB0 3
<BB3 4
PublicacionesBB4 A
>BBA B
(BBB C
modeloBBC I
)BBI J
;BBJ K
varCC !
publicacionEncontradaCC )
=CC* +
awaitCC, 1%
_publicacionesRepositorioCC2 K
.CCK L
ObtenerCCL S
(CCS T
xCCT U
=>CCV X
xCCY Z
.CCZ [
IdCC[ ]
==CC^ `
modeloCCa g
.CCg h
IdCCh j
)CCj k
;CCk l
ifDD 
(DD !
publicacionEncontradaDD )
==DD* ,
nullDD- 1
)DD1 2
throwEE 
newEE !
TaskCanceledExceptionEE 3
(EE3 4
$strEE4 N
)EEN O
;EEO P!
publicacionEncontradaFF %
.FF% &
TituloFF& ,
=FF- .
publicacionModeloFF/ @
.FF@ A
TituloFFA G
;FFG H!
publicacionEncontradaGG %
.GG% &
FechaPublicacionGG& 6
=GG7 8
publicacionModeloGG9 J
.GGJ K
FechaPublicacionGGK [
;GG[ \!
publicacionEncontradaHH %
.HH% &
PrecioHH& ,
=HH- .
publicacionModeloHH/ @
.HH@ A
PrecioHHA G
;HHG H!
publicacionEncontradaII %
.II% &
IdCategoriaII& 1
=II2 3
publicacionModeloII4 E
.IIE F
IdCategoriaIIF Q
;IIQ R!
publicacionEncontradaJJ %
.JJ% &
DescripcionJJ& 1
=JJ2 3
publicacionModeloJJ4 E
.JJE F
DescripcionJJF Q
;JJQ R!
publicacionEncontradaKK %
.KK% &
	DireccionKK& /
=KK0 1
publicacionModeloKK2 C
?KKC D
.KKD E
	DireccionKKE N
;KKN O!
publicacionEncontradaLL %
.LL% &
IdEstadoLL& .
=LL/ 0
publicacionModeloLL1 B
?LLB C
.LLC D
IdEstadoLLD L
;LLL M
boolMM 
	respuestaMM 
=MM  
awaitMM! &%
_publicacionesRepositorioMM' @
.MM@ A
EditarMMA G
(MMG H!
publicacionEncontradaMMH ]
)MM] ^
;MM^ _
ifNN 
(NN 
!NN 
	respuestaNN 
)NN 
throwOO 
newOO !
TaskCanceledExceptionOO 3
(OO3 4
$strOO4 G
)OOG H
;OOH I
returnPP 
	respuestaPP  
;PP  !
}QQ 
catchRR 
{SS 
throwTT 
;TT 
}UU 
}VV 	
publicXX 
asyncXX 
TaskXX 
<XX 
boolXX 
>XX 
EliminarXX  (
(XX( )
stringXX) /
idXX0 2
)XX2 3
{YY 	
tryZZ 
{[[ 
var\\ !
publicacionEncontrada\\ )
=\\* +
await\\, 1%
_publicacionesRepositorio\\2 K
.\\K L
Obtener\\L S
(\\S T
x\\T U
=>\\V X
x\\Y Z
.\\Z [
Id\\[ ]
==\\^ `
id\\a c
)\\c d
;\\d e
var]] $
fotosPublicacionEliminar]] ,
=]]- .
await]]/ 4
_fotosPublicaciones]]5 H
.]]H I
	Consultar]]I R
(]]R S
x]]S T
=>]]U W
x]]X Y
.]]Y Z
IdPublicacion]]Z g
==]]h j
id]]k m
)]]m n
;]]n o
var^^ 

listaFotos^^ 
=^^  $
fotosPublicacionEliminar^^! 9
.^^9 :
ToList^^: @
(^^@ A
)^^A B
;^^B C
foreach__ 
(__ 
var__ 
item__ !
in__" $

listaFotos__% /
)__/ 0
{`` 
awaitaa '
_fotosPublicacionesServicioaa 5
.aa5 6
Eliminaraa6 >
(aa> ?
itemaa? C
.aaC D
IdaaD F
)aaF G
;aaG H
}bb 
ifdd 
(dd !
publicacionEncontradadd )
==dd* ,
nulldd- 1
)dd1 2
throwee 
newee !
TaskCanceledExceptionee 3
(ee3 4
$stree4 N
)eeN O
;eeO P
boolff 
	respuestaff 
=ff  
awaitff! &%
_publicacionesRepositorioff' @
.ff@ A
EliminarffA I
(ffI J!
publicacionEncontradaffJ _
)ff_ `
;ff` a
ifgg 
(gg 
!gg 
	respuestagg 
)gg 
throwhh 
newhh !
TaskCanceledExceptionhh 3
(hh3 4
$strhh4 I
)hhI J
;hhJ K
returnii 
	respuestaii  
;ii  !
}jj 
catchkk 
{ll 
throwmm 
;mm 
}nn 
}oo 	
publicqq 
asyncqq 
Taskqq 
<qq 
Listqq 
<qq !
FotosPublicacionesDTOqq 4
>qq4 5
>qq5 6
FotosPublicacionesqq7 I
(qqI J
stringqqJ P
idPublicacionqqQ ^
)qq^ _
{rr 	
tryss 
{tt 
varuu 

queryfotosuu 
=uu  
awaituu! &'
_fotosPublicacionesServiciouu' B
.uuB C"
BuscarFotosPublicacionuuC Y
(uuY Z
idPublicacionuuZ g
)uug h
;uuh i
ifww 
(ww 

queryfotosww 
==ww !
nullww" &
||ww' )
!ww* +

queryfotosww+ 5
.ww5 6
Anyww6 9
(ww9 :
)ww: ;
)ww; <
throwxx 
newxx !
TaskCanceledExceptionxx 3
(xx3 4
$strxx4 l
)xxl m
;xxm n
returnyy 
_mapperyy 
.yy 
Mapyy "
<yy" #
Listyy# '
<yy' (!
FotosPublicacionesDTOyy( =
>yy= >
>yy> ?
(yy? @

queryfotosyy@ J
)yyJ K
;yyK L
}zz 
catch{{ 
{|| 
throw}} 
;}} 
}~~ 
} 	
public
ÅÅ 
async
ÅÅ 
Task
ÅÅ 
<
ÅÅ 
List
ÅÅ 
<
ÅÅ 
PublicacionesDTO
ÅÅ /
>
ÅÅ/ 0
>
ÅÅ0 1
Listar
ÅÅ2 8
(
ÅÅ8 9
)
ÅÅ9 :
{
ÇÇ 	
try
ÉÉ 
{
ÑÑ 
var
ÖÖ 
queryPublicacion
ÖÖ $
=
ÖÖ% &
await
ÖÖ' ,'
_publicacionesRepositorio
ÖÖ- F
.
ÖÖF G
	Consultar
ÖÖG P
(
ÖÖP Q
)
ÖÖQ R
;
ÖÖR S
var
ÜÜ  
listaPublicaciones
ÜÜ &
=
ÜÜ' (
queryPublicacion
ÜÜ) 9
.
áá 
OrderByDescending
áá &
(
áá& '
x
áá' (
=>
áá) +
x
áá, -
.
áá- .
FechaPublicacion
áá. >
)
áá> ?
.
àà 
ToList
àà 
(
àà 
)
àà 
;
àà 
return
ää 
_mapper
ää 
.
ää 
Map
ää "
<
ää" #
List
ää# '
<
ää' (
PublicacionesDTO
ää( 8
>
ää8 9
>
ää9 :
(
ää: ; 
listaPublicaciones
ää; M
)
ääM N
;
ääN O
}
ãã 
catch
åå 
{
çç 
throw
éé 
;
éé 
}
èè 
}
êê 	
public
íí 
async
íí 
Task
íí 
<
íí 
List
íí 
<
íí 
PublicacionesDTO
íí /
>
íí/ 0
>
íí0 1*
ListarSoloConLongitudLatitud
íí2 N
(
ííN O
)
ííO P
{
ìì 	
try
îî 
{
ïï 
var
ññ 
queryPublicacion
ññ $
=
ññ% &
await
ññ' ,'
_publicacionesRepositorio
ññ- F
.
ññF G
	Consultar
ññG P
(
ññP Q
)
ññQ R
;
ññR S
var
óó  
listaPublicaciones
óó &
=
óó' (
queryPublicacion
óó) 9
.
óó9 :
ToList
óó: @
(
óó@ A
)
óóA B
;
óóB C
if
ôô 
(
ôô  
listaPublicaciones
ôô &
==
ôô' )
null
ôô* .
||
ôô/ 1
!
ôô2 3 
listaPublicaciones
ôô3 E
.
ôôE F
Any
ôôF I
(
ôôI J
)
ôôJ K
)
ôôK L
throw
öö 
new
öö #
TaskCanceledException
öö 3
(
öö3 4
$str
öö4 U
)
ööU V
;
ööV W
var
úú -
publicacionesConLongitudLatitud
úú 3
=
úú4 5 
listaPublicaciones
úú6 H
.
ùù 
Where
ùù 
(
ùù 
p
ùù 
=>
ùù 
p
ùù  !
.
ùù! "
Latitud
ùù" )
!=
ùù* ,
null
ùù- 1
&&
ùù2 4
p
ùù5 6
.
ùù6 7
Altitud
ùù7 >
!=
ùù? A
null
ùùB F
&&
ùùG I
p
ùùJ K
.
ùùK L
IdEstado
ùùL T
==
ùùU W
$str
ùùX _
)
ùù_ `
.
ûû 
ToList
ûû 
(
ûû 
)
ûû 
;
ûû 
return
†† 
_mapper
†† 
.
†† 
Map
†† "
<
††" #
List
††# '
<
††' (
PublicacionesDTO
††( 8
>
††8 9
>
††9 :
(
††: ;-
publicacionesConLongitudLatitud
††; Z
)
††Z [
;
††[ \
}
°° 
catch
¢¢ 
{
££ 
throw
§§ 
;
§§ 
}
•• 
}
¶¶ 	
public
©© 
async
©© 
Task
©© 
<
©© 
List
©© 
<
©© 
PublicacionesDTO
©© /
>
©©/ 0
>
©©0 1 
ListarPorCategoria
©©2 D
(
©©D E
string
©©E K
idCategoria
©©L W
)
©©W X
{
™™ 	
try
´´ 
{
¨¨ 
var
ÆÆ 
queryPublicacion
ÆÆ $
=
ÆÆ% &
await
ÆÆ' ,'
_publicacionesRepositorio
ÆÆ- F
.
ÆÆF G
	Consultar
ÆÆG P
(
ÆÆP Q
)
ÆÆQ R
;
ÆÆR S
var
ØØ 
listaFiltrada
ØØ !
=
ØØ" #
queryPublicacion
ØØ$ 4
.
∞∞ 
Where
∞∞ 
(
∞∞ 
x
∞∞ 
=>
∞∞ 
x
∞∞  !
.
∞∞! "
IdCategoria
∞∞" -
==
∞∞. 0
idCategoria
∞∞1 <
&&
∞∞= ?
x
∞∞@ A
.
∞∞A B
IdEstado
∞∞B J
==
∞∞K M
$str
∞∞N U
)
∞∞U V
.
±± 
OrderByDescending
±± &
(
±±& '
x
±±' (
=>
±±) +
x
±±, -
.
±±- .
FechaPublicacion
±±. >
)
±±> ?
.
≤≤ 
ToList
≤≤ 
(
≤≤ 
)
≤≤ 
;
≤≤ 
if
¥¥ 
(
¥¥ 
listaFiltrada
¥¥ !
==
¥¥" $
null
¥¥% )
||
¥¥* ,
!
¥¥- .
listaFiltrada
¥¥. ;
.
¥¥; <
Any
¥¥< ?
(
¥¥? @
)
¥¥@ A
)
¥¥A B
throw
µµ 
new
µµ #
TaskCanceledException
µµ 3
(
µµ3 4
$str
µµ4 t
)
µµt u
;
µµu v
return
∑∑ 
_mapper
∑∑ 
.
∑∑ 
Map
∑∑ "
<
∑∑" #
List
∑∑# '
<
∑∑' (
PublicacionesDTO
∑∑( 8
>
∑∑8 9
>
∑∑9 :
(
∑∑: ;
listaFiltrada
∑∑; H
)
∑∑H I
;
∑∑I J
}
∏∏ 
catch
ππ 
{
∫∫ 
throw
ªª 
;
ªª 
}
ºº 
}
ΩΩ 	
public
øø 
async
øø 
Task
øø 
<
øø 
List
øø 
<
øø 
PublicacionesDTO
øø /
>
øø/ 0
>
øø0 1
ListarPorUsuario
øø2 B
(
øøB C
string
øøC I
id
øøJ L
)
øøL M
{
¿¿ 	
try
¡¡ 
{
¬¬ 
var
ƒƒ 
queryPublicacion
ƒƒ $
=
ƒƒ% &
await
ƒƒ' ,'
_publicacionesRepositorio
ƒƒ- F
.
ƒƒF G
	Consultar
ƒƒG P
(
ƒƒP Q
)
ƒƒQ R
;
ƒƒR S
var
≈≈ 
listaFiltrada
≈≈ !
=
≈≈" #
queryPublicacion
≈≈$ 4
.
∆∆ 
Where
∆∆ 
(
∆∆ 
x
∆∆ 
=>
∆∆ 
x
∆∆  !
.
∆∆! "
	IdUsuario
∆∆" +
==
∆∆, .
id
∆∆/ 1
)
∆∆1 2
.
«« 
ToList
«« 
(
«« 
)
«« 
;
«« 
if
…… 
(
…… 
listaFiltrada
…… !
==
……" $
null
……% )
||
……* ,
!
……- .
listaFiltrada
……. ;
.
……; <
Any
……< ?
(
……? @
)
……@ A
)
……A B
throw
   
new
   #
TaskCanceledException
   3
(
  3 4
$str
  4 r
)
  r s
;
  s t
return
ÃÃ 
_mapper
ÃÃ 
.
ÃÃ 
Map
ÃÃ "
<
ÃÃ" #
List
ÃÃ# '
<
ÃÃ' (
PublicacionesDTO
ÃÃ( 8
>
ÃÃ8 9
>
ÃÃ9 :
(
ÃÃ: ;
listaFiltrada
ÃÃ; H
)
ÃÃH I
;
ÃÃI J
}
ÕÕ 
catch
ŒŒ 
{
œœ 
throw
–– 
;
–– 
}
—— 
}
““ 	
public
‘‘ 
async
‘‘ 
Task
‘‘ 
<
‘‘ 
string
‘‘  
>
‘‘  !'
ObtenerIdNuevaPublicacion
‘‘" ;
(
‘‘; <
)
‘‘< =
{
’’ 	
try
÷÷ 
{
◊◊ 
var
ÿÿ 
publicaciones
ÿÿ !
=
ÿÿ" #
await
ÿÿ$ )'
_publicacionesRepositorio
ÿÿ* C
.
ÿÿC D
	Consultar
ÿÿD M
(
ÿÿM N
)
ÿÿN O
;
ÿÿO P
var
ŸŸ 
listaIds
ŸŸ 
=
ŸŸ 
publicaciones
ŸŸ ,
.
⁄⁄ 
ToList
⁄⁄ 
(
⁄⁄ 
)
⁄⁄ 
.
€€ 
Select
€€ 
(
€€ 
p
€€ 
=>
€€  
p
€€! "
.
€€" #
Id
€€# %
)
€€% &
.
‹‹ 
Where
‹‹ 
(
‹‹ 
id
‹‹ 
=>
‹‹  
!
‹‹! "
string
‹‹" (
.
‹‹( )
IsNullOrEmpty
‹‹) 6
(
‹‹6 7
id
‹‹7 9
)
‹‹9 :
&&
‹‹; =
id
‹‹> @
.
‹‹@ A

StartsWith
‹‹A K
(
‹‹K L
$str
‹‹L Q
)
‹‹Q R
)
‹‹R S
.
›› 
Select
›› 
(
›› 
id
›› 
=>
›› !
{
ﬁﬁ 
var
ﬂﬂ 
	numeroStr
ﬂﬂ %
=
ﬂﬂ& '
id
ﬂﬂ( *
.
ﬂﬂ* +
	Substring
ﬂﬂ+ 4
(
ﬂﬂ4 5
$num
ﬂﬂ5 6
)
ﬂﬂ6 7
;
ﬂﬂ7 8
return
‡‡ 
int
‡‡ "
.
‡‡" #
TryParse
‡‡# +
(
‡‡+ ,
	numeroStr
‡‡, 5
,
‡‡5 6
out
‡‡7 :
int
‡‡; >
numero
‡‡? E
)
‡‡E F
?
‡‡G H
numero
‡‡I O
:
‡‡P Q
$num
‡‡R S
;
‡‡S T
}
·· 
)
·· 
.
‚‚ 
ToList
‚‚ 
(
‚‚ 
)
‚‚ 
;
‚‚ 
int
‰‰ 
	maxNumero
‰‰ 
=
‰‰ 
listaIds
‰‰  (
.
‰‰( )
Any
‰‰) ,
(
‰‰, -
)
‰‰- .
?
‰‰/ 0
listaIds
‰‰1 9
.
‰‰9 :
Max
‰‰: =
(
‰‰= >
)
‰‰> ?
:
‰‰@ A
$num
‰‰B C
;
‰‰C D
int
ÂÂ 
nuevoNumero
ÂÂ 
=
ÂÂ  !
	maxNumero
ÂÂ" +
+
ÂÂ, -
$num
ÂÂ. /
;
ÂÂ/ 0
return
ÁÁ 
$"
ÁÁ 
$str
ÁÁ 
{
ÁÁ 
nuevoNumero
ÁÁ (
.
ÁÁ( )
ToString
ÁÁ) 1
(
ÁÁ1 2
$str
ÁÁ2 6
)
ÁÁ6 7
}
ÁÁ7 8
"
ÁÁ8 9
;
ÁÁ9 :
}
ËË 
catch
ÈÈ 
{
ÍÍ 
throw
ÎÎ 
;
ÎÎ 
}
ÏÏ 
}
ÌÌ 	
public
ÔÔ 
async
ÔÔ 
Task
ÔÔ 
<
ÔÔ 
List
ÔÔ 
<
ÔÔ 
PublicacionesDTO
ÔÔ /
>
ÔÔ/ 0
>
ÔÔ0 1
listarActivos
ÔÔ2 ?
(
ÔÔ? @
)
ÔÔ@ A
{
 	
try
ÒÒ 
{
ÚÚ 
var
ÛÛ 
queryPublicacion
ÛÛ $
=
ÛÛ% &
await
ÛÛ' ,'
_publicacionesRepositorio
ÛÛ- F
.
ÛÛF G
	Consultar
ÛÛG P
(
ÛÛP Q
)
ÛÛQ R
;
ÛÛR S
var
ıı 
listaFiltrada
ıı !
=
ıı" #
queryPublicacion
ıı$ 4
.
ˆˆ 
Where
ˆˆ 
(
ˆˆ 
x
ˆˆ 
=>
ˆˆ 
x
ˆˆ  !
.
ˆˆ! "
IdEstado
ˆˆ" *
==
ˆˆ+ -
$str
ˆˆ. 5
)
ˆˆ5 6
.
˜˜ 
OrderByDescending
˜˜ &
(
˜˜& '
x
˜˜' (
=>
˜˜) +
x
˜˜, -
.
˜˜- .
FechaPublicacion
˜˜. >
)
˜˜> ?
.
¯¯ 
ToList
¯¯ 
(
¯¯ 
)
¯¯ 
;
¯¯ 
if
˙˙ 
(
˙˙ 
listaFiltrada
˙˙ !
==
˙˙" $
null
˙˙% )
||
˙˙* ,
!
˙˙- .
listaFiltrada
˙˙. ;
.
˙˙; <
Any
˙˙< ?
(
˙˙? @
)
˙˙@ A
)
˙˙A B
throw
˚˚ 
new
˚˚ #
TaskCanceledException
˚˚ 3
(
˚˚3 4
$str
˚˚4 r
)
˚˚r s
;
˚˚s t
return
˝˝ 
_mapper
˝˝ 
.
˝˝ 
Map
˝˝ "
<
˝˝" #
List
˝˝# '
<
˝˝' (
PublicacionesDTO
˝˝( 8
>
˝˝8 9
>
˝˝9 :
(
˝˝: ;
listaFiltrada
˝˝; H
)
˝˝H I
;
˝˝I J
}
˛˛ 
catch
ˇˇ 
{
ÄÄ 
throw
ÅÅ 
;
ÅÅ 
}
ÇÇ 
}
ÉÉ 	
public
ÜÜ 
async
ÜÜ 
Task
ÜÜ 
<
ÜÜ 
List
ÜÜ 
<
ÜÜ 
PublicacionesDTO
ÜÜ /
>
ÜÜ/ 0
>
ÜÜ0 1
busquedaTexto
ÜÜ2 ?
(
ÜÜ? @
string
ÜÜ@ F
textoBusqueda
ÜÜG T
)
ÜÜT U
{
áá 	
var
àà 
publicaciones
àà 
=
àà 
listarActivos
àà  -
(
àà- .
)
àà. /
;
àà/ 0
try
ââ 
{
ää 
var
ãã  
listaPublicaciones
ãã &
=
ãã' (
await
ãã) .
publicaciones
ãã/ <
;
ãã< =
if
åå 
(
åå  
listaPublicaciones
åå &
==
åå' )
null
åå* .
||
åå/ 1
!
åå2 3 
listaPublicaciones
åå3 E
.
ååE F
Any
ååF I
(
ååI J
)
ååJ K
)
ååK L
throw
çç 
new
çç #
TaskCanceledException
çç 3
(
çç3 4
$str
çç4 U
)
ççU V
;
ççV W
var
éé $
publicacionesFiltradas
éé *
=
éé+ , 
listaPublicaciones
éé- ?
.
èè 
Where
èè 
(
èè 
p
èè 
=>
èè 
p
èè  !
.
èè! "
Titulo
èè" (
.
èè( )
Contains
èè) 1
(
èè1 2
textoBusqueda
èè2 ?
,
èè? @
StringComparison
èèA Q
.
èèQ R
OrdinalIgnoreCase
èèR c
)
èèc d
)
èèd e
.
êê 
ToList
êê 
(
êê 
)
êê 
;
êê 
return
ëë $
publicacionesFiltradas
ëë -
;
ëë- .
}
íí 
catch
ìì 
{
îî 
throw
ïï 
;
ïï 
}
ññ 
}
óó 	
public
ôô 
Task
ôô 
<
ôô 
List
ôô 
<
ôô 
PublicacionesDTO
ôô )
>
ôô) *
>
ôô* +
ListarRangoPrecio
ôô, =
(
ôô= >
decimal
ôô> E
precioMinimo
ôôF R
,
ôôR S
decimal
ôôT [
precioMaximo
ôô\ h
)
ôôh i
{
öö 	
try
õõ 
{
úú 
var
ùù 
publicaciones
ùù !
=
ùù" #
listarActivos
ùù$ 1
(
ùù1 2
)
ùù2 3
;
ùù3 4
var
ûû  
listaPublicaciones
ûû &
=
ûû' (
publicaciones
ûû) 6
.
ûû6 7
Result
ûû7 =
;
ûû= >
if
üü 
(
üü  
listaPublicaciones
üü &
==
üü' )
null
üü* .
||
üü/ 1
!
üü2 3 
listaPublicaciones
üü3 E
.
üüE F
Any
üüF I
(
üüI J
)
üüJ K
)
üüK L
throw
†† 
new
†† #
TaskCanceledException
†† 3
(
††3 4
$str
††4 U
)
††U V
;
††V W
var
°° $
publicacionesFiltradas
°° *
=
°°+ , 
listaPublicaciones
°°- ?
.
¢¢ 
Where
¢¢ 
(
¢¢ 
p
¢¢ 
=>
¢¢ 
p
¢¢  !
.
¢¢! "
Precio
¢¢" (
>=
¢¢) +
precioMinimo
¢¢, 8
&&
¢¢9 ;
p
¢¢< =
.
¢¢= >
Precio
¢¢> D
<=
¢¢E G
precioMaximo
¢¢H T
)
¢¢T U
.
££ 
ToList
££ 
(
££ 
)
££ 
;
££ 
return
§§ 
Task
§§ 
.
§§ 

FromResult
§§ &
(
§§& '
_mapper
§§' .
.
§§. /
Map
§§/ 2
<
§§2 3
List
§§3 7
<
§§7 8
PublicacionesDTO
§§8 H
>
§§H I
>
§§I J
(
§§J K$
publicacionesFiltradas
§§K a
)
§§a b
)
§§b c
;
§§c d
}
•• 
catch
¶¶ 
{
ßß 
throw
®® 
;
®® 
}
©© 
}
™™ 	
public
¨¨ 
async
¨¨ 
Task
¨¨ 
<
¨¨ 
List
¨¨ 
<
¨¨ 
PublicacionesDTO
¨¨ /
>
¨¨/ 0
>
¨¨0 1!
ListarMaxOMinPrecio
¨¨2 E
(
¨¨E F
string
¨¨F L

tipoFiltro
¨¨M W
)
¨¨W X
{
≠≠ 	
try
ÆÆ 
{
ØØ 
var
∞∞  
listaPublicaciones
∞∞ &
=
∞∞' (
await
∞∞) .
listarActivos
∞∞/ <
(
∞∞< =
)
∞∞= >
;
∞∞> ?
if
≤≤ 
(
≤≤  
listaPublicaciones
≤≤ &
==
≤≤' )
null
≤≤* .
||
≤≤/ 1
!
≤≤2 3 
listaPublicaciones
≤≤3 E
.
≤≤E F
Any
≤≤F I
(
≤≤I J
)
≤≤J K
)
≤≤K L
throw
≥≥ 
new
≥≥ #
TaskCanceledException
≥≥ 3
(
≥≥3 4
$str
≥≥4 U
)
≥≥U V
;
≥≥V W
List
µµ 
<
µµ 
PublicacionesDTO
µµ %
>
µµ% &$
publicacionesOrdenadas
µµ' =
;
µµ= >
if
∑∑ 
(
∑∑ 

tipoFiltro
∑∑ 
==
∑∑ !
$str
∑∑" '
)
∑∑' (
{
∏∏ $
publicacionesOrdenadas
ππ *
=
ππ+ , 
listaPublicaciones
ππ- ?
.
∫∫ 
OrderByDescending
∫∫ *
(
∫∫* +
p
∫∫+ ,
=>
∫∫- /
p
∫∫0 1
.
∫∫1 2
Precio
∫∫2 8
)
∫∫8 9
.
ªª 
ToList
ªª 
(
ªª  
)
ªª  !
;
ªª! "
}
ºº 
else
ΩΩ 
if
ΩΩ 
(
ΩΩ 

tipoFiltro
ΩΩ #
==
ΩΩ$ &
$str
ΩΩ' ,
)
ΩΩ, -
{
ææ $
publicacionesOrdenadas
øø *
=
øø+ , 
listaPublicaciones
øø- ?
.
¿¿ 
OrderBy
¿¿  
(
¿¿  !
p
¿¿! "
=>
¿¿# %
p
¿¿& '
.
¿¿' (
Precio
¿¿( .
)
¿¿. /
.
¡¡ 
ToList
¡¡ 
(
¡¡  
)
¡¡  !
;
¡¡! "
}
¬¬ 
else
√√ 
{
ƒƒ 
throw
≈≈ 
new
≈≈ 
ArgumentException
≈≈ /
(
≈≈/ 0
$str
≈≈0 ^
)
≈≈^ _
;
≈≈_ `
}
∆∆ 
return
»» 
_mapper
»» 
.
»» 
Map
»» "
<
»»" #
List
»»# '
<
»»' (
PublicacionesDTO
»»( 8
>
»»8 9
>
»»9 :
(
»»: ;$
publicacionesOrdenadas
»»; Q
)
»»Q R
;
»»R S
}
…… 
catch
   
{
ÀÀ 
throw
ÃÃ 
;
ÃÃ 
}
ÕÕ 
}
ŒŒ 	
public
—— 
async
—— 
Task
—— 
<
—— 
List
—— 
<
—— 
PublicacionesDTO
—— /
>
——/ 0
>
——0 1
ListarPorFecha
——2 @
(
——@ A
string
——A G

tipoFiltro
——H R
)
——R S
{
““ 	
var
””  
listaPublicaciones
”” "
=
””# $
await
””% *
listarActivos
””+ 8
(
””8 9
)
””9 :
;
””: ;
var
‘‘ 
fechaActual
‘‘ 
=
‘‘ 
DateTime
‘‘ &
.
‘‘& '
Now
‘‘' *
;
‘‘* +
try
÷÷ 
{
◊◊ 
if
ÿÿ 
(
ÿÿ  
listaPublicaciones
ÿÿ &
==
ÿÿ' )
null
ÿÿ* .
||
ÿÿ/ 1
!
ÿÿ2 3 
listaPublicaciones
ÿÿ3 E
.
ÿÿE F
Any
ÿÿF I
(
ÿÿI J
)
ÿÿJ K
)
ÿÿK L
throw
ŸŸ 
new
ŸŸ #
TaskCanceledException
ŸŸ 3
(
ŸŸ3 4
$str
ŸŸ4 U
)
ŸŸU V
;
ŸŸV W
List
€€ 
<
€€ 
PublicacionesDTO
€€ %
>
€€% &$
publicacionesFiltradas
€€' =
;
€€= >
if
›› 
(
›› 

tipoFiltro
›› 
==
›› !
$str
››" '
)
››' (
{
ﬁﬁ $
publicacionesFiltradas
ﬂﬂ *
=
ﬂﬂ+ , 
listaPublicaciones
ﬂﬂ- ?
.
‡‡ 
Where
‡‡ 
(
‡‡ 
p
‡‡  
=>
‡‡! #
p
‡‡$ %
.
‡‡% &
FechaPublicacion
‡‡& 6
.
‡‡6 7
Date
‡‡7 ;
==
‡‡< >
fechaActual
‡‡? J
.
‡‡J K
Date
‡‡K O
)
‡‡O P
.
·· 
ToList
·· 
(
··  
)
··  !
;
··! "
}
‚‚ 
else
„„ 
if
„„ 
(
„„ 

tipoFiltro
„„ #
==
„„$ &
$str
„„' /
)
„„/ 0
{
‰‰ 
var
ÂÂ 
inicioSemana
ÂÂ $
=
ÂÂ% &
fechaActual
ÂÂ' 2
.
ÂÂ2 3
Date
ÂÂ3 7
.
ÂÂ7 8
AddDays
ÂÂ8 ?
(
ÂÂ? @
-
ÂÂ@ A
(
ÂÂA B
int
ÂÂB E
)
ÂÂE F
fechaActual
ÂÂF Q
.
ÂÂQ R
	DayOfWeek
ÂÂR [
)
ÂÂ[ \
;
ÂÂ\ ]
var
ÊÊ 
	finSemana
ÊÊ !
=
ÊÊ" #
inicioSemana
ÊÊ$ 0
.
ÊÊ0 1
AddDays
ÊÊ1 8
(
ÊÊ8 9
$num
ÊÊ9 :
)
ÊÊ: ;
;
ÊÊ; <$
publicacionesFiltradas
ËË *
=
ËË+ , 
listaPublicaciones
ËË- ?
.
ÈÈ 
Where
ÈÈ 
(
ÈÈ 
p
ÈÈ  
=>
ÈÈ! #
p
ÈÈ$ %
.
ÈÈ% &
FechaPublicacion
ÈÈ& 6
.
ÈÈ6 7
Date
ÈÈ7 ;
>=
ÈÈ< >
inicioSemana
ÈÈ? K
&&
ÈÈL N
p
ÈÈO P
.
ÈÈP Q
FechaPublicacion
ÈÈQ a
.
ÈÈa b
Date
ÈÈb f
<=
ÈÈg i
	finSemana
ÈÈj s
)
ÈÈs t
.
ÍÍ 
ToList
ÍÍ 
(
ÍÍ  
)
ÍÍ  !
;
ÍÍ! "
}
ÎÎ 
else
ÏÏ 
if
ÏÏ 
(
ÏÏ 

tipoFiltro
ÏÏ #
==
ÏÏ$ &
$str
ÏÏ' ,
)
ÏÏ, -
{
ÌÌ $
publicacionesFiltradas
ÓÓ *
=
ÓÓ+ , 
listaPublicaciones
ÓÓ- ?
.
ÔÔ 
Where
ÔÔ 
(
ÔÔ 
p
ÔÔ  
=>
ÔÔ! #
p
ÔÔ$ %
.
ÔÔ% &
FechaPublicacion
ÔÔ& 6
.
ÔÔ6 7
Month
ÔÔ7 <
==
ÔÔ= ?
fechaActual
ÔÔ@ K
.
ÔÔK L
Month
ÔÔL Q
&&
ÔÔR T
p
ÔÔU V
.
ÔÔV W
FechaPublicacion
ÔÔW g
.
ÔÔg h
Year
ÔÔh l
==
ÔÔm o
fechaActual
ÔÔp {
.
ÔÔ{ |
YearÔÔ| Ä
)ÔÔÄ Å
.
 
ToList
 
(
  
)
  !
;
! "
}
ÒÒ 
else
ÚÚ 
if
ÚÚ 
(
ÚÚ 

tipoFiltro
ÚÚ #
==
ÚÚ$ &
$str
ÚÚ' ,
)
ÚÚ, -
{
ÛÛ $
publicacionesFiltradas
ÙÙ *
=
ÙÙ+ , 
listaPublicaciones
ÙÙ- ?
.
ıı 
Where
ıı 
(
ıı 
p
ıı  
=>
ıı! #
p
ıı$ %
.
ıı% &
FechaPublicacion
ıı& 6
.
ıı6 7
Year
ıı7 ;
==
ıı< >
fechaActual
ıı? J
.
ııJ K
Year
ııK O
)
ııO P
.
ˆˆ 
ToList
ˆˆ 
(
ˆˆ  
)
ˆˆ  !
;
ˆˆ! "
}
˜˜ 
else
¯¯ 
if
¯¯ 
(
¯¯ 

tipoFiltro
¯¯ #
==
¯¯$ &
$str
¯¯' 3
)
¯¯3 4
{
˘˘ 
var
˙˙ 

horaLimite
˙˙ "
=
˙˙# $
fechaActual
˙˙% 0
.
˙˙0 1
AddHours
˙˙1 9
(
˙˙9 :
-
˙˙: ;
$num
˙˙; <
)
˙˙< =
;
˙˙= >$
publicacionesFiltradas
˚˚ *
=
˚˚+ , 
listaPublicaciones
˚˚- ?
.
¸¸ 
Where
¸¸ 
(
¸¸ 
p
¸¸  
=>
¸¸! #
p
¸¸$ %
.
¸¸% &
FechaPublicacion
¸¸& 6
>=
¸¸7 9

horaLimite
¸¸: D
&&
¸¸E G
p
¸¸H I
.
¸¸I J
FechaPublicacion
¸¸J Z
<=
¸¸[ ]
fechaActual
¸¸^ i
)
¸¸i j
.
˝˝ 
ToList
˝˝ 
(
˝˝  
)
˝˝  !
;
˝˝! "
}
˛˛ 
else
ˇˇ 
{
ÄÄ 
throw
ÅÅ 
new
ÅÅ 
ArgumentException
ÅÅ /
(
ÅÅ/ 0
$str
ÅÅ0 }
)
ÅÅ} ~
;
ÅÅ~ 
}
ÇÇ 
return
ÑÑ $
publicacionesFiltradas
ÑÑ -
;
ÑÑ- .
}
ÖÖ 
catch
ÜÜ 
{
áá 
throw
àà 
;
àà 
}
ââ 
}
ää 	
}
ãã 
}åå ˆv
rC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\PersonaServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
PersonaServicio  
:! "
IPersonaServicio# 3
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Persona. 5
>5 6
_personaRepositorio7 J
;J K
private 
readonly 
IMapper  
_mapper! (
;( )
public 
PersonaServicio 
(  
IRepositorioGenerico 3
<3 4
Persona4 ;
>; <
usuarioRepositorio= O
,O P
IMapperQ X
mapperY _
)_ `
{ 	
_personaRepositorio 
=  !
usuarioRepositorio" 4
;4 5
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 

PersonaDTO $
>$ %
Crear& +
(+ ,

PersonaDTO, 6
modelo7 =
)= >
{ 	
try 
{ 
var 
usuarioCreado !
=" #
await$ )
_personaRepositorio* =
.= >
Crear> C
(C D
_mapperD K
.K L
MapL O
<O P
PersonaP W
>W X
(X Y
modeloY _
)_ `
)` a
;a b
if 
( 
usuarioCreado !
.! "
Id" $
==% '
null( ,
), -
throw   
new   
	Exception   '
(  ' (
$str  ( :
)  : ;
;  ; <
return!! 
_mapper!! 
.!! 
Map!! "
<!!" #

PersonaDTO!!# -
>!!- .
(!!. /
usuarioCreado!!/ <
)!!< =
;!!= >
}"" 
catch## 
{$$ 
throw%% 
;%% 
}&& 
}'' 	
public)) 
async)) 
Task)) 
<)) 
bool)) 
>)) 
Editar))  &
())& '

PersonaDTO))' 1
modelo))2 8
)))8 9
{** 	
try++ 
{,, 
var-- 
personaModelo-- !
=--" #
_mapper--$ +
.--+ ,
Map--, /
<--/ 0
Persona--0 7
>--7 8
(--8 9
modelo--9 ?
)--? @
;--@ A
var.. 
personaEncontrado.. %
=..& '
await..( -
_personaRepositorio... A
...A B
Obtener..B I
(..I J
x..J K
=>..L N
x..O P
...P Q
Id..Q S
==..T V
personaModelo..W d
...d e
Id..e g
)..g h
;..h i
if// 
(// 
personaEncontrado// %
==//& (
null//) -
)//- .
throw00 
new00 !
TaskCanceledException00 3
(003 4
$str004 G
)00G H
;00H I
personaEncontrado11 !
.11! "
Nombres11" )
=11* +
personaModelo11, 9
.119 :
Nombres11: A
;11A B
personaEncontrado22 !
.22! "
	Apellidos22" +
=22, -
personaModelo22. ;
.22; <
	Apellidos22< E
;22E F
personaEncontrado33 !
.33! "
FechaNacimiento33" 1
=332 3
personaModelo334 A
.33A B
FechaNacimiento33B Q
;33Q R
personaEncontrado44 !
.44! "
Genero44" (
=44) *
personaModelo44+ 8
.448 9
Genero449 ?
;44? @
personaEncontrado55 !
.55! "
NombreUsuario55" /
=550 1
personaModelo552 ?
.55? @
NombreUsuario55@ M
;55M N
personaEncontrado66 !
.66! "
Contrase√±a66" ,
=66- .
personaModelo66/ <
.66< =
Contrase√±a66= G
;66G H
personaEncontrado77 !
.77! "
Correo77" (
=77) *
personaModelo77+ 8
.778 9
Correo779 ?
;77? @
personaEncontrado88 !
.88! "
Telefono88" *
=88+ ,
personaModelo88- :
.88: ;
Telefono88; C
;88C D
personaEncontrado99 !
.99! "
IdEstado99" *
=99+ ,
personaModelo99- :
.99: ;
IdEstado99; C
;99C D
if:: 
(:: 
!:: 
string:: 
.:: 
IsNullOrEmpty:: )
(::) *
modelo::* 0
.::0 1
FotoPerfilBase64::1 A
)::A B
)::B C
{;; 
modelo<< 
.<< 

FotoPerfil<< %
=<<& '
Convert<<( /
.<</ 0
FromBase64String<<0 @
(<<@ A
modelo<<A G
.<<G H
FotoPerfilBase64<<H X
)<<X Y
;<<Y Z
personaEncontrado== %
.==% &

FotoPerfil==& 0
===1 2
modelo==3 9
.==9 :

FotoPerfil==: D
;==D E
}>> 
bool?? 
	respuesta?? 
=??  
await??! &
_personaRepositorio??' :
.??: ;
Editar??; A
(??A B
personaEncontrado??B S
)??S T
;??T U
if@@ 
(@@ 
!@@ 
	respuesta@@ 
)@@ 
throwAA 
newAA !
TaskCanceledExceptionAA 3
(AA3 4
$strAA4 G
)AAG H
;AAH I
returnBB 
	respuestaBB  
;BB  !
}CC 
catchDD 
{EE 
throwFF 
;FF 
}GG 
}HH 	
publicJJ 
asyncJJ 
TaskJJ 
<JJ 
boolJJ 
>JJ 
EliminarJJ  (
(JJ( )
stringJJ) /
idJJ0 2
)JJ2 3
{KK 	
tryLL 
{MM 
varNN 
personaEncontradaNN %
=NN& '
awaitNN( -
_personaRepositorioNN. A
.NNA B
ObtenerNNB I
(NNI J
xNNJ K
=>NNL N
xNNO P
.NNP Q
IdNNQ S
==NNT V
idNNW Y
)NNY Z
;NNZ [
ifOO 
(OO 
personaEncontradaOO %
==OO& (
nullOO) -
)OO- .
throwPP 
newPP !
TaskCanceledExceptionPP 3
(PP3 4
$strPP4 G
)PPG H
;PPH I
boolQQ 
	respuestaQQ 
=QQ  
awaitQQ! &
_personaRepositorioQQ' :
.QQ: ;
EliminarQQ; C
(QQC D
personaEncontradaQQD U
)QQU V
;QQV W
ifRR 
(RR 
!RR 
	respuestaRR 
)RR 
throwSS 
newSS !
TaskCanceledExceptionSS 3
(SS3 4
$strSS4 I
)SSI J
;SSJ K
returnTT 
	respuestaTT  
;TT  !
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
List\\ 
<\\ 

PersonaDTO\\ )
>\\) *
>\\* +
Listar\\, 2
(\\2 3
)\\3 4
{]] 	
try^^ 
{__ 
var`` 
queryUsuario``  
=``! "
await``# (
_personaRepositorio``) <
.``< =
	Consultar``= F
(``F G
)``G H
;``H I
varaa 
listaUsuarioaa  
=aa! "
queryUsuarioaa# /
.aa/ 0
ToListaa0 6
(aa6 7
)aa7 8
;aa8 9
returncc 
_mappercc 
.cc 
Mapcc "
<cc" #
Listcc# '
<cc' (

PersonaDTOcc( 2
>cc2 3
>cc3 4
(cc4 5
listaUsuariocc5 A
)ccA B
;ccB C
}dd 
catchee 
{ff 
throwgg 
;gg 
}hh 
}ii 	
publicll 
asyncll 
Taskll 
<ll 
	SesionDTOll #
>ll# $
ValidarCredencialesll% 8
(ll8 9
stringll9 ?
correoll@ F
,llF G
stringllH N
?llN O
telefonollP X
,llX Y
stringllZ `
contrase√±alla k
)llk l
{mm 	
trynn 
{oo 
varpp 
queryPersonapp  
=pp! "
awaitpp# (
_personaRepositoriopp) <
.pp< =
	Consultarpp= F
(ppF G
xppG H
=>ppI K
(qq 
xqq 
.qq 
Correoqq 
==qq  
correoqq! '
&&qq( *
xqq+ ,
.qq, -
Contrase√±aqq- 7
==qq8 :
contrase√±aqq; E
)qqE F
||qqG I
(rr 
xrr 
.rr 
Telefonorr 
==rr  "
telefonorr# +
&&rr, .
xrr/ 0
.rr0 1
Contrase√±arr1 ;
==rr< >
contrase√±arr? I
)rrI J
)ss 
;ss 
varuu 
personaEncontradauu %
=uu& '
queryPersonauu( 4
.uu4 5
FirstOrDefaultuu5 C
(uuC D
)uuD E
;uuE F
ifww 
(ww 
personaEncontradaww %
==ww& (
nullww) -
)ww- .
throwxx 
newxx !
TaskCanceledExceptionxx 3
(xx3 4
$strxx4 K
)xxK L
;xxL M
returnzz 
_mapperzz 
.zz 
Mapzz "
<zz" #
	SesionDTOzz# ,
>zz, -
(zz- .
personaEncontradazz. ?
)zz? @
;zz@ A
}{{ 
catch|| 
{}} 
throw~~ 
;~~ 
} 
}
ÄÄ 	
public
ÇÇ 
async
ÇÇ 
Task
ÇÇ 
<
ÇÇ 

PersonaDTO
ÇÇ $
>
ÇÇ$ %
Obtener
ÇÇ& -
(
ÇÇ- .
string
ÇÇ. 4
id
ÇÇ5 7
)
ÇÇ7 8
{
ÉÉ 	
try
ÑÑ 
{
ÖÖ 
var
ÜÜ 
personaEncontrada
ÜÜ %
=
ÜÜ& '
await
ÜÜ( -!
_personaRepositorio
ÜÜ. A
.
ÜÜA B
Obtener
ÜÜB I
(
ÜÜI J
x
ÜÜJ K
=>
ÜÜL N
x
ÜÜO P
.
ÜÜP Q
Id
ÜÜQ S
==
ÜÜT V
id
ÜÜW Y
)
ÜÜY Z
;
ÜÜZ [
if
áá 
(
áá 
personaEncontrada
áá %
==
áá& (
null
áá) -
)
áá- .
throw
àà 
new
àà #
TaskCanceledException
àà 3
(
àà3 4
$str
àà4 G
)
ààG H
;
ààH I
return
ââ 
_mapper
ââ 
.
ââ 
Map
ââ "
<
ââ" #

PersonaDTO
ââ# -
>
ââ- .
(
ââ. /
personaEncontrada
ââ/ @
)
ââ@ A
;
ââA B
}
ää 
catch
ãã 
{
åå 
throw
çç 
;
çç 
}
éé 
}
èè 	
public
ëë 
async
ëë 
Task
ëë 
<
ëë 

PersonaDTO
ëë $
>
ëë$ %
ObtenerPorUsuario
ëë& 7
(
ëë7 8
string
ëë8 >
usuario
ëë? F
)
ëëF G
{
íí 	
try
ìì 
{
îî 
var
ïï 
personaEncontrada
ïï %
=
ïï& '
await
ïï( -!
_personaRepositorio
ïï. A
.
ïïA B
Obtener
ïïB I
(
ïïI J
x
ïïJ K
=>
ïïL N
x
ïïO P
.
ïïP Q
NombreUsuario
ïïQ ^
==
ïï_ a
usuario
ïïb i
)
ïïi j
;
ïïj k
return
ññ 
_mapper
ññ 
.
ññ 
Map
ññ "
<
ññ" #

PersonaDTO
ññ# -
>
ññ- .
(
ññ. /
personaEncontrada
ññ/ @
)
ññ@ A
;
ññA B
}
óó 
catch
òò 
{
ôô 
throw
öö 
;
öö 
}
õõ 
}
úú 	
public
ûû 
async
ûû 
Task
ûû 
<
ûû 
string
ûû  
>
ûû  !#
ObtenerIdNuevoUsuario
ûû" 7
(
ûû7 8
)
ûû8 9
{
üü 	
try
†† 
{
°° 
var
¢¢ 
personas
¢¢ 
=
¢¢ 
await
¢¢ $!
_personaRepositorio
¢¢% 8
.
¢¢8 9
	Consultar
¢¢9 B
(
¢¢B C
)
¢¢C D
;
¢¢D E
var
££ 
listaIds
££ 
=
££ 
personas
££ '
.
§§ 
ToList
§§ 
(
§§ 
)
§§ 
.
•• 
Select
•• 
(
•• 
p
•• 
=>
••  
p
••! "
.
••" #
Id
••# %
)
••% &
.
¶¶ 
Where
¶¶ 
(
¶¶ 
id
¶¶ 
=>
¶¶  
!
¶¶! "
string
¶¶" (
.
¶¶( )
IsNullOrEmpty
¶¶) 6
(
¶¶6 7
id
¶¶7 9
)
¶¶9 :
&&
¶¶; =
id
¶¶> @
.
¶¶@ A

StartsWith
¶¶A K
(
¶¶K L
$str
¶¶L O
)
¶¶O P
)
¶¶P Q
.
ßß 
Select
ßß 
(
ßß 
id
ßß 
=>
ßß !
{
®® 
var
©© 
	numeroStr
©© %
=
©©& '
id
©©( *
.
©©* +
	Substring
©©+ 4
(
©©4 5
$num
©©5 6
)
©©6 7
;
©©7 8
return
™™ 
int
™™ "
.
™™" #
TryParse
™™# +
(
™™+ ,
	numeroStr
™™, 5
,
™™5 6
out
™™7 :
int
™™; >
numero
™™? E
)
™™E F
?
™™G H
numero
™™I O
:
™™P Q
$num
™™R S
;
™™S T
}
´´ 
)
´´ 
.
¨¨ 
ToList
¨¨ 
(
¨¨ 
)
¨¨ 
;
¨¨ 
int
ÆÆ 
	maxNumero
ÆÆ 
=
ÆÆ 
listaIds
ÆÆ  (
.
ÆÆ( )
Any
ÆÆ) ,
(
ÆÆ, -
)
ÆÆ- .
?
ÆÆ/ 0
listaIds
ÆÆ1 9
.
ÆÆ9 :
Max
ÆÆ: =
(
ÆÆ= >
)
ÆÆ> ?
:
ÆÆ@ A
$num
ÆÆB C
;
ÆÆC D
int
ØØ 
nuevoNumero
ØØ 
=
ØØ  !
	maxNumero
ØØ" +
+
ØØ, -
$num
ØØ. /
;
ØØ/ 0
return
±± 
$"
±± 
$str
±± 
{
±± 
nuevoNumero
±± &
.
±±& '
ToString
±±' /
(
±±/ 0
$str
±±0 4
)
±±4 5
}
±±5 6
"
±±6 7
;
±±7 8
}
≤≤ 
catch
≥≥ 
{
¥¥ 
throw
µµ 
;
µµ 
}
∂∂ 
}
∑∑ 	
}
ππ 
}∫∫ ∑1
wC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\NotificacionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class  
NotificacionServicio %
:& '!
INotificacionServicio( =
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Notificaciones. <
>< =&
_notificacionesRepositorio> X
;X Y
private 
readonly 
IMapper  
_mapper! (
;( )
public  
NotificacionServicio #
(# $ 
IRepositorioGenerico$ 8
<8 9
Notificaciones9 G
>G H%
notificacionesRepositorioI b
,b c
IMapperd k
mapperl r
)r s
{ 	&
_notificacionesRepositorio &
=' (%
notificacionesRepositorio) B
;B C
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
bool 
> 
CambiarEstado  -
(- .
bool. 2
estado3 9
,9 :
NotificacionesDTO; L
notificacionM Y
)Y Z
{ 	
try 
{ 
var 
notifiacionModelo %
=& '
_mapper( /
./ 0
Map0 3
<3 4
NotificacionesDTO4 E
>E F
(F G
notificacionG S
)S T
;T U
var "
notificacionEncontrado *
=+ ,
await- 2&
_notificacionesRepositorio3 M
.M N
ObtenerN U
(U V
xV W
=>X Z
x[ \
.\ ]
Id] _
==` b
notificacionc o
.o p
Idp r
)r s
;s t
if 
( "
notificacionEncontrado *
==+ -
null. 2
)2 3
throw 
new !
TaskCanceledException 3
(3 4
$str4 O
)O P
;P Q"
notificacionEncontrado   &
.  & '
Estado  ' -
=  . /
notifiacionModelo  0 A
.  A B
Estado  B H
;  H I
bool!! 
	respuesta!! 
=!!  
await!!! &&
_notificacionesRepositorio!!' A
.!!A B
Editar!!B H
(!!H I"
notificacionEncontrado!!I _
)!!_ `
;!!` a
if"" 
("" 
!"" 
	respuesta"" 
)"" 
throw## 
new## !
TaskCanceledException## 3
(##3 4
$str##4 G
)##G H
;##H I
return$$ 
	respuesta$$  
;$$  !
}%% 
catch&& 
{'' 
throw(( 
;(( 
})) 
}** 	
public,, 
async,, 
Task,, 
<,, 
NotificacionesDTO,, +
>,,+ ,
Crear,,- 2
(,,2 3
NotificacionesDTO,,3 D
modelo,,E K
),,K L
{-- 	
try.. 
{// 
var00 
notificacionCreada00 &
=00' (
await00) .&
_notificacionesRepositorio00/ I
.00I J
Crear00J O
(00O P
_mapper00P W
.00W X
Map00X [
<00[ \
Notificaciones00\ j
>00j k
(00k l
modelo00l r
)00r s
)00s t
;00t u
if11 
(11 
notificacionCreada11 &
.11& '
Id11' )
==11* ,
null11- 1
)111 2
throw22 
new22 
	Exception22 '
(22' (
$str22( :
)22: ;
;22; <
return33 
_mapper33 
.33 
Map33 "
<33" #
NotificacionesDTO33# 4
>334 5
(335 6
notificacionCreada336 H
)33H I
;33I J
}44 
catch55 
{66 
throw77 
;77 
}88 
}99 	
public:: 
async:: 
Task:: 
<:: 
List:: 
<:: 
NotificacionesDTO:: 0
>::0 1
>::1 2
ListarPorIdUsuario::3 E
(::E F
string::F L
	idUsuario::M V
)::V W
{;; 	
try<< 
{== 
var>> 
listaNotificaciones>> '
=>>( )
await>>* /&
_notificacionesRepositorio>>0 J
.>>J K
	Consultar>>K T
(>>T U
)>>U V
;>>V W
if?? 
(?? 
listaNotificaciones?? '
==??( *
null??+ /
||??0 2
!??3 4
listaNotificaciones??4 G
.??G H
Any??H K
(??K L
)??L M
)??M N
throw@@ 
new@@ 
	Exception@@ '
(@@' (
$str@@( @
)@@@ A
;@@A B
varAA #
notificacionesFiltradasAA +
=AA, -
listaNotificacionesAA. A
.AAA B
WhereAAB G
(AAG H
xAAH I
=>AAJ L
xAAM N
.AAN O
	IdPersonaAAO X
==AAY [
	idUsuarioAA\ e
)AAe f
.AAf g
ToListAAg m
(AAm n
)AAn o
;AAo p
ifBB 
(BB #
notificacionesFiltradasBB +
==BB, .
nullBB/ 3
||BB4 6
!BB7 8#
notificacionesFiltradasBB8 O
.BBO P
AnyBBP S
(BBS T
)BBT U
)BBU V
throwCC 
newCC 
	ExceptionCC '
(CC' (
$strCC( ]
)CC] ^
;CC^ _
returnDD 
_mapperDD 
.DD 
MapDD "
<DD" #
ListDD# '
<DD' (
NotificacionesDTODD( 9
>DD9 :
>DD: ;
(DD; <#
notificacionesFiltradasDD< S
)DDS T
;DDT U
}EE 
catchFF 
{GG 
throwHH 
;HH 
}II 
}JJ 	
}KK 
}LL Ê:
xC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\MotivoReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class !
MotivoReporteServicio &
:' ("
IMotivoReporteServicio) ?
{ 
private 
readonly  
IRepositorioGenerico -
<- .
MotivosReporte. <
>< =%
_MotivoReporteRepositorio> W
;W X
private 
readonly 
IMapper  
_mapper! (
;( )
public !
MotivoReporteServicio $
($ % 
IRepositorioGenerico% 9
<9 :
MotivosReporte: H
>H I$
motivoReporteRepositorioJ b
,b c
IMapperd k
mapperl r
)r s
{ 	%
_MotivoReporteRepositorio %
=& '$
motivoReporteRepositorio( @
;@ A
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
MotivosReporteDTO +
>+ ,
Crear- 2
(2 3
MotivosReporteDTO3 D
modeloE K
)K L
{ 	
try 
{ 
var 
motivoReporteCreado '
=( )
await* /%
_MotivoReporteRepositorio0 I
.I J
CrearJ O
(O P
_mapperP W
.W X
MapX [
<[ \
MotivosReporte\ j
>j k
(k l
modelol r
)r s
)s t
;t u
if 
( 
motivoReporteCreado '
.' (
Id( *
==+ -
null. 2
)2 3
throw 
new 
	Exception '
(' (
$str( :
): ;
;; <
return 
_mapper 
. 
Map "
<" #
MotivosReporteDTO# 4
>4 5
(5 6
motivoReporteCreado6 I
)I J
;J K
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 
bool'' 
>'' 
Editar''  &
(''& '
MotivosReporteDTO''' 8
modelo''9 ?
)''? @
{(( 	
try)) 
{** 
var++ 
motivoReporteModelo++ '
=++( )
_mapper++* 1
.++1 2
Map++2 5
<++5 6
MotivosReporte++6 D
>++D E
(++E F
modelo++F L
)++L M
;++M N
var,, #
motivoReporteEncontrado,, +
=,,, -
await,,. 3%
_MotivoReporteRepositorio,,4 M
.,,M N
Obtener,,N U
(,,U V
x,,V W
=>,,X Z
x,,[ \
.,,\ ]
Id,,] _
==,,` b
modelo,,c i
.,,i j
Id,,j l
),,l m
;,,m n
if-- 
(-- #
motivoReporteEncontrado-- +
==--, .
null--/ 3
)--3 4
throw.. 
new.. !
TaskCanceledException.. 3
(..3 4
$str..4 I
)..I J
;..J K#
motivoReporteEncontrado// '
.//' (
Nombre//( .
=/// 0
motivoReporteModelo//1 D
.//D E
Nombre//E K
;//K L
bool00 
	respuesta00 
=00  
await00! &%
_MotivoReporteRepositorio00' @
.00@ A
Editar00A G
(00G H#
motivoReporteEncontrado00H _
)00_ `
;00` a
if11 
(11 
!11 
	respuesta11 
)11 
throw22 
new22 !
TaskCanceledException22 3
(223 4
$str224 G
)22G H
;22H I
return33 
	respuesta33  
;33  !
}44 
catch55 
{66 
throw77 
;77 
}88 
}99 	
public;; 
async;; 
Task;; 
<;; 
MotivosReporteDTO;; +
>;;+ ,
Buscar;;- 3
(;;3 4
string;;4 :
id;;; =
);;= >
{<< 	
try>> 
{?? 
var@@ 
queryRol@@ 
=@@ 
await@@ $%
_MotivoReporteRepositorio@@% >
.@@> ?
Obtener@@? F
(@@F G
x@@G H
=>@@I K
x@@L M
.@@M N
Id@@N P
==@@Q S
id@@T V
)@@V W
;@@W X
returnBB 
_mapperBB 
.BB 
MapBB "
<BB" #
MotivosReporteDTOBB# 4
>BB4 5
(BB5 6
queryRolBB6 >
)BB> ?
;BB? @
}CC 
catchDD 
{EE 
throwFF 
;FF 
}GG 
}HH 	
publicJJ 
asyncJJ 
TaskJJ 
<JJ 
boolJJ 
>JJ 
EliminarJJ  (
(JJ( )
stringJJ) /
idJJ0 2
)JJ2 3
{KK 	
tryLL 
{MM 
varNN #
motivoReporteEncontradoNN +
=NN, -
awaitNN. 3%
_MotivoReporteRepositorioNN4 M
.NNM N
ObtenerNNN U
(NNU V
xNNV W
=>NNX Z
xNN[ \
.NN\ ]
IdNN] _
==NN` b
idNNc e
)NNe f
;NNf g
ifOO 
(OO #
motivoReporteEncontradoOO +
==OO, .
nullOO/ 3
)OO3 4
throwPP 
newPP !
TaskCanceledExceptionPP 3
(PP3 4
$strPP4 T
)PPT U
;PPU V
boolQQ 
	respuestaQQ 
=QQ  
awaitQQ! &%
_MotivoReporteRepositorioQQ' @
.QQ@ A
EliminarQQA I
(QQI J#
motivoReporteEncontradoQQJ a
)QQa b
;QQb c
ifRR 
(RR 
!RR 
	respuestaRR 
)RR 
throwSS 
newSS !
TaskCanceledExceptionSS 3
(SS3 4
$strSS4 I
)SSI J
;SSJ K
returnTT 
	respuestaTT  
;TT  !
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
List\\ 
<\\ 
MotivosReporteDTO\\ 0
>\\0 1
>\\1 2
Listar\\3 9
(\\9 :
)\\: ;
{]] 	
try^^ 
{__ 
var`` 
queryRol`` 
=`` 
await`` $%
_MotivoReporteRepositorio``% >
.``> ?
	Consultar``? H
(``H I
)``I J
;``J K
varaa 
listaRolaa 
=aa 
queryRolaa '
.aa' (
ToListaa( .
(aa. /
)aa/ 0
;aa0 1
returncc 
_mappercc 
.cc 
Mapcc "
<cc" #
Listcc# '
<cc' (
MotivosReporteDTOcc( 9
>cc9 :
>cc: ;
(cc; <
listaRolcc< D
)ccD E
;ccE F
}dd 
catchee 
{ff 
throwgg 
;gg 
}hh 
}ii 	
}jj 
}kk ØX
sC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\MensajesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
MensajesServicio !
:" #
IMensajesServicio$ 5
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Mensajes. 6
>6 7 
_mensajesRepositorio8 L
;L M
private 
readonly 
IMapper  
_mapper! (
;( )
public 
MensajesServicio 
(   
IRepositorioGenerico  4
<4 5
Mensajes5 =
>= >
mensajesRepositorio? R
,R S
IMapperT [
mapper\ b
)b c
{ 	 
_mensajesRepositorio  
=! "
mensajesRepositorio# 6
;6 7
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
MensajesDTO %
>% &
Buscar' -
(- .
string. 4
id5 7
)7 8
{ 	
try 
{ 
var 
mensajeEncontrado %
=& '
await( - 
_mensajesRepositorio. B
.B C
ObtenerC J
(J K
xK L
=>M O
xP Q
.Q R
IdR T
==U W
idX Z
)Z [
;[ \
if 
( 
mensajeEncontrado %
==& (
null) -
)- .
throw 
new !
TaskCanceledException 3
(3 4
$str4 J
)J K
;K L
return   
_mapper   
.   
Map   "
<  " #
MensajesDTO  # .
>  . /
(  / 0
mensajeEncontrado  0 A
)  A B
;  B C
}!! 
catch"" 
{## 
throw$$ 
;$$ 
}%% 
}&& 	
public(( 
async(( 
Task(( 
<(( 
MensajesDTO(( %
>((% &
Crear((' ,
(((, -
CrearMensajeDTO((- <
modelo((= C
)((C D
{)) 	
var** 
mensaje** 
=** 
_mapper** !
.**! "
Map**" %
<**% &
Mensajes**& .
>**. /
(**/ 0
modelo**0 6
)**6 7
;**7 8
mensaje++ 
.++ 
Hora++ 
=++ 
DateTime++ #
.++# $
Now++$ '
;++' (
mensaje,, 
.,, 
Id,, 
=,, 
await,, 
	GenerarId,, (
(,,( )
),,) *
;,,* +
var-- 
mensajeCreado-- 
=-- 
await--  % 
_mensajesRepositorio--& :
.--: ;
Crear--; @
(--@ A
mensaje--A H
)--H I
;--I J
if.. 
(.. 
mensajeCreado.. 
==..  
null..! %
)..% &
throw// 
new// !
TaskCanceledException// /
(/// 0
$str//0 M
)//M N
;//N O
return00 
_mapper00 
.00 
Map00 
<00 
MensajesDTO00 *
>00* +
(00+ ,
mensajeCreado00, 9
)009 :
;00: ;
}11 	
public33 
async33 
Task33 
<33 
bool33 
>33 
Eliminar33  (
(33( )
string33) /
id330 2
)332 3
{44 	
try55 
{66 
var77 
mensajeEncontrado77 %
=77& '
await77( - 
_mensajesRepositorio77. B
.77B C
Obtener77C J
(77J K
x77K L
=>77M O
x77P Q
.77Q R
Id77R T
==77U W
id77X Z
)77Z [
;77[ \
if88 
(88 
mensajeEncontrado88 %
==88& (
null88) -
)88- .
throw99 
new99 !
TaskCanceledException99 3
(993 4
$str994 J
)99J K
;99K L
bool:: 
	respuesta:: 
=::  
await::! & 
_mensajesRepositorio::' ;
.::; <
Eliminar::< D
(::D E
mensajeEncontrado::E V
)::V W
;::W X
if;; 
(;; 
!;; 
	respuesta;; 
);; 
throw<< 
new<< !
TaskCanceledException<< 3
(<<3 4
$str<<4 I
)<<I J
;<<J K
return== 
	respuesta==  
;==  !
}>> 
catch?? 
{@@ 
throwAA 
;AA 
}BB 
}CC 	
publicEE 
asyncEE 
TaskEE 
<EE 
stringEE  
>EE  !
	GenerarIdEE" +
(EE+ ,
)EE, -
{FF 	
varGG 
mensajesGG 
=GG 
awaitGG   
_mensajesRepositorioGG! 5
.GG5 6
	ConsultarGG6 ?
(GG? @
)GG@ A
;GGA B
varII 
numerosExistentesII !
=II" #
mensajesII$ ,
.JJ 
WhereJJ 
(JJ 
mJJ 
=>JJ 
mJJ 
.JJ 
IdJJ  
!=JJ! #
nullJJ$ (
&&JJ) +
mJJ, -
.JJ- .
IdJJ. 0
.JJ0 1

StartsWithJJ1 ;
(JJ; <
$strJJ< A
)JJA B
)JJB C
.KK 
AsEnumerableKK 
(KK 
)KK 
.LL 
SelectLL 
(LL 
mLL 
=>LL 
{LL 
varMM 
parteNumeroMM #
=MM$ %
mMM& '
.MM' (
IdMM( *
.MM* +
	SubstringMM+ 4
(MM4 5
$numMM5 6
)MM6 7
;MM7 8
ifNN 
(NN 
intNN 
.NN 
TryParseNN $
(NN$ %
parteNumeroNN% 0
,NN0 1
outNN2 5
intNN6 9
numeroNN: @
)NN@ A
)NNA B
returnOO 
numeroOO %
;OO% &
returnPP 
$numPP 
;PP 
}QQ 
)QQ 
;QQ 
intSS 
	maxNumeroSS 
=SS 
numerosExistentesSS -
.SS- .
AnySS. 1
(SS1 2
)SS2 3
?SS4 5
numerosExistentesSS6 G
.SSG H
MaxSSH K
(SSK L
)SSL M
:SSN O
$numSSP Q
;SSQ R
intTT 
nuevoNumeroTT 
=TT 
	maxNumeroTT '
+TT( )
$numTT* +
;TT+ ,
stringUU 
nuevoIdUU 
=UU 
$"UU 
$strUU "
{UU" #
nuevoNumeroUU# .
.UU. /
ToStringUU/ 7
(UU7 8
$strUU8 <
)UU< =
}UU= >
"UU> ?
;UU? @
returnWW 
nuevoIdWW 
;WW 
}XX 	
public[[ 
async[[ 
Task[[ 
<[[ 
List[[ 
<[[ 
MensajesDTO[[ *
>[[* +
>[[+ ,
Listar[[- 3
([[3 4
)[[4 5
{\\ 	
try]] 
{^^ 
var__ 
mensajes__ 
=__ 
await__ $ 
_mensajesRepositorio__% 9
.__9 :
	Consultar__: C
(__C D
)__D E
;__E F
if`` 
(`` 
mensajes`` 
==`` 
null``  $
)``$ %
throwaa 
newaa !
TaskCanceledExceptionaa 3
(aa3 4
$straa4 P
)aaP Q
;aaQ R
returnbb 
_mapperbb 
.bb 
Mapbb "
<bb" #
Listbb# '
<bb' (
MensajesDTObb( 3
>bb3 4
>bb4 5
(bb5 6
mensajesbb6 >
)bb> ?
;bb? @
}cc 
catchdd 
{ee 
throwff 
;ff 
}gg 
}hh 	
publicjj 
asyncjj 
Taskjj 
<jj 
Listjj 
<jj 
MensajesDTOjj *
>jj* +
>jj+ ,
ListarPorIdChatjj- <
(jj< =
stringjj= C
idChatjjD J
)jjJ K
{kk 	
tryll 
{mm 
varnn 
mensajesnn 
=nn 
awaitnn $ 
_mensajesRepositorionn% 9
.nn9 :
	Consultarnn: C
(nnC D
xnnD E
=>nnF H
xnnI J
.nnJ K
ChatIdnnK Q
==nnR T
idChatnnU [
)nn[ \
;nn\ ]
ifoo 
(oo 
mensajesoo 
==oo 
nulloo  $
||oo% '
!oo( )
mensajesoo) 1
.oo1 2
Anyoo2 5
(oo5 6
)oo6 7
)oo7 8
throwpp 
newpp !
TaskCanceledExceptionpp 3
(pp3 4
$strpp4 j
)ppj k
;ppk l
returnqq 
_mapperqq 
.qq 
Mapqq "
<qq" #
Listqq# '
<qq' (
MensajesDTOqq( 3
>qq3 4
>qq4 5
(qq5 6
mensajesqq6 >
)qq> ?
;qq? @
}rr 
catchss 
{tt 
throwuu 
;uu 
}vv 
}ww 	
publicyy 
asyncyy 
Taskyy 
<yy 
MensajesDTOyy %
>yy% &%
ObtenerMensajeMasRecienteyy' @
(yy@ A
stringyyA G
idChatyyH N
)yyN O
{zz 	
try{{ 
{|| 
var}} 
mensajes}} 
=}} 
await}} $ 
_mensajesRepositorio}}% 9
.}}9 :
	Consultar}}: C
(}}C D
x}}D E
=>}}F H
x}}I J
.}}J K
ChatId}}K Q
==}}R T
idChat}}U [
)}}[ \
;}}\ ]
if~~ 
(~~ 
mensajes~~ 
==~~ 
null~~  $
||~~% '
!~~( )
mensajes~~) 1
.~~1 2
Any~~2 5
(~~5 6
)~~6 7
)~~7 8
throw 
new !
TaskCanceledException 3
(3 4
$str4 j
)j k
;k l
var
ÄÄ  
mensajeMasReciente
ÄÄ &
=
ÄÄ' (
mensajes
ÄÄ) 1
.
ÄÄ1 2
OrderByDescending
ÄÄ2 C
(
ÄÄC D
x
ÄÄD E
=>
ÄÄF H
x
ÄÄI J
.
ÄÄJ K
Hora
ÄÄK O
)
ÄÄO P
.
ÄÄP Q
FirstOrDefault
ÄÄQ _
(
ÄÄ_ `
)
ÄÄ` a
;
ÄÄa b
return
ÅÅ 
_mapper
ÅÅ 
.
ÅÅ 
Map
ÅÅ "
<
ÅÅ" #
MensajesDTO
ÅÅ# .
>
ÅÅ. /
(
ÅÅ/ 0 
mensajeMasReciente
ÅÅ0 B
)
ÅÅB C
;
ÅÅC D
}
ÇÇ 
catch
ÉÉ 
{
ÑÑ 
throw
ÖÖ 
;
ÖÖ 
}
ÜÜ 
}
áá 	
}
ââ 
}ää †;
xC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\MensajeAccionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class !
MensajeAccionServicio &
:' ("
IMensajeAccionServicio) ?
{ 
private 
readonly  
IRepositorioGenerico -
<- .
MensajeAccion. ;
>; <%
_mensajeAccionRepositorio= V
;V W
private 
readonly 
IMapper  
_mapper! (
;( )
public !
MensajeAccionServicio $
($ % 
IRepositorioGenerico% 9
<9 :
MensajeAccion: G
>G H$
mensajeAccionRepositorioI a
,a b
IMapperc j
mapperk q
)q r
{ 	%
_mensajeAccionRepositorio %
=& '$
mensajeAccionRepositorio( @
;@ A
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
MensajeAccionDTO *
>* +
Buscar, 2
(2 3
string3 9
id: <
)< =
{ 	
try 
{ 
var 
queryMensajeAccion &
=' (
await) .%
_mensajeAccionRepositorio/ H
.H I
ObtenerI P
(P Q
xQ R
=>S U
xV W
.W X
IdX Z
==[ ]
id^ `
)` a
;a b
return 
_mapper 
. 
Map "
<" #
MensajeAccionDTO# 3
>3 4
(4 5
queryMensajeAccion5 G
)G H
;H I
} 
catch   
{!! 
throw"" 
;"" 
}## 
}$$ 	
public&& 
async&& 
Task&& 
<&& 
MensajeAccionDTO&& *
>&&* +
Crear&&, 1
(&&1 2
MensajeAccionDTO&&2 B
modelo&&C I
)&&I J
{'' 	
try(( 
{)) 
var** 
mensajeAccionCreada** '
=**( )
await*** /%
_mensajeAccionRepositorio**0 I
.**I J
Crear**J O
(**O P
_mapper**P W
.**W X
Map**X [
<**[ \
MensajeAccion**\ i
>**i j
(**j k
modelo**k q
)**q r
)**r s
;**s t
if++ 
(++ 
mensajeAccionCreada++ '
.++' (
Id++( *
==+++ -
null++. 2
)++2 3
throw,, 
new,, 
	Exception,, '
(,,' (
$str,,( :
),,: ;
;,,; <
return-- 
_mapper-- 
.-- 
Map-- "
<--" #
MensajeAccionDTO--# 3
>--3 4
(--4 5
mensajeAccionCreada--5 H
)--H I
;--I J
}.. 
catch// 
{00 
throw11 
;11 
}22 
}33 	
public55 
async55 
Task55 
<55 
bool55 
>55 
Editar55  &
(55& '
MensajeAccionDTO55' 7
modelo558 >
)55> ?
{66 	
try77 
{88 
var99 
mensajeAccionModelo99 '
=99( )
_mapper99* 1
.991 2
Map992 5
<995 6
MensajeAccion996 C
>99C D
(99D E
modelo99E K
)99K L
;99L M
var:: #
mensajeAccionEncontrado:: +
=::, -
await::. 3%
_mensajeAccionRepositorio::4 M
.::M N
Obtener::N U
(::U V
x::V W
=>::X Z
x::[ \
.::\ ]
Id::] _
==::` b
modelo::c i
.::i j
Id::j l
)::l m
;::m n
if;; 
(;; #
mensajeAccionEncontrado;; +
==;;, .
null;;/ 3
);;3 4
throw<< 
new<< !
TaskCanceledException<< 3
(<<3 4
$str<<4 Q
)<<Q R
;<<R S#
mensajeAccionEncontrado== '
.==' (
Descripcion==( 3
===4 5
mensajeAccionModelo==6 I
.==I J
Descripcion==J U
;==U V
bool>> 
	respuesta>> 
=>>  
await>>! &%
_mensajeAccionRepositorio>>' @
.>>@ A
Editar>>A G
(>>G H#
mensajeAccionEncontrado>>H _
)>>_ `
;>>` a
if?? 
(?? 
!?? 
	respuesta?? 
)?? 
throw@@ 
new@@ !
TaskCanceledException@@ 3
(@@3 4
$str@@4 G
)@@G H
;@@H I
returnAA 
	respuestaAA  
;AA  !
}BB 
catchCC 
{DD 
throwEE 
;EE 
}FF 
}GG 	
publicII 
asyncII 
TaskII 
<II 
boolII 
>II 
EliminarII  (
(II( )
stringII) /
idII0 2
)II2 3
{JJ 	
tryKK 
{LL 
varMM #
mensajeAccionEncontradoMM +
=MM, -
awaitMM. 3%
_mensajeAccionRepositorioMM4 M
.MMM N
ObtenerMMN U
(MMU V
xMMV W
=>MMX Z
xMM[ \
.MM\ ]
IdMM] _
==MM` b
idMMc e
)MMe f
;MMf g
ifNN 
(NN #
mensajeAccionEncontradoNN +
==NN, .
nullNN/ 3
)NN3 4
throwOO 
newOO !
TaskCanceledExceptionOO 3
(OO3 4
$strOO4 Q
)OOQ R
;OOR S
boolPP 
	respuestaPP 
=PP  
awaitPP! &%
_mensajeAccionRepositorioPP' @
.PP@ A
EliminarPPA I
(PPI J#
mensajeAccionEncontradoPPJ a
)PPa b
;PPb c
ifQQ 
(QQ 
!QQ 
	respuestaQQ 
)QQ 
throwRR 
newRR !
TaskCanceledExceptionRR 3
(RR3 4
$strRR4 I
)RRI J
;RRJ K
returnSS 
	respuestaSS  
;SS  !
}TT 
catchUU 
{VV 
throwWW 
;WW 
}XX 
}YY 	
public[[ 
async[[ 
Task[[ 
<[[ 
List[[ 
<[[ 
MensajeAccionDTO[[ /
>[[/ 0
>[[0 1
Listar[[2 8
([[8 9
)[[9 :
{\\ 	
try]] 
{^^ 
var__ 
queryMensajeAccion__ &
=__' (
await__) .%
_mensajeAccionRepositorio__/ H
.__H I
	Consultar__I R
(__R S
)__S T
;__T U
var`` 
listaMensajeAccion`` &
=``' (
queryMensajeAccion``) ;
.``; <
ToList``< B
(``B C
)``C D
;``D E
returnbb 
_mapperbb 
.bb 
Mapbb "
<bb" #
Listbb# '
<bb' (
MensajeAccionDTObb( 8
>bb8 9
>bb9 :
(bb: ;
listaMensajeAccionbb; M
)bbM N
;bbN O
}cc 
catchdd 
{ee 
throwff 
;ff 
}gg 
}hh 	
}ii 
}jj €J
pC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\LikesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
LikesServicio 
:  
ILikesServicio! /
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Likes. 3
>3 4
_likesRepositorio5 F
;F G
private 
readonly 
IMapper  
_mapper! (
;( )
public 
LikesServicio 
(  
IRepositorioGenerico 1
<1 2
Likes2 7
>7 8
likesRepositorio9 I
,I J
IMapperK R
mapperS Y
)Y Z
{ 	
_likesRepositorio 
= 
likesRepositorio  0
;0 1
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
LikesDTO "
>" #
Crear$ )
() *
LikesDTO* 2
modelo3 9
)9 :
{ 	
try 
{ 
modelo 
. 
Id 
= 
await !
	GenerarId" +
(+ ,
), -
;- .
var 

likeCreado 
=  
await! &
_likesRepositorio' 8
.8 9
Crear9 >
(> ?
_mapper? F
.F G
MapG J
<J K
LikesK P
>P Q
(Q R
modeloR X
)X Y
)Y Z
;Z [
if 
( 

likeCreado 
. 
Id !
==" $
null% )
)) *
throw 
new 
	Exception '
(' (
$str( :
): ;
;; <
return   
_mapper   
.   
Map   "
<  " #
LikesDTO  # +
>  + ,
(  , -

likeCreado  - 7
)  7 8
;  8 9
}!! 
catch"" 
{## 
throw$$ 
;$$ 
}%% 
}&& 	
public(( 
async(( 
Task(( 
<(( 
bool(( 
>(( 
Eliminar((  (
(((( )
string(() /
id((0 2
)((2 3
{)) 	
try** 
{++ 
var,, 
likeEncontrado,, "
=,,# $
await,,% *
_likesRepositorio,,+ <
.,,< =
Obtener,,= D
(,,D E
x,,E F
=>,,G I
x,,J K
.,,K L
Id,,L N
==,,O Q
id,,R T
),,T U
;,,U V
if-- 
(-- 
likeEncontrado-- "
==--# %
null--& *
)--* +
throw.. 
new.. !
TaskCanceledException.. 3
(..3 4
$str..4 G
)..G H
;..H I
bool// 
	respuesta// 
=//  
await//! &
_likesRepositorio//' 8
.//8 9
Eliminar//9 A
(//A B
likeEncontrado//B P
)//P Q
;//Q R
if00 
(00 
!00 
	respuesta00 
)00 
throw11 
new11 !
TaskCanceledException11 3
(113 4
$str114 I
)11I J
;11J K
return22 
	respuesta22  
;22  !
}33 
catch44 
{55 
throw66 
;66 
}77 
}88 	
public:: 
async:: 
Task:: 
<:: 
string::  
>::  !
	GenerarId::" +
(::+ ,
)::, -
{;; 	
var<< 
mensajes<< 
=<< 
await<<  
_likesRepositorio<<! 2
.<<2 3
	Consultar<<3 <
(<<< =
)<<= >
;<<> ?
var>> 
numerosExistentes>> !
=>>" #
mensajes>>$ ,
.?? 
Where?? 
(?? 
m?? 
=>?? 
m?? 
.?? 
Id??  
!=??! #
null??$ (
&&??) +
m??, -
.??- .
Id??. 0
.??0 1

StartsWith??1 ;
(??; <
$str??< @
)??@ A
)??A B
.@@ 
AsEnumerable@@ 
(@@ 
)@@ 
.AA 
SelectAA 
(AA 
mAA 
=>AA 
{AA 
varBB 
parteNumeroBB #
=BB$ %
mBB& '
.BB' (
IdBB( *
.BB* +
	SubstringBB+ 4
(BB4 5
$numBB5 6
)BB6 7
;BB7 8
ifCC 
(CC 
intCC 
.CC 
TryParseCC $
(CC$ %
parteNumeroCC% 0
,CC0 1
outCC2 5
intCC6 9
numeroCC: @
)CC@ A
)CCA B
returnDD 
numeroDD %
;DD% &
returnEE 
$numEE 
;EE 
}FF 
)FF 
;FF 
intHH 
	maxNumeroHH 
=HH 
numerosExistentesHH -
.HH- .
AnyHH. 1
(HH1 2
)HH2 3
?HH4 5
numerosExistentesHH6 G
.HHG H
MaxHHH K
(HHK L
)HHL M
:HHN O
$numHHP Q
;HHQ R
intII 
nuevoNumeroII 
=II 
	maxNumeroII '
+II( )
$numII* +
;II+ ,
stringJJ 
nuevoIdJJ 
=JJ 
$"JJ 
$strJJ !
{JJ! "
nuevoNumeroJJ" -
.JJ- .
ToStringJJ. 6
(JJ6 7
$strJJ7 ;
)JJ; <
}JJ< =
"JJ= >
;JJ> ?
returnLL 
nuevoIdLL 
;LL 
}MM 	
publicOO 
asyncOO 
TaskOO 
<OO 
LikesDTOOO "
>OO" #
VerificarLikeOO$ 1
(OO1 2
stringOO2 8
	idReseniaOO9 B
,OOB C
stringOOD J
	idPersonaOOK T
)OOT U
{PP 	
tryQQ 
{RR 
varSS 
likeEncontradoSS "
=SS# $
awaitSS% *
_likesRepositorioSS+ <
.SS< =
ObtenerSS= D
(SSD E
xSSE F
=>SSG I
xSSJ K
.SSK L
	IdRese√±aSSL T
==SSU W
	idReseniaSSX a
&&SSb d
xSSe f
.SSf g
	IdPersonaSSg p
==SSq s
	idPersonaSSt }
)SS} ~
;SS~ 
returnTT 
likeEncontradoTT %
!=TT& (
nullTT) -
?TT. /
_mapperTT0 7
.TT7 8
MapTT8 ;
<TT; <
LikesDTOTT< D
>TTD E
(TTE F
likeEncontradoTTF T
)TTT U
:TTV W
nullTTX \
;TT\ ]
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
int\\ 
>\\ 
ContarLikes\\ *
(\\* +
string\\+ 1
	idResenia\\2 ;
)\\; <
{]] 	
try^^ 
{__ 
var`` 
likes`` 
=`` 
await`` !
_likesRepositorio``" 3
.``3 4
	Consultar``4 =
(``= >
x``> ?
=>``@ B
x``C D
.``D E
	IdRese√±a``E M
==``N P
	idResenia``Q Z
)``Z [
;``[ \
returnaa 
likesaa 
.aa 
Countaa "
(aa" #
)aa# $
;aa$ %
}bb 
catchcc 
{dd 
throwee 
;ee 
}ff 
}gg 	
publicjj 
asyncjj 
Taskjj 
<jj 
booljj 
>jj 
EliminarPorReseniajj  2
(jj2 3
stringjj3 9
	idReseniajj: C
,jjC D
stringjjE K
	idPersonajjL U
)jjU V
{kk 	
tryll 
{mm 
varnn 
likeEncontradonn "
=nn# $
awaitnn% *
_likesRepositorionn+ <
.nn< =
Obtenernn= D
(nnD E
xnnE F
=>nnG I
xnnJ K
.nnK L
	IdRese√±annL T
==nnU W
	idReseniannX a
&&nnb d
xnne f
.nnf g
	IdPersonanng p
==nnq s
	idPersonannt }
)nn} ~
;nn~ 
ifoo 
(oo 
likeEncontradooo "
==oo# %
nulloo& *
)oo* +
throwpp 
newpp !
TaskCanceledExceptionpp 3
(pp3 4
$strpp4 G
)ppG H
;ppH I
boolrr 
	respuestarr 
=rr  
awaitrr! &
_likesRepositoriorr' 8
.rr8 9
Eliminarrr9 A
(rrA B
likeEncontradorrB P
)rrP Q
;rrQ R
ifss 
(ss 
!ss 
	respuestass 
)ss 
throwtt 
newtt !
TaskCanceledExceptiontt 3
(tt3 4
$strtt4 I
)ttI J
;ttJ K
returnuu 
	respuestauu  
;uu  !
}vv 
catchww 
{xx 
throwyy 
;yy 
}zz 
}{{ 	
}|| 
}}} ∂i
}C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\FotosPublicacionesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class &
FotosPublicacionesServicio +
:, -'
IFotosPublicacionesServicio. I
{ 
private 
readonly  
IRepositorioGenerico -
<- .
FotosPublicaciones. @
>@ A*
_fotosPublicacionesRepositorioB `
;` a
private 
readonly 
IMapper  
_mapper! (
;( )
public &
FotosPublicacionesServicio )
() * 
IRepositorioGenerico* >
<> ?
FotosPublicaciones? Q
>Q R)
fotosPublicacionesRepositorioS p
,p q
IMapperr y
mapper	z Ä
)
Ä Å
{ 	*
_fotosPublicacionesRepositorio *
=+ ,)
fotosPublicacionesRepositorio- J
;J K
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< !
FotosPublicacionesDTO /
>/ 0
Buscar1 7
(7 8
string8 >
id? A
)A B
{ 	
try 
{ 
var (
fotosPublicacionesEncontrada 0
=1 2
await3 8*
_fotosPublicacionesRepositorio9 W
.W X
ObtenerX _
(_ `
x` a
=>b d
xe f
.f g
Idg i
==j l
idm o
)o p
;p q
if 
( (
fotosPublicacionesEncontrada 0
==1 3
null4 8
)8 9
throw 
new !
TaskCanceledException 3
(3 4
$str4 Y
)Y Z
;Z [
return 
_mapper 
. 
Map "
<" #!
FotosPublicacionesDTO# 8
>8 9
(9 :(
fotosPublicacionesEncontrada: V
)V W
;W X
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 
List'' 
<'' !
FotosPublicacionesDTO'' 4
>''4 5
>''5 6"
BuscarFotosPublicacion''7 M
(''M N
string''N T
id''U W
)''W X
{(( 	
try)) 
{** 
var++ 

queryFotos++ 
=++  
await++! &*
_fotosPublicacionesRepositorio++' E
.++E F
	Consultar++F O
(++O P
)++P Q
;++Q R
var,, 
listaFiltrada,, !
=,," #

queryFotos,,$ .
.-- 
Where-- 
(-- 
x-- 
=>-- 
x--  !
.--! "
IdPublicacion--" /
==--0 2
id--3 5
)--5 6
... 
ToList.. 
(.. 
).. 
;.. 
if00 
(00 
listaFiltrada00 !
==00" $
null00% )
||00* ,
!00- .
listaFiltrada00. ;
.00; <
Any00< ?
(00? @
)00@ A
)00A B
throw11 
new11 !
TaskCanceledException11 3
(113 4
$str114 n
)11n o
;11o p
return22 
_mapper22 
.22 
Map22 "
<22" #
List22# '
<22' (!
FotosPublicacionesDTO22( =
>22= >
>22> ?
(22? @
listaFiltrada22@ M
)22M N
;22N O
}33 
catch44 
{55 
throw66 
;66 
}77 
}88 	
public:: 
async:: 
Task:: 
<:: !
FotosPublicacionesDTO:: /
>::/ 0
Crear::1 6
(::6 7!
FotosPublicacionesDTO::7 L
modelo::M S
)::S T
{;; 	
try<< 
{== 
if>> 
(>> 
!>> 
string>> 
.>> 
IsNullOrEmpty>> )
(>>) *
modelo>>* 0
.>>0 1

FotoBase64>>1 ;
)>>; <
&&>>= ?
modelo>>@ F
.>>F G
Foto>>G K
==>>L N
null>>O S
)>>S T
{?? 
modelo@@ 
.@@ 
Foto@@ 
=@@  !
Convert@@" )
.@@) *
FromBase64String@@* :
(@@: ;
modelo@@; A
.@@A B

FotoBase64@@B L
)@@L M
;@@M N
}AA 
varCC $
fotosPublicacionesCreadaCC ,
=CC- .
awaitCC/ 4*
_fotosPublicacionesRepositorioCC5 S
.CCS T
CrearCCT Y
(CCY Z
_mapperCCZ a
.CCa b
MapCCb e
<CCe f
FotosPublicacionesCCf x
>CCx y
(CCy z
modelo	CCz Ä
)
CCÄ Å
)
CCÅ Ç
;
CCÇ É
ifDD 
(DD $
fotosPublicacionesCreadaDD ,
.DD, -
IdDD- /
==DD0 2
nullDD3 7
)DD7 8
throwEE 
newEE 
	ExceptionEE '
(EE' (
$strEE( :
)EE: ;
;EE; <
returnFF 
_mapperFF 
.FF 
MapFF "
<FF" #!
FotosPublicacionesDTOFF# 8
>FF8 9
(FF9 :$
fotosPublicacionesCreadaFF: R
)FFR S
;FFS T
}GG 
catchHH 
{II 
throwJJ 
;JJ 
}KK 
}LL 	
publicNN 
asyncNN 
TaskNN 
<NN 
boolNN 
>NN 
EditarNN  &
(NN& '!
FotosPublicacionesDTONN' <
modeloNN= C
)NNC D
{OO 	
tryPP 
{QQ 
varRR (
fotosPublicacionesEncontradaRR 0
=RR1 2
awaitRR3 8*
_fotosPublicacionesRepositorioRR9 W
.RRW X
ObtenerRRX _
(RR_ `
xRR` a
=>RRb d
xRRe f
.RRf g
IdRRg i
==RRj l
modeloRRm s
.RRs t
IdRRt v
)RRv w
;RRw x
ifSS 
(SS (
fotosPublicacionesEncontradaSS 0
==SS1 3
nullSS4 8
)SS8 9
throwTT 
newTT !
TaskCanceledExceptionTT 3
(TT3 4
$strTT4 Y
)TTY Z
;TTZ [
ifUU 
(UU 
!UU 
stringUU 
.UU 
IsNullOrEmptyUU )
(UU) *
modeloUU* 0
.UU0 1

FotoBase64UU1 ;
)UU; <
)UU< =
{VV (
fotosPublicacionesEncontradaWW 0
.WW0 1
FotoWW1 5
=WW6 7
ConvertWW8 ?
.WW? @
FromBase64StringWW@ P
(WWP Q
modeloWWQ W
.WWW X

FotoBase64WWX b
)WWb c
;WWc d
}XX 
elseYY 
ifYY 
(YY 
modeloYY 
.YY  
FotoYY  $
!=YY% '
nullYY( ,
)YY, -
{ZZ (
fotosPublicacionesEncontrada[[ 0
.[[0 1
Foto[[1 5
=[[6 7
modelo[[8 >
.[[> ?
Foto[[? C
;[[C D
}\\ 
bool^^ 
	respuesta^^ 
=^^  
await^^! &*
_fotosPublicacionesRepositorio^^' E
.^^E F
Editar^^F L
(^^L M(
fotosPublicacionesEncontrada^^M i
)^^i j
;^^j k
if__ 
(__ 
!__ 
	respuesta__ 
)__ 
throw`` 
new`` !
TaskCanceledException`` 3
(``3 4
$str``4 G
)``G H
;``H I
returnaa 
	respuestaaa  
;aa  !
}bb 
catchcc 
{dd 
throwee 
;ee 
}ff 
}gg 	
publicii 
asyncii 
Taskii 
<ii 
boolii 
>ii 
Eliminarii  (
(ii( )
stringii) /
idii0 2
)ii2 3
{jj 	
trykk 
{ll 
varmm (
fotosPublicacionesEncontradamm 0
=mm1 2
awaitmm3 8*
_fotosPublicacionesRepositoriomm9 W
.mmW X
ObtenermmX _
(mm_ `
xmm` a
=>mmb d
xmme f
.mmf g
Idmmg i
==mmj l
idmmm o
)mmo p
;mmp q
ifnn 
(nn (
fotosPublicacionesEncontradann 0
==nn1 3
nullnn4 8
)nn8 9
throwoo 
newoo !
TaskCanceledExceptionoo 3
(oo3 4
$stroo4 Y
)ooY Z
;ooZ [
boolpp 
	respuestapp 
=pp  
awaitpp! &*
_fotosPublicacionesRepositoriopp' E
.ppE F
EliminarppF N
(ppN O(
fotosPublicacionesEncontradappO k
)ppk l
;ppl m
ifqq 
(qq 
!qq 
	respuestaqq 
)qq 
throwrr 
newrr !
TaskCanceledExceptionrr 3
(rr3 4
$strrr4 I
)rrI J
;rrJ K
returnss 
	respuestass  
;ss  !
}tt 
catchuu 
{vv 
throwww 
;ww 
}xx 
}yy 	
public{{ 
async{{ 
Task{{ 
<{{ 
List{{ 
<{{ !
FotosPublicacionesDTO{{ 4
>{{4 5
>{{5 6
Listar{{7 =
({{= >
){{> ?
{|| 	
try}} 
{~~ 
var #
queryFotosPublicaciones +
=, -
await. 3*
_fotosPublicacionesRepositorio4 R
.R S
	ConsultarS \
(\ ]
)] ^
;^ _
var
ÄÄ %
listaFotosPublicaciones
ÄÄ +
=
ÄÄ, -%
queryFotosPublicaciones
ÄÄ. E
.
ÄÄE F
ToList
ÄÄF L
(
ÄÄL M
)
ÄÄM N
;
ÄÄN O
return
ÇÇ 
_mapper
ÇÇ 
.
ÇÇ 
Map
ÇÇ "
<
ÇÇ" #
List
ÇÇ# '
<
ÇÇ' (#
FotosPublicacionesDTO
ÇÇ( =
>
ÇÇ= >
>
ÇÇ> ?
(
ÇÇ? @%
listaFotosPublicaciones
ÇÇ@ W
)
ÇÇW X
;
ÇÇX Y
}
ÉÉ 
catch
ÑÑ 
{
ÖÖ 
throw
ÜÜ 
;
ÜÜ 
}
áá 
}
àà 	
public
ää 
async
ää 
Task
ää 
<
ää 
string
ää  
>
ää  !+
ObtenerIdNuevaFotoPublicacion
ää" ?
(
ää? @
)
ää@ A
{
ãã 	
try
åå 
{
çç 
var
éé  
fotosPublicaciones
éé &
=
éé' (
await
éé) .,
_fotosPublicacionesRepositorio
éé/ M
.
ééM N
	Consultar
ééN W
(
ééW X
)
ééX Y
;
ééY Z
var
èè 
listaIds
èè 
=
èè  
fotosPublicaciones
èè 1
.
êê 
ToList
êê 
(
êê 
)
êê 
.
ëë 
Select
ëë 
(
ëë 
f
ëë 
=>
ëë  
f
ëë! "
.
ëë" #
Id
ëë# %
)
ëë% &
.
íí 
Where
íí 
(
íí 
id
íí 
=>
íí  
!
íí! "
string
íí" (
.
íí( )
IsNullOrEmpty
íí) 6
(
íí6 7
id
íí7 9
)
íí9 :
&&
íí; =
id
íí> @
.
íí@ A

StartsWith
ííA K
(
ííK L
$str
ííL P
)
ííP Q
)
ííQ R
.
ìì 
Select
ìì 
(
ìì 
id
ìì 
=>
ìì !
{
îî 
var
ïï 
	numeroStr
ïï %
=
ïï& '
id
ïï( *
.
ïï* +
	Substring
ïï+ 4
(
ïï4 5
$num
ïï5 6
)
ïï6 7
;
ïï7 8
return
ññ 
int
ññ "
.
ññ" #
TryParse
ññ# +
(
ññ+ ,
	numeroStr
ññ, 5
,
ññ5 6
out
ññ7 :
int
ññ; >
numero
ññ? E
)
ññE F
?
ññG H
numero
ññI O
:
ññP Q
$num
ññR S
;
ññS T
}
óó 
)
óó 
.
òò 
ToList
òò 
(
òò 
)
òò 
;
òò 
int
öö 
	maxNumero
öö 
=
öö 
listaIds
öö  (
.
öö( )
Any
öö) ,
(
öö, -
)
öö- .
?
öö/ 0
listaIds
öö1 9
.
öö9 :
Max
öö: =
(
öö= >
)
öö> ?
:
öö@ A
$num
ööB C
;
ööC D
int
õõ 
nuevoNumero
õõ 
=
õõ  !
	maxNumero
õõ" +
+
õõ, -
$num
õõ. /
;
õõ/ 0
return
ùù 
$"
ùù 
$str
ùù 
{
ùù 
nuevoNumero
ùù '
.
ùù' (
ToString
ùù( 0
(
ùù0 1
$str
ùù1 5
)
ùù5 6
}
ùù6 7
"
ùù7 8
;
ùù8 9
}
ûû 
catch
üü 
{
†† 
throw
°° 
;
°° 
}
¢¢ 
}
££ 	
}
§§ 
}•• ˆ:
rC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\EstadosServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
EstadosServicio  
:! "
IEstadosServicio# 3
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Estados. 5
>5 6
_estadosRepositorio7 J
;J K
private 
readonly 
IMapper  
_mapper! (
;( )
public 
EstadosServicio 
(  
IRepositorioGenerico 3
<3 4
Estados4 ;
>; <
estadosRepositorio= O
,O P
IMapperQ X
mapperY _
)_ `
{ 	
_estadosRepositorio 
=  !
estadosRepositorio" 4
;4 5
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 

EstadosDTO $
>$ %
Buscar& ,
(, -
string- 3
id4 6
)6 7
{ 	
try 
{ 
var 
estadoEncontrado $
=% &
await' ,
_estadosRepositorio- @
.@ A
ObtenerA H
(H I
xI J
=>K M
xN O
.O P
IdP R
==S U
idV X
)X Y
;Y Z
if 
( 
estadoEncontrado $
==% '
null( ,
), -
throw 
new !
TaskCanceledException 3
(3 4
$str4 I
)I J
;J K
return 
_mapper 
. 
Map "
<" #

EstadosDTO# -
>- .
(. /
estadoEncontrado/ ?
)? @
;@ A
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 

EstadosDTO'' $
>''$ %
Crear''& +
(''+ ,

EstadosDTO'', 6
modelo''7 =
)''= >
{(( 	
try)) 
{** 
var++ 
estadoCreado++  
=++! "
await++# (
_estadosRepositorio++) <
.++< =
Crear++= B
(++B C
_mapper++C J
.++J K
Map++K N
<++N O
Estados++O V
>++V W
(++W X
modelo++X ^
)++^ _
)++_ `
;++` a
if,, 
(,, 
estadoCreado,,  
.,,  !
Id,,! #
==,,$ &
null,,' +
),,+ ,
throw-- 
new-- 
	Exception-- '
(--' (
$str--( :
)--: ;
;--; <
return.. 
_mapper.. 
... 
Map.. "
<.." #

EstadosDTO..# -
>..- .
(... /
estadoCreado../ ;
)..; <
;..< =
}// 
catch00 
{11 
throw22 
;22 
}33 
}44 	
public66 
async66 
Task66 
<66 
bool66 
>66 
Editar66  &
(66& '

EstadosDTO66' 1
modelo662 8
)668 9
{77 	
try88 
{99 
var:: 
estadoModelo::  
=::! "
_mapper::# *
.::* +
Map::+ .
<::. /
Estados::/ 6
>::6 7
(::7 8
modelo::8 >
)::> ?
;::? @
var;; 
estadoEncontrado;; $
=;;% &
await;;' ,
_estadosRepositorio;;- @
.;;@ A
Obtener;;A H
(;;H I
x;;I J
=>;;K M
x;;N O
.;;O P
Id;;P R
==;;S U
modelo;;V \
.;;\ ]
Id;;] _
);;_ `
;;;` a
if<< 
(<< 
estadoEncontrado<< $
==<<% '
null<<( ,
)<<, -
throw== 
new== !
TaskCanceledException== 3
(==3 4
$str==4 J
)==J K
;==K L
estadoEncontrado>>  
.>>  !
Nombre>>! '
=>>( )
estadoModelo>>* 6
.>>6 7
Nombre>>7 =
;>>= >
bool?? 
	respuesta?? 
=??  
await??! &
_estadosRepositorio??' :
.??: ;
Editar??; A
(??A B
estadoEncontrado??B R
)??R S
;??S T
if@@ 
(@@ 
!@@ 
	respuesta@@ 
)@@ 
throwAA 
newAA !
TaskCanceledExceptionAA 3
(AA3 4
$strAA4 G
)AAG H
;AAH I
returnBB 
	respuestaBB  
;BB  !
}CC 
catchDD 
{EE 
throwFF 
;FF 
}GG 
}HH 	
publicJJ 
asyncJJ 
TaskJJ 
<JJ 
boolJJ 
>JJ 
EliminarJJ  (
(JJ( )
stringJJ) /
idJJ0 2
)JJ2 3
{KK 	
tryLL 
{MM 
varNN 
estadoEncontradoNN $
=NN% &
awaitNN' ,
_estadosRepositorioNN- @
.NN@ A
ObtenerNNA H
(NNH I
xNNI J
=>NNK M
xNNN O
.NNO P
IdNNP R
==NNS U
idNNV X
)NNX Y
;NNY Z
ifOO 
(OO 
estadoEncontradoOO $
==OO% '
nullOO( ,
)OO, -
throwPP 
newPP !
TaskCanceledExceptionPP 3
(PP3 4
$strPP4 I
)PPI J
;PPJ K
boolQQ 
	respuestaQQ 
=QQ  
awaitQQ! &
_estadosRepositorioQQ' :
.QQ: ;
EliminarQQ; C
(QQC D
estadoEncontradoQQD T
)QQT U
;QQU V
ifRR 
(RR 
!RR 
	respuestaRR 
)RR 
throwSS 
newSS !
TaskCanceledExceptionSS 3
(SS3 4
$strSS4 I
)SSI J
;SSJ K
returnTT 
	respuestaTT  
;TT  !
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
List\\ 
<\\ 

EstadosDTO\\ )
>\\) *
>\\* +
Listar\\, 2
(\\2 3
)\\3 4
{]] 	
try^^ 
{__ 
var`` 
queryEstado`` 
=``  !
await``" '
_estadosRepositorio``( ;
.``; <
	Consultar``< E
(``E F
)``F G
;``G H
varaa 
listaEstadosaa  
=aa! "
queryEstadoaa# .
.aa. /
ToListaa/ 5
(aa5 6
)aa6 7
;aa7 8
returncc 
_mappercc 
.cc 
Mapcc "
<cc" #
Listcc# '
<cc' (

EstadosDTOcc( 2
>cc2 3
>cc3 4
(cc4 5
listaEstadoscc5 A
)ccA B
;ccB C
}dd 
catchee 
{ff 
throwgg 
;gg 
}hh 
}ii 	
}jj 
}kk å8
tC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\FavoritosServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
FavoritosServicio "
:# $
IFavoritosServicio% 7
{ 
private 
readonly  
IRepositorioGenerico -
<- .
	Favoritos. 7
>7 8!
_favoritosRepositorio9 N
;N O
private 
readonly 
IMapper  
_mapper! (
;( )
public 
FavoritosServicio  
(  ! 
IRepositorioGenerico! 5
<5 6
	Favoritos6 ?
>? @ 
favoritosRepositorioA U
,U V
IMapperW ^
mapper_ e
)e f
{ 	!
_favoritosRepositorio !
=" # 
favoritosRepositorio$ 8
;8 9
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
List 
< 
FavoritosDTO +
>+ ,
>, -
BuscarPorUsuario. >
(> ?
string? E
idF H
)H I
{ 	
var 
	favoritos 
= 
await !!
_favoritosRepositorio" 7
.7 8
	Consultar8 A
(A B
fB C
=>D F
fG H
.H I
	IdPersonaI R
==S U
idV X
)X Y
;Y Z
return 
_mapper 
. 
Map 
< 
List #
<# $
FavoritosDTO$ 0
>0 1
>1 2
(2 3
	favoritos3 <
)< =
;= >
} 	
public 
async 
Task 
< 
FavoritosDTO &
>& '
Crear( -
(- .
FavoritosDTO. :
modelo; A
)A B
{   	
modelo!! 
.!! 
Id!! 
=!! 
await!! 
	GenerarId!! '
(!!' (
)!!( )
;!!) *
var"" 
favorito"" 
="" 
_mapper"" "
.""" #
Map""# &
<""& '
	Favoritos""' 0
>""0 1
(""1 2
modelo""2 8
)""8 9
;""9 :
var## 
creado## 
=## 
await## !
_favoritosRepositorio## 4
.##4 5
Crear##5 :
(##: ;
favorito##; C
)##C D
;##D E
return$$ 
_mapper$$ 
.$$ 
Map$$ 
<$$ 
FavoritosDTO$$ +
>$$+ ,
($$, -
creado$$- 3
)$$3 4
;$$4 5
}%% 	
public'' 
async'' 
Task'' 
<'' 
bool'' 
>'' &
EliminarUsuarioPublicacion''  :
('': ;
string''; A
	idUsuario''B K
,''K L
string''M S
idPublicacion''T a
)''a b
{(( 	
var)) 
favorito)) 
=)) 
await))  !
_favoritosRepositorio))! 6
.))6 7
Obtener))7 >
())> ?
f))? @
=>))A C
f))D E
.))E F
	IdPersona))F O
==))P R
	idUsuario))S \
&&))] _
f))` a
.))a b
IdPublicacion))b o
==))p r
idPublicacion	))s Ä
)
))Ä Å
;
))Å Ç
if** 
(** 
favorito** 
==** 
null**  
)**  !
{++ 
return,, 
false,, 
;,, 
}-- 
return.. 
await.. !
_favoritosRepositorio.. .
.... /
Eliminar../ 7
(..7 8
favorito..8 @
)..@ A
;..A B
}// 	
public11 
async11 
Task11 
<11 
bool11 
>11 
VerificarFavorito11  1
(111 2
string112 8
	idUsuario119 B
,11B C
string11D J
idPublicacion11K X
)11X Y
{22 	
var33 
favorito33 
=33 
await33  !
_favoritosRepositorio33! 6
.336 7
Obtener337 >
(33> ?
f33? @
=>33A C
f33D E
.33E F
	IdPersona33F O
==33P R
	idUsuario33S \
&&33] _
f33` a
.33a b
IdPublicacion33b o
==33p r
idPublicacion	33s Ä
)
33Ä Å
;
33Å Ç
return44 
favorito44 
!=44 
null44 #
;44# $
}55 	
public77 
async77 
Task77 
<77 
string77  
>77  !
	GenerarId77" +
(77+ ,
)77, -
{88 	
var99 
mensajes99 
=99 
await99  !
_favoritosRepositorio99! 6
.996 7
	Consultar997 @
(99@ A
)99A B
;99B C
var;; 
numerosExistentes;; !
=;;" #
mensajes;;$ ,
.<< 
Where<< 
(<< 
m<< 
=><< 
m<< 
.<< 
Id<<  
!=<<! #
null<<$ (
&&<<) +
m<<, -
.<<- .
Id<<. 0
.<<0 1

StartsWith<<1 ;
(<<; <
$str<<< A
)<<A B
)<<B C
.== 
AsEnumerable== 
(== 
)== 
.>> 
Select>> 
(>> 
m>> 
=>>> 
{>> 
var?? 
parteNumero?? #
=??$ %
m??& '
.??' (
Id??( *
.??* +
	Substring??+ 4
(??4 5
$num??5 6
)??6 7
;??7 8
if@@ 
(@@ 
int@@ 
.@@ 
TryParse@@ $
(@@$ %
parteNumero@@% 0
,@@0 1
out@@2 5
int@@6 9
numero@@: @
)@@@ A
)@@A B
returnAA 
numeroAA %
;AA% &
returnBB 
$numBB 
;BB 
}CC 
)CC 
;CC 
intEE 
	maxNumeroEE 
=EE 
numerosExistentesEE -
.EE- .
AnyEE. 1
(EE1 2
)EE2 3
?EE4 5
numerosExistentesEE6 G
.EEG H
MaxEEH K
(EEK L
)EEL M
:EEN O
$numEEP Q
;EEQ R
intFF 
nuevoNumeroFF 
=FF 
	maxNumeroFF '
+FF( )
$numFF* +
;FF+ ,
stringGG 
nuevoIdGG 
=GG 
$"GG 
$strGG "
{GG" #
nuevoNumeroGG# .
.GG. /
ToStringGG/ 7
(GG7 8
$strGG8 <
)GG< =
}GG= >
"GG> ?
;GG? @
returnII 
nuevoIdII 
;II 
}JJ 	
}KK 
}LL Ê:
xC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\EstadoReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class !
EstadoReporteServicio &
:' ("
IEstadoReporteServicio) ?
{ 
private 
readonly  
IRepositorioGenerico -
<- .
EstadosReporte. <
>< =%
_estadoReporteRepositorio> W
;W X
private 
readonly 
IMapper  
_mapper! (
;( )
public !
EstadoReporteServicio $
($ % 
IRepositorioGenerico% 9
<9 :
EstadosReporte: H
>H I$
estadoReporteRepositorioJ b
,b c
IMapperd k
mapperl r
)r s
{ 	%
_estadoReporteRepositorio %
=& '$
estadoReporteRepositorio( @
;@ A
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
EstadosReporteDTO +
>+ ,
Crear- 2
(2 3
EstadosReporteDTO3 D
modeloE K
)K L
{ 	
try 
{ 
var 
EstadoReporteCreado '
=( )
await* /%
_estadoReporteRepositorio0 I
.I J
CrearJ O
(O P
_mapperP W
.W X
MapX [
<[ \
EstadosReporte\ j
>j k
(k l
modelol r
)r s
)s t
;t u
if 
( 
EstadoReporteCreado '
.' (
Id( *
==+ -
null. 2
)2 3
throw 
new 
	Exception '
(' (
$str( :
): ;
;; <
return 
_mapper 
. 
Map "
<" #
EstadosReporteDTO# 4
>4 5
(5 6
EstadoReporteCreado6 I
)I J
;J K
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 
bool'' 
>'' 
Editar''  &
(''& '
EstadosReporteDTO''' 8
modelo''9 ?
)''? @
{(( 	
try)) 
{** 
var++ 
estadoReporteModelo++ '
=++( )
_mapper++* 1
.++1 2
Map++2 5
<++5 6
EstadosReporte++6 D
>++D E
(++E F
modelo++F L
)++L M
;++M N
var,, #
estadoReporteEncontrado,, +
=,,, -
await,,. 3%
_estadoReporteRepositorio,,4 M
.,,M N
Obtener,,N U
(,,U V
x,,V W
=>,,X Z
x,,[ \
.,,\ ]
Id,,] _
==,,` b
modelo,,c i
.,,i j
Id,,j l
),,l m
;,,m n
if-- 
(-- #
estadoReporteEncontrado-- +
==--, .
null--/ 3
)--3 4
throw.. 
new.. !
TaskCanceledException.. 3
(..3 4
$str..4 I
)..I J
;..J K#
estadoReporteEncontrado// '
.//' (
Nombre//( .
=/// 0
estadoReporteModelo//1 D
.//D E
Nombre//E K
;//K L
bool00 
	respuesta00 
=00  
await00! &%
_estadoReporteRepositorio00' @
.00@ A
Editar00A G
(00G H#
estadoReporteEncontrado00H _
)00_ `
;00` a
if11 
(11 
!11 
	respuesta11 
)11 
throw22 
new22 !
TaskCanceledException22 3
(223 4
$str224 G
)22G H
;22H I
return33 
	respuesta33  
;33  !
}44 
catch55 
{66 
throw77 
;77 
}88 
}99 	
public;; 
async;; 
Task;; 
<;; 
EstadosReporteDTO;; +
>;;+ ,
Buscar;;- 3
(;;3 4
string;;4 :
id;;; =
);;= >
{<< 	
try>> 
{?? 
var@@ 
queryRol@@ 
=@@ 
await@@ $%
_estadoReporteRepositorio@@% >
.@@> ?
Obtener@@? F
(@@F G
x@@G H
=>@@I K
x@@L M
.@@M N
Id@@N P
==@@Q S
id@@T V
)@@V W
;@@W X
returnBB 
_mapperBB 
.BB 
MapBB "
<BB" #
EstadosReporteDTOBB# 4
>BB4 5
(BB5 6
queryRolBB6 >
)BB> ?
;BB? @
}CC 
catchDD 
{EE 
throwFF 
;FF 
}GG 
}HH 	
publicJJ 
asyncJJ 
TaskJJ 
<JJ 
boolJJ 
>JJ 
EliminarJJ  (
(JJ( )
stringJJ) /
idJJ0 2
)JJ2 3
{KK 	
tryLL 
{MM 
varNN #
estadoReporteEncontradoNN +
=NN, -
awaitNN. 3%
_estadoReporteRepositorioNN4 M
.NNM N
ObtenerNNN U
(NNU V
xNNV W
=>NNX Z
xNN[ \
.NN\ ]
IdNN] _
==NN` b
idNNc e
)NNe f
;NNf g
ifOO 
(OO #
estadoReporteEncontradoOO +
==OO, .
nullOO/ 3
)OO3 4
throwPP 
newPP !
TaskCanceledExceptionPP 3
(PP3 4
$strPP4 R
)PPR S
;PPS T
boolQQ 
	respuestaQQ 
=QQ  
awaitQQ! &%
_estadoReporteRepositorioQQ' @
.QQ@ A
EliminarQQA I
(QQI J#
estadoReporteEncontradoQQJ a
)QQa b
;QQb c
ifRR 
(RR 
!RR 
	respuestaRR 
)RR 
throwSS 
newSS !
TaskCanceledExceptionSS 3
(SS3 4
$strSS4 I
)SSI J
;SSJ K
returnTT 
	respuestaTT  
;TT  !
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
List\\ 
<\\ 
EstadosReporteDTO\\ 0
>\\0 1
>\\1 2
Listar\\3 9
(\\9 :
)\\: ;
{]] 	
try^^ 
{__ 
var`` 
queryRol`` 
=`` 
await`` $%
_estadoReporteRepositorio``% >
.``> ?
	Consultar``? H
(``H I
)``I J
;``J K
varaa 
listaRolaa 
=aa 
queryRolaa '
.aa' (
ToListaa( .
(aa. /
)aa/ 0
;aa0 1
returncc 
_mappercc 
.cc 
Mapcc "
<cc" #
Listcc# '
<cc' (
EstadosReporteDTOcc( 9
>cc9 :
>cc: ;
(cc; <
listaRolcc< D
)ccD E
;ccE F
}dd 
catchee 
{ff 
throwgg 
;gg 
}hh 
}ii 	
}jj 
}kk Ñ

ÄC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\ITipoReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

  
ITipoReporteServicio

 )
{ 
Task 
< 
List 
< 
TiposReporteDTO !
>! "
>" #
Listar$ *
(* +
)+ ,
;, -
Task 
< 
TiposReporteDTO 
> 
Crear #
(# $
TiposReporteDTO$ 3
modelo4 :
): ;
;; <
Task 
< 
bool 
> 
Editar 
( 
TiposReporteDTO )
modelo* 0
)0 1
;1 2
Task 
< 
TiposReporteDTO 
> 
Buscar $
($ %
string% +
id, .
). /
;/ 0
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} ˜	
C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\ITipoAccionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
ITipoAccionServicio

 (
{ 
Task 
< 
List 
< 
TipoAccionDTO 
>  
>  !
Listar" (
(( )
)) *
;* +
Task 
< 
TipoAccionDTO 
> 
Crear !
(! "
TipoAccionDTO" /
modelo0 6
)6 7
;7 8
Task 
< 
bool 
> 
Editar 
( 
TipoAccionDTO '
modelo( .
). /
;/ 0
Task 
< 
TipoAccionDTO 
> 
Buscar "
(" #
string# )
id* ,
), -
;- .
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} ∆	
xC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IRolServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IRolServicio

 !
{ 
Task 
< 
List 
< 
RolDTO 
> 
> 
Listar !
(! "
)" #
;# $
Task 
< 
RolDTO 
> 
Crear 
( 
RolDTO !
modelo" (
)( )
;) *
Task 
< 
bool 
> 
Editar 
( 
RolDTO  
modelo! '
)' (
;( )
Task 
< 
RolDTO 
> 
Buscar 
( 
string "
id# %
)% &
;& '
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} π
|C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IReseniaServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IReseniaServicio

 %
{ 
Task 
< 
List 
< 

Rese√±aDTO 
> 
> 
Listar $
($ %
)% &
;& '
Task 
< 

Rese√±aDTO 
> 
Crear 
( 

Rese√±aDTO '
modelo( .
). /
;/ 0
Task 
< 
bool 
> 
Editar 
( 

Rese√±aDTO #
modelo$ *
)* +
;+ ,
Task 
< 

Rese√±aDTO 
> 
Buscar 
( 
string %
id& (
)( )
;) *
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
List 
< 

Rese√±aDTO 
> 
>  
ListarPorPublicacion 2
(2 3
string3 9
idPublicacion: G
)G H
;H I
Task 
< 
List 
< 

Rese√±aDTO 
> 
> 
ListarPorPersona .
(. /
string/ 5
	idPersona6 ?
)? @
;@ A
Task 
< 
List 
< 

Rese√±aDTO 
> 
> !
ListarPorCalificacion 3
(3 4
int4 7
calificacion8 D
)D E
;E F
} 
} »
|C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IReporteServicio

 %
{ 
Task 
< 
List 
< 
ReportesDTO 
> 
> 
Listar  &
(& '
)' (
;( )
Task 
< 
ReportesDTO 
> 
Crear 
(  
ReportesDTO  +
modelo, 2
)2 3
;3 4
Task 
< 
bool 
> 

Actualizar 
( 
ReportesDTO )
modelo* 0
)0 1
;1 2
Task 
< 
ReportesDTO 
> 
ObtenerPorId &
(& '
string' -
id. 0
)0 1
;1 2
} 
} ã
}C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IRegistroServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IRegistroServicio

 &
{ 
Task 
< 
string 
> !
GenerarCodigoRegistro *
(* +
DateTime+ 3
fechaNacimiento4 C
)C D
;D E
Task 
< 
bool 
> $
EnviarCorreoVerificacion +
(+ ,'
EnviarCorreoVerificacionDTO, G
datosH M
)M N
;N O
Task 
< 
bool 
> !
ValidarCodigoRegistro (
(( )
string) /
codigoRegistro0 >
,> ?
string@ F
codigoRecibidoG U
)U V
;V W
} 
} ﬁ	
zC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IRazonServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IRazonServicio

 #
{ 
Task 
< 
List 
< 

RazonesDTO 
> 
> 
Listar %
(% &
)& '
;' (
Task 
< 

RazonesDTO 
> 
Crear 
( 

RazonesDTO )
modelo* 0
)0 1
;1 2
Task 
< 
bool 
> 
Editar 
( 

RazonesDTO $
modelo% +
)+ ,
;, -
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 

RazonesDTO 
> 
Buscar 
(  
string  &
id' )
)) *
;* +
} 
} ª
ÇC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IPublicacionesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 "
IPublicacionesServicio

 +
{ 
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
Listar% +
(+ ,
), -
;- .
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $(
ListarSoloConLongitudLatitud$ @
(@ A
)A B
;B C
Task 
< 
PublicacionesDTO 
> 
Crear $
($ %
PublicacionesDTO% 5
modelo6 <
)< =
;= >
Task 
< 
bool 
> 
Editar 
( 
PublicacionesDTO *
modelo+ 1
)1 2
;2 3
Task 
< 
PublicacionesDTO 
> 
Buscar %
(% &
string& ,
id- /
)/ 0
;0 1
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
ListarPorCategoria% 7
(7 8
string8 >
idCategoria? J
)J K
;K L
Task 
< 
List 
< !
FotosPublicacionesDTO '
>' (
>( )
FotosPublicaciones* <
(< =
string= C
idPublicacionD Q
)Q R
;R S
Task 
< 
string 
> %
ObtenerIdNuevaPublicacion .
(. /
)/ 0
;0 1
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
ListarPorUsuario% 5
(5 6
string6 <
id= ?
)? @
;@ A
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
listarActivos% 2
(2 3
)3 4
;4 5
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
busquedaTexto% 2
(2 3
string3 9
textoBusqueda: G
)G H
;H I
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
ListarRangoPrecio% 6
(6 7
decimal7 >
precioMinimo? K
,K L
decimalM T
precioMaximoU a
)a b
;b c
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
ListarMaxOMinPrecio% 8
(8 9
string9 ?

tipoFiltro@ J
)J K
;K L
Task 
< 
List 
< 
PublicacionesDTO "
>" #
># $
ListarPorFecha% 3
(3 4
string4 :

tipoFiltro; E
)E F
;F G
} 
} ı
|C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IPersonaServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IPersonaServicio

 %
{ 
Task 
< 
List 
< 

PersonaDTO 
> 
> 
Listar %
(% &
)& '
;' (
Task 
< 
	SesionDTO 
> 
ValidarCredenciales +
(+ ,
string, 2
correo3 9
,9 :
string; A
?A B
telefonoC K
,K L
stringM S
contrase√±aT ^
)^ _
;_ `
Task 
< 

PersonaDTO 
> 
Crear 
( 

PersonaDTO )
modelo* 0
)0 1
;1 2
Task 
< 
bool 
> 
Editar 
( 

PersonaDTO $
modelo% +
)+ ,
;, -
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 

PersonaDTO 
> 
Obtener  
(  !
string! '
id( *
)* +
;+ ,
Task 
< 

PersonaDTO 
> 
ObtenerPorUsuario *
(* +
string+ 1
usuario2 9
)9 :
;: ;
Task 
< 
string 
> !
ObtenerIdNuevoUsuario *
(* +
)+ ,
;, -
} 
} ¨
ÅC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\INotificacionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 !
INotificacionServicio

 *
{ 
Task 
< 
NotificacionesDTO 
> 
Crear  %
(% &
NotificacionesDTO& 7
modelo8 >
)> ?
;? @
Task 
< 
List 
< 
NotificacionesDTO #
># $
>$ %
ListarPorIdUsuario& 8
(8 9
string9 ?
	idUsuario@ I
)I J
;J K
Task 
< 
bool 
> 
CambiarEstado  
(  !
bool! %
estado& ,
,, -
NotificacionesDTO. ?
notificacion@ L
)L M
;M N
} 
} í

ÇC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IMotivoReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 "
IMotivoReporteServicio

 +
{ 
Task 
< 
List 
< 
MotivosReporteDTO #
># $
>$ %
Listar& ,
(, -
)- .
;. /
Task 
< 
MotivosReporteDTO 
> 
Crear  %
(% &
MotivosReporteDTO& 7
modelo8 >
)> ?
;? @
Task 
< 
bool 
> 
Editar 
( 
MotivosReporteDTO +
modelo, 2
)2 3
;3 4
Task 
< 
MotivosReporteDTO 
> 
Buscar  &
(& '
string' -
id. 0
)0 1
;1 2
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} ı
}C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IMensajesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IMensajesServicio

 &
{ 
Task 
< 
string 
> 
	GenerarId 
( 
)  
;  !
Task 
< 
List 
< 
MensajesDTO 
> 
> 
Listar  &
(& '
)' (
;( )
Task 
< 
MensajesDTO 
> 
Crear 
(  
CrearMensajeDTO  /
modelo0 6
)6 7
;7 8
Task 
< 
MensajesDTO 
> 
Buscar  
(  !
string! '
id( *
)* +
;+ ,
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
List 
< 
MensajesDTO 
> 
> 
ListarPorIdChat  /
(/ 0
string0 6
idChat7 =
)= >
;> ?
Task 
< 
MensajesDTO 
> %
ObtenerMensajeMasReciente 3
(3 4
string4 :
idChat; A
)A B
;B C
} 
} ç

ÇC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IMensajeAccionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 "
IMensajeAccionServicio

 +
{ 
Task 
< 
List 
< 
MensajeAccionDTO "
>" #
># $
Listar% +
(+ ,
), -
;- .
Task 
< 
MensajeAccionDTO 
> 
Crear $
($ %
MensajeAccionDTO% 5
modelo6 <
)< =
;= >
Task 
< 
bool 
> 
Editar 
( 
MensajeAccionDTO *
modelo+ 1
)1 2
;2 3
Task 
< 
MensajeAccionDTO 
> 
Buscar %
(% &
string& ,
id- /
)/ 0
;0 1
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} Ê
zC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\ILikesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
ILikesServicio

 #
{ 
Task 
< 
LikesDTO 
> 
Crear 
( 
LikesDTO %
modelo& ,
), -
;- .
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
string 
> 
	GenerarId 
( 
)  
;  !
Task 
< 
LikesDTO 
> 
VerificarLike $
($ %
string% +
	idResenia, 5
,5 6
string7 =
	idPersona> G
)G H
;H I
Task 
< 
int 
> 
ContarLikes 
( 
string $
	idResenia% .
). /
;/ 0
Task 
< 
bool 
> 
EliminarPorResenia %
(% &
string& ,
	idResenia- 6
,6 7
string8 >
	idPersona? H
)H I
;I J
} 
} ƒ
áC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IFotosPublicacionesServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 '
IFotosPublicacionesServicio

 0
{ 
Task 
< 
List 
< !
FotosPublicacionesDTO '
>' (
>( )
Listar* 0
(0 1
)1 2
;2 3
Task 
< !
FotosPublicacionesDTO "
>" #
Crear$ )
() *!
FotosPublicacionesDTO* ?
modelo@ F
)F G
;G H
Task 
< 
bool 
> 
Editar 
( !
FotosPublicacionesDTO /
modelo0 6
)6 7
;7 8
Task 
< !
FotosPublicacionesDTO "
>" #
Buscar$ *
(* +
string+ 1
id2 4
)4 5
;5 6
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
List 
< !
FotosPublicacionesDTO '
>' (
>( )"
BuscarFotosPublicacion* @
(@ A
stringA G
idH J
)J K
;K L
Task 
< 
string 
> )
ObtenerIdNuevaFotoPublicacion 2
(2 3
)3 4
;4 5
} 
} å

~C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IFavoritosServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IFavoritosServicio

 '
{ 
Task 
< 
FavoritosDTO 
> 
Crear  
(  !
FavoritosDTO! -
modelo. 4
)4 5
;5 6
Task 
< 
List 
< 
FavoritosDTO 
> 
>  
BuscarPorUsuario! 1
(1 2
string2 8
id9 ;
); <
;< =
Task 
< 
bool 
> &
EliminarUsuarioPublicacion -
(- .
string. 4
	idUsuario5 >
,> ?
string@ F
idPublicacionG T
)T U
;U V
Task 
< 
bool 
> 
VerificarFavorito $
($ %
string% +
	idUsuario, 5
,5 6
string7 =
idPublicacion> K
)K L
;L M
} 
} ‚	
|C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IEstadosServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IEstadosServicio

 %
{ 
Task 
< 
List 
< 

EstadosDTO 
> 
> 
Listar %
(% &
)& '
;' (
Task 
< 

EstadosDTO 
> 
Crear 
( 

EstadosDTO )
modelo* 0
)0 1
;1 2
Task 
< 
bool 
> 
Editar 
( 

EstadosDTO $
modelo% +
)+ ,
;, -
Task 
< 

EstadosDTO 
> 
Buscar 
(  
string  &
id' )
)) *
;* +
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} í

ÇC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IEstadoReporteServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 "
IEstadoReporteServicio

 +
{ 
Task 
< 
List 
< 
EstadosReporteDTO #
># $
>$ %
Listar& ,
(, -
)- .
;. /
Task 
< 
EstadosReporteDTO 
> 
Crear  %
(% &
EstadosReporteDTO& 7
modelo8 >
)> ?
;? @
Task 
< 
bool 
> 
Editar 
( 
EstadosReporteDTO +
modelo, 2
)2 3
;3 4
Task 
< 
EstadosReporteDTO 
> 
Buscar  &
(& '
string' -
id. 0
)0 1
;1 2
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} †
ÄC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IContactanosServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

  
IContactanosServicio

 )
{ 
Task 
< 
ContactanosDTO 
> 
Crear "
(" #
ContactanosDTO# 1
modelo2 8
)8 9
;9 :
Task 
< 
bool 
> 
Editar 
( 
ContactanosDTO (
modelo) /
)/ 0
;0 1
Task 
< 
ContactanosDTO 
> 
Buscar #
(# $
string$ *
id+ -
)- .
;. /
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
List 
< 
ContactanosDTO  
>  !
>! "
Listar# )
() *
)* +
;+ ,
Task 
< 
bool 
> 
EnviarCorreo 
(  
string  &
correoDestino' 4
,4 5
string6 <
asunto= C
,C D
stringE K
mensajeL S
,S T

RazonesDTOU _
razon` e
,e f
stringg m
correoRespuestan }
)} ~
;~ 
} 
} ”
àC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\ICodigosVerificacionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 (
ICodigosVerificacionServicio

 1
{ 
Task 
< 
List 
< "
CodigosVerificacionDTO (
>( )
>) *
Listar+ 1
(1 2
)2 3
;3 4
Task 
< "
CodigosVerificacionDTO #
># $
Crear% *
(* +"
CodigosVerificacionDTO+ A
modeloB H
)H I
;I J
Task 
< "
CodigosVerificacionDTO #
># $
Buscar% +
(+ ,
string, 2
id3 5
)5 6
;6 7
} 
} ß
yC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\IChatServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{		 
public

 

	interface

 
IChatServicio

 "
{ 
Task 
< 
string 
? 
> #
VerificarExistenciaChat -
(- .
string. 4

idUsuario15 ?
,? @
stringA G

idUsuario2H R
)R S
;S T
Task 
< 
string 
> 
	GenerarId 
( 
)  
;  !
Task 
< 
List 
< 
ChatDTO 
> 
> 
Listar "
(" #
)# $
;$ %
Task 
< 
ChatDTO 
> 
Crear 
( 
CrearChatDTO (
modelo) /
)/ 0
;0 1
Task 
< 
ChatDTO 
> 
Buscar 
( 
string #
id$ &
)& '
;' (
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
Task 
< 
List 
< 
ChatDTO 
> 
> 
ListarPorIdPersona .
(. /
string/ 5
	idUsuario6 ?
)? @
;@ A
} 
} æ

âC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\Contrato\ICategoriaPublicacionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
. 
Contrato  
{ 
public 

	interface )
ICategoriaPublicacionServicio 2
{ 
Task 
< 
List 
< #
CategoriaPublicacionDTO )
>) *
>* +
Listar, 2
(2 3
)3 4
;4 5
Task 
< #
CategoriaPublicacionDTO $
>$ %
Crear& +
(+ ,#
CategoriaPublicacionDTO, C
modeloD J
)J K
;K L
Task 
< 
bool 
> 
Editar 
( #
CategoriaPublicacionDTO 1
modelo2 8
)8 9
;9 :
Task 
< #
CategoriaPublicacionDTO $
>$ %
Buscar& ,
(, -
string- 3
id4 6
)6 7
;7 8
Task 
< 
bool 
> 
Eliminar 
( 
string "
id# %
)% &
;& '
} 
} ÂM
vC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\ContactanosServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
ContactanosServicio $
:% & 
IContactanosServicio' ;
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Contactanos. 9
>9 :#
_contactanosRepositorio; R
;R S
private 
readonly 
IMapper  
_mapper! (
;( )
private 
string 
_correoEmisor $
=% &
$str' ?
;? @
private 
string $
_correoEmisorContrasenia /
=0 1
$str2 G
;G H
private 
string 
servidorSMTP #
=$ %
$str& 6
;6 7
private 
int 

puertoSMTP 
=  
$num! $
;$ %
public 
ContactanosServicio "
(" # 
IRepositorioGenerico# 7
<7 8
Contactanos8 C
>C D"
contactanosRepositorioE [
,[ \
IMapper] d
mappere k
)k l
{ 	#
_contactanosRepositorio #
=$ %"
contactanosRepositorio& <
;< =
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ContactanosDTO (
>( )
Buscar* 0
(0 1
string1 7
id8 :
): ;
{   	
try!! 
{"" 
var## 
queryContactanos## $
=##% &#
_contactanosRepositorio##' >
.##> ?
Obtener##? F
(##F G
x##G H
=>##I K
x##L M
.##M N
Id##N P
==##Q S
id##T V
)##V W
;##W X
return$$ 
_mapper$$ 
.$$ 
Map$$ "
<$$" #
ContactanosDTO$$# 1
>$$1 2
($$2 3
queryContactanos$$3 C
)$$C D
;$$D E
}%% 
catch&& 
{'' 
throw(( 
;(( 
})) 
}** 	
public,, 
async,, 
Task,, 
<,, 
ContactanosDTO,, (
>,,( )
Crear,,* /
(,,/ 0
ContactanosDTO,,0 >
modelo,,? E
),,E F
{-- 	
try.. 
{// 
var00 
contactanosCreado00 %
=00& '
await00( -#
_contactanosRepositorio00. E
.00E F
Crear00F K
(00K L
_mapper00L S
.00S T
Map00T W
<00W X
Contactanos00X c
>00c d
(00d e
modelo00e k
)00k l
)00l m
;00m n
if11 
(11 
contactanosCreado11 %
.11% &
Id11& (
==11) +
null11, 0
)110 1
throw22 
new22 
	Exception22 '
(22' (
$str22( :
)22: ;
;22; <
return33 
_mapper33 
.33 
Map33 "
<33" #
ContactanosDTO33# 1
>331 2
(332 3
contactanosCreado333 D
)33D E
;33E F
}44 
catch55 
{66 
throw77 
;77 
}88 
}99 	
public;; 
async;; 
Task;; 
<;; 
bool;; 
>;; 
Editar;;  &
(;;& '
ContactanosDTO;;' 5
modelo;;6 <
);;< =
{<< 	
try== 
{>> 
var?? 
contactanosModelo?? %
=??& '
_mapper??( /
.??/ 0
Map??0 3
<??3 4
Contactanos??4 ?
>??? @
(??@ A
modelo??A G
)??G H
;??H I
var@@ !
contactanosEncontrado@@ )
=@@* +
await@@, 1#
_contactanosRepositorio@@2 I
.@@I J
Obtener@@J Q
(@@Q R
x@@R S
=>@@T V
x@@W X
.@@X Y
Id@@Y [
==@@\ ^
modelo@@_ e
.@@e f
Id@@f h
)@@h i
;@@i j
ifAA 
(AA !
contactanosEncontradoAA )
==AA* ,
nullAA- 1
)AA1 2
throwBB 
newBB !
TaskCanceledExceptionBB 3
(BB3 4
$strBB4 K
)BBK L
;BBL M!
contactanosEncontradoCC %
.CC% &
DescripcionCC& 1
=CC2 3
contactanosModeloCC4 E
.CCE F
DescripcionCCF Q
;CCQ R
returnDD 
awaitDD #
_contactanosRepositorioDD 4
.DD4 5
EditarDD5 ;
(DD; <
contactanosModeloDD< M
)DDM N
;DDN O
}EE 
catchFF 
{GG 
throwHH 
;HH 
}II 
}JJ 	
publicLL 
asyncLL 
TaskLL 
<LL 
boolLL 
>LL 
EliminarLL  (
(LL( )
stringLL) /
idLL0 2
)LL2 3
{MM 	
tryNN 
{OO 
varPP !
contactanosEncontradoPP )
=PP* +
awaitPP, 1#
_contactanosRepositorioPP2 I
.PPI J
ObtenerPPJ Q
(PPQ R
xPPR S
=>PPT V
xPPW X
.PPX Y
IdPPY [
==PP\ ^
idPP_ a
)PPa b
;PPb c
ifQQ 
(QQ !
contactanosEncontradoQQ )
==QQ* ,
nullQQ- 1
)QQ1 2
throwRR 
newRR !
TaskCanceledExceptionRR 3
(RR3 4
$strRR4 K
)RRK L
;RRL M
returnSS 
awaitSS #
_contactanosRepositorioSS 4
.SS4 5
EliminarSS5 =
(SS= >!
contactanosEncontradoSS> S
)SSS T
;SST U
}TT 
catchUU 
{VV 
throwWW 
;WW 
}XX 
}YY 	
public[[ 
Task[[ 
<[[ 
bool[[ 
>[[ 
EnviarCorreo[[ &
([[& '
string[[' -
correoDestino[[. ;
,[[; <
string[[= C
asunto[[D J
,[[J K
string[[L R
mensaje[[S Z
,[[Z [

RazonesDTO[[\ f
razon[[g l
,[[l m
string[[n t
correoRespuesta	[[u Ñ
)
[[Ñ Ö
{\\ 	
try]] 
{^^ 
MailMessage__ 
mail__  
=__! "
new__# &
MailMessage__' 2
(__2 3
)__3 4
;__4 5
mail`` 
.`` 
From`` 
=`` 
new`` 
MailAddress``  +
(``+ ,
_correoEmisor``, 9
)``9 :
;``: ;
mailaa 
.aa 
Toaa 
.aa 
Addaa 
(aa 
correoDestinoaa )
)aa) *
;aa* +
mailbb 
.bb 
Subjectbb 
=bb 
asuntobb %
;bb% &
maildd 
.dd 
Bodydd 
=dd 
$@"dd 
$strdj G
{jjG H
mensajejjH O
}jjO P
$strjmP I
{mmI J
correoRespuestammJ Y
}mmY Z
$strmmZ t
{mmt u
correoRespuesta	mmu Ñ
}
mmÑ Ö
$str	mnÖ 3
{nn3 4
razonnn4 9
.nn9 :
Nombrenn: @
}nn@ A
$strnrA 
"rr 
;rr 
mailtt 
.tt 

IsBodyHtmltt 
=tt  !
truett" &
;tt& '
mailuu 
.uu 
Priorityuu 
=uu 
MailPriorityuu  ,
.uu, -
Normaluu- 3
;uu3 4

SmtpClientww 
clienteSMTPww &
=ww' (
newww) ,

SmtpClientww- 7
(ww7 8
servidorSMTPww8 D
,wwD E

puertoSMTPwwF P
)wwP Q
{xx 
Credentialsyy 
=yy  !
newyy" %
NetworkCredentialyy& 7
(yy7 8
_correoEmisoryy8 E
,yyE F$
_correoEmisorContraseniayyG _
)yy_ `
,yy` a
	EnableSslzz 
=zz 
truezz  $
}{{ 
;{{ 
clienteSMTP|| 
.|| 
Send||  
(||  !
mail||! %
)||% &
;||& '
return}} 
Task}} 
.}} 

FromResult}} &
(}}& '
true}}' +
)}}+ ,
;}}, -
}~~ 
catch 
{
ÄÄ 
throw
ÅÅ 
;
ÅÅ 
}
ÇÇ 
}
ÉÉ 	
public
ÜÜ 
Task
ÜÜ 
<
ÜÜ 
List
ÜÜ 
<
ÜÜ 
ContactanosDTO
ÜÜ '
>
ÜÜ' (
>
ÜÜ( )
Listar
ÜÜ* 0
(
ÜÜ0 1
)
ÜÜ1 2
{
áá 	
try
àà 
{
ââ 
var
ää 
queryContactanos
ää $
=
ää% &%
_contactanosRepositorio
ää' >
.
ää> ?
	Consultar
ää? H
(
ääH I
)
ääI J
;
ääJ K
return
ãã 
Task
ãã 
.
ãã 

FromResult
ãã &
(
ãã& '
_mapper
ãã' .
.
ãã. /
Map
ãã/ 2
<
ãã2 3
List
ãã3 7
<
ãã7 8
ContactanosDTO
ãã8 F
>
ããF G
>
ããG H
(
ããH I
queryContactanos
ããI Y
)
ããY Z
)
ããZ [
;
ãã[ \
}
åå 
catch
çç 
{
éé 
throw
èè 
;
èè 
}
êê 
}
ëë 	
}
íí 
}ìì Ï$
~C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\CodigosVerificacionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class '
CodigosVerificacionServicio ,
:- .(
ICodigosVerificacionServicio/ K
{ 
private 
readonly  
IRepositorioGenerico -
<- .
CodigosVerificacion. A
>A B+
_codigosVerificacionRepositorioC b
;b c
private 
readonly 
IMapper  
_mapper! (
;( )
public '
CodigosVerificacionServicio *
(* + 
IRepositorioGenerico+ ?
<? @
CodigosVerificacion@ S
>S T*
codigosVerificacionRepositorioU s
,s t
IMapperu |
mapper	} É
)
É Ñ
{ 	+
_codigosVerificacionRepositorio +
=, -*
codigosVerificacionRepositorio. L
;L M
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< "
CodigosVerificacionDTO 0
>0 1
Buscar2 8
(8 9
string9 ?
id@ B
)B C
{ 	
try 
{ 
var )
codigosVerificacionEncontrada 1
=2 3
await4 9+
_codigosVerificacionRepositorio: Y
.Y Z
ObtenerZ a
(a b
xb c
=>d f
xg h
.h i
Idi k
==l n
ido q
)q r
;r s
if 
( )
codigosVerificacionEncontrada 1
==2 4
null5 9
)9 :
throw 
new !
TaskCanceledException 3
(3 4
$str4 V
)V W
;W X
return 
_mapper 
. 
Map "
<" #"
CodigosVerificacionDTO# 9
>9 :
(: ;)
codigosVerificacionEncontrada; X
)X Y
;Y Z
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' "
CodigosVerificacionDTO'' 0
>''0 1
Crear''2 7
(''7 8"
CodigosVerificacionDTO''8 N
modelo''O U
)''U V
{(( 	
try)) 
{** 
var++ %
codigosVerificacionCreada++ -
=++. /
await++0 5+
_codigosVerificacionRepositorio++6 U
.++U V
Crear++V [
(++[ \
_mapper++\ c
.++c d
Map++d g
<++g h
CodigosVerificacion++h {
>++{ |
(++| }
modelo	++} É
)
++É Ñ
)
++Ñ Ö
;
++Ö Ü
if,, 
(,, %
codigosVerificacionCreada,, -
.,,- .
Id,,. 0
==,,1 3
null,,4 8
),,8 9
throw-- 
new-- 
	Exception-- '
(--' (
$str--( :
)--: ;
;--; <
return.. 
_mapper.. 
... 
Map.. "
<.." #"
CodigosVerificacionDTO..# 9
>..9 :
(..: ;%
codigosVerificacionCreada..; T
)..T U
;..U V
}// 
catch00 
{11 
throw22 
;22 
}33 
}44 	
public66 
async66 
Task66 
<66 
List66 
<66 "
CodigosVerificacionDTO66 5
>665 6
>666 7
Listar668 >
(66> ?
)66? @
{77 	
try88 
{99 
var:: $
queryCodigosVerificacion:: ,
=::- .
await::/ 4+
_codigosVerificacionRepositorio::5 T
.::T U
	Consultar::U ^
(::^ _
)::_ `
;::` a
var;; $
listaCodigosVerificacion;; ,
=;;- .$
queryCodigosVerificacion;;/ G
.;;G H
ToList;;H N
(;;N O
);;O P
;;;P Q
return== 
_mapper== 
.== 
Map== "
<==" #
List==# '
<==' ("
CodigosVerificacionDTO==( >
>==> ?
>==? @
(==@ A$
listaCodigosVerificacion==A Y
)==Y Z
;==Z [
}>> 
catch?? 
{@@ 
throwAA 
;AA 
}BB 
}CC 	
}DD 
}EE ÄZ
oC:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\ChatServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class 
ChatServicio 
: 
IChatServicio  -
{ 
private 
readonly  
IRepositorioGenerico -
<- .
Chat. 2
>2 3
_chatRepositorio4 D
;D E
private 
readonly 
IMapper  
_mapper! (
;( )
public 
ChatServicio 
(  
IRepositorioGenerico 0
<0 1
Chat1 5
>5 6
chatRepositorio7 F
,F G
IMapperH O
mapperP V
)V W
{ 	
_chatRepositorio 
= 
chatRepositorio .
;. /
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ChatDTO !
>! "
Buscar# )
() *
string* 0
id1 3
)3 4
{ 	
try 
{ 
var 
	queryChat 
= 
await  %
_chatRepositorio& 6
.6 7
Obtener7 >
(> ?
x? @
=>A C
xD E
.E F
IdF H
==I K
idL N
)N O
;O P
if 
( 
	queryChat 
==  
null! %
)% &
throw 
new !
TaskCanceledException 3
(3 4
$str4 G
)G H
;H I
return   
_mapper   
.   
Map   "
<  " #
ChatDTO  # *
>  * +
(  + ,
	queryChat  , 5
)  5 6
;  6 7
}!! 
catch"" 
{## 
throw$$ 
;$$ 
}%% 
}&& 	
public(( 
async(( 
Task(( 
<(( 
ChatDTO(( !
>((! "
Crear((# (
(((( )
CrearChatDTO(() 5
modelo((6 <
)((< =
{)) 	
try** 
{++ 
var,, 
chat,, 
=,, 
_mapper,, "
.,," #
Map,,# &
<,,& '
Chat,,' +
>,,+ ,
(,,, -
modelo,,- 3
),,3 4
;,,4 5
chat-- 
.-- 
Id-- 
=-- 
await-- 
	GenerarId--  )
(--) *
)--* +
;--+ ,
chat.. 
... 
FechaCreacion.. "
=..# $
DateTime..% -
...- .
Now... 1
;..1 2
var00 

chatCreado00 
=00  
await00! &
_chatRepositorio00' 7
.007 8
Crear008 =
(00= >
chat00> B
)00B C
;00C D
if22 
(22 

chatCreado22 
.22 
Id22 !
==22" $
null22% )
)22) *
throw33 
new33 
	Exception33 '
(33' (
$str33( :
)33: ;
;33; <
return55 
_mapper55 
.55 
Map55 "
<55" #
ChatDTO55# *
>55* +
(55+ ,

chatCreado55, 6
)556 7
;557 8
}66 
catch77 
{88 
throw99 
;99 
}:: 
};; 	
public>> 
async>> 
Task>> 
<>> 
bool>> 
>>> 
Eliminar>>  (
(>>( )
string>>) /
id>>0 2
)>>2 3
{?? 	
try@@ 
{AA 
varBB 
chatEncontradoBB "
=BB# $
awaitBB% *
_chatRepositorioBB+ ;
.BB; <
ObtenerBB< C
(BBC D
xBBD E
=>BBF H
xBBI J
.BBJ K
IdBBK M
==BBN P
idBBQ S
)BBS T
;BBT U
ifCC 
(CC 
chatEncontradoCC "
==CC# %
nullCC& *
)CC* +
throwDD 
newDD !
TaskCanceledExceptionDD 3
(DD3 4
$strDD4 G
)DDG H
;DDH I
boolEE 
	respuestaEE 
=EE  
awaitEE! &
_chatRepositorioEE' 7
.EE7 8
EliminarEE8 @
(EE@ A
chatEncontradoEEA O
)EEO P
;EEP Q
ifFF 
(FF 
!FF 
	respuestaFF 
)FF 
throwGG 
newGG !
TaskCanceledExceptionGG 3
(GG3 4
$strGG4 I
)GGI J
;GGJ K
returnHH 
	respuestaHH  
;HH  !
}II 
catchJJ 
{KK 
throwLL 
;LL 
}MM 
}NN 	
publicPP 
asyncPP 
TaskPP 
<PP 
ListPP 
<PP 
ChatDTOPP &
>PP& '
>PP' (
ListarPP) /
(PP/ 0
)PP0 1
{QQ 	
tryRR 
{SS 
varTT 
	queryChatTT 
=TT 
awaitTT  %
_chatRepositorioTT& 6
.TT6 7
	ConsultarTT7 @
(TT@ A
)TTA B
;TTB C
ifUU 
(UU 
	queryChatUU 
==UU  
nullUU! %
)UU% &
throwVV 
newVV !
TaskCanceledExceptionVV 3
(VV3 4
$strVV4 B
)VVB C
;VVC D
returnWW 
_mapperWW 
.WW 
MapWW "
<WW" #
ListWW# '
<WW' (
ChatDTOWW( /
>WW/ 0
>WW0 1
(WW1 2
	queryChatWW2 ;
.WW; <
ToListWW< B
(WWB C
)WWC D
)WWD E
;WWE F
}XX 
catchYY 
{ZZ 
throw[[ 
;[[ 
}\\ 
}]] 	
public__ 
async__ 
Task__ 
<__ 
List__ 
<__ 
ChatDTO__ &
>__& '
>__' (
ListarPorIdPersona__) ;
(__; <
string__< B
	idUsuario__C L
)__L M
{`` 	
tryaa 
{bb 
varcc 
	queryChatcc 
=cc 
awaitcc  %
_chatRepositoriocc& 6
.cc6 7
	Consultarcc7 @
(cc@ A
xccA B
=>ccC E
xccF G
.ccG H

Usuario1IdccH R
==ccS U
	idUsuarioccV _
||cc` b
xccc d
.ccd e

Usuario2Idcce o
==ccp r
	idUsuarioccs |
)cc| }
;cc} ~
ifdd 
(dd 
	queryChatdd 
==dd  
nulldd! %
)dd% &
throwee 
newee !
TaskCanceledExceptionee 3
(ee3 4
$stree4 B
)eeB C
;eeC D
returnff 
_mapperff 
.ff 
Mapff "
<ff" #
Listff# '
<ff' (
ChatDTOff( /
>ff/ 0
>ff0 1
(ff1 2
	queryChatff2 ;
.ff; <
ToListff< B
(ffB C
)ffC D
)ffD E
;ffE F
}gg 
catchhh 
{ii 
throwjj 
;jj 
}kk 
}ll 	
publicnn 
asyncnn 
Tasknn 
<nn 
stringnn  
>nn  !
	GenerarIdnn" +
(nn+ ,
)nn, -
{oo 	
varpp 
chatspp 
=pp 
awaitpp 
_chatRepositoriopp .
.pp. /
	Consultarpp/ 8
(pp8 9
)pp9 :
;pp: ;
varrr 
numerosExistentesrr !
=rr" #
chatsrr$ )
.ss 
Wheress 
(ss 
css 
=>ss 
css 
.ss 
Idss  
!=ss! #
nullss$ (
&&ss) +
css, -
.ss- .
Idss. 0
.ss0 1

StartsWithss1 ;
(ss; <
$strss< @
)ss@ A
)ssA B
.tt 
AsEnumerablett 
(tt 
)tt 
.uu 
Selectuu 
(uu 
cuu 
=>uu 
{vv 
varww 
parteNumeroww #
=ww$ %
cww& '
.ww' (
Idww( *
.ww* +
	Substringww+ 4
(ww4 5
$numww5 6
)ww6 7
;ww7 8
returnxx 
intxx 
.xx 
TryParsexx '
(xx' (
parteNumeroxx( 3
,xx3 4
outxx5 8
intxx9 <
numeroxx= C
)xxC D
?xxE F
numeroxxG M
:xxN O
$numxxP Q
;xxQ R
}yy 
)yy 
;yy 
int{{ 
	maxNumero{{ 
={{ 
numerosExistentes{{ -
.{{- .
Any{{. 1
({{1 2
){{2 3
?{{4 5
numerosExistentes{{6 G
.{{G H
Max{{H K
({{K L
){{L M
:{{N O
$num{{P Q
;{{Q R
int}} 
nuevoNumero}} 
=}} 
	maxNumero}} '
+}}( )
$num}}* +
;}}+ ,
string 
nuevoId 
= 
$" 
$str !
{! "
nuevoNumero" -
.- .
ToString. 6
(6 7
$str7 ;
); <
}< =
"= >
;> ?
return
ÅÅ 
nuevoId
ÅÅ 
;
ÅÅ 
}
ÇÇ 	
public
ÑÑ 
async
ÑÑ 
Task
ÑÑ 
<
ÑÑ 
string
ÑÑ  
?
ÑÑ  !
>
ÑÑ! "%
VerificarExistenciaChat
ÑÑ# :
(
ÑÑ: ;
string
ÑÑ; A

idUsuario1
ÑÑB L
,
ÑÑL M
string
ÑÑN T

idUsuario2
ÑÑU _
)
ÑÑ_ `
{
ÖÖ 	
try
ÜÜ 
{
áá 
if
àà 
(
àà 

idUsuario1
àà 
==
àà !

idUsuario2
àà" ,
)
àà, -
return
ââ 
null
ââ 
;
ââ  
var
ää 
chats
ää 
=
ää 
await
ää !
_chatRepositorio
ää" 2
.
ää2 3
	Consultar
ää3 <
(
ää< =
x
ää= >
=>
ää? A
(
ãã 
x
ãã 
.
ãã 

Usuario1Id
ãã !
==
ãã" $

idUsuario1
ãã% /
&&
ãã0 2
x
ãã3 4
.
ãã4 5

Usuario2Id
ãã5 ?
==
ãã@ B

idUsuario2
ããC M
)
ããM N
||
ããO Q
(
åå 
x
åå 
.
åå 

Usuario1Id
åå !
==
åå" $

idUsuario2
åå% /
&&
åå0 2
x
åå3 4
.
åå4 5

Usuario2Id
åå5 ?
==
åå@ B

idUsuario1
ååC M
)
ååM N
)
ååN O
;
ååO P
var
éé 
chatExistente
éé !
=
éé" #
chats
éé$ )
.
éé) *
FirstOrDefault
éé* 8
(
éé8 9
)
éé9 :
;
éé: ;
return
êê 
chatExistente
êê $
?
êê$ %
.
êê% &
Id
êê& (
;
êê( )
}
ëë 
catch
íí 
{
ìì 
throw
îî 
;
îî 
}
ïï 
}
ññ 	
}
ôô 
}öö Ó?
C:\Users\kevin\Downloads\programacion\Proyecto web\Proyecto-UTrade\UTrade Backend\BLL\Servicios\CategoriaPublicacionServicio.cs
	namespace 	
BLL
 
. 
	Servicios 
{ 
public 

class (
CategoriaPublicacionServicio -
:. /)
ICategoriaPublicacionServicio0 M
{ 
private 
readonly  
IRepositorioGenerico -
<- . 
CategoriaPublicacion. B
>B C,
 _categoriaPublicacionRepositorioD d
;d e
private 
readonly 
IMapper  
_mapper! (
;( )
public (
CategoriaPublicacionServicio +
(+ , 
IRepositorioGenerico, @
<@ A 
CategoriaPublicacionA U
>U V+
categoriaPublicacionRepositorioW v
,v w
IMapperx 
mapper
Ä Ü
)
Ü á
{ 	,
 _categoriaPublicacionRepositorio ,
=- .+
categoriaPublicacionRepositorio/ N
;N O
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< #
CategoriaPublicacionDTO 1
>1 2
Buscar3 9
(9 :
string: @
idA C
)C D
{ 	
try 
{ 
var *
categoriaPublicacionEncontrada 2
=3 4
await5 :,
 _categoriaPublicacionRepositorio; [
.[ \
Obtener\ c
(c d
xd e
=>f h
xi j
.j k
Idk m
==n p
idq s
)s t
;t u
if 
( *
categoriaPublicacionEncontrada 2
==3 5
null6 :
): ;
throw 
new !
TaskCanceledException 3
(3 4
$str4 X
)X Y
;Y Z
return 
_mapper 
. 
Map "
<" ##
CategoriaPublicacionDTO# :
>: ;
(; <*
categoriaPublicacionEncontrada< Z
)Z [
;[ \
}   
catch!! 
{"" 
throw## 
;## 
}$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' #
CategoriaPublicacionDTO'' 1
>''1 2
Crear''3 8
(''8 9#
CategoriaPublicacionDTO''9 P
modelo''Q W
)''W X
{(( 	
try)) 
{** 
var++ &
categoriaPublicacionCreada++ .
=++/ 0
await++1 6,
 _categoriaPublicacionRepositorio++7 W
.++W X
Crear++X ]
(++] ^
_mapper++^ e
.++e f
Map++f i
<++i j 
CategoriaPublicacion++j ~
>++~ 
(	++ Ä
modelo
++Ä Ü
)
++Ü á
)
++á à
;
++à â
if,, 
(,, &
categoriaPublicacionCreada,, .
.,,. /
Id,,/ 1
==,,2 4
null,,5 9
),,9 :
throw-- 
new-- 
	Exception-- '
(--' (
$str--( :
)--: ;
;--; <
return.. 
_mapper.. 
... 
Map.. "
<.." ##
CategoriaPublicacionDTO..# :
>..: ;
(..; <&
categoriaPublicacionCreada..< V
)..V W
;..W X
}// 
catch00 
{11 
throw22 
;22 
}33 
}44 	
public66 
async66 
Task66 
<66 
bool66 
>66 
Editar66  &
(66& '#
CategoriaPublicacionDTO66' >
modelo66? E
)66E F
{77 	
try88 
{99 
var:: &
categoriaPublicacionModelo:: .
=::/ 0
_mapper::1 8
.::8 9
Map::9 <
<::< = 
CategoriaPublicacion::= Q
>::Q R
(::R S
modelo::S Y
)::Y Z
;::Z [
var;; *
categoriaPublicacionEncontrada;; 2
=;;3 4
await;;5 :,
 _categoriaPublicacionRepositorio;;; [
.;;[ \
Obtener;;\ c
(;;c d
x;;d e
=>;;f h
x;;i j
.;;j k
Id;;k m
==;;n p
modelo;;q w
.;;w x
Id;;x z
);;z {
;;;{ |
if<< 
(<< *
categoriaPublicacionEncontrada<< 2
==<<3 5
null<<6 :
)<<: ;
throw== 
new== !
TaskCanceledException== 3
(==3 4
$str==4 X
)==X Y
;==Y Z*
categoriaPublicacionEncontrada>> .
.>>. /
Nombre>>/ 5
=>>6 7&
categoriaPublicacionModelo>>8 R
.>>R S
Nombre>>S Y
;>>Y Z
bool?? 
	respuesta?? 
=??  
await??! &,
 _categoriaPublicacionRepositorio??' G
.??G H
Editar??H N
(??N O*
categoriaPublicacionEncontrada??O m
)??m n
;??n o
if@@ 
(@@ 
!@@ 
	respuesta@@ 
)@@ 
throwAA 
newAA !
TaskCanceledExceptionAA 3
(AA3 4
$strAA4 G
)AAG H
;AAH I
returnBB 
	respuestaBB  
;BB  !
}CC 
catchDD 
{EE 
throwFF 
;FF 
}GG 
}HH 	
publicJJ 
asyncJJ 
TaskJJ 
<JJ 
boolJJ 
>JJ 
EliminarJJ  (
(JJ( )
stringJJ) /
idJJ0 2
)JJ2 3
{KK 	
tryLL 
{MM 
varNN *
categoriaPublicacionEncontradaNN 2
=NN3 4
awaitNN5 :,
 _categoriaPublicacionRepositorioNN; [
.NN[ \
ObtenerNN\ c
(NNc d
xNNd e
=>NNf h
xNNi j
.NNj k
IdNNk m
==NNn p
idNNq s
)NNs t
;NNt u
ifOO 
(OO *
categoriaPublicacionEncontradaOO 2
==OO3 5
nullOO6 :
)OO: ;
throwPP 
newPP !
TaskCanceledExceptionPP 3
(PP3 4
$strPP4 X
)PPX Y
;PPY Z
boolQQ 
	respuestaQQ 
=QQ  
awaitQQ! &,
 _categoriaPublicacionRepositorioQQ' G
.QQG H
EliminarQQH P
(QQP Q*
categoriaPublicacionEncontradaQQQ o
)QQo p
;QQp q
ifRR 
(RR 
!RR 
	respuestaRR 
)RR 
throwSS 
newSS !
TaskCanceledExceptionSS 3
(SS3 4
$strSS4 I
)SSI J
;SSJ K
returnTT 
	respuestaTT  
;TT  !
}UU 
catchVV 
{WW 
throwXX 
;XX 
}YY 
}ZZ 	
public\\ 
async\\ 
Task\\ 
<\\ 
List\\ 
<\\ #
CategoriaPublicacionDTO\\ 6
>\\6 7
>\\7 8
Listar\\9 ?
(\\? @
)\\@ A
{]] 	
try^^ 
{__ 
var`` %
queryCategoriaPublicacion`` -
=``. /
await``0 5,
 _categoriaPublicacionRepositorio``6 V
.``V W
	Consultar``W `
(``` a
)``a b
;``b c
varaa '
listaCategoriaPublicacionesaa /
=aa0 1%
queryCategoriaPublicacionaa2 K
.aaK L
ToListaaL R
(aaR S
)aaS T
;aaT U
returncc 
_mappercc 
.cc 
Mapcc "
<cc" #
Listcc# '
<cc' (#
CategoriaPublicacionDTOcc( ?
>cc? @
>cc@ A
(ccA B'
listaCategoriaPublicacionesccB ]
)cc] ^
;cc^ _
}dd 
catchee 
{ff 
throwgg 
;gg 
}hh 
}ii 	
}jj 
}kk 