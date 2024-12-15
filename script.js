// Dark mode funksiyası
document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Hesablama funksiyası
function calculate() {
    let startDate = new Date(document.getElementById('startDate').value);
    let cigarettePrice = parseFloat(document.getElementById('cigarettePrice').value);
    let cigarettesPerDay = parseInt(document.getElementById('cigarettesPerDay').value);
    let goal = parseFloat(document.getElementById('goal').value);

    let today = new Date();
    let daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    // Hesablama
    let totalCigarettes = cigarettesPerDay * daysSinceStart;
    let totalCost = totalCigarettes * cigarettePrice;
    let monthlyCost = totalCost / (daysSinceStart / 30);
    let yearlyCost = totalCost / (daysSinceStart / 365);

    // Nəticələri ekrana yazdırmaq
    document.getElementById('totalCigarettes').innerText = totalCigarettes;
    document.getElementById('totalCost').innerText = totalCost.toFixed(2) + " AZN";
    document.getElementById('monthlyCost').innerText = monthlyCost.toFixed(2) + " AZN";
    document.getElementById('yearlyCost').innerText = yearlyCost.toFixed(2) + " AZN";

    // Qrafiklər üçün məlumat
    updateCharts(totalCigarettes, totalCost);
}

// Qrafiklərin yenilənməsi
function updateCharts(totalCigarettes, totalCost) {
    // Siqaret Qrafiki
    let ctxCigarettes = document.getElementById("cigaretteChart").getContext("2d");
    new Chart(ctxCigarettes, {
        type: 'bar',
        data: {
            labels: ['Çəkilən Siqaretlər'],
            datasets: [{
                label: 'Siqaretlər',
                data: [totalCigarettes],
                backgroundColor: '#FF5733',
            }]
        },
    });

    // Xərc Qrafiki
    let ctxExpense = document.getElementById("expenseChart").getContext("2d");
    new Chart(ctxExpense, {
        type: 'pie',
        data: {
            labels: ['Xərclənmiş Pul'],
            datasets: [{
                data: [totalCost, totalCost * 1.5],
                backgroundColor: ['#FF5733', '#4CAF50'],
            }]
        },
    });
}

// Sosial Media Paylaşımı
function shareResults() {
    let message = `Mən, siqaret çəkməkdən xərclədiyim pulu hesabladım! Cəmi ${document.getElementById('totalCost').innerText} AZN sərf etdim.`;
    let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
