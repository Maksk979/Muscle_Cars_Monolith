document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    if (slider) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlide(n) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[n].style.display = 'block';
        }

        if (slides.length > 0) {
            showSlide(currentSlide);
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 3000);
        }
    }

    const scrollButton = document.getElementById('scrollTopBtn');
    if (scrollButton) {
        window.addEventListener('scroll', () => {
            scrollButton.style.display = window.pageYOffset > 500 ? 'flex' : 'none';
        });
    }

    const modals = {
        auth: document.getElementById('authModal'),
        feedback: document.getElementById('feedbackModal')
    };

    const toggleModal = (modalName, show) => {
        const modal = modals[modalName];
        if (modal) {
            modal.style.display = show ? 'block' : 'none';
            document.body.style.overflow = show ? 'hidden' : 'auto';
        }
    };

    //обработчики открытия
    document.querySelector('.auth-button')?.addEventListener('click', () => {
        toggleModal('auth', true);
        document.querySelector('[data-tab="login"]').click();
    });

    document.querySelector('.feedback-button')?.addEventListener('click', () => {
        toggleModal('feedback', true);
    });

    //закрытие по клику вне модалки
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            toggleModal('auth', false);
        }
        if (e.target.classList.contains('feedback-modal')) {
            toggleModal('feedback', false);
        }
    });

    //закрытие по кнопке
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            Object.keys(modals).forEach(modal => toggleModal(modal, false));
        });
    });

    const validatePassword = (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasCyrillic = /[а-яА-ЯёЁ]/.test(value);
        const isLengthValid = value.length >= 8;

        return {
            valid: hasUpperCase && !hasCyrillic && isLengthValid,
            errors: {
                noUpper: !hasUpperCase,
                hasCyrillic: hasCyrillic,
                short: !isLengthValid
            }
        };
    };

    const showError = (input, message) => {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        input.classList.add('invalid');
    };

    const clearError = (input) => {
        input.classList.remove('invalid');
        input.nextElementSibling.textContent = '';
    };

    const validateEmail = async (email) => {
        const apiKey = '4d2a764b2efd7884557c16f45dd42964'; 
        const url = `http://apilayer.net/api/check?access_key=${apiKey}&email=${email}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            console.log('Ответ от сервиса:', data);
    
            if (data.format_valid && data.smtp_check) {
                return true; 
            } else {
                return false; 
            }
        } catch (error) {
            console.error('Ошибка при проверке email:', error);
            return false;
        }
    };

    const validateAuthForm = async (form) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input');

        for (const input of inputs) {
            clearError(input);

            if (input.type === 'password') {
                const result = validatePassword(input.value);

                if (!result.valid) {
                    isValid = false;
                    let errorMsg = '';

                    if (result.errors.hasCyrillic) {
                        errorMsg = 'Не используйте русские буквы';
                    } else if (result.errors.noUpper) {
                        errorMsg = 'Добавьте заглавную букву';
                    } else if (result.errors.short) {
                        errorMsg = 'Минимум 8 символов';
                    }

                    showError(input, errorMsg);
                }
            }

            if (input.id === 'confirmPassword' &&
                input.value !== form.querySelector('#regPassword').value) {
                showError(input, 'Пароли не совпадают');
                isValid = false;
            }

            if (input.type === 'email' && input.value) {
                const emailValid = await validateEmail(input.value);
                if (!emailValid) {
                    showError(input, 'Email не существует или недоступен');
                    isValid = false;
                }
            }

            // Общая валидация
            if (!input.checkValidity()) {
                showError(input, input.validationMessage);
                isValid = false;
            }
        }

        return isValid;
    };

    const validateFeedbackForm = (form) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            clearError(input);

            if (!input.checkValidity()) {
                showError(input, input.validationMessage);
                isValid = false;
            }
        });

        return isValid;
    };

    // ================ Отправка форм ================
    document.getElementById('feedbackForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateFeedbackForm(e.target)) return;

        const BOT_TOKEN = '7521125711:AAEjddXyGq5DKhLWbL3xAEQ2qp-65OeYRss';
        const CHAT_ID = '587309404';
        const formData = new FormData(e.target);

        const text = `📨 Новое сообщение:
            Имя: ${formData.get('name')}
            Email: ${formData.get('email')}
            Сообщение: ${formData.get('message')}
        `;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: text,
                        parse_mode: 'HTML'
                    })
                }
            );

            if (response.ok) {
                alert('Сообщение успешно отправлено!');
                toggleModal('feedback', false);
                e.target.reset();
            } else {
                alert('Ошибка при отправке. Попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка соединения');
        }
    });

    document.querySelectorAll('#loginForm, #registerForm').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (await validateAuthForm(this)) {
                alert('Форма успешно отправлена!');
                this.reset();
                toggleModal('auth', false);
            }
        });
    });

    // ============ Динамическая валидация ============
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);

            if (this.form.id === 'feedbackForm') {
                validateFeedbackForm(this.form);
            } else {
                validateAuthForm(this.form);
            }
        });
    });

    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabName = this.dataset.tab;
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.toggle('active', form.id === `${tabName}Form`);
            });
        });
    });
});

