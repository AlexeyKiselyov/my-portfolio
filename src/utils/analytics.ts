import { trackEvent } from '../components/Analytics';

/**
 * Utility functions for tracking various events in the application
 */

export const analytics = {
  // Navigation and page interactions
  navigation: {
    menuItemClick: (itemName: string) => {
      trackEvent('menu_item_click', {
        item_name: itemName,
      });
    },
    tabSwitch: (tabName: string, page: string) => {
      trackEvent('tab_switch', {
        tab_name: tabName,
        page,
      });
    },
    sectionExpand: (sectionName: string) => {
      trackEvent('section_expand', {
        section_name: sectionName,
      });
    },
  },

  // Contact form
  contact: {
    formStart: () => {
      trackEvent('form_start', {
        form_name: 'contact_form',
      });
    },
    formSubmit: (success: boolean) => {
      trackEvent('form_submit', {
        form_name: 'contact_form',
        success,
      });
    },
    formError: (errorType: string) => {
      trackEvent('form_error', {
        form_name: 'contact_form',
        error_type: errorType,
      });
    },
  },

  // Projects
  projects: {
    filterChange: (filterValue: string) => {
      trackEvent('project_filter', {
        filter_value: filterValue,
      });
    },
    projectView: (projectName: string) => {
      trackEvent('project_view', {
        project_name: projectName,
      });
    },
    externalLinkClick: (projectName: string, linkType: 'github' | 'demo') => {
      trackEvent('project_link_click', {
        project_name: projectName,
        link_type: linkType,
      });
    },
  },

  // Snake game
  game: {
    start: () => {
      trackEvent('game_start', {
        game_name: 'snake',
      });
    },
    gameOver: (score: number) => {
      trackEvent('game_over', {
        game_name: 'snake',
        score,
      });
    },
  },

  // Social links and contacts
  social: {
    linkClick: (platform: string) => {
      trackEvent('social_link_click', {
        platform,
      });
    },
  },

  // Files
  files: {
    download: (fileName: string) => {
      trackEvent('file_download', {
        file_name: fileName,
      });
    },
  },
};

export default analytics;
