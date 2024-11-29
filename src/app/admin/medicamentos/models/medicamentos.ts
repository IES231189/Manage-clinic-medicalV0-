

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
  id: string,
  nombre : string,
  precio : number,
  precioCompra : string,
  cantidadCajas : string,
  cantidadUnidadesCaja : number,
  patente : string,
  gramaje : string,
  presentacion : string,
  fechaCaducidad : Date
}
