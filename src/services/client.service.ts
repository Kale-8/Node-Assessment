// Client service
import {Address, Client} from "../models";

// Create client
export async function createClient(document: string, name: string, email: string) {
    // duplicate document check
    const existing = await Client.findOne({where: {document}});
    if (existing) throw { status: 409, message: "Client with same document exists" };
    return await Client.create({document, name, email} as any);
}

// List clients
export async function listClients() {
    return Client.findAll({include: [{model: Address, as: "addresses"}]});
}

// Find client by document
export async function findClientByDocument(document: string) {
    const client = await Client.findOne({where: {document}, include: [{model: Address, as: "addresses"}]});
    if (!client) throw { status: 404, message: "Client not found" };
    return client;
}

// Get client by ID
export async function getClientById(id: number) {
    const client = await Client.findByPk(id, {include: [{model: Address, as: "addresses"}]});
    if (!client) throw { status: 404, message: "Client not found" };
    return client;
}

// Update client
export async function updateClient(id: number, data: {name?: string; email?: string; document?: string}) {
    const client = await Client.findByPk(id);
    if (!client) throw { status: 404, message: "Client not found" };

    // If document is being updated, check for duplicates
    if (data.document && data.document !== client.document) {
        const existing = await Client.findOne({where: {document: data.document}});
        if (existing) throw { status: 409, message: "Client with same document exists" };
    }

    await client.update(data);
    return client;
}

// Delete client
export async function deleteClient(id: number) {
    const client = await Client.findByPk(id);
    if (!client) throw { status: 404, message: "Client not found" };
    await client.destroy();
}
