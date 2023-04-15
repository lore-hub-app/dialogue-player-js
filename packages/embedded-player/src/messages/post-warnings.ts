import { IWarningReferenceNotFound } from '@lorehub/dialogue-player';

export function postWarnings(warnings: IWarningReferenceNotFound[]) {
  window.parent.postMessage({
    message: 'dialogue-player-warnings',
    data: warnings
  }, "*");
}
