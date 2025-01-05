import instance from "@/plugins/axios";
import { AppSystemItemDtoPagedResultDto,AppSystemItemDto,AddUpdateAppSystemDto} from './models/data-contracts'
export class AppSystemService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<AppSystemItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/AppSystems/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * AppSystemsid
    */
    static async getAppSystemsid(id:string,  ): Promise<AppSystemItemDto> {

        return await instance({
        url: `/api/v1/AppSystems/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * AppSystemsid
    */
    static async putAppSystemsid(id:string,  data:AddUpdateAppSystemDto): Promise<void> {

        return await instance({
        url: `/api/v1/AppSystems/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * AppSystemsid
    */
    static async deleteAppSystemsid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/AppSystems/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * AppSystems
    */
    static async postAppSystems(  data:AddUpdateAppSystemDto): Promise<void> {

        return await instance({
        url: `/api/v1/AppSystems`,
        method: 'post',
        
        data:data,
        
        });
    }
}