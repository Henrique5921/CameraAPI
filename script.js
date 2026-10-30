document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('webcam');
    const placeholder = document.getElementById('placeholder');
    const btnToggle = document.getElementById('btn-toggle');

    let stream = null;

    btnToggle.addEventListener('click', async () => {
        // Se a câmera já estiver ligada, desliga
        if (stream) {
            stopCamera();
            return;
        }

        // Tenta ligar a câmera usando a MediaDevices API
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: { ideal: 1280 }, height: { ideal: 720 } }, 
                audio: false 
            });

            video.srcObject = stream;
            video.classList.add('active');
            placeholder.style.display = 'none';
            btnToggle.textContent = 'Desligar câmera';
            btnToggle.classList.add('active');
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões do seu navegador.');
        }
    });

    function stopCamera() {
        if (stream) {
            // Interrompe todas as tracks do stream de vídeo
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        video.srcObject = null;
        video.classList.remove('active');
        placeholder.style.display = 'block';
        btnToggle.textContent = 'Ligar câmera';
        btnToggle.classList.remove('active');
    }
});