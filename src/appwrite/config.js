import { Client, Storage, ID ,Databases,Query } from "appwrite";
import conf from "../conf/conf";


class Service{
    Client = new Client();
    database;
    bucket;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
         return await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
         )
        }
        catch(error){
              console.log('this error is in create post and the error is ',error)
        }
    }

    async updatePost(slug,{title,featuredImage,content,status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log('this error is in update post and the error is',error)
        }
    }

    async deletePost(slug){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('this error is in delete post and the error is',error)
        }
    }
     
    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('this error is in get post and the error is',error)
        }
    }

    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('this error is in get posts and the error is',error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('this error is in upload file and the error is',error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log('this error is in delete file and the error is',error)
            return false;
        }
    }

    getfilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
}

const storageservice = new Service();

export default storageservice;