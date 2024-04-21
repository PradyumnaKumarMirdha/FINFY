'use client'
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const styles = {
  notice: "flex border w-full my-4 p-5 flex-col flex-1 bg-white",
  noticeContainer: "flex-1",
  noticeTitle: "text-[#8018f7] text-2xl py-3 border-b divide-y divide-slate-700 border-black ", // Added padding styles
  noticeMessage: "font-bold",
  noticeCTA: "font-bold text-green-500 cursor-pointer mt-5",
};

const Notice = ({ transactions }) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  // Reverse the order of transactions to show the recent one on top
  const reversedTransactions = [...transactions].reverse();
  const displayedTransactions = showAllTransactions
    ? reversedTransactions
    : reversedTransactions.slice(0, 2);

  const handleViewAllTransactions = () => {
    setShowAllTransactions(true);
  };

  return (
    <div className={styles.notice}>
      <div className={styles.noticeContainer}>
        <div className={styles.noticeTitle}>Transaction Detail</div>
        <Table className="mt-5">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-semibold text-black text-center">
                Block Number
              </TableHead>
              <TableHead className="font-semibold text-black text-center">From</TableHead>
              <TableHead className="font-semibold text-black text-center">To</TableHead>
              <TableHead className="text-center font-semibold text-black">
                Transaction Hash
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-1/4 align-middle text-center">
                  {transaction.blockNumber}
                </TableCell>
                <TableCell className="align-middle text-center">
                  {`${transaction.from.substring(0, 8)}...${transaction.from.slice(-5)}`}
                </TableCell>
                <TableCell className="text-center">
                  {`${transaction.to.substring(0, 8)}...${transaction.to.slice(-5)}`}
                </TableCell>
                <TableCell className="text-center">
                  {transaction.transactionHash?.substring(0, 15)}...
                  {transaction.transactionHash?.slice(-10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!showAllTransactions && (
          <div className={styles.noticeCTA} onClick={handleViewAllTransactions}>
            View All Transactions
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
