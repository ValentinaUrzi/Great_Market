const checkout = () => {
    const loginControl = localStorage.getItem("isLogged");
    const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

    const url = location.href

    if (url.includes("checkout") && (loginControl !== "true" || cartQuantStorage === "0")) {
        location.replace("index.html");
    }

    
}

export default checkout;