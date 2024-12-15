// Dark Mode funksiyası
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

    // Nəticələri göstərmək
    document.getElementById('totalCigarettes').innerText = totalCigarettes;
    document.getElementById('totalCost').innerText = totalCost.toFixed(2) + " AZN";
    document.getElementById('monthlyCost').innerText = monthlyCost.toFixed(2) + " AZN";
    document.getElementById('yearlyCost').innerText = yearlyCost.toFixed(2) + " AZN";

    // Qrafikləri yenilə
    updateCharts(totalCigarettes, totalCost);
}

// Qrafikləri yeniləmək üçün
function updateCharts(totalCigarettes, totalCost) {
    let ctx1 = document.getElementById('cigaretteChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Çəkilən Siqaretlər'],
            datasets: [{
                label: 'Siqaretlər',
                data: [totalCigarettes],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }]
        },
    });

    let ctx2 = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Toplam Xərc'],
            datasets: [{
                data: [totalCost, goal],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            }]
        },
    });
}

// Sosial Media Paylaşımı
function shareResults() {
    let message = `Mən bu günə qədər ${document.getElementById('totalCost').innerText} xərcləmişəm! Siqaret çəkməkdən qazancım bu ola bilərdi!`;
    let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
