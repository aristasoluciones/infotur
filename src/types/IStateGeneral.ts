import ICapturaDetalle from "@/types/ICapturaDetalle";
import ICaptura from "@/types/ICaptura";

export default interface IStateGeneraal {
    paises: Array<any>,
    estados: Array<any>,
    municipios: Array<any>,
    propositos: Array<any>,
    congresos: Array<any>,
    alojamientos: Array<any>,
    medios: Array<any>,
    escolaridades: Array<any>,
    edades: Array<any>,
    transportes: Array<any>,
    organizaciones: Array<any>,
    capturas:Array<ICaptura>,
    captura_detalle: Array<ICapturaDetalle>,
    nacionalidades: Array<any>,
    generos: Array<any>,
    step: number,
    loading: number
}