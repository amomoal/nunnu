

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

