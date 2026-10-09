import { describe, expect, it } from "vitest";
import { adressePresignee, configR2 } from "@/lib/r2";

// Les liens d'envoi et de lecture chez Cloudflare R2 sont signés ici, sans
// bibliothèque. On vérifie la signature sur l'exemple publié par Amazon
// (« Authenticating Requests: Using Query Parameters », exemple d'une adresse
// présignée de lecture de test.txt), puis sur un envoi signé avec son type.

describe("R2 · signature des adresses (AWS Signature Version 4)", () => {
  it("retrouve exactement l'adresse de l'exemple d'Amazon", () => {
    const adresse = adressePresignee({
      methode: "GET",
      hote: "examplebucket.s3.amazonaws.com",
      chemin: "test.txt",
      region: "us-east-1",
      cle: "AKIAIOSFODNN7EXAMPLE",
      secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      expireEnSecondes: 86400,
      maintenant: new Date("2013-05-24T00:00:00Z"),
    });
    expect(adresse).toBe(
      "https://examplebucket.s3.amazonaws.com/test.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20130524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20130524T000000Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404",
    );
  });

  it("signe le type d'un envoi : un autre type donne une autre signature", () => {
    const base = {
      methode: "PUT" as const,
      hote: "0123456789abcdef0123456789abcdef.r2.cloudflarestorage.com",
      chemin: "aiw-rendus/rendus/u/r/1",
      region: "auto",
      cle: "cle",
      secret: "secret",
      expireEnSecondes: 900,
      maintenant: new Date("2026-10-10T08:00:00Z"),
    };
    const jpeg = adressePresignee({ ...base, entetes: { "Content-Type": "image/jpeg" } });
    const pdf = adressePresignee({ ...base, entetes: { "Content-Type": "application/pdf" } });
    expect(jpeg).toContain("X-Amz-SignedHeaders=content-type%3Bhost");
    expect(jpeg).toMatch(/^https:\/\/0123456789abcdef0123456789abcdef\.r2\.cloudflarestorage\.com\/aiw-rendus\/rendus\/u\/r\/1\?/);
    expect(jpeg.split("X-Amz-Signature=")[1]).not.toBe(pdf.split("X-Amz-Signature=")[1]);
  });

  it("ferme l'envoi quand une variable manque ou est mal formée (règle S10)", () => {
    const complet = { R2_ACCOUNT_ID: "0123456789abcdef0123456789abcdef", R2_BUCKET: "aiw-rendus", R2_ACCESS_KEY_ID: "a", R2_SECRET_ACCESS_KEY: "b" };
    expect(configR2(complet)).not.toBeNull();
    expect(configR2({ ...complet, R2_SECRET_ACCESS_KEY: "" })).toBeNull();
    expect(configR2({ ...complet, R2_ACCOUNT_ID: "pas-un-compte" })).toBeNull();
    expect(configR2({ ...complet, R2_BUCKET: "Espace_Invalide" })).toBeNull();
  });
});
