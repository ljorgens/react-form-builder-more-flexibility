// types/RichTextAdapter.d.ts
import * as React from 'react';

export type RichTextAdapterProps = {
    value?: string;                         // HTML in
    onChange: (html: string) => void;       // HTML out
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

export type RichTextAdapter = React.FC<RichTextAdapterProps>;
