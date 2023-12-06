export function productUrl(product) {
    const name = product.name.toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replaceAll("\", "-"");
    return "/" + name + "/" + product._id;
}