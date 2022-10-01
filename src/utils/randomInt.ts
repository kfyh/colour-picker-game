export async function randomInt(min: number, max: number): Promise<number> {
  const response = await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8');
  if (response.ok) {
    const json = await response.json();
    const random = json.data[0] / 255;
    return Math.floor(min + random * (max - min));
  } else {
    throw new Error(response.statusText);
  }
}

export function randomIntLocal(min: number, max: number): number {
  const random = Math.random();
  return Math.floor(min + random * (max - min));
};
