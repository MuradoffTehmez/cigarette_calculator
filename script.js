// Dark mode düyməsi və vəziyyəti
const darkModeToggle = document.querySelector('.dark-mode-btn');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Dark mode vəziyyətini yadda saxla
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Form elementləri
const form = document.querySelector('#cigarette-form');
const resultsBody = document.querySelector('#results-body');
const chartContainer = document.querySelector('#chart-container');
const socialShare = document.querySelector('#social-share');

// Hesablamaları aparmaq və nəticələri göstərmək üçün əsas funksiya
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Dəyərləri əldə et
    const pricePerPack = parseFloat(document.querySelector('#price-per-pack').value);
    const cigarettesPerDay = parseInt(document.querySelector('#cigarettes-per-day').value);
    const startDate = new Date(document.querySelector('#start-date').value);

    // Günü hesablama
    const today = new Date();
    const daysSmoking = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

    // Paket və ümumi siqaret miqdarı
    const cigarettesSmoked = daysSmoking * cigarettesPerDay;
    const packsSmoked = cigarettesSmoked / 20;

    // Ümumi xərc
    const totalSpent = packsSmoked * pricePerPack;

    // Nəticələri göstər
    resultsBody.innerHTML = `
        <tr><td>Ümumi siqaret çəkilən günlər</td><td>${daysSmoking}</td></tr>
        <tr><td>Ümumi çəkilən siqaretlər</td><td>${cigarettesSmoked.toFixed(0)} ədəd</td></tr>
        <tr><td>Ümumi paket miqdarı</td><td>${packsSmoked.toFixed(1)} paket</td></tr>
        <tr><td>Xərclənən ümumi məbləğ</td><td>${totalSpent.toFixed(2)} AZN</td></tr>
    `;

    // Sosial paylaşım düymələrini yenilə
    updateSocialShare(totalSpent, daysSmoking, packsSmoked);

    // Qrafikləri yenilə
    updateChart(daysSmoking, packsSmoked, totalSpent);
});

// Sosial media paylaşımı düymələrini yenilə
function updateSocialShare(totalSpent, daysSmoking, packsSmoked) {
    const message = `Mən ${daysSmoking} gün ərzində ${packsSmoked.toFixed(1)} paket siqaret çəkdim və bu müddət ərzində ${totalSpent.toFixed(2)} AZN xərclədim. Siz də sağlam həyat üçün bir addım ata bilərsiniz! 🚭`;

    socialShare.innerHTML = `
        <button class="btn btn-facebook" onclick="shareOnFacebook('${message}')">Facebook</button>
        <button class="btn btn-twitter" onclick="shareOnTwitter('${message}')">X</button>
        <button class="btn btn-whatsapp" onclick="shareOnWhatsApp('${message}')">WhatsApp</button>
    `;
}

// Sosial media paylaşım funksiyaları
function shareOnFacebook(message) {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function shareOnTwitter(message) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function shareOnWhatsApp(message) {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Qrafikləri yeniləmə funksiyası (Chart.js istifadə olunur)
function updateChart(daysSmoking, packsSmoked, totalSpent) {
    const ctx = document.getElementById('stats-chart').getContext('2d');
    if (window.myChart) window.myChart.destroy(); // Əvvəlki qrafiki məhv et

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Siqaret çəkilən günlər', 'Çəkilən paketlər', 'Xərclənən məbləğ (AZN)'],
            datasets: [{
                label: 'Hesablamalar',
                data: [daysSmoking, packsSmoked, totalSpent],
                backgroundColor: ['#007BFF', '#FFC107', '#28A745'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.raw.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
