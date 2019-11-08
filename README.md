# react-disqus-components

[![NPM](https://img.shields.io/npm/v/react-disqus-components.svg)](https://www.npmjs.com/package/react-disqus-components) 
[![Github Workflow Status](https://github.com/aquariuslt/react-disqus-components/workflows/ci/badge.svg)](https://github.com/aquariuslt/react-disqus-components) 
[![codecov](https://codecov.io/gh/aquariuslt/react-disqus-components/branch/master/graph/badge.svg)](https://codecov.io/gh/aquariuslt/react-disqus-components) 
[![Semantic-Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


React Functional Component with `disqus` webapi integration.

## Usage

> Only support React Functional Component

### Required Props

See `DisqusCommentProps`

```typescript
export interface DisqusCommentProps {
  title: string;
  identifier: string;
  url: string;
  shortname: string;
}
```

### Example

```typescript jsx
import * as React from 'react';
import { Comment } from 'react-disqus-components';

export const MyComponent = () => {
  const pageTitle = 'My Page Title';
  const disqusConfig = {
    identifier: '', // your page uniq id
    url: '', // uslug url
    shortname: '' // disqus shortname
  };

  return (
    <Comment
      title={pageTitle}
      identifier={disqusConfig.identifier}
      url={disqusConfig.url}
      shortname={disqusConfig.shortname}
    />
  );
};
```
