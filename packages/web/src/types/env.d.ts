interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_HOSTNAME: string;
  readonly PUBLIC_MODE: 'development' | 'production';
  readonly PUBLIC_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
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
