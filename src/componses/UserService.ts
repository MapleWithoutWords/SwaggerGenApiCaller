import instance from "@/plugins/axios";
import { UserItemDtoPagedResultDto,UserBasicDtoPagedResultDto,UserDetailDto,UpdateUserDto,AddUserDto,ChangePasswordDto,AllotUserPermissionDto} from './models/data-contracts'
export class UserService {

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
isResigned?:boolean,
departmentId?:string,
gender?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<UserItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Users/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * PagedBasicList
    */
    static async getPagedBasicList( query: {
keyword?:string,
isResigned?:boolean,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<UserBasicDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Users/PagedBasicList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * Usersid
    */
    static async getUsersid(id:string,  ): Promise<UserDetailDto> {

        return await instance({
        url: `/api/v1/Users/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * Usersid
    */
    static async putUsersid(id:string,  data:UpdateUserDto): Promise<void> {

        return await instance({
        url: `/api/v1/Users/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * Usersid
    */
    static async deleteUsersid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/Users/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * Users
    */
    static async postUsers(  data:AddUserDto): Promise<void> {

        return await instance({
        url: `/api/v1/Users`,
        method: 'post',
        
        data:data,
        
        });
    }

    /**
    * ChangePasswordid
    */
    static async postChangePasswordid(id:string,  data:ChangePasswordDto): Promise<void> {

        return await instance({
        url: `/api/v1/Users/ChangePassword/${id}`,
        method: 'post',
        
        data:data,
        
        });
    }

    /**
    * AllotPermissionsid
    */
    static async postAllotPermissionsid(id:string,  data:AllotUserPermissionDto): Promise<void> {

        return await instance({
        url: `/api/v1/Users/AllotPermissions/${id}`,
        method: 'post',
        
        data:data,
        
        });
    }
}