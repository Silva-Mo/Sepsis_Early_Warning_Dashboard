// Translations for Sepsis Early Warning Dashboard
export const translations = {
  en: {
    // Header
    title: 'Sepsis Early Warning Dashboard',
    subtitle: 'Educational Version 1.0',
    madeBy: 'Made by',
    
    // Overall Status
    overallStatus: 'Overall Status',
    statusNormal: 'Normal',
    statusAtRisk: 'At-Risk / Watch',
    statusAlert: 'Sepsis Alert!',
    adviceNormal: 'All vital signs and labs are within normal ranges.',
    adviceAtRisk: 'Patient shows some warning signs. Monitor closely.',
    adviceAlert: 'High risk of poor outcome. Immediate medical intervention required.',
    
    // Patient List
    selectPatient: 'Select Patient',
    noPatientsLoaded: 'No patients loaded. Use the controls below to import a patient list.',
    selectPatientCase: 'Select a patient case to view:',
    
    // Patient Information
    patientInformation: 'Patient Information',
    patientId: 'Patient ID',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    
    // Vital Signs
    vitalSigns: 'Vital Signs',
    heartRate: 'Heart Rate',
    respiratoryRate: 'Respiratory Rate',
    systolicBP: 'Systolic BP',
    temperature: 'Temperature',
    heartRateTrend: 'Heart Rate Trend (bpm)',
    
    // Lab Results
    labResults: 'Lab Results',
    wbcCount: 'WBC Count',
    lactate: 'Lactate',
    crp: 'CRP',
    
    // qSOFA Score
    qsofaScore: 'qSOFA Score',
    qsofaInfo: 'A score ≥ 2 suggests high risk.',
    qsofaRR: 'Respiratory Rate ≥ 22/min',
    qsofaSBP: 'Systolic BP ≤ 100 mmHg',
    qsofaAMS: 'Altered Mental Status',
    
    // Simulation Controls
    simulationControls: 'Simulation Controls',
    importInstructions: 'Import a `patients.json` file to load simulation data.',
    loadPatients: 'Load Patients',
    importSuccess: 'Successfully imported {count} patients.',
    importError: 'Error: {message}',
    selectFileFirst: 'Please select a file first.',
    failedToRead: 'Failed to read the file.',
    invalidFormat: 'Invalid JSON format. Expected a "patients" array.',
    
    // Language
    languageToggle: 'عربي'
  },
  ar: {
    // Header
    title: 'لوحة الإنذار المبكر للإنتان',
    subtitle: 'النسخة التعليمية 1.0',
    madeBy: 'من إعداد',
    
    // Overall Status
    overallStatus: 'الحالة العامة',
    statusNormal: 'طبيعي',
    statusAtRisk: 'في خطر / تحت المراقبة',
    statusAlert: 'تنبيه إنتان!',
    adviceNormal: 'جميع العلامات الحيوية والفحوصات ضمن النطاق الطبيعي.',
    adviceAtRisk: 'يظهر المريض بعض العلامات التحذيرية. يجب المراقبة عن كثب.',
    adviceAlert: 'خطر عالٍ من نتائج سيئة. يتطلب تدخل طبي فوري.',
    
    // Patient List
    selectPatient: 'اختر المريض',
    noPatientsLoaded: 'لم يتم تحميل مرضى. استخدم الأدوات أدناه لاستيراد قائمة المرضى.',
    selectPatientCase: 'اختر حالة مريض لعرضها:',
    
    // Patient Information
    patientInformation: 'معلومات المريض',
    patientId: 'رقم المريض',
    name: 'الاسم',
    age: 'العمر',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    
    // Vital Signs
    vitalSigns: 'العلامات الحيوية',
    heartRate: 'معدل ضربات القلب',
    respiratoryRate: 'معدل التنفس',
    systolicBP: 'ضغط الدم الانقباضي',
    temperature: 'درجة الحرارة',
    heartRateTrend: 'اتجاه معدل ضربات القلب (نبضة/دقيقة)',
    
    // Lab Results
    labResults: 'نتائج المختبر',
    wbcCount: 'عدد كريات الدم البيضاء',
    lactate: 'اللاكتات',
    crp: 'بروتين سي التفاعلي',
    
    // qSOFA Score
    qsofaScore: 'نقاط qSOFA',
    qsofaInfo: 'النقاط ≥ 2 تشير إلى خطر عالٍ.',
    qsofaRR: 'معدل التنفس ≥ 22/دقيقة',
    qsofaSBP: 'ضغط الدم الانقباضي ≤ 100 ملم زئبقي',
    qsofaAMS: 'تغير في الحالة العقلية',
    
    // Simulation Controls
    simulationControls: 'أدوات المحاكاة',
    importInstructions: 'استورد ملف `patients.json` لتحميل بيانات المحاكاة.',
    loadPatients: 'تحميل المرضى',
    importSuccess: 'تم استيراد {count} مريضاً بنجاح.',
    importError: 'خطأ: {message}',
    selectFileFirst: 'الرجاء اختيار ملف أولاً.',
    failedToRead: 'فشل في قراءة الملف.',
    invalidFormat: 'تنسيق JSON غير صالح. يُتوقع مصفوفة "patients".',
    
    // Language
    languageToggle: 'English'
  }
};

export default translations;
