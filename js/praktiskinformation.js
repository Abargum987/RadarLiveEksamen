<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.post-input');
    const characterCount = document.querySelector('.character-count');
    const buttons = document.querySelectorAll('.social-button');
    const videoUpload = document.querySelector('.video-upload');
    const videoInput = document.querySelector('#video-input');
    const videoPreview = document.querySelector('.video-preview');
    let videoFile = null;

    textarea.addEventListener('input', function() {
        const length = this.value.length;
        characterCount.textContent = `${length} / 280 characters`;
        
        if (length > 280) {
            characterCount.style.color = 'red';
        } else {
            characterCount.style.color = '#6b7280';
        }
    });

    videoUpload.addEventListener('click', () => {
        videoInput.click();
    });

    videoUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        videoUpload.style.borderColor = '#1da1f2';
    });

    videoUpload.addEventListener('dragleave', () => {
        videoUpload.style.borderColor = '#e5e7eb';
    });

    videoUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        videoUpload.style.borderColor = '#e5e7eb';
        handleVideoFile(e.dataTransfer.files[0]);
    });

    videoInput.addEventListener('change', (e) => {
        handleVideoFile(e.target.files[0]);
    });

    function handleVideoFile(file) {
        if (file && file.type.startsWith('video/')) {
            if (file.size > 100 * 1024 * 1024) { // 100MB limit
                alert('Video file is too large. Maximum size is 100MB.');
                return;
            }
            videoFile = file;
            videoPreview.style.display = 'block';
            videoPreview.src = URL.createObjectURL(file);
            videoUpload.innerHTML = `<p>Video selected: ${file.name}</p>
                                   <p class="file-info">Click to change video</p>`;
        } else {
            alert('Please select a valid video file.');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const text = textarea.value;
            if (!text && !videoFile) {
                alert('Please enter some text or upload a video to share!');
                return;
            }

            let shareUrl = '';
            const encodedText = encodeURIComponent(text);

            if (this.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`;
            } else if (this.classList.contains('instagram')) {
                // Note: Instagram doesn't have a direct sharing API
                alert('To share on Instagram, please use the Instagram app to upload your content.');
                return;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
            
            this.classList.add('shared');
            setTimeout(() => {
                this.classList.remove('shared');
            }, 500);
        });
    });
});