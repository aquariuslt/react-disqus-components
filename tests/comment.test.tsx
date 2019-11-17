import * as _ from 'lodash';
import * as ReactDOM from 'react-dom';
import { Comment } from '../src/index';
import * as React from 'react';

describe('component: comment', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('# should mount', () => {
    const ELEMENT_ID = 'disqus-comment';
    const el = document.createElement('div');
    el.setAttribute('id', ELEMENT_ID);
    document.body.append(el);
    ReactDOM.render(<Comment title="" identifier="" url="" shortname="" />, document.getElementById(ELEMENT_ID));
  });

  it('# should create disqus comment div when not exists', async (done) => {
    const DISQUS_COMMENT_ELEMENT_ID = 'dsq-embed-scr';

    // before, ensure is not exists
    expect(document.getElementById(DISQUS_COMMENT_ELEMENT_ID)).toBeNull();

    // mount
    const ELEMENT_ID = 'disqus-comment';
    const MOCK_DISQUS_SHORTNAME = 'foo';
    const MOCK_DISQUS_IDENTIFIER = 'foo-id';
    const MOCK_DISQUS_URL = 'foo-url';
    const el = document.createElement('div');
    el.setAttribute('id', ELEMENT_ID);
    document.body.append(el);
    ReactDOM.render(
      <Comment title="" identifier={MOCK_DISQUS_IDENTIFIER} url={MOCK_DISQUS_URL} shortname={MOCK_DISQUS_SHORTNAME} defer={0}/>,
      document.getElementById(ELEMENT_ID)
    );

    _.delay(() => {
      expect(document.querySelector('script[src="https://foo.disqus.com/embed.js"]')).not.toBeNull();
      expect(window['disqus_config']).toBeDefined();
      done();
    }, 3000);
  });

  it('# should call `reset` when exist', () => {
    // TODO: suppose to load with puppeteer instead of DOM
  });
});
