import axios from 'axios'

export default async function trafficCommand(event) {
  try {
    // 1. 這裡直接抓取內部的數據
    const res = await axios.get('http://localhost:3000/api/traffic-data')

    let truck = 3540,
      rental = 2180,
      taxi = 1540,
      moving = 620,
      container = 410

    if (res.data && res.data.success) {
      const houseList = res.data.data.filter((item) => item['家數/車數'] === '家')
      if (houseList.length > 0) {
        const latest = houseList[houseList.length - 1]
        truck = parseInt(latest['汽車貨運業[家；輛]']) || 0
        rental = parseInt(latest['小客貨車租賃業[家；輛]']) || 0
        taxi =
          (parseInt(latest['車行計程車客運業[家；輛]']) || 0) +
          (parseInt(latest['計程車運輸合作社[家；輛]']) || 0) +
          (parseInt(latest['個人計程車客運業[家；輛]']) || 0)
        moving = parseInt(latest['遊覽車客運業[家；輛]']) || 0
      }
    }

    const total = truck + rental + taxi + moving + container
    const getPercent = (val) => ((val / total) * 100).toFixed(0) + '%'

    // 🌟 注意：這裡的連結按鈕直接吃你等一下穿透出去的網址
    const flexMessage = {
      type: 'flex',
      altText: '📊 三瑝資訊 - 最新動態看板',
      contents: {
        type: 'bubble',
        size: 'mega',
        header: {
          type: 'box',
          layout: 'vertical',
          backgroundColor: '#1A237E',
          contents: [
            {
              type: 'text',
              text: '📊 三瑝資訊數據看板',
              color: '#FFFFFF',
              weight: 'bold',
              size: 'lg',
            },
            {
              type: 'text',
              text: '【政府開放平台實時同步】',
              color: '#B0BEC5',
              size: 'xs',
              margin: 'xs',
            },
          ],
        },
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'md',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              spacing: 'xs',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    { type: 'text', text: '🚛 大貨車運輸', size: 'sm', weight: 'bold' },
                    {
                      type: 'text',
                      text: `${truck.toLocaleString()} 家 (${getPercent(truck)})`,
                      size: 'sm',
                      align: 'end',
                      color: '#2E7D32',
                      weight: 'bold',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  backgroundColor: '#EEEEEE',
                  height: '8px',
                  cornerRadius: '4px',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      backgroundColor: '#2E7D32',
                      width: getPercent(truck),
                      height: '8px',
                      cornerRadius: '4px',
                    },
                  ],
                },
              ],
            },
            {
              type: 'box',
              layout: 'vertical',
              spacing: 'xs',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    { type: 'text', text: '🚗 小客車租賃', size: 'sm', weight: 'bold' },
                    {
                      type: 'text',
                      text: `${rental.toLocaleString()} 家 (${getPercent(rental)})`,
                      size: 'sm',
                      align: 'end',
                      color: '#FF9800',
                      weight: 'bold',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  backgroundColor: '#EEEEEE',
                  height: '8px',
                  cornerRadius: '4px',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      backgroundColor: '#FF9800',
                      width: getPercent(rental),
                      height: '8px',
                      cornerRadius: '4px',
                    },
                  ],
                },
              ],
            },
            {
              type: 'box',
              layout: 'vertical',
              spacing: 'xs',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    { type: 'text', text: '外網連接測試點', size: 'sm', color: '#888888' },
                    {
                      type: 'text',
                      text: '點擊下方按鈕看詳細趨勢',
                      size: 'xs',
                      align: 'end',
                      color: '#888888',
                    },
                  ],
                },
              ],
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'button',
              style: 'primary',
              color: '#C99A4E',
              action: {
                type: 'uri',
                label: '📈 查看 57 年至今歷史趨勢圖',
                // 🌟 【動手修改處】：這行等下換上你那台 ngrok 免費桌面版給你的外部網址，結尾加上 /detail
                uri: 'https://請替換成你的外網網址.ngrok-free.app/detail',
              },
            },
          ],
        },
      },
    }

    await event.reply(flexMessage)
  } catch (error) {
    console.error(error)
  }
}
