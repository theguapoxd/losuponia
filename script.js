// Elementos del DOM
const titulo = document.getElementById('titulo');
const siBtn = document.getElementById('siBtn');
const noBtn = document.getElementById('noBtn');
const container = document.querySelector('.container');
const confettiCanvas = document.getElementById('confetti');

// Configuración del confeti
const confettiSettings = { target: 'confetti' };
const confetti = new ConfettiGenerator(confettiSettings);

// Movimientos aleatorios para el botón NO
const movimientos = [
    { x: 200, y: -100 },
    { x: -150, y: 100 },
    { x: 100, y: -150 },
    { x: -200, y: -50 },
    { x: 150, y: 150 },
    { x: -100, y: 200 }
];

let movimientoIndex = 0;

// Evento para el botón NO
noBtn.addEventListener('click', function() {
    // Agregar clase para los efectos CSS
    container.classList.add('no-presionado');
    
    // Mover el botón NO a una posición aleatoria
    const movimiento = movimientos[movimientoIndex];
    noBtn.style.transform = `translate(${movimiento.x}px, ${movimiento.y}px) scale(0.7)`;
    
    // Incrementar el índice para el próximo movimiento
    movimientoIndex = (movimientoIndex + 1) % movimientos.length;
    
    // Quitar la clase después de un tiempo para permitir nuevos efectos
    setTimeout(() => {
        container.classList.remove('no-presionado');
    }, 1000);
});

// Evento para el botón SÍ
siBtn.addEventListener('click', function() {
    // Cambiar el título
    titulo.textContent = '¡Felizidades! Lo suponía';
    titulo.style.color = '#4CAF50';
    titulo.style.fontSize = '2.2em';
    
    // Iniciar el confeti
    confetti.render();
    
    // Crear efecto de chispas adicional
    crearChispas();
    
    // Reproducir sonido de celebración (opcional)
    reproducirSonidoCelebracion();
    
    // Ocultar los botones
    siBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // Agregar mensaje adicional después de 2 segundos
    setTimeout(() => {
        const mensajeExtra = document.createElement('p');
        mensajeExtra.textContent = '¡Bienvenido al club! 🎉';
        mensajeExtra.style.marginTop = '20px';
        mensajeExtra.style.fontSize = '1.5em';
        mensajeExtra.style.color = '#666';
        container.appendChild(mensajeExtra);
    }, 2000);
});

// Función para crear efecto de chispas
function crearChispas() {
    const chispasContainer = document.createElement('div');
    chispasContainer.className = 'chispas';
    document.body.appendChild(chispasContainer);

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const chispa = document.createElement('div');
            chispa.style.position = 'absolute';
            chispa.style.width = '10px';
            chispa.style.height = '10px';
            chispa.style.background = getColorAleatorio();
            chispa.style.borderRadius = '50%';
            chispa.style.left = '50%';
            chispa.style.top = '50%';
            chispa.style.boxShadow = '0 0 10px currentColor';
            
            const angulo = Math.random() * Math.PI * 2;
            const distancia = 100 + Math.random() * 200;
            const duracion = 1 + Math.random() * 1;
            
            chispa.style.animation = `volar ${duracion}s ease-out forwards`;
            chispa.style.setProperty('--x', Math.cos(angulo) * distancia + 'px');
            chispa.style.setProperty('--y', Math.sin(angulo) * distancia + 'px');
            
            chispasContainer.appendChild(chispa);
            
            // Eliminar la chispa después de la animación
            setTimeout(() => {
                chispa.remove();
            }, duracion * 1000);
        }, i * 50);
    }
    
    // Eliminar el contenedor después de que terminen todas las chispas
    setTimeout(() => {
        chispasContainer.remove();
    }, 3000);
}

// Función para obtener color aleatorio
function getColorAleatorio() {
    const colores = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FF69B4'];
    return colores[Math.floor(Math.random() * colores.length)];
}

// Función para reproducir sonido de celebración
function reproducirSonidoCelebracion() {
    // Crear un sonido simple usando el audio web API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        
        // Cambiar frecuencias para crear una melodía festiva
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
        oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // Do alto
        
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('El audio no está disponible');
    }
}

// Agregar la animación CSS para las chispas dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes volar {
        to {
            transform: translate(var(--x), var(--y));
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
