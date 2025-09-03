const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlayContent');
const pageOverlay = document.getElementById('pageOverlay');
const pageContent = document.getElementById('pageContent');
const arrowRight = document.getElementById('arrowRight');
const arrowLeft = document.getElementById('arrowLeft');

let pageIndex = 0;

// Lista de fotos/videos con sus mensajes
const specialSlides = [
    { type: "video", src: "fotos/dabue.mp4", text: "💖" },
    { type: "img", src: "fotos/dmama.jpg", text: "Hola hijo mío, eres y serás el único en mi vida. <br> Siempre estaré para ti como madre <br> - Con cariño, tu madre, Elisa" },
    { type: "video", src: "fotos/dtiad.mp4", text: "❤️" },
    { type: "img", src: "fotos/doyarce.jpg", text: "Felicidades funko!!!! (Edición limitada). No pienses  <br>mucho que se te inflama la cabeza jajaja - Wendy" },
    { type: "video", src: "fotos/dperu.mp4", text: "💕" },
    { type: "img", src: "fotos/dsuhey.jpg", text: "Felicidadesss Primo! <br> Mira que hemos compartido historias desde críos… aunque una de las más míticas siempre será aquella vez que te me caíste de cabeza 🤦‍♂ <br> (y aún así saliste bastante bien, dentro de lo que cabe). <br> Te quiero un montón y me alegra saber que, a pesar de que a veces seas bastante jodido, seguimos tirando juntos como siempre. <br> Espero que sigamos igual de unidos muchos años más, con risas, discusiones tontas y recuerdos que nos hagan decir: “qué infancia la nuestra”. <br> ¡A por más momentos épicos, que esto no ha hecho más que empezar! 🍻 - Suhey" },
    { type: "img", src: "fotos/dcarlos.jpg", text: "Nunca serás olvidado 🕊 - Carlos" },
    { type: "img", src: "fotos/dmarco.jpg", text: "Cada gota de sudor es una inversión en tu mejor <br> versión - Marco" },
    { type: "img", src: "fotos/ddiegoj.jpg", text: "Feliz cumpleaños primo espero que mejores en las fiestas por que <br> últimamente te veo muy decaído supongo que serán <br> los años pero siempre serás para nosotros Caicedo 🫡 - Diego J." },
    { type: "img", src: "fotos/ddiegoh.jpg", text: "Muchas felicidades pendejo! Espero que pases un bonito día, ya sabes <br> que me tienes apaga lo que necesites , me alegra un montón que <br> aunque pasen los años nos sigamos llevando así de bien. Cuando se <br> pueda nos queda algún viajecillo por hacer, ya sabes 😝 Te quiero a <br> tope de físico para el f7 eh perra más te vale hacer cardio en el gym. <br> Un fuerte abrazo, de tu primito favorito 🫡🙂‍↕ Se te quiere perro! 🖤 - Diego H."},
    { type: "img", src: "fotos/dluis.jpg", text: "Lo que pasa en Cesus se queda en Cesus y que cumpla muchos más el <br> padre de Helpdesk, por más incidencias y vivencias - Luis" },
];

// Ampliar fotos/videos
gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        overlayContent.innerHTML = `<img src="${e.target.src}" alt="">`;
        overlay.style.display = 'flex';
    } else if (e.target.tagName === 'VIDEO') {
        overlayContent.innerHTML = `<video src="${e.target.src}" controls autoplay></video>`;
        overlay.style.display = 'flex';
    }
});

// Al cerrar overlay → parar cualquier video
overlay.addEventListener('click', () => {
    const vids = overlayContent.querySelectorAll('video');
    vids.forEach(v => {
        v.pause();
        v.currentTime = 0;
    });
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// --- Flecha derecha ---
arrowRight.addEventListener('click', () => {
    pageIndex++;
    arrowLeft.style.display = 'flex';
    pageOverlay.style.display = 'flex';

    // 👉 Nuevo: si ya hemos pasado la carta y todos los specialSlides
    if (pageIndex > specialSlides.length + 1) {
        pageOverlay.style.display = 'none'; // cerramos overlay
        arrowLeft.style.display = 'none';   // ocultamos flecha izq
        pageIndex = 0;                      // reseteamos para volver a empezar
        return;                             // salimos de la función
    }

    if (pageIndex === 1) {
        // Carta
        pageContent.innerHTML = `<div class="paper">
        <h2>Para el cumpleañero...</h2>
        <p>Hoy celebramos con mucha alegría tus 28 años de vida, y no queríamos dejar pasar la ocasión para decirte cuánto te queremos y lo orgullosos 
        que estamos de la persona en la que te has convertido. Y claro… también para meternos contigo, para qué mentirnos.
        <br><br>
        Eres una persona increíble, siempre dispuesto a estar ahí para los demás, y eso es algo que valoramos muchísimo.
        <br><br>
        Hemos compartido momentos inolvidables, llenos de sonrisas y cariño, y queremos seguir creando muchos más recuerdos a tu lado. Aquí tienes un 
        pequeño detalle que esperamos te guste y te recuerde lo especial que eres para nosotros.
        <br><br>
        Que este día esté lleno de alegría y risas, que sigas cumpliendo tus metas y puedas llegar a donde te propongas. 
        <br><br>
        ¡Feliz cumpleaños, Johann! 🎉 Con todo nuestro cariño.</p>
        </div>`;
    } else if (pageIndex > 1 && pageIndex <= specialSlides.length + 1) {
        // Mostrar las dedicatorias
        const slide = specialSlides[pageIndex - 2];
        if (slide.type === "img") {
            pageContent.innerHTML = `
                <div>
                    <img src="${slide.src}" alt="Dedicatoria">
                    <div class="caption-box">${slide.text}</div>
                </div>`;
        } else if (slide.type === "video") {
            pageContent.innerHTML = `
                <div>
                    <video src="${slide.src}" controls autoplay></video>
                    <div class="caption-box">${slide.text}</div>
                </div>`;
        }
    }
});


// --- Flecha izquierda ---
arrowLeft.addEventListener('click', () => {
    if (pageIndex > 0) pageIndex--;

    if (pageIndex === 0) {
        // Volver a la galería principal
        pageOverlay.style.display = 'none';
        arrowLeft.style.display = 'none';
    } else if (pageIndex === 1) {
        // Volver a mostrar la carta
        pageContent.innerHTML = `<div class="paper">
        <h2>Para el cumpleañero...</h2>
        <p>Hoy celebramos con mucha alegría tus 28 años de vida, y no queríamos dejar pasar la ocasión para decirte cuánto te queremos y lo orgullosos 
        que estamos de la persona en la que te has convertido. Y claro… también para meternos contigo, para qué mentirnos.
        <br><br>
        Eres una persona increíble, siempre dispuesto a estar ahí para los demás, y eso es algo que valoramos muchísimo.
        <br><br>
        Hemos compartido momentos inolvidables, llenos de sonrisas y cariño, y queremos seguir creando muchos más recuerdos a tu lado. Aquí tienes un 
        pequeño detalle que esperamos te guste y te recuerde lo especial que eres para nosotros.
        <br><br>
        Que este día esté lleno de alegría y risas, que sigas cumpliendo tus metas y puedas llegar a donde te propongas. 
        <br><br>
        ¡Feliz cumpleaños, Johann! 🎉 Con todo nuestro cariño.</p>
        </div>`;
    } else if (pageIndex > 1 && pageIndex <= specialSlides.length + 1) {
        // Mostrar el slide correspondiente hacia atrás
        const slide = specialSlides[pageIndex - 2];
        if (slide.type === "img") {
        pageContent.innerHTML = `
            <div>
            <img src="${slide.src}" alt="Especial">
            <div class="caption-box">${slide.text}</div>
            </div>`;
        } else if (slide.type === "video") {
        pageContent.innerHTML = `
            <div>
            <video src="${slide.src}" controls autoplay></video>
            <div class="caption-box">${slide.text}</div>
            </div>`;
        }
    }
});

// Revelado de imágenes al hacer scroll (reversible)
const options = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        } else {
        entry.target.classList.remove('visible');
        }
    });
}, options);

document.querySelectorAll('.gallery img, .gallery video').forEach(el => {
    observer.observe(el);
});
