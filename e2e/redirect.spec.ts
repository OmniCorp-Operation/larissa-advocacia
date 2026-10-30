import { expect, test } from "@playwright/test";

const cases = [
  { acceptLanguage: "es-MX,es;q=0.9,en;q=0.8", expected: "/es" },
  { acceptLanguage: "en-US,en;q=0.9", expected: "/en" },
  { acceptLanguage: "pt-BR,pt;q=0.9", expected: "/pt" },
  { acceptLanguage: "fr-FR,de;q=0.8", expected: "/pt" },
  { acceptLanguage: "fr;q=0.9,en;q=0.5", expected: "/en" },
  { acceptLanguage: "", expected: "/pt" },
];

for (const { acceptLanguage, expected } of cases) {
  test(`/ com Accept-Language "${acceptLanguage}" redireciona para ${expected}`, async ({
    request,
  }) => {
    const response = await request.get("/", {
      headers: { "Accept-Language": acceptLanguage },
      maxRedirects: 0,
    });

    expect(response.status()).toBe(307);
    expect(new URL(response.headers()["location"], response.url()).pathname).toBe(expected);
  });
}
