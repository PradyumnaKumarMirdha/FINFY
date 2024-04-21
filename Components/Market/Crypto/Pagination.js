'use client'
import React, { useContext, useRef } from "react";
import paginationArrow from "../../../public/pagination-arrow.svg";
// import submitIcon from "../../public/submit-icon.svg";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CryptoContext } from "../../../app/Market/context/Crypto/testCrypto";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <></>
  );
};

const Pagination = () => {
  let { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / 10);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <>
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button className="outline-0 dark:text-white text-black hover:text-[#f718f0] w-8" onClick={prev}>
              
                <NavigateNextIcon className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"/>
            </button>
          </li>

          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-[#f718f0] dark:text-white text-black rounded-md w-8 h-8 flex items-center justify-center text-lg "
              >
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="outline-0 hover:text-[#f718f0] dark:text-white text-black rounded-md w-8 h-8 flex items-center justify-center  mx-1.5"
              >
                {" "}
                {page - 1}{" "}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="outline-0  rounded-md w-8 h-8 flex items-center justify-center bg-[#8018f7] text-white mx-1.5"
            >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-[#f718f0] dark:text-white text-black rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-50 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-[#f718f0]  rounded-md w-8 h-8 flex items-center justify-center text-lg dark:text-white text-black"
              >
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="w-full outline-0 dark:text-white text-black hover:text-[#f718f0]  rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-50 mx-1.5"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className= "pl-4 outline-0 dark:text-white text-black hover:text-[#f718f0] w-8" onClick={next}>
            <NavigateNextIcon  className="w-full h-auto"
                src={paginationArrow}
                alt="right"/>
            </button>
          </li>
        </ul>
      </div>
      </>

    );
  } else {
    return null;
  }
};

export default Pagination;