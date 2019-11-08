import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Comment } from '../src/index';

describe('component: comment', () => {
  it('# should mount', () => {
    const ELEMENT_ID = 'disqus-comment';
    const el = document.createElement('div');
    el.setAttribute('id', ELEMENT_ID);
    document.body.append(el);
    ReactDOM.render(<Comment title="" identifier="" url="" shortname="" />, document.getElementById(ELEMENT_ID));
  });
  it('# should create disqus comment div when not exists', () => {});
  it('# should call `reset` when exist', () => {});
});
