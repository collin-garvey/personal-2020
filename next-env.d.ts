/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'remark';
declare module 'react-svg';
declare module 'remark-html';
declare module '@icons-pack/react-simple-icons/lib/Linkedin';
declare module '@icons-pack/react-simple-icons/lib/Twitter';
declare module '@icons-pack/react-simple-icons/lib/Github';
declare module '@icons-pack/react-simple-icons/lib/Codepen';

declare module '*.css' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.module.css' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.module.scss' {
  const content: {[className: string]: string};
  export default content;
}
