// Generates an Ed25519 keypair for demo use
// Run: node shared/crypto/generate_keys.js
// Paste output into .env

import * as ed from '@noble/ed25519';

async function generateKeys() {
    const privateKey = ed.utils.randomPrivateKey();
    const publicKey = await ed.getPublicKeyAsync(privateKey);
    
    console.log("=========================================");
    console.log("ORION Offline Verifier - Ed25519 Key Pair");
    console.log("=========================================");
    console.log("MANUFACTURER_PRIVATE_KEY=" + ed.utils.bytesToHex(privateKey));
    console.log("MANUFACTURER_PUBLIC_KEY=" + ed.utils.bytesToHex(publicKey));
    console.log("=========================================");
}

generateKeys().catch(console.error);
