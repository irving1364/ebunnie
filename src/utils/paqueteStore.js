import create from "zustand";

export const usePerfilStore = create(() => ({
    paquete_activo: 0,
    descripncion_paquete:'',
  }))
  
  
export const setPaquete = (paquete) => usePerfilStore.setState({ paquete })
export const setDescripcion = (descripncion_paquete) => usePerfilStore.setState({ descripncion_paquete })