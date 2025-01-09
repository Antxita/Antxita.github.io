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