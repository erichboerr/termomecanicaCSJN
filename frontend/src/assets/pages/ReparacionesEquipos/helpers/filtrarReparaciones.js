import isTecnicoValido from "./isTecnicoValido";

const filtrarReparaciones = (data, rolId, userId, tecnicoSeleccionado) => {
    // Filtra las reparaciones que no están finalizadas
    const reparacionesActivas = data.filter(r => !r.Finalizado);

    if (rolId === 4) {
        return reparacionesActivas.filter((r) => r.idTecnico === userId);
    }
    if (isTecnicoValido(tecnicoSeleccionado)) {
        return reparacionesActivas.filter((r) => r.idTecnico === parseInt(tecnicoSeleccionado, 10));
    }
    // Devuelve el objeto de la reparación completo, no solo el equipo
    return reparacionesActivas;
};

export default filtrarReparaciones;