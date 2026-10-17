import './styles/theme.css';
import { showStartupError } from './ui/startup-error';
void import('./app/runtime.js').catch(() =>
  showStartupError(document, location),
);
