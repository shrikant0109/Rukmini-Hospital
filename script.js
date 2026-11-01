const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            navLinks.classList.remove("is-open");
        });
    });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

const dashboardSessionKey = "rukmini-dashboard-session";
const isDashboardPage = document.body.classList.contains("dashboard-page");
let hasDashboardSession = false;

try {
    hasDashboardSession = sessionStorage.getItem(dashboardSessionKey) === "active";
} catch (error) {
    console.error("Could not read the browser sign-in session.", error);
}

if (isDashboardPage && !hasDashboardSession) {
    window.location.replace("login.html?next=dashboard");
}

const dashboardLogoutButton = document.querySelector("#dashboard-logout");
if (dashboardLogoutButton && hasDashboardSession) {
    dashboardLogoutButton.addEventListener("click", () => {
        try {
            sessionStorage.removeItem(dashboardSessionKey);
            window.location.replace("login.html");
        } catch (error) {
            console.error("Could not clear the browser sign-in session.", error);
            const patientStatus = document.querySelector("#patient-status");
            if (patientStatus) {
                patientStatus.textContent = "Could not sign out in this browser. Close the tab to end this session.";
            }
        }
    });
}

const hospitalContent = {
    services: [
        {
            icon: "✚",
            iconClass: "icon-blue",
            number: "01",
            title: "Diabetes care",
            description: "Personalized conversations and ongoing support to help you understand and manage your care.",
            linkLabel: "Learn more",
            linkAriaLabel: "Ask about diabetes care",
        },
        {
            icon: "♡",
            iconClass: "icon-peach",
            number: "02",
            title: "Nutrition guidance",
            description: "Explore balanced, realistic food choices with guidance shaped around your preferences.",
            linkLabel: "Learn more",
            linkAriaLabel: "Ask about nutrition guidance",
        },
        {
            icon: "⌁",
            iconClass: "icon-lavender",
            number: "03",
            title: "Wellness support",
            description: "Small, sustainable steps toward movement, confidence, and feeling your best every day.",
            linkLabel: "Learn more",
            linkAriaLabel: "Ask about wellness support",
        },
        {
            icon: "◷",
            iconClass: "icon-yellow",
            number: "04",
            title: "Regular follow-ups",
            description: "Stay connected with your care team and get help with questions as they come up.",
            linkLabel: "Learn more",
            linkAriaLabel: "Ask about follow-up appointments",
        },
    ],
    gallery: [
        {
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
            alt: "Bright and welcoming hospital reception area",
            caption: "A warm welcome, every time",
            featured: true,
        },
        {
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85",
            alt: "Doctor ready to listen and help",
            caption: "Care that listens",
            featured: false,
        },
        {
            image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=85",
            alt: "Comfortable hospital waiting area",
            caption: "Space to feel comfortable",
            featured: false,
        },
    ],
};

const serviceGrid = document.querySelector("#service-grid");
if (serviceGrid) {
    hospitalContent.services.forEach((service) => {
        const card = document.createElement("article");
        card.className = "service-card";

        const icon = document.createElement("span");
        icon.className = `service-icon ${service.iconClass}`;
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = service.icon;
        card.append(icon);

        const number = document.createElement("span");
        number.className = "service-number";
        number.textContent = service.number;
        card.append(number);

        const title = document.createElement("h3");
        title.textContent = service.title;
        card.append(title);

        const description = document.createElement("p");
        description.textContent = service.description;
        card.append(description);

        const link = document.createElement("a");
        link.href = "#contact";
        link.setAttribute("aria-label", service.linkAriaLabel);
        link.append(document.createTextNode(`${service.linkLabel} `));
        const linkIcon = document.createElement("span");
        linkIcon.setAttribute("aria-hidden", "true");
        linkIcon.textContent = "↗";
        link.append(linkIcon);
        card.append(link);

        serviceGrid.append(card);
    });
}

const galleryGrid = document.querySelector("#gallery-grid");
if (galleryGrid) {
    hospitalContent.gallery.forEach((item) => {
        const figure = document.createElement("figure");
        figure.className = item.featured ? "gallery-item gallery-large" : "gallery-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.alt;
        figure.append(image);

        const caption = document.createElement("figcaption");
        caption.textContent = item.caption;
        figure.append(caption);

        galleryGrid.append(figure);
    });
}

const patientRecords = {
    sample: [
        {
            patientId: "SAMPLE-001",
            patientName: "Alex Example (Fictional)",
            age: "45",
            appointmentDate: "Sample appointment",
            doctorName: "Dr. Example",
            discussionNotes: "Fictional sample: discussed a routine diabetes follow-up and the patient's questions about everyday self-care.",
            diagnosisOrConcerns: "Fictional example of a routine diabetes follow-up; not a real diagnosis.",
            treatmentOrMedicationNotes: "No real treatment or medication advice. Refer to the treating clinician for an individual care plan.",
            followUpPlan: "Fictional example: arrange follow-up with the care team and confirm all details with the clinician.",
        },
    ],
};

const patientDownloadButton = document.querySelector("#download-patient-csv");
if (patientDownloadButton) {
    patientDownloadButton.addEventListener("click", () => {
        const fields = [
            ["Patient ID", "patientId"],
            ["Patient name", "patientName"],
            ["Age", "age"],
            ["Appointment date", "appointmentDate"],
            ["Doctor name", "doctorName"],
            ["Discussion notes", "discussionNotes"],
            ["Diagnosis or concerns", "diagnosisOrConcerns"],
            ["Treatment/medication notes", "treatmentOrMedicationNotes"],
            ["Follow-up plan", "followUpPlan"],
        ];
        const rows = [
            fields.map(([label]) => label),
            ...patientRecords.sample.map((record) => fields.map(([, key]) => record[key])),
        ];
        const csv = rows
            .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
            .join("\r\n");
        const file = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
        const downloadUrl = URL.createObjectURL(file);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "sample-patient-doctor-discussion.csv";
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    });
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = document.querySelector("#contact-status");
        if (status) {
            status.textContent = "Thanks for your message. This form is not connected to a messaging service, so no message was sent.";
        }
        contactForm.reset();
    });
}

const loginForm = document.querySelector("#login-form");
if (loginForm) {
    if (hasDashboardSession) {
        window.location.replace("dashboard.html");
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = document.querySelector("#login-status");

        try {
            sessionStorage.setItem(dashboardSessionKey, "active");
            window.location.assign("dashboard.html");
        } catch (error) {
            console.error("Could not create the browser sign-in session.", error);
            if (status) {
                status.textContent = "Could not start a sign-in session in this browser. Please enable session storage and try again.";
            }
        }
    });
}

const patientForm = document.querySelector("#patient-form");
if (patientForm && hasDashboardSession) {
    const patientList = document.querySelector("#patient-list");
    const patientCount = document.querySelector("#patient-count");
    const patientStatus = document.querySelector("#patient-status");
    const reportButton = document.querySelector("#download-patient-report");
    const patientStorageKey = "rukmini-demo-patients";
    const samplePatients = [
        { name: "Asha Demo", mobile: "+91 00000 00001", age: 24, disease: "Type 1 diabetes", analysisNote: "Example profile for testing patient-list display." },
        { name: "Rohan Sample", mobile: "+91 00000 00002", age: 38, disease: "Type 2 diabetes", analysisNote: "Example profile for testing category filtering." },
        { name: "Mira Example", mobile: "+91 00000 00003", age: 31, disease: "Gestational diabetes", analysisNote: "Example profile for testing varied age values." },
        { name: "Kabir Demo", mobile: "+91 00000 00004", age: 46, disease: "Prediabetes", analysisNote: "Example profile for testing report exports." },
        { name: "Tara Sample", mobile: "+91 00000 00005", age: 52, disease: "Other diabetes type", analysisNote: "Example profile with an alternate category." },
        { name: "Neel Example", mobile: "+91 00000 00006", age: 63, disease: "Not specified", analysisNote: "Example profile with an unspecified category." },
        { name: "Isha Demo", mobile: "+91 00000 00007", age: 29, disease: "Type 2 diabetes", analysisNote: "Example profile for testing repeated categories." },
        { name: "Dev Sample", mobile: "+91 00000 00008", age: 41, disease: "Type 1 diabetes", analysisNote: "Example profile for testing patient-row layout." },
        { name: "Nina Example", mobile: "+91 00000 00009", age: 57, disease: "Prediabetes", analysisNote: "Example profile for testing larger age values." },
        { name: "Arun Demo", mobile: "+91 00000 00010", age: 35, disease: "Gestational diabetes", analysisNote: "Example profile for testing report row counts." },
    ];
    let patients = [];
    let patientStorageAvailable = true;

    const setPatientStatus = (message) => {
        patientStatus.textContent = message;
    };

    const getWhatsAppNumber = (mobile) => {
        let digits = mobile.replace(/\D/g, "");
        if (mobile.trim().startsWith("00")) {
            digits = digits.slice(2);
        }
        return digits;
    };

    const downloadPatientReport = () => {
        const fields = [
            ["Patient name", "name"],
            ["WhatsApp mobile number", "mobile"],
            ["Age", "age"],
            ["Disease type", "disease"],
            ["Analysis note", "analysisNote"],
        ];
        const rows = [
            fields.map(([label]) => label),
            ...patients.map((patient) => fields.map(([, key]) => patient[key] ?? "")),
        ];
        const csv = rows
            .map((row) => row.map((value) => {
                const text = String(value);
                const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
                return `"${safeText.replaceAll('"', '""')}"`;
            }).join(","))
            .join("\r\n");
        const file = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
        const downloadUrl = URL.createObjectURL(file);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "rukmini-patient-report.csv";
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    };

    const renderPatients = () => {
        patientList.replaceChildren();
        patientCount.textContent = `${patients.length} ${patients.length === 1 ? "patient" : "patients"}`;

        if (patients.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "patient-empty";
            emptyMessage.textContent = "No patients have been added yet.";
            patientList.append(emptyMessage);
            return;
        }

        patients.forEach((patient) => {
            const row = document.createElement("article");
            row.className = "patient-row";

            const details = document.createElement("div");
            details.className = "patient-details";
            const name = document.createElement("h3");
            name.textContent = patient.isSample ? `${patient.name} (Fictional)` : patient.name;
            const mobile = document.createElement("p");
            mobile.textContent = patient.isSample
                ? `Placeholder phone: ${patient.mobile}`
                : patient.mobile;
            details.append(name, mobile);
            if (patient.isSample && Number.isInteger(patient.age)) {
                const age = document.createElement("p");
                age.textContent = `Age: ${patient.age} · Fictional analysis example`;
                details.append(age);
            }
            const disease = document.createElement("span");
            disease.className = "patient-disease";
            disease.textContent = patient.disease;
            details.append(disease);
            if (patient.isSample && typeof patient.analysisNote === "string") {
                const analysisNote = document.createElement("p");
                analysisNote.textContent = patient.analysisNote;
                details.append(analysisNote);
            }

            const action = document.createElement("div");
            action.className = "whatsapp-action";
            let sendButton;
            if (patient.whatsappConsent === true) {
                sendButton = document.createElement("a");
                sendButton.href = `https://wa.me/${getWhatsAppNumber(patient.mobile)}?text=${encodeURIComponent(`Hello ${patient.name}, this is Rukmini Hospital. Please contact our team to confirm or arrange your appointment. Thank you.`)}`;
                sendButton.target = "_blank";
                sendButton.rel = "noopener noreferrer";
                sendButton.textContent = "Send WhatsApp reminder";
            } else {
                sendButton = document.createElement("button");
                sendButton.type = "button";
                sendButton.disabled = true;
                sendButton.textContent = "WhatsApp consent required";
            }
            sendButton.className = "button button-small whatsapp-button";
            sendButton.setAttribute("aria-label", `Open WhatsApp reminder for ${patient.name}`);
            const sendStatus = document.createElement("p");
            sendStatus.className = "whatsapp-status";
            sendStatus.textContent = patient.whatsappConsent === true
                ? "Review and send the message in WhatsApp."
                : "";
            action.append(sendButton, sendStatus);
            row.append(details, action);
            patientList.append(row);
        });
    };

    try {
        const savedPatients = localStorage.getItem(patientStorageKey);
        if (savedPatients) {
            const parsedPatients = JSON.parse(savedPatients);
            if (!Array.isArray(parsedPatients) || parsedPatients.some((patient) =>
                !patient || typeof patient.name !== "string" ||
                typeof patient.mobile !== "string" ||
                typeof patient.disease !== "string"
            )) {
                throw new Error("Saved patient records have an invalid format.");
            }
            patients = parsedPatients.map((patient) => {
                const sampleIndex = patient.isSample === true
                    ? samplePatients.findIndex((sample) => patient.mobile === sample.mobile)
                    : -1;
                return sampleIndex === -1
                    ? patient
                    : { ...samplePatients[sampleIndex], whatsappConsent: false, isSample: true };
            });
        }
    } catch (error) {
        console.error("Could not load patient records.", error);
        patientStorageAvailable = false;
        setPatientStatus("Could not load saved records from this browser. You can still add records for this visit.");
    }

    const savedSampleNumbers = new Set(
        patients.filter((patient) => patient.isSample === true).map((patient) => patient.mobile)
    );
    const missingSamplePatients = samplePatients
        .filter((patient) => !savedSampleNumbers.has(patient.mobile))
        .map((patient) => ({ ...patient, whatsappConsent: false, isSample: true }));
    if (missingSamplePatients.length > 0) {
        patients.push(...missingSamplePatients);
        if (patientStorageAvailable) {
            try {
                localStorage.setItem(patientStorageKey, JSON.stringify(patients));
            } catch (error) {
                console.error("Could not save fictional sample patient records.", error);
                setPatientStatus("Sample profiles are shown for this visit but could not be saved in browser storage.");
            }
        }
    }

    renderPatients();

    reportButton.addEventListener("click", () => {
        downloadPatientReport();
        setPatientStatus("Excel-compatible report downloaded with all currently listed patients.");
    });

    patientForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(patientForm);
        const name = String(formData.get("name") || "").trim();
        const mobile = String(formData.get("mobile") || "").trim();
        const disease = String(formData.get("disease") || "").trim();
        const whatsappNumber = getWhatsAppNumber(mobile);

        if (!name || !disease || whatsappNumber.length < 8 || whatsappNumber.length > 15) {
            setPatientStatus("Enter a name, disease type, and a valid WhatsApp number with country code (8–15 digits).");
            return;
        }

        patients.push({ name, mobile, disease, whatsappConsent: formData.get("whatsappConsent") === "on" });

        try {
            localStorage.setItem(patientStorageKey, JSON.stringify(patients));
        } catch (error) {
            console.error("Could not save patient records.", error);
            patients.pop();
            setPatientStatus("Could not save this patient in browser storage. Please try again.");
            return;
        }

        renderPatients();
        patientForm.reset();
        setPatientStatus("Patient added successfully.");
    });
}
