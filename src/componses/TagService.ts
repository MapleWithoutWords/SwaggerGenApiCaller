import instance from "@/plugins/axios";
import { TagKeyItemDtoPagedResultDto,TagItemDtoPagedResultDto,TagItemDto,UpdateTagDto,AddTagDto} from './models/data-contracts'
export class TagService {

    /**
    * PagedTagKeys
    */
    static async getPagedTagKeys( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<TagKeyItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Tags/PagedTagKeys`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * PagedList
    */
    static async getPagedList( query: {
keyword?:string,
ids?:Array<string>,
Page?:number,
PageSize?:number,
Sorting?:string
}, ): Promise<TagItemDtoPagedResultDto> {

        return await instance({
        url: `/api/v1/Tags/PagedList`,
        method: 'get',
        params:query,
        
        
        });
    }

    /**
    * Tagsid
    */
    static async getTagsid(id:string,  ): Promise<TagItemDto> {

        return await instance({
        url: `/api/v1/Tags/${id}`,
        method: 'get',
        
        
        
        });
    }

    /**
    * Tagsid
    */
    static async putTagsid(id:string,  data:UpdateTagDto): Promise<void> {

        return await instance({
        url: `/api/v1/Tags/${id}`,
        method: 'put',
        
        data:data,
        
        });
    }

    /**
    * Tagsid
    */
    static async deleteTagsid(id:string,  ): Promise<void> {

        return await instance({
        url: `/api/v1/Tags/${id}`,
        method: 'delete',
        
        
        
        });
    }

    /**
    * Tags
    */
    static async postTags(  data:AddTagDto): Promise<void> {

        return await instance({
        url: `/api/v1/Tags`,
        method: 'post',
        
        data:data,
        
        });
    }
}