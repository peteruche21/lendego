import Image from "next/image";
import React, { FC } from "react";
import { IPosition } from "../../lib/types";
import { formatAddress } from "../../utils/formatAddress";
import { useSession } from "next-auth/react";
import useActions from "../../hooks/useActions";
import Link from "next/link";

const PositionCard: FC<IPosition> = (props, { key }) => {
  const { extendBorrowersLoan, forcefullyExitLenderFromNode, settleLoan } =
    useActions({ chainId: 9000 });
  const { data } = useSession();
  return (
    <div
      className="card card-compact md:w-72 bg-base-100 md:shadow-xl min-h-[14rem] bg-opacity-50 hover:shadow-md mx-auto w-full"
      key={key}
    >
      <div className="card-body relative">
        {/* position status */}
        <div className="card-title flex justify-end text-base">
          <div>
            <div className="badge badge-accent badge-outline">
              {props?.borrow?.restricted
                ? "defaulted"
                : props?.isOpen
                ? "active"
                : "settled"}
            </div>
          </div>
        </div>
        {/* position nodeid */}
        <div className="inline-flex justify-between">
          <div>
            <p className="text-slate-500 dark:text-red-100">id:</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-red-100">{props?.nodeId}</p>
          </div>
        </div>
        {/* position lender */}
        <div>
          <p className="text-slate-500 dark:text-red-100 py-2">from:</p>
          <div className="card-title flex justify-between text-base">
            <div className="font-light">
              <Link
                className="link link-hover"
                href={`/address/${props?.lend?.lender}`}
              >
                {formatAddress(props?.lend?.lender)}
              </Link>
            </div>
            <div>
              <p className="text-slate-500 dark:text-red-100 inline-flex font-light">
                {parseFloat(props?.lend?.assets.toString()).toLocaleString(
                  "en-US",
                  {
                    maximumFractionDigits: 4,
                  }
                )}{" "}
                {props?.lend?.stableName}
                <span className="w-4 rounded-xl ml-1 relative">
                  <Image
                    src={`/${props?.lend?.stableName}.svg`}
                    alt="loan card"
                    fill
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* position borrower  */}
        <div>
          <p className="text-slate-500 dark:text-red-100 py-2">to:</p>
          <div className="card-title flex justify-between text-base">
            <div className="font-light">
              <Link
                className="link link-hover"
                href={`/address/${props?.borrow?.borrower}`}
              >
                {formatAddress(props?.borrow?.borrower)}
              </Link>
            </div>
            <div>
              <p className="text-slate-500 dark:text-red-100 inline-flex font-light">
                {parseFloat(
                  props?.borrow?.collateralAmount.toString()
                ).toLocaleString("en-US", {
                  maximumFractionDigits: 5,
                })}{" "}
                {props?.borrow?.collateralName}
                <span className="w-4 rounded-xl ml-1 relative">
                  <Image
                    src={`/${props?.borrow?.collateralName}.svg`}
                    alt="loan card"
                    fill
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* position created at */}
        <div className="inline-flex justify-between">
          <div>
            <p className="text-slate-500 dark:text-red-100">created at:</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-red-100">
              {props?.createdAt as string}
            </p>
          </div>
        </div>
        {/* position expires at */}
        <div className="inline-flex justify-between">
          <div>
            <p className="text-slate-500 dark:text-red-100">expires at:</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-red-100">
              {props?.expiresAt as string}
            </p>
          </div>
        </div>
        {/* interest rate */}
        <div className="inline-flex justify-between">
          <div>
            <p className="text-slate-500 dark:text-red-100">interest rate:</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-red-100 inline-flex gap-1">
              {props?.lend?.interestRate}%{" "}
              <span>
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </p>
          </div>
        </div>
        {/* tenure */}
        <div className="inline-flex justify-between">
          <div>
            <p className="text-slate-500 dark:text-red-100">tenure:</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-red-100">
              {props?.borrow?.tenure} Days
            </p>
          </div>
        </div>
        <div className="inline-flex justify-between">
          {/* extend loan */}
          {props?.borrow?.borrower === data?.user?.name && props?.isOpen && (
            <button
              className={`btn btn-link lowercase text-orange-500 disabled:text-slate-700 mx-auto ${
                !data?.user?.name && "btn-disabled"
              }`}
              onClick={async () => {
                await extendBorrowersLoan(props?.nodeId!);
              }}
              disabled={!data?.user?.name}
            >
              extend loan
            </button>
          )}
          {/* forcefully exit lend */}
          {props?.lend?.lender === data?.user?.name &&
            props?.isOpen &&
            new Date(Date.now()) > props?.expiresAt && (
              <button
                className={`btn btn-link lowercase text-orange-500 disabled:text-slate-700 mx-auto ${
                  !data?.user?.name && "btn-disabled"
                }`}
                onClick={async () => {
                  await forcefullyExitLenderFromNode(props?.lend?.lnodeId!);
                }}
                disabled={!data?.user?.name}
              >
                exit node
              </button>
            )}
          {/* settle loan */}
          {props?.borrow?.borrower === data?.user?.name && props?.isOpen && (
            <button
              className={`btn btn-link lowercase text-orange-500 disabled:text-slate-700 mx-auto ${
                !data?.user?.name && "btn-disabled"
              }`}
              onClick={async () => {
                await settleLoan(props);
              }}
              disabled={!data?.user?.name}
            >
              settle loan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
