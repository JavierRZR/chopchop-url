import { useThemeContext } from "../contexts/ThemeProvider";
const darkColor = "#000";
const ligthColor = "#eee";

const LightThemeIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-sun ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>
  );
};

const DarkThemeIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-moon-stars ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
      <path d="M19 11h2m-1 -1v2" />
    </svg>
  );
};

const LanguageIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-language-hiragana ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5h7" />
      <path d="M7 4c0 4.846 0 7 .5 8" />
      <path d="M10 8.5c0 2.286 -2 4.5 -3.5 4.5s-2.5 -1.135 -2.5 -2c0 -2 1 -3 3 -3s5 .57 5 2.857c0 1.524 -.667 2.571 -2 3.143" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
    </svg>
  );
};

const LinkedinIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-brand-linkedin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M8 11l0 5" />
      <path d="M8 8l0 .01" />
      <path d="M12 16l0 -5" />
      <path d="M16 16v-3a2 2 0 0 0 -4 0" />
    </svg>
  );
};

const GithubIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-brand-github ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </svg>
  );
};

const GlobeWorlIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-world ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
  );
};

const MailIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-mail ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
      <path d="M3 7l9 6l9 -6" />
    </svg>
  );
};

const ExternalLinkIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-external-link ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
      <path d="M11 13l9 -9" />
      <path d="M15 4h5v5" />
    </svg>
  );
};

const ArrowRightIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-external-link ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" />
    </svg>
  );
};

const ProfileIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-external-link ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  );
};

const LinkIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-external-link ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 22v-2" />
      <path d="M9 15l6 -6" />
      <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
      <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
      <path d="M20 17h2" />
      <path d="M2 7h2" />
      <path d="M7 2v2" />
    </svg>
  );
};

const LockIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-lock ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
    </svg>
  );
};

const LockOffIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-lock-off ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M8 11v-3m.719 -3.289a4 4 0 0 1 7.281 2.289v4" />
      <path d="M3 3l18 18" />
    </svg>
  );
};

const CopyIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-clipboard-copy ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    </svg>
  );
};

const SettingsIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-clipboard-copy ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
  );
};

const DeleteIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-clipboard-copy ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  );
};
const CloseIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-clipboard-copy ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  );
};
const RandomIcon = ({
  color = "#ffffff",
  strokeWidth = "1.5",
  size = 32,
  className = "",
}) => {
  const { theme } = useThemeContext();
  color = theme == "dark" ? ligthColor : darkColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-clipboard-copy ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 4l3 3l-3 3" />
      <path d="M18 20l3 -3l-3 -3" />
      <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
      <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
    </svg>
  );
};

export {
  LightThemeIcon,
  DarkThemeIcon,
  LanguageIcon,
  LinkedinIcon,
  GithubIcon,
  GlobeWorlIcon,
  MailIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  ProfileIcon,
  LinkIcon,
  LockIcon,
  LockOffIcon,
  CopyIcon,
  SettingsIcon,
  DeleteIcon,
  CloseIcon,
  RandomIcon,
};
