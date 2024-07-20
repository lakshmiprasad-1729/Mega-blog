import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
class AuthService{
    Client = new Client();
    account;

    constructor(){
        this.Client
             .setEndpoint('https://cloud.appwrite.io/v1')
             .setProject(conf.appwriteProjectId);
        this.account = new Account(this.Client);
    }

    async createAccount({email,password,name}){
        try {
            const createdaccount = await this.account.create(ID.unique,email,password,name)
            if(createdaccount){
                return this.login({email,password})
            }
            else{
                return createdaccount;
            }
        } catch (error) {
            console.log("the error is in create account",error)
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("the error is in login account",error)
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("the error is in get user account",error)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("the error is in logout account",error)

        }
    }

}

const authservice = new AuthService();
 
export default authservice;