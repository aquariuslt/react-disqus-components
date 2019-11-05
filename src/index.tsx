import * as React from 'react';
import { useEffect } from 'react';

export interface DisqusCommentProps {
  title: string;
  identifier: string;
  url: string;
  shortname: string;
}

const EMPTY_DISQUS_CONFIG = {
  identifier: '',
  url: '',
  shortname: ''
};
const DISQUS_INSTANCE = 'DISQUS';
const DISQUS_CONFIG = 'disqus_config';
const DISQUS_SHORTNAME = 'disqus_shortname';

export const Comment: React.FC<DisqusCommentProps> = (props) => {
  const disqusConfig = props || EMPTY_DISQUS_CONFIG;
  const disqusCommentElementId = 'dsq-embed-scr';

  const insertScript = (src, id, parentElement) => {
    const script = window.document.createElement('script');
    script.async = true;
    script.src = src;
    script.id = id;
    parentElement.appendChild(script);
    return script;
  };

  const getDisqusConfig = () => {
    return function(this: any) {
      this.page.identifier = disqusConfig.identifier;
      this.page.url = disqusConfig.url;
      this.page.title = props.title;
    };
  };

  const loadInstance = () => {
    if (!document.getElementById(disqusCommentElementId) && disqusConfig.shortname) {
      window[DISQUS_CONFIG] = getDisqusConfig();
      window[DISQUS_SHORTNAME] = disqusConfig.shortname;
      insertScript(`https://${disqusConfig.shortname}.disqus.com/embed.js`, disqusCommentElementId, document.body);
    } else {
      if (window[DISQUS_INSTANCE]) {
        window[DISQUS_INSTANCE].reset({
          reload: true,
          config: getDisqusConfig()
        });
      }
    }
  };

  useEffect(() => {
    loadInstance();
  }, [props]);

  return <div id="disqus_thread" />;
};
