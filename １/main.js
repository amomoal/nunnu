document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.particles-js');
    
    // 粒子を生成
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
});

// コピー機能を実装
document.getElementById('copyButton').addEventListener('click', () => {
    const textBox = document.getElementById('textBox');
    textBox.select(); // テキストを選択
    textBox.setSelectionRange(0, 99999); // モバイル対応の選択範囲設定

    try {
        document.execCommand('copy'); // テキストをクリップボードにコピー
        alert('コピーしました: ' + textBox.value);
    } catch (error) {
        alert('コピーに失敗しました。');
    }
});

