import instance from "@/plugins/axios";
import { DataPermissionItemDtoPagedResultDto,DataPermissionItemDto,AddUpdateDataPermissionDto} from './models/data-contracts'
export class DataPermissionService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<DataPermissionItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/DataPermissions/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * DataPermissionsid
    */
    static async getDataPermissionsid(id:string,  ): Promise<DataPermissionItemDto> {

        return await instance({
        url: `/api/v1/DataPermissions/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * DataPermissionsid
    */
    static async putDataPermissionsid(id:string,  data:AddUpdateDataPermissionDto): Promise<void> {

        return await instance({
        url: `/api/v1/DataPermissions/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * DataPermissionsid
    */
    static async deleteDataPermissionsid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/DataPermissions/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * DataPermissions
    */
    static async postDataPermissions(  data:AddUpdateDataPermissionDto): Promise<void> {

        return await instance({
        url: `/api/v1/DataPermissions`,
        method: 'post',
        
        data:data,
        
        });
    }
}