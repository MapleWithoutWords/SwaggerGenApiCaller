import instance from "@/plugins/axios";
import { PermissionTreeDto,TreeDto,PermissionItemDtoPagedResultDto,PermissionItemDto,AddUpdatePermissionDto} from './models/data-contracts'
export class PermissionService {

    /**
    * AllPermissionTree
    */
    static async getAllPermissionTree(  ): Promise<Array<PermissionTreeDto>> {

        return await instance({
        url: `/api/v1/Permissions/AllPermissionTree`,
        method: 'get',
        
        
        
        });
    }

    /**
    * SystemPermissionTree
    */
    static async getSystemPermissionTree( query: {
appSystemId?:string
}, ): Promise<Array<TreeDto>> {

        return await instance({
        url: `/api/v1/Permissions/SystemPermissionTree`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * PagedSystemPermissionList
    */
    static async getPagedSystemPermissionList( query: {
appSystemId?:string,
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<PermissionItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Permissions/PagedSystemPermissionList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * Permissionsid
    */
    static async getPermissionsid(id:string,  ): Promise<PermissionItemDto> {

        return await instance({
        url: `/api/v1/Permissions/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * Permissionsid
    */
    static async putPermissionsid(id:string,  data:AddUpdatePermissionDto): Promise<void> {

        return await instance({
        url: `/api/v1/Permissions/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * Permissionsid
    */
    static async deletePermissionsid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/Permissions/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * Permissions
    */
    static async postPermissions(  data:AddUpdatePermissionDto): Promise<void> {

        return await instance({
        url: `/api/v1/Permissions`,
        method: 'post',
        
        data:data,
        
        });
    }
}