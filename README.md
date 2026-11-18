# Bot Forge para Minecraft

## Requisitos

- Node.js 22 o superior
- Git instalado (npm descarga la implementación experimental del handshake desde GitHub)

## Instalación y ejecución

Descomprime el ZIP, abre una terminal en esa carpeta y ejecuta:

```bash
npm install
npm start
```

`npm install` aplica automáticamente el parche de compatibilidad Forge. El bot usa
`epsteins.play.hosting:25565` y anuncia `AFK_Bot`. En un servidor offline, el nombre
no es una cuenta autenticada: cámbialo por uno único en `index.js` y no ejecutes
otra instancia del bot con el mismo nombre.

El servidor HTTP de estado escucha en el puerto `3000`.

## Notas

- El cliente Mineflayer no ejecuta gráficos ni los mods Java. El handshake Forge
  permite entrar, pero no implementa las funciones de juego de cada mod.
- La compatibilidad Forge depende de una rama experimental y de los canales de
  mods del servidor. Si se desconecta, revisa el output de Node y el `latest.log`.
- `ETIMEDOUT` suele indicar un problema de conectividad al puerto del servidor,
  no un error de protocolo.
