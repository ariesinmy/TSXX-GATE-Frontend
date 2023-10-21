## TSXX-GATE

![license](https://img.shields.io/badge/license-MIT-blue.svg)

> 新竹 X 梅竹黑客松: 黑客組 - 打造智慧安檢偵測與出勤資料視覺平台

## Quick start

- **Recommended** `Node.js v18.x`.
- **Install:** `yarn install`
- **Start:** `yarn dev`
- **Build:** `yarn build`

## Note
- 套件管理工具 + script 統一使用 yarn
- vite 專案的環境變數使用方法:
    - 在環境變數檔案 (比如 .env) 中添加 VITE_ 開頭的變數，例子:
    ```
    VITE_TEST_VARIABLE=test
    ```
    - 在專案中使用 `import.meta.env.VITE_TEST_VARIABLE`(return 'test') 進行讀取
    - 參考: https://vitejs.dev/guide/env-and-mode.html
