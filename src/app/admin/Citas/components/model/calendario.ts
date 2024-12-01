export interface Calendario {
  id?: string;           // ID único para identificar la cita (opcional al crear una nueva cita)
  nombre: string;        // Nombre del paciente
  apellidos: string;     // Apellidos del paciente
  num_tel: number;       // Número de teléfono del paciente
  start: string;         // Fecha y hora de inicio en formato ISO (por ejemplo: 2024-05-13T09:00:00)
  end: string;           // Fecha y hora de fin en formato ISO
  color?: string;        // Color del evento (opcional, usado para la interfaz)
}
