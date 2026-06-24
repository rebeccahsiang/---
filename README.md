# LINE 交通資料視覺化機器人

這是一個以 Node.js、Express 與 LINE Bot 建立的交通資料查詢專案。機器人會串接台北市開放資料，整理交通相關統計資訊，並透過 LINE Flex Message、圓餅圖、折線圖與表單頁面提供互動式瀏覽。

GitHub Repository: [rebeccahsiang/---](https://github.com/rebeccahsiang/---)

## 功能特色

- LINE Webhook 接收使用者訊息
- 使用 LINE Flex Message 回覆資料卡片
- 串接台北市開放資料 API 並轉換 CSV 資料
- 提供備援資料，避免外部 API 無回應時中斷服務
- 內建交通資料圓餅圖頁面
- 內建歷年資料折線圖頁面
- 提供簡易需求填寫表單頁面
- 使用 `.env` 管理 LINE Bot 金鑰

## 技術架構

- Node.js
- Express
- linebot
- Axios
- csvtojson
- Chart.js
- dotenv
- ESLint / Prettier

## 專案結構

```text
.
├── commands/
│   └── traffic.js          # LINE 交通資料指令回覆邏輯
├── public/
│   └── chart.png           # 圖表圖片資源
├── templates/
│   └── trafficCard.js      # LINE Flex Message 卡片模板
├── index.js                # Express 伺服器與 LINE Bot 主程式
├── package.json            # 專案套件與啟動指令
├── package-lock.json
└── eslint.config.js        # ESLint 設定
```

## 安裝方式

請先確認電腦已安裝 Node.js，建議使用 Node.js 18 或更新版本。

```bash
npm install
```

## 環境變數設定

請在專案根目錄建立 `.env` 檔案，並填入 LINE Developers 後台取得的資訊：

```env
CHANNEL_ID=你的_CHANNEL_ID
CHANNEL_SECRET=你的_CHANNEL_SECRET
CHANNEL_ACCESS_TOKEN=你的_CHANNEL_ACCESS_TOKEN
```

這些金鑰不應該提交到 GitHub。

## 啟動專案

開發模式：

```bash
npm run dev
```

正式啟動：

```bash
npm start
```

伺服器預設會啟動在：

```text
http://localhost:3000
```

## LINE Webhook 設定

LINE Developers 後台的 Webhook URL 需指向：

```text
https://你的公開網址/linewebhook
```

本機開發時，可以使用 ngrok、dev tunnels 或其他反向代理服務，將本機 `3000` port 暴露成公開網址。

請注意，`index.js` 目前有設定 `BASE_URL`，部署或更換公開網址時需要同步更新，讓 Flex Message 按鈕能正確連到圖表與表單頁面。

## 主要路由

| 路由 | 說明 |
| --- | --- |
| `/` | 專案首頁測試訊息 |
| `/linewebhook` | LINE Bot Webhook 接收端 |
| `/api/traffic-data` | 取得交通統計資料 |
| `/chart` | 圓餅圖視覺化頁面 |
| `/detail` | 折線圖視覺化頁面 |
| `/form` | 簡易需求填寫表單 |
| `/banner.jpg` | Flex Message 使用的橫幅圖片轉址 |

## 資料來源

專案透過台北市開放資料 API 取得 CSV 資料，並使用 `csvtojson` 轉換後供前端圖表與 LINE 訊息使用。若 API 請求失敗，系統會改用程式內建的備援資料回傳，確保畫面仍可正常顯示。

## 使用方式

1. 啟動 Express 伺服器。
2. 將公開網址設定到 LINE Developers 的 Webhook URL。
3. 在 LINE 中傳送指定關鍵字或數字訊息。
4. 機器人會回覆交通資料卡片。
5. 點選卡片按鈕可以查看圓餅圖、歷年趨勢或填寫表單。

## 開發指令

```bash
npm run dev
npm start
```

## 注意事項

- 請勿將 `.env` 或 LINE Bot 金鑰提交到版本控制。
- 部署前請確認 `BASE_URL` 已改成正式公開網址。
- 若圖表頁面無資料，請先檢查外部資料 API 是否可正常連線。
- 若 LINE Bot 沒有回應，請確認 Webhook URL、Channel Secret 與 Channel Access Token 是否正確。

## 授權

本專案目前在 `package.json` 中標示為 ISC License。
