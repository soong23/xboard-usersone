// API地址
window.routerBase = 'https://occultumvpn.com/'
window.settings = {
  title: '',
  description: '高速 安全 可靠',
  assets_path: '/assets',
  theme: {
    color: 'default',
  },
  version: '0.1.1-dev',
  background_url: '/app/assets/images/global-internet.webp',
  logo: '/app/assets/images/occultum-logo.webp',
}

document.addEventListener('DOMContentLoaded', () => {
  // 背景效果
  document.body.style.background = `url(${window.settings.background_url}) no-repeat center center fixed`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.position = 'relative';
  document.body.style.minHeight = '100vh';
  const before = document.createElement('div');
  before.style.position = 'fixed';
  before.style.top = '0';
  before.style.left = '0';
  before.style.width = '100%';
  before.style.height = '100%';
  before.style.background = 'inherit';
  before.style.filter = 'blur(3px) brightness(0.8)';
  before.style.zIndex = '-1';
  document.body.appendChild(before);

  // 为 Logo 添加首页链接和样式
  updateLogo();

  // 监控 DOM 变化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        const logoImg = document.querySelector('.text-center img[src*="/app/assets/images/occultum-logo.webp"]') ||
                        document.querySelector('.mb-1em.max-w-100%.max-w-full');
        if (logoImg && (!logoImg.parentElement.href || logoImg.style.maxWidth !== '80%')) {
          updateLogo();
        }

        // 检查 Xboard 是否已有 reCAPTCHA
        const existingRecaptcha = document.querySelector('.g-recaptcha');
        if (!existingRecaptcha) {
          // 如果 Xboard 未添加，则动态添加
          const registerForm = document.querySelector('form');
          if (registerForm && !document.querySelector('.g-recaptcha')) {
            const recaptchaDiv = document.createElement('div');
            recaptchaDiv.className = 'g-recaptcha';
            recaptchaDiv.setAttribute('data-sitekey', '6Le6QviAAAAAL9a_LiHYFBm1rry20K5uB');
            recaptchaDiv.setAttribute('data-size', 'invisible');
            recaptchaDiv.setAttribute('data-callback', 'onSubmit');
            registerForm.appendChild(recaptchaDiv);
          }
        }

        // 绑定发送验证码按钮
        const sendButton = document.querySelector('button:not([disabled])[type="button"]');
        if (sendButton && sendButton.textContent.includes('发送') && !sendButton.dataset.recaptchaBound) {
          console.log('Found Send Button:', sendButton);
          sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Send Button Clicked, Executing reCAPTCHA');
            if (typeof grecaptcha !== 'undefined') {
              // 确保 grecaptcha 已加载
              grecaptcha.ready(() => {
                grecaptcha.execute('6Le6QviAAAAAL9a_LiHYFBm1rry20K5uB', { action: 'submit' }).then((token) => {
                  console.log('reCAPTCHA Token:', token); // 直接处理 token
                  const form = sendButton.closest('form');
                  if (form) {
                    let tokenInput = form.querySelector('textarea[name="recaptcha-response"]');
                    if (tokenInput) {
                      tokenInput.value = token;
                      tokenInput.style.display = 'none';
                      console.log('Token set in textarea:', tokenInput.value);
                      // 触发 Xboard 原生逻辑
                      sendButton.click();
                    } else {
                      console.error('recaptcha-response textarea not found');
                    }
                  } else {
                    console.error('Form not found');
                  }
                }).catch((error) => {
                  console.error('reCAPTCHA Execute Error:', error);
                });
              });
            } else {
              console.error('reCAPTCHA not loaded');
            }
          });
          sendButton.dataset.recaptchaBound = 'true';
        }
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('unload', () => observer.disconnect());

  // 更新 Logo 的链接和样式的函数
  function updateLogo() {
    const logoImg = document.querySelector('.text-center img[src*="/app/assets/images/occultum-logo.webp"]') ||
                    document.querySelector('.mb-1em.max-w-100%.max-w-full');
    if (logoImg) {
      const parent = logoImg.parentElement;
      if (parent.tagName === 'A') {
        parent.replaceWith(logoImg);
      }
      const link = document.createElement('a');
      link.href = 'https://shop.occultumvpn.com/';
      link.style.display = 'inline-block';
      logoImg.parentNode.insertBefore(link, logoImg);
      link.appendChild(link);
      logoImg.style.maxWidth = '80%';
      logoImg.style.height = 'auto';
    }
  }
});
