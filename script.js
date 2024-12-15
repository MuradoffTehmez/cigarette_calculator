document.getElementById("hesablaBtn").addEventListener("click", function () {
  // Məlumatları əldə et
  const gunlukSiqaret = parseInt(document.getElementById("gunlukSiqaret").value);
  const qutuQiymeti = parseFloat(document.getElementById("qutuQiymeti").value);
  const qutudakiSiqaret = parseInt(document.getElementById("qutudakiSiqaret").value);
  const muddet = document.getElementById("muddet").value;

  // Boş və ya səhv dəyərləri yoxla
  if (!gunlukSiqaret || !qutuQiymeti || !qutudakiSiqaret) {
    alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin.");
    return;
  }

  // Günlük xərc hesabla
  const gunlukXerc = (gunlukSiqaret * qutuQiymeti) / qutudakiSiqaret;

  // Müddətə uyğun xərci hesabla
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

  // Nəticəni göstər
  document.getElementById("umumiXerc").textContent = 
    `Seçilmiş müddət üçün ümumi xərc: ${umumiXerc.toFixed(2)} AZN`;
});
