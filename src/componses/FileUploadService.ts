import instance from "@/plugins/axios";
import { any} from './models/data-contracts'
export class FileUploadService {

    /**
    * Upload
    */
    static async postUpload(  data:any): Promise<Array<string>> {

        return await instance({
        url: `/api/v1/FileUploads/Upload`,
        method: 'post',
        
        data:data,
        headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}