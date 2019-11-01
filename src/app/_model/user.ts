/**
 * Created by Rashmi Chauhan  on 30/10/2019.
 */
export class User{
    id: number
    name: string;
    mobile: string;
    email: string;

    constructor(id,name,mobile,email){
        this.id=id;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
    }
}