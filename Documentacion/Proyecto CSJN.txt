Proyecto CSJN
Roles 
Administrador Teknik
	1)	Alta baja de Supervisores propios y de CSJN (Hecho front)
	2)	Alta baja de Operarios (hecho Front)
	3)	Alta baja Equipos (hecho front)
		a.	Marca
		b.	Modelo
		c.	Serie
		d.	Ubicación 
		e.	Alimentación
		f.	Potencia
		g.	Capacidad
		h.	Gas Refrigerante
		i.	Estado
		j.	Observaciones
		k.	Fotos (2)
		l.	QR
		
Supervisor CSJN
	1)	Se debe loguear para tener acceso.
	2)	Ve el estado de los equipos.
	3)	Realiza pedios de servicio.
	4)	Realiza reclamos de pendientes de servicio.
	5)	Ve reparaciones realizadas. ¿última o historial?
	6)	Maneja el Excel. ¿Que debe contener ese Excel?
Supervisor Teknik
	1)	Se debe loguear para tener acceso.
	2)	Ve el estado de los equipos.
	3)	Ve pedidos de servicio.
	4)	Asigna técnicos a los pedidos de revisión/servicio.
	5)	Controla lo realizado por los operarios.
	6)	Genera técnicos. ¿Da de alta un nuevo técnico?
	7)	Maneja el Excel ¿Qué información debe contener el Excel?
Técnico Operario
	1)	Se debe loguear para tener acceso. 
	2)	Da de alta equipos con tildes (Marca, Modelo, Fotos, Ubicación Etc)
	3)	El operario ve solo los equipos asignados a su cargo para su reparación.
	4)	Carga reparaciones de equipos
	5)	Cambia el estado de funcionamiento del Equipo.
Análisis 
En los roles descriptos anteriormente, se ve que: 
El administrador Gral. trabaja sobre el servicio de dominio no es necesario no debe ingresar desde la aplicación. 
Cliente – Invitado (CSJN) y Usuario realizarían las mismas tareas excepto poder iniciar un reclamo. Esta tarea la realiza a su vez el Supervisor CSJN el usuario no debería realizar un reclamo porque para ello debería loguearse y eso lo convertiría en un supervisor CSJN.
Se deja ver que al dar de alta el equipo en el sistema se debe generar un QR único para ese equipo, el cual al escanearse te dirigirá a la página con los datos del equipo en cuestión, Mostrando todos los datos del ese equipo y dos fotos del equipo y el estado en que se encuentra al momento del escaneo.

Ciclo de vida 
	1)	Usuario informa al Supervisor CSJN que el equipo no funciona.
	2)	El supervisor CSJN se loguea en la aplicación busca en la lista de equipos operativos el equipo que no funciona, clickea en él se abre la información del equipo con estado Operativo ok (o como quieran ponerle). Debajo una caja de texto donde puede poner una descripción del problema y un botón que diga pedir revisión. Ese acto cambia el estado a Pedido de servicio y coloca la leyenda con la descripción, y se cambia al listado de Pedidos de reparación. 
	3)	El supervisor de Teknik le aparece el pedido de reparación. Clickea en el y ve el pedido, debajo tiene la opción de asignar un técnico. 
	4)	El técnico de Teknik ve que le fue asignado la reparación de ese equipo, lo visita, revisa y cambia el estado (de Pedido de servicio a En Revisión), si necesita repuestos o algo, podría colocar estado En Revisión y en una caja de texto colocar lo que encontró y que debe cambiarse. Esto para que, si el supervisor de CSJN entra, vea que fue visitado y que encontraron y en qué estado se encuentra.
	5)	Cuando el técnico lo repara y lo deja funcionando operativamente, vuelve a cambiar el estado a Operativo ok.
	6)	El equipo vuelve al listado de Operativo



