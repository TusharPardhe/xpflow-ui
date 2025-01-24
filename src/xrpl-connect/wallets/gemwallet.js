import { isInstalled, getPublicKey, signMessage, submitTransaction } from "@gemwallet/api";

export const handleConnectGem = async (apiEndpoint, setXrpAddress) => {
  const gemInstalled = await isInstalled();
  if (!gemInstalled.result.isInstalled) {
    throw new Error("GemWallet is not installed");
  }

  const publicKeyResponse = await getPublicKey();
  const pubkey = publicKeyResponse.result?.publicKey;
  const address = publicKeyResponse.result?.address;

  if (!pubkey || !address) {
    throw new Error("Failed to get public key or address");
  }

  const nonceResponse = await fetch(
    `${apiEndpoint}/wallets/gemwallet/hash?pubkey=${pubkey}&address=${address}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const nonceData = await nonceResponse.json();
  const signedMessageResponse = await signMessage(nonceData.token);

  if (!signedMessageResponse.result?.signedMessage) {
    throw new Error("Failed to sign message");
  }

  const verifyResponse = await fetch(`${apiEndpoint}/wallets/gemwallet/checksign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      signature: signedMessageResponse.result.signedMessage,
      token: nonceData.token,
    }),
  });

  const verifyData = await verifyResponse.json();
  if (verifyData.address) {
    setXrpAddress(verifyData.address);
    localStorage.setItem("xrpl-address", verifyData.address);
    localStorage.setItem("xrpl-wallet", "gemwallet");
  }
};

export const signTransactionGem = async (transaction) => {
  const gemInstalled = await isInstalled();
  if (!gemInstalled.result.isInstalled) {
    throw new Error("GemWallet is not installed");
  }

  const response = await submitTransaction({ transaction });
  if (!response.result?.hash) {
    throw new Error("Failed to sign transaction");
  }

  return response;
};
