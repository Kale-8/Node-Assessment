// Client service
import {Address, Client} from "../models";

// Create client
export async function createClient(document: string, name: string, email: string) {
    // duplicate document check
    const existing = await Client.findOne({where: {document}});
    if (existing) throw new Error("Client with same document exists");
    return await Client.create({document, name, email} as any);
}

// List clients
export async function listClients() {
    return Client.findAll({include: [{model: Address, as: "addresses"}]});
}

// Find client by document
export async function findClientByDocument(document: string) {
    const client = await Client.findOne({where: {document}, include: [{model: Address, as: "addresses"}]});
    if (!client) throw new Error("Client not found");
    return client;
}