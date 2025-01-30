var selectedRow = null;

// Show Alert with Rounded Design
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    // Append to the container
    const container = document.querySelector(".container");
    const form = document.querySelector("#student-form");
    container.insertBefore(div, form);

    // Remove after 3 seconds
    setTimeout(() => div.remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
    selectedRow = null;
}

// Add or Update Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const rollNo = document.querySelector("#rollNo").value.trim();

    // Validate input fields
    if (firstName === "" || lastName === "" || rollNo === "") {
        showAlert("Please fill in all fields", "danger");
        return;
    }

    // Validate Roll Number: Only Numbers Allowed
    if (isNaN(rollNo) || rollNo.trim() === "") {
        showAlert("Roll Number must be a number!", "danger");
        return;
    }

    if (selectedRow === null) {
        // Insert new row
        const list = document.querySelector(".student-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
                <a href="#" class="edit-btn">Edit</a>
                <a href="#" class="delete-btn">Delete</a>
            </td>
        `;

        list.appendChild(row);
        showAlert("Student Added Successfully", "success");
    } else {
        // Update existing row
        selectedRow.children[0].textContent = firstName;
        selectedRow.children[1].textContent = lastName;
        selectedRow.children[2].textContent = rollNo;

        showAlert("Student Info Updated", "info");
        selectedRow = null;
    }

    clearFields();
});

// Edit Data
document.querySelector(".student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        e.preventDefault();
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }
});

// Delete Data
document.querySelector(".student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
        clearFields();
    }
});
