import axiosInstance from "../../../../utils/axiosInstance.js";

export async function fetchPorFechas(desde, hasta) {
  if (!desde || !hasta) throw new Error("Fechas requeridas");
  const { data } = await axiosInstance.get("/fechas", { params: { desde, hasta } });
  return data;
}

export async function fetchPorTecnico(tecnicoNombre, desde, hasta) {
  if (!tecnicoNombre || !desde || !hasta) throw new Error("Datos incompletos");
  const { data } = await axiosInstance.get("/tecnico", { params: { tecnico: tecnicoNombre, desde, hasta } });
  return data;
}

export async function fetchPorOficina(oficinaId, desde, hasta) {
  if (!oficinaId || !desde || !hasta) throw new Error("Datos incompletos");
  const { data } = await axiosInstance.get("/oficina", { params: { oficina: oficinaId, desde, hasta } });
  return data;
}