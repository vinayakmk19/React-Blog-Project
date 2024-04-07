import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6607f7eecd2a3198cde5");

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        "6607f9379bc78ca07ae8",
        "6607f95313c6f4eb9291",
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error in Database services :: createPost() ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        "6607f9379bc78ca07ae8",
        "6607f95313c6f4eb9291",
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Error in Database services :: updatePost() ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        "6607f9379bc78ca07ae8",
        "6607f95313c6f4eb9291",
        slug
      );
    } catch (error) {
      console.log("Error in Database services :: deletePost() ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteColletionId,
        slug
      );
    } catch (error) {
      console.log("Error in Database services :: getPost() ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteColletionId,
        queries
      );
    } catch (error) {
      console.log("Error in Database services :: getPosts() ", error);
      return false;
    }
  }

  // File Upload Services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error in Database services :: uploadFile() ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("Error in Database services :: deleteFile() ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
