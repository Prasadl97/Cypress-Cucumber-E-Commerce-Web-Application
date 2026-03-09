const baseURL = process.env.BASE_URL ?? 'https://magento2-demo.magebit.com/';
const entityFilePath = process.env.ENTITY_FILE_PATH ?? './data/entities/registered-user.json';

const defaultProfile = {
  import: [
    'features/support/world.ts',
    'features/support/hooks.ts',
    'features/step-definitions/registration-login.steps.ts',
  ],
  format: ['@cucumber/pretty-formatter'],
  paths: ['./features/**/*.feature'],
  worldParameters: { baseURL, headed: false, slowMo: 0, entityFilePath },
};

const headed = {
  import: [
    'features/support/world.ts',
    'features/support/hooks.ts',
    'features/step-definitions/registration-login.steps.ts',
  ],
  format: ['@cucumber/pretty-formatter'],
  paths: ['./features/**/*.feature'],
  worldParameters: { baseURL, headed: true, slowMo: 0, entityFilePath },
};

const ui = {
  import: [
    'features/support/world.ts',
    'features/support/hooks.ts',
    'features/step-definitions/registration-login.steps.ts',
  ],
  format: ['@cucumber/pretty-formatter'],
  paths: ['./features/**/*.feature'],
  worldParameters: { baseURL, headed: true, slowMo: 500, entityFilePath },
};

export { defaultProfile as default, headed, ui };
