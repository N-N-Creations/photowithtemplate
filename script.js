document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const templateImage = document.getElementById('templateImage');
                canvas.width = templateImage.width;
                canvas.height = templateImage.height;
                ctx.drawImage(templateImage, 0, 0);
                // Adjust the coordinates and size as needed
                ctx.drawImage(imageInput, 50, 50, 100, 100);
                document.getElementById('templateContainer').style.display = 'block';
            };
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    html2canvas(canvas).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'image_with_template.png';
        link.click();
    });
});
