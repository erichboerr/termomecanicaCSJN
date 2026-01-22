export function limpiarCampo(valor, reemplazo = 'Sin dato') {
  return valor && valor !== 'undefined' ? valor : reemplazo
}