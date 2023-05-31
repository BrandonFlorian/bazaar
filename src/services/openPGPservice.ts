import { CardDetails, PublicKey } from "@/types/circle";
import { createMessage, readKey, encrypt as pgpEncrypt } from "openpgp";

export class OpenPGPService {
  public static encrypt = async (
    dataToEncrypt: CardDetails,
    { keyId, publicKey }: PublicKey
  ) => {
    if (!publicKey || !keyId) {
      throw new Error("Unable to encrypt data");
    }

    const decodedPublicKey = await readKey({
      armoredKey: window.atob(publicKey),
    });
    const message = await createMessage({
      text: JSON.stringify(dataToEncrypt),
    });

    const ciphertext = await pgpEncrypt({
      message,
      encryptionKeys: decodedPublicKey,
    });

    return {
      encryptedMessage: window.btoa(ciphertext as string),
      keyId,
    };
  };
}
