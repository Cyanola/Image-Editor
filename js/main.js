    const fileInput = document.getElementById('file-upload');
    const uploadBox = document.getElementById('uploadBox');
    const imagePreview = document.getElementById('imagePreview');
    const uploadedImage = document.getElementById('uploadedImage');
    const uploadLabel = document.getElementById('uploadLabel');
    const uploadButton = document.getElementById('uploadButton');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const tryagainspan = document.getElementById('tryagainspan');
const buttonContainer=document.getElementsByClassName('button-container')[0];
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('drag-over');
        uploadBox.style.border="solid blue"; 
        uploadBox.style.backgroundColor="#d6d6d6";
        uploadButton.classList.add('drag-over');  // Change button color to blue
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('drag-over');
        uploadButton.classList.remove('drag-over'); 
        uploadBox.style.borderColor = "#e9e9e9";  
        uploadBox.style.border="dashed";
        uploadBox.style.backgroundColor="#fff"; // Reset button color
    });
    function resetUpload() {
            uploadLabel.classList.remove('error');
        uploadLabel.innerHTML = `<span style="color:black;">Drop file to upload<br>or select file</span><br><br><small>5 MB Max, JPEG, PNG, GIF, SVG</small>`;
     
        tryAgainBtn.style.display = 'none';
        tryagainspan.style.display='none';
        uploadButton.style.display = 'flex';
        fileInput.value = '';
        uploadBox.style.backgroundColor = "#fff";
    }


    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        uploadBox.style.border="none";
        handleFileUpload(file);
        uploadBox.classList.remove('drag-over');
        uploadButton.classList.remove('drag-over');  // Reset button color
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFileUpload(file);
    });
    tryAgainBtn.addEventListener('click', () => {
  resetUpload(); // Trigger file input when clicking the button
    });
    uploadButton.addEventListener('click', () => {
        fileInput.click();  // Trigger file input when clicking the button
    });

    // Function to handle the file upload and image preview
    function handleFileUpload(file) {
        if (!file) {
        displayError("No file selected");
        return;
    }
        if (file.size > 5 * 1024 * 1024) {
            displayError("File size exceeds 5MB!");
    
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            displayError("Invalid file type");
            return;
        }
        function displayError(message) {
            if (fileInput.files.length > 0) {
        // Only access file name if files are present
        uploadLabel.innerHTML = `<span style="color:red;">${message}</span><br><br><small>File name ${fileInput.files[0].name}</small>`;
    } else {
        // If no files are present, just show the message
        uploadLabel.innerHTML = `<span style="color:red;"><span style="color:transparent; width:100px;">s</span>${message}</span><br><br><small>No file uploaded</small><br>`;
    }   uploadLabel.classList.add('error');
    tryagainspan.style.display='inline-block';
        tryAgainBtn.style.display = 'flex';
        tryAgainBtn.style.justifyContent = 'center'; 
        uploadButton.style.display = 'none';
        uploadBox.style.backgroundColor = "#fff";
    }
    const fileName = file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            imagePreview.style.display = 'flex';  // Show the image preview container
            uploadLabel.style.display = 'none';   // Hide the upload label
            uploadButton.style.display = 'none';  // Hide the button

            // Change background to gray when the image is uploaded
            uploadBox.style.backgroundColor = "#555";

            // Adjust container size and border radius based on image dimensions
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const width = img.width;
                const height = img.height;

                // Calculate aspect ratio
                const aspectRatio = width / height;

                // Set max and min container dimensions
                let maxWidth = 500;
                let maxHeight = 400;
                let minWidth = 200;
                let minHeight = 150;

                // Set the new container width and height based on image dimensions
                let newWidth = width;
                let newHeight = height;

                // Adjust the width and height based on aspect ratio
                if (width > height) {
                    newWidth = Math.min(maxWidth, width);
                    newHeight = newWidth / aspectRatio;
                } else {
                    newHeight = Math.min(maxHeight, height);
                    newWidth = newHeight * aspectRatio;
                }

                // Ensure the container doesn't get too small
                if (newWidth < minWidth) {
                    newWidth = minWidth;
                    newHeight = newWidth / aspectRatio;
                }
                if (newHeight < minHeight) {
                    newHeight = minHeight;
                    newWidth = newHeight * aspectRatio;
                }

                // Apply the new width and height to the container
                uploadBox.style.width = `${newWidth}px`;
                uploadBox.style.height = `${newHeight}px`;
     
                const rect = uploadBox.getBoundingClientRect();
 
                const buttonContainerHeight = buttonContainer.offsetHeight;


                uploadBox.style.marginTop="50px";
          
// Получаем координаты и размеры uploadBox относительно документа


// Получаем высоту и ширину окна
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Получаем размеры и текущую позицию buttonContainer
const buttonRect = buttonContainer.getBoundingClientRect();

// Устанавливаем buttonContainer над uploadBox с использованием процентов
buttonContainer.style.position = 'absolute';

// Позиционируем выше на высоту buttonContainer + 10% для адаптивности
buttonContainer.style.top = `${(rect.top / windowHeight) * 100 - (buttonRect.height / windowHeight) * 100 -14}%`;

// Позиционируем относительно ширины экрана и добавляем сдвиг вправо на 5%
buttonContainer.style.left = `${(rect.left / windowWidth) * 100}%`;

// Задаем ширину контейнера кнопок в процентах для адаптации под экран
buttonContainer.style.width = `${(rect.width / windowWidth) * 100}%`;



                      
                            // Создаем HTML-код для кнопок
                            let buttonsHTML = `
                            <Label style="color:black" id="myLabel">${fileName}</Label>
                                <button class="btn" id="rebut" style="  background-color:transparent; width:25px;height:25px;" onclick="buttonClicked(1)">
                                <img src="css/images/re.png" width=25px height=25px alt="Заменить изображение">
                                </button>
                                <button class="btn" style=" background-color:transparent;width:25px;height:25px;" id="editbutton" onclick="buttonClicked(2)">
                                  <img src="css/images/edit.png" width=25px height=25px alt="Редактировать изображение">
                                  </button>
                                <button class="btn" style=" background-color:transparent; width:25px;height:25px;" id="deletebutton" onclick="buttonClicked(3)">
                              <img src="css/images/del.png" width=25px height=25px alt="Удалить изображение">
                                  </button>
                            `;
                
                            // Вставляем HTML-код в контейнер
                            document.getElementsByClassName('button-container')[0].innerHTML = buttonsHTML;
                              
                

                // Adjust border radius based on aspect ratio
                if (width > height) {
                    // Landscape images - smaller border radius
                    uploadBox.style.borderRadius = '10px';
                } else if (width < height) {
                    // Portrait images - larger border radius
                    uploadBox.style.borderRadius = '25px';
                } else {
                    // Square images - circular border
                    uploadBox.style.borderRadius = '50%';
                }

                const editButton = document.getElementById('editbutton');

                editButton.addEventListener('click', () => {
                  // Replace the existing image preview with an image editing interface
                  // For example, you could use a third-party library like Konva.js or Fabric.js
                  // to provide image editing capabilities.
                  const imagePreview = document.getElementById('imagePreview');

                  // Hide the current image preview
                  uploadedImage.style.display = 'none';
                
                  // Create a new editable image element
                  const editableImage = document.createElement('img');
                  editableImage.src = uploadedImage.src;
                  editableImage.style.display = 'block';
                  editableImage.style.maxWidth = '100%';
                  editableImage.style.maxHeight = '100%';
                  editableImage.contentEditable = true;  // Enable basic inline editing

                  // Replace the image preview with the editable image
                  imagePreview.innerHTML = '';  // Clear the preview container
                  imagePreview.appendChild(editableImage);
                  console.log('Edit button clicked! Implement image editing functionality here.');  
                });

            };
        };
        reader.readAsDataURL(file);
    }
