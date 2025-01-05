import instance from "@/plugins/axios";
import { DepartmentItemDtoPagedResultDto,TreeDto,DepartmentDetailDto,UpdateDepartmentDto,AddDepartmentDto} from './models/data-contracts'
export class DepartmentService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<DepartmentItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Departments/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * PermissionTree
    */
    static async getPermissionTree(  ): Promise<Array<TreeDto>> {

        return await instance({
        url: `/api/v1/Departments/PermissionTree`,
        method: 'get',
        
        
        
        });
    }

    /**
    * Departmentsid
    */
    static async getDepartmentsid(id:string,  ): Promise<DepartmentDetailDto> {

        return await instance({
        url: `/api/v1/Departments/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * Departmentsid
    */
    static async putDepartmentsid(id:string,  data:UpdateDepartmentDto): Promise<void> {

        return await instance({
        url: `/api/v1/Departments/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * Departmentsid
    */
    static async deleteDepartmentsid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/Departments/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * Departments
    */
    static async postDepartments(  data:AddDepartmentDto): Promise<void> {

        return await instance({
        url: `/api/v1/Departments`,
        method: 'post',
        
        data:data,
        
        });
    }

    /**
    * BindRoleid
    */
    static async postBindRoleid(id:string,  data:Array<string>): Promise<void> {

        return await instance({
        url: `/api/v1/Departments/BindRole/${id}`,
        method: 'post',
        
        data:data,
        
        });
    }

    /**
    * Rolesid
    */
    static async deleteRolesid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/Departments/Roles/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * Usersid
    */
    static async postUsersid(id:string,  data:Array<string>): Promise<void> {

        return await instance({
        url: `/api/v1/Departments/Users/${id}`,
        method: 'post',
        
        data:data,
        
        });
    }

    /**
    * Usersid
    */
    static async deleteUsersid(id:string,  data:Array<string>): Promise<void> {

        return await instance({
        url: `/api/v1/Departments/Users/${id}`,
        method: 'delete',
        
        data:data,
        
        });
    }
}