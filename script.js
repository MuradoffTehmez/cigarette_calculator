// script.js

document.getElementById("calcForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Form məlumatlarını al
  const gunlukSiqaret = parseFloat(document.getElementById("gunlukSiqaret").value);
  const siqaretQiymeti = parseFloat(document.getElementById("siqaretQiymeti").value);
  const aylıqGelir = parseFloat(document.getElementById("ayliqGelir").value);
  const ilkSiqaretTarixi = new Date(document.getElementById("ilkSiqaretTarixi").value);

  if (isNaN(gunlukSiqaret) || isNaN(siqaretQiymeti) || isNaN(ilkSiqaretTarixi.getTime())) {
    alert("Zəhmət olmasa bütün sahələri düzgün doldurun.");
    return;
  }

  // İlk siqaretdən bu günə qədər keçən günlərin sayı
  const bugun = new Date();
  const kecenGunler = Math.ceil((bugun - ilkSiqaretTarixi) / (1000 * 60 * 60 * 24));

  // Keçmişdə çəkilən siqaretlərin sayı və xərci
  const toplamSiqaret = gunlukSiqaret * kecenGunler;
  const toplamPaçka = toplamSiqaret / 20; // 1 qutuda 20 siqaret var
  const toplamXerc = toplamPaçka * siqaretQiymeti;

  // Günlük, aylıq və illik xərclər
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
    <br><br>
    İlk siqaret çəkdiyiniz tarixdən indiyə qədər:
    <ul>
      <li>Çəkilən siqaretlər: ${toplamSiqaret.toFixed(0)} ədəd</li>
      <li>Qutular: ${toplamPaçka.toFixed(2)} qutu</li>
      <li>Xərc: ${toplamXerc.toFixed(2)} AZN</li>
    </ul>
  `;
  document.getElementById("umumiXerc").innerHTML = umumiXercText;

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
