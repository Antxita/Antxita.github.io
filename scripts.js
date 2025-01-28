
function obtenerBannerCercano() {
    var banners = document.querySelectorAll('.banner');
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
function areBannersVisible() {
    const banners = document.querySelectorAll('.banner'); // Selecciona todos los elementos con clase "banner"

    for (let banner of banners) {
        const rect = banner.getBoundingClientRect();
        
        // Verifica si el elemento está completamente fuera del viewport
        if (rect.top >= window.innerHeight || rect.bottom <= 0 || rect.left >= window.innerWidth || rect.right <= 0) {
        // El banner está fuera del viewport, por lo que no está visible
        continue; // Este banner no está visible
        } else {
        // Si un banner está dentro del viewport, retorna que está visible
        return true;
        }
    }

    // Si no hay banners visibles, retorna false
    return false;
}
document.getElementById('down-button-1').addEventListener('click', function() {
    var destino = document.getElementById('index');
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
document.getElementById('miradoc-box').addEventListener('click', function() {
    var destino = document.getElementById('miradoc');
    destino.scrollIntoView({
        behavior: 'smooth'
    });
});
document.getElementById('lakioska-box').addEventListener('click', function() {
    var destino = document.getElementById('lakioska');
    destino.scrollIntoView({
        behavior: 'smooth'
    });
});
document.getElementById('indepe-box').addEventListener('click', function() {
    var destino = document.getElementById('indepe');
    destino.scrollIntoView({
        behavior: 'smooth'
    });
});
window.addEventListener('scroll', function() {
    const targetElement = document.getElementById('index');
    let rect = targetElement.getBoundingClientRect();
    if (rect.bottom < 0) {
        document.getElementById('upButton').classList.add('show');
        // Añadir un evento de clic al triángulo de subir
        document.getElementById('upButton').addEventListener('click', function() {
            // Obtener el elemento con el id "content-1"
            const element = document.getElementById("index");

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
    var areBannersVisibleBool = areBannersVisible();
    if(banner != null && !areBannersVisibleBool){
        if (banner.id == "ccdoc-banner-section"){
            watermarkSection.style.top = "67%";
            watermarkDiv.innerHTML="<hr style='display: inline-block; width: 20vh; margin-bottom: .2em;margin-right: 3vh; opacity: 10%;'><span id='watermark-text' style='font-weight: 300; font-size: small;'>CORPORACIÓN CHILENA DEL DOCUMENTAL</span>";
        }else if (banner.id == "miradoc-banner-section"){
            watermarkSection.style.top = "40%";
            watermarkDiv.innerHTML="<hr style='display: inline-block; width: 20vh; margin-bottom: .2em;margin-right: 3vh; opacity: 10%;'><span id='watermark-text' style='font-weight: 300; font-size: small;'>MIRADOC</span>";
        }else if (banner.id == "lakioska-banner-section"){
            watermarkSection.style.top = "40%";
            watermarkDiv.innerHTML="<hr style='display: inline-block; width: 20vh; margin-bottom: .2em;margin-right: 3vh; opacity: 10%;'><span id='watermark-text' style='font-weight: 300; font-size: small;'>LA KIOSKA</span>";
        }else if (banner.id == "indepe-banner-section"){
            watermarkSection.style.top = "67%";
            watermarkDiv.innerHTML="<hr style='display: inline-block; width: 20vh; margin-bottom: .2em;margin-right: 3vh; opacity: 10%;'><span id='watermark-text' style='font-weight: 300; font-size: small;'>MEDIOAMBIENTE INDEPENDENCIA</span>";
        }
        watermarkSection.style.opacity = "100%";
    }else{
        watermarkSection.style.opacity = "0%";
    }
});
// Función que se ejecutará cuando el elemento esté en la mitad de la vista
function handleIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Verificamos que el elemento esté al menos a la mitad visible
      const section = entry.target;

      // Seleccionamos las imágenes
      const images = section.querySelectorAll('img.vertical-gallery-image, img.horizontal-gallery-image');

      // Aplicamos la clase 'scaled' a cada imagen para el efecto de escalado
      images.forEach(img => {
        img.classList.add('scaled');
        // Después de 0.5 segundos, eliminamos el efecto de escalado
        setTimeout(() => {
          img.classList.remove('scaled');
        }, 500);
      });
    }
  });
}
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
  
  // Crear el IntersectionObserver
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // El viewport del navegador
    rootMargin: '0px',
    threshold: 0.5 // El 50% del elemento debe estar visible
  });
  
  // Observar la sección
  const section = document.querySelector('#ccdoc-conecta-diplomas-catalog-section');
  observer.observe(section);

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
function actualizarContenido()  {
  var width = window.innerWidth;
  var section = document.getElementById('ccdoc-conecta-rrss-section');

  if (width < 769) {
    section.innerHTML = '<div><span>Posts tipo carrusel<br>para Instagram</span></div><div><img src="img/ccdoc-conecta-rrss-carrusels-mobile-1.png"><img src="img/ccdoc-conecta-rrss-carrusels-mobile-2.png"></div>';
  } else {
    section.innerHTML = '<img src="img/ccdoc-conecta-rrss-carrusels.png" alt="" style="display: block; width: 100%;">';
  }
}
// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', actualizarContenido);

// Ejecutar al redimensionar la ventana
window.addEventListener('resize', actualizarContenido);