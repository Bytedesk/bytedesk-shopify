import React from 'react';
import { AppProvider } from '@shopify/shopify-app-bridge-react';
import { Page, Layout, Card, FormLayout, TextField, Button, Select } from '@shopify/polaris';

export default function App() {
  const [config, setConfig] = React.useState({
    baseUrl: 'https://www.weiyuai.cn',
    placement: 'bottom-right',
    autoPopup: false,
    org: '',
    sid: '',
    theme: 'system',
    backgroundColor: '#0066FF',
    textColor: '#ffffff',
    windowWidth: '380'
  });

  const handleSave = async () => {
    // TODO: Save configuration and inject script
    const scriptContent = `
      <script src="https://www.weiyuai.cn/embed/bytedesk-web.js"></script>
      <script>
        const config = {
          baseUrl: '${config.baseUrl}',
          placement: '${config.placement}',
          autoPopup: ${config.autoPopup},
          inviteParams: {
            show: false,
            text: '需要帮助么',
          },
          bubbleConfig: {
            show: true,
            icon: '👋',
            title: '需要帮助么',
            subtitle: '点击我，与我对话'
          },
          theme: {
            theme: '${config.theme}',
            backgroundColor: '${config.backgroundColor}',
            textColor: '${config.textColor}'
          },
          window: {
            width: '${config.windowWidth}'
          },
          chatParams: {
            org: '${config.org}',
            t: '2',
            sid: '${config.sid}'
          }
        };
        const bytedesk = new BytedeskWeb(config);
        bytedesk.init();
      </script>
    `;
  };

  return (
    <AppProvider>
      <Page title="ByteDesk 客服配置">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="组织ID"
                  value={config.org}
                  onChange={(value) => setConfig({...config, org: value})}
                  helpText="请输入ByteDesk平台获取的组织ID"
                />
                <TextField
                  label="技能组ID"
                  value={config.sid}
                  onChange={(value) => setConfig({...config, sid: value})}
                  helpText="请输入技能组ID"
                />
                <Select
                  label="位置"
                  options={[
                    {label: '右下角', value: 'bottom-right'},
                    {label: '右上角', value: 'top-right'},
                    {label: '左下角', value: 'bottom-left'},
                    {label: '左上角', value: 'top-left'},
                  ]}
                  value={config.placement}
                  onChange={(value) => setConfig({...config, placement: value})}
                />
                <TextField
                  label="背景颜色"
                  value={config.backgroundColor}
                  onChange={(value) => setConfig({...config, backgroundColor: value})}
                  type="color"
                />
                <Button primary onClick={handleSave}>保存配置</Button>
              </FormLayout>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
} 