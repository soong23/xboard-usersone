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

        // 绑定发送验证码按钮
        const sendButton = document.querySelector('button:not([disabled])[type="button"]');
        if (sendButton && sendButton.textContent.includes('发送') && !sendButton.dataset.recaptchaBound) {
          console.log('Found Send Button:', sendButton);
          sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Send Button Clicked');
            const form = sendButton.closest('form');
            if (form) {
              const tokenInput = form.querySelector('textarea[name="recaptcha-response"]');
              if (tokenInput) {
                console.log('reCAPTCHA Token from textarea:', tokenInput.value);
                if (!tokenInput.value) {
                  console.warn('reCAPTCHA token is empty, triggering manual verification if needed');
                  // 如果 token 为空，尝试触发 Xboard 的 reCAPTCHA
                  const recaptchaWidget = form.querySelector('.g-recaptcha');
                  if (recaptchaWidget) {
                    // 依赖 Xboard 内置逻辑
                    sendButton.click(); // 再次触发以确保验证
                  }
                } else {
                  // 直接提交表单
                  sendButton.click();
                }
              } else {
                console.error('recaptcha-response textarea not found');
              }
            } else {
              console.error('Form not found');
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
      link.appendChild(logoImg);
      logoImg.style.maxWidth = '80%';
      logoImg.style.height = 'auto';
    }
  }
});
