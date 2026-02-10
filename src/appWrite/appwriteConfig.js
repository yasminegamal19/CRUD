import { Client, Databases, ID } from "appwrite";

// Initialize the client
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("698b02a3003cfe828288"); // Project ID

const databases = new Databases(client);

export { client, databases, ID };
