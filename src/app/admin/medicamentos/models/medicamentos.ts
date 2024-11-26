

export interface Medicamentos {
  fechaCaducidad : string;
  gramaje :string;
  nombre: string;
  patente: string;
  precio: number;
  precioCompra: number;
  presentaciones : string;

}


export interface Presentacion {
  nombre : string,
  precio : string,
  precioCompra : string,
  patente : string,
  gramaje : string,
  presentacion : string,
  fechaCaducidad : string
}
