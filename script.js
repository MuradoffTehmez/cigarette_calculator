// Qrafik dəyişəni
let xercQrafiki;

// Hesablamadan sonra qrafik qur
document.getElementById("hesablaBtn").addEventListener("click", function () {
  const gunlukSiqaret = parseInt(document.getElementById("gunlukSiqaret").value);
  const qutuQiymeti = parseFloat(document.getElementById("qutuQiymeti").value);
  const qutudakiSiqaret = parseInt(document.getElementById("qutudakiSiqaret").value);
  const muddet = document.getElementById("muddet").value;

  if (!gunlukSiqaret || !qutuQiymeti || !qutudakiSiqaret) {
    alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin.");
    return;
  }

  const gunlukXerc = (gunlukSiqaret * qutuQiymeti) / qutudakiSiqaret;

  let umumiXerc;
  if (muddet === "gun") {
    umumiXerc = gunlukXerc;
  } else if (muddet === "ay") {
    umumiXerc = gunlukXerc * 30;
  } else if (muddet === "il") {
    umumiXerc = gunlukXerc * 365;
  } else {
    alert("Seçilmiş müddət düzgün deyil.");
    return;
  }

  document.getElementById("umumiXerc").textContent = 
    `Seçilmiş müddət üçün ümumi xərc: ${umumiXerc.toFixed(2)} AZN`;

  // Gündəlik, aylıq və illik xərcləri hesablamaq
  const aylıqXerc = gunlukXerc * 30;
  const illikXerc = gunlukXerc * 365;

  // Mövcud qrafik varsa, məhv et
  if (xercQrafiki) {
    xercQrafiki.destroy();
  }

  // Chart.js ilə qrafik yaratmaq
  const ctx = document.getElementById("xercQrafiki").getContext("2d");
  xercQrafiki = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Günlük", "Aylıq", "İllik"],
      datasets: [{
        label: "Siqaret Xərcləri (AZN)",
        data: [gunlukXerc.toFixed(2), aylıqXerc.toFixed(2), illikXerc.toFixed(2)],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderColor: ["#388e3c", "#f57c00", "#d32f2f"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Xərc (AZN)"
          }
        },
        x: {
          title: {
            display: true,
            text: "Müddət"
          }
        }
      },
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });
});
