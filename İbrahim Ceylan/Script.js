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




const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
const fileListDiv = document.getElementById("fileList"); // Dosya listesinin olduğu div
let files = []; // Yüklenen dosyaların tutulacağı dizi

button.onclick = () => {
    input.click(); // Butona tıklayınca dosya seçimi açılır
}

input.addEventListener("change", function() {
    addFiles(Array.from(this.files)); // Yeni dosyaları ekle
    dropArea.classList.add("active");
});

// Dosya alanına sürükleme işlemi
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); // Varsayılan davranışı engelle
    dropArea.classList.add("active");
    dragText.textContent = "Bırakmak için serbest bırakın"; // Mesaj değiştir
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Dosyayı Yüklemek için Sürükleyin ve Bırakın"; // Mesajı geri al
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); // Varsayılan davranışı engelle
    addFiles(Array.from(event.dataTransfer.files)); // Yeni dosyaları ekle
    dropArea.classList.add("active");
});

function addFiles(newFiles) {
    files.push(...newFiles); // Yeni dosyaları mevcut dosyalara ekle
    showFiles(); // Güncellenmiş dosya listesini göster
}

function removeFile(index) {
    files.splice(index, 1); // Belirtilen indeksteki dosyayı sil
    showFiles(); // Güncellenmiş dosya listesini göster
}

function getIconForFileType(file) {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
        return '<i class="fas fa-file-image"></i>'; // Resim ikonu
    } else if (fileType.startsWith("application/pdf")) {
        return '<i class="fas fa-file-pdf"></i>'; // PDF ikonu
    } else if (fileType.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        return '<i class="fas fa-file-word"></i>'; // Word ikonu
    } else if (fileType.startsWith("application/vnd.ms-excel")) {
        return '<i class="fas fa-file-excel"></i>'; // Excel ikonu
    } else {
        return '<i class="fas fa-file"></i>'; // Genel dosya ikonu
    }
}
function openFile(file) {
    const fileURL = URL.createObjectURL(file); // Dosya için geçici bir URL oluştur
    const iframeViewer = document.getElementById("iframeViewer");
    const fileViewer = document.getElementById("fileViewer");
    
    iframeViewer.src = fileURL; // İframe kaynağını dosya URL'sine ayarla
    fileViewer.style.display = "block"; // Dosya görüntüleyicisini göster
}

// Dosya görüntüleyicisini kapatma işlevi (isteğe bağlı)
fileViewer.onclick = function() {
    fileViewer.style.display = "none"; // Tıklayınca gizle
};

function showFiles() {
    fileListDiv.innerHTML = ''; // Önceki dosya listesini temizle
    files.forEach((file, index) => {
        let fileItem = document.createElement('div'); // Yeni bir <div> elementi oluştur
        fileItem.classList.add('file-item');
        fileItem.innerHTML = `
            <div onclick="openFile(files[${index}])" style="cursor: pointer; display: flex; align-items: center;">
                ${getIconForFileType(file)} <p style="margin-left: 10px;">${file.name}</p>
            </div>
            <button class="remove-btn" onclick="removeFile(${index})">X</button>
        `; // İkon, dosya ismi ve silme butonu
        fileListDiv.appendChild(fileItem); // <div> elementini fileList div'ine ekle
    });
    
    
    
    // Liste görünürlüğünü ayarla
    if (files.length === 0) {
        fileListDiv.classList.remove('visible'); // Listeyi gizle
    } else {
        fileListDiv.classList.add('visible'); // Listeyi göster
    }
}
fileListDiv.classList.remove('visible');

/*-----------------*/





