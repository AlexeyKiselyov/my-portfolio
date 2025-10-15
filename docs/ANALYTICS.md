# Google Analytics Setup

## Getting Measurement ID

1. Go to https://analytics.google.com/
2. Create a new account or use an existing one
3. Create a new Property for your website
4. Select "Web" platform
5. Copy the Measurement ID (format: `G-XXXXXXXXXX`)

## Project Configuration

1. Create a `.env` file in the project root (if it doesn't exist)
2. Add to it:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Rebuild the project:

```bash
npm run build
```

## What is Tracked

### Automatically

- **Page views** - every route transition
- **Geography** - where users come from
- **Devices** - desktop/mobile/tablet
- **Traffic sources** - where they came from (Google, direct visit, etc.)

### Custom Events

#### Navigation

- `menu_item_click` - menu item click
- `tab_switch` - tab switching on pages
- `section_expand` - section expansion

#### Contact Form

- `form_start` - form filling started
- `form_submit` - successful submission
- `form_error` - submission error

#### Projects

- `project_filter` - project filter change
- `project_view` - specific project view
- `project_link_click` - GitHub or Demo link click

#### Snake Game

- `game_start` - game started
- `game_over` - game ended with score

#### Social Links

- `social_link_click` - social media click

#### Files

- `file_download` - file downloads (e.g., resume)

## Viewing Statistics

After setup:

1. Go to GA dashboard: https://analytics.google.com/
2. Select your Property
3. View:
   - **Realtime** - who's online right now
   - **Reports > Engagement > Events** - custom events
   - **Reports > User attributes** - geography, devices
   - **Reports > Traffic acquisition** - where users come from

## Notes

- GA won't work in development mode without `.env` file
- Data will appear in dashboard within 24-48 hours (realtime works immediately)
- `.env` file is added to `.gitignore` and won't be committed to Git
