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
const DISQUS_THREAD = 'disqus_thread';
const DISQUS_COMMENT_ELEMENT_ID = 'dsq-embed-scr';

export const Comment: React.FC<DisqusCommentProps> = (props) => {
  const disqusConfig = props || EMPTY_DISQUS_CONFIG;

  const insertScript = (src, id, parentElement) => {
    const script = window.document.createElement('script');
    script.async = true;
    script.src = src;
    script.id = id;
    parentElement.appendChild(script);
    return script;
  };

  const removeScript = (id, parentElement) => {
    const script = window.document.getElementById(id);
    if (script) {
      parentElement.removeChild(script);
    }
  };

  const removeDisqusThreadElement = () => {
    const disqusThread = document.getElementById(DISQUS_THREAD);
    if (disqusThread) {
      while (disqusThread.hasChildNodes() && disqusThread.firstChild) {
        disqusThread.removeChild(disqusThread.firstChild);
      }
      disqusThread.remove();
    }
  };

  const getDisqusConfig = () => {
    return function(this: any) {
      this.page.identifier = disqusConfig.identifier;
      this.page.url = disqusConfig.url;
      this.page.title = props.title;
    };
  };

  const loadInstance = () => {
    removeDisqusThreadElement();
    if (!document.getElementById(DISQUS_COMMENT_ELEMENT_ID) && disqusConfig.shortname) {
      window[DISQUS_CONFIG] = getDisqusConfig();
      window[DISQUS_SHORTNAME] = disqusConfig.shortname;
      insertScript(`https://${disqusConfig.shortname}.disqus.com/embed.js`, DISQUS_COMMENT_ELEMENT_ID, document.body);
    } else {
      if (window[DISQUS_INSTANCE]) {
        window[DISQUS_INSTANCE].reset({
          reload: true,
          config: getDisqusConfig()
        });
      }
    }
  };

  const cleanInstance = () => {
    if (window[DISQUS_INSTANCE] && document.getElementById(DISQUS_COMMENT_ELEMENT_ID)) {
      window[DISQUS_INSTANCE].reset();
      window[DISQUS_INSTANCE] = undefined;
      removeScript(DISQUS_COMMENT_ELEMENT_ID, document.body);
      removeDisqusThreadElement();
    }
  };

  useEffect(() => {
    loadInstance();
    return cleanInstance;
  }, [props]);

  return <div id={DISQUS_THREAD} />;
};
