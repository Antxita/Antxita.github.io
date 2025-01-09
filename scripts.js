function obtenerBannerCercano() {
    const banners = document.querySelectorAll('.banner');
    let bannerCercano = null;
    let distanciaMinima = Number.MAX_VALUE;

    // Recorrer todos los banners
    banners.forEach(banner => {
        const rect = banner.getBoundingClientRect();

        // Verificar si el banner está por encima de la vista del usuario
        if (rect.bottom < 0) {
            // Si está por encima, calcular la distancia desde el borde superior de la ventana
            const distancia = Math.abs(rect.bottom); // Distancia desde el borde superior del viewport

            // Verificar si este banner está más cerca que el anterior encontrado
            if (distancia < distanciaMinima) {
                distanciaMinima = distancia;
                bannerCercano = banner;
            }
        }
    });

    // Retornar el ID del banner más cercano
    return bannerCercano ? bannerCercano.id : null;
}
document.getElementById('down-button-1').addEventListener('click', function() {
    var destino = document.getElementById('content-1');
    destino.scrollIntoView({
        behavior: 'smooth'
    });
});
document.getElementById('ccdoc-box').addEventListener('click', function() {
    var destino = document.getElementById('ccdoc');
    destino.scrollIntoView({
        behavior: 'smooth'
    });
});
window.addEventListener('scroll', function() {
    const targetElement = document.getElementById('content-1');
    const rect = targetElement.getBoundingClientRect();
    if (rect.bottom < 0) {
        document.getElementById('upButton').classList.add('show');
        // Añadir un evento de clic al triángulo de subir
        document.getElementById('upButton').addEventListener('click', function() {
            // Obtener el elemento con el id "content-1"
            const element = document.getElementById("content-1");

            // Obtener la posición vertical del elemento en relación con el documento
            const topPosition = element.offsetTop;

            // Realizar el desplazamiento suave hasta el elemento
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        });
    } else {
        document.getElementById('upButton').classList.remove('show');
    }
});
window.addEventListener('scroll', function() {
    var banner = document.getElementById(obtenerBannerCercano());
    var watermarkSection = document.getElementById('watermark-section');
    var watermarkDiv = document.getElementById('watermark-div');
    if(banner != null){
        if (banner.id = "ccdoc-banner-section"){
            watermarkDiv.innerHTML="<hr style='display: inline-block; width: 20vh; margin-bottom: .2em;margin-right: 3vh; opacity: 10%;'><span id='watermark-text' style='font-weight: 300; font-size: small;'>CORPORACIÓN CHILENA DEL DOCUMENTAL</span>";
        }else if (banner.id = "miradoc-banner-section"){
            watermarkDiv.innerHTML="MIRADOC ESTRENOS";
        }
        watermarkSection.style.opacity = "100%";
    }else{
        watermarkSection.style.opacity = "0%";
    }
});
// Obtener todos los elementos de imagen de la galería
const horizontalImages = document.querySelectorAll('.horizontal-gallery-image');
const verticalImages = document.querySelectorAll('.vertical-gallery-image');

// Añadir un evento click a cada imagen de la galería
horizontalImages.forEach(image => {
    image.addEventListener('click', function(event) {
        // Prevenir la propagación del evento hacia el documento (evita que se deseleccione inmediatamente)
        event.stopPropagation();
        // Si la imagen ya tiene la clase 'clicked', se deselecciona (se elimina la clase)
        if (this.classList.contains('clicked')) {
            this.classList.remove('clicked');
        } else {
            // Si no tiene la clase 'clicked', se elimina de todas las imágenes y se agrega a la clicada
            horizontalImages.forEach(img => {
                img.classList.remove('clicked');
            });
            verticalImages.forEach(img => {
                img.classList.remove('clicked');
            });
            this.classList.add('clicked');
        }
    });
});
// Añadir un evento click a cada imagen de la galería
verticalImages.forEach(image => {
    image.addEventListener('click', function(event) {
        // Prevenir la propagación del evento hacia el documento (evita que se deseleccione inmediatamente)
        event.stopPropagation();
        // Si la imagen ya tiene la clase 'clicked', se deselecciona (se elimina la clase)
        if (this.classList.contains('clicked')) {
            this.classList.remove('clicked');
        } else {
            // Si no tiene la clase 'clicked', se elimina de todas las imágenes y se agrega a la clicada
            horizontalImages.forEach(img => {
                img.classList.remove('clicked');
            });
            verticalImages.forEach(img => {
                img.classList.remove('clicked');
            });
            this.classList.add('clicked');
        }
    });
});

// Añadir un evento click al documento para deseleccionar cualquier imagen si se hace clic fuera de la galería
document.addEventListener('click', function() {
    // Eliminar la clase 'clicked' de todas las imágenes cuando se hace clic fuera de la galería
    horizontalImages.forEach(img => {
        img.classList.remove('clicked');
    });
    verticalImages.forEach(img => {
        img.classList.remove('clicked');
    });
});
// Seleccionamos los elementos que queremos resaltar
const galleryImages = document.querySelectorAll('.horizontal-gallery-image, .vertical-gallery-image');
// Variable para almacenar la última posición del scroll
let lastScrollTop = 0;
// Función que se llama cuando el "observador" detecta la intersección de la sección con el viewport
const highlightImages = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Detectamos si el usuario está scrolleando hacia abajo
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Comparamos la posición actual del scroll con la anterior
            if (currentScrollTop < lastScrollTop) {
                // El usuario está scrolleando hacia abajo
                galleryImages.forEach(image => {
                    image.classList.add('highlight');
                });

                // Después de 500ms (0.5 segundos), eliminamos la clase 'highlight' para que el efecto sea momentáneo
                setTimeout(() => {
                    galleryImages.forEach(image => {
                        image.classList.remove('highlight');
                    });
                }, 500);  // 500ms = 0.5 segundos
            }

            // Actualizamos la última posición del scroll
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        }
    });
};

// Crear un observador con las opciones adecuadas
const observer = new IntersectionObserver(highlightImages, {
    root: null, // Utiliza el viewport como la raíz
    threshold: 0.5 // Actúa cuando el 50% de la sección es visible
});

// Seleccionamos la sección con el id 'ccdoc-conecta-diplomas-catalog-section'
const section = document.querySelector('#ccdoc-conecta-diplomas-catalog-section'); // Selecciona la sección con el id específico

const deviceHasPointer = window.matchMedia('(pointer: fine)').matches;
const container = document.querySelector('.magnifying-glass');
const magnifier = document.querySelector('.magnifying-glass__magnifier');
const enlargedImage = document.querySelector('.magnifying-glass__enlarged-image');
const speed = 0.2;

let containerRect = {};
let mouse = { x: 0, y: 0 };
let glass = { x: 0, y: 0 };
let enlargedImagePos = { x: 0, y: 0 };
let aboveImage = false;
let runMovement = false;
    
function init () {
  if (deviceHasPointer) {
    containerRect = container.getBoundingClientRect();

    window.addEventListener('mousemove', this.getMousePos);
    container.addEventListener('mouseenter', this.showGlass);
    container.addEventListener('mouseleave', this.hideGlass);
    moveGlass();
  }
}
function getMousePos (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
function moveGlass () {
  // Calculate smooth mouse movement
  glass.x = lerp(glass.x, mouse.x, speed);
  glass.y = lerp(glass.y, mouse.y, speed);
  
  // Calculate enlarged image position
  enlargedImagePos.x = (glass.x - containerRect.left) / containerRect.width * -100;
  enlargedImagePos.y = (glass.y - containerRect.top) / containerRect.height * -100;
   
  // Set style positions
  magnifier.style.transform = `translate(calc(${glass.x}px - 50%), calc(${glass.y}px  - 50%))`;
  enlargedImage.style.transform = `translate(${enlargedImagePos.x}%, ${enlargedImagePos.y}%)`;

  if (runMovement)
    requestAnimationFrame(moveGlass);
}
function showGlass () {
  containerRect = container.getBoundingClientRect();
  aboveImage = true;
  runMovement = true;
  magnifier.style.opacity = '1';
  moveGlass();
}
function hideGlass () {
  aboveImage = false;
  magnifier.style.opacity = '0';
  setTimeout(() => { runMovement = false; }, 250);
}
function lerp (a, b, n) {
  return (1 - n) * a + n * b;
}
init();