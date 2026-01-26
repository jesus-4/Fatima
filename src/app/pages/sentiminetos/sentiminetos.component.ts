import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import {
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ContentData, ContentItem } from '../../shared/navbar/model/model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  duration: number;
}
export interface DiarioEntry {
  fecha: string;
  titulo: string;
  texto: string;
  imagenes?: string[];
  abierto?: boolean;
}


@Component({
  selector: 'app-sentiminetos',
  imports: [NavbarComponent, CommonModule],
  standalone: true,
  templateUrl: './sentiminetos.component.html',
  styleUrl: './sentiminetos.component.css'
})
export class SentiminetosComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('starsCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationId!: number;

  private width = window.innerWidth;
  private height = window.innerHeight;

  ngAfterViewInit(): void {
    this.initCanvas();
    this.createStars(120);
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private createStars(count: number) {
    this.stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1
    }));
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      star.y += star.speed;

      // 🔁 si sale de la pantalla, vuelve arriba
      if (star.y > this.height) {
        star.y = 0;
        star.x = Math.random() * this.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.3})`;

      this.ctx.fill();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.initCanvas();
  };
  items = signal<ContentItem[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<ContentData>('assets/data/conten2.json')
      .subscribe(data => this.items.set(data.items));
  }

  // anillo
  showProposal = false;

  onRingTap() {
    this.showProposal = true;
  }

  closeProposal() {
    this.showProposal = false;
  }

accept() {
  this.showProposal = false;
  this.explodeHearts();
}

floatingHearts = signal<FloatingHeart[]>([]);
private heartId = 0;

explodeHearts() {
  const amount = 30;

  const newHearts: FloatingHeart[] = Array.from({ length: amount }).map(() => ({
    id: this.heartId++,
    x: Math.random() * 100,
    duration: 2000 + Math.random() * 2000
  }));

  this.floatingHearts.update(h => [...h, ...newHearts]);

  setTimeout(() => {
    this.floatingHearts.set([]);
  }, 4500);
}



entries: DiarioEntry[] = [
  {
    fecha: '16 Enero 2026',
    titulo: 'Feliz 16 de enero ❤️',
    texto: `
      Feliz 16 de este mes de enero.
      te extraño y te amo tanto mi amor
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
    `,
    imagenes: []
  },
  {
    fecha: '20 Enero 2026',
    titulo: 'Primer día en Córdoba',
    texto: `
      contando un poco mi estancia en cordoba me compre unas zapatillas puma que estan lindas la verdad te las queria mostrar pero nunca encontre el momento de
      decirte o nunca me anime hoy fui a retirar los lentes que me hice porque la semana pasada fui al oftalmologo y basicamente si necesito lentes para ver y estoy peor del ojo izquierodo encima
      la izquierda siempre empeora todo jaja  ya fuera de los chistes los lentes me quedan raro me hacen sentir raro pero bueno mientras pueda ver todo bien aunque sin lentes tambien veo,
      los lentes teoricamente traen filtro antiluz azul y anti reflejos que es lo que yo necesito gracias a la profesion que elegi pero bueno unas de tantas novedades que pasaron en estos 2 dias en cordoba

      queria decirte que para mi no es lo mismo ir a cordoba sin vos, me siento raro siento que me haces muy bien a mi y me gustaria poder causarte lo mismo

      ahora me estoy ahogando de los nervios y la angustia de viajar pero tengo que afrontarlo no me queda de otra opcion
      tuve lloradas durante el dia pero bueno nadie se puede enterar de eso porque mi mama sufre mas que yo jajaja

      pd: cuando quieras me pasas las fotos que nos sacamos asi
      las cargo aca o pasame la foto que vos quieras pero me gustaria tener todas jaja

    `,
    imagenes: [
      'https://photos.app.goo.gl/ZMLwCfeVfRnKSUha9',
      'https://photos.app.goo.gl/jd3z6SyxxEMnKeh67'
    ]
  },
  {
    fecha: '23 de enero de 2026',
    titulo: 'Viernes',
    texto: `
       Es dificil la verdad estar aca y eso que no llevo ni un dia, me largue a llorar de lo solo que estoy
      no me dieron la plata todavia de la universidad asi que me mori de hambre hasta las 16hs de aca 18 de argentina
      menos mal que la señora que me alquila el lugar me presto plata sino nada, y no me contestan los hdpts
      sali a caminar y no se, no se que me pasa estoy re mal. conoci a uno de los chicos que esta aca tambien
      de intercambio es un mexicano buena onda, me cae bien pero somos nosotros dos y
      me dice que el tambien se siente solo asi que bueno con alguien puedo ahogar mis penas,
      me hizo probar unos dulces
      que trajo de mexico y yo me grabe para que vieras mi reaccion jaja...
      me da verguenza mostrarte mi reaccion pero no fue la gran cosa, no picaba el dulce
      no puedo sacarte de mi cabeza en todo pienzo en vos cualquier cosa que veo a donde voy me gustaria estar con vos y verte sonreir 😞

      con el chico este que te dije, se llama robert jaja y me da un poco de gracia porque lo ves y se re nota que es mexicano
      la cosa es que fuimos al super y de paso me acompanio a que cambie unos dolares por pesos colombianos porque sino no puedo vivir literalmente
      y compre comida para cocinar, y papel aca esta barato creo, 1 dolar es 3640 pesos colombianos y si buscas bien conseguis cosas re baratas
      ponele un maple de huevo de 30 huevos sale 10000 o sea 5 mil pesos arge aprox no se

      te extraño mucho 😞

      te dejo unos videos que grabe para que veas

      <a href="https://photos.app.goo.gl/ZMLwCfeVfRnKSUha9">video de la pieza ordenada</a>
      <a href="https://photos.app.goo.gl/jd3z6SyxxEMnKeh67">video de paseo</a>
      en el paseo me encontre con esta rosa china amarilla o creo que es una rosa china
      <a href="https://photos.app.goo.gl/zY1YEyaV8imt8zeQ6">rosa china?</a>
      la cuestion es que me llamo mucho la atencion de lo linda que era y estaba llena
      de esas el arbol o planta era muy linda que solo pense en vos cuando la vi
    `,
    imagenes: []
  },
  {
    fecha: '24 de enero de 2026',
    titulo: 'Sabado',
    texto: `
          bueno esto lo escribo despues de mandarte el ultimo mensaje
      me desperte y me meti a bañar y cuando salgo y me veo en el espejo me di cuenta que la cadena del collar que nos pusimos
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
    `,
    imagenes: []
  },
  {
    fecha: '25 de enero de 2026',
    titulo: 'Domingo',
    texto: `
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

      bueno me prepare el mate y estuve una parte de la mañana seleccionado horario de
      cursada y es muy diferente a como estoy acostumbrado y el resto de la mañana (son las 13:30)
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
      por las dudas no vuelva a actualizar la pagina te deseo buenas noches, que descanses muy bien y exitos mañana en el trabajo
      sos una gran persona, tenes mucho potencial y vas a llegar re lejos estoy seguro, estoy orgulloso de todo lo que logras
      segui adelante, sos muy fuerte

      pd: si te puedo ayudar con la pagina de las uñas con alguna automatizacion, ver un chat bot, gestionando algo o recopilarte informacion avisame o algo parecido yo te ayudo
      `,
    imagenes: []
  },
  {
    fecha: '26 de enero de 2026',
    titulo: 'Lunes',
    texto:
    `
      Hoy me desperte mas temprano para ir a la universidad pero no me contesta mi cordinador al final termina siendo una mierda porque si debo solicitar ayuda no me sirve de nada tenerlo a el

      anoche me fui a dormir y me sentia un poco mal y use la remera que me diste y me dieron ganas de hablar con vos, por eso te decia que te iba a molestar no era nada importante, solo un capricho mio

      sabe que ayer mientras hablaba con los chicos, no me acuerdo como llegamos al tema fara me dice que el era muy amigo de mott y una vez se quizo suicicdar y dice que cuando le dieron esa noticio el se sintio horrible y normal le digo yo no es una noticia muy buena esa y de la nada me dice que no se me vaya a ocurrir hacer eso a mi jaja yo no se porque me lo dijo si nunca le dije a el eso y bueno me puse a llorar pero no se dio cuenta y eso me quedo dando vuelta la cabeza porque no recuerdo el contexto de la conversacion como para que me dijera algo asi en fin

      si mi coordinador no me responde supongo que me voy a ir a hacer un poco de ejercicio, me alegro que la pases bien, que tengas un lindo dia

      (9:14)Al final si vine a la universidad, me tomé mi primer Uber moto jaja es un quilombo acá pero bueno era lo más barato y gracias a qué anduve con vos y me dijiste que no debería hacer creo que no le genere muchos problemas al chico, una vez en la uni me registraron la cara para que pueda ingresar y después me mandaron a abrir una cuenta del banco y me atendió una chica me empezó a pedir los datos y después que cree una clave dinámica y resulta que a la clave dinámica se le pone un nombre jaja así que le puse tu nombre a la clave jaja y bueno la clave del banco la fecha de novios nuestra ahora estoy cansando, me está matando la angustia no sé porque no sé que me está haciendo mal pero me siento de la mierda la verdad me quiero ir a dormir nomás, la universidad es muy grande y linda acá te pongo dos fotos que saque

      porque no estoy en óptimas condiciones pero después voy a sacar mejores espero, me dieron otro horario que es una mierda pero bueno ya está intente pelear por cambiar el horario pero me dijeron que es el único grupo que quedó así que bue deberia salir a comprar más cosas para comer pero aún no tengo plata espero que hoy o mañana me den

      <a href="https://photos.app.goo.gl/ZTMvzZt86njv1CZV6">ean</a>

      (10:41)Ahora me va a dar un recorrido por la universidad y ya me voy a mi hogar 😣

      (11:36) llegue a la casas, me mostro toda la universidad y esta buena me dijo que hay psicologos para los alumnos asi que le pregunte como era eso, voy a empezar a ir para sanar y no ser tan insoportable jaja

      no se si responderte las cosas que me pones, no se si te gustaria que te diga algo, o que nomas lo lea
      te las respondo y despues me avisas cualquier cosa

      con el tema del alquiler no se si queres que le pregunte a mis papas si te alquilan o si te la dan a la casa de arriba, total yo te habia comentado que mi mama me la habian ofrecido para que vaya yo a vivir solo entonces no se, no se como van a estar las cosas entre nosotros pero si queres te hago esa averiguacion capaz que te sale mas barato supongo pero te queda un poco lejos vos decime

      exitos con las uñas amor 
    `
  }
];




}
