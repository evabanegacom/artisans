// // Label
// import React, { forwardRef, MutableRefObject, useState, useEffect } from "react";
// import { Root } from "@radix-ui/react-label";
// import { Info } from "lucide-react";
// import useFormField from "@/hooks/use-form-field";
// import { cn } from "@/utils/tailwind";
// import { Label, Tooltip } from "@/components";

// interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Root> {
//   required?: boolean;
//   info?: React.ReactNode;
//   infoIcon?: React.ReactNode;
//   className?: string;
//   infoAlign?: "start" | "end" | "center" | undefined;
//   isFocused: boolean; // New prop for focus state
//   hasValue: boolean; // New prop for value state
// }

// const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
//   (
//     {
//       className,
//       children,
//       required,
//       info,
//       infoIcon,
//       infoAlign,
//       isFocused,
//       hasValue,
//       ...props
//     }: FormLabelProps,
//     ref
//   ) => {
//     const { error, formItemId } = useFormField();

//     return (
//       <Label
//         ref={ref as MutableRefObject<HTMLLabelElement>}
//         className={cn(
//           "absolute transition-all transform text-gray-500", // Floating transition
//           (isFocused || hasValue) ? "text-xs -translate-y-5" : "text-sm translate-y-2.5", // Conditionally float
//           error && "text-danger",
//           className
//         )}
//         htmlFor={formItemId}
//         {...props}
//       >
//         {children} {required && <span className="text-danger">*</span>}
//         {info && (
//           <Tooltip
//             contentProps={{ align: infoAlign }}
//             trigger={infoIcon ?? <Info size={16} className="fill-transparent cursor-pointer" />}
//           >
//             <div className="w-80 text-wrap">{info}</div>
//           </Tooltip>
//         )}
//       </Label>
//     );
//   }
// );
// FormLabel.displayName = "FormLabel";

// export default FormLabel;



// // Input

// import React, { useState } from "react";
// import { cn } from "@/utils/tailwind";
// import { FieldError } from "react-hook-form";

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   error?: FieldError;
//   rightElement?: React.ReactNode; // Add a prop for the right element
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, error, rightElement, ...props }, ref) => {
//     const [isFocused, setIsFocused] = useState(false);
//     const [hasValue, setHasValue] = useState(false);

//     return (
//       <div className="relative w-full">
//         <input
//           type={type}
//           className={cn(
//             "flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm",
//             "ring-offset-white focus:outline-none focus:ring-1 focus:ring-success border-[#E2E8F0]",
//             error && "focus:ring-danger border-danger text-danger-600",
//             rightElement && "pr-10", // Padding-right if right element exists
//             className
//           )}
//           ref={ref}
//           {...props}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => {
//             setIsFocused(false);
//             setHasValue(!!props.value);
//           }}
//           onChange={(e) => {
//             props.onChange?.(e);
//             setHasValue(!!e.target.value);
//           }}
//         />
//         {rightElement && (
//           <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//             {rightElement}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";

// export default Input;


// // Usage example

// <Form.Field
//   control={form.control}
//   name={`peopleDetails.${index}.name`}
//   render={({ field }) => (
//     <Form.Item>
//       <div className="relative">
//         {/* Pass isFocused and hasValue props */}
//         <Form.Label
//           className="text-sm text-[#475569]"
//           isFocused={!!form.formState.touchedFields?.peopleDetails?.[index]?.name}
//           hasValue={!!field.value}
//         >
//           Name
//         </Form.Label>
//         <Form.Control>
//           <Input
//             {...field}
//             className="p-2 w-full outline-none border border-[#E2E8F0] rounded-md"
//             placeholder="Enter full name"
//             error={form.formState.errors.peopleDetails?.[index]?.name}
//           />
//         </Form.Control>
//       </div>
//       <Form.Message />
//     </Form.Item>
//   )}
// />



import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const markdownContent = `
# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr(props) {
        const {node, ...rest} = props
        return <MyFancyRule {...rest} />
      }
    }}
  >
    {markdown}
  </Markdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/) helped me set up this markdown for my react app.
`;

function MarkdownDemo() {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
    >
      {markdownContent}
    </ReactMarkdown>
  );
}

export default MarkdownDemo;

