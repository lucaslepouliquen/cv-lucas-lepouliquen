document.addEventListener('DOMContentLoaded', function() {
    // Le code JavaScript peut être ajouté ici
    console.log('CV de Lucas Le Pouliquen chargé avec succès');
    
    // Fonction pour calculer l'expérience totale
    function calculateTotalExperience() {
        const experienceDates = document.querySelectorAll('.experience-date');
        let totalMonths = 0;
        let experienceCount = 0;
        
        experienceDates.forEach((dateSpan, index) => {
            const dateText = dateSpan.textContent;
            
            // Extraire les dates au format YYYY-MM
            const dateMatch = dateText.match(/(\d{4})-(\d{2}) à (\d{4})-(\d{2})/);
            
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
            }
        });
        
        // Convertir en années et mois
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        // Formater le texte
        let experienceText = '';
        if (years > 0) {
            experienceText += years + ' an' + (years > 1 ? 's' : '');
            if (months > 0) {
                experienceText += ' et ' + months + ' mois';
            }
        } else {
            experienceText = months + ' mois';
        }
        
        return experienceText;
    }
    
    // Mettre à jour l'affichage de l'expérience
    function updateExperienceDisplay() {
        const totalExperience = calculateTotalExperience();
        const experienceElement = document.getElementById('total-experience');
        
        if (experienceElement) {
            experienceElement.textContent = totalExperience + ' d\'expérience';
        }
    }
    
    // Exécuter le calcul et mettre à jour l'affichage
    updateExperienceDisplay();
}); 