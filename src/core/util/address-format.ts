export const getFixedAddress = (address: string, preLength = 6, postLength = 6) => {
  if (address.length <= preLength + postLength) {
    return address;
  }
  return `${address.slice(0, preLength)}...${address.slice(-postLength)}`;
};