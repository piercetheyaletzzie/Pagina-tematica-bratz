//agregar nombre y version de cache
const CACHE_NAME='v1_cache_BRZ_PWA';

//Configuracion de los ficheros 
var urlsToCache= [
    './',
    './css/style.css',
    './img/aa.png',
    './img/aa-1.png',
    './img/aa-2.png',
    './img/aa-3.png',
    './img/aa-4.png',
    './img/aa-5.png',
    './img/aa-6.png',
    './img/aa-7.png',
    './img/aa-8.png',
    './img/aa-9.png',
    './img/aa-10.png',
    './img/aa-11.png',
    './img/bratz01.jpng',
    './img/bratz02.jpng',
    './img/bratz03.jpng',
    './img/header.jpg'
];
//permitir cargar los archivos en cache

self.addEventListener("install", e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(()=>{
                self.skipwatin();

            })
        })
        .catch(err=>console.log("Me duele la barriguita", err))
    );
});


//este evento activar nos permite que la pagina sea offline, osea que permite que se descarge 
self.addEventListener('activate', e =>{
    const cacheWhiteList = [CACHE_NAME];

    //el evento espera a que se termine
    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName => {
                if(cacheWhiteList.indexOf(cacheName)== -1)
                {
                    //borrar elementos que no se necesitan
                    return cache.delete(cacheName);
                }
                })
            );
        })
        .then(()=> {
            self.clients.claim(); // se activa el cache en el dispositivo 
        })
    );
})

//verifica que si se tienen los recursos en cache y si no los solicita
self.addEventListener('fetch', e=>{
    e.respondwith(
        caches.match(e.request)
        .then(res => {
            if(res){
                            //devuelvo datos desde ña cache
                return res;
            }
            return fetch(e.request); //se hace la peticion al servidor en caso de que no este disponible en ña cache
        })
    );
});