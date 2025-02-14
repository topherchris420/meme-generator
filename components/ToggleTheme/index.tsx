import { useMemo } from 'react';
import useSound from 'use-sound';
import { MdLightMode, MdModeNight } from 'react-icons/md';
import { IconContext } from 'react-icons';

import { useThemeDispatch, useThemeState } from 'contexts/theme/ThemeContext';
import { useI18nState } from 'contexts/i18n/I18Context';
import switchOnSound from 'public/sounds/switch-on.mp3';
import switchOffSound from 'public/sounds/switch-off.mp3';

import * as S from 'styles/components/ToggleTheme';

export function ToggleTheme() {
  const { onSelectMode } = useThemeDispatch();
  const { mode } = useThemeState();
  const { t } = useI18nState();

  const isDarkMode = mode === 'dark';

  const iconTitle = isDarkMode
    ? t.actions.theme.activate_light_mode
    : t.actions.theme.activate_dark_mode;

  const iconColor = isDarkMode
    ? 'var(--night-mode-color)'
    : 'var(--light-mode-color)';

  const [play] = useSound(isDarkMode ? switchOnSound : switchOffSound);

  const handleClick = () => {
    onSelectMode(mode);
    play();
  };

  const iconContextProviderValue = useMemo(
    () => ({
      color: iconColor,
      size: '24',
    }),
    [iconColor],
  );

  return (
    <S.Button onClick={handleClick} title={iconTitle} aria-label={iconTitle}>
      <IconContext.Provider value={iconContextProviderValue}>
        {isDarkMode ? <MdModeNight /> : <MdLightMode />}
      </IconContext.Provider>
    </S.Button>
  );
}
