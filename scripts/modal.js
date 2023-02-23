import { cE, qS } from "./utils.js"

const modalGen = () => {

    const modal = qS("#modal");
    const btn = qS("#login_btn");
    const form = qS("#login_form");
    const error = qS("#error_msg");
    const rightHeader = qS(".right_header");
    const username = localStorage.getItem("username");
    const loggedStatus = localStorage.getItem("isLogged");

    const logoutBtn = cE("button");
    logoutBtn.className = "logout_btn";
    logoutBtn.title = "Logout";

    btn.onclick = () => {
        modal.style.display = "flex";
        modal.openedBy = "login";
    }

    logoutBtn.onclick = () => {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("username");
        localStorage.removeItem('cart_quantity');
        localStorage.removeItem('cart');
        location.replace("/");
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    if (loggedStatus === "true") {
        rightHeader.prepend(logoutBtn)
        btn.textContent = username[0]
        btn.className = "avatar"
    }
    if (form) {

        form.onsubmit = (event) => {
            event.preventDefault();
            error.textContent = "";

            if (event.target.username.value == "" || event.target.password.value == "") {
                error.textContent = "Username o password mancanti";
                return;
            }

            setTimeout(() => {
                modal.style.display = "none"
                localStorage.setItem("isLogged", true);
                localStorage.setItem("username", event.target.username.value);
                if (modal.openedBy === "cart") location.assign("cart.html")
                else { location.reload() }
            }, 800)
        }
    }
}
export default modalGen