export interface PostulantesObject {
    data: Postulante[];
   }

   export interface Postulante {
    apellido:              string;
    email:                 string;
    id_estado_postulacion: number;
    id_postulacion:        number;
    nombre:                string;
   }
  