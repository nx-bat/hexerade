for (const [key, val] of Object.entries(process.env)) {
  if (val != undefined) continue;
  throw new Error(`${key} has not been configured. This might be a mistake.`);
}