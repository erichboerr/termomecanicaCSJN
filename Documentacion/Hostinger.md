Debe tener instaldo en su movil Google autenticator

Host:
https://auth.hostinger.com/ar/login
    A) email: imgsoluciones@gmail.com
    B) Contraseña: Lanus.1293

Una vez dentro entrar en Perfil -> seguridad -> doble factor de autenticacion -> Activar 
    Seguir los pasos para activar el doble factor. 

Dentro del panel principal se puede administrar el domino, y la VPS

VPS:
Ingresar en VPS 
Presionando en terminal tiene acceso a la consola de la VPS 
root@srv1020406:~/termomecanicaCSJN-postgeSQL# este es la pagina, aqui esta git instalado y replicado del repositorio esta al dia con la rama main

Repositorio GitHub

1. Transferencia directa en GitHub
    Deben crear una cuenta en Github.com
    Pasarme el usuario creado.
    Paso la titularidad del proyecto al nuevo usuario.
2. Clonado y nuevo repo en su cuenta
    git clone --mirror git@github.com:tuusuario/TermomecanicaCSJN.git
    cd TermomecanicaCSJN.git
    git push --mirror git@github.com:propietario/TermomecanicaCSJN.git    

“El repositorio será transferido a la cuenta del propietario en GitHub, quedando allí toda la historia de commits y ramas. A partir de ese momento, la administración del código y la VPS será responsabilidad exclusiva del propietario.”

📄 Entrega del Proyecto TermomecanicaCSJN
1. Repositorio en GitHub
El código fuente del proyecto se encuentra actualmente en mi cuenta personal. Para que el propietario tenga plena administración y titularidad, se seguirá este procedimiento:

Opción recomendada (transferencia directa):

1. El propietario debe crear una cuenta en GitHub (si no la tiene).

2. Yo transferiré el repositorio a su cuenta desde Settings → General → Transfer ownership.

3. Una vez transferido, el propietario será el dueño del repositorio y podrá administrar colaboradores, ramas y configuraciones.

4. Yo quedaré desvinculado y podré eliminar mi copia original.

Opción alternativa (clonado manual):

1. El propietario crea un repositorio vacío en su cuenta.

2. Se clona el repositorio actual en modo espejo:
git clone --mirror git@github.com:miusuario/TermomecanicaCSJN.git
cd TermomecanicaCSJN.git
git push --mirror git@github.com:propietario/TermomecanicaCSJN.git

3. Esto copia todo el historial de commits y ramas.
4. Luego se elimina el repositorio original de mi cuenta.

2. Administración de la VPS en Hostinger
Acceder al panel de Hostinger con las credenciales entregadas.
