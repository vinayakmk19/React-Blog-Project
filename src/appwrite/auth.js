import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    console.log(config.appwriteUrl)

    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
    console.log(this.account);
  }
  
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error in services :: createAccount() method", error);
    }
  }

  async login({ email, password }) {
    try {
      console.log(email);
      console.log(password);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error in services :: login() method", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error in services :: getCurrentUser() method", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in services :: logout() method", error);
    }
  }
}

const authServices = new AuthServices();

export default authServices;
