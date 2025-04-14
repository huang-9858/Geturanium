// ==UserScript==
// @name         自动点击测试脚本
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  测试自动点击脚本是否正常工作 + 每9分钟强制刷新页面
// @author       You
// @match        https://www.geturanium.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    console.log('🚀 自动点击脚本已启动');

    // 配置选择器列表
    const selectors = [
        'div.jsx-9a17ad92cb35f0c.flex.items-start.gap-3',
        'div.jsx-9a17ad92cb35f0c.flex.items-start.gap-3',
        'div.jsx-9a17ad92cb35f0c.flex.items-start.gap-3'
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
                console.log('✅ 点击了按钮:', el);
            } catch (e) {
                console.error('⚠️ 点击失败:', e.message);
            }
        }
    }

    // 检测并点击符合条件的元素
    function scanElements() {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                enhancedClick(el);
            });
        });
    }

    // 定时扫描并点击
    setInterval(scanElements, 1000);  // 每隔1秒扫描一次页面
    console.log('⏱️ 每1秒扫描一次页面');

    // 每9分钟刷新页面（模拟 Ctrl+F5 的效果）
    setTimeout(() => {
        console.log('🔁 已运行9分钟，开始刷新页面...');
        location.href = location.origin + location.pathname + '?refresh=' + Date.now();  // 加参数防缓存
    }, 3 * 60 * 1000);  // 3分钟 = 180000ms
})();
