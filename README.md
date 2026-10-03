# Guía de Ionic + Angular + Capacitor para Android

Guía paso a paso desde cero: instalación de herramientas, creación de un proyecto, ejecución y generación de la app para Android.

## Qué es cada herramienta

| Herramienta | Función |
|---|---|
| **Angular** | Framework para la lógica y las pantallas. Se instala solo dentro del proyecto. |
| **Ionic** | Componentes visuales con aspecto de app móvil (botones, tarjetas, listas, etc.). |
| **Capacitor** | Empaqueta la app web como app nativa de Android y da acceso a funciones del celular. |
| **Android Studio** | Compila la app y proporciona el emulador y el SDK de Android. |
| **Node.js / npm** | Ejecuta las herramientas y descarga las dependencias. |

---

## 1. Requisitos del equipo (Windows)

- Windows 10/11 de 64 bits
- 8 GB de RAM (16 GB recomendado)
- Unos 10 GB libres en disco
- Virtualización activada en la BIOS (Intel VT-x / AMD-V) para que el emulador funcione bien

---

## 2. Instalar Node.js

1. Descargar la versión **LTS** desde https://nodejs.org
2. Instalar con las opciones por defecto.
3. Verificar en una terminal nueva:

```bash
node -v
npm -v
```

---

## 3. Instalar Android Studio

1. Descargar desde https://developer.android.com/studio
2. Ejecutar el instalador y dejar las opciones por defecto (incluido **Android Virtual Device**).
3. Abrir Android Studio y completar el **Setup Wizard**:
   - **Do not import settings**
   - Instalación **Standard**
   - Elegir tema
   - Aceptar las licencias y pulsar **Finish**
   - Esperar a que descargue el SDK, Platform-Tools y el emulador

### Verificar el SDK

1. Pantalla de bienvenida: **More Actions → SDK Manager** (dentro de un proyecto: **Settings → Languages & Frameworks → Android SDK**).
2. En **SDK Platforms**, confirmar que hay una versión reciente de Android marcada.
3. En **SDK Tools**, confirmar que están marcados:
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android Emulator
4. Anotar la **Android SDK Location**, normalmente:
   `C:\Users\TU_USUARIO\AppData\Local\Android\Sdk`

---

## 4. Configurar variables de entorno

1. Buscar en Windows **"Editar las variables de entorno del sistema"**.
2. Pulsar **Variables de entorno**.
3. En **Variables de usuario**, pulsar **Nueva**:
   - Nombre: `ANDROID_HOME`
   - Valor: la ruta del SDK anotada antes
4. Seleccionar la variable **Path**, pulsar **Editar → Nuevo** y agregar:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   ```
5. Aceptar todo, **cerrar y volver a abrir la terminal**.
6. Verificar:

```bash
adb --version
```

---

## 5. Preparar un dispositivo para probar

### Opción A: emulador

1. En Android Studio abrir **Device Manager** (ícono de celular en la barra superior derecha, o **Tools → Device Manager**).
2. Pulsar **Create Device**.
3. Elegir un modelo (por ejemplo **Pixel 7**) y pulsar **Next**.
4. Elegir una imagen del sistema (por ejemplo **API 34**), descargarla si hace falta y pulsar **Next → Finish**.
5. Pulsar **▶** para arrancarlo y comprobar que abre.

### Opción B: celular físico

1. **Ajustes → Acerca del teléfono** y tocar 7 veces **Número de compilación**.
2. **Ajustes → Opciones de desarrollador** y activar **Depuración USB**.
3. Conectar por cable USB (cable de datos) y aceptar el mensaje de permiso.
4. Verificar que aparece:

```bash
adb devices
```

Debe mostrarse con el estado `device`.

---

## 6. Instalar Ionic CLI

```bash
npm install -g @ionic/cli
ionic --version
```

> No hace falta instalar Angular por separado. Se descarga automáticamente dentro del proyecto. El Angular CLI global (`npm install -g @angular/cli`) es opcional.

---

## 7. Crear el proyecto

```bash
ionic start mi-app blank --type=angular --capacitor
cd mi-app
```

- `mi-app`: nombre del proyecto (puede ser el que quieras).
- `blank`: plantilla vacía. Otras opciones: `tabs`, `sidemenu`.
- `--type=angular`: usa Angular como framework.
- `--capacitor`: incluye Capacitor para generar la app nativa.

Si pregunta entre **NgModules** y **Standalone**, elegir **Standalone**. Si ofrece crear una cuenta de Ionic o configuraciones opcionales, se puede responder que no.

### Generar páginas, servicios y componentes

```bash
ionic generate page pages/nombre-pagina
ionic generate service services/nombre-servicio
ionic generate component components/nombre-componente
```

| Comando | Qué crea |
|---|---|
| `ionic generate page` | Una pantalla completa |
| `ionic generate service` | Una clase con lógica y datos reutilizables |
| `ionic generate component` | Una pieza visual reutilizable |

Se pueden generar tantos como se necesiten. Estructura típica:

```
src/app/
├── pages/        → pantallas de la app
├── services/     → lógica y manejo de datos
└── components/   → piezas visuales reutilizables
```

---

## 8. Probar en el navegador

```bash
ionic serve
```

Se abre en `http://localhost:8100`. Conviene probar aquí primero, es más rápido que el emulador. Para detenerlo: `Ctrl + C`.

---

## 9. Pasar a Android

Solo la primera vez:

```bash
ionic build
npx cap add android
npx cap sync
npx cap open android
```

En Android Studio:

1. Esperar a que termine el **Gradle sync** (barra de progreso abajo a la derecha; la primera vez tarda).
2. Elegir el emulador o celular en la barra superior.
3. Pulsar **Run ▶**.

Alternativa sin abrir Android Studio:

```bash
npx cap run android
```

---

## 10. Actualizar cambios

Cada vez que se modifique el código:

```bash
ionic build
npx cap sync
```

Luego **Run ▶** en Android Studio, o directamente:

```bash
ionic build
npx cap run android
```

| Comando | Qué hace |
|---|---|
| `ionic build` | Compila Angular y deja el resultado en la carpeta `www` |
| `npx cap sync` | Copia el build al proyecto nativo de Android y actualiza plugins |
| `npx cap run android` | Sincroniza, compila e instala en el dispositivo conectado |

### Live Reload (desarrollo rápido)

```bash
ionic cap run android -l --external
```

La app se actualiza sola al guardar archivos. El dispositivo y el PC deben estar en la misma red.

---

## 11. Resumen de comandos

```bash
# Verificación
node -v
npm -v
adb --version
adb devices
ionic --version

# Instalación de Ionic
npm install -g @ionic/cli

# Proyecto
ionic start mi-app blank --type=angular --capacitor
cd mi-app
ionic generate page pages/nombre-pagina
ionic generate service services/nombre-servicio
ionic generate component components/nombre-componente

# Desarrollo
ionic serve

# Android (primera vez)
ionic build
npx cap add android
npx cap sync
npx cap open android

# Android (cambios posteriores)
ionic build
npx cap sync
npx cap run android
```

---

## 12. Solución de problemas

### `Cannot find module '@ionic/angular/standalone'`

Ionic 9 cambió la ruta de importación. Los componentes standalone ahora se importan desde `@ionic/angular`:

| Versión de Ionic | Import correcto |
|---|---|
| Ionic 9 | `@ionic/angular` |
| Ionic 8 o anterior | `@ionic/angular/standalone` |

Revisar la versión instalada:

```bash
npm ls @ionic/angular
```

Si el error persiste, reinstalar dependencias: borrar `node_modules` y `package-lock.json`, y ejecutar `npm install`. En VS Code también ayuda `Ctrl + Shift + P → TypeScript: Restart TS Server`.

### `waiting for all target devices to come online`

La app espera a que el dispositivo esté listo. Pasos en orden:

1. Esperar a ver la pantalla de inicio de Android en el emulador.
2. Reiniciar adb:
   ```bash
   adb kill-server
   adb start-server
   adb devices
   ```
3. **Device Manager → ⋮ → Cold Boot Now**.
4. Si sigue, **⋮ → Wipe Data**.
5. Crear un emulador nuevo (Pixel 7, API 34).

### `adb devices` muestra `offline`

1. Cerrar el emulador y ejecutar `adb kill-server` y `adb start-server`.
2. Arrancar el emulador de nuevo y esperar a que cargue por completo.
3. Cold Boot o Wipe Data desde Device Manager.
4. Comprobar que solo hay un `adb` en el sistema:
   ```bash
   where adb
   ```
5. Celular físico: desconectar, **Revocar autorizaciones de depuración USB**, reconectar y aceptar el permiso.

### `adb devices` muestra `unauthorized`

Aceptar el mensaje "¿Permitir depuración USB?" en la pantalla del celular.

### `adb` no se reconoce

Revisar `ANDROID_HOME` y el `Path` (sección 4) y reiniciar la terminal.

### El emulador va lento o no abre

- Activar **Intel VT-x / AMD-V** en la BIOS.
- En Windows, activar **Plataforma del hipervisor de Windows** y **Plataforma de máquina virtual** desde "Activar o desactivar las características de Windows", y reiniciar.

### Gradle falla al sincronizar

Verificar la conexión a internet y esperar; la primera sincronización descarga muchas dependencias.

### `ionic cap open android` no abre Android Studio

Abrir Android Studio manualmente, pulsar **Open** y seleccionar la carpeta `android` dentro del proyecto.

### No se ven los cambios en la app

- Se olvidó ejecutar `npx cap sync` después de `ionic build`.
- Desinstalar la app del dispositivo y volver a ejecutar.
- Si `ionic build` muestra errores, corregirlos primero: si el build falla, no se actualiza nada.

---

## 13. Dónde está Device Manager en Android Studio

- **Con proyecto abierto:** ícono de celular en la barra superior derecha, o **Tools → Device Manager**, o la pestaña lateral derecha.
- **Sin proyecto:** **More Actions → Virtual Device Manager**.
- **Si no lo encuentras:** doble `Shift`, escribir *Device Manager* y pulsar Enter.

---

## 14. Flujo de trabajo en una frase

> Cambio el código → `ionic build` genera la web → `npx cap sync` la copia a Android → Run la instala en el dispositivo.
