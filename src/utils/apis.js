/*
|--------------------------------------------------------------------------
| API Endpoints
|--------------------------------------------------------------------------
| Contains the list of endpoints grouped into categories.
*/

import { api_url } from './env'

const BASE = api_url || 'http://localhost:8000'

const endpoints = {
    HOME:`${BASE}`,
    AUTH: {
        LOGIN: `${BASE}users/login`,
        REGISTER: `${BASE}users`,
        LOGOUT: `${BASE}/api/quote-app/oauth/token/logout`,
        PASSWORDRESET: `${BASE}password/reset`,
    },
    USER: {
        GENERATETRANSACTIONREPORT: `${BASE}transactions/report/generate`,
        VERIFYEMAIL:`${BASE}user/send-verification-email`,
    },
    BANKIDENTITY: {
        INDEX:`${BASE}bank/list`,
    
    },
    MEMBER: {
        INDEX:`${BASE}members`,
        STATUSUPDATE:(memberId)=>`${BASE}member/${memberId}/status`,
        ROLEUPDATE:(memberId)=>`${BASE}member/${memberId}/role`,
        UPDATE: (memberId) => `${BASE}member/${memberId}`,
    },
    MYSTORE: {
        SHOW:(storeId) => `${BASE}store/${storeId}`,
        UPDATE:(storeId) => `${BASE}store/${storeId}`,
    },
    SENDER: {
        INDEX:`${BASE}senders`,
        STORE:`${BASE}senders`,
        UPDATE: (senderId) => `${BASE}senders/${senderId}`,
    },
    RECEIVER: {
        INDEX:(senderId,)=>`${BASE}sender/${senderId}/receivers`,
        STORE:(senderId)=>`${BASE}sender/${senderId}/receivers`,
        UPDATE:(senderId, receiverId)=>`${BASE}sender/${senderId}/receivers/${receiverId}`,
        FETCHACCOUNTDETAILS:`${BASE}banks/verify/account`,
    },
    TRANSACTION: {
        INDEX:`${BASE}transactions`,
        RECEIPTDOWNLOAD:(transactionId)=>`https://5cde-2-31-14-151.ngrok-free.app/transaction/${transactionId}/download`,
        REPORTTRANSACTION:(transactionId)=>`${BASE}transaction/${transactionId}/report`,
        STATUSUPDATE:(transactionId)=>`${BASE}transaction/${transactionId}/status`,
    },
    RATE: {
        INDEX:`${BASE}rates`,
        STORE:`${BASE}rates`,
        DELETE:(rateId) => `${BASE}rates/${rateId}`,
    },
    CURRENCY: {
        INDEX:`${BASE}currencies`,
        TOGGLE:(currencyId)=>`${BASE}currency/${currencyId}/toggle`,
        STORE:`${BASE}currencies`,
        DELETE:(currencyId) => `${BASE}rates/${currencyId}`,
    },
    BANK: {
        INDEX:`${BASE}banks`,
        STORE:`${BASE}banks`,
        UPDATE:(bankId) => `${BASE}banks/${bankId}`,
        DELETE:(bankId) => `${BASE}banks/${bankId}`,
    },
    COMMISSION: {
        INDEX:`${BASE}commissions`,
        STORE:`${BASE}commissions`,
        DELETE:(commissionId) => `${BASE}commissions/${commissionId}`,
    },
    OUTSTANDING: {
        INDEX:`${BASE}outstanding`,
        PAYMENT:`${BASE}outstanding/payment`,
    },
    PAYMENT: {
        PAYMENTINTENT:`${BASE}payment-intent`,
       
    },
    SENDMONEY:`${BASE}transactions`,
    ADDRESSFINDER:address => `${BASE}address-finder?address=${address}`,
    TRANSFERBREAKDOWN: `${BASE}transactions/transfer/breakdown`,

};

export default endpoints;
