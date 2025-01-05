import instance from "@/plugins/axios";
import { PasswordLoginDto} from './models/data-contracts'
export class LoginService {

    /**
    * LoginByPassword
    */
    static async postLoginByPassword(  data:PasswordLoginDto): Promise<string> {

        return await instance({
        url: `/api/v1/Logins/LoginByPassword`,
        method: 'post',
        
        data:data,
        
        });
    }
}