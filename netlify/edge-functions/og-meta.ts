import { Context } from "https://edge.netlify.com";

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
      `https://artisans.fly.dev/api/v1/products/get_product_by_product_number?product_number=${productNumber}`
    );
    product = await res.json();
  } catch (e) {
    return context.next();
  }

  if (!product) return context.next();

  const title = product.name;
  const description = product.description
    ?.replace(/\*\*/g, "")
    .slice(0, 160);
  const image = product.image_urls?.[0] || product.pictureOne?.url;
  const productUrl = `https://artisanshub.net/product/${productNumber}`;

  const response = await context.next();
  const html = await response.text();

  const updatedHtml = html.replace(
    `<meta property="og:title" content="Artisans hub" />`,
    `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${productUrl}" />
    <meta property="og:type" content="product" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <title>${title} | Artisans Hub</title>
    `
  );

  return new Response(updatedHtml, {
    headers: { "content-type": "text/html" },
  });
};

export const config = {
  path: "/product/*",
};