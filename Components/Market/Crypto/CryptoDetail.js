import { useSearchParams } from 'next/navigation';

const CryptoDetails = ({params}) => {

  return (
        <>
      <div>Crypto Details for Coin ID: {params.Id}</div>
      <br></br>
        </>
  )
};

export default CryptoDetails;