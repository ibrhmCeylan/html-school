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



document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.querySelector(".drag-area"),
          dragText = dropArea.querySelector("header"),
          button = dropArea.querySelector("button"),
          input = dropArea.querySelector("input");

    const fileListDiv = document.getElementById("fileList");
    const fileViewer = document.getElementById("fileViewer");
    const iframeViewer = document.getElementById("iframeViewer");
    const closeButton = document.getElementById("closeButton");

    let files = [];

    button.onclick = () => {
        input.click();
    };

    input.addEventListener("change", function() {
        addFiles(Array.from(this.files));
        dropArea.classList.add("active");
    });

    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Bırakmak için serbest bırakın";
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Dosyayı Yüklemek için Sürükleyin ve Bırakın";
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        addFiles(Array.from(event.dataTransfer.files));
        dropArea.classList.add("active");
    });

    function addFiles(newFiles) {
        files.push(...newFiles);
        showFiles();
    }

    function removeFile(index) {
        files.splice(index, 1);
        showFiles();
    }

    function getIconForFileType(file) {
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
            return '<i class="fas fa-file"></i>';
        }
    }

    function openFile(file) {
        const fileURL = URL.createObjectURL(file);
        iframeViewer.src = fileURL;  // İframe'i güncelle
        fileViewer.style.display = "block";  // Dosya görüntüleyicisini göster
    }

    function showFiles() {
        fileListDiv.innerHTML = '';  // Dosya listesini temizle

        files.forEach((file, index) => {
            let fileItem = document.createElement('div');
            fileItem.classList.add('file-item');
            
            fileItem.innerHTML = `
                <div style="cursor: pointer; display: flex; align-items: center;">
                    ${getIconForFileType(file)} <p style="margin-left: 10px;">${file.name}</p>
                </div>
                <button class="remove-btn">X</button>
            `;

            // Dosya açma işlevini dinamik olarak ekle
            fileItem.querySelector('div').addEventListener('click', () => openFile(file));

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
    closeButton.addEventListener('click', function() {
        fileViewer.style.display = "none";
    });

});