"use client"

import { createContext, useState } from "react"

// Add translations for roadmap and ensure all navbar tabs have translations
export const languages = {
  ENGLISH: "english",
  BENGALI: "bengali",
  HINDI: "hindi",
}

// Sample translations for demonstration
const translations = {
  [languages.ENGLISH]: {
    // Common
    welcome: "Welcome to MoneyMentor",
    tagline: "Your AI-powered financial assistant for better investing decisions",
    continue_learning: "Continue Learning",
    view_all: "View All",

    // Settings
    settings: "Settings",
    manage_preferences: "Manage your account preferences",
    appearance: "Appearance",
    theme: "Theme",
    theme_desc: "Switch between light and dark mode",
    language: "Language",
    language_desc: "Choose your preferred language",
    account: "Account",
    email_notifications: "Email Notifications",
    email_notifications_desc: "Receive email updates about your account",
    two_factor: "Two-Factor Authentication",
    two_factor_desc: "Add an extra layer of security to your account",
    privacy: "Privacy",
    profile_visibility: "Profile Visibility",
    profile_visibility_desc: "Control who can see your profile",
    data_sharing: "Data Sharing",
    data_sharing_desc: "Allow us to use your data to improve our services",

    // Navigation
    learn: "Learn",
    roadmap: "Roadmap",
    ai_chat: "AI Chat",
    community: "Community",
    feed: "Feed",
    profile: "Profile",
    settings_nav: "Settings",
    logout: "Logout",

    // Home
    learning_progress: "Learning Progress",
    notifications: "Notifications",
    hot_topics: "Hot Topics",
    daily_quiz: "Daily Quiz",
  },

  [languages.BENGALI]: {
    // Common
    welcome: "মানিমেন্টরে স্বাগতম",
    tagline: "আপনার এআই-চালিত আর্থিক সহকারী উন্নত বিনিয়োগ সিদ্ধান্তের জন্য",
    continue_learning: "শেখা চালিয়ে যান",
    view_all: "সব দেখুন",

    // Settings
    settings: "সেটিংস",
    manage_preferences: "আপনার অ্যাকাউন্ট পছন্দগুলি পরিচালনা করুন",
    appearance: "চেহারা",
    theme: "থিম",
    theme_desc: "লাইট এবং ডার্ক মোডের মধ্যে পরিবর্তন করুন",
    language: "ভাষা",
    language_desc: "আপনার পছন্দের ভাষা চয়ন করুন",
    account: "অ্যাকাউন্ট",
    email_notifications: "ইমেল বিজ্ঞপ্তি",
    email_notifications_desc: "আপনার অ্যাকাউন্ট সম্পর্কে ইমেল আপডেট পান",
    two_factor: "দুই-ফ্যাক্টর প্রমাণীকরণ",
    two_factor_desc: "আপনার অ্যাকাউন্টে অতিরিক্ত সুরক্ষা স্তর যোগ করুন",
    privacy: "গোপনীয়তা",
    profile_visibility: "প্রোফাইল দৃশ্যমানতা",
    profile_visibility_desc: "কে আপনার প্রোফাইল দেখতে পারে তা নিয়ন্ত্রণ করুন",
    data_sharing: "ডেটা শেয়ারিং",
    data_sharing_desc: "আমাদের পরিষেবা উন্নত করতে আপনার ডেটা ব্যবহার করার অনুমতি দিন",

    // Navigation
    learn: "শিখুন",
    roadmap: "রোডম্যাপ",
    ai_chat: "এআই চ্যাট",
    community: "কমিউনিটি",
    feed: "ফিড",
    profile: "প্রোফাইল",
    settings_nav: "সেটিংস",
    logout: "লগআউট",

    // Home
    learning_progress: "শেখার অগ্রগতি",
    notifications: "বিজ্ঞপ্তি",
    hot_topics: "জনপ্রিয় বিষয়",
    daily_quiz: "দৈনিক কুইজ",
  },

  [languages.HINDI]: {
    // Common
    welcome: "मनीमेंटर में आपका स्वागत है",
    tagline: "बेहतर निवेश निर्णयों के लिए आपका AI-संचालित वित्तीय सहायक",
    continue_learning: "सीखना जारी रखें",
    view_all: "सभी देखें",

    // Settings
    settings: "सेटिंग्स",
    manage_preferences: "अपनी खाता प्राथमिकताएँ प्रबंधित करें",
    appearance: "दिखावट",
    theme: "थीम",
    theme_desc: "लाइट और डार्क मोड के बीच स्विच करें",
    language: "भाषा",
    language_desc: "अपनी पसंदीदा भाषा चुनें",
    account: "खाता",
    email_notifications: "ईमेल सूचनाएँ",
    email_notifications_desc: "अपने खाते के बारे में ईमेल अपडेट प्राप्त करें",
    two_factor: "दो-कारक प्रमाणीकरण",
    two_factor_desc: "अपने खाते में अतिरिक्त सुरक्षा परत जोड़ें",
    privacy: "गोपनीयता",
    profile_visibility: "प्रोफ़ाइल दृश्यता",
    profile_visibility_desc: "नियंत्रित करें कि कौन आपकी प्रोफ़ाइल देख सकता है",
    data_sharing: "डेटा साझाकरण",
    data_sharing_desc: "हमें अपनी सेवाओं को बेहतर बनाने के लिए आपके डेटा का उपयोग करने की अनुमति दें",

    // Navigation
    learn: "सीखें",
    roadmap: "रोडमैप",
    ai_chat: "AI चैट",
    community: "समुदाय",
    feed: "फ़ीड",
    profile: "प्रोफ़ाइल",
    settings_nav: "सेटिंग्स",
    logout: "लॉगआउट",

    // Home
    learning_progress: "सीखने की प्रगति",
    notifications: "सूचनाएँ",
    hot_topics: "लोकप्रिय विषय",
    daily_quiz: "दैनिक प्रश्नोत्तरी",
  },
}

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(languages.ENGLISH)

  // Function to translate text
  const translate = (key) => {
    if (!translations[language][key]) {
      // Fallback to English if translation not found
      return translations[languages.ENGLISH][key] || key
    }
    return translations[language][key]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, translate }}>{children}</LanguageContext.Provider>
}

