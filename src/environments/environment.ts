export const environment = {
  production: false,
  apiHost: "http://localhost:4000",
  /**************************************************************************************************/
  apiAuthUrl: "/api/auth",
  apiPublicacionUrl: "/api/publicaciones",
  apiEmpleadosUrl:"/api/empleado",
  apiUserUrl: "/api/usuarios",
  apiCalificacionesUrl: '/api/calificaciones',
  /**************************************************************************************************/
  apiRegistroPublicacionUrl: "/nuevaPublicacion",
  apiObtenerPublicacionesActivasUrl: "/listaPublicaciones/activas/",
  apiObtenerPublicacionesCerradasUrl: "/listaPublicaciones/cerradas/",
  apiEliminarPublicacionUrl: "/eliminarPublicacion/",
  /**************************************************************************************************/
  apiCategoriasUrl: "/api/categorias/",
  /**************************************************************************************************/
  apiModificarPublicacionUrl: "/modificarPublicacion/",
  apiObtenerPublicacionById: "/publicacionById/",
  /**************************************************************************************************/
  apiGetUser: "/obtenerUsuario/",
  apiUpdateUser: "/editarUsuario/",
  /**************************************************************************************************/
  apiObtenerPublicacionesActivas: "/listaPublicacionesActivas/",
  apiCrearPostulacion: "/postular",
  apiCancelarPostulacion: "/cancelarPostulacion/",
  apiListaPostulacionesPorUsuario: "/listaPostulaciones/",
  apiListaPostulantes: "/listaPostulantes/",
  apiEstadoPostulacionAceptado:"/aceptarPostulacion/",
  apiEstadoPostulacionCancelada:"/rechazarPostulacion/",
  apiListaContratosActivos: "/listaContratosActivos/",
  apiListaContratosCerrados: "/listaContratosCerrados/",
  /**************************************************************************************************/
  apiGenerarCalificacionEmpleado: "/calificarEmpleado",
  apiGenerarCalificacionEmpleador: "/calificarEmpleador",
  apiCerrarPublicacion: "/verificarYCerrar/",
}
