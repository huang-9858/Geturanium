// ==UserScript==
// @name         自动点击测试脚本
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  测试自动点击脚本是否正常工作 + 每9分钟强制刷新页面
// @author       You
// @match        https://www.geturanium.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    console.log('🚀 自动点击脚本已启动');

    // 配置选择器列表（针对三个按钮）
    const selectors = [
        'div.jsx-1ed07a9633bde62a.flex.items-start.gap-3',
        'div.jsx-1ed07a9633bde62a.flex.items-start.gap-3',
        'div.jsx-1ed07a9633bde62a.flex.items-start.gap-3'
    ];

    // 执行点击的逻辑
    function enhancedClick(el) {
        if (el) {
            try {
                ['mousedown', 'click', 'mouseup'].forEach(eventType => {
                    el.dispatchEvent(new MouseEvent(eventType, {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    }));
                });
                console.log('✅ 点击了按钮:', el.textContent.trim());
            } catch (e) {
                console.error('⚠️ 点击失败:', e.message);
            }
        }
    }

    // 检测并点击符合条件的元素
    function scanElements() {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            console.log(`🔍 选择器 ${selector} 找到 ${elements.length} 个元素`);
            elements.forEach(el => {
                enhancedClick(el);
            });
        });
    }

    // 定时扫描并点击
    setInterval(scanElements, 1000); // 每秒扫描
    console.log('⏱️ 每1秒扫描一次页面');

    // 监控 DOM 变化
    const observer = new MutationObserver(scanElements);
    observer.observe(document.body, { childList: true, subtree: true });
    console.log('👀 已启动 DOM 变化监控');

    // 每9分钟刷新页面
    setTimeout(() => {
        console.log('🔁 已运行9分钟，开始刷新页面...');
        location.href = location.origin + location.pathname + '?refresh=' + Date.now();
    }, 9 * 60 * 1000); // 9分钟
})();
