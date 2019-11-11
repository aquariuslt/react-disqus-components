import * as React from 'react';
import { useEffect } from 'react';

const DISQUS_INSTANCE = 'DISQUS';
const DISQUS_CONFIG = 'disqus_config';
const DISQUS_SHORTNAME = 'disqus_shortname';
const DISQUS_THREAD = 'disqus_thread';
const DISQUS_COMMENT_ELEMENT_ID = 'dsq-embed-scr';

const DEFER_LOADING_MS = 4000;

export interface DisqusCommentProps {
  title: string;
  identifier: string;
  url: string;
  shortname: string;

  defer?: number; // defer loading (ms)
}

const EMPTY_DISQUS_CONFIG = {
  identifier: '',
  url: '',
  shortname: '',
  defer: DEFER_LOADING_MS
};

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
      while (disqusThread.hasChildNodes()) {
        disqusThread.firstChild && disqusThread.removeChild(disqusThread.firstChild);
      }
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
    setTimeout(() => {
      if (window[DISQUS_INSTANCE] && document.getElementById(DISQUS_COMMENT_ELEMENT_ID)) {
        window[DISQUS_INSTANCE].reset({
          reload: true,
          config: getDisqusConfig()
        });
      } else {
        removeDisqusThreadElement();
        if (props.shortname) {
          window[DISQUS_CONFIG] = getDisqusConfig();
          window[DISQUS_SHORTNAME] = disqusConfig.shortname;
          insertScript(
            `https://${disqusConfig.shortname}.disqus.com/embed.js`,
            DISQUS_COMMENT_ELEMENT_ID,
            document.body
          );
        }
      }
    }, props.defer);
  };

  const cleanInstance = () => {
    removeScript(DISQUS_COMMENT_ELEMENT_ID, document.body);
    if (window[DISQUS_INSTANCE]) {
      window[DISQUS_INSTANCE].reset();
      window[DISQUS_INSTANCE] = undefined;
      removeDisqusThreadElement();
    }
  };

  useEffect(() => {
    loadInstance();
    return cleanInstance;
  }, [props.identifier]);

  return <div id={DISQUS_THREAD} />;
};
