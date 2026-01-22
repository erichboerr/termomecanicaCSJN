export function mapRolIdToKey(rolId) {
  const map = {
    1: "admin",
    2: "supervisorTekNet",
    3: "supervisorCSJN",
    4: "tecnico",
    5: "cliente",
    6: "preventivo",
  };
  return map[rolId] || "cliente";
}
