// templates/trafficCard.js

export default (baseURL, pTruck, pRental) => {
  return {
    type: 'flex',
    altText: '📊 交通運輸業市場分部趨勢',
    contents: {
      type: 'bubble',
      size: 'mega',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0288D1',
        contents: [
          {
            type: 'text',
            text: '📊 期中作業 - 交通運輸市場趨勢',
            color: '#FFFFFF',
            weight: 'bold',
            size: 'md',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: '最新各類家數%分佈圖 (自動抓取 API)',
            size: 'xs',
            color: '#777777',
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
                  { type: 'text', text: '🚛 一般貨運', size: 'xs' },
                  { type: 'text', text: pTruck || '45%', size: 'xs', align: 'end' },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                backgroundColor: '#EEEEEE',
                height: '6px',
                cornerRadius: '3px',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    backgroundColor: '#2E7D32',
                    width: pTruck || '45%',
                    height: '6px',
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
                  { type: 'text', text: '🚗 小客車租賃', size: 'xs' },
                  { type: 'text', text: pRental || '35%', size: 'xs', align: 'end' },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                backgroundColor: '#EEEEEE',
                height: '6px',
                cornerRadius: '3px',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    backgroundColor: '#FF9800',
                    width: pRental || '35%',
                    height: '6px',
                  },
                ],
              },
            ],
          },
          { type: 'separator', margin: 'md' },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#0288D1',
            action: { type: 'uri', label: '🌐 點選看線上互動圖表', uri: `${baseURL}/chart` },
          },
          {
            type: 'button',
            style: 'secondary',
            action: { type: 'uri', label: '📈 更詳細類別資料', uri: `${baseURL}/detail` },
          },
          {
            type: 'button',
            style: 'link',
            action: { type: 'message', label: '💬 基本 QA 問答', text: '基本 QA 問答' },
          },
          {
            type: 'button',
            style: 'link',
            action: { type: 'uri', label: '📝 需求填寫表單', uri: `${baseURL}/form` },
          },
        ],
      },
    },
  }
}
