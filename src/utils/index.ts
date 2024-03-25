import moment from "moment";

export const timeFormat = (time: string) => {
  const currentTime = moment();
  const targetTime = moment(time);

  return targetTime.from(currentTime);
};

export const avatarGenerateSplit = (name: string) => {
  const nameSplit = name
    .split(" ")
    .map((word) => {
      if (word.length < 2) return;
      return word[0];
    })
    .join("");

  return nameSplit;
};

export const generateRandomColor = (name: string) => {
  const hRange = [0, 360];
  const sRange = [50, 75];
  const lRange = [25, 60];
  const getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const generateHSL = (name: string) => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
  };

  const HSLtoString = (hsl: number[]) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

  console.log(HSLtoString(generateHSL(name)));

  return HSLtoString(generateHSL(name));
};
