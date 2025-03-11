document.addEventListener("DOMContentLoaded", () => {
    const crimeForm = document.getElementById("crimeForm");
    const reportList = document.getElementById("reportList");

    // ✅ Handle Crime Report Submission
    crimeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const formData = new FormData(crimeForm);

        console.log("🚀 Sending Form Data:", formData.get("description"), formData.get("location"), formData.get("media"));

        try {
            const response = await fetch('/report', { 
                method: 'POST',
                body: formData  // ✅ Send as multipart/form-data
            });

            if (!response.ok) {
                throw new Error("Failed to submit report.");
            }

            const result = await response.json();
            alert("Report Submitted: " + JSON.stringify(result));

            fetchReports(); // Refresh the reports list
        } catch (error) {
            console.error("❌ Error submitting report:", error);
            alert("Failed to submit report.");
        }
    });

    // ✅ Fetch and Display Reports
    async function fetchReports() {
        try {
            const response = await fetch('/reports');

            if (!response.ok) {
                throw new Error("Failed to fetch reports.");
            }

            const data = await response.json();
            reportList.innerHTML = ""; // Clear previous reports

            data.files.forEach(file => {
                let listItem = document.createElement('li');
                listItem.innerHTML = `<a href="/${file}" target="_blank">${file}</a>`;
                reportList.appendChild(listItem);
            });
        } catch (error) {
            console.error("❌ Error fetching reports:", error);
        }
    }

    fetchReports(); // Load reports on page load
});
