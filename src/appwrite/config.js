import conf from "../conf/conf.js";
import { Client, TablesDB, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket; //Storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug, // use slug as ID or fallback to unique
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug, // use slug as ID or fallback to unique
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Error while updating post", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug, // use slug as ID or fallback to unique
      });

      return true;
    } catch (error) {
      console.log("error while deleting post", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug, // use slug as ID or fallback to unique
      });
    } catch (error) {
      console.log("error while getting post", error);
      return false;
    }
  }


async listPost(queries = [Query.equal("status", "active"), Query.limit(25)]) {
  try {
    return await this.databases.listRows({
     databaseId: conf.appwriteDatabaseId,  // databaseId
    tableId:  conf.appwriteTableId,     // tableId
      queries                   // queries
    });
  } catch (error) {
    console.log("Error while listing post:", error);
  }
}


  //file Services 

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("error while uploading file", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });

      return true
    } catch (error) {
      console.log("error while Deleting file", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId,
    })
  }

}

const service = new Service();

export default service;
