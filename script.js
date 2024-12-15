// script.js

document.getElementById("calcForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Form məlumatlarını al
  const gunlukSiqaret = parseFloat(document.getElementById("gunlukSiqaret").value);
  const siqaretQiymeti = parseFloat(document.getElementById("siqaretQiymeti").value);
  const aylıqGelir = parseFloat(document.getElementById("ayliqGelir").value);

  if (isNaN(gunlukSiqaret) || isNaN(siqaretQiymeti)) {
    alert("Zəhmət olmasa bütün sahələri düzgün doldurun.");
    return;
  }

  // Günlük və aylıq xərcləri hesabla
  const gunlukXerc = (gunlukSiqaret / 20) * siqaretQiymeti;
  const aylıqXerc = gunlukXerc * 30;
  const illikXerc = aylıqXerc * 12;

  // Gəlirin faizi
  let gelirFaiz = "";
  if (!isNaN(aylıqGelir)) {
    const faiz = ((aylıqXerc / aylıqGelir) * 100).toFixed(2);
    gelirFaiz = ` Bu, aylıq gəlirinizin ${faiz}% -ni təşkil edir.`;
  }

  // Nəticələri göstər
  const umumiXercText = `
    Gündəlik xərclər: ${gunlukXerc.toFixed(2)} AZN.
    Aylıq xərclər: ${aylıqXerc.toFixed(2)} AZN.
    İllik xərclər: ${illikXerc.toFixed(2)} AZN.${gelirFaiz}
  `;
  document.getElementById("umumiXerc").textContent = umumiXercText;

  // Keçmiş nəticələri yadda saxla
  const kecmisXerc = JSON.parse(localStorage.getItem("kecmisXerc")) || [];
  kecmisXerc.push({ tarix: new Date().toLocaleDateString(), xerc: aylıqXerc.toFixed(2) });
  localStorage.setItem("kecmisXerc", JSON.stringify(kecmisXerc));
  gosterKecmisNəticələr(kecmisXerc);

  // Qrafik göstərin
  yigilmisQrafik(aylıqXerc);
});

function gosterKecmisNəticələr(kecmisXerc) {
  const kecmisList = document.getElementById("kecmisList");
  kecmisList.innerHTML = kecmisXerc
    .map(item => `<li>${item.tarix}: ${item.xerc} AZN</li>`)
    .join("");
}

function yigilmisQrafik(aylıqXerc) {
  const vaxtData = [1, 2, 3, 4, 5];
  const yigilmisXerc = vaxtData.map(vaxt => vaxt * aylıqXerc);

  const ctxLine = document.getElementById("lineChart").getContext("2d");
  new Chart(ctxLine, {
    type: "line",
    data: {
      labels: vaxtData.map(m => `${m} Ay`),
      datasets: [{
        label: "Yığılmış Xərclər (AZN)",
        data: yigilmisXerc,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)"
      }]
    },
    options: { responsive: true }
  });
}

// İlk yükləmədə keçmiş nəticələri göstər
gosterKecmisNəticələr(JSON.parse(localStorage.getItem("kecmisXerc")) || []);
