import * as React from 'react';
export interface DisqusCommentProps {
    title: string;
    identifier: string;
    url: string;
    shortname: string;
}
export declare const Comment: React.FC<DisqusCommentProps>;
