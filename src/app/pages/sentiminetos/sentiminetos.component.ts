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
}

interface DiarioEntryEnriquecida extends DiarioEntry {
  dia: number;
  diaSemana: string;
  dateObj: Date;
}

interface MesGrupo {
  mes: string;
  anio: number;
  items: DiarioEntryEnriquecida[];
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

  // ── Canvas / estrellas ──────────────────────────────────────────

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

  // ── HTTP ────────────────────────────────────────────────────────

  items = signal<ContentItem[]>([]);
  constructor(private http: HttpClient) {}

  entradasAgrupadas: MesGrupo[] = [];

  ngOnInit() {
  this.http
    .get<ContentData>('assets/data/conten2.json')
    .subscribe(data => this.items.set(data.items));

  this.entradasAgrupadas = this.calcularGrupos();
  }

  // ── Anillo ──────────────────────────────────────────────────────

  showProposal = false;
  onRingTap()    { this.showProposal = true; }
  closeProposal(){ this.showProposal = false; }

  accept() {
    this.showProposal = false;
    this.explodeHearts();
  }

  // ── Corazones flotantes ─────────────────────────────────────────

  floatingHearts = signal<FloatingHeart[]>([]);
  private heartId = 0;

  explodeHearts() {
    const newHearts: FloatingHeart[] = Array.from({ length: 30 }).map(() => ({
      id: this.heartId++,
      x: Math.random() * 100,
      duration: 2000 + Math.random() * 2000
    }));
    this.floatingHearts.update(h => [...h, ...newHearts]);
    setTimeout(() => this.floatingHearts.set([]), 4500);
  }

  // ── Diario ──────────────────────────────────────────────────────

  private calcularGrupos(): MesGrupo[] {
  const grupos = new Map<string, MesGrupo>();

  for (const entry of this.entries) {
    const limpia = entry.fecha.replace(/\bde\b/gi, '').replace(/\s+/g, ' ').trim();
    const partes = limpia.split(' ');
    const dia    = parseInt(partes[0]);
    const mesStr = partes[1]?.toLowerCase();
    const anio   = parseInt(partes[2]);
    const mes    = this.MESES.indexOf(mesStr);

    if (isNaN(dia) || isNaN(anio) || mes === -1) {
      console.warn(`Fecha inválida: "${entry.fecha}"`);
      continue;
    }

    const dateObj = new Date(anio, mes, dia);
    const key     = `${anio}-${String(mes).padStart(2, '0')}`;

    if (!grupos.has(key)) {
      grupos.set(key, { mes: this.MESES[mes], anio, items: [] });
    }

    grupos.get(key)!.items.push({
      ...entry,
      dia,
      diaSemana: this.DIAS_SEMANA[dateObj.getDay()],
      dateObj
    });
  }

  return [...grupos.values()].sort((a, b) => {
    const ka = `${a.anio}-${String(this.MESES.indexOf(a.mes)).padStart(2, '0')}`;
    const kb = `${b.anio}-${String(this.MESES.indexOf(b.mes)).padStart(2, '0')}`;
    return ka.localeCompare(kb);
  });
}


  private readonly MESES = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
  ];

  private readonly DIAS_SEMANA = [
    'domingo','lunes','martes','miércoles','jueves','viernes','sábado'
  ];

  entradaAbierta: DiarioEntry | null = null;

  abrirModal(entry: DiarioEntry) { this.entradaAbierta = entry; }
  cerrarModal()                   { this.entradaAbierta = null; }

get entradosPorMes(): MesGrupo[] {
  const grupos = new Map<string, MesGrupo>();

  for (const entry of this.entries) {
    // Eliminar "de" y espacios extra, dejar solo "dia mes anio"
    const limpia = entry.fecha.replace(/\bde\b/gi, '').replace(/\s+/g, ' ').trim();
    const partes = limpia.split(' ');
    const dia    = parseInt(partes[0]);
    const mesStr = partes[1]?.toLowerCase();
    const anio   = parseInt(partes[2]);
    const mes    = this.MESES.indexOf(mesStr);

    if (isNaN(dia) || isNaN(anio) || mes === -1) {
      console.warn(`Fecha inválida: "${entry.fecha}"`);
      continue;
    }

    const dateObj = new Date(anio, mes, dia);
    const key     = `${anio}-${String(mes).padStart(2, '0')}`;

    if (!grupos.has(key)) {
      grupos.set(key, { mes: this.MESES[mes], anio, items: [] });
    }

    grupos.get(key)!.items.push({
      ...entry,
      dia,
      diaSemana: this.DIAS_SEMANA[dateObj.getDay()],
      dateObj
    });
  }

  return [...grupos.values()].sort((a, b) => {
    const ka = `${a.anio}-${String(this.MESES.indexOf(a.mes)).padStart(2, '0')}`;
    const kb = `${b.anio}-${String(this.MESES.indexOf(b.mes)).padStart(2, '0')}`;
    return ka.localeCompare(kb);
  });
}

  entries: DiarioEntry[] = [
  {
    fecha: '16 enero 2026',
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
    fecha: '20 enero 2026',
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
    `
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

      (18 hs) estuve tratando de actualizar la pagina pero se me fueron las ideas, tendria que reconstruir todo vuelta asi que voy a ver si puedo hacerlo mejor en otra rama sin alterar al que ya esta funcionando

      ando con el estomago cerrado no se que me pasa, pero bueno por los menos algo vengo comiendo unos huevos revueltos, tendria que ver de mañana salir a comprar cosas para tener para cocinar, si es que me paga la universidad, encima hoy me llamo la dueña del lugar para apurarme a pagar jajaja y le tuve que mostrar que yo hice todo y depende de la universidad pero se siente feo que te apuren asi

      me alegro que te hayan gustado los regalos, no te sientas mal jaja yo te queria regalar, tenia ganas y la posibilidad de hacerlo solo disfrutalos y se feliz en medida de lo posible el broche de metal no es bonito pero pense que te podria ser muy funcional cuando necesitas agarrar mucho pelo, ahi se completa mi regalo del 14 jaja ya no te voy a poder dar nada mas hasta que vuelva asi que no te sienta mal!!!!!
      te quiero
    `
  },
  {
    fecha: '27 de enero de 2026',
    titulo: 'Martes',
    texto:
    `
      hoy fue una mañana medio movida, me desperte y llame al banco donde me registre ayer porque ahora no me deja entrar no se porque, desde la llamada no me dieron ninguna solucion y encima mientras hacia la llamada me mandan un mensaje los dueños de la casa para decirme cuanto debo pagar o sea mas presion
      en la llamada no me dieron ninguna solucion asi que dije ¨me voy a hacer un poco de ejercicio en aca cerca¨ a dos cuadras masoemnos hay un un lugar re chico pero que tiene esas maquinas al aire libre, pero yo solo fui a hacer fondos y dominadas, volvi de hacer eso, estuve no se 30 min haciendo y me fui al banco a hablar a ver si de forma presencial me dan una solucion viable los hdpts pero anda, que espere 8 dias habiles, dentro de ese tiempo puede que me den una solucion

      ahora volvi y te estoy escribiendo esto mientras espero que se caliente el agua para ir a tomar unos mates, pero primero me voy a bañar y despues a tomar unos matecitos y actualizar lo que me dijiste de la pagina que podria cambiar, espero que no sea tanto quilombo tu mañana, sos una gran persona y vas a llegar muy lejos en la vida estoy seguro de eso, tenes muchisimo potencial lo puedo ver, no te desmotives :(

      bueno borraste todo jaja asi que me voy a poner a cambiar las letras que me acuerdo que me pusiste eso voy investigar diferentes tipo de fuentes por si te intersa las voy a estar viendo en
      <a href="fontpair.co">fonpair.co</a>

      sabes que me bañe y no sale agua caliente asi que me tuve que bañar con agua fria, un horror pero bueno esta cochino lo peor es que si abria el agua fria salia mas fria, encima viste que cuando me baño se me cae pelo normal digamos pero hoy fue mucho, muy abuso, que miedo a quedarme pelado
      <a href="https://photos.app.goo.gl/c2bdMF48vJpRckaR8">escribiendo este texto recien bañado</a>

      vi la playlist que me compartiste, significa mucho para mi que te animes a contarme estas cosas, gracias de verdad la voy a analizar con detalle y perdon por hacer que tengas que colocar esas canciones en la playlist

      bueno cambie la fuente, puse una que no es muy atractiva supongo pero me hizo acordar a mi letra apenas la vi, igual la puedo cambiar si te parece

      estuvo lloviendo todo el dia, todo el dia hizo frio, desde que llegue hasta hoy solo frio y lluvia, es tremendo encima me vinieron a pedir que pague si o si la reserva de la habitacion porque mi cordinador dijo que le VIERNES recien me van a dar la plata entonces con la lluvia de mierda esta me tuve que ir a centro comercial a cambiar casi todos los dolares que traje para poder pagar la reserva, me quedan 40 dolares fisicos nomas y capaz que los cambie porque no creo llegar al viernes con lo que tengo ahora, asi que bueno hice el cambio y les pague a los pesados estos y ya me quede todo el dia en el depto, menos mal que me traje la campera nike para la lluvia pero a este ritmo creo que me voy a comprar un paraguas esta todo impresionante
      me siento cansado
    `
  },
  {
    fecha: '28 de enero de 2026',
    titulo: 'Miercoles',
    texto:
    `Hola perdon por no poder hacerlo mas temprano

    anoche me quede escuchando tu playlist y me puse a llorar jaja y me dormi

    hoy me desperte mas tarde tenia que ir a la uni a las 12 asi que a las 11 me tenia que ir de aca y me desperte a las 10 masomenos, bueno si me desperte ma temprano pero mi cuerpo no esta bien asi que me quede en cama nomas y me dormi hasta las 10

    fui a la clase, medio meh la verdad como primera clase esta bien supongo, no me puede sorprender de momento, hice grupo con dos colombianos y cunado sali uno me acompaño y me iba hablando y no le entendia nada, no se si estoy medio sordo o el chico hablaba muy mal despues me tome un uber moto hasta mi departamente y se largo la lluvia no lo podia creer y el del uber me dijo que paremos assi que bue a esperar que pase un poco la lluvia...
    <a href="https://photos.app.goo.gl/bQXWAwdVikbBVNFp6"> lluvia de m...</a>

    y ahora a las 14:02 te estoy escribiendo esto, atorrante porque borras lo que escribis, me alegro mucho que la psicologa te haya ayudado o te haya dicho lo que necesitabas escuchar, si queres puedo tratar de conseguirte informacion sobre finales, parciales, tps, y unidades que se ven en adm de empresas

    yo se que no estamos en una buena condicion pero te queria decir que si queres podemos seguir nuestro mundo de minecraft pero jugando desde el cel, en caso de que si quieras tendria que ver como hacerlo y si no queres esta bien, bueno eso de momento es mi dia, tengo otra clase a las 16, ya te voy a pasar mejor horario pero no se donde dejarlo para que te sea mas comodo para vos, bueno despues lo actualizo te mando un beso


    bueno ya tuve la clase de las de las 16, duro una hora nomas pero todas estas clases son como de presentacion de la materia y cosas asi, essta materia se llama funding leadears y tiene muchas cosas de adm de empresas, ya te voy a pasar una foto de bibliografia si queres consultar, y de los temas que veo si te interesa consigo el material y tw lo paso ahora fui a consultar para ir al gym y menos mal que vine porque no es asi nomas, tenes que descargar una app y reervar un horario de entrenamiento si o si o sea que si yo cai para entrenar sin hcaer eso estaba en la B jaja pero bueno solo voy a venir los dias que tenga que venir a la uni los otros dias voy a hacer calistenia nomas tengo que esperar hasta lass 18 para tener seguridad informatic y no se que hacer.
    <a href="https://photos.app.goo.gl/yxBFUb7qwmXwDz679">temas adm?</a>

    mientras te escribia esto vinieron dos chicos y me preguntaron si antes de venir a la uni desayuno jaja muy random, parece que estan haciendo una encuesta o sondeo
    bueno no se, me voy a poner a escuchar musica para hacer tiempo, encima anda re mal el internet aca

    ya termine de cursar la materia esta seguridad integral ti le veo potencial, no parece aburrida y el profe es buena onda y tienen mucha experiencia, cuando sali de la uni ahora hace 20 min (son las 20:20) y la clase teoricamente era hasta las 19:30 pero se fue un monton el profe, bueno pense que no iba a encontrar forma de volver porque no me aparecia ningun uber moto disponible y me quede esperando un rato ahi porque me quede sin saldo en la tarjeta del colectivo pero menos mal pude volver, perdon por decirte de hablar soy muy pesado lo se

    ahora me voy a comer que me estoy muriendo de hambre vengo comiendo re mal estos dias por no decir que no vengo comiendo casi

    gracias por llamarme :( tenia muchas ganas de hablar con vos, me hiciste sentir mejor

    sos muuy hermosa
  `
  },
  {
    fecha: '29 de enero de 2026',
    titulo: 'Jueves',
    texto:
    `guenas, espero que hayas tenido un dia bueno y no tan estresante, exitos con la casa que te ibas a ver

    yo me desperte y me prepare para irme a cargar plata a la tarjeta del colectivo y despues a me fui a comprar para comer, cocine y reecien termino de comer, la cosa que me dan unas ganas de dejar las cosas sucias y lavarlas despues jaja pero como puede llegar cualquier chico en cualquier momento tengo que dejar todo listo esto me cura el problema digamos de dejar todo sucio asi que apenas desocupo limpio

    estoy viendo para arreglar la pagina como me dijiste anoche y hacerlo como un grid igual cuando lo haga lo vas a ver por aca de paso, despues me voy a poner a ver coass de la uni seguramente y se me va todo el dia ahi pero bueno hago cosas que me gustan no se si cuenta

    depues habia pensando ajustar la pagina esta porque cuando mas dias pasen mas vas a tener que bajar entonces lo voy a agrupar por meses y que selecciones el dia del mes tipo calendario y te tire los mensajes que fui escribiendo

    sabes que anoche soñe que estabas viendo un anime, no se porque soñe eso de la nada pero no me acuerdo cual ni nada y despues me recomendaste que lo viera

    bueno ya lo actualice, no si te referias a algo asi, espero que este bien, tenia ganas de salir a hacer ejercicio pero vieras como llueve y truena un monton

    ahora me voy a poner a leer unos libros de funding leaders y hacer ejercicio aca en el depa no me queda de otra

    por que sentis mal? te puedo ayudar de alguna forma? si queres hablar yo estoy :((
    espero que te sientas mejor

    habia encontrado esto en falabella de aca, yo tengo un falabella cerca, si ves la tuya por ahi y queres podemos intetar conseguirla
    <a href="https://www.falabella.com.co/falabella-co/search?Ntt=Babyliss"> babyliss?</a>
    `
    },
    {
      fecha: '30 de enero de 2026',
      titulo: 'Viernes',
      texto:
      `Buenos diass, espero que te encuentres mucho mejor que ayer, me preocupo mucho por vos :((

      hoy me levante mas temprano y tuve tiempo de preparame y desayunarnien, ahora son las 10:22 asi que a las 11 me voy a tomar el colectivo para irme a la uni y quedarme todo el bendito dia ahi, es la unica forma que encuentro para ahorrar plata
      Ojala me paguen hoy los hdpts estos asi puedo ir a comprar mas comida, anoche no cene porque tenia arroz y nada mas, sino voy a tener que ir a cambiar los ultimos dolares que me quedan, encima los del banco de aca no me dieron solucion a la cuenta aun que lo pario todo mal jaja espero que no me apure hoy la gente de la renta

      mientras desayunaba la dueña de la casa me presento a otro colombiano que vive hace tiempo aca asi y me puse a hablar con el y es medio hdp jaja pero bueno no me importa, no es que me voy a relacionar tanto con el pero me dio un consejo para comprar comida mas barata porque resulta que yo estaba comprando en un lugar caro segun el, pero el lugar donde yo iba es como un jumbo como para que te hagas una idea
      creo que llevo todo para la universidad, lo bueno es que hay toma corrientes por todos lados asi que sin bateria no me voy a quedar y llevo ropa para cambiarme para ir a la gym, mi primer dia aca y me da nervios pero bueno a nadie le importo asi que no deberia comerme la cabeza

      espero que estes teniendo una buena jornada laboral de mando un abrazo, todo va a estar bien sos un caso especial

      bueno ya termine la primera clase, apenas empezo armo grupos la profe y me toco con UN PELOTUDO mamita querida, teniamos que hacer 12 preguntas en base a un enunciado y parace que aca o almenos este chico no tienen la capacidad de razonar por su cuenta, me dio bronca que todo queria preguntarle a chat gpt y despues se ponia a boludear, que clase de ingeniero va a ser asi no se, yo me senti medio mal porque solo pude responder 10 de las 12 preguntas pero bueno complete la actividad, ahora voy a ver que puedo comer(13:28), y a las 14 me ire al gym y despues a dar una vuelta por el shopping/centro comercial que tengo a un par de cuadras hasta que tenga la clase de las 16hs y y despues de lass 19 que cansancio jaja al final todo bien tomando el colectivo, lo bueno es que puedo chequear el saldo de la tarjeta gracias al NFC que tiene el telfono, creo que nunca estuve tanto tiempo en la universidad, no se mmmm desde las 11:40aprox hasta las 19:30/20hs es un monton de tiempo supongo en fin te voy a estar comentando por aca si encuentro algo de babyliss por el shopping, cuidate mucho y exitoss para tu tarde
      <a href="https://photos.app.goo.gl/j1pSNZveX4LMU9os9">fotito de la espera</a>

      bueno ya sali de entrenar, hice pecho y me re duele jaja me compre un yogurt para pasar el rato
      <a href="https://photos.app.goo.gl/1aaLCTKBDuBvFuN5A"> yog </a>
      y se me hace que no voy a ir hoy a ver la plancha porque tengo que hablar con daniel(mi coordinador) ahora en un rato por el tema de la plata y ya se me va hacer tarde

      me preocupa mucho tu bienestar, espero que estes bien o no la estes pasando muy mal =((

      ya hable con daniel y me dice que a MAAS TARDAR el otro viernes me dan la plata no lo puedo creer, ya le dije, con la plata que me dan no me alcanza, encima que me quedan los ultimos 11 mil pesos colombianos para sobrevivir hasta que me paguen (es mentira tengo 20 dolares mas aun) pero le dije eso y ahi nomas me dice "no te preocupes, voy a tratar de que el pago se haga entre el lunes y martes" peero que hdp decia yo en mi mente, le dije que le diga el a la mujer del alojamiento el porque no le puedo pagar ahora, estoy re enojado jaja pero bueno ahora me voy a las clases de las 16hs

      te paso esto por aca porque me da cosa molestarte por mensajes
      <a href="https://www.facebook.com/groups/minecraftbedrocklatinoamerica/permalink/1203982581893525/?sfnsn=scwspmo&ref=share&mibextid=VhDh1V"> un poco de humor </a>

      ya me queda la ultima clase y tengo que esperar 20 min para entrar, asi que me vine a una terraza a escuchar cro y escribirte je, la clase esta que tuve estuvo normal, unas formas matematicas y nadda mas, otro trabajo en grupo y me toco con un chabon que parece que es hiperactivo no se puede quedar quieto con nada, habla muy rapido como desesperado pero se nota que tiene buenas intenciones ahora te paso las vistas que tengo desde la terraza este es el piso 6 y ahora tengo clases en el piso 8
      <a href="https://photos.app.goo.gl/MZseL4NcCdtUCdPU9"> pre clase?</a>

      ya me queda la ultima clase y me voyyyyy menos mal, que estres que pase hoy en la cuidad, es muy grande mucho ruido, muchas bocinas, por todo tocan bocina aca vieras que ganas de irme que tengo y estar en mis 4 paredes jaja
      `
    },
    {
      fecha: '31 de enero de 2026',
      titulo: 'Sabado',
      texto:
      `Buen dia, ojala estes bien

      hoy no fue un dia con tanta historia jaja me levante me prerpare el desayuno y me puse a hacer unos cursos que te pide la universidad de aca para poder aprobar la cursada, lo bueno es que te lo dan ellos a los cursos desde su pagina
      parece que estuvo bueno el entrenamiento de pecho ayer, hice solo pecho y me duele la espald tambien, Worth? puede ser es como un 2x1
      lo bueno de que me tomo los colectivos es que me dejan muy cerca de donde vivo, literal para ir lo tengo a 3 cuadras y para volver me deja aprox a 3 cuadras, llegue anoche y necesitaba descansar la verdad, hoy no tengo ganass de hacer nada asi que seguramente me enfoque en la uni nomas ya que no me queda de otra, vine pa esto, tengo que ser el mejor hasta que me vaya
      bueno esto es por ahora, despues te voy a comentar como avanza el dia, abrazos!

      me cambie el collar y me puse el de la espada, algo me dice que se va a decolocarar feo como la cadena del (dije? dige?) pero bueno, espero que a la cadena no le pase nomas

      bueno al final fue un dia sin mas, complete actividades, hable con mi abuela, mi mama me paso plata por las dudas y ya es el final practicamente
      comere y me ire a dormir, igual fue un dia tranquilo, worth it para mi

      espero que vos tambien allas tenido un dia tranquilo/lindo

      `
    },
    {
      fecha: '1 de febrero de 2026',
      titulo: 'Domingo',
      texto:
      `hoy me desperte mas temprano y me fui a entrenar calistenia, estuvo bueno porque se largo la lluvia y se sentia bien entrenar asi jaja me duelen las manos pero valio la pena para mi despues me fui a bañar con agua fria... ya le voy a reclamar al dueño de la casa porque supuestamente las otras habitaciones si tienen agua caliente pero la mia no no se porque los chicos me dijieron que la deje salir 10 min y salia muy caliente pero para mi no funciona ni con 10 ni con 20 asi que bueno depues me fui a prerar el desayuno y me lo cruce a robert el mexicano y me dijo que se iba a ir de la casa esta tarde porque la universidad le consiguio un lugar mas cerca para vivir asi que bueno lo tuve que despedir y me dejo comida y no me dejo que le pague la plata que me presto, me dijo que estaba bien asi y me senti mal jaja asi que me quede charlando con el hasta que se fue y me pidio que lo ayude a cargar las maletas en el uber y adios robert depues me fui a cocinar y me puse a lavar todo y hace un rato me desocupe ahora en una hora mas me voy a ir a comprar mas comida y un chico que vive aca hace 4 años me dijo que mejor me compre mi propia taza para tomar por las dudas y llegaron muchos colombianos de la nada todo porque empiezan la clases mañana para todas las universidades... todas menos la mia que empezo antes pero bueno no me puedo quejar solo paso casi todo el dia alli pero dos dias a la semana capaz que los otros chicos tienen mas dias para ir a la universidad, vaya a saber la verdad

      me pone mal que no estes comiendo, que te estres estresando tanto para perder tanto pelo. cuidate :( si te puedo ayudar de alguna forma solo decilo

      `
    },
    {
      fecha: '2 de febrero de 2026',
      titulo: 'Lunes',
      texto:
      `que dia mas largo y eterno y cansador, dormi re mal anoche, no me podia dormir y me desperte a las 6 encima, me quede en cama hasta las 8 y despues volvi a empezar la rutina, sali a entrenar, desayune, me bañe y despues a fui a shopping a ver a que onda los precios y todo eso, estuvi ahi hasta las 14 masomenos, vi proteinas jaja y me tienta pero voy a ver si llego a sobrevivir bien el mes y si si me voy a comprar para tener y cocinar cosas, cosas que siempre quise pero nunca tuve la plata comprarme volvi a la casa y me cocine quinoa con un mega omelette de huevvo y salio todo tan rico la verdad despues vine a la pieza y me dormi y recien me despierto, vieras como llueve, todos los dias llueve y mucho y por mucho tiempo, tenia ganas de salir a ver mas precios para comprar carne pero se me hace que cuando pare un poco la lluvia me voy a ir a comprar un paraguas antes que otra cosa, aun no me pagan pero la aplicacion del banco ya me anda asi que puedo pagar con transferencias tranquilamente ahora como llueve voy a aprovechar y estudiar o capaz me ponga a ver un video no se de mientras me preparo el mate jaja

      me alegro mucho que hayas podido alquilar, espero que te ayude de verdad para lo que queres y realmente se que te va a ir re bien la universidad me alegro que consigas lo que queres

      estoy teniendo problemas con la pagina porque no se suben las actualizaciones, la compu me dice todo ok cuando hago actualizacion pero la pagina no esta ok jaja
      `
    },
    {
      fecha: '3 de febrero de 2026',
      titulo: 'Miercoles',
      texto:
      `Que dia mas largo fue el  de ayer, durante la mñana sali a comprar para hacer milanesas y me fui a hacer ejercicio prepare las milanesas y pense que el capricho me habia salido caro pero salieron muchas milanesas menos mal entonces tengo para comer varios dias y la verdad que vviendolo asi me salio barato todo jaja despues a la tarde los chicos de peru me invitaron a ir al centro (ellos tenian que hacer algo y yo fui a ver) la verdad que no me arrepiento de nada jaja muy grande la ciudad muy linda le saque muchas fotos para que veas, nos volvimos en uber y cada uno se fue a encerrar a su habitacion y yo me fui de vuelta a hacer ejercicio al parque que tengo cerca eso como las 19:30 (ya es de noche aca a esa hora) y de paso a una dietetica a preguntar precios y todas esas cosas para cuando me paguen organizarme mejor con las comidas
      <a href="https://photos.app.goo.gl/TgtSWDHaaBFNipho8"> foticos </a>

      hoy me levante fui a hacer ejercicio desayune, me fui a cargar plata en la tarjeta del colectivo para moverme a la uni, cocine para traer y comer aca, durante la clase salio todo bien gracias a que nos toco trabajar individualmente y se toca mucho la diferencia cuando no tenes a alguien que te quiere hacer perder el tiempo, prefiero que todo dependa de mi antes que depender otros la verdad, ahora estoy esperando que sean las 15 para ir al gym y depues a clases y seguramente salga a entrenar de vuelta cuando vuelva de la uni es como que estoy metiendo una triple rutina de entrenamiento jaja pero mejor, me ayuda a mantenerme despejado y centrado en mi

      no sabes lo que me esta costando subir las acts a la pagina, como que el servidor donde estan ubicadas no esta funcionando del todo bien, el lunes lo pude solucionar, pero no subio hasta que me di cuenta que no estaba funcionando

      en fin cuidate mucho
      `
    },
    {
      fecha: '20 de febrero de 2026',
      titulo: 'Viernes',
      texto:
      `
      Bueno te esscribo este mensaje para decirte feliz cumpleaños, espero que la estes pasando muy bien, que te regalen cosas lindas y que disfrutes mucho tu dia, sos una persona muy especial para mi y te deseo lo mejor del mundo, espero que este año sea un año de crecimiento personal para vos y que puedas lograr todo lo que te propongas, feliz cumpleaños de nuevo

      se que vas a a conseguir muchas cosas, segui siempre pensando en tu futuro, estoy orgulloso de lo fuerte que sos, todo va a salir para vos, muchos exitoss en la universidad,  muchos exitos en el trabajo, te deseo lo mejor siempre
      este va a ser mi ultimo mensaje y la pagina quedara abierta hasta que el servidor desee tirarla abajo por inactvidad asi que bueno, es un adios supongo.
      cuidate mucho
      `
    },
    {
      fecha: '10 marzo de 2026',
      titulo: 'Martes',
      texto:
      `
      hola mi amor :((
      Me cuesta mucho no pensarte, no se que estaras haciendo, espero que andes bien, yo vengo usando y alternando todos los dias los collares que te regale porque me gusta aunque capaz nada vuelva a ser igual, no me quiero ilusionar pero realmente deseo poder volver y abrazarte con todas las fuerzas del mundo

      siento que algo cambio dentro de mi, al principio me "gustaba" estar aca, de no depender de mi viejos, de que me digan que vaya a tal lugar, de comer lo que yo quiera, de cocinar a mis tiempos, de que mi tiempo sea solo mio pero no se, el estar solo no es tan facil jaja te extraño mucho y eso capaz tambien me esta jodiendo porque no saber nada de vos me hace sentir mal, me puse a hacer cursos y tratar de mantenerme ocupado pero no puedo para mi lo eras y lo sos todo no se, capaz me estoy haciendo mal
      te mando un abrazote
      `
    },
    {
      fecha: '19 de marzo de 2026',
      titulo: 'jueves',
      texto:
      `
      Holaaaa espero que estes bien, me dan muchas ganas de hablar con vos pero tengo mucho miedo de sentir que te molesto, ne gustaria poder ayudarte como sea pero tambien quiero  respetar tu desicion de no querer hablarme
      yo te extraño mucho la verdad, no se jaja siento que sos muy importante para mi, no puedo sacarte de mi cabeza como que te tengo muy presente en todo yyyyy bueno eso, te extraño mucho enserio

      espero que ya estes cursando de forma normal en la universidad y bueno si no tenes acceso a un al aula yo tengo contacto de gente que trabaja adentro del area del sistema y puedo hablarles con tal de ayudarte
      bueno eso es todo, espero que estes bien o que sientas que todo va para bien, sos una muy buena, gran y hermosa persona

      seguramente en 10 o 15 dias te mande un mensaje por wpp ai me animo para saber de vos, no se si te va a molestar pero bueno, me gustaria si estas bien, si estas comiendo, si estas durmiendo bien, como te esta yendo en la uni, si estas haciendo cosas que te gustan, en fin me gustaria saber un poco de vos, espero no molestarte

      <a href="https://photos.app.goo.gl/VhhnDKkyi6VJN3BRA"> :( </a>


      siempre que suena esta cancion me acuerdo de vos, capaz no es muy linda pero si pienso en vos
      <a href="https://open.spotify.com/intl-es/track/3rXckjqZbQ1xrb7K5h5yTQ?si=a018ec5bf117495b">...</a>
      <a href="https://open.spotify.com/intl-es/track/445uGGM6s7NYzxF4VFqPnH?si=baab240a421449b3"> :( </a>

      igualmente dudo que veas esto, hace mucho no lo actualizo seria normal que no entres a ver pero si lo ves te mando un re abrazo
      `
    },{
      fecha: '21 de marzo de 2026',
      titulo: 'Sabado',
      texto:
      `
      Hola como estas? espero que bien

      se que te dije que no iba actulizar mas la pagina pero bueno, me sirve para poder "hablar" con alguien aunque bueno, de paso me desahogo en algun lugar y bueno si lo llegas a ver vas a poder saber un poco de mi

      el viernes hable con la sophi por llamada y me dijo que esta impresionada de que lleve todo de la mejor forma estando tan lejos de todos y sin nada y me hizo sentir mal porque yo puedo decir que todo esta bien pero lo unico que esta bien es como llevo la universidad
      tuve tantas ganas de rendirme pero de momento sigo pensando que es la salida facil y tengo que salir adelante, para mi familia todo es facil para mi pero nadie se pone en mi lugar es re dificil socializar, en los 3 grupos que estoy de las 3 materias que estoy cursando me asignaron como lider porque soy re hincha pelotas pero fuera de eso cada uno hace su vida, y todos estan en su ultimo año y ya estan trabajando mientras terminan de cursar y menos que menos van a querer socializar conmigo, tengo el contacto de todos pero quedo re fuera de lugar se me hace de mandarles un mensaje que no sea relacionado con las actividades que tenemos que hacer, si bien siento que me estuve fortaleciendo mucho el estar aca pero hay momentos en los que se me derrumba todo, no se, llegue a la conclusion de que no se ser feliz

      bueno eso es un resumen de todo el tiempo de lo que no actualice esto, llegan estas noches y no se que hacer, estuve todo el dia preparando cosas para la universidad porque tengo que presentar un monton de tps y rendir 2 examenes y ya termino una de las materies este 27 y supongo que tendre que empezar a cursar la ultima materia o sea estaria cursando 3 de vuelta pero ya aprobare una

      Realmente deseo que estes bien, cuidate mucho porfa!!
      `
    },{
      fecha: '22 de marzo de 2026',
      titulo: 'Domingo',
      texto:
      `
      Hoy iba siendo un dia normal, me pedi comida para cenar y salgo a atender el delivery de la nada se paro una camioneta estilo jeep renegade y se bajaron unos encapuchados con pistolas y cuchillos y le dieron a alguien que andaba por ahi, no lo puedo creer, estoy horrorizado me tiembla todo el delivery me empujo a la casa y gracias a que reacciono rapido creo que estamos bien, ahi nomas salieron chicos de la casa porque escucharon los disparos y me dijieron que  es algo que nunca antes paso y justamente hoy estuve viendo que colombia es el pais con mayor tasa de asesinatos cada 100 mil habitantes y con esto me lo creo, ahi nomas se fueron en la camioneta y llego la policia pero ya era tarde supongo, no vi ningun cuerpo afuera pero no se si se lo llevaron o lo tiraron al rio que esta aca cerca
      ya me quiero volver, no me siento para nada seguro aca, tengo mucho miedo
      `
    }
    ,{
      fecha: '25 de marzo de 2026',
      titulo: 'Miercoles',
      texto:
      `
      No sabes como me gusto escucharte hablar, me hizo sentir bien de verdad pero tambien siento que te molesto, me hizo tan feliz escharte hablar y escuchar que me contaras las cosas que haces pero bueno tambien no pude contarte tantas cosas porque tenia miedo, tengo miedo
      se que vos tambien estas pasando tus cosas dificiles y yo se que las vas a superar, confio en que si lo vas a lograr

      esto es un descargo emocional se puede omitir

      yo sigo con mucho miedo despues de lo que paso el domingo, ando muy deprimido por toda la situacion capaz exagero no se peri hoy me costo salir de la cama, todos los dias posteriores a lo que paso ando en la misma con miedo a salir
      solo quiero irme ya de aca, ya aprendi la leccion de venir, quiero volver y que alguien me abrace poder hablar con alguien no se, ya son muchas noches en las que voy llorando solo agarrandome los hombros como si fuese alguien mas y tratar de alentarme, me estoy haciendo mas fuerte si pero tambien siento que no estoy en las mejores condiciones para estar aca, capaz tendria que haber rechazado la propuesta de venir, no se son muchas cosas que se me pasan por la mente

      estoy realmente cansado de estar aca, no me siento seguro, no me siento bien, no me siento feliz, no se que estoy haciendo mal pero me siento de la mierda, tengo miedo de salir a la calle, tengo miedo de que me maten, tengo miedo de que me roben, tengo miedo de todo

      pero bueno eso, estoy contento de poder saber algo de vos, yo te sigo amando y extrañando mucho, me alegra mucho saber que estas mejorando y que dentro de todo vas bien, vas a estar bien

      hoy me senti de lo peor, llore a la tarde cuando sali de la clase y como vine a la casa me acoste en la cama y me dormi, despues es como que no se no siento nada, me puse a hablar con chat a modo de psicologo (se que no es lo mejor pero era lo unico que podia hacer en ese momento) y segun chat tengo un bloqueo emocional literalmente no me siento mal lo cual creo que es bueno pero tampoco me siento bien, solo me sientro estresado por las actividades y que tengo mucho que el viernes tenego que rendir las 3 materias el mismo dia pero no se, es raro no se si alguna vez te habra pasado algo parecido y como lo sentiste
      `
    }
    ,{
      fecha: '26 de marzo de 2026',
      titulo: 'Jueves',
      texto:
      `
      Hoy estuve un poco decaido pero me siento mejor, me puse a organizar y estudiar cosas porque tengo que rendir 3 materias mañana y me siento un poco estresado jaja
      en los brakes que me tome ajuste algunas cosas de la pagina creo que queda mejor asi a como estaba antes pero bueno tendria que preguntarte si te gusta pero me da verguenza decirte que estuve actualizando la pagina depues de decirte que lo iba a dejar ahi nomas
      asi que prefiero que lo veas por tu cuenta jaja aunque me dan muchas ganas de que me digas que te parece,

      tengo muchas ganas de hablarte y de mandarte mensajes pero bueno estoy tratando de no ser muuy invasivo con vos xd ya estuve averiguando sobre las materias y las unidades para pasarte asi rendir tranquila pero aun no tengo nada, solo informacion cuando tenga algo te voy a estar pasando todo para que vayas estudiando por tu cuenta
      espero que hayas tenido un buen dia y que no estes muy cansada de que no hayas podido dormir muy bien anoche eso de las 20hs aca te voy a preguntar que tal vas, espero no molestarte
      `
    }
    ,{
      fecha: '28 de marzo de 2026',
      titulo: 'Sabado',
      texto:
      `
      Buenas

      ayer fue un dia muy movido, por mas pruvada que sea la universidad a la los profesores no se les ocurre evaluar en otro momento que no sea cuando esta finalizando el corte (Los cortes se evaluan cada fin de mes parece o sea que voy a tener 4 cortes) y ayer fua que estres que manejaba no te haces una idea
      en el primer examen me fue bien, me saque 27/30 asi que me quedo tranquilo, depues me junte con el grupo de la otra asignatura para rendir oral y fue todo un caos organizarlos pero bueno fue muy larga la historia pero al final pasamos, el profesor trajo un experto en gestion de proyectos y literalmente nos papeo al frente, teniamos 5 min para exponer el proyecto y yo tenia que decir lo numeros (Financiacion y todo eso) nos papeo teniamos todo mal para el jajaj nos pedia que pongamos las fuentes en la presentacion y yo como ????? la primera vez que pasa eso pero bueno defendi a muerte el proyecto y mis compañeros... bueno... hicieron lo que pudieron digamos agachaban la cabeza y no peleaban pero bueno el no evalua solo fue a decirnos que cambiar y cosas asi todas las fuentes y eso lo tenemos en el informe ejectivo que le dimos al profe asi que no se como seran las notas de esa materia aun
      Despues tuve con otro profe y tambien habia que hacer otra defensa oral de problemas de seguridad de una organizacion que nos dio el y bueno esta vez no deje que mis compañeros hablen porque en la presentacion anterior perdimos 3 min porque uno de los que presentaba estaba muy nervioso y se trabo tanto que no pude casi hablar, cuando me toco hablar el profe me dice tenes 30 segs asi que dije todo en modo rap god pero no estaba bueno. Cuestion hice que nos evaluaran primero y dije casi todo, lo que no dije fue para que participara mi grupo y bueno en esa materia finalizo el corte con 9.7/10 no se porque no me puso el 10 pero bueno es buena nota asi que  no me voy a quejar y alli termino el dia, tener la cabeza en tantas cosas me hizo estar muy cansado, volvi muerto a la casa y solo queria estar en cama escuchando de TheNeigbourhood y bueno me fui a dormir

      hoy me levante a las 8 aprox porque me puse a prerar cosas de la tesis y depues tuve una reunion con javier, 2 horas para organizar toda la tesis aplicar correciones y agregar nuevos detalles que estuve viendo miestras estoy aca, ahora me voy a cocinar y como tengo tiempo libre ya que finalizo el corte voy a ver a fondo la tesis para avanzar lo mas que pueda en este tiempo para no tener tanto quilombo cuando vuelva, quiero estar tranquilo, ademas el dia esta reeee gris y lluvioso asi que aprovecho a full para avanzar con eso.
      espero que estes mejor depues de la caida de la moto y por la dudas si no volvemos a hablar espero que sirva lo que te dijo el medico para que puedas domrir esta noche bien aunque sea
      `
    },
    {
      fecha: '30 de marzo de 2026',
      titulo: 'Lunes',
      texto:
      `
      Hola espero que estes bien y que hayas podido descansar el finde de semana

      al final te pude conseguir el material para que puedas estudiar e intentar rendir libre, no te quiero molestar por wpp, ya entendi cual es mi lugar asi que te lo mande por mail, espero que lo veas por ahi porque no creo que lo vayas a ver por aca la verdad, de cualquier forma te dejo el link para que accedas

      <a href="https://drive.google.com/drive/folders/1bFuompjn4DL-AOWcLJOuns4iwhnnmB_K?usp=drive_link"> material de estudio </a>

      la sophia esta semana va a estar en chilecito asi que si queres pedirle los auriculares, por mi esta bien y no hay problema preferiria que lo pidas la verdad me siento mal de haberte pedido los tuyos, te termine jodiendo nomas, pero no quiero decirle que te los de por las dudas te vaya a molestar la verdad, ya no quiero sentirme molesto, ni sentir que te molesto, perdon

      espero que tengas un buen incio de semana y que te vaya muy bien en tu dia, trabajo, universidad y lo que tengas planeado hacer

      te mando un abrazo grande, cuidate mucho
      `
    },
    {
      fecha: '1 de abril de 2026',
      titulo: 'Miercoles',
      texto:
      `
      Buenas

      que dia mas agotador y largo el de ayer y hoy, vendi mi computadora y me compre una nueva, salio todo bien por los menos y gane un poco de plata aunque sea

      pero igualmente me siento casado de todo, me duele la cabeza por todo como si necesitara dejar de pensar 2 dias enteros, hoy estuve a full investigando e instalando todo en la computadora para trabajarlo en la tesis y me hubiese gustado que llueva para sentirme mas en el mood
      pero igualmente ya me estoy deprimiendo de vuelta, necesito de vuelta que me de el bloqueo emocional para estar mas tranquilo en mi vida, lo bueno es que  no me queda mucho aca, lo malo que no se que hacer para motivarme, encontrare algo para sentirme mejor supongo, pero bueno, le haye el gusto a estar en la habitacion lamentablemente

      espero que manaña llueva todo el dia para acompañarme en mi tristeza

      que tengas linda semana santa, que descases o que hagas muchas actividades que te gusten, espero que estes bien
      `
    },
    {
      fecha: '2 de abril de 2026',
      titulo: 'Jueves',
      texto:
      `
      Hoy, fue un dia normal por lo menos no me duele la cabeza como ayer, ahora estoy tomando un cafe y luego me ire a hacer calistenia

      estaba considerando que deberia aprovechar que estoy en bogota e irme a un cine con IMAX y ver una pelicula en ese formato y justo como anda de estreno proyeto fin del mundo lo estaba considerando con muchas ganas para ser sincero, le pregunte a luis si iria a ver (no como invitacion sino para ver si le nacia ir e invitarlo a que vayamos) y me dijo que no asi que bueno no me voy a morir por ir solo y bueno cumplo uno de mis suenos de conocer un y ver una pelicula en IMAX 
      igualmente no se cuando voy a ir pero deberia no demorarme en tomar la desicion porque si mas lo pienso menos ganas me van a dar jaja
      el lunes ya empiezo cursar ciclo 2, estaria haciendo 3 materias de vuelta porque ya termine una, la que nos papeo el experto en gestion de proyectos que te comentaba la otra vez en fin 

      no hice nada hoy, lei e investigue a la manana y la tarde me dormi la siesta, ahora tomo el cafe y luego a entrenar y ya va a ser de noche asi que preprar la cena e irme a domrir para comenzar un nuevo dia

      saludos, jesus
      `
    },
];




}
