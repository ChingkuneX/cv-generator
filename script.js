document.getElementById("cv-form").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("cv-nama").textContent = document.getElementById("nama").value;
  document.getElementById("cv-jabatan").textContent = document.getElementById("jabatan").value;
  document.getElementById("cv-kontak").textContent =
    document.getElementById("lokasi").value + " | " +
    document.getElementById("email").value + " | " +
    document.getElementById("telepon").value + " | " +
    document.getElementById("linkedin").value;
  document.getElementById("cv-profil").textContent = document.getElementById("profil").value;

  const skills = document.getElementById("skill").value.split(",");
  const skillList = document.getElementById("cv-skill");
  skillList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillList.appendChild(li);
  });

  document.getElementById("cv-pengalaman").textContent = document.getElementById("pengalaman").value;
  document.getElementById("cv-pendidikan").textContent = document.getElementById("pendidikan").value;
  document.getElementById("cv-projek").textContent = document.getElementById("projek").value;
  document.getElementById("cv-sertifikat").textContent = document.getElementById("sertifikat").value;

  const foto = document.getElementById("foto").files[0];
  if (foto) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("cv-foto").src = e.target.result;
    };
    reader.readAsDataURL(foto);
  } else {
    document.getElementById("cv-foto").src = "";
  }

  // Tampilkan hasil
  document.getElementById("cv-output").style.display = "block";

  // Terapkan tema
  const theme = document.getElementById("theme-select").value;
  document.body.className = theme === "dark" ? "dark" : "";

  // Terapkan template
  const template = document.getElementById("template-select").value;
  const output = document.getElementById("cv-output");
  output.classList.remove("template1", "template2");
  output.classList.add(template);
});

// Tombol download PDF

document.getElementById("downloadBtn").addEventListener("click", function () {
  const element = document.getElementById("cv-output");

  // Pastikan elemen terlihat
  element.classList.remove("hidden");
  window.scrollTo(0, 0);

  setTimeout(() => {
    html2pdf().set({
      margin: 0.5,
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    }).from(element).save();
  }, 500);
});


  // Buat clone dengan ukuran yang cocok untuk PDF
  const clone = element.cloneNode(true);
  clone.style.display = "block";
  clone.style.position = "fixed";
  clone.style.top = "0";
  clone.style.left = "0";
  clone.style.zIndex = "-1";
  document.body.appendChild(clone);

  html2pdf().set({
    margin: 0.5,
    filename: "cv.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  })
    .from(clone)
    .save()
    .then(() => document.body.removeChild(clone));
});

// Tombol cetak
document.getElementById("printBtn").addEventListener("click", function () {
  window.print();
});
