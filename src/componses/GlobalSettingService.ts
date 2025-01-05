import instance from "@/plugins/axios";
import { GlobalSettingItemDtoPagedResultDto,GlobalSettingItemDto,AddUpdateGlobalSettingDto} from './models/data-contracts'
export class GlobalSettingService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<GlobalSettingItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/GlobalSettings/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * GlobalSettingsid
    */
    static async getGlobalSettingsid(id:string,  ): Promise<GlobalSettingItemDto> {

        return await instance({
        url: `/api/v1/GlobalSettings/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * GlobalSettingsid
    */
    static async putGlobalSettingsid(id:string,  data:AddUpdateGlobalSettingDto): Promise<void> {

        return await instance({
        url: `/api/v1/GlobalSettings/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * GlobalSettingsid
    */
    static async deleteGlobalSettingsid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/GlobalSettings/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * GlobalSettings
    */
    static async postGlobalSettings(  data:AddUpdateGlobalSettingDto): Promise<void> {

        return await instance({
        url: `/api/v1/GlobalSettings`,
        method: 'post',
        
        data:data,
        
        });
    }
}