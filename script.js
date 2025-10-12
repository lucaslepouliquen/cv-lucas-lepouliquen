document.addEventListener('DOMContentLoaded', function() {
    // Le code JavaScript peut être ajouté ici
    console.log('CV de Lucas Le Pouliquen chargé avec succès');
    
    // Variables pour la gestion de la langue
    let currentLang = 'fr';
    
    // Fonction pour changer la langue
    function switchLanguage() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        
        // Mettre à jour tous les éléments avec data-fr et data-en
        const translatableElements = document.querySelectorAll('[data-fr][data-en]');
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${currentLang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Mettre à jour le bouton toggle
        const langBtn = document.getElementById('lang-toggle');
        const flagIcon = langBtn.querySelector('.flag-icon');
        const langText = langBtn.querySelector('.lang-text');
        
        if (currentLang === 'en') {
            flagIcon.textContent = '🇫🇷';
            langText.textContent = 'FR';
            document.documentElement.lang = 'en';
        } else {
            flagIcon.textContent = '🇬🇧';
            langText.textContent = 'EN';
            document.documentElement.lang = 'fr';
        }
        
        // Mettre à jour l'expérience totale avec la langue appropriée
        updateCurrentExperiences();
    }
    
    // Ajouter l'événement click au bouton
    document.getElementById('lang-toggle').addEventListener('click', switchLanguage);
    
    function present(startYear, startMonth, language = 'fr') {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; 
        
        // Calculer la différence en mois en incluant le mois en cours
        let monthsDiff = (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;
        
        if (monthsDiff <= 0) {
            monthsDiff = 1;
        }
        
        const years = Math.floor(monthsDiff / 12);
        const months = monthsDiff % 12;
        
        let durationText = '';
        if (language === 'en') {
            if (years > 0) {
                durationText += years + ' year' + (years > 1 ? 's' : '');
                if (months > 0) {
                    durationText += ' and ' + months + ' month' + (months > 1 ? 's' : '');
                }
            } else {
                durationText = months + ' month' + (months > 1 ? 's' : '');
            }
        } else {
            if (years > 0) {
                durationText += years + ' an' + (years > 1 ? 's' : '');
                if (months > 0) {
                    durationText += ' et ' + months + ' mois';
                }
            } else {
                durationText = months + ' mois';
            }
        }
        
        return durationText;
    }

    // Fonction pour calculer l'expérience totale
    function calculateTotalExperience() {
        const experienceDates = document.querySelectorAll('.experience-date');
        let totalMonths = 0;
        let experienceCount = 0;
        
        experienceDates.forEach((dateSpan, index) => {
            const dateText = dateSpan.textContent;
            
            // Extraire les dates au format YYYY-MM ou avec "aujourd'hui"/"present"
            let dateMatch = dateText.match(/(\d{4})-(\d{2}) (?:à|to) (\d{4})-(\d{2})/);
            let todayMatch = dateText.match(/(\d{4})-(\d{2}) (?:à aujourd'hui|to present)/);
            
            if (dateMatch) {
                const startYear = parseInt(dateMatch[1]);
                const startMonth = parseInt(dateMatch[2]);
                const endYear = parseInt(dateMatch[3]);
                const endMonth = parseInt(dateMatch[4]);
                
                // Calculer la différence en mois (formule corrigée)
                let monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
                
                // Si le résultat est négatif ou 0, c'est une erreur
                if (monthsDiff <= 0) {
                    monthsDiff = Math.abs(monthsDiff) + 1; // Ajouter 1 mois minimum
                }
                
                totalMonths += monthsDiff;
                experienceCount++;
            } else if (todayMatch) {
                const startYear = parseInt(todayMatch[1]);
                const startMonth = parseInt(todayMatch[2]);
                
                // Utiliser la date actuelle dynamique
                const now = new Date();
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth() + 1;
                
                // Calculer la différence en mois jusqu'à aujourd'hui (inclure le mois en cours)
                let monthsDiff = (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;
                
                if (monthsDiff <= 0) {
                    monthsDiff = 1; // Au minimum 1 mois
                }
                
                totalMonths += monthsDiff;
                experienceCount++;
            }
        });
        
        // Convertir en années et mois
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        let experienceText = '';
        if (currentLang === 'en') {
            if (years > 0) {
                experienceText += years + ' year' + (years > 1 ? 's' : '');
                if (months > 0) {
                    experienceText += ' and ' + months + ' month' + (months > 1 ? 's' : '');
                }
            } else {
                experienceText = months + ' month' + (months > 1 ? 's' : '');
            }
        } else {
            if (years > 0) {
                experienceText += years + ' an' + (years > 1 ? 's' : '');
                if (months > 0) {
                    experienceText += ' et ' + months + ' mois';
                }
            } else {
                experienceText = months + ' mois';
            }
        }
        
        return experienceText;
    }
    
    // Mettre à jour l'affichage de l'expérience
    function updateExperienceDisplay() {
        const totalExperience = calculateTotalExperience();
        const experienceElement = document.getElementById('total-experience');
        
        if (experienceElement) {
            const suffix = currentLang === 'en' ? ' of experience' : ' d\'expérience';
            experienceElement.textContent = totalExperience + suffix;
        }
    }
    
    // Fonction pour mettre à jour les expériences en cours avec la fonction present
    function updateCurrentExperiences() {
        // Mettre à jour l'expérience Experis (commencée en août 2025)
        const experisElement = document.getElementById('experis-duration');
        
        if (experisElement) {
            const startYear = parseInt(experisElement.getAttribute('data-start-year'));
            const startMonth = parseInt(experisElement.getAttribute('data-start-month'));
            
            // Utiliser la fonction present pour calculer la durée
            const duration = present(startYear, startMonth, currentLang);
            console.log('Durée calculée avec present():', duration, 'Langue:', currentLang);
            
            const frText = `${startYear}-${startMonth.toString().padStart(2, '0')} à aujourd'hui (${duration})`;
            const enText = `${startYear}-${startMonth.toString().padStart(2, '0')} to present (${duration})`;
            
            experisElement.setAttribute('data-fr', frText);
            experisElement.setAttribute('data-en', enText);
            experisElement.textContent = currentLang === 'en' ? enText : frText;
            
            console.log('✅ Fonction present() utilisée ! Texte mis à jour:', experisElement.textContent);
        } else {
            console.log('❌ Element Experis non trouvé');
        }
        
        // Mettre à jour l'expérience totale
        updateExperienceDisplay();
    }
    
    // Fonction pour mettre à jour périodiquement (chaque jour)
    function startPeriodicUpdate() {
        // Mettre à jour immédiatement
        updateCurrentExperiences();
        
        // Puis mettre à jour chaque jour (24 heures = 86400000 ms)
        setInterval(updateCurrentExperiences, 86400000);
    }
    
    // Fonction de test pour vérifier les calculs
    function testPresentFunction() {
        console.log('=== Tests de la fonction present() ===');
        
        // Test 1: Expérience commencée en août 2025 (2025-08)
        const testFr = present(2025, 8, 'fr');
        const testEn = present(2025, 8, 'en');
        console.log(`Depuis août 2025 - FR: ${testFr}, EN: ${testEn}`);
        
        // Test 2: Expérience commencée en janvier 2024
        const testFr2 = present(2024, 1, 'fr');
        const testEn2 = present(2024, 1, 'en');
        console.log(`Depuis janvier 2024 - FR: ${testFr2}, EN: ${testEn2}`);
        
        // Test 3: Expérience commencée ce mois-ci
        const now = new Date();
        const testFr3 = present(now.getFullYear(), now.getMonth() + 1, 'fr');
        const testEn3 = present(now.getFullYear(), now.getMonth() + 1, 'en');
        console.log(`Depuis ce mois - FR: ${testFr3}, EN: ${testEn3}`);
        
        console.log('=== Fin des tests ===');
    }
    
    // Exécuter les tests en mode développement (si console ouverte)
    if (typeof console !== 'undefined') {
        testPresentFunction();
    }
    
    // Exécuter le calcul et mettre à jour l'affichage
    startPeriodicUpdate();
}); 