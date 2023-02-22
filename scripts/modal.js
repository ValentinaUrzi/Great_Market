import { cE, qS } from "./utils.js"

const modalGen = () => {

    const modal = qS("#modal");
    const btn = qS("#login_btn");
    const form = qS("#login_form");
    const error = qS("#error_msg")
    const loader = qS('.loader');

    btn.onclick = function () {
        modal.style.display = "flex";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.onsubmit = function (event) {
        event.preventDefault();
        error.textContent = "";

        if (event.target.username.value == "" || event.target.password.value == "") {
            error.textContent = "Username o password mancanti";
            return;
        }

        loader.style.display = 'block';

        setTimeout(() => {
            modal.style.display = "none"
            loader.style.display = 'none';
            localStorage.setItem("isLogged", true);
        }, 800)
    }
}
export default modalGen