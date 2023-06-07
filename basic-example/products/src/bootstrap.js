import faker from 'faker';

export const mount = (el) => {
    let products = '';

    for (let i = 0; i < 5; i++) {
        const name = faker.commerce.productName();
        products += `<div>${name}</div>`;
    }

    el.innerHTML = products;
};

// Automatically defined by webpack
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-products');

    // Assuming container doesn't have that id provided above
    if (el) {
        mount(el);
    }
}
