import config from "../conf/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){

        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another method and let user Login
                return this.login({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log(error);
            
            
            
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log(error);
            
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            console.log(error);
            
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions("current")
        } catch (error) {
            console.log(error);
            
        }
    }


}

const authService = new AuthService();

export default authService

