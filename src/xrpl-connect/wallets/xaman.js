export const getQrCode = async (apiEndpoint, setQrCode, setJumpLink, isMobile, setXrpAddress) => {
  try {
    const response = await fetch(`${apiEndpoint}/wallets/xaman/createpayload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transaction: {
          TransactionType: "SignIn",
        },
      }),
    });

    const data = await response.json();
    setQrCode(data.payload.refs.qr_png);
    setJumpLink(data.payload.next.always);

    if (isMobile) {
      window.open(data.payload.next.always, "_blank");
    }

    const ws = new WebSocket(data.payload.refs.websocket_status);

    ws.onmessage = async (e) => {
      const responseObj = JSON.parse(e.data);
      if (responseObj.signed) {
        try {
          const payloadResponse = await fetch(
            `${apiEndpoint}/wallets/xaman/getpayload?payloadId=${responseObj.payload_uuidv4}`
          );
          const payloadJson = await payloadResponse.json();

          if (payloadJson.payload?.response?.hex) {
            const checkSignResponse = await fetch(`${apiEndpoint}/wallets/xaman/checksign`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ hex: payloadJson.payload.response.hex }),
            });

            const checkSignJson = await checkSignResponse.json();
            setXrpAddress(checkSignJson.xrpAddress);
            localStorage.setItem("xrpl-address", checkSignJson.xrpAddress);
            localStorage.setItem("xrpl-wallet", "xaman");
          }
        } catch (error) {
          console.error("Error processing payload:", error);
          throw error;
        }
      }
    };
  } catch (error) {
    console.error("Error in getQrCode:", error);
    throw error;
  }
};

export const signTransactionXaman = async (
  transaction,
  apiEndpoint,
  isMobile,
  setQrCode,
  setJumpLink
) => {
  try {
    const response = await fetch(`${apiEndpoint}/wallets/xaman/createpayload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transaction }),
    });

    const data = await response.json();

    if (isMobile) {
      window.open(data.payload.next.always, "_blank");
    } else {
      setQrCode(data.payload.refs.qr_png);
      setJumpLink(data.payload.next.always);
    }

    const ws = new WebSocket(data.payload.refs.websocket_status);

    return new Promise((resolve, reject) => {
      ws.onmessage = async (e) => {
        const responseObj = JSON.parse(e.data);

        if (responseObj.payload_uuidv4) {
          try {
            if (responseObj.signed) {
              const payloadResponse = await fetch(
                `${apiEndpoint}/wallets/xaman/getpayload?payloadId=${responseObj.payload_uuidv4}`
              );
              const signedTxJson = await payloadResponse.json();
              resolve(signedTxJson);
            } else {
              reject(new Error("Failed to sign transaction"));
            }
          } catch (error) {
            reject(error);
          }
        } else if (responseObj.expired) {
          reject(new Error("Transaction signing expired"));
        }
      };
    });
  } catch (error) {
    console.error("Error in signTransactionXaman:", error);
    throw error;
  }
};
