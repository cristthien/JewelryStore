document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const passwordWeek = document.getElementById('password-week');
    const loginAccountBtn = document.getElementById('login-account-btn');

    if (passwordInput !== null) {
        passwordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            if (password.length < 8 || !validatePassword(password)) {
                passwordError.style.display = 'block';
                loginAccountBtn.disabled = true;
                passwordWeek.style.display = 'none';
            } else {
                passwordError.style.display = 'none';
                loginAccountBtn.disabled = false;
                if(checkWeekPassword(password)) {
                    passwordWeek.style.display = 'block';
                } else {
                    passwordWeek.style.display = 'none';
                }
            }
        });
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