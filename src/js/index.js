import '../css/styles.css';
import Chart from 'chart.js/auto';
import translations from './translations.js';

// --- STATE ---
let patientList = []; // Will hold patients from the imported file
let hrChart; // To hold the chart instance
let currentLanguage = localStorage.getItem('language') || 'en'; // Default to English

// --- DOM ELEMENT SELECTORS ---
const elements = {
  // Status
  statusCard: document.getElementById('status-card'),
  statusText: document.getElementById('status-text'),
  statusAdvice: document.getElementById('status-advice'),
  // Patient Info
  patientId: document.getElementById('patient-id'),
  patientName: document.getElementById('patient-name'),
  patientAge: document.getElementById('patient-age'),
  patientGender: document.getElementById('patient-gender'),
  // Vitals
  hr: document.getElementById('hr'),
  rr: document.getElementById('rr'),
  sbp: document.getElementById('sbp'),
  temp: document.getElementById('temp'),
  // Labs
  wbc: document.getElementById('wbc'),
  lactate: document.getElementById('lactate'),
  crp: document.getElementById('crp'),
  // qSOFA
  qsofaScore: document.getElementById('qsofa-score'),
  qsofaRr: document.getElementById('qsofa-rr').querySelector('.indicator'),
  qsofaSbp: document.getElementById('qsofa-sbp').querySelector('.indicator'),
  qsofaAms: document.getElementById('qsofa-ams').querySelector('.indicator'),
  // Controls
  importFile: document.getElementById('import-file'),
  importBtn: document.getElementById('import-btn'),
  importStatus: document.getElementById('import-status'),
  // Patient List
  patientListCard: document.getElementById('patient-list-card'),
  patientSelectorContainer: document.getElementById('patient-selector-container'),
  // Language Toggle
  languageToggle: document.getElementById('language-toggle')
};

// --- LANGUAGE FUNCTIONS ---

/**
 * Translates all elements with data-i18n attribute
 */
function translatePage() {
  const lang = currentLanguage;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update chart if it exists
  if (hrChart) {
    hrChart.data.datasets[0].label = translations[lang].heartRateTrend;
    hrChart.update();
  }
  
  // Save language preference
  localStorage.setItem('language', lang);
}

/**
 * Toggles between English and Arabic
 */
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  translatePage();
  
  // Re-populate patient selector if patients are loaded
  if (patientList.length > 0) {
    populatePatientSelector();
  }
}

/**
 * Gets translated text for a given key
 */
function t(key, replacements = {}) {
  let text = translations[currentLanguage][key] || key;
  
  // Replace placeholders like {count}, {message}
  Object.keys(replacements).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  
  return text;
}

// --- FUNCTIONS ---

/**
 * Calculates the qSOFA score based on vital signs.
 * @param {object} vitals - Patient's vital signs.
 * @returns {number} The calculated qSOFA score.
 */
function calculateQSOFA(vitals) {
  let score = 0;
  if (vitals.rr >= 22) score++;
  if (vitals.sbp <= 100) score++;
  if (vitals.ams) score++;
  return score;
}

/**
 * Updates the entire dashboard UI with data from a patient object.
 * @param {object} patient - The patient data object.
 */
function updateDashboard(patient) {
  // Update Patient Info
  elements.patientId.textContent = patient.info.id;
  elements.patientName.textContent = patient.info.name || '--'; // Add name
  elements.patientAge.textContent = patient.info.age;
  elements.patientGender.textContent = patient.info.gender;

  // Update Vitals
  elements.hr.textContent = patient.vitals.hr;
  elements.rr.textContent = patient.vitals.rr;
  elements.sbp.textContent = patient.vitals.sbp;
  elements.temp.textContent = patient.vitals.temp.toFixed(1);

  // Update Labs
  elements.wbc.textContent = patient.labs.wbc;
  elements.lactate.textContent = patient.labs.lactate;
  elements.crp.textContent = patient.labs.crp;

  // Calculate and display qSOFA score
  const score = calculateQSOFA(patient.vitals);
  elements.qsofaScore.textContent = score;

  // Update qSOFA criteria indicators
  elements.qsofaRr.classList.toggle('positive', patient.vitals.rr >= 22);
  elements.qsofaSbp.classList.toggle('positive', patient.vitals.sbp <= 100);
  elements.qsofaAms.classList.toggle('positive', patient.vitals.ams);

  // Update Overall Status
  elements.statusCard.className = 'card'; // Reset classes
  if (score >= 2) {
    elements.statusCard.classList.add('status-alert');
    elements.statusText.textContent = t('statusAlert');
    elements.statusAdvice.textContent = t('adviceAlert');
    elements.statusText.setAttribute('data-i18n', 'statusAlert');
    elements.statusAdvice.setAttribute('data-i18n', 'adviceAlert');
  } else if (score === 1) {
    elements.statusCard.classList.add('status-watch');
    elements.statusText.textContent = t('statusAtRisk');
    elements.statusAdvice.textContent = t('adviceAtRisk');
    elements.statusText.setAttribute('data-i18n', 'statusAtRisk');
    elements.statusAdvice.setAttribute('data-i18n', 'adviceAtRisk');
  } else {
    elements.statusCard.classList.add('status-normal');
    elements.statusText.textContent = t('statusNormal');
    elements.statusAdvice.textContent = t('adviceNormal');
    elements.statusText.setAttribute('data-i18n', 'statusNormal');
    elements.statusAdvice.setAttribute('data-i18n', 'adviceNormal');
  }

  // Update Heart Rate Chart
  updateChart(patient.hrHistory);
}

/**
 * Creates or updates the heart rate chart.
 * @param {number[]} data - Array of historical heart rate data.
 */
function updateChart(data) {
  const ctx = document.getElementById('hrChart').getContext('2d');
  const labels = ['-4h', '-3h', '-2h', '-1h', 'Now'];

  if (hrChart) {
    hrChart.data.datasets[0].data = data;
    hrChart.data.datasets[0].label = t('heartRateTrend');
    hrChart.update();
  } else {
    hrChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: t('heartRateTrend'),
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: 50,
            suggestedMax: 140
          }
        }
      }
    });
  }
}

/**
 * Populates the patient selector dropdown when a file is loaded.
 */
function populatePatientSelector() {
  elements.patientListCard.style.display = 'block';
  elements.patientSelectorContainer.innerHTML = ''; // Clear existing

  const label = document.createElement('label');
  label.setAttribute('for', 'patient-select');
  label.textContent = t('selectPatientCase');

  const select = document.createElement('select');
  select.id = 'patient-select';

  patientList.forEach((patient, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${patient.info.id} - ${patient.info.name || 'Unnamed Patient'}`;
    select.appendChild(option);
  });

  // Add event listener to the new select dropdown
  select.addEventListener('change', (e) => {
    const selectedIndex = e.target.value;
    updateDashboard(patientList[selectedIndex]);
  });

  elements.patientSelectorContainer.appendChild(label);
  elements.patientSelectorContainer.appendChild(select);
}

/**
 * Handles the file import process.
 */
function handleFileImport() {
  const file = elements.importFile.files[0];
  if (!file) {
    setImportStatus(t('selectFileFirst'), 'error');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.patients || !Array.isArray(data.patients)) {
        throw new Error(t('invalidFormat'));
      }

      patientList = data.patients;
      setImportStatus(t('importSuccess', { count: patientList.length }), 'success');
      populatePatientSelector();

      // Load the first patient by default
      if (patientList.length > 0) {
        updateDashboard(patientList[0]);
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      setImportStatus(t('importError', { message: error.message }), 'error');
      patientList = [];
    }
  };

  reader.onerror = () => {
    setImportStatus(t('failedToRead'), 'error');
  };

  reader.readAsText(file);
}

/**
 * Sets the status message for the file import.
 * @param {string} message - The message to display.
 * @param {'success' | 'error'} type - The type of message.
 */
function setImportStatus(message, type) {
  elements.importStatus.textContent = message;
  elements.importStatus.className = `import-status ${type}`;
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Set up the import button
  elements.importBtn.addEventListener('click', handleFileImport);

  // Set up language toggle button
  elements.languageToggle.addEventListener('click', toggleLanguage);

  // Initialize chart with empty data
  updateChart([0, 0, 0, 0, 0]);

  // Load saved language preference and translate page
  translatePage();
});
