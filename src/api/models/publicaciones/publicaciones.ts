export interface PublicacionObject {
  publicaciones: Publicaciones[];
 }

 export interface Publicaciones {
  ciudad:                string;
  descripcion:           string;
  fecha_modificacion:    Date;
  fecha_publicacion:     Date;
  id_categoria:          number;
  id_empleador:          number;
  id_estado_publicacion: number;
  id_publicacion:        number;
  pago:                  string;
  provincia:             string;
  titulo:                string;
 }

export interface PublicacionDTO extends Omit<Publicaciones, 'id_empleador' | 'id_estado_publicacion' | 'id_publicacion'| 'fecha_modificacion' | 'fecha_publicacion' > {}
