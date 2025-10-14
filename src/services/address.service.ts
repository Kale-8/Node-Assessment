// Address service
import {Address, Client} from "../models";

// Create address
export async function createAddress(clientId: number, address: string, city: string) {
    // Verify client exists
    const client = await Client.findByPk(clientId);
    if (!client) throw new Error("Client not found");

    return await Address.create({clientId, address, city} as any);
}

// List all addresses
export async function listAddresses() {
    return Address.findAll({include: [{model: Client, as: "client"}]});
}

// Get address by ID
export async function getAddressById(id: number) {
    const addressRecord = await Address.findByPk(id, {include: [{model: Client, as: "client"}]});
    if (!addressRecord) throw new Error("Address not found");
    return addressRecord;
}

// Update address
export async function updateAddress(id: number, data: {clientId?: number; address?: string; city?: string}) {
    const addressRecord = await Address.findByPk(id);
    if (!addressRecord) throw new Error("Address not found");

    // If clientId is being updated, verify new client exists
    if (data.clientId && data.clientId !== addressRecord.clientId) {
        const client = await Client.findByPk(data.clientId);
        if (!client) throw new Error("Client not found");
    }

    await addressRecord.update(data);
    return addressRecord;
}

// Delete address
export async function deleteAddress(id: number) {
    const addressRecord = await Address.findByPk(id);
    if (!addressRecord) throw new Error("Address not found");
    await addressRecord.destroy();
}