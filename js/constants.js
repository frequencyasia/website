import i18next from 'i18next';

module.exports = {
  API_URL: '/api/v1.0/',
  LABELS: {
    OFFLINE: i18next.t('offline'),
  },
  LIVE_INFO_URL: 'http://airtime.frequency.asia/api/live-info',
  PUB_SUB_LABEL: {
    MIXCLOUD_URL: 'MIXCLOUD_URL',
    NOW_PLAYING_URL: 'NOW_PLAYING_URL',
  },
  // Convenience object to be clones when parsing artist tags.
  TABS_KEYS: ['#','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
};
