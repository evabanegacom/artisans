type Context = {
  next: () => Promise<Response>;
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (!path.startsWith("/product/")) {
    return context.next();
  }

  const productNumber = path.split("/product/")[1];

  let product = null;
  try {
    const res = await fetch(
      `https://artisans.fly.dev/api/v1/products/get_product_by_product_number?product_number=${productNumber}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ArtisansHubBot/1.0)",
          "Accept": "application/json",
        }
      }
    );
    product = await res.json();
  } catch (e) {
    return context.next();
  }

  if (!product) return context.next();

  const title = product.name;
  const description = product.description
    ?.replace(/\*\*/g, "")
    ?.replace(/\r\n/g, " ")
    ?.slice(0, 160) || "Buy digital products on Artisans Hub";

  const rawImage = product.image_urls?.[0] || product.pictureOne?.url || "";
  const image = rawImage.includes("cloudinary.com")
    ? rawImage.replace("/upload/", "/upload/w_1200,h_630,c_fill/")
    : rawImage;

  const productUrl = `https://artisanshub.net/product/${productNumber}`;

  const response = await context.next();
  const html = await response.text();

  const updatedHtml = html
    .replace(
      `<meta property="og:title" content="Artisans hub" />`,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      `<meta property="og:description" content="A brief description about Artisans hub" />`,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      `<meta property="og:url" content="https://artisans-hub.netlify.app/" />`,
      `<meta property="og:url" content="${productUrl}" />`
    )
    .replace(
      `<meta property="og:image" content="https://res.cloudinary.com/spetsnaz/image/upload/v1603546589/71xsZ9XMCtJtTa1tmKanbeVG.jpg" />`,
      `<meta property="og:image" content="${image}" />`
    )
    .replace(
      `<meta name="twitter:title" content="Artisans hub" />`,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      `<meta name="twitter:description" content="A brief description about Artisans hub" />`,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      `<meta name="twitter:image" content="https://res.cloudinary.com/spetsnaz/image/upload/v1603546589/71xsZ9XMCtJtTa1tmKanbeVG.jpg" />`,
      `<meta name="twitter:image" content="${image}" />`
    )
    .replace(
      `<title>Artisans hub</title>`,
      `<title>${title} | Artisans Hub</title>`
    );

  return new Response(updatedHtml, {
    headers: { 
      "content-type": "text/html",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};

export const config = {
  path: "/product/*",
};