
const appointmentForm = document.getElementById("appointmentForm");
const bookingMessage = document.getElementById("bookingMessage");
const appointmentDate = document.getElementById("appointmentDate");

// Prevent selecting a date in the past.
function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

appointmentDate.min = getToday();

appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    bookingMessage.textContent = "";
    bookingMessage.className = "booking-message";

    // Read the form values.
    const appointment = {
        id: "PC" + Date.now().toString().slice(-8),
        ownerName: document.getElementById("ownerName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        petName: document.getElementById("petName").value.trim(),
        petType: document.getElementById("petType").value,
        service: document.getElementById("service").value,
        date: appointmentDate.value,
        time: document.getElementById("appointmentTime").value,
        notes: document.getElementById("notes").value.trim(),
        status: "Pending"
    };

    // Check that the selected date is not in the past.
    if (appointment.date < getToday()) {
        bookingMessage.textContent =
            "Please choose today or a future date.";
        bookingMessage.classList.add("error");
        return;
    }

    // Load existing bookings from this browser.
    let appointments = [];

    try {
        appointments = JSON.parse(
            localStorage.getItem("pawcareAppointments") || "[]"
        );

        if (!Array.isArray(appointments)) {
            appointments = [];
        }

        // Save the new appointment.
        appointments.push(appointment);

        localStorage.setItem(
            "pawcareAppointments",
            JSON.stringify(appointments)
        );
    } catch (error) {
        bookingMessage.textContent =
            "Unable to save your booking. Please check browser storage and try again.";
        bookingMessage.classList.add("error");
        return;
    }

    // Show a successful submission message.
    bookingMessage.textContent =
        `Booking saved! Reference: ${appointment.id}. ` +
        `Status: Pending. This is a demo booking, not a confirmed clinic appointment.`;

    bookingMessage.classList.add("success");

    appointmentForm.reset();
    appointmentDate.min = getToday();
});
