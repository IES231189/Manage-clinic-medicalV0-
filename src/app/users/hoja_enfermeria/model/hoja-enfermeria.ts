// models/hoja-enfermeria.model.ts
export interface Medicamento {
  nombre: string;
  presentacion: string;
  dosis: string;
  via: string;
  hora: string;
  diaTratamiento: string;
}

export interface HojaEnfermeria {
  nombrePaciente: string;
  numeroCamilla: string;
  diagnostico: string;
  indicacionesMedicas: string;
  medicamentos: Medicamento[];
}
