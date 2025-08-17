const logout_button_element = document.getElementById("logout-button");

logout_button_element.addEventListener("click", async (event) => {
    try {
        const response = await fetch("/api/logout", {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Errors occurred");
        }

        const data = await response.json();
        console.log(data);
        
        location.reload();
    } catch (e) {
        console.error(e);
    }
});