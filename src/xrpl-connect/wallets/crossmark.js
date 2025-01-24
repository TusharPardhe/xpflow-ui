import sdk from "@crossmarkio/sdk";

export const handleConnectCrossmark = async (apiEndpoint, setXrpAddress) => {
  const isInstalled = sdk.sync.isInstalled();
  if (!isInstalled) {
    throw new Error("Crossmark wallet is not installed");
  }

  const hashResponse = await fetch(`${apiEndpoint}/wallets/crossmark/hash`);
  const hashData = await hashResponse.json();
  const hash = hashData.hash;

  const id = await sdk.methods.signInAndWait(hash);
  const address = id.response.data.address;
  const pubkey = id.response.data.publicKey;
  const signature = id.response.data.signature;

  const verifyResponse = await fetch(`${apiEndpoint}/wallets/crossmark/checksign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      signature,
      pubkey,
      address,
      token: hash,
    }),
  });

  const verifyData = await verifyResponse.json();
  if (verifyData.token) {
    setXrpAddress(address);
    localStorage.setItem("xrpl-address", address);
    localStorage.setItem("xrpl-wallet", "crossmark");
  }
};

export const signTransactionCrossmark = async (transaction) => {
  const isInstalled = sdk.sync.isInstalled();
  if (!isInstalled) {
    throw new Error("Crossmark wallet is not installed");
  }

  const signResponse = await sdk.methods.signAndSubmitAndWait(transaction);

  if (!signResponse?.response) {
    throw new Error("Failed to sign transaction");
  }

  return signResponse;
};
