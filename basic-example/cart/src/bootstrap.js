import faker from 'faker';

export const mount = (el) => {
    const cartText = `<div>You have ${faker.random.number()} items in your cart</div>`;

    el.innerHTML = cartText;
};

// Automatically defined by webpack
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-cart');

    // Assuming container doesn't have that id provided above
    if (el) {
        mount(el);
    }
}
