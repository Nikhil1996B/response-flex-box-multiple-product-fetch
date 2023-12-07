import "./styles.css";

const url = [
  "https://fakestoreapi.com/products",
  "https://fakestoreapi.com/carts",
];

const responseStatus = (response) => {
  if (response?.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(
      new Error(response?.statusText || "Something went wrong"),
    );
  }
};

const json = (response) => response.json();

const handleError = (error) => console.error(error);

const fetchData = async (url) => {
  return fetch(url).then(responseStatus).then(json).catch(handleError);
};

const promises = url.map((endpoint) => fetchData(endpoint));

const displayCartItem = (data, element = "") => {
  const container = document.getElementById(element);
  const preItems = (data || [])
    ?.map(
      (item) => `
        <pre>${JSON.stringify(item, null, 8)}</pre>
    `,
    )
    .join("");
  container.innerHTML = preItems;
};

Promise.all(promises).then(([products, carts]) => {
  displayCartItem(products, "products");
  displayCartItem(carts, "carts");
});
