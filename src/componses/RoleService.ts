import instance from "@/plugins/axios";
import { RoleItemDtoPagedResultDto,RoleDetailDto,AddUpdateRoleDto,RolePermissionDto} from './models/data-contracts'
export class RoleService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<RoleItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Roles/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * Rolesid
    */
    static async getRolesid(id:string,  ): Promise<RoleDetailDto> {

        return await instance({
        url: `/api/v1/Roles/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * Rolesid
    */
    static async putRolesid(id:string,  data:AddUpdateRoleDto): Promise<void> {

        return await instance({
        url: `/api/v1/Roles/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * Rolesid
    */
    static async deleteRolesid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/Roles/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * Permissions
    */
    static async getPermissions( query: {
ids?:Array<string>
}, ): Promise<RolePermissionDto> {

        return await instance({
        url: `/api/v1/Roles/Permissions`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * Roles
    */
    static async postRoles(  data:AddUpdateRoleDto): Promise<void> {

        return await instance({
        url: `/api/v1/Roles`,
        method: 'post',
        
        data:data,
        
        });
    }
}