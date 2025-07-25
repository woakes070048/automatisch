import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';

export default {
  fields: [
    {
      key: 'screenName',
      label: 'Screen Name',
      type: 'string',
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description:
        'Screen name of your connection to be used on Automatisch UI.',
      clickToCopy: false,
    },
    {
      key: 'instanceUrl',
      label: 'Instance URL',
      type: 'string',
      required: false,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'For the self hosted version.',
      clickToCopy: false,
    },
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'string',
      required: false,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'LibreTranslate API key of your account.',
      clickToCopy: false,
    },
  ],

  verifyCredentials,
  isStillVerified,
};
