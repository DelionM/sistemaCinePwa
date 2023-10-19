self.addEventListener('install', event => {

    const recursos = caches.open('cacheRecursos').then(cache =>{
        cache.add('/');
        cache.add('index.html');
        cache.add('app.js');
        cache.add('manifest.json')
    });

    //crea las bovedas 
    const imagenes = caches.open('cacheImagenes').then(cache =>{
        cache.add('/')
        cache.add('img/iron.jpg');
        cache.add('img/globos-aerostaticos-atardecer_3840x2106_xtrafondos.com.jpg');
        cache.add('img/moo.jpg');
        cache.add('img/padrino.jpg');
        cache.add('img/parasitos.jpg');
        cache.add('img/carpixel.net-2020-bugatti-chiron-pur-sport-98311-hd.jpg');

    });
    //crea las bovedas2
    const css = caches.open('cacheCSS').then(cache =>{
        cache.add('/')
        cache.add('styles.css');
    });

    event.waitUntil(recursos); 

})

//esta es la estrategia 1 que hace lo de la cache
// self.addEventListener('fetch', event => {
//     event.respondWith(caches.match(event.request))
// })

//estrategia 0 only net 
// estrategi 1 only cache depende del cache 
// estrategi 2 first cache then network  la segundo mas rapida es un poco infunsional esta desfasada 
// estrategia 3 first network then cache le damos prioridad a internet y luego al cache es mas lenta que la 2

//sin internet lo vuela pero cuando retorna el internet recupere todos los archivos

// APARTIR DE AQUI LA 3
const CACHE_NAME ="BOVEDA 3-Almacén de todos los recursos";
self.addEventListener('fetch', event => {
    const respuesta = fetch (event.request).then((newResp) =>{
        caches.open(CACHE_NAME).then((cache)=>{
            cache.put(event.request, newResp);
        });

        return newResp.clone();

    }).catch(err=>{
        return caches.match(event.request);
    })
    event.respondWith(respuesta);

});



// 1 sin inter borra estilos 
// regreso a inter 
// regresa el interal final regreso a cache y veo que lo tenga guardado
// .ico 
//descargar iconos de cine diversos tamaños 24*24 48*48 128*128 256*256