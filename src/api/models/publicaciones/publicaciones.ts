export interface PublicacionesObject {
  publicaciones: Publicacion[];
 }

 export interface PublicacionObject {
  publicacion: Publicacion;
 }

 export interface Publicacion {
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

 export interface PublicacionDTO extends Omit<Publicacion, 'id_empleador' | 'id_estado_publicacion' | 'id_publicacion'| 'fecha_modificacion' | 'fecha_publicacion' > {}

 export interface PublicacionByID extends Omit<Publicacion, 'id_empleador' | 'id_estado_publicacion' | 'fecha_modificacion' | 'fecha_publicacion' > {}

 export interface PublicaDTO extends Omit<Publicacion, 'id_empleador' | 'id_estado_publicacion'> {}
