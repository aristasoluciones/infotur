import { reactive } from 'vue';
import ICaptura from '@/types/ICaptura';

const current_captura: ICaptura = {
        id_usuario_captura: null,
        id_modulo_informacion: null,
        select_nacionalidad: null,
        select_pais_origen: null,
        select_estado: null,
        select_municipio: null,
        select_genero: null,
        diversidad_sexual: null,
        edad: null,
        select_escolaridad: null,
        correo: null,
        discapacidad: null,
        numero_turista_viajando: null,
        viaja_con_mascota: null,
        select_proposito: null,
        select_congreso: null,
        select_alojamiento: null,
        select_transporte: null,
        select_medio: null,
        select_organizador: null,
        fecha_registro: null,
        fecha_modificacion: null
};
export const store = reactive({
        current_captura,
        modulos: Array<any>(),
        paises: Array<any>(),
        estados: Array<any>(),
        municipios: Array<any>(),
        propositos: Array<any>(),
        congresos: Array<any>(),
        alojamientos: Array<any>(),
        medios: Array<any>(),
        escolaridades: Array<any>(),
        edades: Array<any>(),
        transportes: Array<any>(),
        organizaciones: Array<any>(),
        capturas:Array<ICaptura>(),
        captura_detalle: Array<any>(),
        nacionalidades: [
                { id: 1, nombre: 'Nacional' },
                { id: 2, nombre: 'Extranjero'}
        ],
        generos: [{ id: 1, nombre: 'Hombre' },
                  { id: 2, nombre: 'Mujer'  }
        ],
        catalogues: [
                { name:'minformacion', title: "Modulos de información", cargado: false, color:"warning"},
                { name:'paises', title: "Paises", cargado: false, color:"warning"},
                { name:'estados', title: "Estados", cargado: false, color:"warning"},
                { name:'allmunicipios', title: "Municipios", cargado: false, color:"warning"},
                { name:'propositos', title: "Propósitos de viaje", cargado: false, color:"warning"},
                { name:'escolaridades', title: "Escolaridades", cargado: false, color:"warning"},
                { name:'congresos', title: "Tipos de congreso", cargado: false, color:"warning"},
                { name:'alojamientos', title: "Tipos de alojamiento", cargado: false, color:"warning"},
                { name:'transportes', title: "Arribó a entidad", cargado: false, color:"warning"},
                { name:'medios', title: "Se enteró de chiapas", cargado: false, color:"warning"},
                { name:'organizadores', title: "Organizó su viaje", cargado: false, color:"warning"},
                { name:'edades', title: "Rango de edades", cargado: false, color:"warning"},
        ],
        inicializarCaptura( param:any= null) {
                this.current_captura = {
                        id_modulo_informacion: param === null ? null : param.id_modulo_informacion,
                        id_usuario_captura: param === null ? null : param.id_usuario_captura,
                        select_nacionalidad: param === null ? null : param.select_nacionalidad,
                        select_pais_origen: param === null ? null : param.select_pais_origen,
                        select_estado: param === null ? null : param.select_estado,
                        select_municipio: param === null ? null : param.select_municipio,
                        select_genero: param === null ? null : param.select_genero,
                        diversidad_sexual: param === null ? null : param.diversidad_sexual,
                        edad: param === null ? null : param.edad,
                        select_escolaridad: param === null ? null : param.select_escolaridad,
                        correo: param === null ? null : param.correo,
                        discapacidad: param === null ? null : param.discapacidad,
                        numero_turista_viajando:param === null ? null : param.numero_turista_viajando,
                        viaja_con_mascota: param === null ? null : param.viaja_con_mascota,
                        select_proposito: param === null ? null : param.select_proposito,
                        select_congreso: param === null ? null : param.select_congreso,
                        select_alojamiento: param === null ? null : param.select_alojamiento,
                        select_transporte: param === null ? null : param.select_transporte,
                        select_medio: param === null ? null : param.select_medio,
                        select_organizador: param === null ? null : param.select_organizador,
                        fecha_registro: param === null ? null : param.fecha_registro,
                        fecha_modificacion: param === null ? null : param.fecha_modificacion,
                }
        },
        inicializarCat() {
                this.paises=  Array<any>();
                this.estados=  Array<any>();
                this.municipios=  Array<any>(),
                    this.propositos=  Array<any>(),
                    this.congresos=  Array<any>();
                this.alojamientos=  Array<any>();
                this.medios=  Array<any>();
                this.escolaridades=  Array<any>();
                this.edades=  Array<any>();
                this.transportes=  Array<any>();
                this.organizaciones=  Array<any>();
        },
        loading: 0,
        autenticado:0,
        modulo_informacion:0
})