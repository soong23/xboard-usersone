// API地址
window.routerBase = 'https://occultumvpn.com/'
window.settings = {
  title: 'Occultum',
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
  // 调试路径
  console.log('Current Path:', window.location.pathname, window.location.hash);

  // 动态设置 logo 根据路径
  if (window.location.hash.includes('dashboard') || window.location.pathname.includes('dashboard')) {
    window.settings.logo = '/app/assets/images/admin-logo.webp'; // 后台页面 logo
  } else {
    window.settings.logo = '/app/assets/images/occultum-logo.webp'; // 其他页面 logo
  }
  console.log('Selected Logo:', window.settings.logo);

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
        const logoImg = document.querySelector(`img[src*="${window.settings.logo}"]`) ||
                        document.querySelector('.text-center img') ||
                        document.querySelector('.mb-1em.max-w-100%.max-w-full') ||
                        document.querySelector('img');
        if (logoImg && logoImg.src !== window.settings.logo) {
          console.log('Logo changed by Xboard, updating to:', window.settings.logo);
          logoImg.src = window.settings.logo;
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
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('unload', () => observer.disconnect());

  // 更新 Logo 的链接和样式的函数
  function updateLogo() {
    const logoImg = document.querySelector(`img[src*="${window.settings.logo}"]`) ||
                    document.querySelector('.text-center img') ||
                    document.querySelector('.mb-1em.max-w-100%.max-w-full') ||
                    document.querySelector('img');
    if (logoImg) {
      console.log('Found Logo Element:', logoImg);
      logoImg.src = window.settings.logo;
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
    } else {
      console.error('Logo element not found');
    }
  }
});
