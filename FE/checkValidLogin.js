document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const passwordWeek = document.getElementById('password-week');
    const loginAccountBtn = document.getElementById('login-account-btn');
    const updateButton = document.getElementById('update-password-btn');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (passwordInput !== null) {
        passwordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            if (password.length < 8 || !validatePassword(password)) {
                passwordError.style.display = 'block';
                if(loginAccountBtn){
                    loginAccountBtn.disabled = true;
                }
                if(updateButton){
                    updateButton.disabled = true;
                }
                passwordWeek.style.display = 'none';
            } else {
                passwordError.style.display = 'none';
                if(loginAccountBtn){
                    loginAccountBtn.disabled = false;
                }
                checkPasswords(); // Gọi hàm checkPasswords() mỗi khi có sự thay đổi trong passwordInput

                if(checkWeekPassword(password)) {
                    passwordWeek.style.display = 'block';
                } else {
                    passwordWeek.style.display = 'none';
                }
            }
        });
    }

    if (confirmPasswordInput !== null) {
        confirmPasswordInput.addEventListener('input', function() {
            checkPasswords(); // Gọi hàm checkPasswords() mỗi khi có sự thay đổi trong confirmPasswordInput
        });
    }

    function checkPasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password === confirmPassword) {
            updateButton.disabled = false;
        } else {
            updateButton.disabled = true;
        }
    }

    function checkWeekPassword(password) {
        if (!/[A-Z]/.test(password)) {
            return true;
        }
    }


    function validatePassword(password) {
        // Kiểm tra xem password có ít nhất một ký tự chữ không
        if (!/[a-zA-Z]/.test(password)) {
            return false;
        }
        // Kiểm tra xem password có ít nhất một ký tự đặc biệt không
        if (!/[\W_]/.test(password)) {
            return false;
        }
        // Kiểm tra xem password có chứa ký tự có dấu không
        if (/[áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/.test(password)) {
            return false;
        }
        // Kiểm tra xem password có chứa khoảng trắng không
        if (!/^\S*$/.test(password)) {
            return false;
        }
        return true;
    }
});