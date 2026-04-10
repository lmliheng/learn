(function () {
    'use strict';

    const Modal = {
        activeModal: null,

        open(id) {
            const modal = document.getElementById(id);
            if (!modal) return;

            this.close();
            modal.classList.add('active');
            this.activeModal = modal;

            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 300);
            }
        },

        close() {
            if (this.activeModal) {
                this.activeModal.classList.remove('active');
                this.activeModal = null;
            }
        },

        isOpen() {
            return this.activeModal !== null;
        }
    };

    const Toast = {
        show(message, type = 'info', duration = 3000) {
            const container = document.querySelector('.toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;

            const icons = {
                success: '✓',
                error: '✕',
                info: 'ℹ'
            };

            toast.innerHTML = `
                <div class="toast-icon">${icons[type]}</div>
                <div class="toast-message">${message}</div>
                <span class="toast-close">&times;</span>
            `;

            container.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 10);

            toast.querySelector('.toast-close').addEventListener('click', () => {
                this.hide(toast);
            });

            if (duration > 0) {
                setTimeout(() => this.hide(toast), duration);
            }
        },

        hide(toast) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        },

        success(msg) { this.show(msg, 'success'); },
        error(msg) { this.show(msg, 'error'); },
        info(msg) { this.show(msg, 'info'); }
    };

    const Select = {
        init() {
            document.querySelectorAll('.select-trigger').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    const wrapper = trigger.closest('.select-wrapper');
                    const wasActive = wrapper.classList.contains('active');

                    document.querySelectorAll('.select-wrapper.active').forEach(w => {
                        w.classList.remove('active');
                    });

                    if (!wasActive) {
                        wrapper.classList.add('active');
                    }
                });
            });

            document.querySelectorAll('.select-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const wrapper = option.closest('.select-wrapper');
                    const trigger = wrapper.querySelector('.select-trigger');
                    const display = trigger.querySelector('.select-value') || document.createElement('span');

                    if (!trigger.querySelector('.select-value')) {
                        display.className = 'select-value';
                        trigger.insertBefore(display, trigger.firstChild);
                    }

                    display.textContent = option.textContent;

                    wrapper.querySelectorAll('.select-option').forEach(o => {
                        o.classList.remove('selected');
                    });
                    option.classList.add('selected');

                    wrapper.classList.remove('active');
                });
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.select-wrapper')) {
                    document.querySelectorAll('.select-wrapper.active').forEach(w => {
                        w.classList.remove('active');
                    });
                }
            });
        }
    };

    const Accordion = {
        init() {
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.closest('.accordion-item');
                    const wasActive = item.classList.contains('active');

                    document.querySelectorAll('.accordion-item.active').forEach(i => {
                        i.classList.remove('active');
                    });

                    if (!wasActive) {
                        item.classList.add('active');
                    }
                });
            });
        }
    };

    const Tabs = {
        init() {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabs = btn.closest('.tabs');
                    const targetId = btn.dataset.tab;

                    tabs.querySelectorAll('.tab-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    btn.classList.add('active');

                    tabs.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });

                    const targetContent = tabs.querySelector(`#${targetId}`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }
    };

    const TagInput = {
        init() {
            document.querySelectorAll('.tag-input').forEach(input => {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        const value = input.value.trim().replace(',', '');
                        if (value) {
                            this.addTag(input, value);
                        }
                    }

                    if (e.key === 'Backspace' && !input.value) {
                        const wrapper = input.closest('.tag-input-wrapper');
                        const lastTag = wrapper.querySelector('.tag:last-child');
                        if (lastTag) {
                            lastTag.remove();
                        }
                    }
                });
            });
        },

        addTag(input, value) {
            const wrapper = input.closest('.tag-input-wrapper');
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `
                ${value}
                <span class="tag-close" data-tag="${value}">&times;</span>
            `;

            tag.querySelector('.tag-close').addEventListener('click', () => {
                tag.remove();
            });

            wrapper.insertBefore(tag, input);
            input.value = '';
        }
    };

    const Pagination = {
        init() {
            document.querySelectorAll('.page-item').forEach(page => {
                page.addEventListener('click', () => {
                    if (page.classList.contains('disabled') || page.classList.contains('active')) {
                        return;
                    }

                    const pagination = page.closest('.pagination');
                    pagination.querySelectorAll('.page-item').forEach(p => {
                        p.classList.remove('active');
                    });
                    page.classList.add('active');

                    console.log('Page:', page.textContent);
                });
            });
        }
    };

    const Actions = {
        init() {
            this.bindEvents();
            Select.init();
            Accordion.init();
            Tabs.init();
            TagInput.init();
            Pagination.init();
        },

        bindEvents() {
            document.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (e.target.classList.contains('modal') || e.target.classList.contains('modal-content')) {
                    if (e.target.classList.contains('modal')) {
                        Modal.close();
                    }
                }

                if (e.target.dataset.modal) {
                    Modal.open(e.target.dataset.modal);
                    return;
                }

                if (e.target.classList.contains('close') || e.target.dataset.close) {
                    const modalId = e.target.closest('.modal')?.id;
                    if (modalId) Modal.close();
                }

                if (e.target.classList.contains('btn-send-code')) {
                    this.handleSendCode(e.target);
                }

                if (e.target.classList.contains('tag-close')) {
                    e.target.closest('.tag')?.remove();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && Modal.isOpen()) {
                    Modal.close();
                }

                if (e.key === 'Enter' && Modal.isOpen()) {
                    const activeModal = Modal.activeModal;
                    const form = activeModal?.querySelector('form');
                    if (form) {
                        form.dispatchEvent(new Event('submit', { bubbles: true }));
                    }
                }
            });

            document.querySelectorAll('.switch-input').forEach(switchEl => {
                switchEl.addEventListener('change', (e) => {
                    console.log('Switch:', e.target.checked);
                });
            });

            document.querySelectorAll('.slider').forEach(slider => {
                slider.addEventListener('input', (e) => {
                    console.log('Slider value:', e.target.value);
                });
            });

            document.querySelectorAll('.modal form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFormSubmit(form);
                });
            });
        },

        handleSendCode(btn) {
            if (btn.disabled) return;

            let countdown = 60;
            btn.disabled = true;
            btn.textContent = `${countdown}s`;

            const timer = setInterval(() => {
                countdown--;
                btn.textContent = `${countdown}s`;

                if (countdown <= 0) {
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.textContent = '发送';
                }
            }, 1000);
        },

        handleFormSubmit(form) {
            const modal = form.closest('.modal');
            const modalId = modal?.id || 'unknown';

            const data = new FormData(form);
            const payload = Object.fromEntries(data.entries());

            console.log(`Form submitted from ${modalId}:`, payload);

            const action = modalId.includes('login') ? '登录' : '注册';
            Toast.success(`${action}成功！`);

            form.reset();
            Modal.close();
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        Actions.init();
    });

    window.openModal = Modal.open;
    window.closeModal = Modal.close;
    window.sendCode = () => {
        const btn = document.querySelector('.btn-send-code');
        if (btn) Actions.handleSendCode(btn);
    };
    window.showToast = Toast.show;
    window.Toast = Toast;

})();
