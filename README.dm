# SnailRaces

Aplicación web desarrollada con React y Express para simular una plataforma de carreras de caracoles y recargas de saldo mediante una pasarela de pagos ficticia llamada SnailPay.

## Tecnologías

### Frontend

- React
- TypeScript
- Vite
- Ant Design
- React Router
- Recharts
- LocalStorage
- Vitest
- Testing Library

### Backend

- Express
- TypeScript
- CORS
- Vitest

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

## Ejecución

Para utilizar la aplicación es necesario ejecutar el frontend y el backend.

### Frontend
Desde:

```bash
cd frontend
```

Ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

### Backend

Desde otra terminal:

```bash
cd backend
```

Ejecutar:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```
## Pruebas

### Frontend

Desde la carpeta `frontend`:

```bash
npm run test
```

Las pruebas cubren:
- Registro exitoso.
- Registro con correo duplicado.
- Inicio de sesión correcto.
- Inicio de sesión con contraseña incorrecta.
- Inicio de sesión sin usuario registrado.
- Actualización del balance y persistencia en LocalStorage.

### Backend

Desde la carpeta `backend`:

```bash
npm run test
```

Las pruebas cubren:
- Cobro aprobado.
- Tarjeta rechazada.
- Error interno de SnailPay.
- Datos inválidos.

## Registro e inicio de sesión

El registro y el inicio de sesión son simulados localmente.

La información del usuario, la sesión y el balance se almacenan en `LocalStorage`.

El usuario comienza con $0.00.

La contraseña original no se almacena en texto plano.

## SnailPay

SnailPay es una pasarela de pagos ficticia implementada en Express.

No se realizan pagos reales ni se procesa información financiera real.

Endpoint: 

```
POST http://localhost:3000/api/snailpay/recharge
```

La solicitud utiliza los siguientes datos:

```
userId
payerEmail
cardNumber
expiration
cvv
fullName
amount
```

### Escenarios de SnailPay

Los siguientes escenarios utilizan datos ficticios y permiten reproducir las diferentes respuestas del servicio.

1. Cobro aprobado
    
    Utilizar:

    ```
    Número de tarjeta: 1234123412341234
    Vencimiento:       12/26
    CVV:               543
    Nombre:             cualquier valor no vacío
    Monto:              cualquier valor mayor que 0
    ```

    Resultado:

    ```
    status: approved
    ```

    Mensaje: 

    ```
    La recarga fue aprobada correctamente.
    ```

2. Tarjeta rechazada

    Utilizar:

    ```
    Número de tarjeta: 7777777777777777
    ```

    Resultado:

    ```
    status: rejected
    ```

    Mensaje:

    ```
    La tarjeta fue rechazada. Verifica los datos o utiliza otra tarjeta.
    ```
    El balance no se modifica.

3. Datos inválidos

    Utilizar datos que no cumplan las condiciones necesarias para una recarga válida.

    Ejemplo:

    ```
    Número de tarjeta: 1234123412341234
    Vencimiento:       12/26
    CVV:               543
    Nombre:             Usuario de prueba
    Monto:              0
    ```

    Resultado:

    ```
    status: rejected
    ```

    Mensaje:

    ```
    Los datos de la recarga no son válidos. Verifica la información e inténtalo nuevamente.
    ```

    El balance no se modifica.

4.  Error interno del sistema

    Utilizar:

    ```
    Número de tarjeta: 9999999999999999
    ```

    Resultado:

    ```
    status: error
    ```

    Mensaje: 

    ```
    SnailPay no está disponible en este momento. No se realizó ninguna recarga.
    ```

    El balance no se modifica.

5. Timeout

    Utilizar:

    ```
    Número de tarjeta: 8888888888888888
    ```

    Esta tarjeta simula una respuesta demorada del servicio.
    
    El backend simula una demora de 5 segundos y el frontend tiene un tiempo máximo de espera de 3 segundos.

    Resultado esperado:

    ```
    Timeout
    ```

    Mensaje:

    ```
    SnailPay tardó demasiado en responder. No se realizó ninguna recarga. Intenta nuevamente.
    ```

    El balance no se modifica.

## Persistencia de la tarjeta

Después de una recarga aprobada, los datos de pago ficticios utilizados para la simulación se guardan en `LocalStorage` para precargar el formulario en futuras recargas.

Al cancelar una recarga:
- El monto ingresado se elimina.
- Los cambios realizados en los datos de la tarjeta se descartan.
- Los datos de pago previamente guardados permanecen.

Al registrar una cuenta nueva:
- Se crea el nuevo usuario.
- El balance inicia nuevamente en $0.00.
- Se eliminan los datos de pago guardados anteriormente.