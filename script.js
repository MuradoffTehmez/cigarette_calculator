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
const form = document.querySelector('form');
const resultsContainer = document.querySelector('#results');
const chartContainer = document.querySelector('#chart-container');
const totalSpentElement = document.querySelector('#total-spent');
const socialShare = document.querySelector('#social-share');

// Sosial media paylaşımı üçün şablon mesaj
function generateSocialMessage(totalSpent, daysSmoking, packsSmoked) {
    return `Mən ${daysSmoking} gün ərzində ${packsSmoked} paket siqaret çəkdim və bu müddət ərzində ${totalSpent.toFixed(2)} AZN xərclədim. Gəlin, siqareti tərgidək və sağlam həyat üçün bir addım ataq! 🚭`;
}

// Formu göndərmə funksiyası
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Dəyərləri əldə et
    const pricePerPack = parseFloat(document.querySelector('#pricePerPack').value);
    const cigarettesPerDay = parseInt(document.querySelector('#cigarettesPerDay').value);
    const startDate = new Date(document.querySelector('#startDate').value);

    // Günü hesablama
    const today = new Date();
    const daysSmoking = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

    // Paket və ümumi siqaret miqdarı
    const cigarettesSmoked = daysSmoking * cigarettesPerDay;
    const packsSmoked = cigarettesSmoked / 20;

    // Ümumi xərc
    const totalSpent = packsSmoked * pricePerPack;

    // Nəticələri göstər
    resultsContainer.innerHTML = `
        <p><strong>Ümumi siqaret çəkilən günlər:</strong> ${daysSmoking}</p>
        <p><strong>Ümumi çəkilən siqaretlər:</strong> ${cigarettesSmoked.toFixed(0)} (Ədədlə)</p>
        <p><strong>Ümumi paket miqdarı:</strong> ${packsSmoked.toFixed(1)}</p>
        <p><strong>Xərclənən ümumi məbləğ:</strong> ${totalSpent.toFixed(2)} AZN</p>
    `;

    // Sosial paylaşım düymələrini yenilə
    socialShare.innerHTML = `
        <button class="btn btn-facebook" onclick="shareOnFacebook('${generateSocialMessage(totalSpent, daysSmoking, packsSmoked)}')">Facebook</button>
        <button class="btn btn-twitter" onclick="shareOnTwitter('${generateSocialMessage(totalSpent, daysSmoking, packsSmoked)}')">X</button>
        <button class="btn btn-whatsapp" onclick="shareOnWhatsApp('${generateSocialMessage(totalSpent, daysSmoking, packsSmoked)}')">WhatsApp</button>
    `;

    // Qrafikləri yenilə
    updateChart(daysSmoking, packsSmoked, totalSpent);
});

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
    const ctx = document.getElementById('chart').getContext('2d');
    if (window.myChart) window.myChart.destroy(); // Əvvəlki qrafiki məhv et

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Günlər', 'Paketlər', 'Məbləğ (AZN)'],
            datasets: [{
                label: 'Nəticələr',
                data: [daysSmoking, packsSmoked, totalSpent],
                backgroundColor: ['#0056b3', '#ffdd57', '#25d366']
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
                        label: function(context) {
                            return context.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}
