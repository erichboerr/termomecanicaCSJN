// src/hooks/useTecnicos.js
import { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL

export function useTecnicos() {
  const [tecnicos, setTecnicos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await fetch(`${API_URL}/usuariosTecnicos`)
        const data = await res.json()
        setTecnicos(data)
      } catch (err) {
        console.error('Error al obtener técnicos:', err)
        setTecnicos([])
      } finally {
        setLoading(false)
      }
    }
    fetchTecnicos()
  }, [])

  return { tecnicos, loading }
}