import{a as E}from"./chunk-GW7PPLHE.js";import{f as P,g as z,h as S,m as k}from"./chunk-M4FQTJRQ.js";import{Da as r,Fa as q,Ka as o,La as i,Ma as c,Na as x,Oa as _,Pa as C,Qa as M,Ra as w,Sa as j,Ta as d,Ua as u,V as h,Va as O,W as g,da as p,la as f,ma as v,na as n,ra as b,va as y,ya as m}from"./chunk-7UNYG63N.js";var F=["starsCanvas"];function H(t,e){if(t&1&&(o(0,"a",17),d(1," \u{1F4F7} Ver imagen "),i()),t&2){let a=e.$implicit;r("href",a,v)}}function R(t,e){if(t&1&&(o(0,"div",15),m(1,H,2,1,"a",16),i()),t&2){let a=C().$implicit;n(),r("ngForOf",a.imagenes)}}function D(t,e){if(t&1){let a=x();o(0,"div",7),_("click",function(){let l=h(a).$implicit;return g(l.abierto=!l.abierto)}),o(1,"div",8)(2,"span",9),d(3),i(),o(4,"span",10),d(5),i(),o(6,"span",11),d(7),i()(),o(8,"div",12),c(9,"p",13),m(10,R,2,1,"div",14),i()()}if(t&2){let a=e.$implicit;n(3),u(a.fecha),n(2),u(a.titulo),n(2),O(" ",a.abierto?"\u2212":"+"," "),n(),q("abierto",a.abierto),n(),r("innerHTML",a.texto,f),n(),r("ngIf",a.imagenes==null?null:a.imagenes.length)}}var I=class t{constructor(e){this.http=e}canvasRef;ctx;stars=[];animationId;width=window.innerWidth;height=window.innerHeight;ngAfterViewInit(){this.initCanvas(),this.createStars(120),this.animate(),window.addEventListener("resize",this.onResize)}ngOnDestroy(){cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.onResize)}initCanvas(){let e=this.canvasRef.nativeElement;this.ctx=e.getContext("2d"),e.width=this.width,e.height=this.height}createStars(e){this.stars=Array.from({length:e}).map(()=>({x:Math.random()*this.width,y:Math.random()*this.height,size:Math.random()*2+.5,speed:Math.random()*.4+.1}))}animate=()=>{this.ctx.clearRect(0,0,this.width,this.height);for(let e of this.stars)e.y+=e.speed,e.y>this.height&&(e.y=0,e.x=Math.random()*this.width),this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.size,0,Math.PI*2),this.ctx.fillStyle=`rgba(255,255,255,${Math.random()*.5+.3})`,this.ctx.fill();this.animationId=requestAnimationFrame(this.animate)};onResize=()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.initCanvas()};items=p([]);ngOnInit(){this.http.get("assets/data/conten2.json").subscribe(e=>this.items.set(e.items))}showProposal=!1;onRingTap(){this.showProposal=!0}closeProposal(){this.showProposal=!1}accept(){this.showProposal=!1,this.explodeHearts()}floatingHearts=p([]);heartId=0;explodeHearts(){let a=Array.from({length:30}).map(()=>({id:this.heartId++,x:Math.random()*100,duration:2e3+Math.random()*2e3}));this.floatingHearts.update(s=>[...s,...a]),setTimeout(()=>{this.floatingHearts.set([])},4500)}entries=[{fecha:"16 Enero 2026",titulo:"Feliz 16 de enero \u2764\uFE0F",texto:`
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

      vos me dijiste que queres que siga subinedo a la pagina para saber que no cambio y lo entiendo tampoco es que lo iba a dejar de hacer
      porque aunque no hablemos siento que me lees y me di cuenta que si lo haces me gustas mucho pero como te dije si sentis que yo ya no voy mas para tu vida
      toma la desicion y avisame...

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

      `,imagenes:[]}];static \u0275fac=function(a){return new(a||t)(b(k))};static \u0275cmp=y({type:t,selectors:[["app-sentiminetos"]],viewQuery:function(a,s){if(a&1&&M(F,7),a&2){let l;w(l=j())&&(s.canvasRef=l.first)}},decls:9,vars:1,consts:[["starsCanvas",""],[1,"page-wrapper"],[1,"background-kanji"],[1,"page-content"],[1,"stars-canvas"],[1,"diario-container"],["class","diario-card",3,"click",4,"ngFor","ngForOf"],[1,"diario-card",3,"click"],[1,"diario-header"],[1,"diario-fecha"],[1,"diario-titulo"],[1,"diario-icon"],[1,"diario-body"],[3,"innerHTML"],["class","diario-imagenes",4,"ngIf"],[1,"diario-imagenes"],["target","_blank",3,"href",4,"ngFor","ngForOf"],["target","_blank",3,"href"]],template:function(a,s){a&1&&(o(0,"div",1),c(1,"app-navbar"),o(2,"div",2),d(3,"\u611B"),i(),o(4,"div",3),c(5,"canvas",4,0),o(7,"div",5),m(8,D,11,7,"div",6),i()()()),a&2&&(n(8),r("ngForOf",s.entries))},dependencies:[E,S,P,z],styles:['.stars-canvas[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1}body[_ngcontent-%COMP%], .home-body[_ngcontent-%COMP%]{background-color:#4e0a0b;color:#f2eee8;min-height:100vh;margin:0;overflow-x:hidden}.background-kanji[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:50vw;font-family:"serif";color:#ffd1d414;z-index:0;pointer-events:none;-webkit-user-select:none;user-select:none;white-space:nowrap}.page-content[_ngcontent-%COMP%]{position:relative;z-index:2}.page-wrapper[_ngcontent-%COMP%]{min-height:100vh;background-color:#4e0a0b;color:#f2eee8;overflow-x:hidden}.titulo[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:4rem 1rem}.text1[_ngcontent-%COMP%]{max-width:720px;font-size:1.1rem;line-height:1.9;text-align:center;color:#f2eee8;font-family:Georgia,Times New Roman,serif}.cards-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;padding:32px}.card[_ngcontent-%COMP%]{border-radius:18px;overflow:hidden;box-shadow:0 14px 35px #00000059;transition:transform .4s ease}.card[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.card__img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.proposal-wrapper[_ngcontent-%COMP%]{height:60vh;display:flex;align-items:center;justify-content:center}.ring-touch[_ngcontent-%COMP%]{font-size:5rem;animation:_ngcontent-%COMP%_pulse 2s infinite;cursor:pointer;-webkit-user-select:none;user-select:none}.proposal-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:#4e0a0bd9;display:flex;align-items:center;justify-content:center;z-index:999}.proposal-box[_ngcontent-%COMP%]{background:#f2eee8;padding:30px;border-radius:20px;text-align:center;max-width:320px;animation:_ngcontent-%COMP%_fadeUp .6s ease}.proposal-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#4e0a0b;margin-bottom:10px}.proposal-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#90414d}.proposal-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:20px;background:#bf2a52;color:#fff;border:none;padding:12px 20px;border-radius:999px;font-size:1rem}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1)}50%{transform:scale(1.1)}}@keyframes _ngcontent-%COMP%_fadeUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.floating-hearts[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none;z-index:1000}.heart-float[_ngcontent-%COMP%]{position:absolute;bottom:-10%;font-size:2rem;animation-name:_ngcontent-%COMP%_floatUp;animation-timing-function:ease-out}@keyframes _ngcontent-%COMP%_floatUp{0%{transform:translateY(0) scale(.8);opacity:1}to{transform:translateY(-120vh) scale(1.4);opacity:0}}.video-amor[_ngcontent-%COMP%]{width:100%;max-width:500px;border-radius:12px;display:block;margin:20px auto}.diario-container[_ngcontent-%COMP%]{max-width:720px;margin:40px auto;display:flex;flex-direction:column;gap:20px}.diario-card[_ngcontent-%COMP%]{background:#ffffff0a;border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;cursor:pointer;backdrop-filter:blur(6px);box-shadow:0 8px 25px #00000059;transition:transform .2s ease}.diario-card[_ngcontent-%COMP%]:hover{transform:translateY(-2px)}.diario-header[_ngcontent-%COMP%]{padding:16px 20px;display:flex;justify-content:space-between;align-items:center;color:#ffd1d4;font-weight:600;font-size:1.05rem}.diario-fecha[_ngcontent-%COMP%]{color:#f2eee8;font-size:.9rem}.diario-icon[_ngcontent-%COMP%]{font-size:1.4rem;color:#bf2a52}.diario-body[_ngcontent-%COMP%]{max-height:0;overflow:hidden;transition:max-height .6s ease;padding:0 20px}.diario-body.abierto[_ngcontent-%COMP%]{max-height:2000px;padding-bottom:18px}.diario-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{white-space:pre-line;line-height:1.8;color:#f2eee8}.diario-imagenes[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-top:8px;color:#ff9fb2;text-decoration:none}.diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#f7b7c8;font-weight:500;text-decoration:none}.diario-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.diario-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{white-space:pre-line}']})};export{I as SentiminetosComponent};
