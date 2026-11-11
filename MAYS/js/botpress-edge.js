(() => {
    const baseUrl = 'https://vdk-viber-runtime-prod.bot.botpress.host';
    const botId = '8fa58f62-82ea-4a52-8442-114e55c6404f';

    const initializeChat = async () => {
        const response = await fetch(`${baseUrl}/edge/bots/${botId}/config`);
        if (!response.ok) {
            throw new Error(`No se pudo cargar la configuración del bot: ${response.status}`);
        }

        const config = await response.json();
        if (!config.webchat || typeof config.webchat !== 'object') {
            throw new TypeError('La configuración del bot no contiene opciones de chat válidas.');
        }
        if (!window.VdkEdgeWebchat || typeof window.VdkEdgeWebchat.mount !== 'function') {
            throw new Error('No se pudo cargar el runtime Edge Webchat de Botpress.');
        }

        window.VdkEdgeWebchat.mount({
            ...config.webchat,
            mode: 'bubble',
            baseUrl,
            botId
        });
    };

    initializeChat().catch((error) => {
        console.error('No se pudo iniciar el bot de asistencia.', error);
    });
})();
