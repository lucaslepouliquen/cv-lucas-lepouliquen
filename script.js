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
        updateExperienceDisplay();
    }
    
    // Ajouter l'événement click au bouton
    document.getElementById('lang-toggle').addEventListener('click', switchLanguage);
    
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
                
                // Date actuelle (juillet 2025)
                const currentYear = 2025;
                const currentMonth = 10; // Octobre 2025
                
                // Calculer la différence en mois jusqu'à aujourd'hui
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
    
    // Exécuter le calcul et mettre à jour l'affichage
    updateExperienceDisplay();
}); 