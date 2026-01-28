import{a as E}from"./chunk-GW7PPLHE.js";import{f as P,g as O,h as k,m as S}from"./chunk-M4FQTJRQ.js";import{Da as l,Fa as x,Ka as o,La as s,Ma as h,Na as j,Oa as g,Pa as _,Qa as C,Ra as M,Sa as z,Ta as d,Ua as y,V as u,Va as w,W as c,da as p,la as v,ma as b,na as i,ra as q,va as f,ya as m}from"./chunk-7UNYG63N.js";var I=["starsCanvas"];function R(n,e){if(n&1&&(o(0,"a",17),d(1," \u{1F4F7} Ver imagen "),s()),n&2){let a=e.$implicit;l("href",a,b)}}function F(n,e){if(n&1&&(o(0,"div",15),m(1,R,2,1,"a",16),s()),n&2){let a=_().$implicit;i(),l("ngForOf",a.imagenes)}}function V(n,e){if(n&1){let a=j();o(0,"div",7),g("click",function(){let r=u(a).$implicit;return c(r.abierto=!r.abierto)}),o(1,"div",8)(2,"span",9),d(3),s(),o(4,"span",10),d(5),s(),o(6,"span",11),d(7),s()(),o(8,"div",12)(9,"p",13),g("click",function(r){return u(a),c(r.stopPropagation())}),s(),m(10,F,2,1,"div",14),s()()}if(n&2){let a=e.$implicit;i(3),y(a.fecha),i(2),y(a.titulo),i(2),w(" ",a.abierto?"\u2212":"+"," "),i(),x("abierto",a.abierto),i(),l("innerHTML",a.texto,v),i(),l("ngIf",a.imagenes==null?null:a.imagenes.length)}}var H=class n{constructor(e){this.http=e}canvasRef;ctx;stars=[];animationId;width=window.innerWidth;height=window.innerHeight;ngAfterViewInit(){this.initCanvas(),this.createStars(120),this.animate(),window.addEventListener("resize",this.onResize)}ngOnDestroy(){cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.onResize)}initCanvas(){let e=this.canvasRef.nativeElement;this.ctx=e.getContext("2d"),e.width=this.width,e.height=this.height}createStars(e){this.stars=Array.from({length:e}).map(()=>({x:Math.random()*this.width,y:Math.random()*this.height,size:Math.random()*2+.5,speed:Math.random()*.4+.1}))}animate=()=>{this.ctx.clearRect(0,0,this.width,this.height);for(let e of this.stars)e.y+=e.speed,e.y>this.height&&(e.y=0,e.x=Math.random()*this.width),this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.size,0,Math.PI*2),this.ctx.fillStyle=`rgba(255,255,255,${Math.random()*.5+.3})`,this.ctx.fill();this.animationId=requestAnimationFrame(this.animate)};onResize=()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.initCanvas()};items=p([]);ngOnInit(){this.http.get("assets/data/conten2.json").subscribe(e=>this.items.set(e.items))}showProposal=!1;onRingTap(){this.showProposal=!0}closeProposal(){this.showProposal=!1}accept(){this.showProposal=!1,this.explodeHearts()}floatingHearts=p([]);heartId=0;explodeHearts(){let a=Array.from({length:30}).map(()=>({id:this.heartId++,x:Math.random()*100,duration:2e3+Math.random()*2e3}));this.floatingHearts.update(t=>[...t,...a]),setTimeout(()=>{this.floatingHearts.set([])},4500)}entries=[{fecha:"16 Enero 2026",titulo:"Feliz 16 de enero \u2764\uFE0F",texto:`
      Feliz 16 de este mes de enero.
      te extra\xF1o y te amo tanto mi amor
      este 16 fui a recibirlo a las 00 en el parque porque solo siento que vivis en mis recuerdos
      fui varias veces a sentarme y recordar cuando nos conocimos y me hablabamos tambien fui a la noche a despedirlo
      y recordad cuando me contaste lo del titirolo jaja :')
      al final estoy usando esto como un foro para decirte cosas jajaja

      te queria decir que me habia descargado una app el jueves antes que te vayas con pablo
      pero no me anime a decirtelo el viernes porque no se me da cosa decirte algunas cosas, es
      un app para parejas teoricamente por si te la queres descargar se llama couple joy
      el tema es que nos tenemos que pasar un codigo que se reinicia cada 1 hora entonces debemo estar en contacto para
      pasarnos el codigo y poder usar la app juntos.
      yo pongo todo aca y no se si lees todas las cosas es mucho texto la verdad
    `,imagenes:[]},{fecha:"20 Enero 2026",titulo:"Primer d\xEDa en C\xF3rdoba",texto:`
      contando un poco mi estancia en cordoba me compre unas zapatillas puma que estan lindas la verdad te las queria mostrar pero nunca encontre el momento de
      decirte o nunca me anime hoy fui a retirar los lentes que me hice porque la semana pasada fui al oftalmologo y basicamente si necesito lentes para ver y estoy peor del ojo izquierodo encima
      la izquierda siempre empeora todo jaja  ya fuera de los chistes los lentes me quedan raro me hacen sentir raro pero bueno mientras pueda ver todo bien aunque sin lentes tambien veo,
      los lentes teoricamente traen filtro antiluz azul y anti reflejos que es lo que yo necesito gracias a la profesion que elegi pero bueno unas de tantas novedades que pasaron en estos 2 dias en cordoba

      queria decirte que para mi no es lo mismo ir a cordoba sin vos, me siento raro siento que me haces muy bien a mi y me gustaria poder causarte lo mismo

      ahora me estoy ahogando de los nervios y la angustia de viajar pero tengo que afrontarlo no me queda de otra opcion
      tuve lloradas durante el dia pero bueno nadie se puede enterar de eso porque mi mama sufre mas que yo jajaja

      pd: cuando quieras me pasas las fotos que nos sacamos asi
      las cargo aca o pasame la foto que vos quieras pero me gustaria tener todas jaja

    `,imagenes:["https://photos.app.goo.gl/ZMLwCfeVfRnKSUha9","https://photos.app.goo.gl/jd3z6SyxxEMnKeh67"]},{fecha:"23 de enero de 2026",titulo:"Viernes",texto:`
       Es dificil la verdad estar aca y eso que no llevo ni un dia, me largue a llorar de lo solo que estoy
      no me dieron la plata todavia de la universidad asi que me mori de hambre hasta las 16hs de aca 18 de argentina
      menos mal que la se\xF1ora que me alquila el lugar me presto plata sino nada, y no me contestan los hdpts
      sali a caminar y no se, no se que me pasa estoy re mal. conoci a uno de los chicos que esta aca tambien
      de intercambio es un mexicano buena onda, me cae bien pero somos nosotros dos y
      me dice que el tambien se siente solo asi que bueno con alguien puedo ahogar mis penas,
      me hizo probar unos dulces
      que trajo de mexico y yo me grabe para que vieras mi reaccion jaja...
      me da verguenza mostrarte mi reaccion pero no fue la gran cosa, no picaba el dulce
      no puedo sacarte de mi cabeza en todo pienzo en vos cualquier cosa que veo a donde voy me gustaria estar con vos y verte sonreir \u{1F61E}

      con el chico este que te dije, se llama robert jaja y me da un poco de gracia porque lo ves y se re nota que es mexicano
      la cosa es que fuimos al super y de paso me acompanio a que cambie unos dolares por pesos colombianos porque sino no puedo vivir literalmente
      y compre comida para cocinar, y papel aca esta barato creo, 1 dolar es 3640 pesos colombianos y si buscas bien conseguis cosas re baratas
      ponele un maple de huevo de 30 huevos sale 10000 o sea 5 mil pesos arge aprox no se

      te extra\xF1o mucho \u{1F61E}

      te dejo unos videos que grabe para que veas

      <a href="https://photos.app.goo.gl/ZMLwCfeVfRnKSUha9">video de la pieza ordenada</a>
      <a href="https://photos.app.goo.gl/jd3z6SyxxEMnKeh67">video de paseo</a>
      en el paseo me encontre con esta rosa china amarilla o creo que es una rosa china
      <a href="https://photos.app.goo.gl/zY1YEyaV8imt8zeQ6">rosa china?</a>
      la cuestion es que me llamo mucho la atencion de lo linda que era y estaba llena
      de esas el arbol o planta era muy linda que solo pense en vos cuando la vi
    `,imagenes:[]},{fecha:"24 de enero de 2026",titulo:"Sabado",texto:`
          bueno esto lo escribo despues de mandarte el ultimo mensaje
      me desperte y me meti a ba\xF1ar y cuando salgo y me veo en el espejo me di cuenta que la cadena del collar que nos pusimos
      ya esta marron jaja al final si las cadenas son malas<br>
      <a href="https://photos.app.goo.gl/uNVvW8xZsKyatVbdA">la prueba</a>
      <a href="https://photos.app.goo.gl/ib33uyJZNrUZyxuJ6">la prueba 2</a>
      pero bueno para la proxima ya comprare algo mejor, de mientras el dije sigue estando lindo
      y bien asi que por ese lado no habria problema ah el anillo tambien le esta pasando algo parecido pero en la parte que da a la palma
      capaz la humedad es.<br>

      ahora no se que voy a hacer durante el finde, salir a conocer pero me tengo que motivar o me quedaria en el depto
      a estudiar pero eso seria deprimente I guess sino tendria que buscar de ver una serie que me llame la atencion como para
      poder pasar el tiempo, no se porque siento que aca el tiempo dura demasiado en fin voy a estar actualizando la pagina cualquier cosas
      si la seguis viendo vas a poder estar al tanto y si no la ves nunca me voy a enterar pero de esta forma no me siento molesto
      ni que te estoy invadiendo el espacio que pediste, te amo

      bueno no sali nada de momento y no creo salir salvo que vaya a comprar algunas
      verduras para tener para cocinar ya son las 16:30 aca.
      sabes que cuando estaba cocinando eso de las 13:30 aca lleve unos huevos que compre para la cocina
      y me vi la mano y me senti no se emocionado cuando me vi el anillo de nuevo jaja
      si quiero que vos seas mi futura esposa :( hasta me saque una foto y todo para mirarlo depues y tener presente ese sentimiento

      <a href="https://photos.app.goo.gl/TiARYdLxD9mqb8FN7"> jajaj que verguenza debo dar</a>
      el chico de mexico me dio otro dulce mexicano y este lo voy a guardar para que lo comamos juntos
      <a href="https://photos.app.goo.gl/cSonhff76qQSQCHm6">dulce mexicano</a>



      No sabia que habiamos terminado pero bueno te pedi que me avisaras que desicion ibas a tomar

      yo aun te amo pero si preferis que te trate como que no te amo o como si no fuesemos nada esta bien, no se cual es la finalidad
      no se que vas a conseguir con esto yo siento que me alejas de a poco pero esta bien somos adultos los dos
      vos estas muy segura con esto y lo respeto

      espero que funcione

      cuidate mucho
    `,imagenes:[]},{fecha:"25 de enero de 2026",titulo:"Domingo",texto:`
      me cuesta mucho asimilar toda la situacion me duele mucho no se que me pasa mi mente como que lo quiere entener pero mi cuerpo lo esta rechazando
      dormi 3 horas anoche llore mucho, me desperte a las 7 y solo queria hablar con vos, sos una persona tan especial para mi
      y ahora tengo que seguir adelante solo

      todo esto lo cuento desde lo que siento yo, se que vos tenes tus sentimientos tambien y tus formas de ver las cosas, no te estoy minimizando ni mucho menos solo
      te cuento desde mi lado como se sienten las cosas, no quiero que te enojes ni lo mal interpretes porfavor!!!

      vos vas a poder estar al tanto de mi y de todo lo que te digo pero yo no de vos jaja eso me parece un poco injsto pero bueno que se yo

      yo tambien estoy recontra inseguro con algunos temas... y queria ayudarte a combatir tu inseguridad pero ya no se que pensar

      me parece bien que te quieras enfocar en vos ahora, pero no entiendo porque me tenes que hacer a un lado

      seguramente debo tener algun problema psicologico, es en lo unico que vengo pensando
      desde que nos vimos la ultima vez, no se sera el miedo al abandono o algo relacionado
      no me des mucha pelota a lo que escribo por las dudas, soy yo contra mi mente y mis sentimientos

      te dije que no te iba a contar mas como me siento
      porque siento que me hablas por lastima y me hace sentir mal tener pensar en eso pero bueno ayer me hablaste porque te dije que me sentia mal o eso senti
      me saque la foto con vos porque siento que eso te puede ayudar mas a lo que vos necesitas
      pero a mi me gusta tener fotos con vos :(

      dejando de lado los problemas que tengo con mi cabeza.

      me levante y no hice nada mas que actualizar la pagina, me comi la cabeza pensando anoche, para cambiar un poco de tema ayer sali a caminar para intentar hacerle una fotocopia a mi pasaporte y vi el primer
      oxxo de mi vida hasta le saque una foto para que vos tambien veas
      <a href="https://photos.app.goo.gl/to6cCviUWSMFMUah9">primer oxxo</a>
      por hoy no hice mas nada, ando bajon ya vere que hacer.

      bueno me prepare el mate y estuve una parte de la ma\xF1ana seleccionado horario de
      cursada y es muy diferente a como estoy acostumbrado y el resto de la ma\xF1ana (son las 13:30)
      actualizando esto para que se vea mass bonito porque la verdad que lo habia hecho feo
      ahora voy a ir a comer algo si es que me da ganas jaja

      <a href="https://photos.app.goo.gl/zMAfzbtvEqJFb5UR6">Seleccion de horarios</a>

      de paso te paso mis horarios de cursada como vengo acostumbrado a hacer

      <a href="https://photos.app.goo.gl/esHds3vkeCYFRNAJ9">horarios</a>

      bueno ya voy a arreglar porque no se pueden ver los links de mientras voy a dejar el formato subido
      para que te sea mas comodo ver todo

      robert me dijo de ir a una biblioteca gratis y le dije que si no tenia mas planes para
      entonces me saque la tarjeta de aca queria seria la sube de bsas y me movi asi fuimos y volvimos en
      el colectivo y todo bien menos mal todas las fotos que te pase no las voy a subir por aca jajaj
      mucho trabajo link por link y lo tengo que hacer asi porque me esta dando problemas porque
      supuestamente esta pesada la pagina que hago y si es verdad estoy subiendo todo en bruto
      en la bibliotea agarre un libro de ciberseguridad y me lei como 24 paginas masomenos muy lindo es
      se que a vos te gustaria visitar un lugar asi mucha naturaleza

      cuando nos ibamos pise un charco de agua y me moje toda las zapatillas y las medias jaja pero
      estoy bien dias frios me tocaron

      me cuesta mucho tratarte con indiferencia, vos sos el amor de mi vida :( esto es lo ultimo de momento despues voy a hacer una actualizacion para dejarlo mas lindo a todo porque bueno ahora esta mejorpero se puede mejorar, si vos ves algo que se pueda mejorar o te gustaria que agregue hacemelo saber
      <a href="https://photos.app.goo.gl/YoXqiZLCDkSrPcH79">vistas</a>
      <a href="https://photos.app.goo.gl/CZGrubMLDzvBuDBA9">El libro que me lei</a>
      <a href="https://photos.app.goo.gl/zRf9ntAMGwS6a7dS7">mas vistas</a>
      <a href="https://photos.app.goo.gl/tLKngcGURR8jdpVH9">por si te interesa</a>

      lei lo que pusiste, lo de leo ya sabes lo que pienso.
      sobre lo otro: se que estuve mal todo lo que me dijiste si lo tuve en cuenta y todo eso quiero correjirlo
      no quiero cometer los mismos errores, pero con las cosas que me diste siempre lo valore, la remera que me diste siempre
      dije que fue la mejor remera que me dieron, capaz no se demostrarlo pero estoy muy muy agredecido con todo lo que hiciste por mi
      yo por eso te pido perdon de verdad y que quiero que veas que todo va a ser diferente pero entiendo tu dolor y bronca
      no mereces estar deprimida y quiero ayudarte a estar bien pero bueno mi unica forma de ayudarte es darte tiempo
      aprendi tarde si pero para mi vos sos lo suficientemente importante para luchar por vos aunque tenga todo en contra
      solo decirte eso, pedirte perdon por lo que fui.

      yo volvi y me puse a leer un poco y hable con los chicos por llamada, cocine y ahora estoy viendo como hacer mas linda la pagina
      ya me cambie el collar por el te amo de los mil idiomas y el anillo no me hizo nada aun pero se decolora por abajo, el dije (si se dice asi en los anillos)
      sigue estando lindo
      por las dudas no vuelva a actualizar la pagina te deseo buenas noches, que descanses muy bien y exitos ma\xF1ana en el trabajo
      sos una gran persona, tenes mucho potencial y vas a llegar re lejos estoy seguro, estoy orgulloso de todo lo que logras
      segui adelante, sos muy fuerte

      pd: si te puedo ayudar con la pagina de las u\xF1as con alguna automatizacion, ver un chat bot, gestionando algo o recopilarte informacion avisame o algo parecido yo te ayudo
      `,imagenes:[]},{fecha:"26 de enero de 2026",titulo:"Lunes",texto:`
      Hoy me desperte mas temprano para ir a la universidad pero no me contesta mi cordinador al final termina siendo una mierda porque si debo solicitar ayuda no me sirve de nada tenerlo a el

      anoche me fui a dormir y me sentia un poco mal y use la remera que me diste y me dieron ganas de hablar con vos, por eso te decia que te iba a molestar no era nada importante, solo un capricho mio

      sabe que ayer mientras hablaba con los chicos, no me acuerdo como llegamos al tema fara me dice que el era muy amigo de mott y una vez se quizo suicicdar y dice que cuando le dieron esa noticio el se sintio horrible y normal le digo yo no es una noticia muy buena esa y de la nada me dice que no se me vaya a ocurrir hacer eso a mi jaja yo no se porque me lo dijo si nunca le dije a el eso y bueno me puse a llorar pero no se dio cuenta y eso me quedo dando vuelta la cabeza porque no recuerdo el contexto de la conversacion como para que me dijera algo asi en fin

      si mi coordinador no me responde supongo que me voy a ir a hacer un poco de ejercicio, me alegro que la pases bien, que tengas un lindo dia

      (9:14)Al final si vine a la universidad, me tom\xE9 mi primer Uber moto jaja es un quilombo ac\xE1 pero bueno era lo m\xE1s barato y gracias a qu\xE9 anduve con vos y me dijiste que no deber\xEDa hacer creo que no le genere muchos problemas al chico, una vez en la uni me registraron la cara para que pueda ingresar y despu\xE9s me mandaron a abrir una cuenta del banco y me atendi\xF3 una chica me empez\xF3 a pedir los datos y despu\xE9s que cree una clave din\xE1mica y resulta que a la clave din\xE1mica se le pone un nombre jaja as\xED que le puse tu nombre a la clave jaja y bueno la clave del banco la fecha de novios nuestra ahora estoy cansando, me est\xE1 matando la angustia no s\xE9 porque no s\xE9 que me est\xE1 haciendo mal pero me siento de la mierda la verdad me quiero ir a dormir nom\xE1s, la universidad es muy grande y linda ac\xE1 te pongo dos fotos que saque

      porque no estoy en \xF3ptimas condiciones pero despu\xE9s voy a sacar mejores espero, me dieron otro horario que es una mierda pero bueno ya est\xE1 intente pelear por cambiar el horario pero me dijeron que es el \xFAnico grupo que qued\xF3 as\xED que bue deberia salir a comprar m\xE1s cosas para comer pero a\xFAn no tengo plata espero que hoy o ma\xF1ana me den

      <a href="https://photos.app.goo.gl/ZTMvzZt86njv1CZV6">ean</a>

      (10:41)Ahora me va a dar un recorrido por la universidad y ya me voy a mi hogar \u{1F623}

      (11:36) llegue a la casas, me mostro toda la universidad y esta buena me dijo que hay psicologos para los alumnos asi que le pregunte como era eso, voy a empezar a ir para sanar y no ser tan insoportable jaja

      no se si responderte las cosas que me pones, no se si te gustaria que te diga algo, o que nomas lo lea
      te las respondo y despues me avisas cualquier cosa

      con el tema del alquiler no se si queres que le pregunte a mis papas si te alquilan o si te la dan a la casa de arriba, total yo te habia comentado que mi mama me la habian ofrecido para que vaya yo a vivir solo entonces no se, no se como van a estar las cosas entre nosotros pero si queres te hago esa averiguacion capaz que te sale mas barato supongo pero te queda un poco lejos vos decime

      exitos con las u\xF1as amor

      (18 hs) estuve tratando de actualizar la pagina pero se me fueron las ideas, tendria que reconstruir todo vuelta asi que voy a ver si puedo hacerlo mejor en otra rama sin alterar al que ya esta funcionando

      ando con el estomago cerrado no se que me pasa, pero bueno por los menos algo vengo comiendo unos huevos revueltos, tendria que ver de ma\xF1ana salir a comprar cosas para tener para cocinar, si es que me paga la universidad, encima hoy me llamo la due\xF1a del lugar para apurarme a pagar jajaja y le tuve que mostrar que yo hice todo y depende de la universidad pero se siente feo que te apuren asi

      me alegro que te hayan gustado los regalos, no te sientas mal jaja yo te queria regalar, tenia ganas y la posibilidad de hacerlo solo disfrutalos y se feliz en medida de lo posible el broche de metal no es bonito pero pense que te podria ser muy funcional cuando necesitas agarrar mucho pelo, ahi se completa mi regalo del 14 jaja ya no te voy a poder dar nada mas hasta que vuelva asi que no te sienta mal!!!!!
      te quiero
    `},{fecha:"27 de enero de 2026",titulo:"Martes",texto:`
      hoy fue una ma\xF1ana medio movida, me desperte y llame al banco donde me registre ayer porque ahora no me deja entrar no se porque, desde la llamada no me dieron ninguna solucion y encima mientras hacia la llamada me mandan un mensaje los due\xF1os de la casa para decirme cuanto debo pagar o sea mas presion
      en la llamada no me dieron ninguna solucion asi que dije \xA8me voy a hacer un poco de ejercicio en aca cerca\xA8 a dos cuadras masoemnos hay un un lugar re chico pero que tiene esas maquinas al aire libre, pero yo solo fui a hacer fondos y dominadas, volvi de hacer eso, estuve no se 30 min haciendo y me fui al banco a hablar a ver si de forma presencial me dan una solucion viable los hdpts pero anda, que espere 8 dias habiles, dentro de ese tiempo puede que me den una solucion

      ahora volvi y te estoy escribiendo esto mientras espero que se caliente el agua para ir a tomar unos mates, pero primero me voy a ba\xF1ar y despues a tomar unos matecitos y actualizar lo que me dijiste de la pagina que podria cambiar, espero que no sea tanto quilombo tu ma\xF1ana, sos una gran persona y vas a llegar muy lejos en la vida estoy seguro de eso, tenes muchisimo potencial lo puedo ver, no te desmotives :(

      bueno borraste todo jaja asi que me voy a poner a cambiar las letras que me acuerdo que me pusiste eso voy investigar diferentes tipo de fuentes por si te intersa las voy a estar viendo en
      <a href="fontpair.co">fonpair.co</a>

      sabes que me ba\xF1e y no sale agua caliente asi que me tuve que ba\xF1ar con agua fria, un horror pero bueno esta cochino lo peor es que si abria el agua fria salia mas fria, encima viste que cuando me ba\xF1o se me cae pelo normal digamos pero hoy fue mucho, muy abuso, que miedo a quedarme pelado
      <a href="https://photos.app.goo.gl/c2bdMF48vJpRckaR8">escribiendo este texto recien ba\xF1ado</a>

      vi la playlist que me compartiste, significa mucho para mi que te animes a contarme estas cosas, gracias de verdad la voy a analizar con detalle y perdon por hacer que tengas que colocar esas canciones en la playlist

      bueno cambie la fuente, puse una que no es muy atractiva supongo pero me hizo acordar a mi letra apenas la vi, igual la puedo cambiar si te parece

      estuvo lloviendo todo el dia, todo el dia hizo frio, desde que llegue hasta hoy solo frio y lluvia, es tremendo encima me vinieron a pedir que pague si o si la reserva de la habitacion porque mi cordinador dijo que le VIERNES recien me van a dar la plata entonces con la lluvia de mierda esta me tuve que ir a centro comercial a cambiar casi todos los dolares que traje para poder pagar la reserva, me quedan 40 dolares fisicos nomas y capaz que los cambie porque no creo llegar al viernes con lo que tengo ahora, asi que bueno hice el cambio y les pague a los pesados estos y ya me quede todo el dia en el depto, menos mal que me traje la campera nike para la lluvia pero a este ritmo creo que me voy a comprar un paraguas esta todo impresionante
      me siento cansado
    `},{fecha:"28 de enero de 2026",titulo:"Miercoles",texto:`Hola perdon por no poder hacerlo mas temprano

    anoche me quede escuchando tu playlist y me puse a llorar jaja y me dormi

    hoy me desperte mas tarde tenia que ir a la uni a las 12 asi que a las 11 me tenia que ir de aca y me desperte a las 10 masomenos, bueno si me desperte ma temprano pero mi cuerpo no esta bien asi que me quede en cama nomas y me dormi hasta las 10

    fui a la clase, medio meh la verdad como primera clase esta bien supongo, no me puede sorprender de momento, hice grupo con dos colombianos y cunado sali uno me acompa\xF1o y me iba hablando y no le entendia nada, no se si estoy medio sordo o el chico hablaba muy mal despues me tome un uber moto hasta mi departamente y se largo la lluvia no lo podia creer y el del uber me dijo que paremos assi que bue a esperar que pase un poco la lluvia...
    <a href="https://photos.app.goo.gl/bQXWAwdVikbBVNFp6"> lluvia de m...</a>

    y ahora a las 14:02 te estoy escribiendo esto, atorrante porque borras lo que escribis, me alegro mucho que la psicologa te haya ayudado o te haya dicho lo que necesitabas escuchar, si queres puedo tratar de conseguirte informacion sobre finales, parciales, tps, y unidades que se ven en adm de empresas

    yo se que no estamos en una buena condicion pero te queria decir que si queres podemos seguir nuestro mundo de minecraft pero jugando desde el cel, en caso de que si quieras tendria que ver como hacerlo y si no queres esta bien, bueno eso de momento es mi dia, tengo otra clase a las 16, ya te voy a pasar mejor horario pero no se donde dejarlo para que te sea mas comodo para vos, bueno despues lo actualizo te mando un beso


    bueno ya tuve la clase de las de las 16, duro una hora nomas pero todas estas clases son como de presentacion de la materia y cosas asi, essta materia se llama funding leadears y tiene muchas cosas de adm de empresas, ya te voy a pasar una foto de bibliografia si queres consultar, y de los temas que veo si te interesa consigo el material y tw lo paso ahora fui a consultar para ir al gym y menos mal que vine porque no es asi nomas, tenes que descargar una app y reervar un horario de entrenamiento si o si o sea que si yo cai para entrenar sin hcaer eso estaba en la B jaja pero bueno solo voy a venir los dias que tenga que venir a la uni los otros dias voy a hacer calistenia nomas tengo que esperar hasta lass 18 para tener seguridad informatic y no se que hacer.
    <a href="https://photos.app.goo.gl/yxBFUb7qwmXwDz679">temas adm?</a>

    mientras te escribia esto vinieron dos chicos y me preguntaron si antes de venir a la uni desayuno jaja muy random, parece que estan haciendo una encuesta o sondeo
    bueno no se, me voy a poner a escuchar musica para hacer tiempo, encima anda re mal el internet aca
  `}];static \u0275fac=function(a){return new(a||n)(q(S))};static \u0275cmp=f({type:n,selectors:[["app-sentiminetos"]],viewQuery:function(a,t){if(a&1&&C(I,7),a&2){let r;M(r=z())&&(t.canvasRef=r.first)}},decls:9,vars:1,consts:[["starsCanvas",""],[1,"page-wrapper"],[1,"background-kanji"],[1,"page-content"],[1,"stars-canvas"],[1,"diario-container"],["class","diario-card",3,"click",4,"ngFor","ngForOf"],[1,"diario-card",3,"click"],[1,"diario-header"],[1,"diario-fecha"],[1,"diario-titulo"],[1,"diario-icon"],[1,"diario-body"],[3,"click","innerHTML"],["class","diario-imagenes",4,"ngIf"],[1,"diario-imagenes"],["target","_blank",3,"href",4,"ngFor","ngForOf"],["target","_blank",3,"href"]],template:function(a,t){a&1&&(o(0,"div",1),h(1,"app-navbar"),o(2,"div",2),d(3,"\u611B"),s(),o(4,"div",3),h(5,"canvas",4,0),o(7,"div",5),m(8,V,11,7,"div",6),s()()()),a&2&&(i(8),l("ngForOf",t.entries))},dependencies:[E,k,P,O],styles:['.stars-canvas[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1}body[_ngcontent-%COMP%], .home-body[_ngcontent-%COMP%]{background-color:#4e0a0b;color:#f2eee8;min-height:100vh;margin:0;overflow-x:hidden}.background-kanji[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:50vw;font-family:"serif";color:#ffd1d414;z-index:0;pointer-events:none;-webkit-user-select:none;user-select:none;white-space:nowrap}.page-content[_ngcontent-%COMP%]{position:relative;z-index:2}.page-wrapper[_ngcontent-%COMP%]{min-height:100vh;background-color:#4e0a0b;color:#f2eee8;overflow-x:hidden}.titulo[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:4rem 1rem}.text1[_ngcontent-%COMP%]{max-width:720px;font-size:1.1rem;line-height:1.9;text-align:center;color:#f2eee8;font-family:Georgia,Times New Roman,serif}.cards-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;padding:32px}.card[_ngcontent-%COMP%]{border-radius:18px;overflow:hidden;box-shadow:0 14px 35px #00000059;transition:transform .4s ease}.card[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.card__img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.proposal-wrapper[_ngcontent-%COMP%]{height:60vh;display:flex;align-items:center;justify-content:center}.ring-touch[_ngcontent-%COMP%]{font-size:5rem;animation:_ngcontent-%COMP%_pulse 2s infinite;cursor:pointer;-webkit-user-select:none;user-select:none}.proposal-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:#4e0a0bd9;display:flex;align-items:center;justify-content:center;z-index:999}.proposal-box[_ngcontent-%COMP%]{background:#f2eee8;padding:30px;border-radius:20px;text-align:center;max-width:320px;animation:_ngcontent-%COMP%_fadeUp .6s ease}.proposal-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#4e0a0b;margin-bottom:10px}.proposal-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#90414d}.proposal-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:20px;background:#bf2a52;color:#fff;border:none;padding:12px 20px;border-radius:999px;font-size:1rem}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1)}50%{transform:scale(1.1)}}@keyframes _ngcontent-%COMP%_fadeUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.floating-hearts[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none;z-index:1000}.heart-float[_ngcontent-%COMP%]{position:absolute;bottom:-10%;font-size:2rem;animation-name:_ngcontent-%COMP%_floatUp;animation-timing-function:ease-out}@keyframes _ngcontent-%COMP%_floatUp{0%{transform:translateY(0) scale(.8);opacity:1}to{transform:translateY(-120vh) scale(1.4);opacity:0}}.video-amor[_ngcontent-%COMP%]{width:100%;max-width:500px;border-radius:12px;display:block;margin:20px auto}.diario-container[_ngcontent-%COMP%]{max-width:720px;margin:40px auto;display:flex;flex-direction:column;gap:20px}.diario-card[_ngcontent-%COMP%]{background:#ffffff0a;border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;cursor:pointer;backdrop-filter:blur(6px);box-shadow:0 8px 25px #00000059;transition:transform .2s ease}.diario-card[_ngcontent-%COMP%]:hover{transform:translateY(-2px)}.diario-header[_ngcontent-%COMP%]{padding:16px 20px;display:flex;justify-content:space-between;align-items:center;color:#ffd1d4;font-weight:600;font-size:1.05rem}.diario-fecha[_ngcontent-%COMP%]{color:#f2eee8;font-size:.9rem}.diario-icon[_ngcontent-%COMP%]{font-size:1.4rem;color:#bf2a52}.diario-body[_ngcontent-%COMP%]{max-height:0;overflow:hidden;transition:max-height .6s ease;padding:0 20px}.diario-body.abierto[_ngcontent-%COMP%]{max-height:5500px;padding-bottom:18px}.diario-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{white-space:pre-line;line-height:1.8;color:#f2eee8}.diario-imagenes[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-top:8px;color:#ff9fb2;text-decoration:none}.diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:link, .diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited, .diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active, .diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:-webkit-any-link{color:#f7b7c8!important;text-decoration:none!important;font-weight:500}.diario-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{white-space:pre-line}']})};export{H as SentiminetosComponent};
