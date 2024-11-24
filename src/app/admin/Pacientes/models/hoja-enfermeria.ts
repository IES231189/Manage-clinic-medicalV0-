export interface HojaEnfermeria {
  idHoja?: number;
  idPaciente: number;
  nombrePaciente: string;
  edad: number;
  fecha: Date; 
  signosVitales: {
    temperatura: number;
    presionArterial: string;
    frecuenciaCardiaca: number;
    saturacionOxigeno: number;
  };
  medicamentosAdministrados: {
    nombre: string;
    dosis: string;
    hora: string;
  }[];
  notas: string;
  enfermeroResponsable: string;
}
