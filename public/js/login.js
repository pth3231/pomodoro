const login_form_element = document.getElementById("login-form");
const error_message_element = document.getElementById("error-message");
const submit_button_element = document.getElementById("submit-button")

document.addEventListener("DOMContentLoaded", () => {
    error_message_element.classList.add("hidden");
});

login_form_element.addEventListener("submit", async (e) => {
    e.preventDefault();
    submit_button_element.setAttribute('disabled', 'true');
    const form = e.target;
    const form_data = new FormData(form);
    const url_encoded_data = new URLSearchParams(form_data);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: url_encoded_data
        });

        if (!response.ok) {
            const error_data = await response.json();

            error_message_element.classList.remove("hidden");
            error_message_element.innerText = error_data.message;
            submit_button_element.setAttribute('disabled', 'false');
        } else {
            window.location.assign("/");
        }
    } catch (e) {
        console.error(e);
    }
});