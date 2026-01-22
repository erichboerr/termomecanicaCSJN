export function getPreventivoRevision(date = new Date()) {
  const month = date.getMonth(); // 0=Ene, 9=Oct, 10=Nov, 11=Dic
  const year = date.getFullYear();

  // Año preventivo: arranca en noviembre y termina en octubre
  const preventivoYear = month >= 10 ? year + 1 : year;

  switch (month) {
    case 9: // Octubre → Anual
      return { year: preventivoYear, tipo: "anual" };
    case 0: // Enero → Trimestral
    case 6: // Julio → Trimestral
      return { year: preventivoYear, tipo: "trimestral" };
    case 3: // Abril → Semestral
      return { year: preventivoYear, tipo: "semestral" };
    default: // Resto → Mensual
      return { year: preventivoYear, tipo: "mensual" };
  }

}
