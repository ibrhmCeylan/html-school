window.addEventListener('load',fg_load)
function fg_load(){
    document.getElementById('loading').style.display='none'
}



function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.style.display = 'none');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).style.display = 'block';
    event.target.classList.add('active');
}

function scrollLeft() {
    const container = document.getElementById('tabButtons');
    container.scrollBy({ left: -100, behavior: 'smooth' }); // 100px sola kaydır
}

function scrollRight() {
    const container = document.getElementById('tabButtons');
    container.scrollBy({ left: 100, behavior: 'smooth' }); // 100px sağa kaydır
}

document.addEventListener('DOMContentLoaded', () => {
    openTab('tab1');
});
/*_______________________________________________________________*/


window.addEventListener('load', function fg_load() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none'; // `loading` varsa gizle
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.querySelector(".drag-area"),
          dragText = dropArea ? dropArea.querySelector("header") : null,
          button = dropArea ? dropArea.querySelector("button") : null,
          input = dropArea ? dropArea.querySelector("input") : null;

    const fileListDiv = document.getElementById("fileList");
    const fileViewer = document.getElementById("fileViewer");
    const iframeViewer = document.getElementById("iframeViewer");
    const closeButton = document.getElementById("closeButton");

    let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];  // localStorage'dan yüklenen dosyaları getir

    if (button) {
        button.onclick = () => input.click();
    }

    if (input) {
        input.addEventListener("change", function() {
            addFiles(Array.from(this.files));
            if (dropArea) dropArea.classList.add("active");
        });
    }

    if (dropArea) {
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropArea.classList.add("active");
            if (dragText) dragText.textContent = "Bırakmak için serbest bırakın";
        });

        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("active");
            if (dragText) dragText.textContent = "Dosyayı Yüklemek için Sürükleyin ve Bırakın";
        });

        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            addFiles(Array.from(event.dataTransfer.files));
            dropArea.classList.add("active");
        });
    }

    function addFiles(newFiles) {
        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                files.push({
                    name: file.name,
                    type: file.type,
                    content: e.target.result  // Dosya içeriğini Base64 formatında depola
                });
                saveFilesToLocalStorage();
                showFiles();
            };
            reader.readAsDataURL(file);  // Dosyayı Base64 formatına çevir
        });
    }

    function removeFile(index) {
        files.splice(index, 1);  // Dosyayı listeden kaldır
        saveFilesToLocalStorage();  // localStorage'ı güncelle
        showFiles();
    }

    function saveFilesToLocalStorage() {
        localStorage.setItem('uploadedFiles', JSON.stringify(files));  // Dosyaları localStorage'a kaydet
    }

    // Dosya türüne göre ikon gösterme
    function getIconForFileType(file) {
        if (!file || !file.type) {
            return '<i class="fas fa-file"></i>'; // Dosya ya da türü yoksa genel ikon göster
        }

        const fileType = file.type;
        if (fileType.startsWith("image/")) {
            return '<i class="fas fa-file-image"></i>';
        } else if (fileType.startsWith("application/pdf")) {
            return '<i class="fas fa-file-pdf"></i>';
        } else if (fileType.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            return '<i class="fas fa-file-word"></i>';
        } else if (fileType.startsWith("application/vnd.ms-excel")) {
            return '<i class="fas fa-file-excel"></i>';
        } else {
            return '<i class="fas fa-file"></i>'; // Genel dosya ikonu
        }
    }

    function showFiles() {
        fileListDiv.innerHTML = '';  // Dosya listesini temizle

        files.forEach((file, index) => {
            if (!file) return; // file tanımsızsa işlemi atla

            let fileItem = document.createElement('div');
            fileItem.classList.add('file-item');

            // Dosya indirme bağlantısını oluştur
            fileItem.innerHTML = `
                <a href="${file.content}" download="${file.name}" style="display: flex; align-items: center;">
                    ${getIconForFileType(file)} <p style="margin-left: 10px;">${file.name}</p>
                </a>
                <button class="remove-btn">X</button>
            `;

            // Dosya silme işlevi
            fileItem.querySelector('.remove-btn').addEventListener('click', () => removeFile(index));

            fileListDiv.appendChild(fileItem);
        });

        // Dosya listesini göster/gizle
        if (files.length === 0) {
            fileListDiv.classList.remove('visible');
        } else {
            fileListDiv.classList.add('visible');
        }
    }

    // Kapatma butonuna tıklayınca dosya görüntüleyiciyi gizle
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            if (fileViewer) fileViewer.style.display = "none";
        });
    }

    // Sayfa yüklendiğinde dosyaları göster
    showFiles();
});     