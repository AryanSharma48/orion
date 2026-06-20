import * as ed from '@noble/ed25519';
import { BatchPayload } from '../types';

function serializeDeterministic(payload: BatchPayload): Uint8Array {
    // Sort keys alphabetically for deterministic JSON
    const sorted: any = {};
    Object.keys(payload).sort().forEach(k => {
        sorted[k] = (payload as any)[k];
    });
    const jsonStr = JSON.stringify(sorted);
    return new TextEncoder().encode(jsonStr);
}

export async function signPayload(payload: BatchPayload, privateKeyHex: string): Promise<string> {
    const bytes = serializeDeterministic(payload);
    const signature = await ed.signAsync(bytes, privateKeyHex);
    return ed.utils.bytesToHex(signature);
}

export async function verifySignature(payload: BatchPayload, signatureHex: string, publicKeyHex: string): Promise<boolean> {
    try {
        const bytes = serializeDeterministic(payload);
        return await ed.verifyAsync(signatureHex, bytes, publicKeyHex);
    } catch (e) {
        return false;
    }
}
