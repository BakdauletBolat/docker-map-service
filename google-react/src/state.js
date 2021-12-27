let currentUrl = window.location.href;

const urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(currentUrl);

export const hostName = urlParts[1]; ;