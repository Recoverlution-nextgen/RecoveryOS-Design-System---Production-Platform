export interface Copy {
  app: {
    title: string;
    description: string;
    tagline: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
  };
  errors: {
    notFound: string;
    unauthorized: string;
    serverError: string;
    networkError: string;
  };
  placeholders: {
    search: string;
    email: string;
    password: string;
    name: string;
  };
}

declare const copy: Copy;
export default copy;
