import Image from 'next/image';

export const Mountains = ({ size }) => {
  return <Image src="/images/mountains.png" alt="Mountains" width={size} height={size} />;
};

export const Coast = ({ size }) => {
  return <Image src="/images/coast.png" alt="Coast" width={size} height={size} />;
};

export const Rainforest = ({ size }) => {
  return <Image src="/images/rainforest.png" alt="Rainforest" width={size} height={size} />;
};
