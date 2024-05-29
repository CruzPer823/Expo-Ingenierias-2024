export const data = [
    { 
        id: 1, 
        title: "Sistema de riego inteligente para cultivos urbanos", 
        description: "Un sistema automatizado que utiliza sensores para monitorear las condiciones del suelo y del clima, optimizando el riego y maximizando el crecimiento de los cultivos en entornos urbanos.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(),
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 2, 
        title: "Dron de vigilancia y detección de incendios forestales", 
        description: "Un dron equipado con cámaras y sensores térmicos que sobrevuela áreas forestales en busca de incendios, proporcionando alertas tempranas y facilitando la intervención rápida de los bomberos.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 3, 
        title: "Dispositivo portátil para la detección temprana de desastres naturales", 
        description: "Un dispositivo compacto y de bajo costo que utiliza tecnología de sensores para detectar terremotos, tsunamis y otros desastres naturales, alertando a las personas y salvando vidas.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 4, 
        title: "Robot autónomo para la limpieza de playas contaminadas", 
        description: "Un robot marino diseñado para recoger desechos plásticos y otros residuos en playas y océanos, contribuyendo a la conservación del medio ambiente y la protección de la vida marina.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 5, 
        title: "Sistema de monitoreo de calidad del aire en áreas urbanas", 
        description: "Un sistema de sensores conectados a una red IoT que mide la contaminación del aire en tiempo real, proporcionando datos precisos para mejorar la calidad del aire en entornos urbanos y proteger la salud pública.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 6, 
        title: "Prototipo de casa sostenible con energía solar integrada", 
        description: "Una casa modular y ecológica que utiliza paneles solares para generar energía limpia y renovable, reduciendo la dependencia de los combustibles fósiles y promoviendo la autosuficiencia energética.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 7, 
        title: "Dispositivo de asistencia para personas con discapacidad visual", 
        description: "Un dispositivo portátil que utiliza tecnología de visión artificial para ayudar a las personas con discapacidad visual a navegar de manera segura por entornos desconocidos, mejorando su independencia y calidad de vida.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 8, 
        title: "Sistema de filtrado de agua potable para comunidades rurales", 
        description: "Un sistema de filtrado de bajo costo y fácil de mantener que purifica el agua contaminada, proporcionando acceso a agua potable segura para comunidades rurales y reduciendo la incidencia de enfermedades relacionadas con el agua.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 9, 
        title: "Dispositivo de alerta temprana para prevenir accidentes de tráfico", 
        description: "Un dispositivo instalado en vehículos que utiliza sensores y algoritmos de aprendizaje automático para detectar y prevenir colisiones, reduciendo el riesgo de accidentes de tráfico y salvando vidas.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    },
    { 
        id: 10, 
        title: "Aplicación móvil para el seguimiento y control de la gestión de residuos", 
        description: "Una aplicación intuitiva y fácil de usar que permite a los ciudadanos reportar problemas de gestión de residuos, facilitando la comunicación con las autoridades locales y promoviendo la conciencia ambiental en la comunidad.", 
        image: "micro.jpg", 
        nivelDesarrollo: getRandomItem(["Idea", "Prototipo"]), 
        categoria: getRandomItem(["Bio", "Neus", "Cyber"]), 
        ubicacion: getRandomLocation(), 
        status: getRandomItem(["Calificado", "No calificado"]) 
    }
];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Función para generar una ubicación aleatoria
function getRandomLocation() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    return randomLetter + randomNumber.toString();
}

