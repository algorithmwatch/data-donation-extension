import * as React from 'react';
import {browser, Tabs} from 'webextension-polyfill-ts';
import {Config} from '../types';

import './styles.css';

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({url});
}

const Popup: React.FC = () => {
  const [configs, setConfigs] = React.useState([] as Config[]);

  const getConfigs = async (): Promise<void> => {
    const storage = await browser.storage.local.get('configs');
    const configArr = storage.configs;
    setConfigs(configArr);
  };

  React.useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!configs.length) {
      getConfigs();
    }
  }, [configs.length]);

  return (
    <section className="aw-w-60 aw-p-4">
      <h2>Wähle eine Config aus:</h2>
      {configs.map((config) => (
        <div key={config.name}>
          <button
            className="aw-border aw-border-blue-600 aw-p-2 aw-font-bold"
            type="button"
            onClick={(): Promise<Tabs.Tab> => {
              return openWebPage(config.start_url);
            }}
          >
            {config.name}
          </button>
        </div>
      ))}
      {/* <button
        id="options__button"
        type="button"
        onClick={(): Promise<Tabs.Tab> => {
          return openWebPage('options.html');
        }}
      >
        Options Page
      </button> */}
    </section>
  );
};

export default Popup;
