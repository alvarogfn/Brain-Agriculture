declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly MODE: 'development' | 'production';
      readonly PUBLIC_API_BASE_URL: string;
    }
  }
}

declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.gif' {
  const content: string;
  export default content;
}
