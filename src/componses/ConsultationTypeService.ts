import instance from "@/plugins/axios";
import { ConsultationTypeItemDtoPagedResultDto,ConsultationTypeDetailDto,AddUpdateConsultationTypeDto} from './models/data-contracts'
export class ConsultationTypeService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
tagIds?:Array<string>,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<ConsultationTypeItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/ConsultationTypes/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * ConsultationTypesid
    */
    static async getConsultationTypesid(id:string,  ): Promise<ConsultationTypeDetailDto> {

        return await instance({
        url: `/api/v1/ConsultationTypes/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * ConsultationTypesid
    */
    static async putConsultationTypesid(id:string,  data:AddUpdateConsultationTypeDto): Promise<void> {

        return await instance({
        url: `/api/v1/ConsultationTypes/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * ConsultationTypesid
    */
    static async deleteConsultationTypesid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/ConsultationTypes/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * ConsultationTypes
    */
    static async postConsultationTypes(  data:AddUpdateConsultationTypeDto): Promise<void> {

        return await instance({
        url: `/api/v1/ConsultationTypes`,
        method: 'post',
        
        data:data,
        
        });
    }
}